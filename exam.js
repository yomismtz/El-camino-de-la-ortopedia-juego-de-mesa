(()=>{
  'use strict';

  const $=id=>document.getElementById(id);
  const MODULES={
    fundamentos_oclusion:{label:'Fundamentos de la oclusión',icon:'📘',get:()=>window.FUNDAMENTOS_OCLUSION||[]},
    fisiologia_funcion:{label:'Fisiología + función',icon:'🫁',get:()=>window.FISIOLOGIA_FUNCION_QUESTIONS||[]},
    crecimiento_desarrollo:{label:'Crecimiento y desarrollo',icon:'🦴',get:()=>window.CRECIMIENTO_DESARROLLO_QUESTIONS||[]},
    habitos_parafunciones:{label:'Hábitos y parafunciones',icon:'🧠',get:()=>window.HABITOS_PARAFUNCIONES_QUESTIONS||[]},
    steiner:{label:'Cefalometría de Steiner',icon:'📐',get:()=>window.STEINER_QUESTIONS||[]},
    ortopedia_general:{label:'Ortopedia / banco general',icon:'🦷',get:()=>window.QUESTIONS||[]}
  };
  const DIFFICULTIES=['Básico','Intermedio','Clínico'];

  let exam=null;

  function esc(v){
    return String(v??'').replace(/[&<>'\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','\"':'&quot;'}[c]));
  }

  function shuffle(arr){
    const a=[...arr];
    for(let i=a.length-1;i>0;i--){
      const j=Math.floor(Math.random()*(i+1));
      [a[i],a[j]]=[a[j],a[i]];
    }
    return a;
  }

  function moduleBank(key){
    const mod=MODULES[key]||MODULES.fundamentos_oclusion;
    return mod.get().filter(q=>q&&q.text&&Array.isArray(q.options)&&q.options.length>=2&&Number.isInteger(q.correct)&&q.correct>=0&&q.correct<q.options.length);
  }

  function availableDifficulties(bank){
    const set=new Set(bank.map(q=>q.difficulty).filter(Boolean));
    return DIFFICULTIES.filter(x=>set.has(x));
  }

  function updateDifficultyOptions(){
    const key=$('examModule').value;
    const bank=moduleBank(key);
    const diffs=availableDifficulties(bank);
    const sel=$('examDifficulty');
    const previous=sel.value;
    sel.innerHTML='<option value="all">Todas las dificultades</option>';
    diffs.forEach(d=>{
      const op=document.createElement('option');
      op.value=d;
      op.textContent=d;
      sel.appendChild(op);
    });
    if([...sel.options].some(o=>o.value===previous))sel.value=previous;
    const hint=$('difficultyHint');
    if(diffs.length===3){
      hint.textContent='Puedes filtrar por dificultad pedagógica auditada.';
    }else{
      hint.textContent='Este módulo aún no tiene dificultad pedagógica auditada; se evaluará como banco completo.';
      sel.value='all';
    }
    updateLengthOptions();
  }

  function filteredBank(){
    const bank=moduleBank($('examModule').value);
    const d=$('examDifficulty').value;
    return d==='all'?bank:bank.filter(q=>q.difficulty===d);
  }

  function updateLengthOptions(){
    const available=filteredBank().length;
    const sel=$('examLength');
    let firstAvailable=null;
    [...sel.options].forEach(op=>{
      const n=Number(op.value);
      op.disabled=n>available;
      if(!op.disabled&&firstAvailable===null)firstAvailable=op.value;
    });
    if(sel.selectedOptions[0]?.disabled) sel.value=firstAvailable||String(Math.min(20,available));
    $('lengthHint').textContent=available
      ? 'Disponibles con este filtro: '+available+' preguntas.'
      : 'No hay preguntas disponibles con este filtro.';
    $('examForm').querySelector('.primary-btn').disabled=available===0;
  }

  function showScreen(id){
    ['examSetup','examRun','examResults'].forEach(x=>$(x).classList.toggle('active',x===id));
    window.scrollTo(0,0);
  }

  function startExam(e){
    e?.preventDefault();
    const module=$('examModule').value;
    const difficulty=$('examDifficulty').value;
    const requested=Number($('examLength').value);
    const source=filteredBank();
    if(!source.length)return;
    const count=Math.min(requested,source.length);
    const questions=shuffle(source).slice(0,count);
    exam={module,difficulty,count,questions,answers:Array(count).fill(null),index:0,startedAt:Date.now()};
    const mod=MODULES[module];
    $('runModule').textContent=mod.icon+' '+mod.label;
    showScreen('examRun');
    renderQuestion();
  }

  function renderQuestion(){
    if(!exam)return;
    const i=exam.index;
    const q=exam.questions[i];
    $('runCounter').textContent='Pregunta '+(i+1)+' de '+exam.count;
    $('answeredCount').textContent=exam.answers.filter(x=>x!==null).length;
    $('progressBar').style.width=(((i+1)/exam.count)*100)+'%';
    $('questionTopic').textContent=q.topic||q.specialty||'General';
    $('questionDifficulty').textContent=q.difficulty||'Sin clasificación';
    $('examQuestionText').textContent=q.text;
    const host=$('examOptions');
    host.innerHTML='';
    q.options.forEach((opt,idx)=>{
      const b=document.createElement('button');
      b.type='button';
      b.className='exam-option'+(exam.answers[i]===idx?' selected':'');
      b.setAttribute('aria-pressed',exam.answers[i]===idx?'true':'false');
      b.innerHTML='<span class="letter">'+String.fromCharCode(65+idx)+'</span><span>'+esc(opt)+'</span>';
      b.addEventListener('click',()=>{exam.answers[i]=idx;renderQuestion();});
      host.appendChild(b);
    });
    $('prevQuestionBtn').disabled=i===0;
    const last=i===exam.count-1;
    $('nextQuestionBtn').hidden=last;
    $('finishExamBtn').hidden=!last;
  }

  function moveQuestion(delta){
    if(!exam)return;
    exam.index=Math.max(0,Math.min(exam.count-1,exam.index+delta));
    renderQuestion();
  }

  function requestFinish(){
    if(!exam)return;
    const unanswered=exam.answers.filter(x=>x===null).length;
    $('finishConfirmText').textContent=unanswered
      ? 'Tienes '+unanswered+' pregunta'+(unanswered===1?'':'s')+' sin responder. Si finalizas ahora contará'+(unanswered===1?'':'n')+' como incorrecta'+(unanswered===1?'':'s')+'.'
      : 'Has respondido todas las preguntas. Se calculará tu resultado y podrás revisar cada respuesta.';
    $('finishConfirm').showModal();
  }

  function topicOf(q){return q.topic||q.specialty||'General';}

  function finishExam(){
    if(!exam)return;
    $('finishConfirm').close();
    let correct=0,wrong=0,unanswered=0;
    const topicMap=new Map();
    exam.questions.forEach((q,i)=>{
      const answer=exam.answers[i];
      const ok=answer===q.correct;
      if(answer===null)unanswered++; else if(ok)correct++; else wrong++;
      const topic=topicOf(q);
      if(!topicMap.has(topic))topicMap.set(topic,{total:0,correct:0});
      const stat=topicMap.get(topic);stat.total++;if(ok)stat.correct++;
    });
    const percent=Math.round((correct/exam.count)*100);
    const mod=MODULES[exam.module];
    $('scorePercent').textContent=percent+'%';
    $('scoreRing').style.setProperty('--score-angle',(percent*3.6)+'deg');
    $('correctCount').textContent=correct;$('wrongCount').textContent=wrong;$('unansweredCount').textContent=unanswered;$('totalCount').textContent=exam.count;
    $('resultTitle').textContent=mod.icon+' '+mod.label;
    const diff=exam.difficulty==='all'?'todas las dificultades':exam.difficulty;
    $('resultSummary').textContent=correct+' de '+exam.count+' correctas · '+diff+' · sin retroalimentación durante el examen.';
    const topicResults=$('topicResults');topicResults.innerHTML='';
    [...topicMap.entries()].sort((a,b)=>(a[1].correct/a[1].total)-(b[1].correct/b[1].total)||a[0].localeCompare(b[0])).forEach(([topic,stat])=>{
      const pct=Math.round((stat.correct/stat.total)*100);const row=document.createElement('div');row.className='topic-row';
      row.innerHTML='<div class="topic-name"><strong>'+esc(topic)+'</strong><span>'+stat.correct+' de '+stat.total+' correctas</span></div><div class="topic-score">'+pct+'%</div><div class="topic-bar"><i style="width:'+pct+'%"></i></div>';
      topicResults.appendChild(row);
    });
    const weak=[...topicMap.entries()].map(([topic,stat])=>({topic,pct:Math.round((stat.correct/stat.total)*100)})).filter(x=>x.pct<70).sort((a,b)=>a.pct-b.pct||a.topic.localeCompare(b.topic));
    const weakHost=$('weakAreas');weakHost.innerHTML='';
    if(!weak.length)weakHost.innerHTML='<span class="weak-chip ok">✓ Ningún tema quedó por debajo de 70% en este examen</span>';
    else weak.forEach(x=>{const span=document.createElement('span');span.className='weak-chip';span.textContent=x.topic+': '+x.pct+'%';weakHost.appendChild(span);});
    renderReview();$('reviewList').hidden=true;$('toggleReviewBtn').textContent='Mostrar revisión';showScreen('examResults');
  }

  function renderReview(){
    const host=$('reviewList');host.innerHTML='';
    exam.questions.forEach((q,i)=>{
      const answer=exam.answers[i];const ok=answer===q.correct;const status=answer===null?'unanswered':ok?'correct':'wrong';
      const item=document.createElement('article');item.className='review-item '+status;
      const your=answer===null?'Sin responder':String.fromCharCode(65+answer)+'. '+q.options[answer];
      const right=String.fromCharCode(65+q.correct)+'. '+q.options[q.correct];
      item.innerHTML='<h3>'+(i+1)+'. '+esc(q.text)+'</h3><p class="your-answer"><strong>Tu respuesta:</strong> '+esc(your)+'</p><p class="right-answer"><strong>Correcta:</strong> '+esc(right)+'</p>'+(q.explanation?'<p class="review-explanation">'+esc(q.explanation)+'</p>':'');
      host.appendChild(item);
    });
  }

  function toggleReview(){const host=$('reviewList');host.hidden=!host.hidden;$('toggleReviewBtn').textContent=host.hidden?'Mostrar revisión':'Ocultar revisión';}
  function resetExam(){exam=null;showScreen('examSetup');updateDifficultyOptions();}

  $('examModule').addEventListener('change',updateDifficultyOptions);
  $('examDifficulty').addEventListener('change',updateLengthOptions);
  $('examLength').addEventListener('change',updateLengthOptions);
  $('examForm').addEventListener('submit',startExam);
  $('prevQuestionBtn').addEventListener('click',()=>moveQuestion(-1));
  $('nextQuestionBtn').addEventListener('click',()=>moveQuestion(1));
  $('finishExamBtn').addEventListener('click',requestFinish);
  $('cancelFinishBtn').addEventListener('click',()=>$('finishConfirm').close());
  $('confirmFinishBtn').addEventListener('click',finishExam);
  $('toggleReviewBtn').addEventListener('click',toggleReview);
  $('repeatExamBtn').addEventListener('click',resetExam);
  $('finishConfirm').addEventListener('click',e=>{if(e.target===$('finishConfirm'))$('finishConfirm').close();});
  updateDifficultyOptions();
})();