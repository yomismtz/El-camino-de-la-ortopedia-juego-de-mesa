/* Mejora 11/19 — Multijugador Bluetooth Android, sesión y sincronización robustas */
(()=>{'use strict';
const SERVICE_NAME='El Camino Dental',PROTOCOL_VERSION='1',MAX_PEERS=5;
const BT_SESSION_KEY='elCaminoDentalBluetoothSessionV1',SESSION_MAX_AGE=30*60*1000;
const PLAYER_ID_KEY='elCaminoDentalPlayerIdV1';
const state={role:null,connected:false,devices:new Map(),messages:[],syncTimer:null,peers:new Map(),roomId:null,compatible:false,lastSnapshot:null,snapshotVersion:0,lastPeerId:null,lastSnapshotHash:'',seenActions:new Map(),actionSequence:0,
 playerId:localStorage.getItem(PLAYER_ID_KEY)||('p-'+Math.random().toString(36).slice(2,10))};
try{localStorage.setItem(PLAYER_ID_KEY,state.playerId)}catch{}
const bt=()=>window.Capacitor?.registerPlugin?window.Capacitor.registerPlugin('DentalBluetooth'):window.Capacitor?.Plugins?.DentalBluetooth;
let plugin=null;
function api(){if(plugin)return plugin;try{plugin=bt();return plugin}catch{return null}}
function status(t){const e=document.getElementById('btStatus');if(e)e.textContent=t}
function roomCode(){return Math.random().toString(36).slice(2,8).toUpperCase()}
function now(){return Date.now()}
function isSessionFresh(s,t=now()){return !!(s&&s.roomId&&s.updatedAt&&Number.isFinite(Number(s.updatedAt))&&t-Number(s.updatedAt)>=0&&t-Number(s.updatedAt)<=SESSION_MAX_AGE)}
function loadSession(){try{const s=JSON.parse(localStorage.getItem(BT_SESSION_KEY)||'null');if(!isSessionFresh(s)){localStorage.removeItem(BT_SESSION_KEY);return null}return s}catch{return null}}
function saveSession(){try{localStorage.setItem(BT_SESSION_KEY,JSON.stringify({roomId:state.roomId,role:state.role,lastSnapshot:state.lastSnapshot||null,updatedAt:now(),snapshotVersion:state.snapshotVersion,lastPeerId:state.lastPeerId,playerId:state.playerId}));return true}catch{return false}}
function renderLobby(){const box=document.getElementById('btLobby');if(!box)return;box.innerHTML=`<div class="bluetooth-room"><b>🏠 Sala ${state.roomId||'—'}</b><span>${state.peers.size+1}/${MAX_PEERS} dispositivos</span></div>`;for(const p of state.peers.values()){const row=document.createElement('div');row.className='bluetooth-peer';row.textContent=(p.name||'Jugador')+(p.compatible?' · 🟢 listo':' · ⚠️ incompatible');box.appendChild(row)}}
function renderDevices(){const box=document.getElementById('btDevices');if(!box)return;box.innerHTML='';for(const d of state.devices.values()){const b=document.createElement('button');b.className='btn bluetooth-device';b.textContent='📱 '+(d.name||'Dispositivo');b.onclick=()=>connect(d.deviceId);box.appendChild(b)}}
function snapshotHash(snapshot){try{return JSON.stringify(snapshot)}catch{return ''}}
function getSnapshot(){return window.step22Sync?.getSnapshot?.()||null}
function publishSnapshot(force=false){if(state.role!=='host')return false;const snapshot=getSnapshot();if(!snapshot)return false;const hash=snapshotHash(snapshot);if(!force&&hash===state.lastSnapshotHash)return false;state.lastSnapshot=snapshot;state.lastSnapshotHash=hash;state.snapshotVersion=Math.max(0,state.snapshotVersion)+1;saveSession();send({type:'state',snapshot,resume:true,snapshotVersion:state.snapshotVersion,roomId:state.roomId,protocol:PROTOCOL_VERSION});return true}
function open(){const d=document.getElementById('bluetoothDialog');if(!d)return;if(!d.open)d.showModal();state.devices.clear();renderDevices();status('Preparando Bluetooth…');plugin=api();if(!plugin){status('Bluetooth nativo no disponible en esta versión.');return}try{plugin.initialize().then(init=>{status(init?.permissionRequired?'🔐 Acepta los permisos de Bluetooth del sistema y vuelve a pulsar la opción deseada.':'Bluetooth listo. Elige Anfitrión o Unirse.')}).catch(e=>status('⚠️ '+(e?.message||'No se pudo inicializar Bluetooth')));plugin.addListener?.('deviceFound',e=>{state.devices.set(e.deviceId,e);renderDevices()});plugin.addListener?.('connection',e=>{if(e.connected===false){if(state.role==='host'){state.peers.delete(e.deviceId);renderLobby()}else{state.connected=false;state.compatible=false;saveSession();status('🟠 Bluetooth desconectado. Puedes reconectar la misma sala.')}return}
 if(state.role==='host'){if(!state.peers.has(e.deviceId)&&state.peers.size>=MAX_PEERS-1){status('⚠️ Sala llena (máximo 5 dispositivos).');api()?.disconnect?.();return}state.connected=true;state.peers.set(e.deviceId,{name:e.name,compatible:false,playerId:null});renderLobby()}
 else if(state.role==='client'){state.connected=true;state.compatible=false;state.lastPeerId=e.deviceId;saveSession();status('🟡 Comprobando compatibilidad…')}
 send({type:'hello',app:'El Camino Dental',version:'3.7',protocol:PROTOCOL_VERSION,role:state.role,name:localStorage.getItem('elCaminoDentalPlayerName')||'Jugador',playerId:state.playerId,roomId:state.roomId,resume:true,snapshotVersion:state.snapshotVersion});
 startSync()});
plugin.addListener?.('status',e=>{if(e.state==='hosting')status('🟢 Sala Bluetooth activa. Esperando jugadores…');if(e.state==='scanning')status('🔎 Buscando dispositivos…');if(e.state==='error')status('⚠️ '+(e.message||'Error Bluetooth'))});
plugin.addListener?.('message',e=>{try{const msg=JSON.parse(e.message);if(e.deviceId)msg.deviceId=e.deviceId;state.messages.push(msg);handleSyncMessage(msg)}catch{}})}catch(e){status('⚠️ '+(e?.message||'No se pudo inicializar Bluetooth'))}}
async function host(){const saved=loadSession();const resumeHost=saved?.role==='host';state.role='host';state.roomId=resumeHost?saved.roomId:roomCode();state.peers.clear();state.snapshotVersion=resumeHost?Number(saved.snapshotVersion)||0:0;state.lastPeerId=resumeHost?saved.lastPeerId||null:null;state.lastSnapshot=resumeHost?saved.lastSnapshot||getSnapshot():getSnapshot();state.lastSnapshotHash=snapshotHash(state.lastSnapshot);state.connected=false;saveSession();renderLobby();try{await api().startHost();state.connected=true;saveSession();publishSnapshot(true);status('🟢 Sala '+state.roomId+' activa. Esperando jugadores…')}catch(e){state.connected=false;saveSession();status('⚠️ '+(e?.message||'No se pudo crear la sala'))}}
async function scan(){state.role='client';state.devices.clear();state.peers.clear();const saved=loadSession();state.roomId=saved?.roomId||null;state.lastSnapshot=saved?.lastSnapshot||null;state.snapshotVersion=Number(saved?.snapshotVersion)||0;state.lastPeerId=saved?.lastPeerId||null;state.playerId=saved?.playerId||state.playerId;state.compatible=false;renderDevices();renderLobby();saveSession();try{await api().scan();status('🔎 Buscando salas de El Camino Dental…')}catch(e){status('⚠️ '+(e?.message||'No se pudo buscar'))}}
async function connect(id){if(!id)return false;state.lastPeerId=id;saveSession();try{await api().connect({deviceId:id});status('Conectando…');return true}catch(e){status('⚠️ '+(e?.message||'No se pudo conectar'));return false}}
function stop(){stopSync();try{api()?.stopScan?.();api()?.stopHost?.();api()?.disconnect?.()}catch{}state.connected=false;state.lastSnapshot=getSnapshot()||state.lastSnapshot;saveSession();state.role=null;status('Bluetooth desconectado. La partida queda guardada para reconexión.')}
function send(payload){if(!state.connected)return false;const msg={...payload,protocol:payload.protocol||PROTOCOL_VERSION,roomId:payload.roomId||state.roomId};try{api()?.send?.({message:JSON.stringify(msg)});return true}catch{return false}}
function startSync(){if(state.syncTimer)clearInterval(state.syncTimer);state.syncTimer=setInterval(()=>{if(state.role==='host'&&state.connected)publishSnapshot(false);else if(state.role==='client'&&state.connected)saveSession()},250)}
function stopSync(){if(state.syncTimer){clearInterval(state.syncTimer);state.syncTimer=null}}
function pruneActions(){const cutoff=now()-60000;for(const [k,t] of state.seenActions)if(t<cutoff)state.seenActions.delete(k)}
function validateEnvelope(msg){return !!(msg&&typeof msg==='object'&&msg.protocol===PROTOCOL_VERSION&&msg.roomId===state.roomId&&typeof msg.playerId==='string'&&msg.playerId.length>0)}
function acceptAction(msg,type){if(!validateEnvelope(msg)||msg.type!==type)return false;const deviceId=msg.deviceId||'unknown';const key=deviceId+':'+String(msg.actionId||'');if(!msg.actionId||state.seenActions.has(key))return false;state.seenActions.set(key,now());pruneActions();return true}
function handleSyncMessage(msg){if(!msg||typeof msg!=='object')return;
 if(msg.type==='hello'){if(msg.protocol!==PROTOCOL_VERSION){send({type:'reject',reason:'protocol',playerId:state.playerId});return}
  if(msg.roomId&&msg.roomId!==state.roomId){send({type:'reject',reason:'room',playerId:state.playerId});return}
  if(msg.playerId===state.playerId){send({type:'reject',reason:'identity',playerId:state.playerId});return}
  if(state.role==='host'){let peer=state.peers.get(msg.deviceId);if(!peer){if(state.peers.size>=MAX_PEERS-1){send({type:'reject',reason:'capacity',playerId:state.playerId});return}peer={name:msg.name||'Jugador',compatible:true,playerId:msg.playerId};state.peers.set(msg.deviceId,peer)}else{peer.compatible=true;peer.name=msg.name||peer.name;peer.playerId=msg.playerId}renderLobby();send({type:'room',roomId:state.roomId,capacity:MAX_PEERS,protocol:PROTOCOL_VERSION,playerId:state.playerId});publishSnapshot(true)}
  else{state.compatible=true;state.roomId=msg.roomId;saveSession();status('🟢 Compatible. Sala lista.')}return}
 if(msg.type==='room'){if(msg.protocol!==PROTOCOL_VERSION||msg.roomId!==state.roomId){state.compatible=false;status('⚠️ Sala o protocolo incompatible.');return}state.compatible=true;saveSession();renderLobby();return}
 if(msg.type==='reject'){state.compatible=false;status('⚠️ Reconexión rechazada: '+(msg.reason||'incompatible')+'.');return}
 if(state.role==='host'){
   const peer=state.peers.get(msg.deviceId);if(!peer||peer.playerId!==msg.playerId)return;
   if(msg.type==='roll'){if(!acceptAction(msg,'roll'))return;if(window.step22Sync?.rollRemote?.()===false)return;publishSnapshot(true)}
   if(msg.type==='answer'&&Number.isInteger(msg.index)){if(!acceptAction(msg,'answer'))return;if(window.step22Sync?.confirmRemoteAnswer?.(msg.index)===false)return;publishSnapshot(true)}
   return;
 }
 if(state.role==='client'&&msg.type==='state'&&msg.snapshot){if(msg.protocol!==PROTOCOL_VERSION||msg.roomId!==state.roomId)return;const incoming=Number(msg.snapshotVersion);if(!Number.isSafeInteger(incoming)||incoming<=0||incoming<=state.snapshotVersion)return;state.snapshotVersion=incoming;state.lastSnapshot=msg.snapshot;state.lastSnapshotHash=snapshotHash(msg.snapshot);saveSession();window.step22Sync?.applySnapshot?.(msg.snapshot)}
}
function close(){stop();const d=document.getElementById('bluetoothDialog');if(d?.open)d.close()}
const apiPublic={open,host,scan,connect,send,close,stop,state,MAX_PEERS,PROTOCOL_VERSION,BT_SESSION_KEY,SESSION_MAX_AGE,loadSession,saveSession,isSessionFresh,validateEnvelope,acceptAction,publishSnapshot};
window.step21Bluetooth=apiPublic;
window.step21BluetoothTest={isSessionFresh,validateEnvelope,acceptAction,saveSession,loadSession,handleSyncMessage,publishSnapshot};
document.getElementById('bluetoothBtn')?.addEventListener('click',open);
document.getElementById('btHostBtn')?.addEventListener('click',host);
document.getElementById('btScanBtn')?.addEventListener('click',scan);
document.getElementById('btCloseBtn')?.addEventListener('click',close);
document.getElementById('rollBtn')?.addEventListener('click',()=>{if(state.role==='client'&&state.connected)send({type:'roll',playerId:state.playerId,actionId:state.playerId+':'+(++state.actionSequence)})});
document.getElementById('confirmAnswerBtn')?.addEventListener('click',()=>{if(state.role==='client'&&state.connected){const snapshot=getSnapshot();if(Number.isInteger(snapshot?.selectedAnswer))send({type:'answer',index:snapshot.selectedAnswer,playerId:state.playerId,actionId:state.playerId+':'+(++state.actionSequence)})}});
})();