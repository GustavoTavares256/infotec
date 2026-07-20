document.addEventListener('DOMContentLoaded', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------------------------------------------
       Mobile nav toggle
    --------------------------------------------- */
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('is-open');
            navToggle.setAttribute('aria-expanded', String(isOpen));
            navToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
        });

        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('is-open');
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.setAttribute('aria-label', 'Abrir menu');
            });
        });
    }

    /* ---------------------------------------------
       Status console: animated counters
    --------------------------------------------- */
    const counters = document.querySelectorAll('[data-count-to]');

    function animateCounter(el) {
        const target = parseFloat(el.dataset.countTo);
        const suffix = el.dataset.suffix || '';
        const isDecimal = String(target).includes('.');

        if (prefersReducedMotion) {
            el.textContent = target + suffix;
            return;
        }

        const duration = 1200;
        const start = performance.now();

        function tick(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const value = target * eased;
            el.textContent = (isDecimal ? value.toFixed(1) : Math.round(value)) + suffix;
            if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
    }

    if (counters.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.4 });

        counters.forEach(el => observer.observe(el));
    }

    /* ---------------------------------------------
       Status console: "last checked" timestamp
    --------------------------------------------- */
    const lastCheck = document.getElementById('last-check');
    if (lastCheck) {
        const checkedAt = Date.now();
        const update = () => {
            const seconds = Math.floor((Date.now() - checkedAt) / 1000);
            lastCheck.textContent = seconds < 60 ? 'agora mesmo' : `há ${Math.floor(seconds / 60)} min`;
        };
        setInterval(update, 30000);
    }

    /* ---------------------------------------------
       Contact form -> prefilled WhatsApp message
    --------------------------------------------- */
    const form = document.getElementById('contato-form');
    const WHATSAPP_NUMBER = '88994180565';

    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const nome = form.nome.value.trim();
            const mensagem = form.mensagem.value.trim();

            const text = `Olá! Meu nome é ${nome}.\n\n${mensagem}`;
            const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

            window.open(url, '_blank', 'noopener');
        });
    }
});