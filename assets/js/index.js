const burger = document.getElementById('burger');
const navMenu = document.getElementById('navMenu');

burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    navMenu.classList.toggle('open');
});

navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        burger.classList.remove('open');
        navMenu.classList.remove('open');
    });
});

const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    },
    { threshold: 0.15 }
);
reveals.forEach(el => observer.observe(el));

const links = document.querySelectorAll('.nav-items a');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 90;
    sections.forEach(section => {
        if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
            links.forEach(link => {
                link.classList.toggle('active', link.hash === '#' + section.id);
            });
        }
    });
});