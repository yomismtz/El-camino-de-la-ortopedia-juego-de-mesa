/* Mejora 10 — Modo Casos Clínicos
 * Entrenador independiente: presenta un caso, permite elegir respuesta,
 * muestra grado/retroalimentación y conserva el desempeño local.
 */
(()=>{'use strict';
const KEY='elCaminoDentalClinicalCasesV1';
const state={items:[],index:0,score:0,answered:false,filter:'all',started:false};
const $=id=>document.getElementById(id);
const sources=()=>[
 ['Fundamentos de oclusión',window.FUNDAMENTOS_CASES],
 ['Steiner',window.STEINER_CASES],
 ['Fisiología y función',window.FISIOLOGIA_FUNCION_CASES],
 ['Crecimiento y desarrollo',window.CRECIMIENTO_DESARROLLO_CASES],
 ['Hábitos y parafunciones',window.HABITOS_PARAFUNCIONES_CASES],
 ['Banco clínico general',window.CLINICAL_CASES],
 ['Casos extra',window.CASES_EXTRA],
 ['Expansión 2026',window.EXPANSION_CASES_2026]
];
function all(){const out=[],seen=new Set();for(const [module,arr] of sources())for(const q of arr||[]){if(!q?.text||!Array.isArray(q.options)||q.options.length<2)continue;const id=String(q.id||q.text);if(seen.has(id))continue;seen.add(id);out.push({...q,_module:q.module||module})}return out}
function load(){try{return JSON.parse(localStorage.getItem(KEY)||'{}')}catch{return{}}}
function saveResult(item,grade){try{const d=load();d.total=(d.total||0)+1;d.correct=(d.correct||0)+(grade!=='incorrect'?1:0);d.excellent=(d.excellent||0)+(grade==='excellent'?1:0);d.byModule=d.byModule||{};const k=item.module||item._module||'General';d.byModule[k]=d.byModule[k]||{attempts:0,correct:0};d.byModule[k].attempts++;if(grade!=='incorrect')d.byModule[k].correct++;localStorage.setItem(KEY,JSON.stringify(d))}catch{}}
function gradeLabel(g){return g==='excellent'?'Excelente':g==='good'?'Buena':'Incorrecta'}
function start(){const bank=all();state.filter=$('clinicalCaseModule')?.value||'all';state.items=state.filter==='all'?bank:bank.filter(x=>String(x.module||x._module)===state.filter);if(!state.items.length)state.items=bank;state.items.sort(()=>Math.random()-.5);state.items=state.items.slice(0,20);state.index=0;state.score=0;state.answered=false;state.started=true;$('clinicalCaseSetup')?.setAttribute('hidden','');$('clinicalCasePlay')?.removeAttribute('hidden');render()}
function render(){const q=state.items[state.index];if(!q)return finish();$('clinicalCaseCounter').textContent=`Caso ${state.index+1}/${state.items.length}`;$('clinicalCaseScore').textContent=`Puntuación: ${state.score}`;$('clinicalCaseTopic').textContent=q.topic||q.module||q._module||'Caso clínico';$('clinicalCaseText').textContent=q.text;$('clinicalCaseFeedback').hidden=true;$('clinicalCaseNext').hidden=true;const box=$('clinicalCaseOptions');box.innerHTML='';q.options.forEach((opt,i)=>{const b=document.createElement('button');b.type='button';b.className='clinical-case-option';b.textContent=opt;b.onclick=()=>answer(i);box.appendChild(b)});state.answered=false}
function answer(i){if(state.answered)return;state.answered=true;const q=state.items[state.index],grade=q.grades?.[i]||((i===q.correct)?'excellent':'incorrect');const feedback=q.feedback?.[i]||((i===q.correct||grade!=='incorrect')?'Respuesta compatible con el caso.':'Revisa los datos clínicos y el razonamiento.');state.score+=grade==='excellent'?2:grade==='good'?1:0;saveResult(q,grade);document.querySelectorAll('.clinical-case-option').forEach((b,n)=>{b.disabled=true;if(n===i)b.classList.add(grade==='incorrect'?'wrong':'chosen');if(q.grades?.[n]==='excellent'||n===q.correct)b.classList.add('correct')});const f=$('clinicalCaseFeedback');f.hidden=false;f.innerHTML=`<strong>${gradeLabel(grade)}</strong><p>${feedback}</p>${q.evidence?`<small>Fuente: ${q.evidence}</small>`:''}`;$('clinicalCaseNext').hidden=false}
function next(){if(!state.answered)return;state.index++;render()}
function finish(){state.started=false;$('clinicalCasePlay')?.setAttribute('hidden','');$('clinicalCaseSetup')?.removeAttribute('hidden');$('clinicalCaseResult').innerHTML=`<strong>${state.score} puntos</strong><span>${state.items.length} casos completados · máximo ${state.items.length*2}</span>`;$('clinicalCaseResult').removeAttribute('hidden')}
function open(){const d=$('clinicalCasesDialog');if(!d)return;const bank=all();const sel=$('clinicalCaseModule');if(sel){sel.innerHTML='<option value="all">Todas las áreas</option>';[...new Set(bank.map(x=>String(x.module||x._module||'General')))].sort().forEach(m=>{const o=document.createElement('option');o.value=m;o.textContent=m;sel.appendChild(o)})}$('clinicalCaseSetup')?.removeAttribute('hidden');$('clinicalCasePlay')?.setAttribute('hidden','');$('clinicalCaseResult')?.setAttribute('hidden','');if(!d.open)d.showModal()}
function close(){const d=$('clinicalCasesDialog');if(d?.open)d.close()}
window.step20ClinicalCases={open,close,start,next,answer,all,getStats:load};
$('clinicalCasesBtn')?.addEventListener('click',open);$('closeClinicalCasesBtn')?.addEventListener('click',close);$('startClinicalCasesBtn')?.addEventListener('click',start);$('clinicalCaseNext')?.addEventListener('click',next);
})();