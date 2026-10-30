/* Screenshot tabs for the workbench case study. */
(() => {
  let cleanup = () => {};

  function mount(root) {
    cleanup();
    const showcase = root?.querySelector('.workbench-refined');
    if (!showcase) return;

    const abort = new AbortController();
    const { signal } = abort;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const tabs = [...showcase.querySelectorAll('[data-wb-tab]')];
    const panels = [...showcase.querySelectorAll('[data-wb-panel]')];
    const pairs = tabs.map(tab => ({
      tab,
      panel: panels.find(panel => panel.dataset.wbPanel === tab.dataset.wbTab)
    })).filter(pair => pair.panel);
    let activeKey = null;
    let entrance = null;
    const stopFlow = window.YotiWorkbenchFlow?.mount(showcase) || (() => {});
    const stopTactile = window.YotiTactile?.mount(showcase) || (() => {});

    function cancelEntrance() {
      entrance?.cancel();
      entrance = null;
    }

    function select(key, animate = true) {
      const selected = pairs.find(pair => pair.tab.dataset.wbTab === key);
      if (!selected || activeKey === key) return;
      cancelEntrance();
      activeKey = key;
      tabs.forEach(tab => {
        const isSelected = tab === selected.tab;
        tab.setAttribute('aria-selected', String(isSelected));
        tab.tabIndex = isSelected ? 0 : -1;
      });
      panels.forEach(panel => { panel.hidden = panel !== selected.panel; });
      if (animate && !motion.matches && selected.panel.animate) {
        const animation = selected.panel.animate([
          { opacity: 0, transform: 'translateY(8px)' },
          { opacity: 1, transform: 'translateY(0)' }
        ], { duration: 250, easing: 'cubic-bezier(.22, 1, .36, 1)' });
        entrance = animation;
        animation.addEventListener('finish', () => {
          if (entrance === animation) entrance = null;
        }, { once: true, signal });
      }
    }

    pairs.forEach(({ tab, panel }) => {
      const key = tab.dataset.wbTab;
      if (!tab.id) tab.id = `wb-tab-${key}`;
      if (!panel.id) panel.id = `wb-panel-${key}`;
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-controls', panel.id);
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-labelledby', tab.id);
    });
    const tablist = showcase.querySelector('[role="tablist"]');
    if (tablist) tablist.setAttribute('aria-orientation', 'horizontal');
    select(pairs.some(pair => pair.tab.dataset.wbTab === 'tracking')
      ? 'tracking' : pairs[0]?.tab.dataset.wbTab, false);

    showcase.addEventListener('click', event => {
      if (!(event.target instanceof Element)) return;
      const tab = event.target.closest('[data-wb-tab]');
      if (tab && showcase.contains(tab)) select(tab.dataset.wbTab);
    }, { signal });

    showcase.addEventListener('keydown', event => {
      if (!(event.target instanceof Element)) return;
      const tab = event.target.closest('[data-wb-tab]');
      const index = pairs.findIndex(pair => pair.tab === tab);
      if (index < 0 || event.altKey || event.ctrlKey || event.metaKey) return;
      let next = index;
      if (event.key === 'ArrowRight') next = (index + 1) % pairs.length;
      else if (event.key === 'ArrowLeft') next = (index - 1 + pairs.length) % pairs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = pairs.length - 1;
      else return;
      event.preventDefault();
      select(pairs[next].tab.dataset.wbTab);
      pairs[next].tab.focus({ preventScroll: true });
    }, { signal });

    motion.addEventListener('change', () => {
      if (motion.matches) cancelEntrance();
    }, { signal });

    cleanup = () => {
      abort.abort();
      cancelEntrance();
      stopFlow();
      stopTactile();
      cleanup = () => {};
    };
  }

  window.YotiWorkbench = { mount, destroy: () => cleanup() };
})();
