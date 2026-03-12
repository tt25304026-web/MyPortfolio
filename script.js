document.addEventListener('DOMContentLoaded', () => {
    document.documentElement.classList.add('js');

    const navbar = document.querySelector('.navbar');
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;

    // Sticky Navbar on Scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.style.padding = '10px 0';
            navbar.style.background = 'var(--navbar-bg-scrolled)';
        } else {
            navbar.style.padding = '20px 0';
            navbar.style.background = 'var(--navbar-bg)';
        }
    });

    // Mobile Menu Toggle
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuBtn.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    // Smooth Scroll with Offset
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: prefersReducedMotion ? 'auto' : 'smooth'
                });

                // Close mobile menu if open
                navLinks.classList.remove('active');
                const icon = menuBtn.querySelector('i');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        });
    });

    // Simple Animation on Scroll (Intersection Observer)
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.add('reveal'));

    const canAnimateOnScroll = !prefersReducedMotion && 'IntersectionObserver' in window;
    if (!canAnimateOnScroll) {
        sections.forEach(section => section.classList.add('fade-in'));
        return;
    }

    const observerOptions = { threshold: 0.1 };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
});
