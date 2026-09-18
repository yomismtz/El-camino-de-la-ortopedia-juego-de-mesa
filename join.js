const API=(window.ORTOPEDIA_API_BASE||'').replace(/\/$/,'');
let activity=null,run=null;
const $=id=>document.getElementById(id);
function normalize(v){return String(v||'').toUpperCase().replace(/[^A-Z0-9]/g,'').slice(0,6)}
function show(id){['joinView','activityView','quizView','resultView'].forEach(x=>$(x).hidden=x!==id)}
async function joinCode(codeValue){
  const code=normalize(codeValue||$('codeInput').value);
  $('codeInput').value=code;
  $('joinStatus').textContent='';
  if(code.length!==6)return $('joinStatus').textContent='Escribe un código de 6 caracteres.';
  if(!API)return $('joinStatus').textContent='El servicio online todavía no está configurado en esta versión.';
  $('joinBtn').disabled=true;$('joinStatus').textContent='Buscando actividad…';
  try{
    const r=await fetch(API+'/api/sessions/'+encodeURIComponent(code));
    const data=await r.json().catch(()=>({}));
    if(!r.ok)throw new Error(data.error||'No se pudo abrir la actividad.');
    activity=data;
    $('activityTitle').textContent=activity.title;
    $('activityInstructions').textContent=activity.instructions||'Responde las preguntas y revisa tu resultado al final.';
    $('activityCode').textContent=activity.code;
    history.replaceState(null,'','?code='+activity.code);
    show('activityView');
  }catch(e){$('joinStatus').textContent=e.message||'No se pudo conectar.'}
  finally{$('joinBtn').disabled=false}
}
function start(){
  const qs=(activity?.questions||[]).map(q=>({...q})).sort(()=>Math.random()-.5);
  if(!qs.length)return;
  run={questions:qs,index:0,score:0,answered:false,name:$('studentName').value.trim()||'Estudiante'};
  show('quizView');renderQuestion();
}
function renderQuestion(){
  const q=run.questions[run.index];
  $('counter').textContent='Pregunta '+(run.index+1)+' de '+run.questions.length;
  $('score').textContent='Aciertos: '+run.score;
  $('bar').style.width=((run.index)/run.questions.length*100)+'%';
  $('questionText').textContent=q.text;
  $('feedback').hidden=true;$('nextBtn').hidden=true;
  run.answered=false;
  const host=$('options');host.innerHTML='';
  q.options.forEach((opt,i)=>{
    const b=document.createElement('button');b.className='option';b.textContent=String.fromCharCode(65+i)+'. '+opt;
    b.onclick=()=>answer(i,b);host.appendChild(b);
  });
}
function answer(i,btn){
  if(run.answered)return;run.answered=true;
  const q=run.questions[run.index],all=[...document.querySelectorAll('.option')];
  all.forEach((b,j)=>{b.disabled=true;if(j===q.correct)b.classList.add('correct')});
  if(i===q.correct)run.score++;else btn.classList.add('wrong');
  $('score').textContent='Aciertos: '+run.score;
  $('feedback').hidden=false;
  $('feedback').innerHTML='<b>'+(i===q.correct?'✅ Correcta':'❌ Incorrecta')+'</b><br>'+escapeHtml(q.explanation||('Respuesta correcta: '+q.options[q.correct]));
  $('nextBtn').hidden=false;
}
function next(){
  run.index++;
  if(run.index>=run.questions.length)return finish();
  renderQuestion();
}
function finish(){
  $('bar').style.width='100%';
  const pct=Math.round(run.score/run.questions.length*100);
  $('resultText').textContent=run.name+': '+run.score+' de '+run.questions.length+' respuestas correctas ('+pct+'%).';
  show('resultView');
}
function escapeHtml(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
$('codeInput').oninput=e=>e.target.value=normalize(e.target.value);
$('codeInput').onkeydown=e=>{if(e.key==='Enter')joinCode()};
$('joinBtn').onclick=()=>joinCode();
$('startBtn').onclick=start;
$('nextBtn').onclick=next;
$('retryBtn').onclick=()=>{show('activityView')};
const qs=new URLSearchParams(location.search);if(qs.get('code')){show('joinView');joinCode(qs.get('code'))}
