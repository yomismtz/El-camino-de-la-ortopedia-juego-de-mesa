/* Paso 10 · perfil de progreso */
(function(){
'use strict';
const KEY='elCaminoDentalProgressV1';
const EXTRA='elCaminoDentalCharacterProgressV1';
const ACH=[
 ['first-match','Primera partida'],['five-matches','5 partidas'],['first-win','Primera victoria'],['xp-1000','1000 XP'],['ten-excellent','10 respuestas excelentes']
];
function read(k,d){try{return JSON.parse(localStorage.getItem(k)||'null')||d}catch{return d}}
function profile(){return read(KEY,{xp:0,level:1,matches:0,wins:0,robberies:0,correct:0,excellent:0,achievements:[]})}
function characters(){return window.step9GetCharacters?.()||[]}
function unlocked(ch,p,x){if(!ch.unlockId)return true;const v=ch.unlockId==='wisdom'?p.matches:ch.unlockId==='toothMouse'?p.matches:Number(x.extremeWins)||0;const req=ch.unlockId==='wisdom'?10:ch.unlockId==='toothMouse'?30:ch.unlockId==='apollonia'?10:ch.unlockId==='toothFairy'?25:50;return v>=req}
function render(){
 const d=document.getElementById('profileDialog');if(!d?.open)return;
 const p=profile(),x=read(EXTRA,{extremeWins:0}),chars=characters(),got=chars.filter(c=>unlocked(c,p,x)).length;
 const xp=Number(p.xp)||0,next=(Math.max(1,Number(p.level)||1)*100)**2;
 document.getElementById('profileLevelLine').textContent='Nivel '+(p.level||1)+' · '+xp+' XP';
 document.getElementById('profileProgress').innerHTML='<div class="profile-xp"><span style="width:'+Math.min(100,Math.round((xp%next)/Math.max(1,next)*100))+'%"></span></div><small>'+got+' / '+chars.length+' personajes desbloqueados · '+(x.extremeWins||0)+' victorias en extremo</small>';
 document.getElementById('profileStats').innerHTML='<div><b>'+p.matches+'</b><span>Partidas</span></div><div><b>'+p.wins+'</b><span>Victorias</span></div><div><b>'+p.correct+'</b><span>Aciertos</span></div><div><b>'+p.excellent+'</b><span>Excelentes</span></div><div><b>'+p.robberies+'</b><span>Robos</span></div>';
 document.getElementById('profileAchievements').innerHTML=ACH.map(a=>'<span class="'+(p.achievements?.includes(a[0])?'earned':'locked')+'">'+(p.achievements?.includes(a[0])?'🏅':'🔒')+' '+a[1]+'</span>').join('');
 document.getElementById('profileCharacters').innerHTML=chars.map(c=>'<span class="'+(unlocked(c,p,x)?'unlocked':'locked')+'">'+(unlocked(c,p,x)?'🦷':'🔒')+' '+c.name+'</span>').join('');
}
function open(){document.getElementById('profileDialog')?.showModal();render()}
function install(){const b=document.getElementById('profileBtn'),d=document.getElementById('profileDialog');if(!b||!d)return;b.addEventListener('click',open);document.getElementById('closeProfileBtn')?.addEventListener('click',()=>d.close());d.addEventListener('click',e=>{if(e.target===d)d.close()});setInterval(render,1000)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();