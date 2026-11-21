const search = document.querySelector('#legalSearch');
const cards = [...document.querySelectorAll('.searchable')];
const noResults = document.querySelector('#legalNoResults');

if (search) {
    search.addEventListener('input', () => {
        const term = search.value.trim().toLowerCase();
        let visible = 0;
        cards.forEach(card => {
            const matches = card.dataset.search.includes(term) || card.textContent.toLowerCase().includes(term);
            card.hidden = !matches;
            if (matches) visible += 1;
        });
        if (noResults) noResults.hidden = visible !== 0;
    });
}

const menuToggle = document.querySelector('.menu-toggle');
const mainNavigation = document.querySelector('#main-navigation');

function closeMenu() {
    if (!menuToggle || !mainNavigation) return;
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menú');
    mainNavigation.classList.remove('is-open');
}

if (menuToggle && mainNavigation) {
    menuToggle.addEventListener('click', () => {
        const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', String(!isOpen));
        menuToggle.setAttribute('aria-label', isOpen ? 'Abrir menú' : 'Cerrar menú');
        mainNavigation.classList.toggle('is-open', !isOpen);
    });

    mainNavigation.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') closeMenu();
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 900) closeMenu();
    });
}
