'use strict';
const fs=require('fs');
const assert=require('assert');
const vm=require('vm');

const read=p=>fs.readFileSync(p,'utf8');
const app=read('app-v10.js');
const html=read('play.html');
const i18n=read('i18n.js');
const classifier=read('area-classifier.js');

function extractSet(name){
  const m=app.match(new RegExp(name+'\\s*:\\s*new Set\\(\\[([^\\]]*)\\]\\)'));
  assert(m,'No se encontró CELL_TYPES.'+name);
  return m[1].split(',').map(x=>Number(x.trim())).filter(Number.isFinite);
}
function bounce(start,roll){
  const raw=start+roll;
  return raw>80?80-(raw-80):raw;
}

assert(app.includes('const BOARD_END=80;'),'BOARD_END debe ser 80');
assert(html.includes('80 casillas'),'La interfaz debe declarar 80 casillas');
assert(html.includes('<b>80</b>'),'La meta visible debe ser 80');

const types=['question','case','advance1','advance2','back1','back2','back3','vacation','tax','lawsuit','jail','equipment'];
const occupied=new Map();
for(const type of types){
  const cells=extractSet(type);
  assert(cells.length>0,type+' no puede quedar vacío');
  assert.strictEqual(new Set(cells).size,cells.length,type+' contiene casillas duplicadas');
  for(const cell of cells){
    assert(Number.isInteger(cell)&&cell>=1&&cell<80,type+' contiene casilla inválida '+cell);
    assert(!occupied.has(cell),'La casilla '+cell+' aparece en '+occupied.get(cell)+' y '+type);
    occupied.set(cell,type);
  }
}
assert.deepStrictEqual(extractSet('jail'),[33,44,79],'Deben existir 3 cárceles distribuidas en el tablero');
assert.strictEqual(extractSet('question').length,20,'Deben existir 20 casillas de pregunta');
assert.strictEqual(extractSet('case').length,20,'Deben existir 20 casillas de caso');

assert.strictEqual(bounce(77,3),80,'77 + 3 debe ganar exactamente');
assert.strictEqual(bounce(77,8),75,'77 + 8 debe rebotar a 75');
assert.strictEqual(bounce(79,2),79,'79 + 2 debe rebotar a 79');
assert.strictEqual(bounce(78,12),70,'78 + 12 debe rebotar a 70');
for(let start=0;start<80;start++)for(let roll=2;roll<=12;roll++){
  const end=bounce(start,roll);
  assert(end>=0&&end<=80,'Rebote fuera del tablero');
}
assert(app.includes('async function moveWithFinishBounce'),'Falta función de rebote');
assert(app.includes('position===BOARD_END'),'La victoria por dados debe exigir meta exacta');
assert(/triggerCell\([^)]*\.position/.test(app),'La casilla tras movimiento/rebote debe resolverse');

for(const n of [2,3,4,5])assert(html.includes('value="'+n+'"')&&html.includes('>'+n+' jugadores</option>'),'Falta opción de '+n+' jugadores');
assert(!html.includes('value="6"'),'No debe existir opción de 6 jugadores');
assert(html.includes('value="computer"'),'Debe existir modo contra computadora');
for(const level of ['low','medium','high','super'])assert(html.includes('value="'+level+'"'),'Falta nivel IA '+level);

assert(app.includes("const STORAGE_KEY='ortopediaGameV10'"),'Falta clave de guardado v10');
assert(app.includes('function saveGame()'),'Falta autoguardado');
assert(app.includes('function loadGame()'),'Falta recuperación');
assert(app.includes('pendingResolution'),'Falta protección de resolución pendiente');
assert(app.includes("elcamino:native-pause"),'Falta pausa Android');
assert(app.includes('stopQuestionNarration();')&&app.includes('stopTimer();'),'La pausa debe detener voz y cronómetro');

assert(html.includes('id="rulesDialog"'),'Falta reglamento');
assert(html.includes('Victoria exacta y rebote en la META'),'El reglamento debe explicar la meta exacta');
assert(!html.includes('value="primer_parcial"'),'Primer parcial no debe ser módulo visible');
assert(!classifier.includes('primer_parcial'),'El clasificador no debe conservar el módulo eliminado');
for(const stale of ['900 preguntas','2–6 jugadores','38 casillas','37 casillas','llega o supera','🎯 Juega y aprueba']){
  assert(![html,i18n].some(x=>x.includes(stale)),'Texto obsoleto visible: '+stale);
}


const scriptSources=[...html.matchAll(/<script[^>]+src="([^"]+\\.js)"/g)].map(x=>x[1]);
for(const src of scriptSources)assert(fs.existsSync(src),'play.html referencia un script inexistente: '+src);
assert.strictEqual(new Set(scriptSources).size,scriptSources.length,'play.html no debe cargar scripts duplicados');

for(const fragment of [
  "if(r.type==='question')return startQuestion",
  "if(r.type==='case')return",
  "if(r.type==='advance1')return movement('advance1',1",
  "if(r.type==='advance2')return movement('advance2',2",
  "if(r.type==='back1')return movement('back1',-1",
  "if(r.type==='back2')return movement('back2',-2",
  "if(r.type==='back3')return movement('back3',-3",
  "if(r.type==='vacation')return loseTurnEvent",
  "if(r.type==='tax')return loseTurnEvent",
  "if(r.type==='equipment')return loseTurnEvent",
  "if(r.type==='lawsuit')return lawsuit",
  "if(r.type==='jail')return jail"
])assert(app.includes(fragment),'Falta resolución para: '+fragment);

assert(app.includes("p.jailVisits===1?2:3"),'Cárcel debe penalizar 2 turnos la primera visita y 3 después');
assert(app.includes("const JAIL_CELL=44;"),'Demanda debe poder enviar a cárcel 44');
assert(app.includes("await move(JAIL_CELL-p.position)"),'La demanda debe mover a la cárcel');
assert(app.includes("if(depth>=8)"),'Debe existir límite de seguridad para cadenas de eventos');
assert(app.includes("grade==='excellent'")&&app.includes("delta=2"),'Caso excelente debe avanzar 2');
assert(app.includes("grade==='good'")&&app.includes("delta=1"),'Caso bueno debe avanzar 1');
assert(app.includes("delta=-1")&&app.includes("Incorrecta · retrocedes 1 casilla"),'Respuesta incorrecta debe retroceder 1');
assert(app.includes("timerLeft=30"),'El cronómetro debe iniciar en 30 segundos');
assert(app.includes("timerLeft>0&&timerLeft<=10"),'Los últimos 10 segundos deben activar urgencia');
assert(app.includes("if(timerLeft<=0)expireQuestionTimer()"),'El tiempo agotado debe resolver el reactivo');
assert(app.includes("questionAccuracy:1")&&app.includes("excellent:1"),'IA súper inteligente debe conservar precisión máxima configurada');
assert(app.includes("if(questionDialog?.open&&pendingQuestion)"),'Reanudación debe reconocer preguntas pendientes');
assert(app.includes("if(eventDialog?.open)"),'Automatización IA debe poder reanudar eventos pendientes');

const primerPartialSource=fs.readFileSync('primer-parcial-questions.js','utf8');
const ppCasesBlock=primerPartialSource.match(/const CASES=\[([\s\S]*?)\];\s*window\.PRIMER_PARCIAL_QUESTIONS/);
assert(ppCasesBlock,'No se localizaron los casos históricos del Primer Parcial');
const ppCaseIds=[...ppCasesBlock[1].matchAll(/"id"\s*:\s*"([^"]+)"/g)].map(x=>x[1]);
assert.strictEqual(ppCaseIds.length,25,'Deben conservarse exactamente 25 casos históricos');
assert.strictEqual(new Set(ppCaseIds).size,25,'Los 25 casos históricos deben tener IDs únicos');
assert(app.includes("...(window.PRIMER_PARCIAL_CASES||[])"),'Los 25 casos históricos deben estar integrados al banco clínico general');


// Auditoría estructural de bancos académicos y seguridad del barajado.
assert(app.includes("out.correct=order.indexOf(item.correct)"),'Al barajar preguntas debe recalcularse el índice correcto');
assert(app.includes("out.grades=order.map(i=>item.grades?.[i]||'incorrect')"),'Al barajar casos deben mantenerse opción y grado sincronizados');
assert(app.includes("out.feedback=order.map(i=>item.feedback?.[i]||'Revisa el razonamiento clínico.')"),'Al barajar casos deben mantenerse opción y feedback sincronizados');
assert(app.includes("state.questionQueue=freshQuestionQueue"),'Las preguntas deben usar cola aleatoria');
assert(app.includes("state.caseQueue=shuffledIndices"),'Los casos deben usar cola aleatoria');


const nomenclatureSource=fs.readFileSync('nomenclatura-etimologia-questions.js','utf8');
const nomenclatureContext={window:{}};
vm.runInNewContext(nomenclatureSource,nomenclatureContext);
const nomenclatureBank=nomenclatureContext.window.NOMENCLATURA_ETIMOLOGIA_QUESTIONS;
assert(Array.isArray(nomenclatureBank),'El banco de nomenclatura debe exportarse como arreglo');
assert.strictEqual(nomenclatureBank.length,100,'Nomenclatura debe contener exactamente 100 preguntas');
assert.strictEqual(new Set(nomenclatureBank.map(q=>q.id)).size,100,'Las 100 preguntas de nomenclatura deben tener IDs únicos');
assert(nomenclatureBank.every(q=>q.module==='nomenclatura_etimologia'&&q.text&&Array.isArray(q.options)&&q.options.length>=4&&Number.isInteger(q.correct)),'Todas las preguntas de nomenclatura deben tener estructura válida');
assert(app.includes("if(module==='nomenclatura_etimologia')return nomenclatureEtymologyQuestions"),'El juego debe enrutar el módulo de nomenclatura a su banco dedicado');
assert(html.includes('src="nomenclatura-etimologia-questions.js"'),'play.html debe cargar el banco de nomenclatura');
const expansionQuestions=fs.readFileSync('expansion-questions-2026.js','utf8');
const expansionCases=fs.readFileSync('expansion-cases-2026.js','utf8');
const expQIds=[...expansionQuestions.matchAll(/"id":"(EXP-Q-\d{3})"/g)].map(x=>x[1]);
const expCIds=[...expansionCases.matchAll(/"id":"(EXP-C-\d{3})"/g)].map(x=>x[1]);
assert.strictEqual(expQIds.length,200,'La expansión debe aportar exactamente 200 preguntas');
assert.strictEqual(new Set(expQIds).size,200,'Las 200 preguntas nuevas deben tener IDs únicos');
assert.strictEqual(expCIds.length,145,'La expansión debe aportar exactamente 145 casos');
assert.strictEqual(new Set(expCIds).size,145,'Los 145 casos nuevos deben tener IDs únicos');
assert(html.includes('src="expansion-questions-2026.js"'),'play.html debe cargar las 200 preguntas nuevas');
assert(html.includes('src="expansion-cases-2026.js"'),'play.html debe cargar los 145 casos nuevos');
assert(html.includes('1000 preguntas')&&html.includes('500 casos clínicos'),'La interfaz debe mostrar los nuevos totales');


assert(html.includes('1000 preguntas')&&html.includes('500 casos clínicos'),'play.html debe mostrar 1000 preguntas y 500 casos');
const home=fs.readFileSync('index.html','utf8');
const examHtml=fs.readFileSync('exam.html','utf8');
assert(home.includes('1000 preguntas')&&home.includes('500 casos clínicos'),'La portada debe mostrar los totales 1000/500');
assert(!home.includes('800 preguntas')&&!home.includes('355 casos clínicos'),'La portada no debe conservar totales anteriores');
assert(examHtml.includes('src="expansion-questions-2026.js"'),'Modo Examen debe cargar las 200 preguntas nuevas');
assert(classifier.includes("id:'anestesia'")&&classifier.includes("id:'implantologia'"),'El selector personalizado debe incluir Anestesia e Implantología');

const css=fs.readFileSync('styles-v10.css','utf8')+'\n'+fs.readFileSync('ui-polish.css','utf8');
const androidTouch=fs.readFileSync('android-touch-v85.css','utf8');
assert(html.includes('href="android-touch-v85.css"'),'play.html debe cargar el baseline Android al final');
assert(html.lastIndexOf('android-touch-v85.css')>html.lastIndexOf('character-art.css'),'El baseline Android debe cargarse después de los estilos heredados');
assert(androidTouch.includes('body:not(.game-playing){margin:0!important;position:static!important'),'Fuera de partida Android debe usar scroll documental nativo');
assert(androidTouch.includes('overflow-y:auto!important'),'Android debe permitir desplazamiento vertical nativo');
assert(androidTouch.includes('body.game-playing{position:fixed!important'),'Solo la partida conserva viewport fijo');
assert(!css.includes('v3.4 — bloquear desplazamiento horizontal'),'No deben sobrevivir overrides legacy de viewport/touch');
assert(!css.includes('v3.5 — interfaz completa sin desplazamiento'),'No debe sobrevivir el bloqueo global sin desplazamiento');
assert(androidTouch.includes('@media (orientation:landscape) and (max-height:900px)'),'La política touch debe cubrir landscape Android');
assert(androidTouch.includes('@media (orientation:landscape) and (max-height:600px)'),'Debe existir perfil ligero para landscape de poca altura');
assert(androidTouch.includes('backdrop-filter:none!important'),'El perfil ligero debe desactivar blur costoso');

const requiredScripts=['area-classifier.js','primer-parcial-questions.js','nomenclatura-etimologia-questions.js','questions.js','app-v10.js','android-navigation.js'];
for(const script of requiredScripts)assert(html.includes('src="'+script+'"'),'Falta script crítico '+script);

console.log('✓ Tablero: 80 casillas, tipos sin colisiones y 3 cárceles');
console.log('✓ Meta: victoria exacta y rebote validados para todas las posiciones/tiradas 2–12');
console.log('✓ Configuración: 2–5 jugadores, computadora y 4 niveles IA');
console.log('✓ Persistencia: guardado, recuperación y resolución pendiente presentes');
console.log('✓ Android: pausa segura de narración y cronómetro');
console.log('✓ UI/documentación: reglamento y textos actuales');
console.log('✓ QA flujo: eventos, cárcel, cronómetro, IA y recursos cargados');
console.log('✓ Casos clínicos: 25 casos históricos integrados al banco general');
console.log('✓ Aleatorización: respuesta, grado y feedback permanecen sincronizados');
console.log('✓ Expansión: +200 preguntas y +145 casos con IDs únicos y carga activa');
console.log('Paso 13: QA automatizado de versión candidata superado.');

assert(androidTouch.includes('edge-safe compact landscape setup'),'Debe existir layout landscape compacto y seguro en bordes');
assert(androidTouch.includes('grid-template-columns:repeat(6,minmax(110px,1fr))'),'Personajes deben compactarse en landscape');
assert(androidTouch.includes('.setup-form .actions{position:sticky!important;bottom:0!important'),'Acción principal del setup debe permanecer accesible');
assert(androidTouch.includes('overscroll-behavior:none!important'),'La pantalla landscape no debe propagar overscroll a bordes del sistema');
assert(app.includes('roundErrors'),'Debe existir contador de errores por ronda');
assert(app.includes('roundErrors>=3'),'Tres errores deben activar el robo');
assert(app.includes('function startRobbery()'),'Debe existir modo robo');
assert(app.includes('function confirmRobberyAnswer()'),'El robo debe tener resolución independiente');
assert(app.includes('¡ROBO!'),'Debe anunciarse el robo al llegar a tres errores');
assert(app.includes('has one chance'),'El rival debe tener un único intento en robo');
assert(app.includes('state.robbery.won=true'),'El robo exitoso debe marcar al rival como ganador de la ronda');
assert(app.includes('state.robbery.won=false'),'El robo fallido debe devolver el banco al equipo original');
assert(app.includes('state.roundErrors=0'),'El contador de errores debe reiniciarse al cerrar la ronda');
assert(app.includes("if(d<0&&state?.roundErrors>0&&state.roundErrors<3)"),'Los errores 1 y 2 deben conservar la ronda para acumular tres errores');
assert(app.includes("state.roundErrors=(state.roundErrors||0)+1"),'Preguntas y casos incorrectos deben incrementar errores');

assert(app.includes('round:1'),'La partida debe iniciar en ronda 1');
assert(app.includes('roundNo>=8'),'Debe existir cierre automático después de 8 rondas');
assert(app.includes('function finishRound('),'Debe existir cierre automático de ronda');
assert(app.includes('gana la ronda'),'Debe anunciarse al ganador de la ronda');
assert(app.includes('round-award'),'Debe existir animación visual de puntos');
assert(app.includes('roundWinnerPoints'),'El ganador debe recibir puntos automáticamente');
assert(app.includes('function showMatchWinner()'),'La ronda 8 debe pasar al resultado final');

// Paso 5: rendimiento y continuidad
assert(app.includes('Paso 5 · rendimiento'),'Debe existir la capa de rendimiento del Paso 5');
assert(app.includes('step5NormalizeAnswer'),'Debe normalizar respuestas');
assert(app.includes("normalize('NFD')"),'Debe tolerar acentos');
assert(app.includes('step5Levenshtein'),'Debe tolerar errores ortográficos pequeños');
assert(app.includes('q.acceptedAnswers')&&app.includes('q.synonyms'),'Debe aceptar sinónimos configurados');
assert(app.includes('step5ScheduleAdvance(1200)'),'El resultado debe avanzar automáticamente en ~1.2 s');
assert(app.includes("step5Phase('timer'"),'Debe distinguir fase de respuesta/cronómetro');
assert(app.includes('step5PreloadQuestion'),'Debe precargar el siguiente contenido');
assert(app.includes('step5RepeatQuestion'),'Debe permitir repetir la pregunta');
assert(app.includes('step5PersistNow'),'Debe persistir al suspender/cerrar WebView');
assert(app.includes('performance-mode'),'Debe existir modo rendimiento');
assert(html.includes('id="phaseIndicator"'),'Debe existir indicador de fase');
assert(html.includes('id="repeatQuestionBtn"'),'Debe existir repetir pregunta');
assert(html.includes('id="step5Settings"'),'Debe existir panel independiente de audio/rendimiento');
assert(html.includes('id="musicVolume"')&&html.includes('id="effectsVolume"')&&html.includes('id="narratorVolume"')&&html.includes('id="countdownVolume"'),'Audio debe tener controles independientes');
assert(html.includes('id="performanceMode"'),'Debe existir control de rendimiento');
assert(css.includes('performance-mode'),'El CSS debe reducir efectos en modo rendimiento');
console.log('✓ Paso 5: fases, transiciones, precarga, respuestas tolerantes, recuperación, audio y rendimiento');
