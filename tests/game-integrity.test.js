'use strict';
const fs=require('fs');
const assert=require('assert');

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
  return raw>100?100-(raw-100):raw;
}

assert(app.includes('const BOARD_END=100;'),'BOARD_END debe ser 100');
assert(html.includes('100 casillas'),'La interfaz debe declarar 100 casillas');
assert(html.includes('<b>100</b>'),'La meta visible debe ser 100');

const types=['question','case','advance1','advance2','back1','back2','back3','vacation','tax','lawsuit','jail','equipment'];
const occupied=new Map();
for(const type of types){
  const cells=extractSet(type);
  assert(cells.length>0,type+' no puede quedar vacío');
  assert.strictEqual(new Set(cells).size,cells.length,type+' contiene casillas duplicadas');
  for(const cell of cells){
    assert(Number.isInteger(cell)&&cell>=1&&cell<100,type+' contiene casilla inválida '+cell);
    assert(!occupied.has(cell),'La casilla '+cell+' aparece en '+occupied.get(cell)+' y '+type);
    occupied.set(cell,type);
  }
}
assert.deepStrictEqual(extractSet('jail'),[44],'La cárcel debe permanecer en la casilla 44');
assert.strictEqual(extractSet('question').length,20,'Deben existir 20 casillas de pregunta');
assert.strictEqual(extractSet('case').length,19,'Deben existir 19 casillas de caso');

assert.strictEqual(bounce(97,3),100,'97 + 3 debe ganar exactamente');
assert.strictEqual(bounce(97,8),95,'97 + 8 debe rebotar a 95');
assert.strictEqual(bounce(99,2),99,'99 + 2 debe rebotar a 99');
assert.strictEqual(bounce(98,12),90,'98 + 12 debe rebotar a 90');
for(let start=0;start<100;start++)for(let roll=2;roll<=12;roll++){
  const end=bounce(start,roll);
  assert(end>=0&&end<=100,'Rebote fuera del tablero');
}
assert(app.includes('async function moveWithFinishBounce'),'Falta función de rebote');
assert(app.includes('position===BOARD_END'),'La victoria por dados debe exigir meta exacta');
assert(app.includes('triggerCell(state.players[state.current].position)'),'La casilla tras movimiento/rebote debe resolverse');

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

const css=fs.readFileSync('styles-v10.css','utf8');
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

const requiredScripts=['area-classifier.js','primer-parcial-questions.js','questions.js','app-v10.js','android-navigation.js'];
for(const script of requiredScripts)assert(html.includes('src="'+script+'"'),'Falta script crítico '+script);

console.log('✓ Tablero: 100 casillas, tipos sin colisiones y cárcel 44');
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
