const menuToggle = document.querySelector('.menu-toggle');
const mainMenu = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  const open = menuToggle.classList.toggle('is-open');
  mainMenu.classList.toggle('nav-links-open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
});

mainMenu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('is-open');
    mainMenu.classList.remove('nav-links-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

const signupForm = document.querySelector('.signup-form');
const usernameInput = document.querySelector('#username');
const usernameField = document.querySelector('.username-field');
const signupMessage = document.querySelector('#signup-message');

signupForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const value = usernameInput.value.trim();
  usernameField.classList.remove('field-error');
  signupMessage.classList.remove('message-success');

  if (value.length < 3) {
    usernameField.classList.add('field-error');
    usernameInput.setAttribute('aria-invalid', 'true');
    signupMessage.textContent = 'Your username needs at least 3 characters.';
    return;
  }

  if (!/^[a-zA-Z0-9._-]+$/.test(value)) {
    usernameField.classList.add('field-error');
    usernameInput.setAttribute('aria-invalid', 'true');
    signupMessage.textContent = 'Use only letters, numbers, dots, underscores or hyphens.';
    return;
  }

  usernameInput.setAttribute('aria-invalid', 'false');
  signupMessage.classList.add('message-success');
  signupMessage.textContent = `Nice choice! linktr.ee/${value} is ready to explore.`;
});

usernameInput.addEventListener('input', () => {
  usernameField.classList.remove('field-error');
  usernameInput.setAttribute('aria-invalid', 'false');
  signupMessage.textContent = '';
});

const track = document.querySelector('.carousel-track');
const cards = [...track.children];
const dots = [...document.querySelectorAll('.carousel-dots button')];
const prevButton = document.querySelector('.carousel-prev');
const nextButton = document.querySelector('.carousel-next');
let currentIndex = 0;

function visibleCardCount() {
  return window.innerWidth <= 760 ? 1 : window.innerWidth <= 1050 ? 2 : 3;
}

function cardStep() {
  if (cards.length < 2) return cards[0].getBoundingClientRect().width;
  const first = cards[0].getBoundingClientRect();
  const second = cards[1].getBoundingClientRect();
  return second.left - first.left;
}

function maxIndex() {
  return Math.max(0, cards.length - visibleCardCount());
}

function updateCarousel(animate = true) {
  track.style.transition = animate ? 'transform .48s cubic-bezier(.22,.75,.25,1)' : 'none';
  track.style.transform = `translateX(${-currentIndex * cardStep()}px)`;
  const dotIndex = Math.min(currentIndex, dots.length - 1);
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === dotIndex);
    dot.toggleAttribute('aria-current', index === dotIndex);
  });
}

function move(direction) {
  currentIndex += direction;
  if (currentIndex > maxIndex()) currentIndex = 0;
  if (currentIndex < 0) currentIndex = maxIndex();
  updateCarousel();
}

prevButton.addEventListener('click', () => move(-1));
nextButton.addEventListener('click', () => move(1));
dots.forEach((dot, index) => dot.addEventListener('click', () => {
  currentIndex = Math.min(index, maxIndex());
  updateCarousel();
}));
window.addEventListener('resize', () => {
  if (currentIndex > maxIndex()) currentIndex = maxIndex();
  updateCarousel(false);
});

updateCarousel(false);
