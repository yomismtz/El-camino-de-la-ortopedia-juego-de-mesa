(()=>{
  'use strict';
  const KEY='elCaminoDentalLearningProfileV1';
  const MAX_TOPICS=120;

  function read(){
    try{
      const data=JSON.parse(localStorage.getItem(KEY)||'{}');
      return data&&typeof data==='object'?data:{};
    }catch{return {}}
  }
  function write(data){
    try{localStorage.setItem(KEY,JSON.stringify(data))}catch{}
  }
  function topicOf(q){return String(q?.topic||q?.specialty||'General').trim()||'General'}
  function moduleOf(module,q){return String(module||q?.module||'general')}
  function statKey(module,q){return moduleOf(module,q)+'::'+topicOf(q)}
  function record(module,q,correct){
    if(!q)return;
    const data=read(),key=statKey(module,q);
    const s=data[key]||{attempts:0,correct:0,misses:0,correctStreak:0,missStreak:0,last:0};
    s.attempts++;
    if(correct){s.correct++;s.correctStreak++;s.missStreak=0}
    else{s.misses++;s.missStreak++;s.correctStreak=0}
    s.last=Date.now();
    data[key]=s;
    const keys=Object.keys(data);
    if(keys.length>MAX_TOPICS){
      keys.sort((a,b)=>(data[b]?.last||0)-(data[a]?.last||0)).slice(MAX_TOPICS).forEach(k=>delete data[k]);
    }
    write(data);
  }
  function getStat(module,q){
    const data=read();
    return data[statKey(module,q)]||null;
  }
  function weight(module,q){
    const s=getStat(module,q);
    if(!s||s.attempts<2)return 1;
    const acc=s.correct/s.attempts;
    if(s.missStreak>=3)return 4.2;
    if(acc<.45)return 3.4;
    if(acc<.65)return 2.35;
    if(acc<.80)return 1.45;
    if(acc>.90&&s.attempts>=5)return .62;
    return 1;
  }
  function rnd(){
    try{
      if(window.crypto?.getRandomValues){
        const a=new Uint32Array(1);window.crypto.getRandomValues(a);
        return (a[0]+1)/4294967297;
      }
    }catch{}
    return Math.random()||1e-9;
  }
  function orderIndices(pool,module){
    return pool.map((q,i)=>{
      const w=Math.max(.2,weight(module,q));
      return {i,score:-Math.log(rnd())/w};
    }).sort((a,b)=>a.score-b.score).map(x=>x.i);
  }
  function sample(pool,count,module){
    const order=orderIndices(pool,module);
    return order.slice(0,Math.max(0,Math.min(count,pool.length))).map(i=>pool[i]);
  }
  function summary(module){
    const data=read(),prefix=String(module)+'::';
    return Object.entries(data).filter(([k])=>k.startsWith(prefix)).map(([k,s])=>({
      topic:k.slice(prefix.length),attempts:s.attempts,correct:s.correct,
      percent:s.attempts?Math.round(s.correct/s.attempts*100):0,missStreak:s.missStreak||0
    })).sort((a,b)=>a.percent-b.percent||b.attempts-a.attempts);
  }
  function fallbackExplanation(q){
    const correct=q?.options?.[q?.correct]??'';
    if(q?.sourceVersion){
      return 'La guía del examen fuente marca «'+correct+'» como respuesta correcta para este reactivo.';
    }
    return 'La opción «'+correct+'» es la que corresponde al concepto evaluado en este reactivo.';
  }
  function questionFeedback(q,selected,timedOut=false){
    const correctIndex=q?.correct;
    const correctText=q?.options?.[correctIndex]??'';
    const chosenText=Number.isInteger(selected)?(q?.options?.[selected]??''):'';
    const ok=Number.isInteger(selected)&&selected===correctIndex;
    const explanation=String(q?.explanation||'').trim()||fallbackExplanation(q);
    let distractor='';
    if(!ok&&Number.isInteger(selected)){
      const specific=q?.distractorExplanations?.[selected]||q?.optionExplanations?.[selected];
      distractor=String(specific||'').trim()||'Esta opción no coincide con la respuesta que mejor resuelve el concepto evaluado.';
    }
    return {ok,correctIndex,correctText,chosenText,explanation,distractor,timedOut};
  }
  function caseFeedback(q,selected,timedOut=false){
    const best=q?.grades?.indexOf('excellent')??-1;
    const bestText=best>=0?(q.options?.[best]??''):'';
    const chosenText=Number.isInteger(selected)?(q.options?.[selected]??''):'';
    const grade=Number.isInteger(selected)?(q.grades?.[selected]||'incorrect'):'incorrect';
    const selectedFeedback=Number.isInteger(selected)?String(q.feedback?.[selected]||'').trim():'';
    const bestFeedback=best>=0?String(q.feedback?.[best]||'').trim():'';
    return {
      grade,best,bestText,chosenText,timedOut,
      explanation:selectedFeedback||bestFeedback||'Compara los hallazgos del caso con la opción que integra mejor el diagnóstico o manejo.'
    };
  }
  function clear(){try{localStorage.removeItem(KEY)}catch{}}
  window.LearningTools={record,getStat,weight,orderIndices,sample,summary,questionFeedback,caseFeedback,clear,storageKey:KEY};
})();