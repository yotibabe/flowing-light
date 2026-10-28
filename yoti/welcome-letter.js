/* Animate the paper's silhouette separately from its readable text. */
(() => {
  const enterDuration = 700, holdDuration = 3000, exitDuration = 1900;
  let frame = 0, flight = null, sheet = null, envelope = null, dialog = null;
  let born = 0, closingAt = 0, source = null;
  const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  function stop() {
    cancelAnimationFrame(frame); frame = 0;
    flight?.cancel(); flight = null;
    envelope?.classList.remove('envelope-is-open');
    sheet?.classList.remove('is-floating');
    sheet = null; dialog = null; closingAt = 0;
  }
  function anchor(origin) {
    const e = document.querySelector('#home .cover-hello-envelope');
    const visible = r => r && r.bottom > 0 && r.top < innerHeight && r.right > 0 && r.left < innerWidth;
    let r = e?.getBoundingClientRect();
    if (!visible(r)) r = origin?.getBoundingClientRect();
    return visible(r) ? { x:r.left+r.width*.5, y:r.top+r.height*.43, width:r.width } : { x:innerWidth*.82, y:innerHeight*.3, width:110 };
  }
  function createSurface() {
    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 0 480 320');
    svg.setAttribute('preserveAspectRatio', 'none');
    svg.setAttribute('aria-hidden', 'true');
    svg.classList.add('welcome-surface');
    svg.innerHTML = `<defs>
      <linearGradient id="welcome-stock" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fffbee"/><stop offset=".5" stop-color="#fff8e8"/><stop offset="1" stop-color="#efe0bf"/></linearGradient>
      <linearGradient id="welcome-fold" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#d6c6a4"/><stop offset=".5" stop-color="#fffbed"/><stop offset="1" stop-color="#e5d5b6"/></linearGradient>
      <linearGradient id="welcome-light"><stop stop-color="#cbb892" stop-opacity="0"/><stop offset=".45" stop-color="#cbb892" stop-opacity=".12"/><stop offset=".6" stop-color="#fff" stop-opacity=".22"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
      <pattern id="welcome-grain" width="9" height="7" patternUnits="userSpaceOnUse"><path d="M1 1l2 .4M6 5l1-.3" stroke="#947b54" stroke-width=".35" opacity=".12"/></pattern>
    </defs><path data-paper fill="url(#welcome-stock)" stroke="#cdbb98" stroke-width=".7"/><path data-grain fill="url(#welcome-grain)"/><path data-light fill="url(#welcome-light)"/><path data-curl fill="url(#welcome-fold)" stroke="#d5c29d" stroke-width=".6"/>`;
    sheet.prepend(svg); sheet.classList.add('has-welcome-surface');
    return { paper:svg.querySelector('[data-paper]'), grain:svg.querySelector('[data-grain]'), light:svg.querySelector('[data-light]'), curl:svg.querySelector('[data-curl]') };
  }
  function open(reader, origin) {
    stop(); dialog = reader; sheet = reader.querySelector('.hello-sheet');
    if (!sheet) return 0;
    sheet.dataset.motionState = reduced() ? 'reading' : 'opening';
    envelope = document.querySelector('#home .cover-hello-envelope');
    source = anchor(origin);
    envelope?.classList.add('envelope-is-open');
    const parts = createSurface();
    born = performance.now();
    function paint(time) {
      if (!sheet || !dialog?.open) return;
      const t = (time-born)/1000;
      const opening = Math.max(0,1-t/.7);
      const leaving = closingAt ? Math.min(1,(time-closingAt)/exitDuration) : 0;
      const flex = reduced() ? 0 : 1;
      const a = flex*(Math.sin(t*2.1)*4 + opening*22 + leaving*27);
      const b = flex*(Math.cos(t*1.8+.7)*5 + opening*12);
      const curl = 19 + flex*(5*Math.sin(t*1.9)+opening*38+leaving*46);
      let d = `M2 ${5+a*.3} C132 ${-8-a} 330 ${11+b} 477 ${2+b*.4} C${482+a*.3} 108 ${468-b*.4} 216 478 ${316-curl*.4} Q${480-curl*.4} ${319-curl*.65} ${480-curl} 318 C322 ${315+b} 152 ${327+a*.4} 3 ${315-b*.4} C${-4+b*.3} 202 ${7-a*.3} 101 2 ${5+a*.3}Z`;
      let fold = `M${480-curl} 318 Q${473-curl*.55} ${304-curl*.6} 478 ${316-curl*.4} Q${480-curl*.45} 319 ${480-curl} 318Z`;
      if (closingAt && !reduced()) {
        // A diagonal rolling edge eats the sheet from bottom-right to top-left.
        // Keep the sheet in place; the remaining front and its text share a contour.
        const progress = leaving*leaving*(3-2*leaving);
        const c = 2*(1-progress);
        const point = (x,y) => [x*480,y*320];
        const top = c > 1 ? point(1,c-1) : point(c,0);
        const bottom = c > 1 ? point(c-1,1) : point(0,c);
        const polygon = c > 1 ? [[0,0],[480,0],top,bottom,[0,320]] : [[0,0],top,bottom];
        d = 'M'+polygon.map(p=>p.join(' ')).join(' L')+'Z';
        const width = Math.min(38*Math.sin(Math.PI*leaving), c*110);
        const ax = top[0]-width*.55, ay = top[1]-width*.82;
        const bx = bottom[0]-width*.55, by = bottom[1]-width*.82;
        const mx=(top[0]+bottom[0])/2, my=(top[1]+bottom[1])/2;
        fold = `M${top} Q${mx+width*.3} ${my+width*.45} ${bottom} Q${bx-width*.2} ${by} ${bx} ${by} Q${mx-width*1.1} ${my-width*1.4} ${ax} ${ay} Q${ax} ${ay} ${top}Z`;
        const copy = sheet.querySelector('.welcome-copy');
        // Clip in sheet coordinates, including its padding, so words roll away with paper.
        const pad = getComputedStyle(sheet);
        const px=parseFloat(pad.paddingLeft), py=parseFloat(pad.paddingTop);
        if(copy) copy.style.clipPath='polygon('+polygon.map(([x,y])=>`${x/480*sheet.offsetWidth-px}px ${y/320*sheet.offsetHeight-py}px`).join(',')+')';
        parts.light.style.opacity='0';

      }
      parts.paper.setAttribute('d',d); parts.grain.setAttribute('d',d);
      parts.curl.setAttribute('d',fold);
      parts.light.setAttribute('d',`M${220+a*3} 1 Q${135+b*4} 155 ${260-a*3} 321 L440 319 Q${270+b*5} 140 395 3Z`);
      if (!reduced()&&!document.hidden) frame = requestAnimationFrame(paint);
    }
    paint(born);
    if (reduced()) return 0;
    sheet.classList.add('is-floating');
    const r = reader.getBoundingClientRect(), x = source.x-(r.left+r.width/2), y = source.y-(r.top+r.height/2);
    const scale = Math.max(.15,Math.min(.38,source.width/r.width*.7));
    flight = reader.animate([
      {opacity:0,transform:`translate3d(${x}px,${y}px,0) rotate(10deg) scale(${scale}) rotateX(48deg)`},
      {opacity:1,transform:`translate3d(${x*.65}px,${y*.65-55}px,0) rotate(-9deg) scale(.68) rotateX(-12deg)`,offset:.38},
      {opacity:1,transform:'translate3d(-6px,-9px,0) rotate(1.5deg) scale(1.015)',offset:.8},
      {opacity:1,transform:'translate3d(0,0,0) rotate(0deg) scale(1)'}
    ],{duration:enterDuration,easing:'cubic-bezier(.22,.64,.32,1)',fill:'both'});
    const entering = flight;
    entering.finished.then(()=>{
      if (flight !== entering || !sheet) return;
      sheet.dataset.motionState = 'reading';
      entering.cancel(); flight=null;
    }).catch(()=>{});
    return enterDuration;
  }
  function close(reader) {
    flight?.cancel(); flight = null;
    closingAt = performance.now();
    if (sheet) sheet.dataset.motionState = 'closing';
    if (reduced()) {
      flight = reader.animate([{opacity:1},{opacity:0}],{duration:1,fill:'both'});
      return flight;
    }
    // Cancel only the idle sway. The closing sheet never translates or flies away.
    if(sheet){
      const resting=getComputedStyle(sheet).transform;
      sheet.classList.remove('is-floating');
      sheet.style.transform=resting;
    }
    flight = reader.animate([
      {opacity:1,offset:0},
      {opacity:1,offset:.96},
      {opacity:0,offset:1}
    ],{duration:exitDuration,easing:'linear',fill:'both'});
    return flight;
  }
  document.addEventListener('visibilitychange',()=>{
    if(document.hidden){cancelAnimationFrame(frame);frame=0;}
  });
  window.YotiWelcomeLetter = {open,close,stop,enterDuration,holdDuration};
})();
