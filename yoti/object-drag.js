/* Paper-object motion. Existing data-open buttons still own navigation. */
(() => {
  'use strict';
  const collection = document.querySelector('.personal-objects');
  if (!collection) return;
  const reader = document.getElementById('reader');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const hoverPointer = matchMedia('(hover: hover) and (pointer: fine)');
  const axes = ['x', 'y', 'rx', 'ry', 'rz'];
  const zeros = () => ({x: 0, y: 0, rx: 0, ry: 0, rz: 0});
  const clamp = (value, low, high) => Math.min(high, Math.max(low, value));
  const states = [...collection.querySelectorAll('.object-slot')].map((slot, index) => ({
    slot, card: slot.querySelector('.keepsake'), index,
    current: zeros(), velocity: zeros(), target: zeros(),
    press: null, visible: false, entered: false, moving: false,
    blockClickUntil: 0, restingUntil: 0, entrance: null
  })).filter(state => state.card);
  let frame = 0;
  let lastTime = 0;
  let activeDrag = null;
  const available = () => !document.hidden && !reader?.open && !reducedMotion.matches;

  function write(state) {
    const value = state.current;
    state.card.style.setProperty('--mx', `${value.x.toFixed(2)}px`);
    state.card.style.setProperty('--my', `${value.y.toFixed(2)}px`);
    state.card.style.setProperty('--rx', `${value.rx.toFixed(2)}deg`);
    state.card.style.setProperty('--ry', `${value.ry.toFixed(2)}deg`);
    state.card.style.setProperty('--rz', `${value.rz.toFixed(2)}deg`);
  }

  function spacing() {
    const active = activeDrag || states.find(state => state.slot.matches('.is-hovered,.is-focused'));
    states.forEach(state => state.slot.style.setProperty('--neighbor-x',
      !active || state === active ? '0px' : state.index < active.index ? '-12px' : '12px'));
  }

  function tick(time) {
    frame = 0;
    if (!available()) return;
    const dt = Math.min(1.8, (time - (lastTime || time - 16.67)) / 16.67);
    lastTime = time;
    let more = false;
    states.forEach(state => {
      if (!state.moving || !state.visible) return;
      const held = state.press?.dragging;
      const spring = held ? .26 : .085;
      const damping = held ? .69 : .79;
      let moving = false;
      axes.forEach(axis => {
        state.velocity[axis] += (state.target[axis] - state.current[axis]) * spring * dt;
        state.velocity[axis] *= Math.pow(damping, dt);
        state.current[axis] += state.velocity[axis] * dt;
        if (Math.abs(state.target[axis] - state.current[axis]) > .025 || Math.abs(state.velocity[axis]) > .025) moving = true;
      });
      if (!moving) {
        Object.assign(state.current, state.target);
        Object.assign(state.velocity, zeros());
        state.slot.classList.remove('is-returning');
      }
      state.moving = moving;
      state.slot.classList.toggle('is-moving', moving);
      write(state);
      more ||= moving;
    });
    if (more) frame = requestAnimationFrame(tick);
    else lastTime = 0;
  }

  function run(state) {
    if (!available() || !state.visible) return;
    state.moving = true;
    state.slot.classList.add('is-moving');
    if (!frame) {
      lastTime = 0;
      frame = requestAnimationFrame(tick);
    }
  }

  function releaseCapture(state, pointerId) {
    try {
      if (state.card.hasPointerCapture(pointerId)) state.card.releasePointerCapture(pointerId);
    } catch (_) { /* The browser can release capture before pointercancel arrives. */ }
  }

  function reset(state, immediate = true) {
    const pointerId = state.press?.id;
    if (state.press?.dragging) state.blockClickUntil = performance.now() + 650;
    state.press = null;
    if (activeDrag === state) activeDrag = null;
    if (pointerId !== undefined) releaseCapture(state, pointerId);
    state.slot.classList.remove('is-hovered', 'is-focused', 'is-dragging', 'is-returning', 'is-moving');
    state.card.classList.remove('is-dragging');
    Object.assign(state.target, zeros());
    if (immediate) {
      Object.assign(state.current, zeros());
      Object.assign(state.velocity, zeros());
      state.moving = false;
      write(state);
    } else run(state);
    spacing();
  }

  function resetAll() {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    lastTime = 0;
    states.forEach(state => reset(state));
    syncIdle();
  }

  function syncIdle() {
    states.forEach(state => state.slot.classList.toggle('object-idle-paused', !available() || !state.visible));
  }

  function rest(state) {
    if (state.press) return;
    state.slot.classList.remove('is-hovered');
    const focused = state.slot.classList.contains('is-focused');
    Object.assign(state.target, zeros(), focused ? {y: -29, rx: -3} : {});
    spacing();
    run(state);
  }

  function follow(state, event) {
    if (!available() || !state.visible || activeDrag || state.press || !hoverPointer.matches || event.pointerType === 'touch' || performance.now() < state.restingUntil) return;
    const rect = state.slot.getBoundingClientRect();
    const x = clamp((event.clientX - rect.left) / rect.width - .5, -.5, .5);
    const y = clamp((event.clientY - rect.top) / rect.height - .5, -.5, .5);
    state.slot.classList.add('is-hovered');
    Object.assign(state.target, {x: x * 38, y: y * 24 - 28, rx: -y * 12 - 2, ry: x * 17, rz: x * 3});
    spacing();
    run(state);
  }

  function finish(state, event, cancelled = false) {
    const press = state.press;
    if (!press || event.pointerId !== press.id) return;
    state.press = null;
    if (activeDrag === state) activeDrag = null;
    releaseCapture(state, press.id);
    state.slot.classList.remove('is-dragging');
    state.card.classList.remove('is-dragging');
    if (press.dragging) {
      state.blockClickUntil = performance.now() + 650;
      state.restingUntil = performance.now() + 600;
      state.slot.classList.remove('is-hovered', 'is-focused');
      state.slot.classList.add('is-returning');
      Object.assign(state.target, zeros());
      // A small release impulse preserves the direction of the hand, then the spring settles.
      if (!cancelled) {
        const fresh = performance.now() - press.lastTime < 100;
        state.velocity.x += fresh ? clamp(press.vx * 4, -7, 7) : 0;
        state.velocity.y += fresh && !press.touch ? clamp(press.vy * 3, -5, 5) : 0;
        state.velocity.rz += fresh ? clamp(press.vx * .22, -.65, .65) : 0;
      }
      spacing();
      run(state);
    } else if (cancelled || press.touch) rest(state);
  }

  states.forEach(state => {
    const {slot, card} = state;
    slot.classList.add('object-idle-paused');
    card.addEventListener('dragstart', event => event.preventDefault());
    slot.addEventListener('pointermove', event => follow(state, event));
    slot.addEventListener('pointerleave', () => rest(state));
    card.addEventListener('pointerdown', event => {
      if (!available() || !state.visible || activeDrag || event.isPrimary === false || event.button !== 0) return;
      state.blockClickUntil = 0;
      state.restingUntil = 0;
      const rect = card.getBoundingClientRect();
      state.press = {
        id: event.pointerId, touch: event.pointerType === 'touch', dragging: false,
        startX: event.clientX, startY: event.clientY,
        startValueX: state.current.x, startValueY: state.current.y,
        lastX: event.clientX, lastY: event.clientY, lastTime: performance.now(), vx: 0, vy: 0,
        minX: Math.max(-90, 12 - rect.left + state.current.x),
        maxX: Math.min(90, innerWidth - 12 - rect.right + state.current.x)
      };
      // Touch capture waits until horizontal intent is clear, so page scrolling stays native.
      if (!state.press.touch) {
        try { card.setPointerCapture(event.pointerId); } catch (_) {}
      }
    });
    card.addEventListener('pointermove', event => {
      const press = state.press;
      if (!press || event.pointerId !== press.id || !available()) return;
      const dx = event.clientX - press.startX;
      const dy = event.clientY - press.startY;
      if (!press.dragging) {
        if (press.touch && Math.abs(dy) > 10 && Math.abs(dy) > Math.abs(dx)) {
          finish(state, event, true);
          return;
        }
        const starts = press.touch ? Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy) * 1.25 : Math.hypot(dx, dy) > 6;
        if (!starts) return;
        press.dragging = true;
        activeDrag = state;
        state.slot.classList.add('is-dragging');
        state.card.classList.add('is-dragging');
        state.slot.classList.remove('is-hovered', 'is-returning');
        try { card.setPointerCapture(event.pointerId); } catch (_) {}
        spacing();
      }
      if (event.cancelable) event.preventDefault();
      const time = performance.now();
      const elapsed = Math.max(8, time - press.lastTime);
      press.vx = (event.clientX - press.lastX) / elapsed;
      press.vy = (event.clientY - press.lastY) / elapsed;
      press.lastX = event.clientX;
      press.lastY = event.clientY;
      press.lastTime = time;
      const x = clamp(press.startValueX + dx, press.minX, press.maxX);
      const y = press.touch ? -24 : clamp(press.startValueY + dy - 9, -65, 45);
      Object.assign(state.target, {
        x, y, rx: press.touch ? -3 : clamp(-dy * .055 - 3, -9, 7),
        ry: clamp(dx * .07, -9, 9),
        rz: clamp(dx * .026 + press.vx * 2.2, -7, 7)
      });
      run(state);
    });
    card.addEventListener('pointerup', event => finish(state, event));
    card.addEventListener('pointercancel', event => finish(state, event, true));
    card.addEventListener('lostpointercapture', event => {
      if (state.press?.id === event.pointerId) finish(state, event, true);
    });
    card.addEventListener('focus', () => {
      if (!available() || !card.matches(':focus-visible')) return;
      slot.classList.add('is-focused');
      Object.assign(state.target, zeros(), {y: -29, rx: -3});
      spacing();
      run(state);
    });
    card.addEventListener('blur', () => {
      slot.classList.remove('is-focused');
      rest(state);
    });
  });

  // The app's delegated click listener is in the bubble phase. Only completed drags
  // are consumed here; keyboard activation (detail 0) and ordinary clicks pass through.
  document.addEventListener('click', event => {
    const card = event.target.closest?.('.personal-objects .keepsake');
    const state = states.find(item => item.card === card);
    if (!state || event.detail === 0 || performance.now() > state.blockClickUntil) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    state.blockClickUntil = 0;
  }, true);

  function enter(state) {
    if (state.entered || !available()) return;
    state.entered = true;
    const delay = innerWidth > 760 ? state.index * 110 : 0;
    // Individual translate leaves the drift wrapper's transform and card spring independent.
    state.entrance = state.slot.animate([
      {translate: '0 38px', opacity: .15},
      {translate: '0 -7px', opacity: 1, offset: .7},
      {translate: '0 0', opacity: 1}
    ], {duration: 760, delay, easing: 'cubic-bezier(.2,.7,.2,1)'});
    state.entrance.finished.then(() => { state.entrance = null; }).catch(() => {});
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const state = states.find(item => item.slot === entry.target);
        if (!state) return;
        state.visible = entry.isIntersecting;
        if (state.visible) enter(state);
        else reset(state);
      });
      syncIdle();
    }, {threshold: 0, rootMargin: '0px 0px -30px 0px'});
    states.forEach(state => observer.observe(state.slot));
  } else {
    states.forEach(state => { state.visible = true; enter(state); });
    syncIdle();
  }

  document.addEventListener('yoti:reset-objects', resetAll);
  document.addEventListener('visibilitychange', resetAll);
  window.addEventListener('blur', resetAll);
  window.addEventListener('resize', resetAll);
  reducedMotion.addEventListener('change', () => {
    states.forEach(state => state.entrance?.cancel());
    resetAll();
  });
  if (reader) new MutationObserver(resetAll).observe(reader, {attributes: true, attributeFilter: ['open']});
})();
