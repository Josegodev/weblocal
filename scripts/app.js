(function () {
    const tabTriggers = document.querySelectorAll('[data-tab]');
    const tabLinks = document.querySelectorAll('.tab-link');
    const sections = document.querySelectorAll('.tab-content');
    const menuToggle = document.querySelector('.menu-toggle');
    const validTabs = Array.from(sections).map(function (section) {
        return section.id;
    });

    function closeMenu() {
        document.body.classList.remove('menu-open');
        if (menuToggle) {
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    }

    function getTabFromHash() {
        const hash = window.location.hash.replace('#', '');
        return validTabs.includes(hash) ? hash : 'inicio';
    }

    function activateTab(tabId) {
        const nextTab = validTabs.includes(tabId) ? tabId : 'inicio';

        sections.forEach(function (section) {
            section.classList.toggle('active', section.id === nextTab);
        });

        tabLinks.forEach(function (link) {
            const isActive = link.getAttribute('data-tab') === nextTab;
            link.classList.toggle('active', isActive);
            if (isActive) {
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });

        closeMenu();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    tabTriggers.forEach(function (trigger) {
        trigger.addEventListener('click', function (event) {
            const tabId = trigger.getAttribute('data-tab');
            if (!tabId) return;

            event.preventDefault();
            if (window.location.hash === '#' + tabId) {
                activateTab(tabId);
            } else {
                window.location.hash = tabId;
            }
        });
    });

    if (menuToggle) {
        menuToggle.addEventListener('click', function () {
            const isOpen = document.body.classList.toggle('menu-open');
            menuToggle.setAttribute('aria-expanded', String(isOpen));
        });
    }

    window.addEventListener('hashchange', function () {
        activateTab(getTabFromHash());
    });

    window.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            closeMenu();
        }
    });

    activateTab(getTabFromHash());
})();
