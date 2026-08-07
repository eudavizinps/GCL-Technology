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

const cursorOrbit = document.querySelector('.cursor-orbit');
const canUseCustomCursor = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (cursorOrbit && canUseCustomCursor && !prefersReducedMotion) {
  const cursorPosition = { x:-60, y:-60, targetX:-60, targetY:-60 };
  document.body.classList.add('has-custom-cursor');

  const renderCursor = () => {
    cursorPosition.x += (cursorPosition.targetX - cursorPosition.x) * .18;
    cursorPosition.y += (cursorPosition.targetY - cursorPosition.y) * .18;
    cursorOrbit.style.transform = `translate3d(${cursorPosition.x}px,${cursorPosition.y}px,0) translate(-50%,-50%)`;
    requestAnimationFrame(renderCursor);
  };

  window.addEventListener('pointermove', (event) => {
    cursorPosition.targetX = event.clientX;
    cursorPosition.targetY = event.clientY;
    cursorOrbit.classList.add('is-visible');
    const target = event.target instanceof Element ? event.target.closest('a, button') : null;
    cursorOrbit.classList.toggle('is-hovering', Boolean(target));
  }, { passive:true });

  window.addEventListener('pointerdown', () => {
    cursorOrbit.classList.add('is-clicking');
    window.setTimeout(() => cursorOrbit.classList.remove('is-clicking'), 420);
  }, { passive:true });

  requestAnimationFrame(renderCursor);
}

const contactStar = document.querySelector('.contact-star');
if (contactStar && canUseCustomCursor && !prefersReducedMotion) {
  contactStar.addEventListener('pointerenter', () => contactStar.classList.add('is-active'));
  contactStar.addEventListener('pointerleave', () => contactStar.classList.remove('is-active'));
}

const hero = document.querySelector('.hero');
const heroHud = document.querySelector('.gcl-hud');

if (hero && heroHud && 'IntersectionObserver' in window) {
  const heroAnimationObserver = new IntersectionObserver(([entry]) => {
    heroHud.classList.toggle('is-paused', !entry.isIntersecting);
  }, { threshold:0.08 });

  heroAnimationObserver.observe(hero);
}
