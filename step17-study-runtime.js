/* Paso 17 · Modo Estudio y repaso de errores. */
(()=>{'use strict';
const ERRORS_KEY='elCaminoDentalStudyErrorsV1';
let studyItems=[],studyIndex=0,studySelected=null,studyErrorsOnly=false;
const $=id=>document.getElementById(id);
function loadErrors(){try{const x=JSON.parse(localStorage.getItem(ERRORS_KEY)||'[]');return Array.isArray(x)?x:[]}catch{return[]}}
function saveErrors(x){localStorage.setItem(ERRORS_KEY,JSON.stringify(x.slice(-200)))}
function bankFor(module){
 const map={ortodoncia:window.ORTODONCIA_QUESTIONS,endodoncia:window.ENDODONCIA_QUESTIONS,anatomia_general:window.ANATOMIA_QUESTIONS,anestesia_general:window.ANESTESIA_DENTAL_QUESTIONS};
 if(module==='all')return [
  ...(window.QUESTIONS||[]),...(window.PRIMER_PARCIAL_QUESTIONS||[]),...(window.NOMENCLATURA_ETIMOLOGIA_QUESTIONS||[]),
  ...(window.ANATOMIA_QUESTIONS||[]),...(window.ANESTESIA_DENTAL_QUESTIONS||[]),...(window.STEINER_QUESTIONS||[]),
  ...(window.FISIOLOGIA_FUNCION_QUESTIONS||[]),...(window.CRECIMIENTO_DESARROLLO_QUESTIONS||[]),
  ...(window.HABITOS_PARAFUNCIONES_QUESTIONS||[]),...(window.ENDODONCIA_QUESTIONS||[]),...(window.ORTODONCIA_QUESTIONS||[])
 ].filter(window.step16ValidateQuestion||(()=>true));
 return (map[module]||[]).filter(window.step16ValidateQuestion||(()=>true));
}
function buildStudy(){
 const module=$('studyModule')?.value||'all',all=bankFor(module),errors=new Set(loadErrors().map(x=>x.id));
 studyItems=studyErrorsOnly?all.filter(q=>errors.has(String(q.id))):all;
 studyItems=[...studyItems].sort(()=>Math.random()-.5);studyIndex=0;studySelected=null;render();
}
function render(){
 const q=studyItems[studyIndex]; if(!q){$('studyQuestion').textContent=studyErrorsOnly?'No tienes errores guardados en este módulo.':'No hay preguntas disponibles.';$('studyOptions').innerHTML='';$('studyFeedback').hidden=true;return}
 $('studyProgress').textContent=`Pregunta ${studyIndex+1} de ${studyItems.length} · ${q.specialty||q.module||'General'}`;
 $('studyQuestion').textContent=q.text;$('studyFeedback').hidden=true;$('studyNextBtn').disabled=true;studySelected=null;
 $('studyOptions').innerHTML='';
 q.options.forEach((opt,i)=>{const b=document.createElement('button');b.type='button';b.className='option';b.innerHTML=`<span>${String.fromCharCode(65+i)}</span><b>${esc(opt)}</b>`;b.onclick=()=>answer(i);$('studyOptions').appendChild(b)});
}
function esc(v){return String(v).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
function answer(i){
 const q=studyItems[studyIndex];if(!q||studySelected!==null)return;studySelected=i;
 const ok=window.step5AnswerMatches?window.step5AnswerMatches(q,i):i===q.correct;
 document.querySelectorAll('#studyOptions .option').forEach((b,j)=>{b.disabled=true;if(j===q.correct)b.classList.add('correct');if(j===i&&!ok)b.classList.add('wrong')});
 if(!ok){const e=loadErrors();e.push({id:String(q.id),module:q.module||'',specialty:q.specialty||'',text:q.text,at:new Date().toISOString()});saveErrors([...new Map(e.map(x=>[x.id,x])).values()])}
 const correct=esc(q.options[q.correct]||'');const why=esc(q.explanation||'Revisa el concepto y vuelve a intentarlo.');
 $('studyFeedback').innerHTML=`<strong>${ok?'✅ Correcta':'❌ Incorrecta'}</strong><div class="feedback-learning"><p class="feedback-correct"><b>Respuesta correcta:</b> ${correct}</p><p class="feedback-why"><b>Por qué:</b> ${why}</p>${!ok?'<p><b>📌 Guardada en Mis errores.</b></p>':''}</div>`;
 $('studyFeedback').hidden=false;$('studyNextBtn').disabled=false;
}
function next(){if(studySelected===null)return;if(studyIndex<studyItems.length-1){studyIndex++;render()}else{buildStudy()}}
function open(){studyErrorsOnly=false;buildStudy();$('studyDialog').showModal()}
function close(){$('studyDialog')?.close()}
$('studyBtn')?.addEventListener('click',open);$('closeStudyBtn')?.addEventListener('click',close);
$('studyNextBtn')?.addEventListener('click',next);$('studyRepeatBtn')?.addEventListener('click',()=>render());
$('studyModule')?.addEventListener('change',()=>{studyErrorsOnly=false;buildStudy()});
$('studyErrorsBtn')?.addEventListener('click',()=>{studyErrorsOnly=!studyErrorsOnly;buildStudy();$('studyErrorsBtn').textContent=studyErrorsOnly?'📚 Todas':'❌ Mis errores'});
window.step17Study={open,close,buildStudy,getErrors:loadErrors,clearErrors:()=>localStorage.removeItem(ERRORS_KEY)};
})();