/* Paso 9 · Colección de personajes y desbloqueos persistentes. */
(function(){
  'use strict';
  const KEY='elCaminoDentalProgressV1';
  const STEP9_KEY='elCaminoDentalCharacterProgressV1';
  const REQUIREMENTS={wisdom:{matches:10},toothMouse:{matches:30},apollonia:{extremeWins:10},toothFairy:{extremeWins:25},toothGod:{extremeWins:50}};
  function readProfile(){
    try{const p=JSON.parse(localStorage.getItem(KEY)||'{}');return {...p,xp:Number(p.xp)||0,matches:Number(p.matches)||0,wins:Number(p.wins)||0,extremeWins:Number(p.extremeWins)||0}}
    catch{return {xp:0,matches:0,wins:0,extremeWins:0}}
  }
  function readExtra(){try{return JSON.parse(localStorage.getItem(STEP9_KEY)||'{}')}catch{return {}}}
  function saveExtra(x){try{localStorage.setItem(STEP9_KEY,JSON.stringify(x))}catch{}}
  function profile(){const p=readProfile(),x=readExtra();return {...p,extremeWins:Number(p.extremeWins)||Number(x.extremeWins)||0}}
  function unlockedById(id){
    if(!id)return true;
    const p=profile(),r=REQUIREMENTS[id];
    if(!r)return false;
    if(r.matches&&p.matches<r.matches)return false;
    if(r.extremeWins&&p.extremeWins<r.extremeWins)return false;
    return true;
  }
  function character(idx){return window.step9GetCharacters?.()?.[idx]||null}
  window.step9CharacterLocked=function(idx){const ch=character(idx);return !!ch?.unlockId&&!unlockedById(ch.unlockId)};
  window.step9ShowLocked=function(idx){
    const ch=character(idx);if(!ch)return;
    const p=profile(),r=REQUIREMENTS[ch.unlockId]||{};
    const current=r.matches?(p.matches+' / '+r.matches+' partidas'):(p.extremeWins+' / '+r.extremeWins+' victorias en extremo');
    if(typeof window.alert==='function')window.alert('🔒 '+ch.name+'\n\nRequisito: '+(ch.unlockLabel||'progresión')+'\nProgreso: '+current);
  };
  function syncExtremeWin(){
    const state=window.step7GetState?.(),dlg=document.getElementById('winnerDialog');
    if(!state||!dlg?.open||state.__step9ExtremeRecorded)return;
    state.__step9ExtremeRecorded=true;
    const winner=[...state.players].sort((a,b)=>(b.stats?.points||b.quizStats?.points||0)-(a.stats?.points||a.quizStats?.points||0))[0];
    if(state.difficulty==='extreme'&&winner&&!winner.isComputer){
      const x=readExtra();x.extremeWins=(Number(x.extremeWins)||0)+1;saveExtra(x);
      const p=readProfile();p.extremeWins=x.extremeWins;try{localStorage.setItem(KEY,JSON.stringify(p))}catch{}
    }
  }
  function renderCollection(){
    const host=document.getElementById('characterCollection');if(!host)return;
    const chars=window.step9GetCharacters?.()||[],locked=chars.filter(c=>c.unlockId&&!unlockedById(c.unlockId)).length;
    host.innerHTML='<span>🎭 '+chars.length+' personajes</span><span>🔓 '+(chars.length-locked)+' desbloqueados</span><span>🔒 '+locked+' pendientes</span>';
  }
  function tick(){syncExtremeWin();renderCollection()}
  setInterval(tick,800);window.addEventListener('load',tick,{once:true});
})();