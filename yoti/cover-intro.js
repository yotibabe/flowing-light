/* Load this small script in <head>, after cover-intro.css, without defer. */
(() => {
  const root = document.documentElement;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const atCover = () => (!location.hash || location.hash === '#home') && window.scrollY < 24;
  if (reduced.matches || !atCover()) return;

  root.classList.add('cover-intro-pending');
  const rescue = window.setTimeout(() => root.classList.remove('cover-intro-pending'), 2200);
  const animations = [];
  let endTimer;

  const finish = () => {
    window.clearTimeout(rescue);
    window.clearTimeout(endTimer);
    animations.forEach(animation => animation.cancel());
    root.classList.remove('cover-intro-pending');
    if (!reduced.matches) root.classList.add('cover-intro-finished');
    window.removeEventListener('scroll', abandonIfLeaving);
    window.removeEventListener('hashchange', abandonIfLeaving);
  };
  const abandonIfLeaving = () => { if (!atCover()) finish(); };

  const start = () => {
    const home = document.getElementById('home');
    if (!home || reduced.matches || !atCover() || typeof home.animate !== 'function') {
      root.classList.remove('cover-intro-pending');
      window.clearTimeout(rescue);
      return;
    }
    const compact = window.matchMedia('(max-width: 760px)').matches;
    const introduce = (selector, delay, duration, x, y, twist = 0, settle = true) => {
      const element = home.querySelector(selector);
      if (!element || getComputedStyle(element).display === 'none') return;
      const finalOpacity = getComputedStyle(element).opacity;
      // Keep the same assembly on a phone, with less travel across the small cover.
      if (compact) { x *= .68; y *= .72; twist *= .82; }
      // Independent translate/rotate preserve existing transform, scale, and placement.
      const frames = settle ? [
        { opacity: 0, translate: `${x}px ${y}px`, rotate: `${twist}deg`, offset: 0, easing: 'cubic-bezier(.2,.72,.24,1)' },
        { opacity: finalOpacity, translate: `${-x * .055}px ${-y * .065}px`, rotate: `${-twist * .1}deg`, offset: .7, easing: 'cubic-bezier(.3,0,.3,1)' },
        { opacity: finalOpacity, translate: `${x * .012}px ${y * .013}px`, rotate: `${twist * .025}deg`, offset: .88, easing: 'cubic-bezier(.25,.5,.3,1)' },
        { opacity: finalOpacity, translate: '0px 0px', rotate: '0deg', offset: 1 }
      ] : [
        { opacity: 0, translate: `${x}px ${y}px`, rotate: `${twist}deg`, offset: 0, easing: 'cubic-bezier(.2,.72,.24,1)' },
        { opacity: finalOpacity, translate: '0px 0px', rotate: '0deg', offset: 1 }
      ];
      const animation = element.animate(frames, {
        duration, delay, easing: 'linear', fill: 'both'
      });
      animations.push(animation);
    };

    try {
      introduce('.folio-pink-paper', 0, 640, -65, 12, -6);
      introduce('.paper-port', 90, 710, -90, 5, -2);
      introduce('.paper-folio', 250, 780, 6, 90, 3);
      introduce('.cutout-person', 560, 800, 45, 72, 5);
      introduce('.cover-camera', 870, 690, -8, -28, -7);
      introduce('.cover-heart-sketch', 980, 590, 0, -20, 8);
      introduce('.cover-hello-envelope', 1040, 690, 10, -28, 9);
      introduce('.cover-star-sketch', 1110, 490, 0, -18, 5);
      introduce('.paper-label', 990, 650, 0, 10, 0, false);
      introduce('.paper-notes', 1150, 560, 0, 7, 0, false);
      introduce('.progress-tape', 1210, 550, 12, -14, 3);
      introduce('.paper-open', 1240, 530, 0, 8, 0, false);
      const thread = home.querySelector('.collage-thread');
      if (thread && getComputedStyle(thread).display !== 'none') {
        introduce('.collage-thread', 1000, 650, 0, 0, 0, false);
        thread.querySelectorAll('path').forEach(path => {
          const length = path.getTotalLength();
          animations.push(path.animate([
            { strokeDasharray: `${length} ${length}`, strokeDashoffset: length },
            { strokeDasharray: `${length} ${length}`, strokeDashoffset: 0 }
          ], { duration: 700, delay: 1040, easing: 'ease-in-out', fill: 'both' }));
        });
      }
      root.classList.remove('cover-intro-pending');
      window.clearTimeout(rescue);
      window.addEventListener('scroll', abandonIfLeaving, { passive: true });
      window.addEventListener('hashchange', abandonIfLeaving);
      endTimer = window.setTimeout(finish, 1800);
    } catch (error) {
      finish();
    }
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
  reduced.addEventListener('change', event => {
    if (event.matches) { finish(); root.classList.remove('cover-intro-finished'); }
  });
})();
