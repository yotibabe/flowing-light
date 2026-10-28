/* Screenshot tabs and original-image viewing for the workbench case study. */
(() => {
  let cleanup = () => {};
  let dialogSequence = 0;

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
    let dialog = null;
    let image = null;
    let title = null;
    let viewport = null;
    let sizeButton = null;
    let returnFocus = null;
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

    function setActualSize(actual) {
      dialog.classList.toggle('is-actual-size', actual);
      sizeButton.setAttribute('aria-pressed', String(actual));
      sizeButton.textContent = actual ? '适应窗口' : '原尺寸';
      viewport.scrollTop = 0;
      viewport.scrollLeft = 0;
    }

    function closeImage() {
      if (dialog?.open) dialog.close();
    }

    function createDialog() {
      dialog = document.createElement('dialog');
      dialog.className = 'wb-lightbox';
      const header = document.createElement('div');
      header.className = 'wb-lightbox-header';
      title = document.createElement('h2');
      title.className = 'wb-lightbox-title';
      title.id = `wb-lightbox-title-${++dialogSequence}`;
      dialog.setAttribute('aria-labelledby', title.id);
      const actions = document.createElement('div');
      actions.className = 'wb-lightbox-actions';
      sizeButton = document.createElement('button');
      sizeButton.type = 'button';
      sizeButton.className = 'wb-lightbox-size';
      const closeButton = document.createElement('button');
      closeButton.type = 'button';
      closeButton.className = 'wb-lightbox-close';
      closeButton.textContent = '关闭';
      closeButton.setAttribute('aria-label', '关闭截图');
      closeButton.autofocus = true;
      actions.append(sizeButton, closeButton);
      header.append(title, actions);
      viewport = document.createElement('div');
      viewport.className = 'wb-lightbox-viewport';
      image = document.createElement('img');
      image.className = 'wb-lightbox-image';
      image.draggable = false;
      viewport.append(image);
      dialog.append(header, viewport);
      document.body.append(dialog);

      sizeButton.addEventListener('click', () => {
        setActualSize(!dialog.classList.contains('is-actual-size'));
      }, { signal });
      closeButton.addEventListener('click', closeImage, { signal });
      dialog.addEventListener('cancel', event => {
        event.preventDefault();
        closeImage();
      }, { signal });
      dialog.addEventListener('close', () => {
        if (!dialog.open && returnFocus?.isConnected) {
          returnFocus.focus({ preventScroll: true });
        }
      }, { signal });
      dialog.addEventListener('click', event => {
        if (event.target === dialog || event.target === viewport) closeImage();
      }, { signal });
    }

    function openImage(button) {
      const source = button.dataset.wbZoom;
      if (!source) return;
      if (!dialog) createDialog();
      returnFocus = button;
      const label = button.dataset.wbTitle || '工作台截图';
      image.src = source;
      image.alt = label;
      title.textContent = label;
      setActualSize(false);
      if (!dialog.open) dialog.showModal();
    }

    showcase.addEventListener('click', event => {
      if (!(event.target instanceof Element)) return;
      const tab = event.target.closest('[data-wb-tab]');
      if (tab && showcase.contains(tab)) select(tab.dataset.wbTab);
      const zoom = event.target.closest('[data-wb-zoom]');
      if (zoom && showcase.contains(zoom)) openImage(zoom);

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
      if (dialog) {
        if (dialog.open) dialog.close();
        dialog.remove();
      }
      cleanup = () => {};
    };
  }

  window.YotiWorkbench = { mount, destroy: () => cleanup() };
})();
