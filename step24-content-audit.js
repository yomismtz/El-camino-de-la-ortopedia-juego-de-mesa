/* Mejora 20 — auditoría determinista del banco maestro.
 * No crea preguntas. Solo mide preguntas realmente cargadas y cobertura por categoría.
 */
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
 ['general','QUESTIONS','Banco general'],['primer_parcial','PRIMER_PARCIAL_QUESTIONS','Primer parcial'],
 ['nomenclatura_etimologia','NOMENCLATURA_ETIMOLOGIA_QUESTIONS','Nomenclatura y etimología'],
 ['ortodoncia','ORTODONCIA_QUESTIONS','Ortodoncia'],['endodoncia','ENDODONCIA_QUESTIONS','Endodoncia'],
 ['anatomia_dental','ANATOMIA_QUESTIONS','Anatomía'],['anestesia_dental','ANESTESIA_DENTAL_QUESTIONS','Anestesia dental'],['oclusion','FUNDAMENTOS_OCLUSION','Fundamentos de oclusión'],
 ['cefalometria','STEINER_QUESTIONS','Cefalometría de Steiner'],
 ['fisiologia_oral','FISIOLOGIA_FUNCION_QUESTIONS','Fisiología y función'],
 ['crecimiento_desarrollo','CRECIMIENTO_DESARROLLO_QUESTIONS','Crecimiento y desarrollo'],
 ['habitos_parafunciones','HABITOS_PARAFUNCIONES_QUESTIONS','Hábitos y parafunciones']
];
function readBank(globalName){const v=window[globalName];return Array.isArray(v)?v:[]}
function validQuestion(q){return !!(q&&typeof q==='object'&&typeof q.id!=='undefined'&&typeof q.text==='string'&&q.text.trim()&&Array.isArray(q.options)&&q.options.length>=2&&Number.isInteger(q.correct)&&q.correct>=0&&q.correct<q.options.length)}
function norm(s){return String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'')}
function classify(q){
 const s=norm([q.module,q.topic,q.specialty,q.area,q.subject].filter(Boolean).join(' | '));
 if(s.includes('ortodoncia')||s.includes('ortopedia maxilar'))return s.includes('ortopedia')?'ortopedia_maxilar':'ortodoncia';
 if(s.includes('endodoncia'))return 'endodoncia';
 if(s.includes('periodoncia')||s.includes('periodont'))return 'periodoncia';
 if(s.includes('cirugia maxilofacial'))return 'cirugia_maxilofacial';
 if(s.includes('cirugia bucal')||s.includes('cirugia oral'))return 'cirugia_bucal';
 if(s.includes('implant'))return 'implantologia';
 if(s.includes('odontopediatr'))return 'odontopediatria';
 if(s.includes('protesis fija'))return 'protesis_fija';
 if(s.includes('protesis removible'))return 'protesis_removible';
 if(s.includes('protesis total'))return 'protesis_total';
 if(s.includes('rehabilitacion'))return 'rehabilitacion_oral';
 if(s.includes('radiolog'))return 'radiologia_oral_maxilofacial';
 if(s.includes('patologia'))return 'patologia_bucal';
 if(s.includes('medicina bucal'))return 'medicina_bucal';
 if(s.includes('farmacolog'))return 'farmacologia_odontologica';
 if(s.includes('materiales'))return 'materiales_dentales';
 if(s.includes('operatoria'))return 'operatoria_dental';
 if(s.includes('cariolog')||s.includes('caries'))return 'cariologia';
 if(s.includes('anatomia'))return 'anatomia_dental';
 if(s.includes('anestesia'))return 'anestesia_dental';
 if(s.includes('embriolog'))return 'embriologia_dental';
 if(s.includes('oclusion funcional'))return 'oclusion_funcional_avanzada';
 if(s.includes('oclusion')||s.includes('oclus'))return 'oclusion';
 if(s.includes('atm')||s.includes('articulacion temporomandibular'))return 'atm_trastornos';
 if(s.includes('preventiva')||s.includes('prevencion'))return 'odontologia_preventiva';
 if(s.includes('salud publica'))return 'salud_publica';
 if(s.includes('microbiolog'))return 'microbiologia';
 if(s.includes('infecciones odontogen'))return 'infecciones_odontogenicas';
 if(s.includes('trauma dental')||s.includes('traumat'))return 'trauma_dental';
 if(s.includes('geriatr'))return 'odontogeriatria';
 if(s.includes('necesidades especiales')||s.includes('pacientes especiales'))return 'necesidades_especiales';
 if(s.includes('forense'))return 'odontologia_forense';
 if(s.includes('bioetica')||s.includes('legislacion odont'))return 'bioetica_legislacion';
 if(s.includes('fotografia')||s.includes('documentacion clinica'))return 'fotografia_documentacion';
 if(s.includes('genetica'))return 'genetica_craneofacial';
 if(s.includes('fisiologia')||s.includes('funcion'))return 'fisiologia_oral';
 if(s.includes('crecimiento')||s.includes('desarrollo'))return 'crecimiento_desarrollo';
 if(s.includes('habitos')||s.includes('parafunciones'))return 'habitos_parafunciones';
 if(s.includes('nomenclatura')||s.includes('etimologia'))return 'nomenclatura_etimologia';
 if(s.includes('cefalometr'))return 'cefalometria';
 if(s.includes('diagnostico'))return 'diagnostico_odontologico';
 if(s.includes('estetica'))return 'odontologia_estetica';
 if(s.includes('evidencia'))return 'odontologia_basada_evidencia';
 return null;
}
function inspect(){
 const banks=BANKS.map(([id,g,label])=>{const items=readBank(g);return{id,g,label,count:items.length,valid:items.filter(validQuestion).length,invalid:items.filter(q=>!validQuestion(q)).length}});
 const loaded=BANKS.flatMap(([,g])=>readBank(g));
 const ids=loaded.map(q=>String(q?.id??'')).filter(Boolean), seen=new Map(), duplicates=[];
 ids.forEach((id,i)=>{if(seen.has(id))duplicates.push(id);else seen.set(id,i)});
 const coverage=TARGET.map(([id,name])=>{const items=loaded.filter(q=>classify(q)===id);return{id,name,count:items.length,target:100,gap:Math.max(0,100-items.length),over:Math.max(0,items.length-100)}});
 return {version:2,targetCategories:44,targetQuestions:4400,loaded:loaded.length,valid:loaded.filter(validQuestion).length,invalid:loaded.length-loaded.filter(validQuestion).length,uniqueIds:seen.size,duplicateIds:[...new Set(duplicates)],banks,coverage,complete:loaded.length>=4400&&coverage.every(x=>x.count>=100)&&duplicates.length===0&&loaded.every(validQuestion)};
}
window.step24ContentAudit={inspect,validQuestion,classify,TARGET,BANKS};
})();