/* Paso 16 · integridad y calidad del banco de preguntas. */
(()=>{'use strict';
const ALLOWED_DIFFICULTIES=new Set(['Básico','Intermedio','Clínico','Todas','Fácil','Medio','Difícil','Extremo']);
function normalizeText(value){
  return String(value??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase()
    .replace(/[¿?¡!.,;:()\[\]{}"'’“”]/g,' ').replace(/\s+/g,' ').trim();
}
function validateQuestion(q){
  const errors=[],warnings=[];
  if(!q||typeof q!=='object'){return{valid:false,errors:['not_object'],warnings:[]}}
  const text=String(q.text??'').trim();
  const options=Array.isArray(q.options)?q.options:[];
  if(!text)errors.push('missing_text');
  if(options.length<3||options.length>7)errors.push('options_count');
  if(!Number.isInteger(q.correct)||q.correct<0||q.correct>=options.length)errors.push('invalid_correct');
  const normalizedOptions=options.map(normalizeText);
  if(normalizedOptions.some(Boolean) && new Set(normalizedOptions.filter(Boolean)).size!==normalizedOptions.filter(Boolean).length)errors.push('duplicate_options');
  if(options.some(x=>!String(x??'').trim()))errors.push('empty_option');
  if(q.difficulty&&!ALLOWED_DIFFICULTIES.has(String(q.difficulty)))warnings.push('unknown_difficulty');
  if(!q.id)warnings.push('missing_id');
  if(!q.explanation)warnings.push('missing_explanation');
  return{valid:errors.length===0,errors,warnings}
}
function auditBank(items,name='bank'){
  const rows=Array.isArray(items)?items:[],ids=new Map(),texts=new Map(),errors=[],warnings=[];
  rows.forEach((q,index)=>{
    const v=validateQuestion(q);
    v.errors.forEach(issue=>errors.push({index,id:q?.id??'',issue}));
    v.warnings.forEach(issue=>warnings.push({index,id:q?.id??'',issue}));
    const id=String(q?.id??'').trim();
    const text=normalizeText(q?.text);
    if(id){if(!ids.has(id))ids.set(id,[]);ids.get(id).push(index)}
    if(text){if(!texts.has(text))texts.set(text,[]);texts.get(text).push(index)}
  });
  const duplicateIds=[...ids.entries()].filter(([,a])=>a.length>1).map(([id,indexes])=>({id,indexes}));
  const duplicateTexts=[...texts.entries()].filter(([,a])=>a.length>1).map(([text,indexes])=>({text,indexes}));
  return{name,count:rows.length,valid:errors.length===0,errors,warnings,duplicateIds,duplicateTexts};
}
window.step16QuestionIntegrity={normalizeText,validateQuestion,auditBank};
window.step16ValidateQuestion=q=>validateQuestion(q).valid;
window.step16AuditAllQuestionBanks=function(){
  const banks=[
    ['general',window.QUESTIONS],['primer_parcial',window.PRIMER_PARCIAL_QUESTIONS],
    ['nomenclatura_etimologia',window.NOMENCLATURA_ETIMOLOGIA_QUESTIONS],
    ['anatomia',window.ANATOMIA_QUESTIONS],['anestesia',window.ANESTESIA_DENTAL_QUESTIONS],
    ['steiner',window.STEINER_QUESTIONS],['fisiologia_funcion',window.FISIOLOGIA_FUNCION_QUESTIONS],
    ['crecimiento_desarrollo',window.CRECIMIENTO_DESARROLLO_QUESTIONS],
    ['habitos_parafunciones',window.HABITOS_PARAFUNCIONES_QUESTIONS],
    ['endodoncia',window.ENDODONCIA_QUESTIONS],['ortodoncia',window.ORTODONCIA_QUESTIONS]
  ];
  return banks.map(([name,items])=>auditBank(items||[],name));
};
})();