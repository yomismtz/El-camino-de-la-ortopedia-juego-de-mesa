/* Paso 8 · progresión, XP y logros persistentes */
(function(){
'use strict';
const KEY='elCaminoDentalProgressV1';
const getState=()=>{try{return window.step7GetState?window.step7GetState():null}catch{return null}};
function read(){try{return Object.assign({xp:0,level:1,matches:0,wins:0,robberies:0,correct:0,excellent:0,achievements:[]},JSON.parse(localStorage.getItem(KEY)||'{}'))}catch{return{xp:0,level:1,matches:0,wins:0,robberies:0,correct:0,excellent:0,achievements:[]}}}
function save(p){try{localStorage.setItem(KEY,JSON.stringify(p))}catch{}}
function level(xp){return Math.max(1,Math.floor(Math.sqrt(Math.max(0,xp)/100))+1)}
function award(){
 const s=getState(); if(!s?.players?.length)return;
 const winner=[...s.players].sort((a,b)=>(b.stats?.points||0)-(a.stats?.points||0))[0];
 if(!winner)return;
 const p=read(), gameId=String(s.savedAt||'')+'|'+s.players.map(x=>x.name+':'+(x.stats?.points||0)).join(',');
 if(p.lastGame===gameId)return;
 const st=winner.stats||winner.quizStats||{}, correct=Number(st.correct||0), excellent=Number(st.excellent||0);
 const gained=100+correct*5+excellent*10+Math.max(0,Number(st.points||0));
 p.xp=Number(p.xp||0)+gained;p.matches=Number(p.matches||0)+1;p.correct+=correct;p.excellent+=excellent;
 if(winner===s.players[s.current]||winner.position>=80)p.wins=Number(p.wins||0)+1;
 if((s.players||[]).some(x=>Number(x.stats?.steals||x.steals||0)>0))p.robberies++;
 const unlocked=[];
 const add=(id,label)=>{if(!p.achievements.includes(id)){p.achievements.push(id);unlocked.push(label)}};
 if(p.matches>=1)add('first-match','Primera partida');
 if(p.matches>=5)add('five-matches','5 partidas');
 if(p.wins>=1)add('first-win','Primera victoria');
 if(p.xp>=1000)add('xp-1000','1000 XP');
 if(p.excellent>=10)add('ten-excellent','10 respuestas excelentes');
 p.level=level(p.xp);p.lastGame=gameId;save(p);
 const host=document.querySelector('#winnerStats'); if(!host)return;
 const box=document.createElement('div');box.className='step8-progression';
 box.innerHTML='<b>⭐ Progresión</b><span>Nivel '+p.level+' · '+p.xp+' XP</span><small>'+p.achievements.length+' logro(s)'+(unlocked.length?' · '+unlocked.join(' · '):'')+'</small>';
 host.appendChild(box);
}
function install(){
 const d=document.querySelector('#winnerDialog'); if(!d)return;
 const run=()=>{if(d.open)setTimeout(award,80)};
 new MutationObserver(run).observe(d,{attributes:true,attributeFilter:['open']});
 d.addEventListener('click',e=>{if(e.target?.id==='playAgainBtn')return});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
window.step8AwardProgress=award;
})();