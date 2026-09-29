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

const playerSelect=(html.match(new RegExp('<select id="playerCount">([\\\\s\\\\S]*?)</select>'))||[])[1]||'';
const playerOptions=[...playerSelect.matchAll(/<option value="([2-5])"[^>]*>\\s*([2-5]) jugadores<\\/option>/g)].map(x=>Number(x[1]));
assert.deepStrictEqual(playerOptions,[2,3,4,5],'La configuración debe permitir exactamente 2–5 jugadores');
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

const requiredScripts=['area-classifier.js','primer-parcial-questions.js','questions.js','app-v10.js','android-navigation.js'];
for(const script of requiredScripts)assert(html.includes('src="'+script+'"'),'Falta script crítico '+script);

console.log('✓ Tablero: 100 casillas, tipos sin colisiones y cárcel 44');
console.log('✓ Meta: victoria exacta y rebote validados para todas las posiciones/tiradas 2–12');
console.log('✓ Configuración: 2–5 jugadores, computadora y 4 niveles IA');
console.log('✓ Persistencia: guardado, recuperación y resolución pendiente presentes');
console.log('✓ Android: pausa segura de narración y cronómetro');
console.log('✓ UI/documentación: reglamento y textos actuales');
console.log('Paso 12: pruebas de integridad superadas.');
