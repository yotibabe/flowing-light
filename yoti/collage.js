(() => {
  const quiet = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const note = document.querySelector('[data-note-flip]');
  note.addEventListener('click', () => note.setAttribute('aria-pressed', String(note.getAttribute('aria-pressed') !== 'true')));
  document.querySelector('[data-stamp]')?.addEventListener('click', e => {
    if (!quiet) e.currentTarget.animate([{transform:'rotate(12deg)'},{transform:'rotate(385deg)'},{transform:'rotate(372deg)'}],{duration:850,easing:'cubic-bezier(.2,.8,.2,1)'});
  });
  const copy={light:['bring people together.','在 LIGHT，我策划、主持，也做网站。让一次对话发生，再把值得留下的内容整理下来。'],build:['think it. make it.','研究投资时，我把零散的信息和判断整理成自己的交易工作台。遇到一个真实的问题，就试着把它做成工具。'],play:['a little what if…','把去过的地方放进旅行星球，把生日祝福做成一间可以探索的小屋。有些作品，从“如果这样呢”开始。']};
  const tabs=[...document.querySelectorAll('[data-about]')],panel=document.querySelector('#about-note');
  function select(tab){tabs.forEach(b=>{b.setAttribute('aria-selected',String(b===tab));b.tabIndex=b===tab?0:-1;});const text=copy[tab.dataset.about];panel.innerHTML=`<span class="hand">${text[0]}</span><p>${text[1]}</p>`;panel.setAttribute('aria-labelledby',tab.id);if(!quiet)panel.animate([{opacity:.35,transform:'translateY(6px) rotate(-1deg)'},{opacity:1,transform:'translateY(0) rotate(.6deg)'}],{duration:300,easing:'ease-out'});}
  tabs.forEach((tab,i)=>{tab.addEventListener('click',()=>select(tab));tab.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();const n=e.key==='Home'?0:e.key==='End'?tabs.length-1:(i+(e.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;select(tabs[n]);tabs[n].focus();});});
})();

// Original About photographs: a floating paper stack with automatic, reversible turns.
(() => {
  const album = document.querySelector('.about-album');
  if (!album) return;
  const cards = [...album.querySelectorAll('.album-card')];
  const labels = cards.map((card,i)=>card.dataset.photoLabel || ['海边扶栏', '林荫白裙', '白色主持照'][i]);
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const stage = album.querySelector('.album-stage');
  const controls = album.querySelector('.album-controls');
  const status = album.querySelector('.album-status');
  // A separate plane lets pointer tilt and the existing automatic drift coexist.
  const pointerFrame = document.createElement('div');
  pointerFrame.className = 'album-pointer-frame';
  const pointerPlane = document.createElement('div');
  pointerPlane.className = 'album-pointer-plane';
  stage.before(pointerFrame);
  pointerFrame.append(pointerPlane);
  pointerPlane.append(stage);
  const WAIT = 350;
  let active = 0, busy = false, inView = false, paused = false;
  let timer = 0, progressAnimation = null;
  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'album-play-toggle';
  toggle.textContent = 'Ⅱ';
  toggle.setAttribute('aria-label', '暂停照片自动播放');
  toggle.setAttribute('aria-pressed', 'false');
  controls.append(toggle);
  const progress = document.createElement('span');
  progress.className = 'album-progress';
  progress.setAttribute('aria-hidden', 'true');
  progress.innerHTML = '<i></i>';
  controls.append(progress);
  album.querySelector('.album-hint').textContent = 'a few sides of me. ↗';
  // Automatic changes are visual; announce only intentional manual turns.
  status.setAttribute('aria-live', 'off');
  const canPlay = () => !paused && inView && !document.hidden && !document.body.classList.contains('reading');
  const clearClock = () => {
    clearTimeout(timer);
    timer = 0;
    progressAnimation?.cancel();
    progressAnimation = null;
  };
  const sync = () => {
    clearClock();
    const playing = canPlay();
    album.dataset.autoplay = playing ? 'playing' : 'paused';
    album.dataset.albumActive = String(active);
    if (!playing || busy) return;
    if (!motion.matches) progressAnimation = progress.firstElementChild.animate(
      [{transform:'scaleX(0)'}, {transform:'scaleX(1)'}],
      {duration:WAIT, easing:'linear', fill:'forwards'}
    );
    timer = setTimeout(() => move(1, true), WAIT);
  };
  const move = async (step, automatic = false) => {
    if (busy || (automatic && !canPlay())) return;
    busy = true;
    clearClock();
    album.dataset.moving = 'true';
    status.setAttribute('aria-live', automatic ? 'off' : 'polite');
    const previous = active;
    const before = cards.map(card => ({transform:getComputedStyle(card).transform, filter:getComputedStyle(card).filter, opacity:getComputedStyle(card).opacity}));
    active = (active + step + cards.length) % cards.length;
    cards.forEach((card, i) => {
      card.dataset.photoSlot = String((i - active + cards.length) % cards.length);
      card.setAttribute('aria-hidden', String(i !== active));
    });
    const after = cards.map(card => ({transform:getComputedStyle(card).transform, filter:getComputedStyle(card).filter, opacity:getComputedStyle(card).opacity}));
    album.dataset.albumActive = String(active);
    status.textContent = `0${active + 1} / ${String(cards.length).padStart(2,'0')} · ${labels[active]}`;
    const width = stage.clientWidth;
    const direction = -1; // Send the paper toward the outer margin, away from the About copy.
    const duration = motion.matches ? 160 : 1300;
    const animations = cards.map((card, i) => {
      let frames;
      if (motion.matches) {
        frames = [{opacity:i === active ? .55 : 1}, {opacity:1}];
      } else if (i === previous) {
        const side = Math.min(135, width * (innerWidth <= 760 ? .17 : .38)) * direction;
        const turn = innerWidth <= 760 ? 18 : 27;
        frames = [
          {...before[i], opacity:1, zIndex:5, offset:0},
          {transform:`translate(${side}px,-48px) rotate(${direction * turn}deg) scale(1.035)`, filter:'brightness(1)', opacity:1, zIndex:5, offset:.36},
          {transform:`translate(${side * .92}px,15px) rotate(${direction * (turn - 7)}deg) scale(.88)`, opacity:.68, zIndex:1, offset:.57},
          {...after[i], zIndex:1, offset:1}
        ];
      } else if (i === active) {
        frames = [
          {...before[i], opacity:1, offset:0},
          {transform:`translate(${-direction * 12}px,-24px) rotate(${direction * -5}deg) scale(1.035)`, filter:'brightness(1)', offset:.5},
          {transform:'translate(-3px,3px) rotate(-6deg) scale(1)', filter:'brightness(1)', offset:.82},
          {...after[i], offset:1}
        ];
      } else {
        frames = [
          {...before[i], offset:0},
          {...after[i], offset:.45},
          {...after[i], offset:1}
        ];
      }
      return card.animate(frames, {duration, easing:'cubic-bezier(.45,0,.25,1)', fill:'none'});
    });
    try { await Promise.all(animations.map(animation => animation.finished)); }
    catch (_) { /* A suspended page may cancel its visual transition. */ }
    finally {
      busy = false;
      album.dataset.moving = 'false';
      sync();
    }
  };
  album.querySelector('.album-turn').addEventListener('click', () => move(1));
  album.querySelectorAll('[data-album-step]').forEach(button => button.addEventListener('click', () => move(Number(button.dataset.albumStep))));
  album.addEventListener('keydown', event => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    move(event.key === 'ArrowLeft' ? -1 : 1);
  });
  toggle.addEventListener('click', () => {
    paused = !paused;
    toggle.textContent = paused ? '▷' : 'Ⅱ';
    toggle.setAttribute('aria-label', paused ? '继续照片自动播放' : '暂停照片自动播放');
    toggle.setAttribute('aria-pressed', String(paused));
    sync();
  });
  let pointerRaf = 0, pointerX = 0, pointerY = 0;
  const resetPointer = () => {
    cancelAnimationFrame(pointerRaf);
    pointerRaf = 0;
    pointerFrame.dataset.interacting = 'false';
    pointerPlane.style.transform = '';
  };
  const trackPointer = event => {
    if (motion.matches || event.pointerType === 'touch') return;
    const bounds = pointerFrame.getBoundingClientRect();
    pointerX = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width - .5) * 2));
    pointerY = Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height - .5) * 2));
    pointerFrame.dataset.interacting = 'true';
    if (pointerRaf) return;
    pointerRaf = requestAnimationFrame(() => {
      pointerRaf = 0;
      pointerPlane.style.transform = `translate3d(${pointerX * 25}px,${pointerY * 22 - 7}px,0) rotateX(${-pointerY * 7}deg) rotateY(${pointerX * 8}deg) rotateZ(${pointerX * 1.4}deg) scale(1.025)`;
    });
  };
  // Pointer interaction never pauses or resets the automatic photo clock.
  pointerFrame.addEventListener('pointerenter', trackPointer);
  pointerFrame.addEventListener('pointermove', trackPointer);
  pointerFrame.addEventListener('pointerleave', resetPointer);
  pointerFrame.addEventListener('pointercancel', resetPointer);
  motion.addEventListener('change', resetPointer);
  document.addEventListener('visibilitychange', sync);
  new MutationObserver(sync).observe(document.body, {attributes:true, attributeFilter:['class']});
  new IntersectionObserver(entries => {
    inView = entries[0].isIntersecting && entries[0].intersectionRatio >= .25;
    sync();
  }, {threshold:[0,.25]}).observe(pointerFrame);
  motion.addEventListener('change', sync);
  sync();
})();
