(function () {
    const tabs = document.querySelectorAll('.tab-link');
    const contents = document.querySelectorAll('.tab-content');

    function activateTab(tabId) {
        tabs.forEach(function (link) {
            const isActive = link.getAttribute('data-tab') === tabId;
            link.classList.toggle('active', isActive);
        });

        contents.forEach(function (section) {
            const isActive = section.id === tabId;
            section.classList.toggle('active', isActive);
        });
    }

    function getTabFromHash() {
        const hash = window.location.hash.replace('#', '');
        if (hash) {
            const match = document.querySelector('.tab-link[data-tab="' + hash + '"]');
            if (match) return hash;
        }
        return 'inicio';
    }

    function handleTabClick(e) {
        e.preventDefault();
        const tabId = this.getAttribute('data-tab');
        window.location.hash = tabId;
        activateTab(tabId);
    }

    tabs.forEach(function (link) {
        link.addEventListener('click', handleTabClick);
    });

    window.addEventListener('hashchange', function () {
        const tabId = getTabFromHash();
        activateTab(tabId);
    });

    const initialTab = getTabFromHash();
    if (window.location.hash !== '#' + initialTab) {
        window.location.hash = initialTab;
    }
    activateTab(initialTab);
})();
