// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Scroll Reveal Animation
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Elements to animate
document.querySelectorAll('section, .skill-card, .project-card, .edu-card').forEach(el => {
  el.classList.add('reveal-init');
  observer.observe(el);
});

// Add CSS for reveal animations dynamically or in style.css? 
// Better to add to style.css. I'll add them to script for now for quick effect if not in CSS.
const style = document.createElement('style');
style.textContent = `
  .reveal-init {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .revealed {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(style);

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const icon = themeToggle.querySelector('i');

// Check for saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  body.classList.add('light-mode');
  icon.classList.replace('fa-moon', 'fa-sun');
}

themeToggle.addEventListener('click', () => {
  body.classList.toggle('light-mode');
  const isLight = body.classList.contains('light-mode');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  
  if (isLight) {
    icon.classList.replace('fa-moon', 'fa-sun');
  } else {
    icon.classList.replace('fa-sun', 'fa-moon');
  }
});

// Active Nav Link on Scroll
const navLinks = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').includes(current)) {
      link.classList.add('active');
    }
  });
});

// EmailJS Form Submission
document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const btn = this.querySelector('button');
  const originalText = btn.innerHTML;
  
  btn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';
  btn.disabled = true;

  emailjs.sendForm("service_ga7n2n3", "template_xvel5ri", this)
    .then(() => {
      btn.innerHTML = 'Sent! <i class="fa-solid fa-check"></i>';
      btn.style.background = '#4CAF50';
      this.reset();
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
        btn.disabled = false;
      }, 3000);
    }, (error) => {
      alert("❌ Failed to send message");
      btn.innerHTML = originalText;
      btn.disabled = false;
      console.log(error);
    });
});
