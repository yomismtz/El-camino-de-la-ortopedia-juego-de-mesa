(()=>{'use strict';
const AREAS=[
  {id:'ortodoncia',label:'Ortodoncia',icon:'🦷',group:'Odontología'},
  {id:'ortopedia',label:'Ortopedia dentofacial',icon:'🦴',group:'Odontología'},
  {id:'odontopediatria',label:'Odontopediatría',icon:'👶',group:'Odontología'},
  {id:'periodoncia',label:'Periodoncia',icon:'🩸',group:'Odontología'},
  {id:'endodoncia',label:'Endodoncia',icon:'🔴',group:'Odontología'},
  {id:'oclusion',label:'Oclusión',icon:'🧩',group:'Odontología'},
  {id:'cefalometria',label:'Cefalometría',icon:'📐',group:'Odontología'},
  {id:'diagnostico',label:'Diagnóstico',icon:'🧠',group:'Odontología'},
  {id:'cirugia_oral',label:'Cirugía oral',icon:'🦷',group:'Odontología'},
  {id:'maxilofacial',label:'Cirugía maxilofacial',icon:'💀',group:'Odontología'},
  {id:'preventiva',label:'Odontología preventiva',icon:'🪥',group:'Odontología'},
  {id:'restauradora',label:'Restauradora',icon:'🧱',group:'Odontología'},
  {id:'prostodoncia',label:'Prótesis / Prostodoncia',icon:'🦷',group:'Odontología'},
  {id:'radiologia',label:'Radiología',icon:'📸',group:'Odontología'},
  {id:'fisiologia',label:'Fisiología',icon:'🫁',group:'Ciencias básicas'},
  {id:'crecimiento',label:'Crecimiento y desarrollo craneofacial',icon:'🌱',group:'Ciencias básicas'},
  {id:'habitos',label:'Hábitos y parafunciones',icon:'👄',group:'Ciencias básicas'},
  {id:'nomenclatura',label:'Nomenclatura y etimología',icon:'🔤',group:'Ciencias básicas'},
  {id:'microbiologia',label:'Microbiología',icon:'🦠',group:'Ciencias básicas'},
  {id:'patologia',label:'Patología',icon:'🔬',group:'Ciencias básicas'},
  {id:'celular',label:'Biología celular e histología',icon:'🧬',group:'Ciencias básicas'},
  {id:'inmunologia',label:'Inmunología',icon:'🧪',group:'Ciencias básicas'},
  {id:'farmacologia',label:'Farmacología',icon:'💊',group:'Medicina'},
  {id:'cardiologia',label:'Cardiología',icon:'❤️',group:'Medicina'},
  {id:'hematologia',label:'Hematología',icon:'🩸',group:'Medicina'},
  {id:'medicina',label:'Medicina general',icon:'🩺',group:'Medicina'}
];
const RULES={
  ortodoncia:/ortodon|bracket|maloclusi|apiñ|diastema|mordida|clase [123i]{1,3}|resalte|sobremordida|arco dental|alineaci|retenci|distaliz|mesializ|trusi|rotaci|versi|torsion|torsión/i,
  ortopedia:/ortopedia|disyunt|expansi[oó]n|maxilar|mand[ií]bul|m[aá]scara facial|hyrax|funcional|bionator|fr[aä]nkel|activador|crecimiento mandibular/i,
  odontopediatria:/odontopedi|niñ[oa]|infantil|dentici[oó]n temporal|diente temporal|primari[oa]|erupci[oó]n|chup[oó]n|mamila|succi[oó]n/i,
  periodoncia:/periodon|gingiv|enc[ií]a|bolsa periodontal|placa subgingival|cemento radicular|ligamento periodontal/i,
  endodoncia:/endodon|pulpa|pulpit|periapical|conducto radicular|ápice|apice|necrosis pulpar/i,
  oclusion:/oclusi[oó]n|mip|intercuspid|gu[ií]a canina|gu[ií]a anterior|relaci[oó]n c[eé]ntrica|excursi[oó]n|contacto oclusal|espacio primate/i,
  cefalometria:/cefalometr|steiner|sna|snb|anb|sella|nasion|punto a|punto b|gonion|gnathion|plano mandibular|telerradiograf/i,
  diagnostico:/diagn[oó]stic|evaluaci[oó]n|hallazgo|interpret|anamnes|historia cl[ií]nica|exploraci[oó]n|pron[oó]stico|diferencial/i,
  cirugia_oral:/cirug[ií]a oral|extracci[oó]n|exodon|alveol|tercer molar|impacci[oó]n|pericoroni|quiste de erupci/i,
  maxilofacial:/maxilofacial|ortogn[aá]tica|fractura mandib|fractura maxil|le fort/i,
  preventiva:/preventiv|higiene|cepill|fluor|sellador|caries|placa dental|profilaxis/i,
  restauradora:/restaur|operatoria|resina|amalgama|cavidad|caries|dentina|esmalte/i,
  prostodoncia:/pr[oó]tesis|prostodon|edent|dentadura|corona prot[eé]sica|puente/i,
  radiologia:/radiolog|radiograf|panor[aá]mica|periapical|cefalograma|tomograf|cbct/i,
  fisiologia:/fisiolog|masticaci[oó]n|degluci[oó]n|respiraci[oó]n|fonaci[oó]n|saliva|neuromuscular|aparato estomatogn/i,
  crecimiento:/crecimiento|desarrollo craneofacial|maduraci[oó]n|pubert|cvm|v[eé]rtebra cervical|suturas|remodelaci[oó]n|desplazamiento/i,
  habitos:/h[aá]bito|parafunci|brux|onicofagia|succi[oó]n digital|interposici[oó]n lingual|morder.*labio|morder.*objeto/i,
  nomenclatura:/nomenclatura|etimolog|prefijo|sufijo|ra[ií]z greco|significa el elemento|trusi[oó]n|versi[oó]n|torsion|torsión/i,
  microbiologia:/microbi|bacter|virus|viral|hongo|f[uú]ng|biofilm|microbiota|disbiosis|streptococcus|lactobac/i,
  patologia:/patolog|lesi[oó]n|neoplas|carcinoma|sarcoma|tumor|hiperplasia|hipoplasia|displasia|metaplasia|anaplasia|necrosis|apoptosis|quiste/i,
  celular:/c[eé]lula|histol|osteoblast|osteoclast|odontoblast|ameloblast|cementoblast|fibroblast|epitel|tejido/i,
  inmunologia:/inmun|anticuerpo|ant[ií]geno|linfocito|citocina|inflamaci[oó]n/i,
  farmacologia:/farmac|medicamento|antibi[oó]tico|analg[eé]sic|anest[eé]sic|antiinflam|dosis|prescripci[oó]n/i,
  cardiologia:/cardio|coraz[oó]n|hipertensi[oó]n|presi[oó]n arterial|endocarditis|arritmia|infarto/i,
  hematologia:/hemat|sangre|anemia|leucoc|eritroc|plaqueta|coagul|hemorrag|trombo/i,
  medicina:/medicina|diabetes|renal|hep[aá]tic|pulmon|asma|embarazo|s[ií]ndrome|enfermedad sist[eé]mica/i
};
const MODULE_DEFAULTS={
  fundamentos_oclusion:['oclusion','odontopediatria'],
  steiner:['cefalometria','ortodoncia','diagnostico'],
  fisiologia_funcion:['fisiologia'],
  crecimiento_desarrollo:['crecimiento','ortopedia'],
  habitos_parafunciones:['habitos','odontopediatria'],
  nomenclatura_etimologia:['nomenclatura'],
  ortopedia_general:['ortopedia','ortodoncia']

};
function norm(v){return String(v||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase()}
function unique(arr){return [...new Set(arr)]}
function infer(item,moduleHint=''){
  const raw=[item?.specialty,item?.topic,item?.module,moduleHint,item?.text,item?.explanation,item?.sourceBase].filter(Boolean).join(' | ');
  const text=raw;
  let out=[];
  for(const [id,re] of Object.entries(RULES))if(re.test(text))out.push(id);
  const mod=item?.module||moduleHint;
  for(const id of MODULE_DEFAULTS[mod]||[])if(!out.includes(id))out.push(id);
  if(!out.length){
    if(/impresi[oó]n|alginato|silicona|yeso|modelo/i.test(text))out.push('diagnostico','prostodoncia');
    else if(/psicolog|conducta|manejo.*paciente/i.test(text))out.push('odontopediatria','medicina');
    else out.push('diagnostico');
  }
  return unique(out).slice(0,5)
}
function matches(item,selected,moduleHint=''){
  if(!Array.isArray(selected)||!selected.length)return true;
  const a=infer(item,moduleHint);return selected.some(id=>a.includes(id))
}
function count(items,selected,moduleHint=''){return (items||[]).filter(x=>matches(x,selected,moduleHint)).length}
window.AreaClassifier={areas:AREAS,infer,matches,count,norm};
})();