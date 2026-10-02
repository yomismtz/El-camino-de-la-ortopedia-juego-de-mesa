/* Paso 11 · colección completa de 48 personajes. */
(()=>{'use strict';
const KEY='elCaminoDentalSolvedAreasV1';
const items=[
['Ortodoncia','🦷','ortodoncia'],['Ortopedia maxilar','🦴','ortopedia'],['Endodoncia','🔴','endodoncia'],['Periodoncia','🩸','periodoncia'],
['Muela del Juicio','🦷','cirugia_oral'],['Implantología','🔩','implantologia'],['Odontopediatría','👶','odontopediatria'],['Prótesis fija','👑','prostodoncia'],
['Prótesis removible','🦷','prostodoncia'],['Prótesis total','😁','prostodoncia'],['Rehabilitación oral','🛠️','prostodoncia'],['Radiología oral y maxilofacial','📸','radiologia'],
['Patología bucal','🔬','patologia'],['Medicina bucal','🩺','medicina'],['Farmacología odontológica','💊','farmacologia'],['Materiales dentales','🧱','materiales'],
['Operatoria dental','🪥','restauradora'],['Cariología','🦷','preventiva'],['Anatomía dental','🫀','anatomia'],['Anestesia dental','💉','anestesia'],
['Embriología dental','🧬','embriologia'],['Oclusión','🧩','oclusion'],['ATM y trastornos','🦴','atm'],['Odontología preventiva','🪥','preventiva'],
['Salud pública','🏥','salud_publica'],['Microbiología','🦠','microbiologia'],['Infecciones odontogénicas','🦠','infecciones'],['Trauma dental','🚑','trauma'],
['Odontogeriatría','👵','odontogeriatria'],['Pacientes con necesidades especiales','🤝','necesidades_especiales'],['Odontología forense','⚖️','forense'],
['Bioética y legislación odontológica','⚖️','bioetica'],['Fotografía y documentación clínica','📷','fotografia'],['Oclusión funcional avanzada','🎯','oclusion_avanzada'],
['Genética craneofacial','🧬','genetica'],['Fisiología oral','🫁','fisiologia'],['Crecimiento y desarrollo','🌱','crecimiento'],['Hábitos y parafunciones','👄','habitos'],
['Nomenclatura y etimología','🔤','nomenclatura'],['Cefalometría','📐','cefalometria'],['Diagnóstico odontológico','🧠','diagnostico'],['Cirugía maxilofacial','💀','maxilofacial'],
['Odontología estética','✨','estetica'],['Odontología basada en evidencia','📚','evidencia']
];
function solved(){try{const x=JSON.parse(localStorage.getItem(KEY)||'[]');return new Set(Array.isArray(x)?x:[])}catch{return new Set()}}
function save(s){try{localStorage.setItem(KEY,JSON.stringify([...s]))}catch{}}
function mark(){const s=window.step7GetState?.(),d=document.getElementById('winnerDialog');if(!s||!d?.open||s.__step11Marked)return;s.__step11Marked=true;const x=solved();const map={fundamentos_oclusion:'oclusion',nomenclatura_etimologia:'nomenclatura',anatomia_general:'anatomia',anestesia_general:'anestesia',fisiologia_funcion:'fisiologia',crecimiento_desarrollo:'crecimiento',habitos_parafunciones:'habitos',steiner:'cefalometria',ortopedia_general:'ortopedia'};(s.module==='personalizado'?(s.selectedAreas||[]):[map[s.module]]).filter(Boolean).forEach(a=>x.add(a));save(x)}
function build(){if(window.__step11Built)return;window.__step11Built=true;CHARACTERS.length=1;CHARACTERS[0]={name:'Nova',role:'Estudiante de odontología',spriteX:'0%',spriteY:'0%',emoji:'👩🏻‍🎓',pawnEmoji:'👩🏻‍🎓',color:'#278BFF',anim:'hero',reaction:'¡Vamos a aprender jugando!',desc:'Personaje inicial de El Camino Dental.'};items.forEach(([name,emoji,area],i)=>CHARACTERS.push({name,role:'Especialista',spriteX:'0%',spriteY:'0%',emoji,pawnEmoji:emoji,color:'hsl('+(i*37%360)+' 65% 55%)',anim:i%3===0?'pulse':i%3===1?'hero':'jump',reaction:'¡Vamos con '+name+'!',desc:'Especialista de '+name+'.',unlockId:'area:'+area,unlockLabel:'Completar una partida de '+name}));[['Ratón de los Dientes','🐭','toothMouse','30 partidas'],['Santa Apolonia','👑🦷','apollonia','10 victorias en extremo'],['Dios de los Dientes','⚡🦷','toothGod','50 victorias en extremo']].forEach(([name,emoji,id,label])=>CHARACTERS.push({name,role:'Personaje legendario',spriteX:'0%',spriteY:'0%',emoji,pawnEmoji:emoji,color:'#d2a63a',anim:'hero',reaction:'¡La colección dental sigue creciendo!',desc:'Personaje especial de la colección.',unlockId:id,unlockLabel:label}))}
build();
const originalLocked=window.step9CharacterLocked,originalShow=window.step9ShowLocked;
window.step9CharacterLocked=i=>{const c=CHARACTERS[i];if(c?.unlockId?.startsWith('area:'))return !solved().has(c.unlockId.slice(5));return originalLocked?.(i)||false};
window.step9ShowLocked=i=>{const c=CHARACTERS[i];if(c?.unlockId?.startsWith('area:')){alert('🔒 '+c.name+'\\n\\nRequisito: '+c.unlockLabel+'\\nProgreso: '+(solved().has(c.unlockId.slice(5))?'completado':'pendiente'));return}originalShow?.(i)};
window.step11GetCharacters=()=>CHARACTERS;
setInterval(mark,700);window.addEventListener('load',build,{once:true});
})();