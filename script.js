const header = document.querySelector('.header');
const menuButton = document.querySelector('.menu-button');

const updateHeaderState = () => header?.classList.toggle('scrolled', window.scrollY > 12);
window.addEventListener('scroll', updateHeaderState, { passive:true });
updateHeaderState();

menuButton?.addEventListener('click', () => {
  const open = header.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
});

document.querySelectorAll('.nav a').forEach((link) => {
  link.addEventListener('click', () => {
    header.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'Abrir menu');
  });
});

const solutionItems = document.querySelectorAll('.solution');
solutionItems.forEach((item) => {
  const trigger = item.querySelector('.solution-trigger');
  trigger.addEventListener('click', () => {
    const willOpen = !item.classList.contains('active');
    solutionItems.forEach((other) => {
      other.classList.remove('active');
      other.querySelector('.solution-trigger').setAttribute('aria-expanded', 'false');
    });
    if (willOpen) {
      item.classList.add('active');
      trigger.setAttribute('aria-expanded', 'true');
    }
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('shown');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
requestAnimationFrame(() => document.querySelectorAll('.entrance').forEach((element) => element.classList.add('shown')));

window.addEventListener('pointermove', (event) => {
  document.documentElement.style.setProperty('--cursor-x', `${event.clientX}px`);
  document.documentElement.style.setProperty('--cursor-y', `${event.clientY}px`);
}, { passive: true });

const hero = document.querySelector('.hero');
const heroHud = document.querySelector('.gcl-hud');

if (hero && heroHud && 'IntersectionObserver' in window) {
  const heroAnimationObserver = new IntersectionObserver(([entry]) => {
    heroHud.classList.toggle('is-paused', !entry.isIntersecting);
  }, { threshold:0.08 });

  heroAnimationObserver.observe(hero);
}
