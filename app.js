const PLAYER_COLORS = ['#6a3f95','#d05f91','#2e8b78','#d18a32','#3975b7','#8d5b45'];
const DICE = ['⚀','⚁','⚂','⚃','⚄','⚅'];
const STORAGE_KEY = 'ortopediaGameV05';
const LEGACY_STORAGE_KEYS = ['ortopediaGameV03','ortopediaGameV02','ortopediaGameV01'];
const BOARD_END = 38;

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
  question:{icon:'❓',label:'Pregunta',title:'¿Pregunta?',message:'Si contestas mal retrocedes una casilla.',art:'question'},
  case:{icon:'📩',label:'Caso clínico',title:'Caso Clínico',message:'Excelente: avanzas 2. Buena: avanzas 1. Incorrecta: retrocedes 1.',art:'case'},
  back2:{icon:'📁',label:'Retrocede 2',title:'Retrocede 2 casillas',message:'Perdiste el expediente.',art:'back2'},
  jail:{icon:'⚖️',label:'Cárcel',title:'Cárcel',message:'Tu paciente está muy molesto y te ha demandado. Pierde 1 turno.',art:'jail'},
  vacation:{icon:'🏖️',label:'Vacaciones',title:'Vacaciones',message:'Te fuiste de vacaciones. Regresa al INICIO.',art:'vacation'},
  advance1:{icon:'✅',label:'Avanza 1',title:'Avanza 1 casilla',message:'Hiciste un excelente diagnóstico.',art:'advance1'},
  advance2:{icon:'🏁',label:'Avanza 2',title:'Avanza 2 casillas',message:'Concluiste un tratamiento.',art:'advance2'},
  back1:{icon:'📅',label:'Retrocede 1',title:'Retrocede 1 casilla',message:'El paciente canceló una cita.',art:'back1'},
  neutral:{icon:'🦷',label:'Casilla',title:'Casilla',message:'Sin evento especial.'},
  finish:{icon:'🏆',label:'Fin',title:'Fin',message:'Llegaste al final del camino.'}
};

const SOUND_FILES = {
  start:'assets/audio/lets-go.mp3',
  choose:'assets/audio/choose-character.mp3',
  loading:'assets/audio/loading.mp3',
  error:'assets/audio/error.mp3',
  correct:'assets/audio/correct.mp3',
  excellent:'assets/audio/excellent.mp3',
  countdown:'assets/audio/countdown.mp3',
  alarm:'assets/audio/alarm.mp3',
  win:'assets/audio/win-outro.mp3'
};

const QUESTION_MEDIA = {
  2:{type:'audio',src:'assets/audio/question-2.mp3',caption:'🎵 Reproduce la canción original del PowerPoint para responder.'},
  10:{type:'audio',src:'assets/audio/question-10.mp3',caption:'🎵 Reproduce el audio original del PowerPoint para responder.'},
  35:{type:'video',src:'assets/video/question-35.mp4',caption:'🎬 Observa el video original del PowerPoint y responde.'}
};

const questions = window.QUESTIONS || [];
const clinicalCases = window.CLINICAL_CASES || [];

let state = null;
let draft = null;
let pendingQuestion = null;
let selectedAnswer = null;
let pendingAfterDialog = null;
let soundEnabled = true;
let timerInterval = null;
let timerRemaining = 30;
let activeSfx = null;
let audioContext = null;

const $ = id => document.getElementById(id);
const setup = $('setup');
const characters = $('characters');
const loadingScreen = $('loadingScreen');
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

function showScreen(target) {
  [setup,characters,loadingScreen,game].forEach(s=>s.classList.remove('active'));
  target.classList.add('active');
}

function characterPosition(index) {
  return ['0%','20%','40%','60%','80%','100%'][Math.max(0,Math.min(5,index||0))];
}

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

function beginCharacterSelection() {
  const count = Number(playerCount.value);
  draft = {
    count,
    names:Array.from({length:count},(_,i)=>($(`name-${i}`).value || `Jugador ${i+1}`).trim()),
    characters:Array(count).fill(null),
    pickerIndex:0
  };
  showScreen(characters);
  renderCharacterPicker();
  playSound('choose');
}

function renderCharacterPicker() {
  const i=draft.pickerIndex;
  $('pickerTitle').textContent=`${draft.names[i]}: elige personaje`;
  $('pickerHint').textContent=`Jugador ${i+1} de ${draft.count}. Cada personaje puede usarse una sola vez.`;
  const taken = new Set(draft.characters.filter((x,idx)=>x!==null && idx!==i));
  const grid=$('characterGrid');
  grid.innerHTML='';
  for(let c=0;c<6;c++){
    const btn=document.createElement('button');
    btn.type='button';
    const isTaken=taken.has(c), isSelected=draft.characters[i]===c;
    btn.className=`character-choice${isTaken?' taken':''}${isSelected?' selected':''}`;
    btn.disabled=isTaken;
    btn.innerHTML=`<div class="char-art char-${c}" aria-hidden="true"></div><span>Personaje ${c+1}</span>`;
    btn.addEventListener('click',()=>{
      draft.characters[i]=c;
      synthTone('select');
      renderCharacterPicker();
    });
    grid.appendChild(btn);
  }
  $('pickerNextBtn').disabled=draft.characters[i]===null;
  $('pickerNextBtn').textContent=i===draft.count-1?'Comenzar partida':'Siguiente';
  $('pickedSummary').innerHTML=draft.names.map((name,idx)=>`<span class="picked-chip">${escapeHtml(name)}: ${draft.characters[idx]===null?'—':`Personaje ${draft.characters[idx]+1}`}</span>`).join('');
}

function pickerNext() {
  if (draft.characters[draft.pickerIndex]===null) return;
  if (draft.pickerIndex < draft.count-1) {
    draft.pickerIndex++;
    renderCharacterPicker();
  } else {
    showLoadingThenStart();
  }
}

function pickerBack() {
  if (!draft) return showScreen(setup);
  if (draft.pickerIndex>0) {
    draft.pickerIndex--;
    renderCharacterPicker();
  } else {
    stopSound();
    showScreen(setup);
  }
}

async function showLoadingThenStart() {
  stopSound();
  showScreen(loadingScreen);
  playSound('loading');
  await delay(1600);
  newGameFromDraft();
}

function newGameFromDraft() {
  const count=draft.count;
  state={
    version:5,
    players:Array.from({length:count},(_,i)=>({
      name:draft.names[i], position:0, skipTurns:0, color:PLAYER_COLORS[i], character:draft.characters[i] ?? i
    })),
    current:0, usedQuestionIds:[], usedCaseIds:[], turn:1, locked:false
  };
  saveGame();
  showScreen(game);
  buildBoard();
  render();
  statusText.textContent=`${state.players[0].name}, tira el dado.`;
  playSound('start');
}

function ruleForCell(n) {
  if (n===0) return {type:'start'};
  return CELL_RULES[n] || {type:'neutral'};
}

function buildBoard() {
  board.innerHTML='';
  const cells=[];
  for(let n=0;n<=BOARD_END;n++){
    const rule=ruleForCell(n), type=rule.type;
    const meta=type==='start'?{icon:'🚩',label:'Inicio'}:RULE_META[type];
    const cell=document.createElement('div');
    cell.className=`cell ${type}`; cell.dataset.cell=n;
    const label=n===0?'Inicio':n===BOARD_END?'Fin':n;
    cell.title=meta?.label||'';
    cell.innerHTML=`<span class="cell-number">${label}</span><span class="cell-icon">${meta?.icon||'🦷'}</span><div class="tokens"></div>`;
    cells.push(cell);
  }
  const rows=[]; for(let i=0;i<cells.length;i+=8) rows.push(cells.slice(i,i+8));
  rows.forEach((row,idx)=>(idx%2?[...row].reverse():row).forEach(cell=>board.appendChild(cell)));
}

function render() {
  if(!state)return;
  document.querySelectorAll('.tokens').forEach(x=>x.innerHTML='');
  state.players.forEach((p,i)=>{
    if(typeof p.character!=='number') p.character=i%6;
    const holder=document.querySelector(`[data-cell="${p.position}"] .tokens`); if(!holder)return;
    const t=document.createElement('span');
    t.className=`board-token char-${p.character}`;
    t.title=p.name;
    holder.appendChild(t);
  });
  $('scoreList').innerHTML=state.players.map((p,i)=>`
    <div class="player-score ${i===state.current?'current':''}">
      <span class="player-avatar char-${p.character}"></span>
      <div><strong>${escapeHtml(p.name)}</strong><br><small>${p.position===0?'Inicio':p.position===BOARD_END?'Fin':`Casilla ${p.position}`}${p.skipTurns?` · pierde ${p.skipTurns} turno`:''}</small></div>
      <strong>${p.position}/${BOARD_END}</strong>
    </div>`).join('');
  $('turnLabel').textContent=`Turno ${state.turn}: ${state.players[state.current].name}`;
  rollBtn.disabled=state.locked;
  saveGame();
}

function escapeHtml(value){return String(value).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}

async function rollDice() {
  if(!state||state.locked)return;
  state.locked=true; rollBtn.disabled=true;
  const value=Math.floor(Math.random()*6)+1;
  dice.classList.add('rolling');
  for(let i=0;i<7;i++){dice.textContent=DICE[Math.floor(Math.random()*6)]; synthTone('tick',0.025); await delay(65);}
  dice.textContent=DICE[value-1]; dice.classList.remove('rolling');
  statusText.textContent=`${state.players[state.current].name} obtuvo ${value}.`;
  await moveCurrentPlayerBy(value);
  if(state.players[state.current].position>=BOARD_END)return showWinner(state.players[state.current]);
  setTimeout(()=>triggerCell(state.players[state.current].position),180);
}

async function moveCurrentPlayerBy(delta){
  const p=state.players[state.current];
  const target=Math.max(0,Math.min(BOARD_END,p.position+delta));
  const step=target>=p.position?1:-1;
  while(p.position!==target){p.position+=step;render();document.querySelector(`[data-cell="${p.position}"] .board-token:last-child`)?.classList.add('moving');await delay(145);}
}

function triggerCell(cell){
  const rule=ruleForCell(cell);
  switch(rule.type){
    case'question':return startQuestion(rule.deck);
    case'case':return startCase(rule.deck);
    case'advance1':return showMovementEvent('advance1',1);
    case'advance2':return showMovementEvent('advance2',2);
    case'back1':return showMovementEvent('back1',-1);
    case'back2':return showMovementEvent('back2',-2);
    case'vacation':return showVacationEvent();
    case'jail':return showJailEvent();
    case'finish':return showWinner(state.players[state.current]);
    default:statusText.textContent='Casilla sin evento especial. Continúa el siguiente jugador.';synthTone('neutral');setTimeout(endTurn,500);
  }
}

function pickUnused(pool,usedKey){
  let candidates=pool.filter(item=>!state[usedKey].includes(String(item.id)));
  if(!candidates.length){const ids=new Set(pool.map(item=>String(item.id)));state[usedKey]=state[usedKey].filter(id=>!ids.has(id));candidates=pool;}
  const chosen=candidates[Math.floor(Math.random()*candidates.length)]; if(chosen)state[usedKey].push(String(chosen.id)); return chosen;
}

function startQuestion(deck){
  const q=pickUnused(questions.filter(x=>x.deck===deck),'usedQuestionIds');
  if(!q)return showEvent('Pregunta',`No hay preguntas disponibles en el sobre ${deck}.`,'❓',endTurn,'question');
  pendingQuestion={...q,kind:'question'};selectedAnswer=null;showQuestion(pendingQuestion);
}
function startCase(deck){
  const q=pickUnused(clinicalCases.filter(x=>x.deck===deck),'usedCaseIds');
  if(!q)return showEvent('Caso clínico',`No hay casos disponibles en el sobre ${deck}.`,'📩',endTurn,'case');
  pendingQuestion={...q,kind:'case'};selectedAnswer=null;showQuestion(pendingQuestion);
}

