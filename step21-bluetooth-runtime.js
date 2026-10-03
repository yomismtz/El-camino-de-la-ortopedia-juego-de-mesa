/* Mejora 11 — Multijugador Bluetooth Android */
(()=>{'use strict';
const SERVICE_NAME='El Camino Dental';const state={role:null,connected:false,devices:new Map(),messages:[]};
const bt=()=>window.Capacitor?.registerPlugin?window.Capacitor.registerPlugin('DentalBluetooth'):window.Capacitor?.Plugins?.DentalBluetooth;
let plugin=null;
function api(){if(plugin)return plugin;try{plugin=bt();return plugin}catch{return null}}
function status(t){const e=document.getElementById('btStatus');if(e)e.textContent=t}
function renderDevices(){const box=document.getElementById('btDevices');if(!box)return;box.innerHTML='';for(const d of state.devices.values()){const b=document.createElement('button');b.className='btn bluetooth-device';b.textContent='📱 '+(d.name||'Dispositivo');b.onclick=()=>connect(d.deviceId);box.appendChild(b)}}
async function open(){const d=document.getElementById('bluetoothDialog');if(!d)return;if(!d.open)d.showModal();state.devices.clear();renderDevices();status('Preparando Bluetooth…');plugin=api();if(!plugin){status('Bluetooth nativo no disponible en esta versión.');return}try{const init=await plugin.initialize();status(init?.permissionRequired?'🔐 Acepta los permisos de Bluetooth del sistema y vuelve a pulsar la opción deseada.':'Bluetooth listo. Elige Anfitrión o Unirse.');plugin.addListener?.('deviceFound',e=>{state.devices.set(e.deviceId,e);renderDevices()});plugin.addListener?.('connection',e=>{state.connected=true;status('🟢 Conectado con '+(e.name||'otro jugador'));send({type:'hello',app:'El Camino Dental',version:'3.7',role:state.role})});plugin.addListener?.('status',e=>{if(e.state==='hosting')status('🟢 Sala Bluetooth activa. Esperando jugadores…');if(e.state==='scanning')status('🔎 Buscando dispositivos…');if(e.state==='error')status('⚠️ '+(e.message||'Error Bluetooth'))});plugin.addListener?.('message',e=>{try{state.messages.push(JSON.parse(e.message))}catch{}})}catch(e){status('⚠️ '+(e?.message||'No se pudo inicializar Bluetooth'))}}
async function host(){state.role='host';try{await api().startHost();status('🟢 Sala creada. En el otro teléfono pulsa Unirse y selecciona este dispositivo.')}catch(e){status('⚠️ '+(e?.message||'No se pudo crear la sala'))}}
async function scan(){state.role='client';state.devices.clear();renderDevices();try{await api().scan();status('🔎 Buscando teléfonos con El Camino Dental…')}catch(e){status('⚠️ '+(e?.message||'No se pudo buscar'))}}
async function connect(id){try{await api().connect({deviceId:id});status('Conectando…')}catch(e){status('⚠️ '+(e?.message||'No se pudo conectar'))}}
async function stop(){try{await api().stopScan();await api().stopHost();await api().disconnect()}catch{}state.connected=false;state.role=null;status('Bluetooth desconectado.')}
function send(payload){if(!state.connected)return false;api()?.send?.({message:JSON.stringify(payload)});return true}
function close(){stop();const d=document.getElementById('bluetoothDialog');if(d?.open)d.close()}
window.step21Bluetooth={open,host,scan,connect,send,close,stop,state};
document.getElementById('bluetoothBtn')?.addEventListener('click',open);
document.getElementById('btHostBtn')?.addEventListener('click',host);
document.getElementById('btScanBtn')?.addEventListener('click',scan);
document.getElementById('btCloseBtn')?.addEventListener('click',close);
})();