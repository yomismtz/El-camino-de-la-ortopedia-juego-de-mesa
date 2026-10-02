/* Paso 7 · IA, turno y protección de interacción */
(function(){
'use strict';
const $=id=>document.getElementById(id);
function state(){try{return window.step7GetState?window.step7GetState():null}catch{return null}}
function ensureAiPanel(){
  if($('step7AiStatus'))return;
  const host=document.querySelector('.dice-panel'); if(!host)return;
  const box=document.createElement('div');
  box.id='step7AiStatus'; box.className='step7-ai-status'; box.setAttribute('aria-live','polite');
  box.innerHTML='<span class="step7-ai-icon">🤖</span><div><b id="step7AiTitle">Turno protegido</b><small id="step7AiText">Listo</small></div>';
  const focus=$('step6Focus'); if(focus)focus.after(box); else host.appendChild(box);
}
function update(){
  const s=state(); if(!s?.players?.length)return;
  ensureAiPanel();
  const p=s.players[s.current], ai=!!p?.isComputer;
  const box=$('step7AiStatus'); if(box)box.classList.toggle('is-ai',ai);
  const title=$('step7AiTitle'),text=$('step7AiText');
  if(title)title.textContent=ai?'🤖 Turno de la computadora':'👤 Turno del jugador';
  if(text)text.textContent=ai?((window.step7GetAiLevel&&window.step7GetAiLevel())||'Medio')+' · movimiento automático':'Controles humanos activos';
  const roll=$('rollBtn');
  if(roll){
    roll.setAttribute('aria-disabled',String(!!s.locked||ai));
    roll.classList.toggle('step7-disabled',!!s.locked||ai);
  }
  document.body.classList.toggle('step7-ai-turn',ai);
}
function install(){
  ensureAiPanel();update();
  const game=$('game');
  if(game)new MutationObserver(update).observe(game,{subtree:true,childList:true,attributes:true,attributeFilter:['class','disabled','aria-disabled']});
  setInterval(()=>{if($('game')?.classList.contains('active'))update()},300);
  ['visibilitychange','pagehide'].forEach(ev=>window.addEventListener(ev,update,{passive:true}));
  window.addEventListener('elcamino:native-resume',()=>setTimeout(update,80));
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(install,0));else setTimeout(install,0);
window.step7Update=update;
})();