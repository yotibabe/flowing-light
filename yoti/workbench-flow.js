/* Candidate only: independent screenshot journeys, with native vertical scrolling. */
(() => {
  window.YotiWorkbenchFlow = {
    mount(root) {
      const abort = new AbortController(), { signal } = abort;
      const motion = matchMedia('(prefers-reduced-motion: reduce)');
      const animations = new Set();
      const cleanups = [];
      const animate = (node, direction) => {
        if (motion.matches) return;
        const a = node.animate([
          { opacity: .25, transform: `translateX(${direction * 30}px)` },
          { opacity: 1, transform: 'translateX(0)' }
        ], { duration: 420, easing: 'cubic-bezier(.2,.8,.2,1)' });
        animations.add(a);
        a.onfinish = () => animations.delete(a);
      };
      root.querySelectorAll('[data-story-group]').forEach(group => {
        const tabs = [...group.querySelectorAll('[data-story-tab]')];
        const panels = [...group.querySelectorAll('[data-story-panel]')];
        const copies = [...group.querySelectorAll('[data-story-copy]')];
        const counts = [...group.querySelectorAll('[data-story-count]')];
        const media = group.querySelector('[data-story-swipe]');
        let active = -1, drag = null, suppressUntil = 0;
        tabs.forEach((tab, index) => {
          const key = tab.dataset.storyTab;
          const panel = panels.find(p => p.dataset.storyPanel === key);
          tab.id = `story-${group.dataset.storyGroup}-tab-${key}`;
          panel.id = `story-${group.dataset.storyGroup}-panel-${key}`;
          tab.setAttribute('role', 'tab');
          tab.setAttribute('aria-controls', panel.id);
          panel.setAttribute('role', 'tabpanel');
          panel.setAttribute('aria-labelledby', tab.id);
          tab.addEventListener('click', () => select(index), { signal });
          tab.addEventListener('keydown', event => {
            if (event.altKey || event.ctrlKey || event.metaKey) return;
            let next;
            if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
            else if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
            else if (event.key === 'Home') next = 0;
            else if (event.key === 'End') next = tabs.length - 1;
            else return;
            event.preventDefault(); select(next); tabs[next].focus({ preventScroll: true });
          }, { signal });
        });
        function select(index, animated = true) {
          if (index === active || index < 0 || index >= tabs.length) return;
          const direction = index > active ? 1 : -1;
          active = index;
          const key = tabs[index].dataset.storyTab;
          group.dataset.storyActive = key;
          counts.forEach(count => {
            count.textContent = `${String(index + 1).padStart(2, '0')} / ${String(tabs.length).padStart(2, '0')}`;
            count.setAttribute('aria-label', `第 ${index + 1} 张，共 ${tabs.length} 张`);
          });
          tabs.forEach((tab, i) => {
            tab.setAttribute('aria-selected', String(i === index));
            tab.tabIndex = i === index ? 0 : -1;
          });
          panels.forEach(panel => {
            panel.hidden = panel.dataset.storyPanel !== key;
            if (!panel.hidden && animated) animate(panel, direction);
          });
          copies.forEach(copy => {
            copy.hidden = copy.dataset.storyCopy !== key;
            if (!copy.hidden && animated) animate(copy, direction);
          });
        }
        group.querySelectorAll('[data-story-go]').forEach(button => {
          button.addEventListener('click', () => {
            select(tabs.findIndex(tab => tab.dataset.storyTab === button.dataset.storyGo));
          }, { signal });
        });
        group.querySelectorAll('[data-story-step]').forEach(button => {
          const step = Number(button.dataset.storyStep);
          if (step !== -1 && step !== 1) return;
          button.addEventListener('click', () => {
            select((active + step + tabs.length) % tabs.length);
          }, { signal });
        });
        select(0, false);
        function resetDrag() {
          if (drag && media.hasPointerCapture(drag.id)) media.releasePointerCapture(drag.id);
          drag = null;
          media.classList.remove('is-dragging');
          media.style.removeProperty('--drag-x');
        }
        media.addEventListener('pointerdown', event => {
          if (event.button !== 0 || !event.isPrimary) return;
          drag = { id: event.pointerId, x: event.clientX, y: event.clientY, dx: 0, horizontal: false };
        }, { signal });
        media.addEventListener('pointermove', event => {
          if (!drag || drag.id !== event.pointerId) return;
          const dx = event.clientX - drag.x, dy = event.clientY - drag.y;
          if (!drag.horizontal) {
            if (Math.abs(dy) > 12 && Math.abs(dy) > Math.abs(dx)) { resetDrag(); return; }
            if (Math.abs(dx) < 10 || Math.abs(dx) < Math.abs(dy) * 1.2) return;
            drag.horizontal = true; media.setPointerCapture(event.pointerId); media.classList.add('is-dragging');
          }
          drag.dx = dx;
          if (!motion.matches) media.style.setProperty('--drag-x', `${Math.max(-60, Math.min(60, dx * .22))}px`);
          event.preventDefault();
        }, { signal });
        media.addEventListener('pointerup', event => {
          if (!drag || drag.id !== event.pointerId) return;
          const { dx, horizontal } = drag;
          resetDrag();
          if (!horizontal) return;
          suppressUntil = performance.now() + 350;
          if (Math.abs(dx) > 36) select((active + (dx < 0 ? 1 : tabs.length - 1)) % tabs.length);
        }, { signal });
        media.addEventListener('pointercancel', resetDrag, { signal });
        media.addEventListener('dragstart', event => event.preventDefault(), { signal });
        media.addEventListener('click', event => {
          if (performance.now() < suppressUntil) { event.preventDefault(); event.stopImmediatePropagation(); }
        }, { signal, capture: true });
        cleanups.push(resetDrag);
      });
      motion.addEventListener('change', () => {
        if (motion.matches) { animations.forEach(a => a.cancel()); animations.clear(); }
      }, { signal });
      return () => { abort.abort(); cleanups.forEach(fn => fn()); animations.forEach(a => a.cancel()); };
    }
  };
})();
