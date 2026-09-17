const PLAYER_COLORS = ['#6a3f95','#d05f91','#2e8b78','#d18a32','#3975b7','#8d5b45'];
const DICE = ['⚀','⚁','⚂','⚃','⚄','⚅'];
const STORAGE_KEY = 'ortopediaGameV01';

const questions = [
  { id:1, category:'dental', text:'La trampa lingual actúa inhibiendo el avance de la lengua durante la deglución.', options:['Verdadero','Falso'], correct:0, explanation:'La trampa lingual funciona como barrera mecánica para limitar la protrusión lingual.' },
  { id:3, category:'dental', text:'El arco transpalatino promueve por sí mismo la expansión ósea bilateral del maxilar.', options:['Verdadero','Falso'], correct:1, explanation:'El ATP se usa principalmente para control transversal, anclaje y rotación molar; no equivale a un disyuntor ortopédico.' },
  { id:4, category:'dental', text:'La máscara facial se utiliza para protraer el maxilar en pacientes seleccionados con Clase III por deficiencia maxilar.', options:['Verdadero','Falso'], correct:0, explanation:'Su objetivo ortopédico es favorecer la protracción del complejo maxilar durante el crecimiento.' },
  { id:6, category:'dental', text:'¿Qué elemento produce la apertura del disyuntor tipo Hyrax?', options:['Un tornillo central','Un resorte vestibular','Un arco lingual','Una barra transpalatina'], correct:0, explanation:'El Hyrax emplea un tornillo de expansión central. El protocolo de activación depende de la indicación clínica.' },
  { id:8, category:'culture', text:'¿Qué aparato le coloca el papá dentista a Charlie en Charlie y la fábrica de chocolate (2005)?', options:['Frenillos linguales','Expansor tipo Hyrax','Máscara facial','Casco de contención dental'], correct:3, explanation:'En la película se muestra un gran aparato extraoral/casco correctivo.' },
  { id:9, category:'dental', text:'La pantalla vestibular puede modificar patrones de presión muscular y utilizarse en el manejo de algunos hábitos orales.', options:['Verdadero','Falso'], correct:0, explanation:'Actúa como escudo entre labios/mejillas y dientes, por lo que puede formar parte de una estrategia miofuncional.' },
  { id:11, category:'dental', text:'El disyuntor tipo Hyrax actúa principalmente sobre la sutura media palatina cuando logra un efecto ortopédico.', options:['Verdadero','Falso'], correct:0, explanation:'La expansión rápida maxilar busca separar la sutura media palatina en pacientes adecuados.' },
  { id:13, category:'dental', text:'¿Cuál es la acción ortopédica buscada con una máscara facial en una Clase III por deficiencia maxilar?', options:['Frenado mandibular como acción principal','Protracción del maxilar','Retención postratamiento','Distalización molar como objetivo principal'], correct:1, explanation:'La máscara facial se indica para protracción maxilar en pacientes seleccionados y en crecimiento.' },
  { id:14, category:'culture', text:'Completa la frase asociada a Naruto: “Soy Naruto Uzumaki y…”', options:['Soy el más perrón aquí','Y yo antes era como tú','¡Algún día seré Hokage!','¡Nunca me rendiré, Sasuke!'], correct:2, explanation:'La meta recurrente del personaje es convertirse en Hokage.' },
  { id:17, category:'dental', text:'¿Cuál de estos aparatos no está diseñado específicamente para controlar directamente la postura o interposición lingual?', options:['Trampa lingual','Perla de Tucat','Plano anterior de mordida','Rejilla lingual'], correct:2, explanation:'El plano de mordida modifica contactos/relaciones oclusales; los demás pueden relacionarse más directamente con el control o reeducación lingual.' },
  { id:19, category:'dental', text:'¿Qué combinación aborda de forma directa lengua y presión labial en una mordida abierta funcional?', options:['Hawley con tornillo anterior','Máscara facial','Pantalla vestibular + trampa lingual','Plano inclinado anterior'], correct:2, explanation:'La combinación puede actuar sobre presión perioral y protrusión/interposición lingual dentro de un plan clínico.' },
  { id:20, category:'culture', text:'¿Cuál de estas canciones NO fue compuesta por José Alfredo Jiménez?', options:['Cielo Rojo','El Rey','Caminos de Guanajuato','Si nos dejan'], correct:0, explanation:'“Cielo Rojo” fue compuesta por Juan Záizar.' },
  { id:23, category:'dental', text:'¿Qué añade el Pendex respecto del Péndulo clásico?', options:['Solo un resorte más rígido','Un tornillo para expansión transversal','Una máscara facial','Un arco lingual inferior'], correct:1, explanation:'El Pendex combina el mecanismo de distalización con un tornillo de expansión.' },
  { id:24, category:'culture', text:'¿Cómo se llama la escuela de Zoey 101?', options:['Ocean Valley School','Malibu Academy','PCA (Pacific Coast Academy)','Sunshine High'], correct:2, explanation:'La serie se desarrolla en la ficticia Pacific Coast Academy (PCA).' },
  { id:26, category:'dental', text:'¿Qué método radiográfico se usa con frecuencia para valorar maduración esquelética en ortodoncia/ortopedia dentofacial?', options:['Maduración vertebral cervical en cefalometría lateral','Palpación de la sutura palatina','Solo cronología de erupción','Medición de altura mensual'], correct:0, explanation:'La maduración vertebral cervical (CVM/CVMI) es uno de los métodos usados para estimar el estadio de crecimiento.' },
  { id:27, category:'dental', text:'¿Cuál describe mejor una diferencia general entre ortopedia dentofacial y ortodoncia?', options:['La ortopedia solo mueve dientes','La ortodoncia actúa únicamente en el maxilar','La ortopedia busca modificar crecimiento/relaciones esqueléticas cuando está indicada','La ortodoncia siempre modifica crecimiento óseo'], correct:2, explanation:'La ortopedia dentofacial busca influir en crecimiento y relaciones esqueléticas; la ortodoncia se centra principalmente en el movimiento dentario.' },
  { id:30, category:'culture', text:'¿Qué automóvil fue conocido como “el vochito” en México y dejó de producirse allí en 2003?', options:['Volkswagen Sedán','Volkswagen Jetta','Volkswagen Virtus','Volkswagen Vento'], correct:0, explanation:'El Volkswagen Sedán fue producido en Puebla hasta 2003.' },
  { id:31, category:'culture', text:'¿Qué emperador mexica recibió a Hernán Cortés en 1519?', options:['Moctezuma I','Moctezuma II','Cuauhtémoc','Tenochtli'], correct:1, explanation:'Moctezuma II recibió a Cortés en Tenochtitlan en 1519.' },
  { id:33, category:'culture', text:'¿Qué evento se considera el inicio de la Segunda Guerra Mundial en Europa?', options:['Ataque a Pearl Harbor','Invasión alemana de Polonia','Tratado de Versalles','Caída del muro de Berlín'], correct:1, explanation:'Alemania invadió Polonia el 1 de septiembre de 1939.' },
  { id:34, category:'culture', text:'¿Quién dirigió Titanic (1997)?', options:['Steven Spielberg','Martin Scorsese','James Cameron','Christopher Nolan'], correct:2, explanation:'James Cameron dirigió y escribió Titanic.' }
];

const clinicalCases = [
  { id:'C1', category:'case', text:'Paciente de 13 años con Clase II esquelética, mordida abierta, protrusión lingual, respiración oral y deglución atípica. ¿Qué enfoque del juego aborda de forma más directa los hábitos orales?', options:['Lip Bumper','Perla de Tucat con anclaje','Trampa lingual + pantalla vestibular','Pistas planas sin control lingual'], correct:2, explanation:'En el material original, la combinación trampa lingual + pantalla vestibular se plantea para intervenir sobre la función lingual y hábitos.' },
  { id:'C7', category:'case', text:'Paciente de 13 años con Clase III esquelética y mordida cruzada anterior/posterior. ¿Cuál de estas opciones del juego está orientada a expansión y protracción maxilar?', options:['Arco extraoral cervical','Máscara facial + Hyrax','Arco lingual inferior','Botón de Nance'], correct:1, explanation:'La combinación de expansión maxilar y máscara facial se usa en protocolos de protracción maxilar en pacientes seleccionados.' },
  { id:'C11', category:'case', text:'Paciente de 15 años con Clase II esquelética y overjet aumentado. ¿Qué opción es un aparato funcional usado para avance mandibular en pacientes seleccionados?', options:['Mentonera','Twin Block','Distal Jet','Hyrax'], correct:1, explanation:'Twin Block es un aparato funcional utilizado para corrección de Clase II en pacientes en crecimiento apropiadamente seleccionados.' }
];

let state = null;
let pendingQuestion = null;
let selectedAnswer = null;
let soundEnabled = true;

const $ = (id) => document.getElementById(id);
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

function eventTypeForCell(n) {
  if (n === 0) return 'start';
  if (n === 37) return 'finish';
  if ([5,11,17,23,29,35].includes(n)) return 'case';
  if ([3,7,10,14,18,22,26,30,34].includes(n)) return 'culture';
  return 'dental';
}

function buildBoard() {
  board.innerHTML = '';
  const cells = [];
  for (let n=0; n<=37; n++) {
    const type = eventTypeForCell(n);
    const cell = document.createElement('div');
    cell.className = `cell ${type}`;
    cell.dataset.cell = n;
    const icon = type === 'case' ? '📩' : type === 'culture' ? '⭐' : type === 'dental' ? '🦷' : n === 0 ? '🚩' : '🏁';
    const label = n === 0 ? 'Inicio' : n === 37 ? 'Fin' : n;
    cell.innerHTML = `<span class="cell-number">${label}</span><span class="cell-icon">${icon}</span><div class="tokens"></div>`;
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
    players: Array.from({length:count}, (_,i) => ({
      name: ($(`name-${i}`).value || `Jugador ${i+1}`).trim(),
      position: 0,
      score: 0,
      color: PLAYER_COLORS[i]
    })),
    current: 0,
    usedQuestionIds: [],
    turn: 1,
    locked: false
  };
  saveGame();
  setup.classList.remove('active');
  game.classList.add('active');
  buildBoard();
  render();
}

function render() {
  if (!state) return;
  document.querySelectorAll('.tokens').forEach(x => x.innerHTML = '');
  state.players.forEach((p,i) => {
    const holder = document.querySelector(`[data-cell="${p.position}"] .tokens`);
    if (!holder) return;
    const t = document.createElement('span');
    t.className = 'board-token';
    t.style.setProperty('--token', p.color);
    t.textContent = i+1;
    t.title = p.name;
    holder.appendChild(t);
  });
  $('scoreList').innerHTML = state.players.map((p,i) => `
    <div class="player-score ${i===state.current?'current':''}">
      <span class="mini-token" style="--token:${p.color}">${i+1}</span>
      <div><strong>${escapeHtml(p.name)}</strong><br><small>Casilla ${p.position}</small></div>
      <strong>${p.score} pts</strong>
    </div>`).join('');
  $('turnLabel').textContent = `Turno ${state.turn}: ${state.players[state.current].name}`;
  rollBtn.disabled = state.locked;
  saveGame();
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
}

async function rollDice() {
  if (!state || state.locked) return;
  state.locked = true;
  rollBtn.disabled = true;
  const value = Math.floor(Math.random()*6)+1;
  dice.classList.add('rolling');
  for (let i=0;i<5;i++) {
    dice.textContent = DICE[Math.floor(Math.random()*6)];
    await delay(75);
  }
  dice.textContent = DICE[value-1];
  dice.classList.remove('rolling');
  statusText.textContent = `${state.players[state.current].name} obtuvo ${value}.`;
  await moveCurrentPlayer(value);
}

async function moveCurrentPlayer(steps) {
  const p = state.players[state.current];
  const target = Math.min(37, p.position + steps);
  while (p.position < target) {
    p.position += 1;
    render();
    const token = document.querySelector(`[data-cell="${p.position}"] .board-token:last-child`);
    token?.classList.add('moving');
    await delay(180);
  }
  if (p.position >= 37) {
    p.position = 37;
    render();
    showWinner(p);
    return;
  }
  setTimeout(() => triggerCell(p.position), 200);
}

function triggerCell(cell) {
  const type = eventTypeForCell(cell);
  const pool = type === 'case' ? clinicalCases : questions.filter(q => q.category === type);
  let candidates = pool.filter(q => !state.usedQuestionIds.includes(String(q.id)));
  if (!candidates.length) candidates = pool;
  pendingQuestion = candidates[Math.floor(Math.random()*candidates.length)];
  if (!pendingQuestion) { endTurn(); return; }
  state.usedQuestionIds.push(String(pendingQuestion.id));
  selectedAnswer = null;
  showQuestion(pendingQuestion);
}

function showQuestion(q) {
  $('questionCategory').textContent = q.category === 'case' ? 'Caso clínico' : q.category === 'culture' ? 'Cultura general' : 'Ortopedia dental';
  $('questionNumber').textContent = `Casilla ${state.players[state.current].position}`;
  $('questionText').textContent = q.text;
  $('feedback').hidden = true;
  $('confirmAnswerBtn').hidden = false;
  $('continueBtn').hidden = true;
  $('confirmAnswerBtn').disabled = true;
  $('questionOptions').innerHTML = q.options.map((opt,i) => `
    <label class="option" data-index="${i}">
      <input type="radio" name="answer" value="${i}">
      <span>${escapeHtml(opt)}</span>
    </label>`).join('');
  document.querySelectorAll('.option').forEach(opt => opt.addEventListener('click', () => {
    document.querySelectorAll('.option').forEach(x => x.classList.remove('selected'));
    opt.classList.add('selected');
    selectedAnswer = Number(opt.dataset.index);
    $('confirmAnswerBtn').disabled = false;
  }));
  questionDialog.showModal();
}

function confirmAnswer() {
  if (selectedAnswer === null || !pendingQuestion) return;
  const correct = selectedAnswer === pendingQuestion.correct;
  const optionEls = [...document.querySelectorAll('.option')];
  optionEls.forEach((el,i) => {
    el.classList.remove('selected');
    if (i === pendingQuestion.correct) el.classList.add('correct');
    if (i === selectedAnswer && !correct) el.classList.add('wrong');
    el.querySelector('input').disabled = true;
  });
  const points = pendingQuestion.category === 'case' ? 2 : 1;
  if (correct) state.players[state.current].score += points;
  const feedback = $('feedback');
  feedback.hidden = false;
  feedback.innerHTML = `<strong>${correct ? `✅ Correcto · +${points} punto${points>1?'s':''}` : '❌ Respuesta incorrecta'}</strong>${escapeHtml(pendingQuestion.explanation || '')}`;
  $('confirmAnswerBtn').hidden = true;
  $('continueBtn').hidden = false;
  render();
}

function endTurn() {
  questionDialog.close();
  pendingQuestion = null;
  selectedAnswer = null;
  state.current = (state.current + 1) % state.players.length;
  state.turn += 1;
  state.locked = false;
  statusText.textContent = `Sigue ${state.players[state.current].name}.`;
  render();
}

function showWinner(player) {
  state.locked = true;
  $('winnerTitle').textContent = `¡${player.name} llegó a la meta!`;
  const top = [...state.players].sort((a,b)=>b.score-a.score)[0];
  $('winnerText').textContent = `${player.name} terminó el recorrido. Mayor puntuación de preguntas: ${top.name}, con ${top.score} puntos.`;
  $('winnerDialog').showModal();
  localStorage.removeItem(STORAGE_KEY);
}

function saveGame() {
  if (state) localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  resumeBtn.hidden = !localStorage.getItem(STORAGE_KEY);
}

function resumeGame() {
  try { state = JSON.parse(localStorage.getItem(STORAGE_KEY)); }
  catch { return; }
  if (!state?.players?.length) return;
  state.locked = false;
  setup.classList.remove('active');
  game.classList.add('active');
  buildBoard();
  statusText.textContent = `Partida recuperada. Sigue ${state.players[state.current].name}.`;
  render();
}

function resetGame() {
  if (!confirm('¿Reiniciar la partida actual?')) return;
  localStorage.removeItem(STORAGE_KEY);
  state = null;
  game.classList.remove('active');
  setup.classList.add('active');
  buildNameInputs();
  resumeBtn.hidden = true;
}

function delay(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

playerCount.addEventListener('change', buildNameInputs);
$('newGameBtn').addEventListener('click', newGame);
resumeBtn.addEventListener('click', resumeGame);
rollBtn.addEventListener('click', rollDice);
$('confirmAnswerBtn').addEventListener('click', confirmAnswer);
$('continueBtn').addEventListener('click', endTurn);
$('resetBtn').addEventListener('click', resetGame);
$('playAgainBtn').addEventListener('click', () => { $('winnerDialog').close(); resetGame(); });
$('soundBtn').addEventListener('click', () => { soundEnabled = !soundEnabled; $('soundBtn').textContent = soundEnabled ? '🔊' : '🔇'; });

buildNameInputs();
resumeBtn.hidden = !localStorage.getItem(STORAGE_KEY);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
}
