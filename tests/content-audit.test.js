/* Mejora 20 — QA del catálogo real. Este test no fabrica reactivos. */
'use strict';
const assert=require('assert');
const fs=require('fs');
const vm=require('vm');
const files=[
 'questions.js','questions-extra-deck1.js','questions-extra-deck2.js','questions-extra-deck3.js',
 'primer-parcial-questions.js','nomenclatura-etimologia-questions.js','ortodoncia-questions-2026.js',
 'endodoncia-questions-2026.js','anatomia-questions.js','anestesia-dental-questions.js',
 'fundamentos-oclusion.js','steiner-questions.js','fisiologia-funcion-questions.js',
 'crecimiento-desarrollo-questions.js','habitos-parafunciones-questions-1.js',
 'habitos-parafunciones-questions-2.js','habitos-parafunciones-questions-3.js',
 'habitos-parafunciones-questions-4.js','habitos-parafunciones-questions-5.js',
 'expansion-questions-2026.js'
];
const ctx={window:{},console,Math,Date,JSON,Set,Map};
vm.createContext(ctx);
for(const file of files) vm.runInContext(fs.readFileSync(file,'utf8'),ctx,{filename:file});
const auditSource=fs.readFileSync('step24-content-audit.js','utf8');
vm.runInContext(auditSource,ctx,{filename:'step24-content-audit.js'});
const r=ctx.window.step24ContentAudit.inspect();
assert.strictEqual(r.targetCategories,44);
assert.strictEqual(r.targetQuestions,4400);
assert.strictEqual(r.invalid,0,'No debe haber reactivos inválidos en los bancos auditados');
if(r.duplicateIds.length) console.log('DUPLICATE_IDS',JSON.stringify(r.duplicateIds.slice(0,30)));
assert.strictEqual(r.duplicateIds.length,0,'No debe haber IDs duplicados entre bancos');
assert.strictEqual(r.loaded,1340,'La línea base actual debe ser 1,340 reactivos reales cargados');
assert(r.coverage.every(x=>x.count>=0), 'La cobertura por categoría debe ser determinista');
console.log('✓ Mejora 20 QA: 44 categorías, objetivo 4,400, línea base real 1,340, sin IDs duplicados ni reactivos inválidos');
console.log(JSON.stringify({loaded:r.loaded,valid:r.valid,missing:4400-r.loaded,categories:r.coverage},null,2));
