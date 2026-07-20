document.querySelector('nav a').ForEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();


        const targetId = this.getAttribute('href');
        const section = document.querySelector(targetId);

        section.scrollIntoView({
            behavior: 'smooth'
        });
    });
});


const cards = document.querySelectorAll('.card');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.2 });

cards.forEach(card => {
    card.style.opacity = 0;
    card.style.transform = 'translateY(30px)';
    card.style.transition = '0.6s ease';
    observer.observe(card);
});