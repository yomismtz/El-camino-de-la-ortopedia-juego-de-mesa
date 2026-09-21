(()=>{
  'use strict';

  function fallbackBack(canGoBack){
    const custom=window.handleElCaminoBack;
    if(typeof custom==='function'){
      try{
        const handled=custom();
        if(handled!==false)return;
      }catch{}
    }

    const target=document.body?.dataset?.backTarget;
    if(target){
      location.href=target;
      return;
    }

    if(canGoBack&&history.length>1){
      history.back();
    }
  }

  async function install(){
    try{
      const App=window.Capacitor?.Plugins?.App;
      if(!App?.addListener)return;
      await App.addListener('backButton',({canGoBack}={})=>fallbackBack(!!canGoBack));
    }catch{}
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});
  else install();
})();