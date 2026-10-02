/* Paso 12 · auditoría estructural del banco de preguntas. */
(()=>{'use strict';
const BANKS=[
 ['general',()=>window.QUESTIONS||[]],['primer_parcial',()=>window.PRIMER_PARCIAL_QUESTIONS||[]],
 ['nomenclatura_etimologia',()=>window.NOMENCLATURA_ETIMOLOGIA_QUESTIONS||[]],['ortodoncia',()=>window.ORTODONCIA_QUESTIONS||[]],['anatomia',()=>window.ANATOMIA_QUESTIONS||[]],
 ['anestesia',()=>window.ANESTESIA_DENTAL_QUESTIONS||[]],['steiner',()=>window.STEINER_QUESTIONS||[]],
 ['fisiologia_funcion',()=>window.FISIOLOGIA_FUNCION_QUESTIONS||[]],['crecimiento_desarrollo',()=>window.CRECIMIENTO_DESARROLLO_QUESTIONS||[]],
 ['habitos_parafunciones',()=>window.HABITOS_PARAFUNCIONES_QUESTIONS||[]]
];
function collect(){return BANKS.flatMap(([bank,get])=>(get()||[]).map((q,index)=>({bank,index,q})))}
function audit(){
 const rows=collect(),ids=new Map(),errors=[],warnings=[];
 rows.forEach(({bank,index,q})=>{
  const id=String(q?.id??''); if(id){if(!ids.has(id))ids.set(id,[]);ids.get(id).push(bank)}
  if(!q?.text)errors.push({bank,index,issue:'missing_text'});
  if(!Array.isArray(q?.options)||q.options.length<2)errors.push({bank,index,id,issue:'invalid_options'});
  if(!Number.isInteger(q?.correct)||q.correct<0||q.correct>=((q?.options||[]).length))errors.push({bank,index,id,issue:'invalid_correct'});
  if(Array.isArray(q?.options)&&q.options.length<3)warnings.push({bank,index,id,issue:'less_than_3_options',count:q.options.length});
  if(Array.isArray(q?.options)&&q.options.length>7)warnings.push({bank,index,id,issue:'more_than_7_options',count:q.options.length});
  if(!q?.difficulty)warnings.push({bank,index,id,issue:'missing_difficulty'});
 });
 ids.forEach((banks,id)=>{if(banks.length>1)warnings.push({id,issue:'duplicate_id_across_loaded_banks',banks})});
 const byBank={}; for(const [name,get] of BANKS)byBank[name]=(get()||[]).length;
 return {version:1,generatedAt:new Date().toISOString(),total:rows.length,byBank,errors,warnings,hardPass:errors.length===0};
}
window.step12QuestionAudit=audit;
window.step12QuestionAuditSummary=()=>{const r=audit();return {total:r.total,errors:r.errors.length,warnings:r.warnings.length,hardPass:r.hardPass,byBank:r.byBank}};
})();