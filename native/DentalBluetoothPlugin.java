package com.uam.cientodentistas;

import android.Manifest;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.bluetooth.BluetoothServerSocket;
import android.bluetooth.BluetoothSocket;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.PackageManager;
import androidx.annotation.NonNull;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.annotation.Permission;
import com.getcapacitor.annotation.PermissionCallback;
import com.getcapacitor.PermissionState;
import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.concurrent.*;

@CapacitorPlugin(name="DentalBluetooth", permissions={@Permission(alias="bluetooth", strings={Manifest.permission.BLUETOOTH_SCAN, Manifest.permission.BLUETOOTH_CONNECT, Manifest.permission.BLUETOOTH_ADVERTISE})})
public class DentalBluetoothPlugin extends Plugin {
  private static final String SERVICE_NAME="El Camino Dental";
  private static final UUID SERVICE_UUID=UUID.fromString("6b8f2a7e-1c4d-4e8f-9a31-2c7d5b6e1042");
  private BluetoothAdapter adapter;
  private BluetoothServerSocket server;
  private BluetoothSocket socket;
  private final Set<BluetoothSocket> clients=ConcurrentHashMap.newKeySet();
  private final ExecutorService pool=Executors.newCachedThreadPool();
  private BroadcastReceiver receiver;
  // Permisos Bluetooth modernos requeridos por Android 12+.
  private static final String BT_SCAN_PERMISSION=Manifest.permission.BLUETOOTH_SCAN;
  private static final String BT_CONNECT_PERMISSION=Manifest.permission.BLUETOOTH_CONNECT;
  private static final String BT_ADVERTISE_PERMISSION=Manifest.permission.BLUETOOTH_ADVERTISE;

  @PluginMethod public void initialize(PluginCall call){
    adapter=((android.bluetooth.BluetoothManager)getContext().getSystemService(Context.BLUETOOTH_SERVICE)).getAdapter();
    if(adapter==null){call.reject("Bluetooth no disponible");return;}
    if(android.os.Build.VERSION.SDK_INT>=31 && getPermissionState("bluetooth")!=PermissionState.GRANTED){
      requestPermissionForAlias("bluetooth",call,"bluetoothPermissionCallback");
      return;
    }
    resolveInitialized(call);
  }
  @PermissionCallback
  private void bluetoothPermissionCallback(PluginCall call){
    if(android.os.Build.VERSION.SDK_INT<31 || getPermissionState("bluetooth")==PermissionState.GRANTED) resolveInitialized(call);
    else call.reject("Se requieren permisos de Bluetooth para continuar");
  }
  private void resolveInitialized(PluginCall call){
    JSObject r=new JSObject();r.put("available",adapter!=null);r.put("enabled",adapter!=null&&adapter.isEnabled());r.put("permissionRequired",false);call.resolve(r);
  }
  @PluginMethod public void isEnabled(PluginCall call){
    if(adapter==null) initializeAdapter();
    JSObject r=new JSObject();r.put("enabled",adapter!=null&&adapter.isEnabled());call.resolve(r);
  }
  private void initializeAdapter(){ adapter=((android.bluetooth.BluetoothManager)getContext().getSystemService(Context.BLUETOOTH_SERVICE)).getAdapter(); }
  private boolean ready(PluginCall call){
    if(adapter==null) initializeAdapter();
    if(adapter==null){call.reject("Bluetooth no disponible");return false;}
    if(android.os.Build.VERSION.SDK_INT>=31 && getPermissionState("bluetooth")!=PermissionState.GRANTED){
      requestPermissionForAlias("bluetooth",call,"bluetoothPermissionCallback");
      return false;
    }
    return true;
  }
  @PluginMethod public void startHost(PluginCall call){
    if(!ready(call))return;
    pool.execute(()->{
      try{
        server=adapter.listenUsingRfcommWithServiceRecord(SERVICE_NAME,SERVICE_UUID);
        notifyListeners("status",obj("state","hosting"));
        while(server!=null){
          BluetoothSocket s=server.accept();
          if(s==null)break;
          clients.add(s);notifyConnected(s.getRemoteDevice(),true);listen(s);
        }
      }catch(Exception e){notifyListeners("status",obj("state","error","message",String.valueOf(e.getMessage())));}
    });
    call.resolve();
  }
  @PluginMethod public void stopHost(PluginCall call){closeServer();call.resolve();}
  @PluginMethod public void scan(PluginCall call){
    if(!ready(call))return;
    try{
      if(adapter.isDiscovering())adapter.cancelDiscovery();
      if(receiver!=null)try{getContext().unregisterReceiver(receiver);}catch(Exception ignored){}
      receiver=new BroadcastReceiver(){public void onReceive(Context c,Intent i){
        if(BluetoothDevice.ACTION_FOUND.equals(i.getAction())){
          BluetoothDevice d=i.getParcelableExtra(BluetoothDevice.EXTRA_DEVICE);
          if(d!=null){JSObject o=new JSObject();o.put("deviceId",d.getAddress());o.put("name",d.getName()==null?"Dispositivo":d.getName());notifyListeners("deviceFound",o);}
        }
      }};
      IntentFilter f=new IntentFilter(BluetoothDevice.ACTION_FOUND);getContext().registerReceiver(receiver,f);
      notifyListeners("status",obj("state","scanning"));
      adapter.startDiscovery();call.resolve();
    }catch(Exception e){call.reject("No se pudo buscar dispositivos",e);}
  }
  @PluginMethod public void stopScan(PluginCall call){try{if(adapter!=null&&adapter.isDiscovering())adapter.cancelDiscovery();if(receiver!=null){getContext().unregisterReceiver(receiver);receiver=null;}}catch(Exception ignored){}call.resolve();}
  @PluginMethod public void connect(PluginCall call){
    if(!ready(call))return;String id=call.getString("deviceId");if(id==null){call.reject("Falta deviceId");return;}
    pool.execute(()->{try{
      if(adapter.isDiscovering())adapter.cancelDiscovery();
      BluetoothDevice d=adapter.getRemoteDevice(id);BluetoothSocket s=d.createRfcommSocketToServiceRecord(SERVICE_UUID);s.connect();socket=s;
      notifyConnected(d,false);listen(s);call.resolve();
    }catch(Exception e){call.reject("No se pudo conectar: "+e.getMessage());}});
  }
  @PluginMethod public void send(PluginCall call){
    String message=call.getString("message","");pool.execute(()->{
      try{byte[] b=(message+"\n").getBytes(StandardCharsets.UTF_8);if(socket!=null&&socket.isConnected()){socket.getOutputStream().write(b);socket.getOutputStream().flush();}for(BluetoothSocket s:clients){try{s.getOutputStream().write(b);s.getOutputStream().flush();}catch(Exception ignored){}}call.resolve();}catch(Exception e){call.reject("No se pudo enviar",e);}
    });
  }
  @PluginMethod public void disconnect(PluginCall call){closeSocket(socket);socket=null;call.resolve();}
  private void listen(BluetoothSocket s){pool.execute(()->{try{BufferedReader r=new BufferedReader(new InputStreamReader(s.getInputStream(),StandardCharsets.UTF_8));String line;while((line=r.readLine())!=null){JSObject o=new JSObject();o.put("message",line);o.put("deviceId",s.getRemoteDevice().getAddress());notifyListeners("message",o);} }catch(Exception ignored){}finally{clients.remove(s);notifyConnected(s.getRemoteDevice(),false);closeSocket(s);}});}
  private void notifyConnected(BluetoothDevice d,boolean connected){JSObject o=new JSObject();o.put("deviceId",d.getAddress());o.put("name",d.getName()==null?"Dispositivo":d.getName());o.put("connected",connected);notifyListeners("connection",o);}
  private JSObject obj(String... kv){JSObject o=new JSObject();for(int i=0;i+1<kv.length;i+=2)o.put(kv[i],kv[i+1]);return o;}
  private void closeServer(){try{if(server!=null)server.close();}catch(Exception ignored){}server=null;}
  private void closeSocket(BluetoothSocket s){try{if(s!=null)s.close();}catch(Exception ignored){}}
  @Override public void handleOnDestroy(){closeServer();closeSocket(socket);for(BluetoothSocket s:clients)closeSocket(s);pool.shutdownNow();super.handleOnDestroy();}
}