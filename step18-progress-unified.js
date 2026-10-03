/* Mejora 3 · progresión unificada V2. */
(()=>{'use strict';
const KEY='elCaminoDentalProgressV2',OLD='elCaminoDentalProgressV1';
const DEFAULT={xp:0,level:1,matches:0,wins:0,robberies:0,correct:0,wrong:0,excellent:0,good:0,attempts:0,streak:0,bestStreak:0,achievements:[],lastGame:''};
function read(){try{const raw=JSON.parse(localStorage.getItem(KEY)||'null');if(raw)return {...DEFAULT,...raw};const old=JSON.parse(localStorage.getItem(OLD)||'null');return {...DEFAULT,...(old||{})}}catch{return{...DEFAULT}}}
function save(p){try{localStorage.setItem(KEY,JSON.stringify(p))}catch{}}
function xpForLevel(level){return Math.max(0,(Math.max(1,level)-1)**2*100)}
function levelForXp(xp){return Math.max(1,Math.floor(Math.sqrt(Math.max(0,xp)/100))+1)}
function nextLevelXp(level){return xpForLevel(level+1)}
function awardGame(){
 const s=window.step7GetState?.();if(!s?.players?.length)return;
 const winner=[...s.players].find(p=>Number(p.position)>=80)||s.players[s.current]||s.players[0];
 const gameId=String(s.savedAt||Date.now())+'|'+s.players.map(p=>p.name+':'+(p.stats?.points||0)).join(',');
 const p=read();if(p.lastGame===gameId)return p;
 const st=winner.quizStats||winner.stats||{},correct=Number(st.correct||0),wrong=Number(st.wrong||0),excellent=Number(st.excellent||0),good=Number(st.good||0),attempts=correct+wrong;
 const points=Math.max(0,Number(st.points||winner.stats?.points||0));
 const gained=100+correct*5+excellent*10+points;
 p.xp+=gained;p.matches++;p.correct+=correct;p.wrong+=wrong;p.excellent+=excellent;p.good+=good;p.attempts+=attempts;
 p.streak=correct>0?p.streak+correct:0;p.bestStreak=Math.max(p.bestStreak,p.streak);
 if(Number(winner.position)>=80)p.wins++;
 if((s.players||[]).some(x=>Number(x.stats?.steals||x.steals||0)>0))p.robberies++;
 const add=(id)=>{if(!p.achievements.includes(id))p.achievements.push(id)};
 if(p.matches>=1)add('first-match');if(p.matches>=5)add('five-matches');if(p.wins>=1)add('first-win');if(p.xp>=1000)add('xp-1000');if(p.excellent>=10)add('ten-excellent');if(p.bestStreak>=5)add('five-streak');if(p.correct>=100)add('hundred-correct');if(p.matches>=10)add('ten-matches');
 p.level=levelForXp(p.xp);p.lastGame=gameId;save(p);renderProfile(p);return p;
}
function renderProfile(p=read()){
 const d=document.getElementById('profileDialog');if(!d?.open)return;
 const level=p.level||levelForXp(p.xp),current=xpForLevel(level),next=nextLevelXp(level),pct=Math.min(100,Math.max(0,Math.round((p.xp-current)*100/Math.max(1,next-current))));
 const chars=window.step9GetCharacters?.()||[],x=(()=>{try{return JSON.parse(localStorage.getItem('elCaminoDentalCharacterProgressV1')||'{}')}catch{return{}}})();
 document.getElementById('profileLevelLine').textContent='Nivel '+level+' · '+p.xp+' XP';
 document.getElementById('profileProgress').innerHTML='<div class="profile-xp"><span style="width:'+pct+'%"></span></div><small>'+Math.max(0,next-p.xp)+' XP para nivel '+(level+1)+' · '+chars.length+' personajes</small>';
 document.getElementById('profileStats').innerHTML='<div><b>'+p.matches+'</b><span>Partidas</span></div><div><b>'+p.wins+'</b><span>Victorias</span></div><div><b>'+p.correct+'</b><span>Aciertos</span></div><div><b>'+p.wrong+'</b><span>Errores</span></div><div><b>'+p.bestStreak+'</b><span>Mejor racha</span></div><div><b>'+p.robberies+'</b><span>Robos</span></div>';
 const ach=[['first-match','Primera partida'],['five-matches','5 partidas'],['first-win','Primera victoria'],['xp-1000','1000 XP'],['ten-excellent','10 excelentes'],['five-streak','Racha de 5'],['hundred-correct','100 aciertos'],['ten-matches','10 partidas']];
 document.getElementById('profileAchievements').innerHTML=ach.map(a=>'<span class="'+(p.achievements.includes(a[0])?'earned':'locked')+'">'+(p.achievements.includes(a[0])?'🏅':'🔒')+' '+a[1]+'</span>').join('');
}
window.step18Progress={read,save,awardGame,levelForXp,xpForLevel,nextLevelXp,renderProfile};
window.step8AwardProgress=awardGame;
document.addEventListener('DOMContentLoaded',()=>{const d=document.getElementById('winnerDialog');if(d)new MutationObserver(()=>{if(d.open)setTimeout(awardGame,80)}).observe(d,{attributes:true,attributeFilter:['open']})});
})();