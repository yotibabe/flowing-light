/* A small, silent paper-strip interaction for the existing workbench ending. */
(() => {
  'use strict';
  const mounted = new WeakMap();

  function mount(root) {
    const conclusion = root?.matches?.('.wb-conclusion') ? root : root?.querySelector('.wb-conclusion');
    if (!conclusion) return () => {};
    mounted.get(conclusion)?.();
    const strip = conclusion.querySelector('.wb-principles');
    const detail = conclusion.querySelector('.wb-principle-detail');
    const buttons = [...(strip?.querySelectorAll('[data-wb-principle]') || [])];
    const paragraphs = [...(detail?.querySelectorAll('p[id]') || [])];
    const pairs = buttons.map(button => ({button, panel: paragraphs.find(panel => panel.id === button.getAttribute('aria-controls'))}));
    if (!strip || !detail || pairs.length < 2 || pairs.some(pair => !pair.panel)) return () => {};

    const saved = pairs.map(({button, panel}) => ({pressed:button.getAttribute('aria-pressed'), hidden:panel.hidden}));
    const savedLive = detail.getAttribute('aria-live');
    const savedLabel = strip.getAttribute('aria-label');
    const abort = new AbortController(), {signal} = abort;
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const hover = matchMedia('(hover: hover) and (pointer: fine)');
    const rail = document.createElement('span');
    rail.className = 'wb-tactile-rail';rail.setAttribute('aria-hidden','true');
    const hint = document.createElement('span');
    hint.className = 'wb-tactile-hint';hint.textContent = '划过，看看下一步 ↔';hint.setAttribute('aria-hidden','true');
    strip.append(rail);detail.after(hint);
    conclusion.classList.add('wb-tactile');
    strip.setAttribute('aria-label','下一步方向，可悬停、左右拖动或使用方向键切换');

    let active = Math.max(0,pairs.findIndex(({button}) => button.getAttribute('aria-pressed') === 'true'));
    let visible = false, destroyed = false, demoStarted = false, hoverTimer = 0, frame = 0, lastTime = 0;
    let press = null, blockClickUntil = 0, textAnimation = null;
    let positions = [], current = {x:0,width:1}, target = {x:0,width:1};
    const demoTimers = new Set();
    const clamp = (n,min,max) => Math.max(min,Math.min(max,n));
    const canMove = () => !destroyed && visible && !document.hidden && !motion.matches;
    const restoreAttribute = (element,name,value) => value === null ? element.removeAttribute(name) : element.setAttribute(name,value);

    function paint() {
      rail.style.transform = `translate3d(${current.x.toFixed(2)}px,0,0) scaleX(${current.width.toFixed(2)})`;
    }
    function stopFrame() {
      cancelAnimationFrame(frame);frame = 0;lastTime = 0;
    }
    function tick(now) {
      frame = 0;
      if (!canMove()) {Object.assign(current,target);paint();return;}
      const dt = Math.min(40,now-(lastTime || now-16.67));lastTime = now;
      const ease = 1-Math.exp(-dt/(press?.dragging ? 40 : 65));
      current.x += (target.x-current.x)*ease;current.width += (target.width-current.width)*ease;
      if (Math.abs(target.x-current.x)<.12 && Math.abs(target.width-current.width)<.12) {
        Object.assign(current,target);lastTime = 0;paint();return;
      }
      paint();frame = requestAnimationFrame(tick);
    }
    function moveRail(next,animate=true) {
      target = {...next};
      if (!animate || !canMove()) {stopFrame();Object.assign(current,target);paint();}
      else if (!frame) frame = requestAnimationFrame(tick);
    }
    function measure() {
      positions = pairs.map(({button}) => ({x:button.offsetLeft+6,width:Math.max(1,button.offsetWidth-12)}));
      moveRail(positions[active],false);
    }
    function cancelHover() {clearTimeout(hoverTimer);hoverTimer=0;}
    function stopDemo() {
      demoTimers.forEach(clearTimeout);demoTimers.clear();
      detail.setAttribute('aria-live',savedLive || 'polite');
    }
    function manual() {demoStarted=true;stopDemo();cancelHover();}
    function select(index,{animate=true,move=true,automatic=false}={}) {
      index = clamp(index,0,pairs.length-1);
      const previous = active;active = index;
      detail.setAttribute('aria-live',automatic?'off':savedLive || 'polite');
      pairs.forEach(({button,panel},i) => {button.setAttribute('aria-pressed',String(i===active));panel.hidden=i!==active;});
      if (move) moveRail(positions[active],animate);
      if (previous===active) return;
      textAnimation?.cancel();textAnimation=null;
      if (animate && canMove()) {
        textAnimation = pairs[active].panel.animate([
          {opacity:.15,transform:`translateX(${active>previous?12:-12}px)`},
          {opacity:1,transform:'translateX(0)'}
        ],{duration:240,easing:'cubic-bezier(.2,.7,.2,1)'});
      }
    }
    function scheduleDemo() {
      if (demoStarted || !canMove()) return;
      demoStarted = true;
      const original = active;
      const visit = [...Array(pairs.length-1)].map((_,i)=>(original+i+1)%pairs.length).concat(original);
      visit.forEach((index,i) => {
        const timer = setTimeout(() => {
          demoTimers.delete(timer);
          if (!canMove()) {stopDemo();return;}
          select(index,{automatic:true});
          if (i===visit.length-1) {
            const finish = setTimeout(()=>{demoTimers.delete(finish);stopDemo();},280);
            demoTimers.add(finish);
          }
        },500+i*520);
        demoTimers.add(timer);
      });
    }
    function endPress(cancelled=false) {
      if (!press) return;
      const held = press;press=null;
      strip.classList.remove('is-dragging');
      if (held.dragging) {
        blockClickUntil=performance.now()+500;
        if (!cancelled && active===held.index && Math.abs(held.dx)>28) {
          select(clamp(active+Math.sign(held.dx),0,pairs.length-1));
        } else moveRail(positions[active]);
      }
      try {if(strip.hasPointerCapture(held.id))strip.releasePointerCapture(held.id);} catch (_) {}
    }
    pairs.forEach(({button},index) => {
      button.addEventListener('pointerenter',event => {
        if (!hover.matches || event.pointerType==='touch' || press) return;
        manual();hoverTimer=setTimeout(()=>{hoverTimer=0;select(index);},85);
      },{signal});
      button.addEventListener('pointerleave',cancelHover,{signal});
    });
    strip.addEventListener('pointerdown',event => {
      if (event.isPrimary===false || event.button!==0 || press) return;
      manual();measure();
      press={id:event.pointerId,x:event.clientX,y:event.clientY,dx:0,index:active,dragging:false,railX:positions[active].x};
    },{signal});
    strip.addEventListener('pointermove',event => {
      if (!press || event.pointerId!==press.id) return;
      const dx=event.clientX-press.x,dy=event.clientY-press.y;
      if (!press.dragging) {
        if (Math.abs(dy)>8 && Math.abs(dy)>Math.abs(dx)) {endPress(true);return;}
        if (Math.abs(dx)<8 || Math.abs(dx)<Math.abs(dy)*1.2) return;
        press.dragging=true;strip.classList.add('is-dragging');
        try {strip.setPointerCapture(event.pointerId);} catch (_) {}
      }
      press.dx=dx;
      if(event.cancelable)event.preventDefault();
      const x=clamp(press.railX+dx,positions[0].x,positions.at(-1).x);
      let lower=0;
      while(lower<positions.length-2 && positions[lower+1].x<x)lower++;
      const a=positions[lower],b=positions[lower+1];
      const fraction=clamp((x-a.x)/(b.x-a.x || 1),0,1);
      select(lower+(fraction>=.5?1:0),{move:false});
      moveRail({x,width:a.width+(b.width-a.width)*fraction});
    },{signal});
    strip.addEventListener('pointerup',event=>{if(event.pointerId===press?.id)endPress();},{signal});
    strip.addEventListener('pointercancel',event=>{if(event.pointerId===press?.id)endPress(true);},{signal});
    strip.addEventListener('lostpointercapture',event=>{if(event.pointerId===press?.id)endPress(true);},{signal});
    strip.addEventListener('pointerleave',()=>{cancelHover();if(press&&!press.dragging)endPress(true);},{signal});
    strip.addEventListener('click',event => {
      if (event.detail!==0 && performance.now()<blockClickUntil) {
        event.preventDefault();event.stopImmediatePropagation();return;
      }
      const index=pairs.findIndex(({button})=>button===event.target.closest('[data-wb-principle]'));
      if(index<0)return;manual();select(index);
    },{capture:true,signal});
    strip.addEventListener('keydown',event => {
      if(event.altKey||event.ctrlKey||event.metaKey)return;
      const index=pairs.findIndex(({button})=>button===event.target);
      if(index<0)return;
      const next=event.key==='ArrowRight'?clamp(index+1,0,pairs.length-1):event.key==='ArrowLeft'?clamp(index-1,0,pairs.length-1):event.key==='Home'?0:event.key==='End'?pairs.length-1:null;
      if(next===null)return;event.preventDefault();manual();select(next);pairs[next].button.focus({preventScroll:true});
    },{signal});
    strip.addEventListener('focusin',manual,{signal});
    function suspend() {
      stopDemo();cancelHover();endPress(true);stopFrame();textAnimation?.cancel();textAnimation=null;
      Object.assign(current,target);paint();
    }
    document.addEventListener('visibilitychange',()=>{if(document.hidden)suspend();else scheduleDemo();},{signal});
    motion.addEventListener('change',()=>{suspend();measure();},{signal});
    window.addEventListener('blur',suspend,{signal});
    const resize = new ResizeObserver(measure);resize.observe(strip);
    const observer = new IntersectionObserver(entries => {
      visible=entries[0].isIntersecting && entries[0].intersectionRatio>.35;
      if(visible){measure();scheduleDemo();}else suspend();
    },{root:conclusion.closest('dialog'),threshold:[0,.35,.7]});
    measure();select(active,{animate:false});observer.observe(conclusion);

    const cleanup=()=>{
      if(destroyed)return;destroyed=true;
      suspend();abort.abort();observer.disconnect();resize.disconnect();rail.remove();hint.remove();
      conclusion.classList.remove('wb-tactile');strip.classList.remove('is-dragging');
      pairs.forEach(({button,panel},i)=>{restoreAttribute(button,'aria-pressed',saved[i].pressed);panel.hidden=saved[i].hidden;});
      restoreAttribute(detail,'aria-live',savedLive);restoreAttribute(strip,'aria-label',savedLabel);
      if(mounted.get(conclusion)===cleanup)mounted.delete(conclusion);
    };
    mounted.set(conclusion,cleanup);
    return cleanup;
  }
  window.YotiTactile={mount};
})();
