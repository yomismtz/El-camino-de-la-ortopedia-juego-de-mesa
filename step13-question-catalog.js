/* Paso 13 · catálogo maestro de cobertura de preguntas. */
(()=>{'use strict';
const TARGET=[
 ['ortodoncia','Ortodoncia'],['ortopedia_maxilar','Ortopedia maxilar'],['endodoncia','Endodoncia'],['periodoncia','Periodoncia'],
 ['cirugia_bucal','Cirugía bucal'],['implantologia','Implantología'],['odontopediatria','Odontopediatría'],['protesis_fija','Prótesis fija'],
 ['protesis_removible','Prótesis removible'],['protesis_total','Prótesis total'],['rehabilitacion_oral','Rehabilitación oral'],
 ['radiologia_oral_maxilofacial','Radiología oral y maxilofacial'],['patologia_bucal','Patología bucal'],['medicina_bucal','Medicina bucal'],
 ['farmacologia_odontologica','Farmacología odontológica'],['materiales_dentales','Materiales dentales'],['operatoria_dental','Operatoria dental'],
 ['cariologia','Cariología'],['anatomia_dental','Anatomía dental'],['anestesia_dental','Anestesia dental'],['embriologia_dental','Embriología dental'],
 ['oclusion','Oclusión'],['atm_trastornos','ATM y trastornos'],['odontologia_preventiva','Odontología preventiva'],
 ['salud_publica','Salud pública'],['microbiologia','Microbiología'],['infecciones_odontogenicas','Infecciones odontogénicas'],
 ['trauma_dental','Trauma dental'],['odontogeriatria','Odontogeriatría'],['necesidades_especiales','Pacientes con necesidades especiales'],
 ['odontologia_forense','Odontología forense'],['bioetica_legislacion','Bioética y legislación odontológica'],
 ['fotografia_documentacion','Fotografía y documentación clínica'],['oclusion_funcional_avanzada','Oclusión funcional avanzada'],
 ['genetica_craneofacial','Genética craneofacial'],['fisiologia_oral','Fisiología oral'],['crecimiento_desarrollo','Crecimiento y desarrollo'],
 ['habitos_parafunciones','Hábitos y parafunciones'],['nomenclatura_etimologia','Nomenclatura y etimología'],
 ['cefalometria','Cefalometría'],['diagnostico_odontologico','Diagnóstico odontológico'],['cirugia_maxilofacial','Cirugía maxilofacial'],
 ['odontologia_estetica','Odontología estética'],['odontologia_basada_evidencia','Odontología basada en evidencia']
];
const BANKS=[
 ['general',()=>window.QUESTIONS||[],'Banco general'],['primer_parcial',()=>window.PRIMER_PARCIAL_QUESTIONS||[],'Primer parcial'],
 ['nomenclatura_etimologia',()=>window.NOMENCLATURA_ETIMOLOGIA_QUESTIONS||[],'Nomenclatura y etimología'],
 ['ortodoncia',()=>window.ORTODONCIA_QUESTIONS||[],'Ortodoncia'],
 ['endodoncia',()=>window.ENDODONCIA_QUESTIONS||[],'Endodoncia'],
 ['anatomia',()=>window.ANATOMIA_QUESTIONS||[],'Anatomía'],['anestesia_dental',()=>window.ANESTESIA_DENTAL_QUESTIONS||[],'Anestesia dental'],
 ['steiner',()=>window.STEINER_QUESTIONS||[],'Cefalometría de Steiner'],['fisiologia_funcion',()=>window.FISIOLOGIA_FUNCION_QUESTIONS||[],'Fisiología y función'],
 ['crecimiento_desarrollo',()=>window.CRECIMIENTO_DESARROLLO_QUESTIONS||[],'Crecimiento y desarrollo'],
 ['habitos_parafunciones',()=>window.HABITOS_PARAFUNCIONES_QUESTIONS||[],'Hábitos y parafunciones']
];
function inspect(){
 const banks=BANKS.map(([id,get,label])=>{let items=[];try{items=get()||[]}catch(_){items=[]}return{id,label,count:items.length,ids:items.map(q=>String(q?.id||''))}});
 const allIds=banks.flatMap(b=>b.ids.filter(Boolean)),unique=new Set(allIds);
 const coverage=TARGET.map(([id,name])=>{const b=banks.find(x=>x.id===id);return{id,name,count:b?.count||0,source:b?.label||null,target:100,gap:Math.max(0,100-(b?.count||0))}});
 return {version:1,targetCategories:TARGET.length,targetQuestions:4400,banks,totalLoaded:banks.reduce((n,b)=>n+b.count,0),uniqueIds:unique.size,duplicateIds:allIds.length-unique.size,coverage};
}
window.step13QuestionCatalog=inspect;
window.step13QuestionCatalogSummary=()=>{const r=inspect();return{targetCategories:r.targetCategories,targetQuestions:r.targetQuestions,totalLoaded:r.totalLoaded,uniqueIds:r.uniqueIds,duplicateIds:r.duplicateIds,categoriesAt100:r.coverage.filter(x=>x.count>=100).length,categoriesWithSource:r.coverage.filter(x=>x.source).length}};
})();