(()=>{
  'use strict';
  const KEY='elCaminoDentalAccessibilityV1';
  const defaults={font:'normal',contrast:false,motion:false,largeControls:false};
  const read=()=>{try{return {...defaults,...JSON.parse(localStorage.getItem(KEY)||'{}')}}catch{return {...defaults}}};
  let settings=read();
  function save(){try{localStorage.setItem(KEY,JSON.stringify(settings))}catch{}}
  function apply(){
    const root=document.documentElement;
    root.classList.toggle('a11y-font-large',settings.font==='large');
    root.classList.toggle('a11y-font-xl',settings.font==='xl');
    root.classList.toggle('a11y-high-contrast',!!settings.contrast);
    root.classList.toggle('a11y-reduce-motion',!!settings.motion);
    root.classList.toggle('a11y-large-controls',!!settings.largeControls);
  }
  apply();

  function build(){
    if(document.querySelector('.a11y-launcher'))return;
    const en=window.I18N?.lang==='en';
    const t=en?{
      title:'Accessibility',font:'Text size',normal:'Normal',large:'Large',xl:'Extra large',
      contrast:'High contrast',motion:'Reduce motion',controls:'Larger controls',
      reset:'Reset',close:'Close',open:'Accessibility options'
    }:{
      title:'Accesibilidad',font:'Tamaño de texto',normal:'Normal',large:'Grande',xl:'Extra grande',
      contrast:'Alto contraste',motion:'Reducir animaciones',controls:'Controles más grandes',
      reset:'Restablecer',close:'Cerrar',open:'Opciones de accesibilidad'
    };
    const btn=document.createElement('button');
    btn.type='button';btn.className='a11y-launcher';btn.setAttribute('aria-label',t.open);btn.setAttribute('aria-expanded','false');
    btn.innerHTML='♿<span>'+t.title+'</span>';
    const panel=document.createElement('section');
    panel.className='a11y-panel';panel.hidden=true;panel.setAttribute('role','dialog');panel.setAttribute('aria-modal','false');panel.setAttribute('aria-label',t.title);
    panel.innerHTML='<div class="a11y-head"><strong>♿ '+t.title+'</strong><button type="button" class="a11y-close" aria-label="'+t.close+'">×</button></div>'+
      '<label>'+t.font+'<select class="a11y-font"><option value="normal">'+t.normal+'</option><option value="large">'+t.large+'</option><option value="xl">'+t.xl+'</option></select></label>'+
      '<label class="a11y-toggle"><input type="checkbox" class="a11y-contrast"><span>'+t.contrast+'</span></label>'+
      '<label class="a11y-toggle"><input type="checkbox" class="a11y-motion"><span>'+t.motion+'</span></label>'+
      '<label class="a11y-toggle"><input type="checkbox" class="a11y-controls"><span>'+t.controls+'</span></label>'+
      '<button type="button" class="a11y-reset">'+t.reset+'</button>';
    document.body.append(btn,panel);
    const font=panel.querySelector('.a11y-font'),contrast=panel.querySelector('.a11y-contrast'),motion=panel.querySelector('.a11y-motion'),controls=panel.querySelector('.a11y-controls');
    function sync(){font.value=settings.font;contrast.checked=!!settings.contrast;motion.checked=!!settings.motion;controls.checked=!!settings.largeControls}
    function commit(){settings={font:font.value,contrast:contrast.checked,motion:motion.checked,largeControls:controls.checked};save();apply()}
    function toggle(force){panel.hidden=force===undefined?!panel.hidden:!force;btn.setAttribute('aria-expanded',String(!panel.hidden));if(!panel.hidden)font.focus()}
    sync();
    btn.addEventListener('click',()=>toggle());
    panel.querySelector('.a11y-close').addEventListener('click',()=>toggle(false));
    font.addEventListener('change',commit);contrast.addEventListener('change',commit);motion.addEventListener('change',commit);controls.addEventListener('change',commit);
    panel.querySelector('.a11y-reset').addEventListener('click',()=>{settings={...defaults};save();apply();sync()});
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!panel.hidden)toggle(false)});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',build);else build();
  window.AccessibilitySettings={get:()=>({...settings}),apply};
})();