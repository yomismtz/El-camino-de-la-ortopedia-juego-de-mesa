function showQuestion(q){
  stopTimer();
  $('questionCategory').textContent=(q.kind==='case'?'Caso clínico':`Preguntas ${q.deck}`)+(q.origin==='new'?' · nuevo':'');
  $('questionNumber').textContent=q.kind==='case'?q.id:`Pregunta ${q.id}`;
  $('questionText').textContent=q.text;
  renderQuestionMedia(q);
  $('feedback').hidden=true; $('feedbackText').innerHTML=''; $('feedbackIcon').textContent='';
  $('confirmAnswerBtn').hidden=false; $('confirmAnswerBtn').disabled=true; $('continueBtn').hidden=true;
  $('timerDisplay').textContent='30'; $('timerDisplay').classList.remove('warning'); $('timerBtn').disabled=false; $('timerBtn').textContent='⏱️ Iniciar 30 s';
  const opts=$('questionOptions'); opts.innerHTML='';
  q.options.forEach((opt,i)=>{const el=document.createElement('button');el.type='button';el.className='option';el.innerHTML=`<span>${String.fromCharCode(65+i)}</span><span>${escapeHtml(opt)}</span>`;el.addEventListener('click',()=>selectOption(i));opts.appendChild(el);});
  questionDialog.showModal();
}

function renderQuestionMedia(q){
  const box=$('questionMedia'); box.innerHTML=''; box.hidden=true;
  const media=QUESTION_MEDIA[q.id]; if(!media)return;
  box.hidden=false;
  const caption=document.createElement('p');caption.className='media-caption';caption.textContent=media.caption;box.appendChild(caption);
  if(media.type==='audio'){
    const a=document.createElement('audio');a.controls=true;a.preload='metadata';a.src=media.src;a.muted=!soundEnabled;box.appendChild(a);
  } else {
    const v=document.createElement('video');v.controls=true;v.preload='metadata';v.playsInline=true;v.src=media.src;v.muted=!soundEnabled;box.appendChild(v);
  }
}

function selectOption(index){selectedAnswer=index;document.querySelectorAll('#questionOptions .option').forEach((el,i)=>el.classList.toggle('selected',i===index));$('confirmAnswerBtn').disabled=false;}

function confirmAnswer(){
  if(selectedAnswer===null||!pendingQuestion)return;
  stopTimer();
  const options=[...document.querySelectorAll('#questionOptions .option')];options.forEach(el=>{el.disabled=true;el.classList.remove('selected');});
  let delta=0,heading='',detail='',resultSound='error',isSuccess=false;
  if(pendingQuestion.kind==='question'){
    const correct=selectedAnswer===pendingQuestion.correct; options[pendingQuestion.correct]?.classList.add('correct');
    if(!correct){options[selectedAnswer]?.classList.add('wrong');delta=-1;heading='Incorrecta · retrocedes 1 casilla';resultSound='error';}
    else{heading='Correcta · permaneces en tu casilla';resultSound='correct';isSuccess=true;}
    detail=pendingQuestion.explanation||'El PowerPoint original no incluye retroalimentación textual para esta pregunta.';
  }else{
    const grade=pendingQuestion.grades[selectedAnswer]||'incorrect';options[selectedAnswer]?.classList.add(grade==='incorrect'?'wrong':'correct');
    if(grade==='excellent'){delta=2;heading='Excelente · avanzas 2 casillas';resultSound='excellent';isSuccess=true;}
    else if(grade==='good'){delta=1;heading='Buena · avanzas 1 casilla';resultSound='correct';isSuccess=true;}
    else{delta=-1;heading='Incorrecta · retrocedes 1 casilla';resultSound='error';}
    detail=pendingQuestion.feedback[selectedAnswer]||'El PowerPoint original no incluye retroalimentación textual para esta opción.';
  }
  playSound(resultSound);
  pendingQuestion.resultDelta=delta;
  $('feedback').hidden=false;$('feedbackIcon').textContent=isSuccess?'✅':'❌';
  $('feedbackText').innerHTML=`<strong>${escapeHtml(heading)}</strong>${escapeHtml(detail)}`;
  $('confirmAnswerBtn').hidden=true;$('continueBtn').hidden=false;
}

async function continueAfterQuestion(){
  stopTimer(); pauseQuestionMedia();
  const delta=pendingQuestion?.resultDelta||0;pendingQuestion=null;questionDialog.close();
  if(delta)await moveCurrentPlayerBy(delta);
  if(state.players[state.current].position>=BOARD_END)return showWinner(state.players[state.current]);
  endTurn();
}

function startTimer(){
  if(timerInterval)return;
  timerRemaining=30;$('timerDisplay').textContent='30';$('timerBtn').disabled=true;$('timerBtn').textContent='⏱️ Corriendo…';
  playSound('countdown',{volume:.35});
  timerInterval=setInterval(()=>{
    timerRemaining--; $('timerDisplay').textContent=String(Math.max(0,timerRemaining));
    $('timerDisplay').classList.toggle('warning',timerRemaining<=5);
    if(timerRemaining<=0){stopTimer(false);playSound('alarm',{volume:.7});$('timerBtn').textContent='⏱️ Tiempo terminado';}
  },1000);
}
function stopTimer(stopAudio=true){if(timerInterval){clearInterval(timerInterval);timerInterval=null;}if(stopAudio&&activeSfx?.dataset?.sound==='countdown'){stopSound();}}
function pauseQuestionMedia(){$('questionMedia').querySelectorAll('audio,video').forEach(m=>{try{m.pause();m.currentTime=0;}catch{}});}

function showMovementEvent(type,delta){const meta=RULE_META[type];playEventTone(delta>0?'up':'down');showEvent(meta.title,meta.message,meta.icon,async()=>{await moveCurrentPlayerBy(delta);if(state.players[state.current].position>=BOARD_END)return showWinner(state.players[state.current]);endTurn();},meta.art);}
function showVacationEvent(){const meta=RULE_META.vacation;playEventTone('down');showEvent(meta.title,meta.message,meta.icon,async()=>{const p=state.players[state.current];while(p.position>0){p.position--;render();await delay(45);}endTurn();},meta.art);}
function showJailEvent(){const meta=RULE_META.jail;state.players[state.current].skipTurns=(state.players[state.current].skipTurns||0)+1;render();playEventTone('down');showEvent(meta.title,meta.message,meta.icon,endTurn,meta.art);}

function showEvent(title,message,icon,onContinue,art){
  const ruleArt=$('eventRuleArt');
  ruleArt.className='rule-art';
  if(art){ruleArt.hidden=false;ruleArt.classList.add(`rule-${art}`);$('eventIcon').hidden=true;}else{ruleArt.hidden=true;$('eventIcon').hidden=false;$('eventIcon').textContent=icon;}
  $('eventTitle').textContent=title;$('eventText').textContent=message;pendingAfterDialog=onContinue;eventDialog.showModal();
}
function closeEvent(){eventDialog.close();const cb=pendingAfterDialog;pendingAfterDialog=null;cb?.();}

function endTurn(){
  if(!state)return;state.current=(state.current+1)%state.players.length;state.turn+=1;
  let guard=0;const skipped=[];
  while(state.players[state.current].skipTurns>0&&guard<state.players.length*3){const p=state.players[state.current];p.skipTurns-=1;skipped.push(`${p.name} pierde este turno por Cárcel.`);state.current=(state.current+1)%state.players.length;state.turn+=1;guard++;}
  state.locked=false;render();statusText.textContent=skipped.length?`${skipped.join(' ')} ${state.players[state.current].name}, tira el dado.`:`${state.players[state.current].name}, tira el dado.`;
}

function showWinner(player){state.locked=true;player.position=BOARD_END;render();$('winnerTitle').textContent='¡Llegaste al FIN!';$('winnerText').textContent=`${player.name} completó El camino de la ortopedia dental.`;$('winnerDialog').showModal();playSound('win',{volume:.55});}

function saveGame(){if(!state)return;localStorage.setItem(STORAGE_KEY,JSON.stringify(state));resumeBtn.hidden=false;}
function migrateLegacySave(){if(localStorage.getItem(STORAGE_KEY))return;for(const key of LEGACY_STORAGE_KEYS){const raw=localStorage.getItem(key);if(!raw)continue;try{const old=JSON.parse(raw);if(old?.players?.length){old.version=5;old.players.forEach((p,i)=>{if(typeof p.skipTurns!=='number')p.skipTurns=0;if(typeof p.character!=='number')p.character=i%6;});localStorage.setItem(STORAGE_KEY,JSON.stringify(old));return;}}catch{}}}
function loadGame(){const raw=localStorage.getItem(STORAGE_KEY);if(!raw)return;try{const saved=JSON.parse(raw);if(!saved?.players?.length)return;state=saved;state.players.forEach((p,i)=>{if(typeof p.skipTurns!=='number')p.skipTurns=0;if(typeof p.character!=='number')p.character=i%6;});if(!Array.isArray(state.usedQuestionIds))state.usedQuestionIds=[];if(!Array.isArray(state.usedCaseIds))state.usedCaseIds=[];state.locked=false;showScreen(game);buildBoard();render();statusText.textContent=`Partida recuperada. ${state.players[state.current].name}, tira el dado.`;}catch{localStorage.removeItem(STORAGE_KEY);}}
function resetGame(){if(!confirm('¿Reiniciar la partida? Se borrará el progreso guardado.'))return;localStorage.removeItem(STORAGE_KEY);state=null;stopSound();showScreen(setup);resumeBtn.hidden=true;buildNameInputs();}
function playAgain(){$('winnerDialog').close();localStorage.removeItem(STORAGE_KEY);state=null;stopSound();showScreen(setup);resumeBtn.hidden=true;buildNameInputs();}

function playSound(name,{volume=.8}={}){
  if(!soundEnabled)return Promise.resolve();
  const src=SOUND_FILES[name]; if(!src){synthTone(name);return Promise.resolve();}
  try{
    if(activeSfx){activeSfx.pause();activeSfx=null;}
    const a=new Audio(src);a.volume=volume;a.dataset.sound=name;activeSfx=a;
    return a.play().catch(()=>synthTone(name));
  }catch{synthTone(name);return Promise.resolve();}
}
function stopSound(){if(activeSfx){try{activeSfx.pause();activeSfx.currentTime=0;}catch{}activeSfx=null;}}
function synthTone(kind='neutral',duration=.12){
  if(!soundEnabled)return;
  try{audioContext=audioContext||new(window.AudioContext||window.webkitAudioContext)();const o=audioContext.createOscillator(),g=audioContext.createGain();const now=audioContext.currentTime;const freq=kind==='error'||kind==='down'?180:kind==='excellent'?880:kind==='tick'?380:kind==='select'?620:520;o.frequency.setValueAtTime(freq,now);if(kind==='up')o.frequency.exponentialRampToValueAtTime(820,now+duration);if(kind==='down')o.frequency.exponentialRampToValueAtTime(120,now+duration);g.gain.setValueAtTime(.06,now);g.gain.exponentialRampToValueAtTime(.001,now+duration);o.connect(g).connect(audioContext.destination);o.start(now);o.stop(now+duration);}catch{}
}
function playEventTone(kind){synthTone(kind,.22);}
function delay(ms){return new Promise(resolve=>setTimeout(resolve,ms));}

playerCount.addEventListener('change',buildNameInputs);
$('chooseCharactersBtn').addEventListener('click',beginCharacterSelection);
$('pickerNextBtn').addEventListener('click',pickerNext);
$('pickerBackBtn').addEventListener('click',pickerBack);
resumeBtn.addEventListener('click',loadGame);
rollBtn.addEventListener('click',rollDice);
$('confirmAnswerBtn').addEventListener('click',confirmAnswer);
$('continueBtn').addEventListener('click',continueAfterQuestion);
$('eventContinueBtn').addEventListener('click',closeEvent);
$('timerBtn').addEventListener('click',startTimer);
$('resetBtn').addEventListener('click',resetGame);
$('playAgainBtn').addEventListener('click',playAgain);
$('soundBtn').addEventListener('click',()=>{
  soundEnabled=!soundEnabled;$('soundBtn').textContent=soundEnabled?'🔊':'🔇';
  if(!soundEnabled)stopSound();
  $('questionMedia').querySelectorAll('audio,video').forEach(m=>m.muted=!soundEnabled);
});

migrateLegacySave();
buildNameInputs();buildBoard();resumeBtn.hidden=!localStorage.getItem(STORAGE_KEY);
if('serviceWorker'in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));}
