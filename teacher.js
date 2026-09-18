const STORAGE_KEY='ortopediaTeacherActivitiesV1';
const ACTIVE_QUESTION_KEY='ortopediaActiveTeacherQuestionsV1';
const ACTIVE_CASE_KEY='ortopediaActiveTeacherCasesV1';
const MAX_QUESTIONS=50,MAX_CASES=20;
let activities=[],selectedId=null,editingQuestionId=null,editingCaseId=null,runState=null,currentTab='questions';
const $=id=>document.getElementById(id);
function uid(prefix='id'){return prefix+'-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,8)}
function esc(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function normalizeActivity(a){
  return{
    id:a?.id||uid('act'),
    title:String(a?.title||'Actividad sin título').slice(0,80),
    instructions:String(a?.instructions||'').slice(0,300),
    enabled:!!a?.enabled,
    questions:(Array.isArray(a?.questions)?a.questions:[]).slice(0,MAX_QUESTIONS).map(q=>({
      id:q.id||uid('q'),text:String(q.text||'').slice(0,500),
      options:(q.options||[]).map(x=>String(x).slice(0,220)).slice(0,4),
      correct:Number(q.correct)||0,deck:[1,2,3].includes(Number(q.deck))?Number(q.deck):1,
      explanation:String(q.explanation||'').slice(0,500)
    })).filter(q=>q.text&&q.options.length>=2),
    cases:(Array.isArray(a?.cases)?a.cases:[]).slice(0,MAX_CASES).map(c=>({
      id:c.id||uid('c'),text:String(c.text||'').slice(0,900),
      options:(c.options||[]).map(x=>String(x).slice(0,260)).slice(0,4),
      correct:Number(c.correct)||0,deck:[1,2,3,4,5].includes(Number(c.deck))?Number(c.deck):1,
      explanation:String(c.explanation||'').slice(0,700)
    })).filter(c=>c.text&&c.options.length>=2)
  }
}
function load(){
  try{const raw=JSON.parse(localStorage.getItem(STORAGE_KEY)||'[]');activities=Array.isArray(raw)?raw.map(normalizeActivity):[]}catch{activities=[]}
  selectedId=activities[0]?.id||null;save();render()
}
function save(){localStorage.setItem(STORAGE_KEY,JSON.stringify(activities));syncActiveBanks();renderStats()}
function syncActiveBanks(){
  const qs=[],cs=[];
  for(const a of activities.filter(x=>x.enabled)){
    for(const q of a.questions||[])qs.push({id:'teacher-'+q.id,deck:Number(q.deck)||1,origin:'teacher',activityId:a.id,activityTitle:a.title,text:q.text,options:q.options,correct:q.correct,explanation:q.explanation||''});
    for(const c of a.cases||[]){
      const feedback=c.options.map((_,i)=>c.explanation||(i===c.correct?'Respuesta correcta.':'Revisa el razonamiento clínico.'));
      cs.push({id:'teacher-case-'+c.id,deck:Number(c.deck)||1,origin:'teacher',activityId:a.id,activityTitle:a.title,text:c.text,options:c.options,grades:c.options.map((_,i)=>i===c.correct?'excellent':'incorrect'),feedback});
    }
  }
  localStorage.setItem(ACTIVE_QUESTION_KEY,JSON.stringify(qs));
  localStorage.setItem(ACTIVE_CASE_KEY,JSON.stringify(cs))
}
function current(){return activities.find(a=>a.id===selectedId)||null}
function render(){renderStats();renderActivities();renderEditor();setTab(currentTab)}
function renderStats(){
  const qs=activities.reduce((n,a)=>n+(a.questions?.length||0),0),cs=activities.reduce((n,a)=>n+(a.cases?.length||0),0);
  $('activityCount').textContent=activities.length;$('questionCount').textContent=qs;$('caseCount').textContent=cs;
  $('activeCount').textContent=activities.filter(a=>a.enabled).reduce((n,a)=>n+(a.questions?.length||0)+(a.cases?.length||0),0)
}
function renderActivities(){
  const host=$('activityList');host.innerHTML='';
  if(!activities.length){host.innerHTML='<p class="hint">Todavía no hay actividades.</p>';return}
  activities.forEach(a=>{const el=document.createElement('div');el.className='activity-item'+(a.id===selectedId?' active':'');el.innerHTML='<b>'+esc(a.title||'Actividad sin título')+'</b><small>❓ '+(a.questions?.length||0)+' · 📋 '+(a.cases?.length||0)+' · '+(a.enabled?'Activa en tablero':'Solo aula')+'</small>';el.onclick=()=>{selectedId=a.id;editingQuestionId=null;editingCaseId=null;render()};host.appendChild(el)})
}
function renderEditor(){
  const a=current();$('emptyState').hidden=!!a;$('editorState').hidden=!a;if(!a)return;
  $('activityTitle').value=a.title||'';$('activityInstructions').value=a.instructions||'';$('activityEnabled').checked=!!a.enabled;
  updateCapacity(a);renderQuestionList(a);renderCaseList(a)
}
function updateCapacity(a){
  const q=a.questions?.length||0,c=a.cases?.length||0;
  $('questionCapacity').textContent=q+' / '+MAX_QUESTIONS;$('caseCapacity').textContent=c+' / '+MAX_CASES;
  $('questionTabCount').textContent=q;$('caseTabCount').textContent=c;
  $('questionCapacityBar').style.width=(q/MAX_QUESTIONS*100)+'%';$('caseCapacityBar').style.width=(c/MAX_CASES*100)+'%'
}
function newActivity(){
  const a=normalizeActivity({id:uid('act'),title:'Nueva actividad',instructions:'',enabled:false,questions:[],cases:[]});
  activities.unshift(a);selectedId=a.id;editingQuestionId=null;editingCaseId=null;save();render();setTimeout(()=>$('activityTitle').select(),0)
}
function updateActivity(){
  const a=current();if(!a)return;a.title=$('activityTitle').value.trim()||'Actividad sin título';a.instructions=$('activityInstructions').value.trim();a.enabled=$('activityEnabled').checked;save();renderActivities()
}
function deleteActivity(){
  const a=current();if(!a)return;if(!confirm('¿Eliminar esta actividad, sus preguntas y sus casos clínicos?'))return;
  activities=activities.filter(x=>x.id!==a.id);selectedId=activities[0]?.id||null;editingQuestionId=null;editingCaseId=null;save();render()
}
function setTab(tab){
  currentTab=tab==='cases'?'cases':'questions';
  document.querySelectorAll('.editor-tab').forEach(b=>b.classList.toggle('active',b.dataset.tab===currentTab));
  $('questionsPanel').hidden=currentTab!=='questions';$('casesPanel').hidden=currentTab!=='cases'
}
function readOptions(selector){
  const opts=[...document.querySelectorAll(selector)].map(x=>x.value.trim());
  while(opts.length&&!opts[opts.length-1])opts.pop();return opts
}
function validateOptions(opts,correct){
  if(opts.length<2||opts.some(x=>!x)){alert('Completa al menos dos opciones consecutivas.');return false}
  if(correct>=opts.length){alert('La respuesta correcta debe corresponder a una opción escrita.');return false}
  return true
}
function readQuestionForm(){
  const text=$('questionTextInput').value.trim(),opts=readOptions('.question-option-input'),correct=Number($('questionCorrectOption').value);
  if(!text)return alert('Escribe la pregunta.'),null;if(!validateOptions(opts,correct))return null;
  return{id:editingQuestionId||uid('q'),text,options:opts,correct,deck:Number($('questionDeck').value)||1,explanation:$('questionExplanation').value.trim()}
}
function saveQuestion(){
  const a=current();if(!a)return;
  if(!editingQuestionId&&(a.questions?.length||0)>=MAX_QUESTIONS)return alert('Esta actividad ya tiene el máximo de 50 preguntas.');
  const q=readQuestionForm();if(!q)return;
  if(editingQuestionId){const i=a.questions.findIndex(x=>x.id===editingQuestionId);if(i>=0)a.questions[i]=q}else a.questions.push(q);
  save();clearQuestionForm();renderEditor()
}
function clearQuestionForm(){
  editingQuestionId=null;$('questionTextInput').value='';document.querySelectorAll('.question-option-input').forEach(x=>x.value='');
  $('questionCorrectOption').value='0';$('questionDeck').value='1';$('questionExplanation').value='';
  $('saveQuestionBtn').textContent='Agregar pregunta';$('cancelQuestionEditBtn').hidden=true;$('questionEditorTitle').textContent='Agregar pregunta'
}
function editQuestion(id){
  const q=current()?.questions.find(x=>x.id===id);if(!q)return;editingQuestionId=id;setTab('questions');
  $('questionTextInput').value=q.text;document.querySelectorAll('.question-option-input').forEach(x=>x.value='');
  q.options.forEach((v,i)=>{const el=document.querySelector('.question-option-input[data-option="'+i+'"]');if(el)el.value=v});
  $('questionCorrectOption').value=String(q.correct);$('questionDeck').value=String(q.deck||1);$('questionExplanation').value=q.explanation||'';
  $('saveQuestionBtn').textContent='Guardar cambios';$('cancelQuestionEditBtn').hidden=false;$('questionEditorTitle').textContent='Editar pregunta';$('questionTextInput').focus()
}
function deleteQuestion(id){
  const a=current();if(!a)return;if(!confirm('¿Eliminar esta pregunta?'))return;a.questions=a.questions.filter(x=>x.id!==id);if(editingQuestionId===id)clearQuestionForm();save();renderEditor()
}
function renderQuestionList(a){
  const host=$('questionList');host.innerHTML='';
  (a.questions||[]).forEach((q,i)=>{const el=document.createElement('article');el.className='question-item';el.innerHTML='<header><h3>❓ '+(i+1)+'. '+esc(q.text)+'</h3><span class="pill">Sobre '+(q.deck||1)+'</span></header><ol type="A">'+q.options.map((o,j)=>'<li class="'+(j===q.correct?'correct':'')+'">'+esc(o)+(j===q.correct?' ✓':'')+'</li>').join('')+'</ol>'+(q.explanation?'<p class="hint"><b>Retroalimentación:</b> '+esc(q.explanation)+'</p>':'')+'<footer><button class="small-btn edit">Editar</button><button class="small-btn delete">Eliminar</button></footer>';el.querySelector('.edit').onclick=()=>editQuestion(q.id);el.querySelector('.delete').onclick=()=>deleteQuestion(q.id);host.appendChild(el)});
  if(!(a.questions||[]).length)host.innerHTML='<p class="hint">Aún no hay preguntas. Puedes agregar hasta 50.</p>'
}
function readCaseForm(){
  const text=$('caseTextInput').value.trim(),opts=readOptions('.case-option-input'),correct=Number($('caseCorrectOption').value);
  if(!text)return alert('Describe el caso clínico.'),null;if(!validateOptions(opts,correct))return null;
  return{id:editingCaseId||uid('c'),text,options:opts,correct,deck:Number($('caseDeck').value)||1,explanation:$('caseExplanation').value.trim()}
}
function saveCase(){
  const a=current();if(!a)return;
  if(!editingCaseId&&(a.cases?.length||0)>=MAX_CASES)return alert('Esta actividad ya tiene el máximo de 20 casos clínicos.');
  const c=readCaseForm();if(!c)return;
  if(editingCaseId){const i=a.cases.findIndex(x=>x.id===editingCaseId);if(i>=0)a.cases[i]=c}else a.cases.push(c);
  save();clearCaseForm();renderEditor()
}
function clearCaseForm(){
  editingCaseId=null;$('caseTextInput').value='';document.querySelectorAll('.case-option-input').forEach(x=>x.value='');
  $('caseCorrectOption').value='0';$('caseDeck').value='1';$('caseExplanation').value='';
  $('saveCaseBtn').textContent='Agregar caso clínico';$('cancelCaseEditBtn').hidden=true;$('caseEditorTitle').textContent='Agregar caso clínico'
}
function editCase(id){
  const c=current()?.cases.find(x=>x.id===id);if(!c)return;editingCaseId=id;setTab('cases');
  $('caseTextInput').value=c.text;document.querySelectorAll('.case-option-input').forEach(x=>x.value='');
  c.options.forEach((v,i)=>{const el=document.querySelector('.case-option-input[data-case-option="'+i+'"]');if(el)el.value=v});
  $('caseCorrectOption').value=String(c.correct);$('caseDeck').value=String(c.deck||1);$('caseExplanation').value=c.explanation||'';
  $('saveCaseBtn').textContent='Guardar cambios';$('cancelCaseEditBtn').hidden=false;$('caseEditorTitle').textContent='Editar caso clínico';$('caseTextInput').focus()
}
function deleteCase(id){
  const a=current();if(!a)return;if(!confirm('¿Eliminar este caso clínico?'))return;a.cases=a.cases.filter(x=>x.id!==id);if(editingCaseId===id)clearCaseForm();save();renderEditor()
}
function renderCaseList(a){
  const host=$('caseList');host.innerHTML='';
  (a.cases||[]).forEach((c,i)=>{const el=document.createElement('article');el.className='question-item case-item';el.innerHTML='<header><h3>📋 Caso '+(i+1)+'. '+esc(c.text)+'</h3><span class="pill case-pill">Caso '+(c.deck||1)+'</span></header><ol type="A">'+c.options.map((o,j)=>'<li class="'+(j===c.correct?'correct':'')+'">'+esc(o)+(j===c.correct?' ✓':'')+'</li>').join('')+'</ol>'+(c.explanation?'<p class="hint"><b>Retroalimentación clínica:</b> '+esc(c.explanation)+'</p>':'')+'<footer><button class="small-btn edit">Editar</button><button class="small-btn delete">Eliminar</button></footer>';el.querySelector('.edit').onclick=()=>editCase(c.id);el.querySelector('.delete').onclick=()=>deleteCase(c.id);host.appendChild(el)});
  if(!(a.cases||[]).length)host.innerHTML='<p class="hint">Aún no hay casos clínicos. Puedes agregar hasta 20.</p>'
}
function exportData(){
  if(!activities.length)return alert('No hay actividades para exportar.');
  const blob=new Blob([JSON.stringify({version:2,exportedAt:new Date().toISOString(),activities},null,2)],{type:'application/json'});
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='actividades-ortopedia-dental.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)
}
async function importData(file){
  try{
    const data=JSON.parse(await file.text()),incoming=Array.isArray(data)?data:data.activities;if(!Array.isArray(incoming))throw new Error();
    const clean=incoming.map(x=>normalizeActivity({...x,id:uid('act'),enabled:false,questions:(x.questions||[]).map(q=>({...q,id:uid('q')})),cases:(x.cases||[]).map(c=>({...c,id:uid('c')}))}));
    activities=[...clean,...activities];selectedId=clean[0]?.id||selectedId;save();render();alert('Actividades importadas correctamente.')
  }catch{alert('No se pudo importar el archivo. Verifica que sea un JSON exportado desde el Modo Docente.')}finally{$('importInput').value=''}
}
function openRun(){
  const a=current(),q=a?.questions?.length||0,c=a?.cases?.length||0;if(!a||q+c===0)return alert('Agrega al menos una pregunta o un caso clínico antes de iniciar.');
  $('runTitle').textContent=a.title;$('runInstructions').textContent=a.instructions||'Responde los reactivos y revisa la explicación después de cada respuesta.';
  $('runQuestionCount').textContent=q;$('runCaseCount').textContent=c;$('includeQuestions').checked=q>0;$('includeQuestions').disabled=q===0;$('includeCases').checked=c>0;$('includeCases').disabled=c===0;
  $('runIntro').hidden=false;$('runQuestion').hidden=true;$('runResult').hidden=true;$('runDialog').showModal()
}
function startRun(){
  const a=current(),items=[];
  if($('includeQuestions').checked)items.push(...a.questions.map(q=>({...q,kind:'question'})));
  if($('includeCases').checked)items.push(...a.cases.map(c=>({...c,kind:'case'})));
  if(!items.length)return alert('Selecciona al menos un tipo de reactivo.');
  if($('shuffleQuestions').checked)items.sort(()=>Math.random()-.5);
  runState={items,index:0,score:0,qCorrect:0,cCorrect:0,qTotal:items.filter(x=>x.kind==='question').length,cTotal:items.filter(x=>x.kind==='case').length,answered:false,student:$('studentName').value.trim()||'Grupo'};
  $('runIntro').hidden=true;$('runQuestion').hidden=false;showRunItem()
}
function showRunItem(){
  const s=runState,item=s.items[s.index],isCase=item.kind==='case';
  $('runType').textContent=isCase?'📋 Caso clínico':'❓ Pregunta';$('runType').classList.toggle('case-type',isCase);
  $('runCounter').textContent='Reactivo '+(s.index+1)+' de '+s.items.length;$('runScore').textContent='Aciertos: '+s.score;
  $('runProgressBar').style.width=(s.index/s.items.length*100)+'%';$('runQuestionText').textContent=item.text;$('runFeedback').hidden=true;$('nextRunBtn').hidden=true;s.answered=false;
  const host=$('runOptions');host.innerHTML='';item.options.forEach((o,i)=>{const b=document.createElement('button');b.className='run-option';b.textContent=String.fromCharCode(65+i)+'. '+o;b.onclick=()=>answerRun(i,b);host.appendChild(b)})
}
function answerRun(i,btn){
  if(runState.answered)return;runState.answered=true;const item=runState.items[runState.index],all=[...document.querySelectorAll('.run-option')];
  all.forEach((b,j)=>{b.disabled=true;if(j===item.correct)b.classList.add('correct')});
  const ok=i===item.correct;if(ok){runState.score++;if(item.kind==='case')runState.cCorrect++;else runState.qCorrect++}else btn.classList.add('wrong');
  $('runFeedback').hidden=false;$('runFeedback').innerHTML='<b>'+(ok?'✅ Correcta':'❌ Incorrecta')+'</b><br>'+esc(item.explanation||('Respuesta correcta: '+item.options[item.correct]));
  $('runScore').textContent='Aciertos: '+runState.score;$('nextRunBtn').hidden=false
}
function nextRun(){runState.index++;if(runState.index>=runState.items.length)return finishRun();showRunItem()}
function finishRun(){
  $('runQuestion').hidden=true;$('runResult').hidden=false;$('runProgressBar').style.width='100%';
  const total=runState.items.length,pct=Math.round(runState.score/total*100);$('resultText').textContent=runState.student+': '+runState.score+' de '+total+' respuestas correctas ('+pct+'%).';
  $('resultBreakdown').innerHTML=(runState.qTotal?'<span>❓ Preguntas: <b>'+runState.qCorrect+'/'+runState.qTotal+'</b></span>':'')+(runState.cTotal?'<span>📋 Casos: <b>'+runState.cCorrect+'/'+runState.cTotal+'</b></span>':'')
}
async function toggleFullscreen(){
  try{if(!document.fullscreenElement)await $('runDialog').requestFullscreen();else await document.exitFullscreen()}catch{}
}
document.querySelectorAll('.editor-tab').forEach(b=>b.onclick=()=>setTab(b.dataset.tab));
$('newActivityBtn').onclick=newActivity;$('emptyNewBtn').onclick=newActivity;$('activityTitle').oninput=updateActivity;$('activityInstructions').oninput=updateActivity;$('activityEnabled').onchange=updateActivity;$('deleteActivityBtn').onclick=deleteActivity;
$('saveQuestionBtn').onclick=saveQuestion;$('cancelQuestionEditBtn').onclick=clearQuestionForm;$('saveCaseBtn').onclick=saveCase;$('cancelCaseEditBtn').onclick=clearCaseForm;
$('exportBtn').onclick=exportData;$('importInput').onchange=e=>e.target.files[0]&&importData(e.target.files[0]);$('runActivityBtn').onclick=openRun;$('closeRunBtn').onclick=()=>$('runDialog').close();$('fullscreenBtn').onclick=toggleFullscreen;$('startRunBtn').onclick=startRun;$('nextRunBtn').onclick=nextRun;$('restartRunBtn').onclick=()=>{$('runResult').hidden=true;$('runIntro').hidden=false};
load();