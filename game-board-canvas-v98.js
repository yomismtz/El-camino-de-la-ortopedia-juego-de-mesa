(() => {
  'use strict';

  function initDentalBoardCanvas(){
    const board=document.getElementById('board');
    if(!board || board.dataset.canvasV98==='1') return;
    board.dataset.canvasV98='1';

    const canvas=document.createElement('canvas');
    canvas.className='dental-board-canvas';
    canvas.setAttribute('aria-hidden','true');
    board.prepend(canvas);
    const ctx=canvas.getContext('2d',{alpha:true});
    if(!ctx) return;

    const COLORS={
      neutral:['#ffffff','#edf7fb'],
      question:['#4db8f4','#1476c8'],
      case:['#aa8bea','#6846c3'],
      advance1:['#72dfa0','#2bad70'],
      advance2:['#5fd38e','#229b67'],
      back1:['#ff9ba7','#e85e77'],
      back2:['#ff8f9f','#df526e'],
      back3:['#ff7f92','#d84662'],
      vacation:['#ffd76d','#efa82f'],
      tax:['#ffe18b','#e5ad35'],
      equipment:['#b7a6f4','#7c61cf'],
      lawsuit:['#ffb0b8','#db4e68'],
      jail:['#aab6c4','#657489'],
      finish:['#fff4bf','#eab33b'],
      start:['#ffffff','#dff3ea']
    };

    const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
    const roundRect=(c,x,y,w,h,r)=>{
      const rr=Math.min(r,w/2,h/2);
      c.beginPath();
      c.moveTo(x+rr,y);
      c.arcTo(x+w,y,x+w,y+h,rr);
      c.arcTo(x+w,y+h,x,y+h,rr);
      c.arcTo(x,y+h,x,y,rr);
      c.arcTo(x,y,x+w,y,rr);
      c.closePath();
    };
    const centerFor=(n,w,h)=>{
      const i=n-1,row=Math.floor(i/10),step=i%10;
      const col=row%2===0?step:9-step;
      return {
        x:w*(0.05+col*0.0948),
        y:h*(0.07+(9-row)*0.0955)
      };
    };
    const typeOf=(cell)=>{
      for(const t of Object.keys(COLORS)){
        if(t!=='neutral'&&t!=='finish'&&cell.classList.contains(t)) return t;
      }
      if(cell.classList.contains('finish')) return 'finish';
      return 'neutral';
    };
    const iconOf=(cell)=>{
      const el=cell.querySelector('.cell-icon');
      return el?.textContent?.trim()||'';
    };

    function resize(){
      const rect=board.getBoundingClientRect();
      const dpr=Math.min(window.devicePixelRatio||1,2);
      const w=Math.max(320,Math.round(rect.width));
      const h=Math.max(220,Math.round(rect.height));
      canvas.width=Math.round(w*dpr);
      canvas.height=Math.round(h*dpr);
      canvas.style.width=w+'px';
      canvas.style.height=h+'px';
      ctx.setTransform(dpr,0,0,dpr,0,0);
      draw(w,h);
    }

    function draw(w,h){
      ctx.clearRect(0,0,w,h);

      const bg=ctx.createLinearGradient(0,0,0,h);
      bg.addColorStop(0,'#d9f4cf');
      bg.addColorStop(.48,'#c5edc7');
      bg.addColorStop(1,'#e3f4c8');
      ctx.fillStyle=bg;
      ctx.fillRect(0,0,w,h);

      // Decorative landscape.
      const blobs=[
        [0.07,0.18,0.055,'#8bd7c5'],[0.93,0.72,0.05,'#9edcc3'],
        [0.09,0.86,0.065,'#acd878'],[0.92,0.14,0.06,'#b7df81'],
        [0.25,0.10,0.028,'#7fcf8e'],[0.77,0.91,0.038,'#83cf91']
      ];
      blobs.forEach(([px,py,pr,color])=>{
        ctx.beginPath();ctx.arc(w*px,h*py,Math.min(w,h)*pr,0,Math.PI*2);
        ctx.fillStyle=color;ctx.globalAlpha=.42;ctx.fill();ctx.globalAlpha=1;
      });

      const centers=Array.from({length:100},(_,i)=>centerFor(i+1,w,h));

      // Main path: a soft, hand-drawn route behind the tiles.
      ctx.save();
      ctx.lineCap='round';ctx.lineJoin='round';
      ctx.lineWidth=Math.max(14,Math.min(26,w*.016));
      ctx.strokeStyle='rgba(255,255,255,.72)';
      ctx.shadowColor='rgba(47,99,77,.14)';ctx.shadowBlur=7;ctx.shadowOffsetY=4;
      ctx.beginPath();
      centers.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));
      ctx.stroke();
      ctx.restore();

      ctx.save();
      ctx.lineCap='round';ctx.lineJoin='round';
      ctx.lineWidth=Math.max(5,Math.min(10,w*.006));
      ctx.strokeStyle='rgba(102,166,116,.30)';
      ctx.beginPath();
      centers.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));
      ctx.stroke();
      ctx.restore();

      const cells=[...board.querySelectorAll(':scope > .cell')];
      const tileW=Math.min(w*.085,w*.12);
      const tileH=Math.min(h*.075,h*.115);

      cells.forEach((cell,index)=>{
        const n=index+1,p=centers[index],type=typeOf(cell);
        const ww=n===100?tileW*1.08:tileW;
        const hh=n===100?tileH*1.08:tileH;
        const colors=COLORS[type]||COLORS.neutral;
        const g=ctx.createLinearGradient(p.x-ww/2,p.y-hh/2,p.x+ww/2,p.y+hh/2);
        g.addColorStop(0,colors[0]);g.addColorStop(1,colors[1]);

        ctx.save();
        roundRect(ctx,p.x-ww/2+2,p.y-hh/2+5,ww,hh,Math.min(15,ww*.18));
        ctx.fillStyle='rgba(46,83,91,.16)';ctx.fill();
        ctx.restore();

        ctx.save();
        roundRect(ctx,p.x-ww/2,p.y-hh/2,ww,hh,Math.min(15,ww*.18));
        ctx.fillStyle=g;ctx.fill();
        ctx.lineWidth=Math.max(2,Math.min(4,w*.0027));
        ctx.strokeStyle='rgba(255,255,255,.96)';ctx.stroke();
        ctx.restore();

        const active=cell.classList.contains('current-cell');
        const landed=cell.classList.contains('landed');
        if(active||landed){
          ctx.save();
          roundRect(ctx,p.x-ww/2-3,p.y-hh/2-3,ww+6,hh+6,Math.min(18,ww*.2));
          ctx.lineWidth=3;
          ctx.strokeStyle=active?'rgba(255,255,255,.98)':'rgba(255,206,67,.98)';
          ctx.shadowColor=active?'rgba(255,255,255,.8)':'rgba(255,190,50,.55)';
          ctx.shadowBlur=10;ctx.stroke();ctx.restore();
        }

        ctx.fillStyle=type==='neutral'?'#24506a':'#fff';
        ctx.font='900 '+clamp(w*.011,10,16)+'px system-ui,sans-serif';
        ctx.textAlign='left';ctx.textBaseline='top';
        ctx.fillText(String(n),p.x-ww/2+7,p.y-hh/2+5);

        const icon=iconOf(cell);
        if(icon){
          ctx.font=clamp(Math.min(ww,hh)*.42,15,31)+'px "Apple Color Emoji","Segoe UI Emoji",sans-serif';
          ctx.textAlign='center';ctx.textBaseline='middle';
          ctx.fillText(icon,p.x,p.y+3);
        }
      });

      // Start badge.
      const s=centers[0];
      ctx.save();
      roundRect(ctx,s.x-w*.038,s.y+h*.045,w*.076,h*.034,10);
      ctx.fillStyle='rgba(255,255,255,.94)';ctx.fill();
      ctx.lineWidth=2;ctx.strokeStyle='rgba(48,119,92,.32)';ctx.stroke();
      ctx.fillStyle='#2c7359';ctx.font='900 '+clamp(w*.010,9,14)+'px system-ui,sans-serif';
      ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('INICIO',s.x,s.y+h*.062);
      ctx.restore();

      // Dental finish station around cell 100.
      const f=centers[99],gw=Math.min(w*.17,170),gh=Math.min(h*.16,92);
      const gx=clamp(f.x-gw*.10,8,w-gw-8),gy=clamp(f.y-gh*.72,8,h-gh-8);
      ctx.save();
      roundRect(ctx,gx,gy,gw,gh,18);
      ctx.fillStyle='rgba(255,255,255,.95)';ctx.fill();
      ctx.lineWidth=4;ctx.strokeStyle='#e7b63e';ctx.stroke();
      ctx.font=clamp(gh*.43,24,38)+'px "Apple Color Emoji","Segoe UI Emoji",sans-serif';
      ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('🦷',gx+gw*.24,gy+gh*.48);
      ctx.fillStyle='#684d1d';ctx.font='1000 '+clamp(gh*.19,11,17)+'px system-ui,sans-serif';
      ctx.fillText('META',gx+gw*.67,gy+gh*.38);
      ctx.font='800 '+clamp(gh*.15,9,13)+'px system-ui,sans-serif';
      ctx.fillStyle='#8a6a29';ctx.fillText('100 · CLÍNICA',gx+gw*.67,gy+gh*.62);
      ctx.restore();

      // Small thematic accents, intentionally sparse.
      const accents=[
        ['🌿',.16,.035,18],['🪥',.34,.96,18],['🦷',.60,.035,19],
        ['🌳',.84,.96,18],['✨',.49,.50,15]
      ];
      accents.forEach(([t,x,y,size])=>{
        ctx.font=size+'px "Apple Color Emoji","Segoe UI Emoji",sans-serif';
        ctx.textAlign='center';ctx.textBaseline='middle';ctx.globalAlpha=.72;ctx.fillText(t,w*x,h*y);ctx.globalAlpha=1;
      });
    }

    const ro=new ResizeObserver(resize);
    ro.observe(board);
    const mo=new MutationObserver(()=>requestAnimationFrame(()=>{
      const r=board.getBoundingClientRect();draw(Math.max(320,Math.round(r.width)),Math.max(220,Math.round(r.height)));
    }));
    mo.observe(board,{subtree:true,attributes:true,attributeFilter:['class','style'],childList:true});

    window.addEventListener('resize',resize,{passive:true});
    window.addEventListener('orientationchange',()=>setTimeout(resize,80),{passive:true});
    resize();
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',initDentalBoardCanvas,{once:true});
  else initDentalBoardCanvas();
})();
