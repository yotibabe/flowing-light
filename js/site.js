window.FlowingLight = (() => {
    const focusableSelector = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

    function getFocusableElements(container) {
        return Array.from(container.querySelectorAll(focusableSelector)).filter((element) => {
            return !element.hasAttribute('disabled') && element.getAttribute('aria-hidden') !== 'true';
        });
    }

    function setupModal(options = {}) {
        const modal = document.getElementById(options.modalId);
        const backdrop = document.getElementById(options.backdropId);
        const content = document.getElementById(options.contentId);
        const closeButton = document.getElementById(options.closeButtonId);
        const title = document.getElementById(options.titleId);
        const tag = document.getElementById(options.tagId);
        const description = document.getElementById(options.descriptionId);
        const image = document.getElementById(options.imageId);
        const triggers = document.querySelectorAll(options.triggerSelector || '[data-modal-trigger]');

        if (!modal || !backdrop || !content || !closeButton || !triggers.length) {
            return;
        }

        let lastFocusedElement = null;
        let activeTrigger = null;

        function syncContent(trigger) {
            if (!trigger) {
                return;
            }

            if (title && trigger.dataset.modalTitle) {
                title.innerHTML = trigger.dataset.modalTitle;
            }

            if (tag && trigger.dataset.modalTag) {
                tag.textContent = trigger.dataset.modalTag;
            }

            if (description && trigger.dataset.modalDescription) {
                description.innerHTML = trigger.dataset.modalDescription;
            }

            if (image && trigger.dataset.modalImage) {
                image.src = trigger.dataset.modalImage;
            }

            if (image && trigger.dataset.modalAlt) {
                image.alt = trigger.dataset.modalAlt;
            }
        }

        function openModal(trigger) {
            activeTrigger = trigger;
            lastFocusedElement = document.activeElement;
            syncContent(trigger);
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            modal.setAttribute('aria-hidden', 'false');
            void modal.offsetWidth;
            backdrop.classList.remove('opacity-0');
            backdrop.classList.add('opacity-100');
            content.classList.remove('scale-95', 'opacity-0');
            content.classList.add('scale-100', 'opacity-100');
            document.body.style.overflow = 'hidden';
            closeButton.focus();
        }

        function closeModal() {
            backdrop.classList.remove('opacity-100');
            backdrop.classList.add('opacity-0');
            content.classList.remove('scale-100', 'opacity-100');
            content.classList.add('scale-95', 'opacity-0');
            modal.setAttribute('aria-hidden', 'true');
            window.setTimeout(() => {
                modal.classList.remove('flex');
                modal.classList.add('hidden');
                document.body.style.overflow = '';
                if (lastFocusedElement instanceof HTMLElement) {
                    lastFocusedElement.focus();
                }
            }, 300);
        }

        function onKeydown(event) {
            if (modal.classList.contains('hidden')) {
                return;
            }

            if (event.key === 'Escape') {
                event.preventDefault();
                closeModal();
                return;
            }

            if (event.key !== 'Tab') {
                return;
            }

            const focusableElements = getFocusableElements(content);

            if (!focusableElements.length) {
                event.preventDefault();
                closeButton.focus();
                return;
            }

            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (event.shiftKey && document.activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus();
            } else if (!event.shiftKey && document.activeElement === lastElement) {
                event.preventDefault();
                firstElement.focus();
            }
        }

        triggers.forEach((trigger) => {
            trigger.addEventListener('click', (event) => {
                if (trigger.tagName === 'A') {
                    event.preventDefault();
                }
                openModal(trigger);
            });
        });

        closeButton.addEventListener('click', closeModal);
        backdrop.addEventListener('click', closeModal);
        document.addEventListener('keydown', onKeydown);

        if (activeTrigger && window.location.hash === activeTrigger.getAttribute('href')) {
            openModal(activeTrigger);
        }
    }

    return {
        setupModal
    };
})();
