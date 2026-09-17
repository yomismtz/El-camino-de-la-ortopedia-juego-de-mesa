const PLAYER_COLORS = ['#6a3f95','#d05f91','#2e8b78','#d18a32','#3975b7','#8d5b45'];
const DICE = ['⚀','⚁','⚂','⚃','⚄','⚅'];
const STORAGE_KEY = 'ortopediaGameV03';
const BOARD_END = 38; // 37 casillas numeradas + FIN.

// Mapa reconstruido del tablero original del PowerPoint.
// Las casillas con imagen usan exactamente las tarjetas de reglas del PPT.
const CELL_RULES = {
  1:{type:'question', deck:3}, 2:{type:'back1'}, 3:{type:'case', deck:1},
  4:{type:'question', deck:2}, 5:{type:'question', deck:1}, 6:{type:'case', deck:2},
  7:{type:'neutral'}, 8:{type:'advance1'}, 9:{type:'back2'}, 10:{type:'vacation'},
  11:{type:'neutral'}, 12:{type:'question', deck:3}, 13:{type:'case', deck:3},
  14:{type:'jail'}, 15:{type:'advance2'}, 16:{type:'advance1'}, 17:{type:'neutral'},
  18:{type:'case', deck:4}, 19:{type:'neutral'}, 20:{type:'back2'}, 21:{type:'back1'},
  22:{type:'neutral'}, 23:{type:'advance2'}, 24:{type:'question', deck:1}, 25:{type:'neutral'},
  26:{type:'neutral'}, 27:{type:'neutral'}, 28:{type:'case', deck:5}, 29:{type:'neutral'},
  30:{type:'back2'}, 31:{type:'neutral'}, 32:{type:'jail'}, 33:{type:'neutral'},
  34:{type:'vacation'}, 35:{type:'question', deck:2}, 36:{type:'vacation'}, 37:{type:'back1'},
  38:{type:'finish'}
};

const RULE_META = {
  question:{icon:'❓',label:'Pregunta',title:'¿Pregunta?',message:'Si contestas mal retrocedes una casilla.'},
  case:{icon:'📩',label:'Caso clínico',title:'Caso Clínico',message:'Excelente: avanzas 2. Buena: avanzas 1. Incorrecta: retrocedes 1.'},
  back2:{icon:'📁',label:'Retrocede 2',title:'Retrocede 2 casillas',message:'Perdiste el expediente.'},
  jail:{icon:'⚖️',label:'Cárcel',title:'Cárcel',message:'Tu paciente está muy molesto y te ha demandado. Pierde 1 turno.'},
  vacation:{icon:'🏖️',label:'Vacaciones',title:'Vacaciones',message:'Te fuiste de vacaciones. Regresa al INICIO.'},
  advance1:{icon:'✅',label:'Avanza 1',title:'Avanza 1 casilla',message:'Hiciste un excelente diagnóstico.'},
  advance2:{icon:'🏁',label:'Avanza 2',title:'Avanza 2 casillas',message:'Concluiste un tratamiento.'},
  back1:{icon:'📅',label:'Retrocede 1',title:'Retrocede 1 casilla',message:'El paciente canceló una cita.'},
  neutral:{icon:'🦷',label:'Casilla',title:'Casilla',message:'Sin evento especial.'},
  finish:{icon:'🏆',label:'Fin',title:'Fin',message:'Llegaste al final del camino.'}
};

// v0.3: el contenido vive en archivos separados para facilitar revisión y mantenimiento.
const questions = window.QUESTIONS || [];
const clinicalCases = window.CLINICAL_CASES || [];

let state = null;
let pendingQuestion = null;
let selectedAnswer = null;
let pendingAfterDialog = null;
let soundEnabled = true;

const $ = id => document.getElementById(id);
const setup = $('setup');
const game = $('game');
const board = $('board');
const playerCount = $('playerCount');
const playerNames = $('playerNames');
const resumeBtn = $('resumeBtn');
const rollBtn = $('rollBtn');
const dice = $('dice');
const statusText = $('statusText');
const questionDialog = $('questionDialog');
const eventDialog = $('eventDialog');

function buildNameInputs() {
  const count = Number(playerCount.value);
  playerNames.innerHTML = '';
  for (let i=0; i<count; i++) {
    const row = document.createElement('div');
    row.className = 'name-row';
    row.innerHTML = `<span class="token-preview" style="--token:${PLAYER_COLORS[i]}">${i+1}</span><input id="name-${i}" maxlength="18" value="Jugador ${i+1}" aria-label="Nombre del jugador ${i+1}">`;
    playerNames.appendChild(row);
  }
}

function ruleForCell(n) {
  if (n === 0) return {type:'start'};
  return CELL_RULES[n] || {type:'neutral'};
}

function buildBoard() {
  board.innerHTML = '';
  const cells = [];
  for (let n=0; n<=BOARD_END; n++) {
    const rule = ruleForCell(n);
    const type = rule.type;
    const meta = type === 'start' ? {icon:'🚩',label:'Inicio'} : RULE_META[type];
    const cell = document.createElement('div');
    cell.className = `cell ${type}`;
    cell.dataset.cell = n;
    const label = n === 0 ? 'Inicio' : n === BOARD_END ? 'Fin' : n;
    cell.title = meta?.label || '';
    cell.innerHTML = `<span class="cell-number">${label}</span><span class="cell-icon">${meta?.icon || '🦷'}</span><div class="tokens"></div>`;
    cells.push(cell);
  }
  const rows = [];
  for (let i=0; i<cells.length; i+=8) rows.push(cells.slice(i,i+8));
  rows.forEach((row, idx) => {
    const ordered = idx % 2 ? [...row].reverse() : row;
    ordered.forEach(cell => board.appendChild(cell));
  });
}

function newGame() {
  const count = Number(playerCount.value);
  state = {
    version:3,
    players:Array.from({length:count},(_,i)=>({
      name:($(`name-${i}`).value || `Jugador ${i+1}`).trim(),
      position:0,
      skipTurns:0,
      color:PLAYER_COLORS[i]
    })),
    current:0,
    usedQuestionIds:[],
    usedCaseIds:[],
    turn:1,
    locked:false
  };
  saveGame();
  setup.classList.remove('active');
  game.classList.add('active');
  buildBoard();
  render();
  statusText.textContent = `${state.players[0].name}, tira el dado.`;
}

function render() {
  if (!state) return;
  document.querySelectorAll('.tokens').forEach(x=>x.innerHTML='');
  state.players.forEach((p,i)=>{
    const holder=document.querySelector(`[data-cell="${p.position}"] .tokens`);
    if (!holder) return;
    const t=document.createElement('span');
    t.className='board-token';
    t.style.setProperty('--token',p.color);
    t.textContent=i+1;
    t.title=p.name;
    holder.appendChild(t);
  });
  $('scoreList').innerHTML=state.players.map((p,i)=>`
    <div class="player-score ${i===state.current?'current':''}">
      <span class="mini-token" style="--token:${p.color}">${i+1}</span>
      <div><strong>${escapeHtml(p.name)}</strong><br><small>${p.position===0?'Inicio':p.position===BOARD_END?'Fin':`Casilla ${p.position}`}${p.skipTurns?` · pierde ${p.skipTurns} turno`:''}</small></div>
      <strong>${p.position}/${BOARD_END}</strong>
    </div>`).join('');
  $('turnLabel').textContent=`Turno ${state.turn}: ${state.players[state.current].name}`;
  rollBtn.disabled=state.locked;
  saveGame();
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
}

async function rollDice() {
  if (!state || state.locked) return;
  state.locked=true;
  rollBtn.disabled=true;
  const value=Math.floor(Math.random()*6)+1;
  dice.classList.add('rolling');
  for (let i=0;i<6;i++) {
    dice.textContent=DICE[Math.floor(Math.random()*6)];
    await delay(70);
  }
  dice.textContent=DICE[value-1];
  dice.classList.remove('rolling');
  statusText.textContent=`${state.players[state.current].name} obtuvo ${value}.`;
  await moveCurrentPlayerBy(value);
  if (state.players[state.current].position >= BOARD_END) {
    showWinner(state.players[state.current]);
    return;
  }
  setTimeout(()=>triggerCell(state.players[state.current].position),180);
}

async function moveCurrentPlayerBy(delta) {
  const p=state.players[state.current];
  const target=Math.max(0,Math.min(BOARD_END,p.position+delta));
  const step=target>=p.position?1:-1;
  while (p.position!==target) {
    p.position+=step;
    render();
    const token=document.querySelector(`[data-cell="${p.position}"] .board-token:last-child`);
    token?.classList.add('moving');
    await delay(150);
  }
}

function triggerCell(cell) {
  const rule=ruleForCell(cell);
  switch(rule.type) {
    case 'question': return startQuestion(rule.deck);
    case 'case': return startCase(rule.deck);
    case 'advance1': return showMovementEvent('advance1',1);
    case 'advance2': return showMovementEvent('advance2',2);
    case 'back1': return showMovementEvent('back1',-1);
    case 'back2': return showMovementEvent('back2',-2);
    case 'vacation': return showVacationEvent();
    case 'jail': return showJailEvent();
    case 'finish': return showWinner(state.players[state.current]);
    default:
      statusText.textContent='Casilla sin evento especial. Continúa el siguiente jugador.';
      setTimeout(endTurn,500);
  }
}

function pickUnused(pool, usedKey) {
  let candidates=pool.filter(item=>!state[usedKey].includes(String(item.id)));
  if (!candidates.length) {
    const poolIds=new Set(pool.map(item=>String(item.id)));
    state[usedKey]=state[usedKey].filter(id=>!poolIds.has(id));
    candidates=pool;
  }
  const chosen=candidates[Math.floor(Math.random()*candidates.length)];
  if (chosen) state[usedKey].push(String(chosen.id));
  return chosen;
}

function startQuestion(deck) {
  const q=pickUnused(questions.filter(x=>x.deck===deck),'usedQuestionIds');
  if (!q) {
    showEvent('Pregunta',`El sobre de Preguntas ${deck} todavía no está completamente migrado.`, '❓', endTurn);
    return;
  }
  pendingQuestion={...q,kind:'question'};
  selectedAnswer=null;
  showQuestion(pendingQuestion);
}

function startCase(deck) {
  const q=pickUnused(clinicalCases.filter(x=>x.deck===deck),'usedCaseIds');
  if (!q) {
    showEvent('Caso clínico',`El sobre de Casos clínicos ${deck} todavía no está completamente migrado.`, '📩', endTurn);
    return;
  }
  pendingQuestion={...q,kind:'case'};
  selectedAnswer=null;
  showQuestion(pendingQuestion);
}

function showQuestion(q) {
  const originSuffix=q.origin==='new'?' · nuevo':'';
  $('questionCategory').textContent=(q.kind==='case'?'Caso clínico':`Preguntas ${q.deck}`)+originSuffix;
  $('questionNumber').textContent=q.kind==='case'?q.id:`Pregunta ${q.id}`;
  const mediaNotice=q.mediaPending?'🎵/🎬 Esta pregunta usa multimedia del PowerPoint original; el archivo se integrará en la v0.4.\n\n':'';
  $('questionText').textContent=mediaNotice+q.text;
  $('feedback').hidden=true;
  $('feedback').innerHTML='';
  $('confirmAnswerBtn').hidden=false;
  $('confirmAnswerBtn').disabled=true;
  $('continueBtn').hidden=true;
  const opts=$('questionOptions');
  opts.innerHTML='';
  q.options.forEach((opt,i)=>{
    const el=document.createElement('button');
    el.type='button';
    el.className='option';
    el.innerHTML=`<span>${String.fromCharCode(65+i)}</span><span>${escapeHtml(opt)}</span>`;
    el.addEventListener('click',()=>selectOption(i));
    opts.appendChild(el);
  });
  questionDialog.showModal();
}

function selectOption(index) {
  selectedAnswer=index;
  document.querySelectorAll('#questionOptions .option').forEach((el,i)=>el.classList.toggle('selected',i===index));
  $('confirmAnswerBtn').disabled=false;
}

function confirmAnswer() {
  if (selectedAnswer===null || !pendingQuestion) return;
  const options=[...document.querySelectorAll('#questionOptions .option')];
  options.forEach(el=>{el.disabled=true;el.classList.remove('selected');});
  let delta=0;
  let heading='';
  let detail='';

  if (pendingQuestion.kind==='question') {
    const correct=selectedAnswer===pendingQuestion.correct;
    options[pendingQuestion.correct]?.classList.add('correct');
    if (!correct) {
      options[selectedAnswer]?.classList.add('wrong');
      delta=-1;
      heading='Incorrecta · retrocedes 1 casilla';
    } else {
      heading='Correcta · permaneces en tu casilla';
    }
    detail=pendingQuestion.explanation || 'El PowerPoint original no incluye retroalimentación textual para esta pregunta.';
  } else {
    const grade=pendingQuestion.grades[selectedAnswer] || 'incorrect';
    options[selectedAnswer]?.classList.add(grade==='incorrect'?'wrong':'correct');
    if (grade==='excellent') { delta=2; heading='Excelente · avanzas 2 casillas'; }
    else if (grade==='good') { delta=1; heading='Buena · avanzas 1 casilla'; }
    else { delta=-1; heading='Incorrecta · retrocedes 1 casilla'; }
    detail=pendingQuestion.feedback[selectedAnswer] || 'El PowerPoint original no incluye retroalimentación textual para esta opción.';
  }

  pendingQuestion.resultDelta=delta;
  $('feedback').hidden=false;
  $('feedback').innerHTML=`<strong>${escapeHtml(heading)}</strong>${escapeHtml(detail)}`;
  $('confirmAnswerBtn').hidden=true;
  $('continueBtn').hidden=false;
}

async function continueAfterQuestion() {
  const delta=pendingQuestion?.resultDelta || 0;
  pendingQuestion=null;
  questionDialog.close();
  if (delta) await moveCurrentPlayerBy(delta);
  if (state.players[state.current].position >= BOARD_END) return showWinner(state.players[state.current]);
  endTurn();
}

function showMovementEvent(type,delta) {
  const meta=RULE_META[type];
  showEvent(meta.title,meta.message,meta.icon,async()=>{
    await moveCurrentPlayerBy(delta);
    if (state.players[state.current].position >= BOARD_END) return showWinner(state.players[state.current]);
    endTurn();
  });
}

function showVacationEvent() {
  const meta=RULE_META.vacation;
  showEvent(meta.title,meta.message,meta.icon,async()=>{
    const p=state.players[state.current];
    while (p.position>0) {
      p.position--;
      render();
      await delay(55);
    }
    endTurn();
  });
}

function showJailEvent() {
  const meta=RULE_META.jail;
  state.players[state.current].skipTurns=(state.players[state.current].skipTurns||0)+1;
  render();
  showEvent(meta.title,meta.message,meta.icon,endTurn);
}

function showEvent(title,message,icon,onContinue) {
  $('eventIcon').textContent=icon;
  $('eventTitle').textContent=title;
  $('eventText').textContent=message;
  pendingAfterDialog=onContinue;
  eventDialog.showModal();
}

function closeEvent() {
  eventDialog.close();
  const cb=pendingAfterDialog;
  pendingAfterDialog=null;
  cb?.();
}

function endTurn() {
  if (!state) return;
  state.current=(state.current+1)%state.players.length;
  state.turn+=1;

  // La cárcel hace perder el turno siguiente del jugador afectado.
  let guard=0;
  const skipped=[];
  while (state.players[state.current].skipTurns>0 && guard<state.players.length*3) {
    const p=state.players[state.current];
    p.skipTurns-=1;
    skipped.push(`${p.name} pierde este turno por Cárcel.`);
    state.current=(state.current+1)%state.players.length;
    state.turn+=1;
    guard++;
  }

  state.locked=false;
  render();
  statusText.textContent=skipped.length ? `${skipped.join(' ')} ${state.players[state.current].name}, tira el dado.` : `${state.players[state.current].name}, tira el dado.`;
}

function showWinner(player) {
  state.locked=true;
  player.position=BOARD_END;
  render();
  $('winnerTitle').textContent='¡Llegaste al FIN!';
  $('winnerText').textContent=`${player.name} completó El camino de la ortopedia dental.`;
  $('winnerDialog').showModal();
}

function saveGame() {
  if (!state) return;
  localStorage.setItem(STORAGE_KEY,JSON.stringify(state));
  resumeBtn.hidden=false;
}

function loadGame() {
  const raw=localStorage.getItem(STORAGE_KEY);
  if (!raw) return;
  try {
    const saved=JSON.parse(raw);
    if (!saved?.players?.length) return;
    state=saved;
    state.players.forEach(p=>{if (typeof p.skipTurns!=='number') p.skipTurns=0;});
    if (!Array.isArray(state.usedQuestionIds)) state.usedQuestionIds=[];
    if (!Array.isArray(state.usedCaseIds)) state.usedCaseIds=[];
    state.locked=false;
    setup.classList.remove('active');
    game.classList.add('active');
    buildBoard();
    render();
    statusText.textContent=`Partida recuperada. ${state.players[state.current].name}, tira el dado.`;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function resetGame() {
  if (!confirm('¿Reiniciar la partida? Se borrará el progreso guardado.')) return;
  localStorage.removeItem(STORAGE_KEY);
  state=null;
  game.classList.remove('active');
  setup.classList.add('active');
  resumeBtn.hidden=true;
  buildNameInputs();
}

function playAgain() {
  $('winnerDialog').close();
  localStorage.removeItem(STORAGE_KEY);
  state=null;
  game.classList.remove('active');
  setup.classList.add('active');
  resumeBtn.hidden=true;
  buildNameInputs();
}

function delay(ms){return new Promise(resolve=>setTimeout(resolve,ms));}

playerCount.addEventListener('change',buildNameInputs);
$('newGameBtn').addEventListener('click',newGame);
resumeBtn.addEventListener('click',loadGame);
rollBtn.addEventListener('click',rollDice);
$('confirmAnswerBtn').addEventListener('click',confirmAnswer);
$('continueBtn').addEventListener('click',continueAfterQuestion);
$('eventContinueBtn').addEventListener('click',closeEvent);
$('resetBtn').addEventListener('click',resetGame);
$('playAgainBtn').addEventListener('click',playAgain);
$('soundBtn').addEventListener('click',()=>{
  soundEnabled=!soundEnabled;
  $('soundBtn').textContent=soundEnabled?'🔊':'🔇';
});

buildNameInputs();
buildBoard();
resumeBtn.hidden=!localStorage.getItem(STORAGE_KEY);

if ('serviceWorker' in navigator) {
  window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
}
