const BOARD_END=100;
const STORAGE_KEY='ortopediaGameV10';
const DICE=['⚀','⚁','⚂','⚃','⚄','⚅'];
const CHARACTERS=[
  {name:'La Doctora',role:'Odontóloga',emoji:'👩🏻‍⚕️',pawnEmoji:'👩🏻‍⚕️',reactionEmoji:'😉',color:'#2f8df5',anim:'wink',reaction:'¡Lista para cuidar sonrisas!',desc:'Clínica, decidida y orientada al diagnóstico.'},
  {name:'El Estudiante',role:'Explorador del conocimiento',emoji:'👨🏻‍🎓',pawnEmoji:'👨🏻‍🎓',reactionEmoji:'🙋🏻‍♂️',color:'#21b56c',anim:'jump',reaction:'¡Vamos a aprender jugando!',desc:'Curioso, observador y siempre listo para aprender.'},
  {name:'Súper Diente',role:'Héroe de la sonrisa',emoji:'🦷',pawnEmoji:'🦷',reactionEmoji:'🦷✨',color:'#f34d72',anim:'hero',reaction:'¡Al rescate de las sonrisas!',desc:'Valiente, energético y defensor de las sonrisas.'},
  {name:'Bracki',role:'Maestro de los brackets',emoji:'😁',pawnEmoji:'😁',reactionEmoji:'😜',color:'#8a52e8',anim:'wiggle',reaction:'¡Brackets listos!',desc:'Divertido, ingenioso y especialista en retos.'},
  {name:'La Científica',role:'Investigadora',emoji:'👩🏻‍🔬',pawnEmoji:'👩🏻‍🔬',reactionEmoji:'💡',color:'#f3b423',anim:'pulse',reaction:'¡Tengo una hipótesis!',desc:'Analítica, creativa y enfocada en la evidencia.'},
  {name:'La Ortodoncista',role:'Especialista en ortodoncia',emoji:'👩🏼‍⚕️🦷',pawnEmoji:'👩🏼‍⚕️',reactionEmoji:'😉✨',color:'#18a7c9',anim:'wink',reaction:'¡A alinear esa sonrisa!',desc:'Experta en oclusión, alineación y planificación ortodóncica.'},
  {name:'La Odontopediatra',role:'Especialista infantil',emoji:'👩🏽‍⚕️🧸',pawnEmoji:'👩🏽‍⚕️',reactionEmoji:'🤗',color:'#ff7aa8',anim:'jump',reaction:'¡Una visita puede ser divertida!',desc:'Amable, paciente y experta en el cuidado dental infantil.'},
  {name:'El Cirujano Maxilofacial',role:'Cirugía oral y maxilofacial',emoji:'👨🏽‍⚕️🩺',pawnEmoji:'👨🏽‍⚕️',reactionEmoji:'👍🏽',color:'#5367d8',anim:'hero',reaction:'¡Plan preciso, manos listas!',desc:'Sereno, preciso y enfocado en los retos quirúrgicos.'},
  {name:'El Endodoncista',role:'Especialista en endodoncia',emoji:'👨🏻‍⚕️🔬',pawnEmoji:'👨🏻‍⚕️',reactionEmoji:'🔍',color:'#00a88f',anim:'pulse',reaction:'¡A encontrar el conducto!',desc:'Minucioso, técnico y especialista en diagnóstico pulpar.'},
  {name:'La Periodoncista',role:'Especialista en encías',emoji:'👩🏾‍⚕️🪥',pawnEmoji:'👩🏾‍⚕️',reactionEmoji:'😁✨',color:'#65b84f',anim:'wiggle',reaction:'¡Encías sanas, sonrisa fuerte!',desc:'Cuida los tejidos de soporte y la salud periodontal.'},
  {name:'La Prostodoncista',role:'Rehabilitación oral',emoji:'👩🏻‍⚕️👑',pawnEmoji:'👩🏻‍⚕️',reactionEmoji:'👑✨',color:'#e29b27',anim:'pulse',reaction:'¡Vamos a reconstruir la sonrisa!',desc:'Creativa y precisa en rehabilitación, coronas y prótesis.'},
  {name:'La Asistente Dental',role:'Asistencia clínica',emoji:'🧑🏼‍⚕️📋',pawnEmoji:'🧑🏼‍⚕️',reactionEmoji:'🙌🏼',color:'#e76f51',anim:'jump',reaction:'¡Todo listo para comenzar!',desc:'Organizada, ágil y siempre preparada para apoyar al equipo.'}
];
const RULE_META={
  question:{icon:'❓',title:'Pregunta',message:'Si contestas mal, retrocedes 1 casilla.'},
  case:{icon:'📋',title:'Caso clínico',message:'Excelente +2 · Buena +1 · Incorrecta −1.'},
  back2:{icon:'📁',title:'Perdiste el expediente',message:'Retrocede 2 casillas.'},
  jail:{icon:'⚖️',title:'Cárcel',message:'Tu paciente está muy molesto y te ha demandado. Pierdes 1 turno.'},
  vacation:{icon:'🏖️',title:'Vacaciones',message:'Te fuiste de vacaciones. Regresa al INICIO.'},
  advance1:{icon:'✅',title:'Excelente diagnóstico',message:'Avanza 1 casilla.'},
  advance2:{icon:'🏁',title:'Tratamiento concluido',message:'Avanza 2 casillas.'},
  back1:{icon:'📅',title:'Paciente canceló',message:'Retrocede 1 casilla.'},
  neutral:{icon:'🦷',title:'Casilla'},finish:{icon:'🏆',title:'Meta'}
};
const CELL_TYPES={
  question:new Set([3,8,15,21,28,35,42,49,56,63,70,77,84,91,97]),
  case:new Set([5,12,18,25,32,39,46,53,60,67,74,81,88,95]),
  advance1:new Set([6,23,41,58,76,93]),
  advance2:new Set([11,30,51,72,90]),
  back1:new Set([16,34,55,79,96]),
  back2:new Set([26,65,87]),
  jail:new Set([44,83]),
  vacation:new Set([37,68])
};
const TEACHER_ACTIVE_KEY='ortopediaActiveTeacherQuestionsV1';
const TEACHER_CASE_KEY='ortopediaActiveTeacherCasesV1';
function loadTeacherQuestions(){try{const q=JSON.parse(localStorage.getItem(TEACHER_ACTIVE_KEY)||'[]');return Array.isArray(q)?q.filter(x=>x&&x.text&&Array.isArray(x.options)&&x.options.length>=2):[]}catch{return[]}}
function loadTeacherCases(){try{const c=JSON.parse(localStorage.getItem(TEACHER_CASE_KEY)||'[]');return Array.isArray(c)?c.filter(x=>x&&x.text&&Array.isArray(x.options)&&x.options.length>=2):[]}catch{return[]}}
const questions=[...(window.QUESTIONS||[]),...loadTeacherQuestions()];
const fundamentalsQuestions=[...(window.FUNDAMENTOS_OCLUSION||[])];
const clinicalCases=[...(window.CLINICAL_CASES||[]),...loadTeacherCases()];
const fundamentalsCases=[...(window.FUNDAMENTOS_CASES||[])];
const steinerQuestions=[...(window.STEINER_QUESTIONS||[])];
const steinerCases=[...(window.STEINER_CASES||[])];
const physiologyFunctionQuestions=[...(window.FISIOLOGIA_FUNCION_QUESTIONS||[])];
const physiologyFunctionCases=[...(window.FISIOLOGIA_FUNCION_CASES||[])];
const growthDevelopmentQuestions=[...(window.CRECIMIENTO_DESARROLLO_QUESTIONS||[])];
const growthDevelopmentCases=[...(window.CRECIMIENTO_DESARROLLO_CASES||[])];
const habitsParafunctionsQuestions=[...(window.HABITOS_PARAFUNCIONES_QUESTIONS||[])];
const habitsParafunctionsCases=[...(window.HABITOS_PARAFUNCIONES_CASES||[])];
function activeQuestionBank(){
  if(state?.module==='fundamentos_oclusion')return fundamentalsQuestions;
  if(state?.module==='fisiologia_funcion')return physiologyFunctionQuestions;
  if(state?.module==='crecimiento_desarrollo')return growthDevelopmentQuestions;
  if(state?.module==='habitos_parafunciones')return habitsParafunctionsQuestions;
  if(state?.module==='steiner')return steinerQuestions;
  return questions
}
function activeCaseBank(){
  if(state?.module==='fundamentos_oclusion')return fundamentalsCases;
  if(state?.module==='fisiologia_funcion')return physiologyFunctionCases;
  if(state?.module==='crecimiento_desarrollo')return growthDevelopmentCases;
  if(state?.module==='habitos_parafunciones')return habitsParafunctionsCases;
  if(state?.module==='steiner')return steinerCases;
  return clinicalCases
}
let state=null,draft=null,pendingQuestion=null,selectedAnswer=null,pendingAfterDialog=null,soundEnabled=localStorage.getItem('elCaminoDentalSound')!=='off',timer=null,timerLeft=30;
const $=id=>document.getElementById(id);
const screens=['setup','characters','loadingScreen','game'].map($);
const board=$('board'),playerCount=$('playerCount'),playerNames=$('playerNames'),gameModule=$('gameModule'),resumeBtn=$('resumeBtn'),rollBtn=$('rollBtn'),statusText=$('statusText');
const questionDialog=$('questionDialog'),eventDialog=$('eventDialog'),rulesDialog=$('rulesDialog');
function showScreen(el){screens.forEach(x=>x?.classList.remove('active'));el.classList.add('active');const playing=el?.id==='game';document.body.classList.toggle('game-playing',playing);if(playing)window.scrollTo(0,0)}
function esc(v){return String(v).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
function ruleForCell(n){if(n===0)return{type:'start'};if(n>=100)return{type:'finish'};for(const [type,set] of Object.entries(CELL_TYPES))if(set.has(n)){if(type==='question')return{type,deck:(n%3)+1};if(type==='case')return{type,deck:(n%5)+1};return{type}}return{type:'neutral'}}
function tokenFace(p){const ch=CHARACTERS[p.character]||CHARACTERS[0];return ch.pawnEmoji||ch.emoji||'🦷'}
function tokenShift(index,total){if(total<=1)return{x:0,y:0};const cols=Math.min(2,total),row=Math.floor(index/cols),col=index%cols,gap=19;return{x:(col-(cols-1)/2)*gap,y:(row-(Math.ceil(total/cols)-1)/2)*gap}}
function buildNameInputs(){playerNames.innerHTML='';const count=Number(playerCount.value);for(let i=0;i<count;i++){const row=document.createElement('label');row.className='name-row';row.innerHTML=`<span class="player-number">${i+1}</span><input id="name-${i}" maxlength="20" value="Jugador ${i+1}" aria-label="Nombre del jugador ${i+1}">`;playerNames.appendChild(row)}}
function beginCharacterSelection(){const count=Number(playerCount.value);draft={count,module:gameModule?.value||'fundamentos_oclusion',names:Array.from({length:count},(_,i)=>($(`name-${i}`).value||`Jugador ${i+1}`).trim()),characters:Array(count).fill(null),pickerIndex:0};showScreen($('characters'));renderPicker();tone('select')}
function renderPicker(){const i=draft.pickerIndex,taken=new Set(draft.characters.filter((x,j)=>x!==null&&j!==i));$('pickerTitle').textContent=`${draft.names[i]}, elige tu personaje`;$('pickerHint').textContent=`Jugador ${i+1} de ${draft.count}. Cada personaje solo puede elegirse una vez.`;const grid=$('characterGrid');grid.innerHTML='';CHARACTERS.forEach((ch,idx)=>{const b=document.createElement('button');b.type='button';b.disabled=taken.has(idx);b.className=`character-card${draft.characters[i]===idx?' selected':''}${taken.has(idx)?' taken':''}`;b.dataset.char=idx;b.style.setProperty('--accent',ch.color);b.innerHTML=`<div class="character-art">${ch.emoji}</div><span class="character-bubble" hidden>${ch.reaction}</span><span class="pawn" style="--pawn:${ch.color}"></span><h3>${ch.name}</h3><b>${ch.role}</b><p>${ch.desc}</p><span class="select-label">${taken.has(idx)?'En uso':draft.characters[i]===idx?'Seleccionado':'Seleccionar'}</span>`;b.onclick=()=>{draft.characters[i]=idx;tone('select');renderPicker();requestAnimationFrame(()=>reactCharacter(idx))};grid.appendChild(b)});$('pickerNextBtn').disabled=draft.characters[i]===null;$('pickerNextBtn').textContent=i===draft.count-1?'Comenzar partida →':'Siguiente →';$('pickedSummary').innerHTML=draft.names.map((n,j)=>`<span>${esc(n)} · ${draft.characters[j]===null?'sin elegir':CHARACTERS[draft.characters[j]].name}</span>`).join('')}
function reactCharacter(idx){const ch=CHARACTERS[idx],card=document.querySelector(`[data-char="${idx}"]`);if(!card||!ch)return;const art=card.querySelector('.character-art'),bubble=card.querySelector('.character-bubble');if(!art)return;art.textContent=ch.reactionEmoji||ch.emoji;art.classList.remove('reaction-wink','reaction-jump','reaction-hero','reaction-wiggle','reaction-pulse');void art.offsetWidth;art.classList.add('reaction-'+ch.anim);if(bubble)bubble.hidden=false;setTimeout(()=>{if(document.body.contains(art)){art.textContent=ch.emoji;art.classList.remove('reaction-'+ch.anim)}if(bubble&&document.body.contains(bubble))bubble.hidden=true},780)}
function pickerNext(){if(draft.characters[draft.pickerIndex]===null)return;if(draft.pickerIndex<draft.count-1){draft.pickerIndex++;renderPicker()}else startWithLoading()}
function pickerBack(){if(draft.pickerIndex>0){draft.pickerIndex--;renderPicker()}else showScreen($('setup'))}
function secureRandomIndex(max){
  if(max<=1)return 0;
  try{
    if(window.crypto?.getRandomValues){
      const limit=Math.floor(0x100000000/max)*max;
      const buf=new Uint32Array(1);
      do{window.crypto.getRandomValues(buf)}while(buf[0]>=limit);
      return buf[0]%max;
    }
  }catch{}
  return Math.floor(Math.random()*max)
}
function shuffledIndices(length,lastIndex=null){
  const a=Array.from({length},(_,i)=>i);
  for(let i=a.length-1;i>0;i--){
    const j=secureRandomIndex(i+1);
    [a[i],a[j]]=[a[j],a[i]]
  }
  if(a.length>1&&lastIndex!==null&&a[a.length-1]===lastIndex){
    [a[0],a[a.length-1]]=[a[a.length-1],a[0]]
  }
  return a
}
function ensureRandomQueues(force=false){
  if(!state)return;
  const qLen=activeQuestionBank().length,cLen=activeCaseBank().length;
  if(force||!Array.isArray(state.questionQueue)||state.questionQueueSize!==qLen){
    state.questionQueue=shuffledIndices(qLen,state.lastQuestionIndex??null);
    state.questionQueueSize=qLen
  }
  if(force||!Array.isArray(state.caseQueue)||state.caseQueueSize!==cLen){
    state.caseQueue=shuffledIndices(cLen,state.lastCaseIndex??null);
    state.caseQueueSize=cLen
  }
}
function pickQueued(pool,queueKey,sizeKey,lastKey){
  if(!pool.length)return null;
  if(!Array.isArray(state[queueKey])||state[sizeKey]!==pool.length||!state[queueKey].length){
    state[queueKey]=shuffledIndices(pool.length,state[lastKey]??null);
    state[sizeKey]=pool.length
  }
  let idx=state[queueKey].pop();
  if(!Number.isInteger(idx)||idx<0||idx>=pool.length){
    state[queueKey]=shuffledIndices(pool.length,state[lastKey]??null);
    state[sizeKey]=pool.length;
    idx=state[queueKey].pop()
  }
  state[lastKey]=idx;
  return pool[idx]
}
function randomizePresentedItem(item,kind){
  if(!item?.options?.length)return item;
  const order=shuffledIndices(item.options.length);
  const out={...item,options:order.map(i=>item.options[i])};
  if(kind==='case'){
    out.grades=order.map(i=>item.grades?.[i]||'incorrect');
    out.feedback=order.map(i=>item.feedback?.[i]||'Revisa el razonamiento clínico.')
  }else{
    out.correct=order.indexOf(item.correct)
  }
  return out
}
async function startWithLoading(){showScreen($('loadingScreen'));tone('start');await delay(700);state={version:11,module:draft.module||'fundamentos_oclusion',players:Array.from({length:draft.count},(_,i)=>({name:draft.names[i],position:0,skipTurns:0,character:draft.characters[i],color:CHARACTERS[draft.characters[i]].color})),current:0,usedQuestionIds:[],usedCaseIds:[],questionQueue:[],caseQueue:[],questionQueueSize:0,caseQueueSize:0,lastQuestionIndex:null,lastCaseIndex:null,turn:1,locked:false};ensureRandomQueues(true);saveGame();showScreen($('game'));buildBoard();render();startBackgroundMusic();statusText.textContent=`${state.players[0].name}, tira los dos dados.`}
function buildBoard(){board.querySelectorAll('.cell,.start-marker').forEach(n=>n.remove());const start=document.createElement('div');start.className='start-marker';start.innerHTML='<b>INICIO</b><div class="start-tokens"></div>';board.appendChild(start);for(let n=1;n<=100;n++){const t=(n-1)/99,turns=4.6,theta=-Math.PI*.68+t*turns*2*Math.PI,rx=46-29*t,ry=44-27*t,x=50+rx*Math.cos(theta),y=50+ry*Math.sin(theta),r=ruleForCell(n),m=RULE_META[r.type]||RULE_META.neutral,c=document.createElement('div');c.className=`cell ${r.type}${n===100?' finish':''}${n%10===0&&n<100?' milestone':''}`;c.dataset.cell=n;c.style.left=`${x}%`;c.style.top=`${y}%`;c.style.zIndex=110-n;c.innerHTML=`<span class="cell-number">${n}</span>${r.type!=='neutral'&&r.type!=='finish'?`<span class="cell-icon">${m.icon}</span>`:''}<span class="tokens"></span>`;board.appendChild(c)}}
function render(){if(!state)return;document.querySelectorAll('.tokens,.start-tokens').forEach(x=>x.innerHTML='');document.querySelectorAll('.cell').forEach(c=>c.classList.remove('occupied','current-cell'));const grouped=new Map();state.players.forEach((p,i)=>{const pos=Math.max(0,Math.min(p.position,100));if(!grouped.has(pos))grouped.set(pos,[]);grouped.get(pos).push({p,i})});for(const [pos,list] of grouped.entries()){const host=pos===0?document.querySelector('.start-tokens'):document.querySelector(`[data-cell="${pos}"] .tokens`),cell=pos===0?document.querySelector('.start-marker'):document.querySelector(`[data-cell="${pos}"]`);if(host){list.forEach(({p,i},idx)=>{const tok=document.createElement('span');tok.className='board-token'+(i===state.current?' active':'');tok.style.setProperty('--token',p.color);const sh=tokenShift(idx,list.length);tok.style.setProperty('--sx',sh.x+'px');tok.style.setProperty('--sy',sh.y+'px');tok.innerHTML=`<span class="token-face">${tokenFace(p)}</span>`;tok.title=p.name;host.appendChild(tok)});cell?.classList.add('occupied');if(list.some(x=>x.i===state.current))cell?.classList.add('current-cell')}}$('scoreList').innerHTML=state.players.map((p,i)=>{const ch=CHARACTERS[p.character]||CHARACTERS[0];return `<div class="player-row ${i===state.current?'current':''}" style="--player:${p.color}"><div class="avatar">${ch.emoji}</div><div><b>${esc(p.name)}</b><small>${ch.name} · ${p.position===0?'Inicio':p.position>=100?'Meta':`Casilla ${p.position}`}${p.skipTurns?` · pierde ${p.skipTurns} turno`:''}</small><div class="progress"><i style="width:${Math.min(100,p.position)}%"></i></div></div><strong>${Math.min(p.position,100)}/100</strong></div>`}).join('');const current=state.players[state.current]||state.players[0],currentCh=current?CHARACTERS[current.character]||CHARACTERS[0]:CHARACTERS[0];document.documentElement.style.setProperty('--turn-accent',current?.color||'#168fd7');$('turnLabel').textContent=current?.name||'Jugador';if($('turnAvatar'))$('turnAvatar').textContent=currentCh.pawnEmoji||currentCh.emoji;if($('turnPlayerName'))$('turnPlayerName').textContent=current?.name||'Jugador';if($('turnPrompt'))$('turnPrompt').textContent=state.locked?'Moviendo ficha…':'Tira los dados';if($('moduleBadge'))$('moduleBadge').textContent=state.module==='fundamentos_oclusion'?'📘 Fundamentos de la oclusión':state.module==='fisiologia_funcion'?'🫁 Fisiología + función':state.module==='crecimiento_desarrollo'?'🦴 Crecimiento y desarrollo':state.module==='habitos_parafunciones'?'🧠 Hábitos y parafunciones':state.module==='steiner'?'📐 Cefalometría de Steiner':'🦷 Ortopedia / banco general';rollBtn.textContent=state.locked?'Moviendo ficha…':`🎲 ${current?.name||'Jugador'}: tirar dados`;rollBtn.disabled=state.locked;saveGame()}
async function rollDice(){if(!state||state.locked)return;state.locked=true;rollBtn.disabled=true;const a=1+Math.floor(Math.random()*6),b=1+Math.floor(Math.random()*6);for(let i=0;i<8;i++){$('dice1').textContent=DICE[Math.floor(Math.random()*6)];$('dice2').textContent=DICE[Math.floor(Math.random()*6)];$('dice1').classList.add('rolling');$('dice2').classList.add('rolling');await delay(55)}$('dice1').textContent=DICE[a-1];$('dice2').textContent=DICE[b-1];$('dice1').classList.remove('rolling');$('dice2').classList.remove('rolling');$('diceTotal').textContent=a+b;tone('dice');statusText.textContent=`${state.players[state.current].name} obtuvo ${a} + ${b} = ${a+b}.`;await move(a+b);if(state.players[state.current].position>=100)return showWinner(state.players[state.current]);setTimeout(()=>triggerCell(state.players[state.current].position),180)}
async function move(delta){const p=state.players[state.current],target=Math.max(0,Math.min(100,p.position+delta)),step=target>=p.position?1:-1;while(p.position!==target){p.position+=step;render();tone('step');await delay(105)}const landed=document.querySelector(`[data-cell="${p.position}"]`);if(landed){landed.classList.add('landed');setTimeout(()=>landed.classList.remove('landed'),420)}}
function triggerCell(cell){const r=ruleForCell(cell);if(r.type==='question')return startQuestion(r.deck);if(r.type==='case')return startCase(r.deck);if(r.type==='advance1')return movement('advance1',1);if(r.type==='advance2')return movement('advance2',2);if(r.type==='back1')return movement('back1',-1);if(r.type==='back2')return movement('back2',-2);if(r.type==='vacation')return vacation();if(r.type==='jail')return jail();if(r.type==='finish')return showWinner(state.players[state.current]);statusText.textContent='Casilla de descanso. Siguiente turno.';setTimeout(endTurn,450)}
function startQuestion(deck){const bank=activeQuestionBank(),q=pickQueued(bank,'questionQueue','questionQueueSize','lastQuestionIndex');if(!q)return endTurn();pendingQuestion=randomizePresentedItem({...q,kind:'question'},'question');selectedAnswer=null;tone('question');saveGame();showQuestion()}
function startCase(deck){const bank=activeCaseBank(),q=pickQueued(bank,'caseQueue','caseQueueSize','lastCaseIndex');if(!q)return endTurn();pendingQuestion=randomizePresentedItem({...q,kind:'case'},'case');selectedAnswer=null;tone('case');saveGame();showQuestion()}
function showQuestion(){stopTimer();const q=pendingQuestion;questionDialog.classList.toggle('case-mode',q.kind==='case');questionDialog.classList.toggle('question-mode',q.kind!=='case');$('questionCategory').textContent=q.kind==='case'?(q.module==='fundamentos_oclusion'?`📋 Caso clínico · ${q.topic||'Fundamentos'}`:q.module==='fisiologia_funcion'?`🫁 Caso funcional · ${q.topic||'Fisiología'}`:q.module==='crecimiento_desarrollo'?`🦴 Caso de crecimiento · ${q.topic||'Crecimiento'}`:q.module==='habitos_parafunciones'?`🧠 Caso de hábitos · ${q.topic||'Hábitos'}`:q.module==='steiner'?`📐 Caso Steiner · ${q.topic||'Cefalometría'}`:`📋 Caso clínico · Sobre ${q.deck}${q.origin==='teacher'?' · Docente':''}`):q.module==='fundamentos_oclusion'?`📘 Fundamentos · ${q.topic||'Oclusión'}`:q.module==='fisiologia_funcion'?`🫁 Fisiología + función · ${q.topic||'Fisiología'}`:q.module==='crecimiento_desarrollo'?`🦴 Crecimiento · ${q.topic||'Crecimiento'}`:q.module==='habitos_parafunciones'?`🧠 Hábitos · ${q.topic||'Hábitos'}`:q.module==='steiner'?`📐 Steiner · ${q.topic||'Cefalometría'}`:`❓ Pregunta · Sobre ${q.deck}${q.origin==='teacher'?' · Docente':''}`;if(q.difficulty)$('questionCategory').textContent+=` · ${q.difficulty}`;$('questionNumber').textContent=q.kind==='case'?q.id:`Pregunta ${q.id}`;$('questionText').textContent=q.text;$('feedback').hidden=true;$('confirmAnswerBtn').hidden=false;$('confirmAnswerBtn').disabled=true;$('continueBtn').hidden=true;$('timerDisplay').textContent='30';$('timerBtn').disabled=false;$('timerBtn').textContent='Iniciar 30 s';const media=$('questionMedia');media.hidden=true;media.innerHTML='';if(q.mediaPending){media.hidden=false;media.innerHTML='<p>🎵🎬 Esta pregunta utiliza contenido multimedia en la versión original. La mecánica de respuesta permanece disponible.</p>'}const host=$('questionOptions');host.innerHTML='';q.options.forEach((opt,i)=>{const b=document.createElement('button');b.type='button';b.className='option';b.innerHTML=`<span>${String.fromCharCode(65+i)}</span><b>${esc(opt)}</b>`;b.onclick=()=>{selectedAnswer=i;tone('answer');document.querySelectorAll('.option').forEach((e,j)=>e.classList.toggle('selected',i===j));$('confirmAnswerBtn').disabled=false};host.appendChild(b)});questionDialog.showModal()}
function confirmAnswer(){if(selectedAnswer===null||!pendingQuestion)return;stopTimer();const opts=[...document.querySelectorAll('.option')];opts.forEach(o=>{o.disabled=true;o.classList.remove('selected')});let delta=0,heading='',detail='',snd='error';if(pendingQuestion.kind==='question'){const ok=selectedAnswer===pendingQuestion.correct;opts[pendingQuestion.correct]?.classList.add('correct');if(ok){heading='Correcta · permaneces en tu casilla';snd='correct'}else{opts[selectedAnswer]?.classList.add('wrong');delta=-1;heading='Incorrecta · retrocedes 1 casilla'}detail=pendingQuestion.explanation||'Continúa el recorrido.'}else{const grade=pendingQuestion.grades?.[selectedAnswer]||'incorrect';opts[selectedAnswer]?.classList.add(grade==='incorrect'?'wrong':'correct');if(grade==='excellent'){delta=2;heading='Excelente · avanzas 2 casillas';snd='excellent'}else if(grade==='good'){delta=1;heading='Buena · avanzas 1 casilla';snd='correct'}else{delta=-1;heading='Incorrecta · retrocedes 1 casilla'}detail=pendingQuestion.feedback?.[selectedAnswer]||'Revisa el razonamiento clínico.'}tone(snd);pendingQuestion.resultDelta=delta;$('feedback').hidden=false;$('feedback').innerHTML=`<strong>${esc(heading)}</strong><span>${esc(detail)}</span>`;$('confirmAnswerBtn').hidden=true;$('continueBtn').hidden=false}
async function continueAfterQuestion(){stopTimer();const d=pendingQuestion?.resultDelta||0;pendingQuestion=null;questionDialog.close();if(d)await move(d);if(state.players[state.current].position>=100)return showWinner(state.players[state.current]);endTurn()}
function startTimer(){if(timer)return;timerLeft=30;$('timerBtn').disabled=true;timer=setInterval(()=>{timerLeft--;$('timerDisplay').textContent=Math.max(0,timerLeft);if(timerLeft<=0){stopTimer();tone('alarm');$('timerBtn').textContent='Tiempo terminado'}},1000)}
function stopTimer(){if(timer){clearInterval(timer);timer=null}}
function movement(type,delta){const m=RULE_META[type];tone(type);showEvent(m.title,m.message,m.icon,async()=>{await move(delta);if(state.players[state.current].position>=100)return showWinner(state.players[state.current]);endTurn()})}
function vacation(){const m=RULE_META.vacation;tone('vacation');showEvent(m.title,m.message,m.icon,async()=>{state.players[state.current].position=0;render();await delay(350);endTurn()})}
function jail(){const m=RULE_META.jail;tone('jail');state.players[state.current].skipTurns=(state.players[state.current].skipTurns||0)+1;render();showEvent(m.title,m.message,m.icon,endTurn)}
function showEvent(title,text,icon,cb){$('eventIcon').textContent=icon;$('eventTitle').textContent=title;$('eventText').textContent=text;pendingAfterDialog=cb;eventDialog.showModal()}
function closeEvent(){eventDialog.close();const cb=pendingAfterDialog;pendingAfterDialog=null;cb?.()}
function endTurn(){state.current=(state.current+1)%state.players.length;state.turn++;let guard=0;const skipped=[];while(state.players[state.current].skipTurns>0&&guard<state.players.length*2){const p=state.players[state.current];p.skipTurns--;skipped.push(`${p.name} pierde este turno por Cárcel.`);state.current=(state.current+1)%state.players.length;state.turn++;guard++}state.locked=false;render();tone('turn');statusText.textContent=(skipped.length?skipped.join(' ')+' ':'')+`${state.players[state.current].name}, tira los dos dados.`}
function showWinner(p){state.locked=true;p.position=100;render();stopBackgroundMusic(true);$('winnerTitle').textContent='¡Llegaste a la META!';$('winnerText').textContent=`${p.name} completó las 100 casillas de El Camino Dental.`;$('winnerDialog').showModal();tone('win')}
let audioCtx=null,sfxBus=null,musicBus=null,musicTimer=null,musicActive=false,musicBar=0;
function audioContext(){
  const AC=window.AudioContext||window.webkitAudioContext;
  if(!AC)return null;
  if(!audioCtx)audioCtx=new AC();
  if(audioCtx.state==='suspended')audioCtx.resume().catch(()=>{});
  ensureAudioBuses(audioCtx);
  return audioCtx
}
function ensureAudioBuses(ctx){
  if(!sfxBus){
    sfxBus=ctx.createGain();
    sfxBus.gain.value=1;
    sfxBus.connect(ctx.destination)
  }
  if(!musicBus){
    musicBus=ctx.createGain();
    musicBus.gain.value=0;
    musicBus.connect(ctx.destination)
  }
}
function beep(ctx,freq,start,dur=.12,vol=.035,type='sine',endFreq=null,destination=null){
  ensureAudioBuses(ctx);
  const o=ctx.createOscillator(),g=ctx.createGain();
  o.type=type;o.frequency.setValueAtTime(freq,start);
  if(endFreq)o.frequency.exponentialRampToValueAtTime(Math.max(30,endFreq),start+dur);
  g.gain.setValueAtTime(.0001,start);
  g.gain.exponentialRampToValueAtTime(Math.max(.0002,vol),start+.008);
  g.gain.exponentialRampToValueAtTime(.0001,start+dur);
  o.connect(g).connect(destination||sfxBus);o.start(start);o.stop(start+dur+.02)
}
function noise(ctx,start,dur=.12,vol=.02,highpass=500){
  ensureAudioBuses(ctx);
  const length=Math.max(1,Math.floor(ctx.sampleRate*dur)),buf=ctx.createBuffer(1,length,ctx.sampleRate),d=buf.getChannelData(0);
  for(let i=0;i<length;i++)d[i]=(Math.random()*2-1)*(1-i/length);
  const src=ctx.createBufferSource(),g=ctx.createGain(),filter=ctx.createBiquadFilter();
  src.buffer=buf;filter.type='highpass';filter.frequency.value=highpass;
  g.gain.setValueAtTime(vol,start);g.gain.exponentialRampToValueAtTime(.0001,start+dur);
  src.connect(filter).connect(g).connect(sfxBus);src.start(start);src.stop(start+dur+.02)
}
function musicNote(ctx,freq,start,dur=.7,vol=.007,type='sine'){
  ensureAudioBuses(ctx);
  const o=ctx.createOscillator(),g=ctx.createGain(),filter=ctx.createBiquadFilter();
  o.type=type;o.frequency.setValueAtTime(freq,start);
  filter.type='lowpass';filter.frequency.value=1800;
  g.gain.setValueAtTime(.0001,start);
  g.gain.exponentialRampToValueAtTime(vol,start+.05);
  g.gain.exponentialRampToValueAtTime(.0001,start+dur);
  o.connect(filter).connect(g).connect(musicBus);o.start(start);o.stop(start+dur+.03)
}
function scheduleMusicBar(){
  if(!musicActive||!soundEnabled)return;
  const ctx=audioContext();if(!ctx)return;
  const t=ctx.currentTime+.05;
  const progressions=[
    {bass:130.81,notes:[261.63,329.63,392,523.25,392,329.63,293.66,392]},
    {bass:110.00,notes:[220,261.63,329.63,440,329.63,261.63,246.94,329.63]},
    {bass:146.83,notes:[293.66,349.23,440,587.33,440,349.23,329.63,440]},
    {bass:98.00,notes:[196,246.94,293.66,392,293.66,246.94,220,293.66]}
  ];
  const bar=progressions[musicBar%progressions.length];
  musicBar++;
  musicNote(ctx,bar.bass,t,2.8,.0045,'sine');
  bar.notes.forEach((freq,i)=>{
    musicNote(ctx,freq,t+i*.38,.50,.0065,i%2?'triangle':'sine');
    if(i===0||i===4)musicNote(ctx,freq/2,t+i*.38,.72,.0035,'sine')
  });
}
function updateSoundButton(){
  const b=$('soundBtn');if(!b)return;
  b.textContent=soundEnabled?'🔊':'🔇';
  b.classList.toggle('music-on',soundEnabled&&musicActive);
  b.setAttribute('aria-label',soundEnabled?'Apagar sonidos y música':'Activar sonidos y música');
  b.title=soundEnabled?'Sonido y música activados':'Sonido y música apagados'
}
function startBackgroundMusic(){
  if(!soundEnabled||musicActive)return;
  const ctx=audioContext();if(!ctx)return;
  musicActive=true;
  ensureAudioBuses(ctx);
  const now=ctx.currentTime;
  musicBus.gain.cancelScheduledValues(now);
  musicBus.gain.setValueAtTime(Math.max(.0001,musicBus.gain.value),now);
  musicBus.gain.linearRampToValueAtTime(.72,now+.8);
  scheduleMusicBar();
  musicTimer=setInterval(scheduleMusicBar,3200);
  updateSoundButton()
}
function stopBackgroundMusic(fade=false){
  musicActive=false;
  if(musicTimer){clearInterval(musicTimer);musicTimer=null}
  if(audioCtx&&musicBus){
    const now=audioCtx.currentTime;
    musicBus.gain.cancelScheduledValues(now);
    musicBus.gain.setValueAtTime(Math.max(.0001,musicBus.gain.value),now);
    if(fade)musicBus.gain.linearRampToValueAtTime(.0001,now+.55);
    else musicBus.gain.setValueAtTime(.0001,now)
  }
  updateSoundButton()
}
function toggleSound(){
  soundEnabled=!soundEnabled;
  localStorage.setItem('elCaminoDentalSound',soundEnabled?'on':'off');
  if(soundEnabled){
    updateSoundButton();
    tone('select');
    if(state&&$('game')?.classList.contains('active'))startBackgroundMusic()
  }else{
    stopBackgroundMusic(false);
    updateSoundButton()
  }
}
function tone(kind='neutral'){
  if(!soundEnabled)return;
  try{
    const ctx=audioContext();if(!ctx)return;const t=ctx.currentTime+.01;
    switch(kind){
      case 'ui':
        beep(ctx,420,t,.045,.013,'sine',500);break;
      case 'answer':
        beep(ctx,690,t,.045,.017,'sine',760);break;
      case 'select':
        beep(ctx,520,t,.07,.025,'sine',660);beep(ctx,760,t+.07,.08,.022,'sine');break;
      case 'start':
        beep(ctx,392,t,.12,.028,'triangle');beep(ctx,523,t+.11,.12,.03,'triangle');beep(ctx,659,t+.22,.18,.035,'triangle');break;
      case 'dice':
        for(let i=0;i<9;i++){noise(ctx,t+i*.045,.045,.016,700);beep(ctx,180+Math.random()*130,t+i*.045,.035,.012,'square')}
        beep(ctx,420,t+.43,.08,.022,'triangle');break;
      case 'step':
        noise(ctx,t,.035,.011,900);beep(ctx,290,t,.045,.014,'triangle',245);break;
      case 'question':
        beep(ctx,610,t,.09,.024,'sine');beep(ctx,760,t+.085,.13,.026,'sine');break;
      case 'case':
        beep(ctx,330,t,.10,.025,'triangle');beep(ctx,440,t+.09,.10,.025,'triangle');beep(ctx,550,t+.18,.14,.027,'triangle');break;
      case 'correct':
        beep(ctx,523,t,.10,.028,'sine');beep(ctx,659,t+.075,.11,.03,'sine');beep(ctx,784,t+.15,.16,.032,'sine');break;
      case 'excellent':
        beep(ctx,523,t,.09,.027,'triangle');beep(ctx,659,t+.07,.10,.03,'triangle');beep(ctx,784,t+.14,.11,.032,'triangle');beep(ctx,1047,t+.22,.22,.035,'sine');break;
      case 'error':
        beep(ctx,240,t,.11,.028,'square',190);beep(ctx,170,t+.11,.16,.026,'square',135);break;
      case 'alarm':
        beep(ctx,740,t,.14,.035,'square');beep(ctx,740,t+.20,.14,.035,'square');beep(ctx,740,t+.40,.18,.035,'square');break;
      case 'advance1':
        beep(ctx,440,t,.08,.025,'triangle');beep(ctx,587,t+.07,.12,.03,'triangle');break;
      case 'advance2':
        beep(ctx,440,t,.08,.025,'triangle');beep(ctx,587,t+.07,.08,.029,'triangle');beep(ctx,740,t+.14,.14,.032,'triangle');break;
      case 'back1':
        beep(ctx,410,t,.09,.025,'triangle',300);beep(ctx,300,t+.08,.13,.025,'triangle',220);break;
      case 'back2':
        noise(ctx,t,.08,.025,300);beep(ctx,330,t,.10,.027,'sawtooth',230);beep(ctx,220,t+.10,.14,.025,'sawtooth',150);break;
      case 'jail':
        noise(ctx,t,.06,.025,1100);beep(ctx,190,t,.16,.03,'square');noise(ctx,t+.17,.06,.023,1100);beep(ctx,150,t+.17,.20,.03,'square');break;
      case 'vacation':
        beep(ctx,523,t,.10,.024,'sine');beep(ctx,659,t+.08,.10,.025,'sine');beep(ctx,880,t+.16,.20,.025,'sine',990);noise(ctx,t+.22,.18,.010,1400);break;
      case 'turn':
        beep(ctx,660,t,.055,.018,'sine');beep(ctx,880,t+.055,.075,.019,'sine');break;
      case 'win':
        beep(ctx,523,t,.13,.03,'triangle');beep(ctx,659,t+.10,.13,.032,'triangle');beep(ctx,784,t+.20,.13,.034,'triangle');beep(ctx,1047,t+.30,.30,.038,'sine');noise(ctx,t+.28,.30,.010,1800);break;
      default:
        beep(ctx,500,t,.10,.02,'sine');
    }
  }catch{}
}
function saveGame(){if(state)localStorage.setItem(STORAGE_KEY,JSON.stringify(state));resumeBtn.hidden=!localStorage.getItem(STORAGE_KEY)}
function migrate(){if(localStorage.getItem(STORAGE_KEY))return;const old=localStorage.getItem('ortopediaGameV05');if(!old)return;try{const s=JSON.parse(old);if(!s.players?.length)return;s.version=10;s.players=s.players.slice(0,5);s.players.forEach((p,i)=>{p.position=Math.min(99,Math.round((p.position||0)/38*100));p.character=Math.min(CHARACTERS.length-1,typeof p.character==='number'?p.character:i%CHARACTERS.length);p.color=CHARACTERS[p.character].color;p.skipTurns=p.skipTurns||0});s.usedQuestionIds=s.usedQuestionIds||[];s.usedCaseIds=s.usedCaseIds||[];s.current=Math.min(s.current||0,s.players.length-1);s.locked=false;localStorage.setItem(STORAGE_KEY,JSON.stringify(s))}catch{}}
function loadGame(){try{state=JSON.parse(localStorage.getItem(STORAGE_KEY));if(!state?.players?.length)return;state.players=state.players.slice(0,5);state.players.forEach((p,i)=>{p.character=Math.min(CHARACTERS.length-1,typeof p.character==='number'?p.character:i%CHARACTERS.length);p.color=CHARACTERS[p.character].color;p.skipTurns=p.skipTurns||0});state.usedQuestionIds=state.usedQuestionIds||[];state.usedCaseIds=state.usedCaseIds||[];state.module=state.module||'ortopedia_general';state.locked=false;ensureRandomQueues(false);showScreen($('game'));buildBoard();render();startBackgroundMusic();statusText.textContent=`Partida recuperada. ${state.players[state.current].name}, tira los dos dados.`}catch{localStorage.removeItem(STORAGE_KEY)}}
function resetGame(){if(!confirm('¿Reiniciar la partida?'))return;stopBackgroundMusic(true);localStorage.removeItem(STORAGE_KEY);state=null;showScreen($('setup'));buildNameInputs()}
function playAgain(){$('winnerDialog').close();stopBackgroundMusic(false);localStorage.removeItem(STORAGE_KEY);state=null;showScreen($('setup'));buildNameInputs()}
function delay(ms){return new Promise(r=>setTimeout(r,ms))}
playerCount.onchange=()=>{buildNameInputs();tone('select')};if(gameModule)gameModule.onchange=()=>tone('select');$('chooseCharactersBtn').onclick=()=>{tone('ui');beginCharacterSelection()};$('pickerNextBtn').onclick=()=>{tone('ui');pickerNext()};$('pickerBackBtn').onclick=()=>{tone('ui');pickerBack()};resumeBtn.onclick=()=>{tone('ui');loadGame()};rollBtn.onclick=rollDice;$('confirmAnswerBtn').onclick=confirmAnswer;$('continueBtn').onclick=()=>{tone('ui');continueAfterQuestion()};$('eventContinueBtn').onclick=()=>{tone('ui');closeEvent()};$('timerBtn').onclick=()=>{tone('ui');startTimer()};$('resetBtn').onclick=resetGame;$('playAgainBtn').onclick=playAgain;$('soundBtn').onclick=toggleSound;$('rulesBtn').onclick=()=>{tone('ui');rulesDialog.showModal()};$('closeRulesBtn').onclick=()=>{tone('ui');rulesDialog.close()};
document.addEventListener('visibilitychange',()=>{if(document.hidden){if(musicActive&&audioCtx?.state==='running')audioCtx.suspend().catch(()=>{})}else if(soundEnabled&&state&&$('game')?.classList.contains('active')){audioContext();if(!musicActive)startBackgroundMusic()}});
migrate();buildNameInputs();buildBoard();updateSoundButton();resumeBtn.hidden=!localStorage.getItem(STORAGE_KEY);if('serviceWorker'in navigator&&location.protocol==='https:')window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
