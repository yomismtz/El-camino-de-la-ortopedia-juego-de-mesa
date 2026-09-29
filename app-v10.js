const BOARD_END=100;
const STORAGE_KEY='ortopediaGameV10';
const DICE=['⚀','⚁','⚂','⚃','⚄','⚅'];
const FAVORITE_CHARACTER_KEY='elCaminoDentalFavoriteCharacterV1';
const TUTORIAL_KEY='elCaminoDentalTutorialV1';
const CHARACTER_PERSONAS=[
  {correct:'¡Excelente! Sonrisa aprobada.',wrong:'Revisemos el concepto y seguimos.',win:'¡Meta alcanzada, gran recorrido!',tone:523},
  {correct:'Diagnóstico correcto.',wrong:'Analicemos otra vez el caso.',win:'¡Caso cerrado y meta conseguida!',tone:494},
  {correct:'¡Lo recordé!',wrong:'Esto también cuenta como aprendizaje.',win:'¡Estudiar sí rindió frutos!',tone:587},
  {correct:'¡Entendido!',wrong:'Anotado para la siguiente.',win:'¡Reto completado!',tone:440},
  {correct:'La evidencia coincide.',wrong:'Necesitamos revisar la evidencia.',win:'Resultado confirmado: victoria.',tone:659},
  {correct:'Muy bien razonado.',wrong:'Volvamos paso a paso.',win:'Lección completada con éxito.',tone:392},
  {correct:'Exacto, continúa.',wrong:'Observa la clave del razonamiento.',win:'¡Excelente recorrido!',tone:554},
  {correct:'¡Sí pude!',wrong:'Lo intento otra vez.',win:'¡Llegué a la meta!',tone:698},
  {correct:'¡Listo!',wrong:'La próxima sale mejor.',win:'¡Misión cumplida!',tone:466},
  {correct:'¡Brackets perfectos!',wrong:'Ajustamos y seguimos.',win:'¡Sonrisa de campeonato!',tone:622},
  {correct:'¡Súper respuesta!',wrong:'Un héroe también repasa.',win:'¡Súper victoria!',tone:740},
  {correct:'Todo en orden.',wrong:'Reorganizamos y continuamos.',win:'¡Equipo listo, meta lograda!',tone:415}
];
const CHARACTERS=[
  {name:'La Doctora',role:'Odontóloga',spriteX:'0%',spriteY:'0%',emoji:'👩🏻‍⚕️',pawnEmoji:'👩🏻‍⚕️',color:'#2f8df5',anim:'wink',reaction:'¡Lista para cuidar sonrisas!',desc:'Clínica, segura y orientada al diagnóstico.'},
  {name:'El Doctor',role:'Odontólogo',spriteX:'33.333%',spriteY:'0%',emoji:'👨🏻‍⚕️',pawnEmoji:'👨🏻‍⚕️',color:'#2864c7',anim:'pulse',reaction:'¡Revisemos el caso!',desc:'Confiable, analítico y cercano con sus pacientes.'},
  {name:'La Estudiante',role:'Estudiante de odontología',spriteX:'66.667%',spriteY:'0%',emoji:'👩🏻‍🎓',pawnEmoji:'👩🏻‍🎓',color:'#d764a8',anim:'jump',reaction:'¡Ya encontré la respuesta!',desc:'Entusiasta, aplicada y siempre lista para aprender.'},
  {name:'El Estudiante',role:'Estudiante de odontología',spriteX:'100%',spriteY:'0%',emoji:'👨🏻‍🎓',pawnEmoji:'👨🏻‍🎓',color:'#21a777',anim:'jump',reaction:'¡Vamos a aprender jugando!',desc:'Curioso, observador y seguro de seguir aprendiendo.'},
  {name:'La Científica',role:'Investigadora',spriteX:'0%',spriteY:'50%',emoji:'👩🏻‍🔬',pawnEmoji:'👩🏻‍🔬',color:'#7a62d8',anim:'pulse',reaction:'¡La evidencia nos guía!',desc:'Analítica, precisa y enfocada en la evidencia.'},
  {name:'El Profesor',role:'Docente de odontología',spriteX:'33.333%',spriteY:'50%',emoji:'👨🏻‍🏫',pawnEmoji:'👨🏻‍🏫',color:'#405b85',anim:'hero',reaction:'¡Pensemos paso a paso!',desc:'Experimentado, didáctico y cercano con sus alumnos.'},
  {name:'La Profesora',role:'Docente de odontología',spriteX:'66.667%',spriteY:'50%',emoji:'👩🏻‍🏫',pawnEmoji:'👩🏻‍🏫',color:'#18a7c9',anim:'wink',reaction:'¡Adelante, tú puedes!',desc:'Elegante, clara e instructiva al explicar.'},
  {name:'La Niña',role:'Paciente infantil',spriteX:'100%',spriteY:'50%',emoji:'👧🏻',pawnEmoji:'👧🏻',color:'#ff7aa8',anim:'jump',reaction:'¡Hola! Estoy lista.',desc:'Alegre, curiosa y valiente durante su visita dental.'},
  {name:'El Niño',role:'Paciente infantil',spriteX:'0%',spriteY:'100%',emoji:'👦🏻',pawnEmoji:'👦🏻',color:'#3988da',anim:'jump',reaction:'¡Listo para el reto!',desc:'Simpático, curioso y con mucha energía.'},
  {name:'Bracki',role:'Maestro de los brackets',spriteX:'33.333%',spriteY:'100%',emoji:'😁',pawnEmoji:'😁',color:'#8a52e8',anim:'wiggle',reaction:'¡Brackets listos!',desc:'Divertido, ingenioso y orgulloso de su sonrisa con brackets.'},
  {name:'Súper Diente',role:'Héroe de la sonrisa',spriteX:'66.667%',spriteY:'100%',emoji:'🦷',pawnEmoji:'🦷',color:'#f34d72',anim:'hero',reaction:'¡Al rescate de las sonrisas!',desc:'Valiente, energético y defensor de la salud dental.'},
  {name:'La Asistente Dental',role:'Asistencia clínica',spriteX:'100%',spriteY:'100%',emoji:'🧑🏼‍⚕️',pawnEmoji:'🧑🏼‍⚕️',color:'#16a6a0',anim:'pulse',reaction:'¡Todo listo para comenzar!',desc:'Organizada, ágil y preparada para apoyar al equipo.'}
]
const RULE_META={
  question:{icon:'❓',title:'Pregunta',message:'Si contestas mal, retrocedes 1 casilla.'},
  case:{icon:'📋',title:'Caso clínico',message:'Excelente +2 · Buena +1 · Incorrecta −1.'},
  advance1:{icon:'✅',title:'Excelente diagnóstico',message:'Avanza 1 casilla y resuelve lo que haya donde caigas.'},
  advance2:{icon:'🏁',title:'Tratamiento concluido',message:'Avanza 2 casillas y resuelve la nueva casilla.'},
  back1:{icon:'📅',title:'Paciente canceló',message:'Retrocede 1 casilla y resuelve la nueva casilla.'},
  back2:{icon:'📁',title:'Perdiste el expediente',message:'Retrocede 2 casillas y resuelve la nueva casilla.'},
  back3:{icon:'⚠️',title:'El tratamiento salió mal',message:'Retrocede 3 casillas y resuelve la nueva casilla.'},
  vacation:{icon:'🏖️',title:'Te fuiste de vacaciones',message:'Pierdes 1 turno.'},
  tax:{icon:'🧾',title:'No declaraste tus impuestos',message:'Pierdes 1 turno.'},
  equipment:{icon:'🛠️',title:'Se descompuso el equipo',message:'Pierdes 1 turno mientras resuelves el problema.'},
  lawsuit:{icon:'⚖️',title:'Tu paciente te demandó',message:'Vas directamente a la cárcel.'},
  jail:{icon:'🔒',title:'Cárcel',message:'Primera visita: pierdes 2 turnos. Desde la segunda: pierdes 3.'},
  neutral:{icon:'🦷',title:'Descanso',message:'No ocurre nada.'},
  finish:{icon:'🏆',title:'Meta'}
};
const JAIL_CELL=44;
const CELL_TYPES={
  question:new Set([3,8,13,18,23,28,33,38,43,48,53,58,63,68,73,78,83,88,93,97]),
  case:new Set([5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95]),
  advance1:new Set([2,21,41,52,61,72,98]),
  advance2:new Set([6,26,46,66,86,99]),
  back1:new Set([11,31,51,71,91]),
  back2:new Set([16,36,56,76,96]),
  back3:new Set([17,37,57,77,92]),
  vacation:new Set([12,32,62,82]),
  tax:new Set([14,34,64,84]),
  lawsuit:new Set([27,67,87]),
  jail:new Set([44]),
  equipment:new Set([4,24,54,74,94])
};
const TEACHER_ACTIVE_KEY='ortopediaActiveTeacherQuestionsV1';
const TEACHER_CASE_KEY='ortopediaActiveTeacherCasesV1';
function loadTeacherQuestions(){try{const q=JSON.parse(localStorage.getItem(TEACHER_ACTIVE_KEY)||'[]');return Array.isArray(q)?q.filter(x=>x&&x.text&&Array.isArray(x.options)&&x.options.length>=2):[]}catch{return[]}}
function loadTeacherCases(){try{const c=JSON.parse(localStorage.getItem(TEACHER_CASE_KEY)||'[]');return Array.isArray(c)?c.filter(x=>x&&x.text&&Array.isArray(x.options)&&x.options.length>=2):[]}catch{return[]}}
const questions=[...(window.QUESTIONS||[]),...(window.PRIMER_PARCIAL_QUESTIONS||[]),...loadTeacherQuestions()];
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
const firstPartialQuestions=[...(window.PRIMER_PARCIAL_QUESTIONS||[])];
const nomenclatureEtymologyQuestions=[...(window.NOMENCLATURA_ETIMOLOGIA_QUESTIONS||[])];
const firstPartialCases=[...(window.PRIMER_PARCIAL_CASES||[])];
function moduleQuestionBank(module){
  if(module==='fundamentos_oclusion')return fundamentalsQuestions;
  if(module==='fisiologia_funcion')return physiologyFunctionQuestions;
  if(module==='crecimiento_desarrollo')return growthDevelopmentQuestions;
  if(module==='habitos_parafunciones')return habitsParafunctionsQuestions;
  if(module==='nomenclatura_etimologia')return nomenclatureEtymologyQuestions;
  if(module==='steiner')return steinerQuestions;
  return questions
}
function moduleCaseBank(module){
  if(module==='fundamentos_oclusion')return fundamentalsCases;
  if(module==='fisiologia_funcion')return physiologyFunctionCases;
  if(module==='crecimiento_desarrollo')return growthDevelopmentCases;
  if(module==='habitos_parafunciones')return habitsParafunctionsCases;
  if(module==='steiner')return steinerCases;
  return clinicalCases
}
const MASTER_QUESTION_SOURCES=[
  ['ortopedia_general',questions],['fundamentos_oclusion',fundamentalsQuestions],['steiner',steinerQuestions],
  ['fisiologia_funcion',physiologyFunctionQuestions],['crecimiento_desarrollo',growthDevelopmentQuestions],
  ['habitos_parafunciones',habitsParafunctionsQuestions],
  ['nomenclatura_etimologia',nomenclatureEtymologyQuestions]
];
const MASTER_CASE_SOURCES=[
  ['ortopedia_general',clinicalCases],['fundamentos_oclusion',fundamentalsCases],['steiner',steinerCases],
  ['fisiologia_funcion',physiologyFunctionCases],['crecimiento_desarrollo',growthDevelopmentCases],
  ['habitos_parafunciones',habitsParafunctionsCases]
];
function dedupeItems(sources){
  const seen=new Set(),out=[];
  for(const [sourceModule,items] of sources)for(const item of items||[]){
    const key=String(item?.id??'')+'|'+String(item?.text??'');
    if(seen.has(key))continue;seen.add(key);
    out.push({...item,_sourceModule:sourceModule})
  }
  return out
}
const allStudyQuestions=dedupeItems(MASTER_QUESTION_SOURCES);
const allStudyCases=dedupeItems(MASTER_CASE_SOURCES);
function filterByAreas(items,areas){
  const ac=window.AreaClassifier;
  if(!ac||!Array.isArray(areas)||!areas.length)return [];
  return items.filter(x=>ac.matches(x,areas,x._sourceModule||x.module||''))
}
function activeQuestionBank(){
  const difficulty=state?.difficulty||'all';
  let bank=state?.module==='personalizado'?filterByAreas(allStudyQuestions,state.selectedAreas):moduleQuestionBank(state?.module);
  if(difficulty==='all')return bank;
  const filtered=bank.filter(q=>q.difficulty===difficulty);
  return filtered.length?filtered:bank
}
function activeCaseBank(){
  if(state?.module==='personalizado')return filterByAreas(allStudyCases,state.selectedAreas);
  return moduleCaseBank(state?.module)
}
let state=null,draft=null,pendingQuestion=null,selectedAnswer=null,pendingAfterDialog=null,soundEnabled=localStorage.getItem('elCaminoDentalSound')!=='off',timer=null,timerLeft=30,computerTimer=null,narrationToken=0,narrationActive=false;
const $=id=>document.getElementById(id);
const screens=['setup','characters','loadingScreen','game'].map($);
const board=$('board'),playerCount=$('playerCount'),playerNames=$('playerNames'),gameModule=$('gameModule'),gameDifficulty=$('gameDifficulty'),gameMode=$('gameMode'),aiLevel=$('aiLevel'),playerCountLabel=$('playerCountLabel'),aiLevelLabel=$('aiLevelLabel'),resumeBtn=$('resumeBtn'),rollBtn=$('rollBtn'),statusText=$('statusText'),areaPickerPanel=$('areaPickerPanel'),areaPickerGroups=$('areaPickerGroups'),areaSelectionCount=$('areaSelectionCount'),areaPoolSummary=$('areaPoolSummary');
const questionDialog=$('questionDialog'),eventDialog=$('eventDialog'),rulesDialog=$('rulesDialog');
function syncVisualViewport(){
  const vv=window.visualViewport;
  const h=Math.max(240,Math.round(vv?.height||window.innerHeight||document.documentElement.clientHeight||640));
  const w=Math.max(280,Math.round(vv?.width||window.innerWidth||document.documentElement.clientWidth||360));
  document.documentElement.style.setProperty('--app-height',h+'px');
  document.documentElement.style.setProperty('--app-width',w+'px')
}
syncVisualViewport();
window.addEventListener('resize',syncVisualViewport,{passive:true});
window.addEventListener('orientationchange',()=>setTimeout(syncVisualViewport,80),{passive:true});
window.visualViewport?.addEventListener('resize',syncVisualViewport,{passive:true});
function showScreen(el){screens.forEach(x=>x?.classList.remove('active'));el.classList.add('active');const playing=el?.id==='game';document.body.classList.toggle('game-playing',playing);if(playing)window.scrollTo(0,0)}
function esc(v){return String(v).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
function ruleForCell(n){if(n===0)return{type:'start'};if(n>=100)return{type:'finish'};for(const [type,set] of Object.entries(CELL_TYPES))if(set.has(n)){if(type==='question')return{type,deck:(n%3)+1};if(type==='case')return{type,deck:(n%5)+1};return{type}}return{type:'neutral'}}
function characterSprite(ch,extraClass=''){if(!ch)return '';return `<span class="character-sprite ${extraClass}" style="--sprite-x:${ch.spriteX||'0%'};--sprite-y:${ch.spriteY||'0%'}" aria-hidden="true"></span>`}
function personaFor(index){return CHARACTER_PERSONAS[Math.max(0,Math.min(CHARACTER_PERSONAS.length-1,Number(index)||0))]||CHARACTER_PERSONAS[0]}
function characterTone(index,kind='select'){
  if(!soundEnabled)return;
  const ctx=audioContext?.();if(!ctx)return;
  const p=personaFor(index),base=p.tone||520,t=ctx.currentTime+.01;
  if(kind==='error'){beep(ctx,Math.max(120,base*.58),t,.12,.025,'triangle');beep(ctx,Math.max(100,base*.45),t+.1,.16,.02,'sine')}
  else if(kind==='win'){beep(ctx,base,t,.13,.032,'sine');beep(ctx,base*1.25,t+.12,.15,.03,'sine');beep(ctx,base*1.5,t+.25,.2,.026,'sine')}
  else{beep(ctx,base,t,.10,.018,'sine');beep(ctx,base*1.18,t+.08,.11,.016,'sine')}
}
function characterFace(ch,extraClass=''){return characterSprite(ch,'token-character '+extraClass)}
function tokenFace(p){const ch=CHARACTERS[p.character]||CHARACTERS[0];return ch.pawnEmoji||ch.emoji||'🦷'}
function tokenShift(index,total){if(total<=1)return{x:0,y:0};const cols=Math.min(2,total),row=Math.floor(index/cols),col=index%cols,gap=19;return{x:(col-(cols-1)/2)*gap,y:(row-(Math.ceil(total/cols)-1)/2)*gap}}
const AI_LEVELS={
  low:{label:'Bajo',questionAccuracy:.38,excellent:.28,good:.27,thinkMin:950,thinkMax:1550,rollAdvantage:1},
  medium:{label:'Medio',questionAccuracy:.64,excellent:.57,good:.28,thinkMin:750,thinkMax:1250,rollAdvantage:1},
  high:{label:'Alto',questionAccuracy:.86,excellent:.82,good:.15,thinkMin:600,thinkMax:1000,rollAdvantage:1},
  super:{label:'Súper inteligente',questionAccuracy:1,excellent:1,good:0,thinkMin:420,thinkMax:760,rollAdvantage:3}
};
let setupSelectedAreas=[];
function customModeEnabled(){return gameModule?.value==='personalizado'}
function areaMeta(id){return window.AreaClassifier?.areas?.find(a=>a.id===id)}
function selectedAreaLabelList(areas){return (areas||[]).map(id=>areaMeta(id)?.label||id)}
function areaPoolCounts(areas=setupSelectedAreas){
  return {questions:filterByAreas(allStudyQuestions,areas).length,cases:filterByAreas(allStudyCases,areas).length}
}
function renderAreaPicker(){
  if(!areaPickerPanel||!areaPickerGroups)return;
  const custom=customModeEnabled();
  areaPickerPanel.hidden=!custom;
  const choose=$('chooseCharactersBtn');
  if(!custom){if(choose)choose.disabled=false;return}
  const areas=window.AreaClassifier?.areas||[],groups=[...new Set(areas.map(a=>a.group))];
  areaPickerGroups.innerHTML=groups.map(group=>{
    const cards=areas.filter(a=>a.group===group).map(a=>{
      const selected=setupSelectedAreas.includes(a.id),counts=areaPoolCounts([a.id]);
      return `<button type="button" class="area-choice${selected?' selected':''}" data-area="${a.id}" aria-pressed="${selected}"><span>${a.icon}</span><b>${a.label}</b><small>${counts.questions} preguntas · ${counts.cases} casos</small></button>`
    }).join('');
    return `<section class="area-group"><h4>${group}</h4><div class="area-choice-grid">${cards}</div></section>`
  }).join('');
  areaPickerGroups.querySelectorAll('[data-area]').forEach(btn=>btn.onclick=()=>{
    const id=btn.dataset.area,idx=setupSelectedAreas.indexOf(id);
    if(idx>=0)setupSelectedAreas.splice(idx,1);
    else if(setupSelectedAreas.length<5)setupSelectedAreas.push(id);
    else{btn.classList.add('limit-hit');setTimeout(()=>btn.classList.remove('limit-hit'),380)}
    tone('select');renderAreaPicker()
  });
  if(areaSelectionCount)areaSelectionCount.textContent=`${setupSelectedAreas.length}/5`;
  const totals=areaPoolCounts(setupSelectedAreas);
  if(areaPoolSummary)areaPoolSummary.innerHTML=setupSelectedAreas.length
    ?`<b>${selectedAreaLabelList(setupSelectedAreas).join(' · ')}</b><span>${totals.questions} preguntas + ${totals.cases} casos clínicos disponibles</span>`
    :'Selecciona al menos un área.';
  if(choose)choose.disabled=!setupSelectedAreas.length||totals.questions===0
}
function chooseRandomAreas(){
  const ids=(window.AreaClassifier?.areas||[]).filter(a=>areaPoolCounts([a.id]).questions>0).map(a=>a.id);
  for(let i=ids.length-1;i>0;i--){const j=secureRandomIndex(i+1);[ids[i],ids[j]]=[ids[j],ids[i]]}
  setupSelectedAreas=ids.slice(0,5);renderAreaPicker();tone('select')
}
function clearAreas(){setupSelectedAreas=[];renderAreaPicker();tone('ui')}
function computerSetupEnabled(){return gameMode?.value==='computer'}
function updateGameModeUI(){
  const cpu=computerSetupEnabled();
  if(playerCountLabel)playerCountLabel.hidden=cpu;
  if(aiLevelLabel)aiLevelLabel.hidden=!cpu;
  if(cpu&&playerCount)playerCount.value='2';
  buildNameInputs()
}
function buildNameInputs(){
  playerNames.innerHTML='';
  const count=computerSetupEnabled()?1:Number(playerCount.value);
  for(let i=0;i<count;i++){
    const row=document.createElement('label');
    row.className='name-row';
    const defaultName=computerSetupEnabled()?'Jugador':`Jugador ${i+1}`;
    row.innerHTML=`<span class="player-number">${i+1}</span><input id="name-${i}" maxlength="20" value="${defaultName}" aria-label="Nombre del jugador ${i+1}">`;
    playerNames.appendChild(row)
  }
}
function assignComputerCharacter(){
  if(!draft||draft.mode!=='computer')return;
  const taken=new Set(draft.characters.filter(x=>x!==null));
  const preferred=[4,5,0,2,3,8,7,9,10,6,11,1];
  const pick=preferred.find(i=>!taken.has(i));
  draft.characters[draft.count-1]=pick??0
}
function beginCharacterSelection(){
  const cpu=computerSetupEnabled();
  const humanCount=cpu?1:Number(playerCount.value);
  const count=cpu?2:humanCount;
  const names=cpu
    ?[(($('name-0')?.value||'Jugador').trim()||'Jugador'),'Dra. IA']
    :Array.from({length:count},(_,i)=>(($(`name-${i}`)?.value||`Jugador ${i+1}`).trim()||`Jugador ${i+1}`));
  draft={
    count,
    humanCount,
    pickerCount:humanCount,
    mode:cpu?'computer':'local',
    aiLevel:cpu?(aiLevel?.value||'medium'):null,
    module:gameModule?.value||'personalizado',
    selectedAreas:customModeEnabled()?[...setupSelectedAreas]:[],
    difficulty:gameDifficulty?.value||'all',
    names,
    characters:Array(count).fill(null),
    pickerIndex:0
  };
  const favoriteCharacter=Number(localStorage.getItem(FAVORITE_CHARACTER_KEY));
  if(Number.isInteger(favoriteCharacter)&&favoriteCharacter>=0&&favoriteCharacter<CHARACTERS.length)draft.characters[0]=favoriteCharacter;
  showScreen($('characters'));renderPicker();tone('select')
}
function renderPicker(){
  const i=draft.pickerIndex,taken=new Set(draft.characters.filter((x,j)=>x!==null&&j!==i));
  $('pickerTitle').textContent=`${draft.names[i]}, elige tu personaje`;
  $('pickerHint').textContent=draft.mode==='computer'
    ?'Tú eliges primero. La computadora recibirá un personaje distinto.'
    :`Jugador ${i+1} de ${draft.pickerCount}. Cada personaje solo puede elegirse una vez.`;
  const grid=$('characterGrid');grid.innerHTML='';
  CHARACTERS.forEach((ch,idx)=>{
    const b=document.createElement('button');b.type='button';b.disabled=taken.has(idx);
    b.className=`character-card${draft.characters[i]===idx?' selected':''}${taken.has(idx)?' taken':''}`;
    b.dataset.char=idx;b.style.setProperty('--accent',ch.color);
    b.innerHTML=`<div class="character-art">${characterSprite(ch,'pick-character')}</div><span class="character-bubble" hidden>${ch.reaction}</span><h3>${ch.name}</h3><b>${ch.role}</b><p>${ch.desc}</p><span class="select-label">${taken.has(idx)?'En uso':draft.characters[i]===idx?'Seleccionado':'Seleccionar'}</span>`;
    b.onclick=()=>{
      draft.characters[i]=idx;
      if(i===0)localStorage.setItem(FAVORITE_CHARACTER_KEY,String(idx));
      tone('select');characterTone(idx,'select');renderPicker();requestAnimationFrame(()=>reactCharacter(idx))
    };
    grid.appendChild(b)
  });
  const chosen=draft.characters[i];
  const spotlight=$('characterSpotlight');
  if(spotlight){
    if(chosen===null){spotlight.hidden=true;spotlight.innerHTML=''}
    else{
      const ch=CHARACTERS[chosen],persona=personaFor(chosen);
      spotlight.hidden=false;spotlight.style.setProperty('--accent',ch.color);
      spotlight.innerHTML=`<div class="spotlight-art">${characterSprite(ch,'spotlight-character')}</div><div class="spotlight-copy"><span class="eyebrow">PERSONAJE SELECCIONADO</span><h2>${ch.name}</h2><b>${ch.role}</b><p>${ch.desc}</p><blockquote>“${persona.correct}”</blockquote></div>`
    }
  }
  $('pickerNextBtn').disabled=chosen===null;
  $('pickerNextBtn').textContent=i===draft.pickerCount-1?'Comenzar partida →':'Siguiente →';
  const visible=draft.mode==='computer'
    ?draft.names.slice(0,draft.pickerCount).map((n,j)=>`<span>${esc(n)} · ${draft.characters[j]===null?'sin elegir':CHARACTERS[draft.characters[j]].name}</span>`).join('')+`<span>🤖 Dra. IA · ${AI_LEVELS[draft.aiLevel]?.label||'Medio'}</span>`
    :draft.names.map((n,j)=>`<span>${esc(n)} · ${draft.characters[j]===null?'sin elegir':CHARACTERS[draft.characters[j]].name}</span>`).join('');
  $('pickedSummary').innerHTML=visible
}
function reactCharacter(idx){const ch=CHARACTERS[idx],card=document.querySelector(`[data-char="${idx}"]`);if(!card||!ch)return;const art=card.querySelector('.character-sprite'),bubble=card.querySelector('.character-bubble');if(!art)return;art.classList.remove('reaction-wink','reaction-jump','reaction-hero','reaction-wiggle','reaction-pulse');void art.offsetWidth;art.classList.add('reaction-'+ch.anim);if(bubble)bubble.hidden=false;setTimeout(()=>{if(document.body.contains(art))art.classList.remove('reaction-'+ch.anim);if(bubble&&document.body.contains(bubble))bubble.hidden=true},900)}
function pickerNext(){
  if(draft.characters[draft.pickerIndex]===null)return;
  if(draft.pickerIndex<draft.pickerCount-1){draft.pickerIndex++;renderPicker()}
  else{if(draft.mode==='computer')assignComputerCharacter();startWithLoading()}
}
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
function secureRandomFloat(){return secureRandomIndex(1000000)/1000000}
function currentPlayer(){return state?.players?.[state.current]||null}
function isComputerTurn(){return !!currentPlayer()?.isComputer}
function aiConfig(player=currentPlayer()){return AI_LEVELS[player?.aiLevel]||AI_LEVELS.medium}
function clearComputerTimer(){if(computerTimer){clearTimeout(computerTimer);computerTimer=null}}
function queueComputerAction(fn,delayMs=650){
  clearComputerTimer();
  computerTimer=setTimeout(()=>{computerTimer=null;if(state&&isComputerTurn())fn?.()},delayMs)
}
function computerThinkDelay(player=currentPlayer()){
  const cfg=aiConfig(player),span=Math.max(0,cfg.thinkMax-cfg.thinkMin);
  return cfg.thinkMin+(span?secureRandomIndex(span+1):0)
}
function randomChoice(arr){return arr.length?arr[secureRandomIndex(arr.length)]:null}
function chooseComputerAnswer(q,player=currentPlayer()){
  const cfg=aiConfig(player);
  if(q.kind==='case'){
    const excellent=q.grades?.indexOf('excellent')??-1;
    const good=q.grades?.indexOf('good')??-1;
    const incorrect=q.options.map((_,i)=>i).filter(i=>q.grades?.[i]!=='excellent'&&q.grades?.[i]!=='good');
    const r=secureRandomFloat();
    if(excellent>=0&&r<cfg.excellent)return excellent;
    if(good>=0&&r<cfg.excellent+cfg.good)return good;
    return randomChoice(incorrect)??([good,excellent,0].find(i=>Number.isInteger(i)&&i>=0)??0)
  }
  if(secureRandomFloat()<cfg.questionAccuracy)return q.correct;
  const wrong=q.options.map((_,i)=>i).filter(i=>i!==q.correct);
  return randomChoice(wrong)??q.correct
}
function rollPair(){
  return [1+secureRandomIndex(6),1+secureRandomIndex(6)]
}
function rollPairForPlayer(player){
  const attempts=Math.max(1,aiConfig(player).rollAdvantage||1);
  let best=rollPair();
  for(let i=1;i<attempts;i++){
    const candidate=rollPair();
    if(candidate[0]+candidate[1]>best[0]+best[1])best=candidate
  }
  return best
}
function scheduleComputerTurn(delayMs=720){
  if(!state||!isComputerTurn()||state.locked)return;
  const p=currentPlayer();
  statusText.textContent=`🤖 ${p.name} está pensando…`;
  if($('turnPrompt'))$('turnPrompt').textContent='Pensando…';
  tone('computer');
  queueComputerAction(()=>rollDice(true),delayMs)
}
function resumeComputerAutomation(){
  if(!state||!isComputerTurn())return;
  if(questionDialog?.open&&pendingQuestion){
    if(!$('feedback').hidden)queueComputerAction(()=>continueAfterQuestion(),450);
    else runComputerQuestion();
    return
  }
  if(eventDialog?.open){
    queueComputerAction(()=>{if(eventDialog.open)closeEvent()},450);
    return
  }
  if(!state.locked)scheduleComputerTurn(450)
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
function recentOrderKey(){
  return 'elCaminoDentalOrder:'+String(state?.module||'general')+':'+String(state?.difficulty||'all')
}
function balancedPersonalizedOrder(pool){
  const areas=state?.selectedAreas||[];if(areas.length<2)return null;
  const buckets=new Map(areas.map(a=>[a,[]]));
  pool.forEach((item,idx)=>{
    const matches=window.AreaClassifier?.infer(item,item._sourceModule||item.module||'').filter(a=>buckets.has(a))||[];
    if(!matches.length)return;
    matches.sort((a,b)=>buckets.get(a).length-buckets.get(b).length);
    buckets.get(matches[0]).push(idx)
  });
  for(const [area,indices] of buckets){
    const sub=indices.map(i=>pool[i]);
    const adaptive=window.LearningTools?.orderIndices?.(sub,'personalizado:'+area);
    if(Array.isArray(adaptive)&&adaptive.length===indices.length)buckets.set(area,adaptive.map(i=>indices[i]));
    else{
      for(let i=indices.length-1;i>0;i--){const j=secureRandomIndex(i+1);[indices[i],indices[j]]=[indices[j],indices[i]]}
    }
  }
  const out=[];let more=true;
  while(more){more=false;for(const a of areas){const b=buckets.get(a);if(b?.length){out.push(b.shift());more=true}}}
  return out.length===pool.length?out:null
}
function freshQuestionQueue(pool){
  if(!pool.length)return [];
  let previous=[];
  try{previous=JSON.parse(localStorage.getItem(recentOrderKey())||'[]')}catch{}
  let queue=[],presented=[];
  for(let attempt=0;attempt<12;attempt++){
    const balanced=state?.module==='personalizado'?balancedPersonalizedOrder(pool):null;
    const adaptive=balanced||window.LearningTools?.orderIndices?.(pool,state?.module);
    queue=Array.isArray(adaptive)&&adaptive.length===pool.length?[...adaptive].reverse():shuffledIndices(pool.length);
    presented=[...queue].reverse().map(i=>String(pool[i]?.id??i));
    const compare=Math.min(previous.length,presented.length,10);
    let same=0;
    for(let i=0;i<compare;i++)if(previous[i]===presented[i])same++;
    const firstSame=compare>0&&previous[0]===presented[0];
    if(!firstSame&&same<=Math.max(1,Math.floor(compare*.2)))break
  }
  try{localStorage.setItem(recentOrderKey(),JSON.stringify(presented.slice(0,20)))}catch{}
  return queue
}
function ensureRandomQueues(force=false){
  if(!state)return;
  const qLen=activeQuestionBank().length,cLen=activeCaseBank().length;
  if(force||!Array.isArray(state.questionQueue)||state.questionQueueSize!==qLen){
    state.questionQueue=freshQuestionQueue(activeQuestionBank());
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
    state[queueKey]=queueKey==='questionQueue'?freshQuestionQueue(pool):shuffledIndices(pool.length,state[lastKey]??null);
    state[sizeKey]=pool.length
  }
  let idx=state[queueKey].pop();
  if(!Number.isInteger(idx)||idx<0||idx>=pool.length){
    state[queueKey]=queueKey==='questionQueue'?freshQuestionQueue(pool):shuffledIndices(pool.length,state[lastKey]??null);
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
async function startWithLoading(){showScreen($('loadingScreen'));tone('start');await delay(700);state={version:14,mode:draft.mode||'local',module:draft.module||'personalizado',selectedAreas:[...(draft.selectedAreas||[])],difficulty:draft.difficulty||'all',players:Array.from({length:draft.count},(_,i)=>{const cpu=draft.mode==='computer'&&i===draft.count-1;return{name:draft.names[i],position:0,skipTurns:0,skipReason:'',jailVisits:0,character:draft.characters[i],color:CHARACTERS[draft.characters[i]].color,isComputer:cpu,aiLevel:cpu?(draft.aiLevel||'medium'):null,quizStats:{attempts:0,correct:0,excellent:0,good:0,wrong:0,topics:{}}}}),current:0,usedQuestionIds:[],usedCaseIds:[],questionQueue:[],caseQueue:[],questionQueueSize:0,caseQueueSize:0,lastQuestionIndex:null,lastCaseIndex:null,turn:1,locked:false};ensureRandomQueues(true);saveGame();showScreen($('game'));buildBoard();render();startBackgroundMusic();statusText.textContent=`${state.players[0].name}, tira los dos dados.`;if(isComputerTurn())scheduleComputerTurn();setTimeout(()=>showTutorial(false),500)}
function buildBoard(){board.querySelectorAll('.cell,.start-marker').forEach(n=>n.remove());const start=document.createElement('div');start.className='start-marker';start.innerHTML='<b>INICIO</b><div class="start-tokens"></div>';board.appendChild(start);for(let n=1;n<=100;n++){const t=(n-1)/99,turns=4.6,theta=-Math.PI*.68+t*turns*2*Math.PI,rx=46-29*t,ry=44-27*t,x=50+rx*Math.cos(theta),y=50+ry*Math.sin(theta),r=ruleForCell(n),m=RULE_META[r.type]||RULE_META.neutral,c=document.createElement('div');c.className=`cell ${r.type}${n===100?' finish':''}${n%10===0&&n<100?' milestone':''}`;c.dataset.cell=n;c.style.left=`${x}%`;c.style.top=`${y}%`;c.style.zIndex=110-n;c.innerHTML=`<span class="cell-number">${n}</span>${r.type!=='neutral'&&r.type!=='finish'?`<span class="cell-icon">${m.icon}</span>`:''}<span class="tokens"></span>`;board.appendChild(c)}}
function render(){if(!state)return;document.querySelectorAll('.tokens,.start-tokens').forEach(x=>x.innerHTML='');document.querySelectorAll('.cell').forEach(c=>c.classList.remove('occupied','current-cell'));const grouped=new Map();state.players.forEach((p,i)=>{const pos=Math.max(0,Math.min(p.position,100));if(!grouped.has(pos))grouped.set(pos,[]);grouped.get(pos).push({p,i})});for(const [pos,list] of grouped.entries()){const host=pos===0?document.querySelector('.start-tokens'):document.querySelector(`[data-cell="${pos}"] .tokens`),cell=pos===0?document.querySelector('.start-marker'):document.querySelector(`[data-cell="${pos}"]`);if(host){list.forEach(({p,i},idx)=>{const tok=document.createElement('span');tok.className='board-token'+(i===state.current?' active':'');tok.style.setProperty('--token',p.color);const sh=tokenShift(idx,list.length);tok.style.setProperty('--sx',sh.x+'px');tok.style.setProperty('--sy',sh.y+'px');tok.innerHTML=`<span class="token-face">${characterFace(CHARACTERS[p.character]||CHARACTERS[0])}</span>`;tok.title=p.name;host.appendChild(tok)});cell?.classList.add('occupied');if(list.some(x=>x.i===state.current))cell?.classList.add('current-cell')}}$('scoreList').innerHTML=state.players.map((p,i)=>{const ch=CHARACTERS[p.character]||CHARACTERS[0];return `<div class="player-row ${i===state.current?'current':''}${p.isComputer?' computer-player':''}" style="--player:${p.color}"><div class="avatar character-avatar">${characterSprite(ch,"mini-character")}</div><div><b>${p.isComputer?'🤖 ':''}${esc(p.name)}</b><small>${ch.name}${p.isComputer?` · CPU ${AI_LEVELS[p.aiLevel]?.label||'Medio'}`:''} · ${p.position===0?'Inicio':p.position>=100?'Meta':`Casilla ${p.position}`}${p.skipTurns?` · pierde ${p.skipTurns} ${p.skipTurns===1?'turno':'turnos'}${p.skipReason?` · ${p.skipReason}`:''}`:''}</small><div class="progress"><i style="width:${Math.min(100,p.position)}%"></i></div></div><strong>${Math.min(p.position,100)}/100</strong></div>`}).join('');const current=state.players[state.current]||state.players[0],currentCh=current?CHARACTERS[current.character]||CHARACTERS[0]:CHARACTERS[0];document.documentElement.style.setProperty('--turn-accent',current?.color||'#168fd7');$('turnLabel').textContent=current?.name||'Jugador';if($('turnAvatar'))$('turnAvatar').innerHTML=characterSprite(currentCh,'turn-character');if($('turnPlayerName'))$('turnPlayerName').textContent=current?.name||'Jugador';const turnAction=current?.isComputer?(state.locked?'Jugando…':'Pensando…'):(state.locked?'Moviendo ficha…':'Tira los dados');const turnDetail=`${currentCh.name} · ${current?.position===0?'Inicio':current?.position>=100?'Meta':`Casilla ${current?.position}`} · ${turnAction}`;if($('turnPrompt'))$('turnPrompt').textContent=turnDetail;if($('moduleBadge'))$('moduleBadge').textContent=(state.module==='personalizado'?`🎯 ${selectedAreaLabelList(state.selectedAreas).join(' + ')}`:state.module==='fundamentos_oclusion'?'📘 Fundamentos de la oclusión':state.module==='fisiologia_funcion'?'🫁 Fisiología + función':state.module==='crecimiento_desarrollo'?'🦴 Crecimiento y desarrollo':state.module==='habitos_parafunciones'?'🧠 Hábitos y parafunciones':state.module==='nomenclatura_etimologia'?'🔤 Nomenclatura y etimología':state.module==='steiner'?'📐 Cefalometría de Steiner':'🦷 Ortopedia / banco general')+(state.difficulty&&state.difficulty!=='all'?` · ${state.difficulty}`:'');rollBtn.textContent=current?.isComputer?`🤖 ${current.name}: juega automáticamente`:(state.locked?'Moviendo ficha…':`🎲 ${current?.name||'Jugador'}: tirar dados`);rollBtn.disabled=state.locked||!!current?.isComputer;saveGame()}
async function rollDice(auto=false){
  if(!state||state.locked)return;
  const p=currentPlayer();
  if(p?.isComputer&&!auto)return;
  state.locked=true;rollBtn.disabled=true;
  const [a,b]=rollPairForPlayer(p);
  for(let i=0;i<8;i++){
    $('dice1').textContent=DICE[secureRandomIndex(6)];
    $('dice2').textContent=DICE[secureRandomIndex(6)];
    $('dice1').classList.add('rolling');$('dice2').classList.add('rolling');
    await delay(p?.isComputer?45:55)
  }
  $('dice1').textContent=DICE[a-1];$('dice2').textContent=DICE[b-1];
  $('dice1').classList.remove('rolling');$('dice2').classList.remove('rolling');
  $('diceTotal').textContent=a+b;tone('dice');
  const edge=p?.isComputer&&p.aiLevel==='super'?' · modo implacable':'';
  const total=a+b,start=p.position,rawTarget=start+total,overshoot=Math.max(0,rawTarget-BOARD_END);
  statusText.textContent=`${p.name} obtuvo ${a} + ${b} = ${total}${edge}.`;
  await moveWithFinishBounce(total);
  if(state.players[state.current].position===BOARD_END)return showWinner(state.players[state.current]);
  if(overshoot>0)statusText.textContent=`${p.name} llegó a la meta, se pasó por ${overshoot} y regresó hasta la casilla ${state.players[state.current].position}.`;
  setTimeout(()=>triggerCell(state.players[state.current].position),overshoot>0?520:180)
}
async function animateToPosition(p,target){const step=target>=p.position?1:-1;while(p.position!==target){p.position+=step;render();tone('step');await delay(105)}}
async function moveWithFinishBounce(delta){
  const p=state.players[state.current],raw=p.position+delta;
  if(delta>0&&raw>BOARD_END){
    await animateToPosition(p,BOARD_END);
    tone('event');
    await delay(180);
    await animateToPosition(p,BOARD_END-(raw-BOARD_END));
  }else{
    await animateToPosition(p,Math.max(0,Math.min(BOARD_END,raw)));
  }
  const landed=document.querySelector(`[data-cell="${p.position}"]`);if(landed){landed.classList.add('landed');setTimeout(()=>landed.classList.remove('landed'),420)}
}
async function move(delta){const p=state.players[state.current];await animateToPosition(p,Math.max(0,Math.min(BOARD_END,p.position+delta)));const landed=document.querySelector(`[data-cell="${p.position}"]`);if(landed){landed.classList.add('landed');setTimeout(()=>landed.classList.remove('landed'),420)}}
function resolveLanding(depth=0){if(!state)return;const p=state.players[state.current];if(p.position>=100)return showWinner(p);if(depth>=8){statusText.textContent='Cadena de eventos terminada. Siguiente turno.';return setTimeout(endTurn,420)}return triggerCell(p.position,depth)}
function triggerCell(cell,depth=0){const r=ruleForCell(cell);if(r.type==='question')return startQuestion(r.deck,depth);if(r.type==='case')return state?.module==='nomenclatura_etimologia'?startQuestion(r.deck,depth):startCase(r.deck,depth);if(r.type==='advance1')return movement('advance1',1,depth);if(r.type==='advance2')return movement('advance2',2,depth);if(r.type==='back1')return movement('back1',-1,depth);if(r.type==='back2')return movement('back2',-2,depth);if(r.type==='back3')return movement('back3',-3,depth);if(r.type==='vacation')return loseTurnEvent('vacation','Vacaciones',1);if(r.type==='tax')return loseTurnEvent('tax','Impuestos',1);if(r.type==='equipment')return loseTurnEvent('equipment','Equipo descompuesto',1);if(r.type==='lawsuit')return lawsuit(depth);if(r.type==='jail')return jail();if(r.type==='finish')return showWinner(state.players[state.current]);statusText.textContent='Casilla de descanso. Siguiente turno.';setTimeout(endTurn,420)}
function startQuestion(deck,chainDepth=0){if(state)state.pendingResolution={position:currentPlayer()?.position??0,depth:chainDepth};const bank=activeQuestionBank(),q=pickQueued(bank,'questionQueue','questionQueueSize','lastQuestionIndex');if(!q)return endTurn();pendingQuestion=randomizePresentedItem({...q,kind:'question',chainDepth},'question');selectedAnswer=null;tone('question');saveGame();showQuestion()}
function startCase(deck,chainDepth=0){if(state)state.pendingResolution={position:currentPlayer()?.position??0,depth:chainDepth};const bank=activeCaseBank();if(!bank.length&&state?.module==='personalizado')return startQuestion(deck,chainDepth);const q=pickQueued(bank,'caseQueue','caseQueueSize','lastCaseIndex');if(!q)return endTurn();pendingQuestion=randomizePresentedItem({...q,kind:'case',chainDepth},'case');selectedAnswer=null;tone('case');saveGame();showQuestion()}
function renderQuestionCharacter(mode='neutral'){
  const p=currentPlayer();if(!p)return;
  const ch=CHARACTERS[p.character]||CHARACTERS[0],persona=personaFor(p.character);
  const host=$('questionCharacter');if(!host)return;
  const phrase=mode==='success'?persona.correct:mode==='error'?persona.wrong:ch.reaction;
  host.style.setProperty('--accent',ch.color);
  host.innerHTML=`<div class="question-character-art ${mode}">${characterSprite(ch,'question-companion')}</div><div class="question-character-speech"><b>${ch.name}</b><span>${esc(phrase)}</span></div>`;
}
function ensurePlayerStats(p){
  if(!p)return null;
  if(!p.quizStats||typeof p.quizStats!=='object')p.quizStats={attempts:0,correct:0,excellent:0,good:0,wrong:0,topics:{}};
  if(!p.quizStats.topics||typeof p.quizStats.topics!=='object')p.quizStats.topics={};
  return p.quizStats
}
function recordMatchAnswer(outcome,q){
  const p=currentPlayer(),st=ensurePlayerStats(p);if(!st)return;
  st.attempts++;
  const success=['correct','excellent','good'].includes(outcome);
  if(success)st.correct++;else st.wrong++;
  if(outcome==='excellent')st.excellent++;
  if(outcome==='good')st.good++;
  const topic=String(q?.topic||q?.module||'General');
  const t=st.topics[topic]||(st.topics[topic]={attempts:0,correct:0});
  t.attempts++;if(success)t.correct++;
}
function winnerLearningSummary(p){
  const st=ensurePlayerStats(p),attempts=st?.attempts||0,correct=st?.correct||0,wrong=st?.wrong||0,accuracy=attempts?Math.round(correct*100/attempts):0;
  const topics=Object.entries(st?.topics||{}).map(([name,v])=>({name,attempts:v.attempts||0,correct:v.correct||0,wrong:Math.max(0,(v.attempts||0)-(v.correct||0)),rate:v.attempts?Math.round(v.correct*100/v.attempts):0})).filter(x=>x.attempts);
  topics.sort((a,b)=>b.rate-a.rate||b.attempts-a.attempts);
  return {attempts,correct,wrong,accuracy,best:topics[0]?.name||'—',review:topics.length?topics[topics.length-1].name:'—',excellent:st?.excellent||0,good:st?.good||0,topics}
}
function renderWinnerLearningReport(summary){
  const host=$('winnerTopicResults');if(!host)return;
  if(!summary.topics.length){host.innerHTML='<p class="winner-report-empty">'+esc(tr('No hubo suficientes reactivos para generar un desglose por tema.','There were not enough items to generate a topic breakdown.'))+'</p>';return}
  host.innerHTML=summary.topics.map(t=>'<div class="winner-topic-row"><div class="winner-topic-name"><b>'+esc(t.name)+'</b><span>'+t.correct+'/'+t.attempts+' '+esc(tr('correctas','correct'))+'</span></div><div class="winner-topic-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="'+t.rate+'"><i style="width:'+t.rate+'%"></i></div><strong>'+t.rate+'%</strong></div>').join('')
}
function showQuestion(){stopTimer();stopQuestionNarration();const q=pendingQuestion;questionDialog.classList.toggle('case-mode',q.kind==='case');questionDialog.classList.toggle('question-mode',q.kind!=='case');$('questionCategory').textContent=q.kind==='case'?(q.module==='fundamentos_oclusion'?`📋 Caso clínico · ${q.topic||'Fundamentos'}`:q.module==='fisiologia_funcion'?`🫁 Caso funcional · ${q.topic||'Fisiología'}`:q.module==='crecimiento_desarrollo'?`🦴 Caso de crecimiento · ${q.topic||'Crecimiento'}`:q.module==='habitos_parafunciones'?`🧠 Caso de hábitos · ${q.topic||'Hábitos'}`:q.module==='steiner'?`📐 Caso Steiner · ${q.topic||'Cefalometría'}`:`📋 Caso clínico · Sobre ${q.deck}${q.origin==='teacher'?' · Docente':''}`):q.module==='fundamentos_oclusion'?`📘 Fundamentos · ${q.topic||'Oclusión'}`:q.module==='fisiologia_funcion'?`🫁 Fisiología + función · ${q.topic||'Fisiología'}`:q.module==='crecimiento_desarrollo'?`🦴 Crecimiento · ${q.topic||'Crecimiento'}`:q.module==='habitos_parafunciones'?`🧠 Hábitos · ${q.topic||'Hábitos'}`:q.module==='steiner'?`📐 Steiner · ${q.topic||'Cefalometría'}`:`❓ Pregunta · Sobre ${q.deck}${q.origin==='teacher'?' · Docente':''}`;if(q.difficulty)$('questionCategory').textContent+=` · ${q.difficulty}`;$('questionNumber').textContent=q.kind==='case'?q.id:`Pregunta ${q.id}`;$('questionText').textContent=q.text;$('feedback').hidden=true;$('confirmAnswerBtn').hidden=false;$('confirmAnswerBtn').disabled=true;$('continueBtn').hidden=true;$('continueBtn').disabled=false;$('continueBtn').textContent='Continuar';$('timerDisplay').textContent='30';$('timerDisplay').closest('.timer-wrap')?.classList.remove('timer-low','timer-expired');$('timerBtn').disabled=false;$('timerBtn').textContent='Iniciar 30 s';questionDialog.classList.toggle('computer-turn',isComputerTurn());renderQuestionCharacter('neutral');const media=$('questionMedia');media.hidden=true;media.innerHTML='';if(q.mediaPending){media.hidden=false;media.innerHTML='<p>🎵🎬 Esta pregunta utiliza contenido multimedia en la versión original. La mecánica de respuesta permanece disponible.</p>'}const host=$('questionOptions');host.innerHTML='';q.options.forEach((opt,i)=>{const b=document.createElement('button');b.type='button';b.className='option';b.innerHTML=`<span>${String.fromCharCode(65+i)}</span><b>${esc(opt)}</b>`;b.onclick=()=>{selectedAnswer=i;tone('answer');document.querySelectorAll('.option').forEach((e,j)=>e.classList.toggle('selected',i===j));$('confirmAnswerBtn').disabled=false};host.appendChild(b)});questionDialog.showModal();if(isComputerTurn())runComputerQuestion();else setTimeout(narrateCurrentQuestion,180)}
function runComputerQuestion(){
  const q=pendingQuestion,p=currentPlayer();
  if(!q||!p?.isComputer)return;
  const opts=[...document.querySelectorAll('.option')];
  opts.forEach(o=>o.disabled=true);
  $('timerBtn').disabled=true;
  $('confirmAnswerBtn').disabled=true;
  $('questionNumber').textContent=`🤖 ${p.name} está pensando…`;
  queueComputerAction(()=>{
    if(!pendingQuestion||!isComputerTurn())return;
    selectedAnswer=chooseComputerAnswer(q,p);
    opts.forEach((o,i)=>o.classList.toggle('selected',i===selectedAnswer));
    tone('answer');
    queueComputerAction(()=>{
      if(!pendingQuestion||!isComputerTurn())return;
      confirmAnswer();
      $('continueBtn').disabled=true;
      $('continueBtn').textContent='La computadora continúa…';
      queueComputerAction(()=>continueAfterQuestion(),820)
    },300)
  },computerThinkDelay(p))
}
function tr(es,en){return window.I18N?.text?window.I18N.text(es,en):es}
function stopQuestionNarration(){
  narrationToken++;narrationActive=false;
  try{window.speechSynthesis?.cancel()}catch{}
}
function questionNarrationText(q){
  const intro=q?.kind==='case'?tr('Caso clínico.','Clinical case.'):tr('Pregunta.','Question.');
  const options=(q?.options||[]).map((opt,i)=>String.fromCharCode(65+i)+'. '+opt).join('. ');
  return [intro,q?.text||'',options].filter(Boolean).join(' ')
}
function beginQuestionCountdown(){
  if(!pendingQuestion||!questionDialog?.open)return;
  document.querySelectorAll('#questionOptions .option').forEach(o=>o.disabled=!!isComputerTurn());
  $('timerBtn').disabled=true;$('timerBtn').textContent=tr('30 s en curso','30 s running');
  startTimer()
}
function narrateCurrentQuestion(){
  stopQuestionNarration();
  if(!pendingQuestion||isComputerTurn())return beginQuestionCountdown();
  const synth=window.speechSynthesis;
  if(!synth||typeof SpeechSynthesisUtterance==='undefined')return beginQuestionCountdown();
  const token=++narrationToken,utterance=new SpeechSynthesisUtterance(questionNarrationText(pendingQuestion));
  narrationActive=true;
  utterance.lang=window.I18N?.lang==='en'?'en-US':'es-MX';
  utterance.rate=.94;utterance.pitch=1;utterance.volume=1;
  const finish=()=>{if(token!==narrationToken)return;narrationActive=false;beginQuestionCountdown()};
  utterance.onend=finish;utterance.onerror=finish;
  document.querySelectorAll('#questionOptions .option').forEach(o=>o.disabled=true);
  $('timerBtn').disabled=true;$('timerBtn').textContent=tr('🎙️ Leyendo…','🎙️ Reading…');
  try{synth.speak(utterance)}catch{finish()}
}
function educationalFeedbackHtml(heading,q,selected,kind,timedOut=false){
  if(kind==='case'){
    const edu=window.LearningTools?.caseFeedback?.(q,selected,timedOut);
    const best=edu?.bestText||q.options?.[q.grades?.indexOf('excellent')]||'';
    const chosen=edu?.chosenText||'';
    const why=edu?.explanation||'Revisa el razonamiento clínico.';
    let extra='';
    if(Number.isInteger(selected)&&edu?.grade!=='excellent'){
      extra='<p class="feedback-distractor"><b>'+esc(tr('Tu opción:','Your answer:'))+'</b> '+esc(chosen)+'</p>';
    }
    return '<strong>'+esc(heading)+'</strong><div class="feedback-learning">'+
      '<p class="feedback-correct"><b>'+esc(tr('Respuesta más completa:','Best answer:'))+'</b> '+esc(best)+'</p>'+
      '<p class="feedback-why"><b>'+esc(tr('Por qué:','Why:'))+'</b> '+esc(why)+'</p>'+extra+'</div>';
  }
  const edu=window.LearningTools?.questionFeedback?.(q,selected,timedOut);
  const correct=edu?.correctText||q.options?.[q.correct]||'';
  const why=edu?.explanation||q.explanation||'Continúa el recorrido.';
  let extra='';
  if(Number.isInteger(selected)&&edu&&!edu.ok){
    extra='<p class="feedback-distractor"><b>'+esc(tr('Por qué tu opción no:','Why your choice is not the best answer:'))+'</b> '+esc(edu.distractor||'Esta opción no coincide con el concepto evaluado.')+'</p>';
  }
  return '<strong>'+esc(heading)+'</strong><div class="feedback-learning">'+
    '<p class="feedback-correct"><b>'+esc(tr('Respuesta correcta:','Correct answer:'))+'</b> '+esc(correct)+'</p>'+
    '<p class="feedback-why"><b>'+esc(tr('Por qué:','Why:'))+'</b> '+esc(why)+'</p>'+extra+'</div>';
}
function confirmAnswer(){
  if(selectedAnswer===null||!pendingQuestion)return;
  stopTimer();
  const opts=[...document.querySelectorAll('.option')];
  opts.forEach(o=>{o.disabled=true;o.classList.remove('selected')});
  let delta=0,heading='',snd='error',outcome='wrong';
  if(pendingQuestion.kind==='question'){
    const ok=selectedAnswer===pendingQuestion.correct;
    opts[pendingQuestion.correct]?.classList.add('correct');
    window.LearningTools?.record?.(state?.module,pendingQuestion,ok);
    if(ok){heading=tr('Correcta · permaneces en tu casilla','Correct · stay on your space');snd='correct';outcome='correct'}
    else{opts[selectedAnswer]?.classList.add('wrong');delta=-1;heading=tr('Incorrecta · retrocedes 1 casilla','Incorrect · move back 1 space');outcome='wrong'}
  }else{
    const grade=pendingQuestion.grades?.[selectedAnswer]||'incorrect';
    opts[selectedAnswer]?.classList.add(grade==='incorrect'?'wrong':'correct');
    if(grade==='excellent'){delta=2;heading=tr('Excelente · avanzas 2 casillas','Excellent · move forward 2 spaces');snd='excellent';outcome='excellent'}
    else if(grade==='good'){delta=1;heading=tr('Buena · avanzas 1 casilla','Good · move forward 1 space');snd='correct';outcome='good'}
    else{delta=-1;heading=tr('Incorrecta · retrocedes 1 casilla','Incorrect · move back 1 space');outcome='wrong'}
  }
  recordMatchAnswer(outcome,pendingQuestion);
  renderQuestionCharacter(outcome==='wrong'?'error':'success');
  characterTone(currentPlayer()?.character,outcome==='wrong'?'error':'select');
  tone(snd);
  pendingQuestion.resultDelta=delta;
  $('feedback').hidden=false;
  $('feedback').innerHTML=educationalFeedbackHtml(heading,pendingQuestion,selectedAnswer,pendingQuestion.kind,false);
  $('confirmAnswerBtn').hidden=true;
  $('continueBtn').hidden=false
}
async function continueAfterQuestion(){stopQuestionNarration();stopTimer();const q=pendingQuestion,d=q?.resultDelta||0,depth=q?.chainDepth||0;pendingQuestion=null;if(state)state.pendingResolution=null;questionDialog.close();if(!d)return endTurn();await move(d);return resolveLanding(depth+1)}
function expireQuestionTimer(){
  if(!pendingQuestion||!questionDialog?.open)return;
  stopQuestionNarration();stopTimer();tone('alarm');timerLeft=0;
  $('timerDisplay').textContent='0';
  $('timerDisplay').closest('.timer-wrap')?.classList.remove('timer-low');
  $('timerDisplay').closest('.timer-wrap')?.classList.add('timer-expired');
  $('timerBtn').textContent=tr('Tiempo terminado','Time is up');$('timerBtn').disabled=true;
  const opts=[...document.querySelectorAll('.option')];
  opts.forEach(o=>{o.disabled=true;o.classList.remove('selected')});
  if(pendingQuestion.kind==='question'){
    opts[pendingQuestion.correct]?.classList.add('correct');
    window.LearningTools?.record?.(state?.module,pendingQuestion,false);
  }
  pendingQuestion.resultDelta=-1;selectedAnswer=null;
  recordMatchAnswer('wrong',pendingQuestion);renderQuestionCharacter('error');characterTone(currentPlayer()?.character,'error');
  const heading=tr('⏱ Tiempo terminado · respuesta incorrecta · retrocedes 1 casilla','⏱ Time is up · incorrect answer · move back 1 space');
  $('feedback').hidden=false;
  $('feedback').innerHTML=educationalFeedbackHtml(heading,pendingQuestion,null,pendingQuestion.kind,true);
  $('confirmAnswerBtn').hidden=true;$('confirmAnswerBtn').disabled=true;
  $('continueBtn').hidden=false;$('continueBtn').disabled=false;$('continueBtn').textContent=tr('Continuar','Continue')
}
function startTimer(){if(timer||!pendingQuestion||narrationActive)return;timerLeft=30;$('timerDisplay').textContent='30';$('timerBtn').disabled=true;timer=setInterval(()=>{timerLeft--;$('timerDisplay').textContent=Math.max(0,timerLeft);const tw=$('timerDisplay').closest('.timer-wrap');if(timerLeft>0&&timerLeft<=10){tw?.classList.add('timer-low');tone('tick')}else tw?.classList.remove('timer-low');if(timerLeft<=0)expireQuestionTimer()},1000)}
function stopTimer(){if(timer){clearInterval(timer);timer=null}}
function movement(type,delta,depth=0){const m=RULE_META[type];tone(type);showEvent(m.title,m.message,m.icon,async()=>{await move(delta);return resolveLanding(depth+1)})}
function addSkipTurns(turns,reason){const p=state.players[state.current];p.skipTurns=(p.skipTurns||0)+turns;p.skipReason=reason||p.skipReason||'Evento';render()}
function loseTurnEvent(type,reason,turns=1){const m=RULE_META[type];tone(type);addSkipTurns(turns,reason);showEvent(m.title,m.message,m.icon,endTurn)}
function lawsuit(depth=0){const m=RULE_META.lawsuit;tone('lawsuit');showEvent(m.title,m.message,m.icon,async()=>{const p=state.players[state.current];await move(JAIL_CELL-p.position);return resolveLanding(depth+1)})}
function jail(){const m=RULE_META.jail,p=state.players[state.current];p.jailVisits=(p.jailVisits||0)+1;const turns=p.jailVisits===1?2:3;addSkipTurns(turns,'Cárcel');tone('jail');const text=p.jailVisits===1?'Primera vez en la cárcel: pierdes 2 turnos.':`Visita ${p.jailVisits} a la cárcel: pierdes 3 turnos.`;showEvent(m.title,text,m.icon,endTurn)}
function renderCharacterBook(){
  const host=$('characterBookGrid');if(!host)return;
  host.innerHTML=CHARACTERS.map((ch,i)=>`<article class="character-book-item" style="--accent:${ch.color}"><div class="book-art">${characterSprite(ch,'book-character')}</div><div><h3>${ch.name}</h3><b>${ch.role}</b><p>${ch.desc}</p><small>“${personaFor(i).correct}”</small></div></article>`).join('')
}
const TUTORIAL_STEPS=[
  {title:'1. Elige qué practicar',text:'En Juego personalizado selecciona de 1 a 5 áreas, además de dificultad y jugadores. El sistema mezcla preguntas y casos clínicos de esas áreas y prioriza lo que necesites repasar.'},
  {title:'2. Elige tu personaje',text:'Cada jugador toma un personaje distinto. Tu favorito queda preseleccionado la próxima vez, pero puedes cambiarlo cuando quieras.'},
  {title:'3. Tira los dos dados',text:'Avanzas la suma de ambos dados. Tu personaje aparece en “Ahora juega” y su rostro identifica tu ficha en el tablero.'},
  {title:'4. Resuelve cada casilla',text:'Azul = pregunta, morado = caso clínico. Las respuestas muestran explicación educativa y tu personaje reacciona al resultado.'}
];
let tutorialIndex=0;
function renderTutorialStep(){
  const step=TUTORIAL_STEPS[tutorialIndex]||TUTORIAL_STEPS[0],ch=CHARACTERS[0];
  if($('tutorialGuide'))$('tutorialGuide').innerHTML=characterSprite(ch,'tutorial-character');
  if($('tutorialStep'))$('tutorialStep').textContent=`Tutorial · ${tutorialIndex+1}/${TUTORIAL_STEPS.length}`;
  if($('tutorialTitle'))$('tutorialTitle').textContent=step.title;
  if($('tutorialText'))$('tutorialText').textContent=step.text;
  if($('tutorialNextBtn'))$('tutorialNextBtn').textContent=tutorialIndex===TUTORIAL_STEPS.length-1?'Entendido ✓':'Siguiente →'
}
function showTutorial(force=true){
  const dlg=$('tutorialDialog');if(!dlg||dlg.open)return;
  if(!force&&localStorage.getItem(TUTORIAL_KEY)==='seen')return;
  tutorialIndex=0;renderTutorialStep();dlg.showModal();characterTone(0,'select')
}
function closeTutorial(){
  const dlg=$('tutorialDialog');if(dlg?.open)dlg.close();
  localStorage.setItem(TUTORIAL_KEY,'seen')
}
function nextTutorial(){
  if(tutorialIndex<TUTORIAL_STEPS.length-1){tutorialIndex++;renderTutorialStep();tone('ui')}
  else closeTutorial()
}
function showEvent(title,text,icon,cb){$('eventIcon').textContent=icon;$('eventTitle').textContent=title;$('eventText').textContent=text;pendingAfterDialog=cb;const btn=$('eventContinueBtn'),cpu=isComputerTurn();btn.disabled=cpu;btn.textContent=cpu?'La computadora continúa…':'Continuar';eventDialog.showModal();if(cpu)queueComputerAction(()=>{if(eventDialog.open)closeEvent()},720)}
function closeEvent(){eventDialog.close();const cb=pendingAfterDialog;pendingAfterDialog=null;cb?.()}
function endTurn(){clearComputerTimer();if(state)state.pendingResolution=null;state.current=(state.current+1)%state.players.length;state.turn++;let guard=0;const skipped=[];while(state.players[state.current].skipTurns>0&&guard<state.players.length*8){const p=state.players[state.current],reason=p.skipReason||'penalización';p.skipTurns--;skipped.push(`${p.name} pierde este turno por ${reason}.`);if(p.skipTurns<=0)p.skipReason='';state.current=(state.current+1)%state.players.length;state.turn++;guard++}state.locked=false;saveGame();render();tone('turn');const prefix=skipped.length?skipped.join(' ')+' ':'';if(isComputerTurn()){statusText.textContent=prefix+`🤖 ${currentPlayer().name} está pensando…`;scheduleComputerTurn()}else statusText.textContent=prefix+`${currentPlayer().name}, tira los dos dados.`}
function showWinner(p){
  clearComputerTimer();state.locked=true;p.position=100;render();stopBackgroundMusic(true);
  const ch=CHARACTERS[p.character]||CHARACTERS[0],summary=winnerLearningSummary(p),persona=personaFor(p.character);
  $('winnerTitle').textContent=p.isComputer?'🤖 La computadora ganó':'¡Llegaste a la META!';
  $('winnerText').textContent=p.isComputer?`${p.name} llegó primero a la meta con razonamiento ${AI_LEVELS[p.aiLevel]?.label||'Medio'}.`:`${p.name} completó las 100 casillas. ${persona.win}`;
  if($('winnerCharacter')){$('winnerCharacter').style.setProperty('--accent',ch.color);$('winnerCharacter').innerHTML=characterSprite(ch,'winner-character-sprite')}
  if($('winnerStats'))$('winnerStats').innerHTML=`<div><b>${summary.accuracy}%</b><span>Aciertos</span></div><div><b>${summary.correct}</b><span>Correctas</span></div><div><b>${summary.wrong}</b><span>Incorrectas</span></div><div><b>${summary.excellent}</b><span>Excelentes</span></div><div><b>${summary.attempts}</b><span>Reactivos</span></div>`;
  renderWinnerLearningReport(summary);
  if($('winnerConfetti'))$('winnerConfetti').innerHTML=Array.from({length:28},(_,i)=>`<i style="--i:${i}"></i>`).join('');
  $('winnerDialog').showModal();tone('win');characterTone(p.character,'win')
}
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
    const ctx=audioContext();
    if(ctx&&sfxBus){const now=ctx.currentTime;sfxBus.gain.cancelScheduledValues(now);sfxBus.gain.setValueAtTime(1,now)}
    updateSoundButton();
    tone('select');
    if(state&&$('game')?.classList.contains('active'))startBackgroundMusic()
  }else{
    stopBackgroundMusic(false);
    if(audioCtx&&sfxBus){const now=audioCtx.currentTime;sfxBus.gain.cancelScheduledValues(now);sfxBus.gain.setValueAtTime(.0001,now)}
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
      case 'tick':
        beep(ctx,880,t,.035,.014,'sine');break;
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
      case 'back3':
        noise(ctx,t,.11,.03,260);beep(ctx,350,t,.09,.03,'sawtooth',250);beep(ctx,250,t+.08,.10,.03,'sawtooth',180);beep(ctx,180,t+.17,.17,.03,'square',120);break;
      case 'tax':
        beep(ctx,420,t,.07,.022,'triangle');beep(ctx,320,t+.08,.10,.024,'triangle');break;
      case 'equipment':
        noise(ctx,t,.12,.025,850);beep(ctx,180,t,.08,.02,'square');beep(ctx,150,t+.10,.10,.02,'square');break;
      case 'lawsuit':
        beep(ctx,260,t,.10,.03,'square');beep(ctx,210,t+.09,.10,.03,'square');beep(ctx,160,t+.18,.20,.032,'square');break;
      case 'jail':
        noise(ctx,t,.06,.025,1100);beep(ctx,190,t,.16,.03,'square');noise(ctx,t+.17,.06,.023,1100);beep(ctx,150,t+.17,.20,.03,'square');break;
      case 'vacation':
        beep(ctx,523,t,.10,.024,'sine');beep(ctx,659,t+.08,.10,.025,'sine');beep(ctx,880,t+.16,.20,.025,'sine',990);noise(ctx,t+.22,.18,.010,1400);break;
      case 'turn':
        beep(ctx,660,t,.055,.018,'sine');beep(ctx,880,t+.055,.075,.019,'sine');break;
      case 'computer':
        beep(ctx,440,t,.045,.012,'sine');beep(ctx,554,t+.055,.045,.012,'sine');beep(ctx,659,t+.11,.065,.014,'sine');break;
      case 'win':
        beep(ctx,523,t,.13,.03,'triangle');beep(ctx,659,t+.10,.13,.032,'triangle');beep(ctx,784,t+.20,.13,.034,'triangle');beep(ctx,1047,t+.30,.30,.038,'sine');noise(ctx,t+.28,.30,.010,1800);break;
      default:
        beep(ctx,500,t,.10,.02,'sine');
    }
  }catch{}
}
function savedGameSummary(){
  try{
    const s=JSON.parse(localStorage.getItem(STORAGE_KEY));if(!s?.players?.length)return null;
    const idx=Math.max(0,Math.min(Number(s.current)||0,s.players.length-1)),p=s.players[idx]||s.players[0];
    return {player:p?.name||'Jugador',position:Math.max(0,Math.min(100,Number(p?.position)||0)),turn:Math.max(1,Number(s.turn)||1),module:s.module||'ortopedia_general'}
  }catch{return null}
}
function updateResumeButton(){
  if(!resumeBtn)return;
  const info=savedGameSummary();resumeBtn.hidden=!info;
  if(info){resumeBtn.textContent=`▶ Continuar · ${info.player} · casilla ${info.position}`;resumeBtn.title=`Turno ${info.turn} · ${info.module}`}
}
function saveGame(){try{if(state){state.savedAt=Date.now();localStorage.setItem(STORAGE_KEY,JSON.stringify(state))}updateResumeButton();return true}catch(err){console.warn('No se pudo guardar la partida',err);if(resumeBtn)resumeBtn.hidden=true;return false}}
function migrate(){if(localStorage.getItem(STORAGE_KEY))return;const old=localStorage.getItem('ortopediaGameV05');if(!old)return;try{const s=JSON.parse(old);if(!s.players?.length)return;s.version=10;s.players=s.players.slice(0,5);s.players.forEach((p,i)=>{p.position=Math.min(99,Math.round((p.position||0)/38*100));p.character=Math.min(CHARACTERS.length-1,typeof p.character==='number'?p.character:i%CHARACTERS.length);p.color=CHARACTERS[p.character].color;p.skipTurns=p.skipTurns||0;p.skipReason=p.skipReason||'';p.jailVisits=p.jailVisits||0;p.isComputer=!!p.isComputer;p.aiLevel=p.isComputer?(p.aiLevel||'medium'):null});s.usedQuestionIds=s.usedQuestionIds||[];s.usedCaseIds=s.usedCaseIds||[];s.current=Math.min(s.current||0,s.players.length-1);s.mode=s.players.some(p=>p.isComputer)?'computer':'local';s.locked=false;localStorage.setItem(STORAGE_KEY,JSON.stringify(s))}catch{}}
function loadGame(){try{state=JSON.parse(localStorage.getItem(STORAGE_KEY));if(!state?.players?.length)throw new Error('Partida guardada inválida');state.players=state.players.slice(0,5);state.players.forEach((p,i)=>{p.character=Math.min(CHARACTERS.length-1,typeof p.character==='number'?p.character:i%CHARACTERS.length);p.color=CHARACTERS[p.character].color;p.skipTurns=p.skipTurns||0;p.skipReason=p.skipReason||'';p.jailVisits=p.jailVisits||0;p.isComputer=!!p.isComputer;p.aiLevel=p.isComputer?(p.aiLevel||'medium'):null;p.quizStats=p.quizStats||{attempts:0,correct:0,excellent:0,good:0,wrong:0,topics:{}}});state.usedQuestionIds=state.usedQuestionIds||[];state.usedCaseIds=state.usedCaseIds||[];state.module=state.module||'ortopedia_general';state.selectedAreas=Array.isArray(state.selectedAreas)?state.selectedAreas:[];state.difficulty=state.difficulty||'all';if(state.module==='personalizado')setupSelectedAreas=[...state.selectedAreas];state.mode=state.players.some(p=>p.isComputer)?'computer':'local';state.locked=false;ensureRandomQueues(false);showScreen($('game'));buildBoard();render();startBackgroundMusic();if(state.pendingResolution&&state.pendingResolution.position===currentPlayer().position){state.locked=true;render();statusText.textContent='Partida recuperada. Debes resolver la casilla pendiente antes de continuar.';setTimeout(()=>resolveLanding(state.pendingResolution?.depth||0),350)}else if(isComputerTurn()){statusText.textContent=`Partida recuperada. 🤖 ${currentPlayer().name} continúa automáticamente.`;scheduleComputerTurn(650)}else statusText.textContent=`Partida recuperada. ${state.players[state.current].name}, tira los dos dados.`}catch(err){console.warn('No se pudo recuperar la partida',err);localStorage.removeItem(STORAGE_KEY);state=null;updateResumeButton();statusText&&(statusText.textContent='La partida guardada no era válida y se descartó de forma segura.')}}
function resetGame(){if(!confirm('¿Reiniciar la partida?'))return;clearComputerTimer();stopBackgroundMusic(true);localStorage.removeItem(STORAGE_KEY);state=null;showScreen($('setup'));updateGameModeUI()}
function playAgain(){$('winnerDialog').close();clearComputerTimer();stopBackgroundMusic(false);localStorage.removeItem(STORAGE_KEY);state=null;showScreen($('setup'));updateGameModeUI()}
function delay(ms){return new Promise(r=>setTimeout(r,ms))}
function returnToSetupFromGame(){
  clearComputerTimer();
  stopQuestionNarration();
  stopTimer();
  stopBackgroundMusic(true);
  state&&(state.locked=false);
  saveGame();
  showScreen($('setup'));
  updateGameModeUI();
  updateResumeButton()
}
window.handleElCaminoBack=function(){
  if($('tutorialDialog')?.open){closeTutorial();return true}
  if($('characterBookDialog')?.open){$('characterBookDialog').close();return true}
  if(rulesDialog?.open){rulesDialog.close();return true}
  if(questionDialog?.open||eventDialog?.open||$('winnerDialog')?.open){
    tone('ui');
    return true
  }
  const active=screens.find(x=>x?.classList.contains('active'));
  if(active?.id==='game'){
    returnToSetupFromGame();
    return true
  }
  if(active?.id==='characters'){
    if(draft?.pickerIndex>0){draft.pickerIndex--;renderPicker()}
    else showScreen($('setup'));
    return true
  }
  if(active?.id==='loadingScreen')return true;
  if(active?.id==='setup'){
    location.href='index.html';
    return true
  }
  return false
};
playerCount.onchange=()=>{if(!computerSetupEnabled())buildNameInputs();tone('select')};
if(gameMode)gameMode.onchange=()=>{updateGameModeUI();tone('select')};
if(aiLevel)aiLevel.onchange=()=>tone('select');
if(gameModule)gameModule.onchange=()=>{tone('select');renderAreaPicker()};
if(gameDifficulty)gameDifficulty.onchange=()=>tone('select');
$('randomAreasBtn').onclick=chooseRandomAreas;
$('clearAreasBtn').onclick=clearAreas;
$('chooseCharactersBtn').onclick=()=>{if(customModeEnabled()&&!setupSelectedAreas.length){renderAreaPicker();return}tone('ui');beginCharacterSelection()};
$('pickerNextBtn').onclick=()=>{tone('ui');pickerNext()};
$('pickerBackBtn').onclick=()=>{tone('ui');pickerBack()};
resumeBtn.onclick=()=>{tone('ui');loadGame()};
rollBtn.onclick=()=>rollDice(false);
$('confirmAnswerBtn').onclick=()=>{if(!isComputerTurn())confirmAnswer()};
$('continueBtn').onclick=()=>{if(!isComputerTurn()){tone('ui');continueAfterQuestion()}};
$('eventContinueBtn').onclick=()=>{if(!isComputerTurn()){tone('ui');closeEvent()}};
$('timerBtn').onclick=()=>{if(!isComputerTurn()&&!narrationActive){tone('ui');startTimer()}};
$('resetBtn').onclick=resetGame;
const exitGameBtn=$('exitGameBtn');if(exitGameBtn)exitGameBtn.onclick=()=>{tone('ui');returnToSetupFromGame()};
$('playAgainBtn').onclick=playAgain;
$('soundBtn').onclick=toggleSound;
$('characterBookBtn').onclick=()=>{tone('ui');renderCharacterBook();$('characterBookDialog').showModal()};
$('closeCharacterBookBtn').onclick=()=>{tone('ui');$('characterBookDialog').close()};
$('tutorialBtn').onclick=()=>{tone('ui');showTutorial(true)};
$('tutorialNextBtn').onclick=nextTutorial;
$('skipTutorialBtn').onclick=closeTutorial;
$('rulesBtn').onclick=()=>{tone('ui');rulesDialog.showModal()};
$('closeRulesBtn').onclick=()=>{tone('ui');rulesDialog.close()};
questionDialog.addEventListener('cancel',e=>e.preventDefault());
eventDialog.addEventListener('cancel',e=>e.preventDefault());
$('tutorialDialog')?.addEventListener('cancel',e=>{e.preventDefault();closeTutorial()});
$('characterBookDialog')?.addEventListener('cancel',e=>{e.preventDefault();$('characterBookDialog').close()});
window.addEventListener('elcamino:native-pause',()=>{
  clearComputerTimer();
  stopQuestionNarration();
  stopTimer();
  if(state)saveGame();
  if(musicActive)stopBackgroundMusic(false);
});
window.addEventListener('elcamino:native-resume',()=>{
  if(!state||!$('game')?.classList.contains('active'))return;
  render();
  if(questionDialog?.open&&pendingQuestion){
    $('timerBtn').disabled=false;
    $('timerBtn').textContent=tr('Reanudar 30 s','Resume 30 s');
    statusText.textContent=tr('Partida reanudada. Reinicia el tiempo cuando estés listo.','Game resumed. Restart the timer when ready.');
  }else if(isComputerTurn()&&!state.locked){
    scheduleComputerTurn(650);
  }
});
document.addEventListener('visibilitychange',()=>{
  if(document.hidden){
    clearComputerTimer();
    stopQuestionNarration();
    stopTimer();
    if(state)saveGame();
    if(musicActive)stopBackgroundMusic(false);
    if(audioCtx?.state==='running')audioCtx.suspend().catch(()=>{})
  }else if(state&&$('game')?.classList.contains('active')){
    if(soundEnabled){audioContext();startBackgroundMusic()}
    if(questionDialog?.open&&pendingQuestion){
      $('timerBtn').disabled=false;
      $('timerBtn').textContent=tr('Reanudar 30 s','Resume 30 s');
      statusText.textContent=tr('Partida reanudada. Reinicia el tiempo cuando estés listo.','Game resumed. Restart the timer when ready.');
    }else if(isComputerTurn()){
      resumeComputerAutomation()
    }
  }
});
const requestedModule=new URLSearchParams(location.search).get('module');
if(gameModule&&requestedModule&&[...gameModule.options].some(o=>o.value===requestedModule))gameModule.value=requestedModule;
migrate();updateResumeButton();updateGameModeUI();renderAreaPicker();buildBoard();updateSoundButton();resumeBtn.hidden=!localStorage.getItem(STORAGE_KEY);if('serviceWorker'in navigator&&location.protocol==='https:')window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
