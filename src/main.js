import './style.css'

// Typing Effect for Hero Section
const phrases = [
  "Software Engineer",
  "Frontend Developer",
  "UI/UX Enthusiast",
  "Problem Solver"
];

let currentPhraseIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let typingSpeed = 100;
let deletingSpeed = 50;
let delayBetweenPhrases = 2000;

const typingElement = document.getElementById("typing-text");

function type() {
  if (!typingElement) return;

  const currentPhrase = phrases[currentPhraseIndex];
  
  if (isDeleting) {
    typingElement.textContent = currentPhrase.substring(0, currentCharIndex - 1);
    currentCharIndex--;
    typingSpeed = deletingSpeed;
  } else {
    typingElement.textContent = currentPhrase.substring(0, currentCharIndex + 1);
    currentCharIndex++;
    typingSpeed = 100;
  }

  if (!isDeleting && currentCharIndex === currentPhrase.length) {
    isDeleting = true;
    typingSpeed = delayBetweenPhrases; // Pause before deleting
  } else if (isDeleting && currentCharIndex === 0) {
    isDeleting = false;
    currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
    typingSpeed = 500; // Pause before typing next word
  }

  setTimeout(type, typingSpeed);
}

// Start typing effect on load
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(type, 1000);
});


// Intersection Observer for scroll animations
const fadeElements = document.querySelectorAll('.pop-in');

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // Stop observing once it's visible
    }
  });
}, observerOptions);

fadeElements.forEach(el => observer.observe(el));


// Mobile Navigation Hamburger
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    // In a real app, you'd toggle a class to show/hide with transition.
    // For now, simple toggle
    if (navLinks.style.display === 'flex') {
      navLinks.style.display = 'none';
    } else {
      navLinks.style.display = 'flex';
      navLinks.style.flexDirection = 'column';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '100%';
      navLinks.style.left = '0';
      navLinks.style.width = '100%';
      navLinks.style.background = '#fdf1cd'; // Match neobrutalism bg
      navLinks.style.borderBottom = '4px solid #000';
      navLinks.style.padding = '2rem 0';
    }
  });
}
