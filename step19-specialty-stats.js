/* Mejora 8 · estadísticas por especialidad. */
(()=>{'use strict';
const KEY='elCaminoDentalProgressV2';
const LABELS={
 ortodoncia:'Ortodoncia',endodoncia:'Endodoncia',anatomia_general:'Anatomía dental',
 anestesia_general:'Anestesia dental',fundamentos_oclusion:'Oclusión',
 steiner:'Análisis de Steiner',fisiologia_funcion:'Fisiología y función',
 crecimiento_desarrollo:'Crecimiento y desarrollo',habitos_parafunciones:'Hábitos y parafunciones',
 nomenclatura_etimologia:'Nomenclatura y etimología',ortopedia_general:'Ortopedia maxilar',
 personalizado:'Juego personalizado',general:'General'
};
function label(id){return LABELS[id]||String(id||'General').replace(/_/g,' ').replace(/\b\w/g,m=>m.toUpperCase())}
function read(){try{const p=JSON.parse(localStorage.getItem(KEY)||'null')||{};if(!p.specialties||typeof p.specialties!=='object')p.specialties={};return p}catch{return {specialties:{}}}}
function save(p){try{localStorage.setItem(KEY,JSON.stringify(p))}catch{}}
function ensureSpecialty(p,id){
 const key=String(id||'general');
 const s=p.specialties[key]||(p.specialties[key]={attempts:0,correct:0,wrong:0,excellent:0,good:0});
 return s;
}
function record(id,outcome){
 const p=read(),s=ensureSpecialty(p,id),ok=['correct','excellent','good'].includes(outcome);
 s.attempts++;if(ok)s.correct++;else s.wrong++;if(outcome==='excellent')s.excellent++;if(outcome==='good')s.good++;save(p);return s;
}
function summary(){
 const p=read();
 return Object.entries(p.specialties||{}).map(([id,s])=>({id,label:label(id),...s,accuracy:s.attempts?Math.round(s.correct*100/s.attempts):0}))
   .filter(s=>s.attempts>0).sort((a,b)=>b.attempts-a.attempts||b.accuracy-a.accuracy);
}
function render(){
 const host=document.getElementById('profileSpecialties');if(!host)return;
 const rows=summary();
 if(!rows.length){host.innerHTML='<p class="profile-specialties-empty">Aún no hay datos por especialidad. Juega una partida para comenzar el registro.</p>';return}
 host.innerHTML=rows.map(s=>'<div class="profile-specialty-row"><div class="profile-specialty-name"><b>'+esc(s.label)+'</b><small>'+s.correct+'/'+s.attempts+' correctas · '+s.wrong+' errores</small></div><div class="profile-specialty-bar"><i style="width:'+s.accuracy+'%"></i></div><strong>'+s.accuracy+'%</strong></div>').join('');
}
function esc(v){return String(v).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
window.step19SpecialtyStats={read,save,record,summary,render,label};
document.addEventListener('DOMContentLoaded',()=>{const d=document.getElementById('profileDialog');if(d)new MutationObserver(()=>{if(d.open)render()}).observe(d,{attributes:true,attributeFilter:['open']});});
})();