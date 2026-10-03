'use strict';
/* Mejora 17 — recuperación robusta de partidas */
(function(){
  const KEY='ortopediaGameV10';
  const BACKUP='elCaminoDentalSaveBackupV1';
  const MAX_AGE=1000*60*60*24*30;
  function valid(s){
    return !!(s&&typeof s==='object'&&Array.isArray(s.players)&&s.players.length>=1&&s.players.length<=5&&
      s.players.every(p=>p&&typeof p==='object'&&Number.isFinite(Number(p.position))));
  }
  function writeBackup(state){
    try{
      if(!valid(state)) return false;
      localStorage.setItem(BACKUP,JSON.stringify({savedAt:Date.now(),state}));
      return true;
    }catch{return false}
  }
  function readBackup(){
    try{
      const x=JSON.parse(localStorage.getItem(BACKUP)||'null');
      if(!x||Date.now()-Number(x.savedAt||0)>MAX_AGE||!valid(x.state)) return null;
      return x.state;
    }catch{return null}
  }
  function recover(){
    try{
      const raw=localStorage.getItem(KEY);
      if(!raw) return false;
      const state=JSON.parse(raw);
      if(valid(state)) return false;
      const backup=readBackup();
      if(!backup) return false;
      localStorage.setItem(KEY,JSON.stringify(backup));
      return true;
    }catch{
      const backup=readBackup();
      if(!backup) return false;
      try{localStorage.setItem(KEY,JSON.stringify(backup));return true}catch{return false}
    }
  }
  window.step23Recovery={valid,writeBackup,readBackup,recover,KEY,BACKUP};
  recover();
})();