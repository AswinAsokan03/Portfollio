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
    navLinks.classList.toggle('active');
  });

  // Close menu when a link is clicked
  const links = navLinks.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });
}

// Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    document.body.setAttribute('data-theme', isDark ? 'light' : 'dark');
    
    const icon = themeToggle.querySelector('i');
    if (isDark) {
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
    } else {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    }
  });
}

// Handle Contact Form Submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button');
    const originalText = btn.textContent;
    btn.textContent = 'Sending...';
    btn.style.opacity = '0.7';
    
    try {
      const response = await fetch(contactForm.action, {
        method: contactForm.method,
        body: new FormData(contactForm),
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        btn.textContent = 'Message Sent!';
        contactForm.reset();
      } else {
        btn.textContent = 'Error! Try Again.';
      }
    } catch (error) {
      btn.textContent = 'Error! Try Again.';
    }
    
    btn.style.opacity = '1';
    
    setTimeout(() => {
      btn.textContent = originalText;
    }, 3000);
  });
}
