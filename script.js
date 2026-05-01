// Smooth animation on scroll
const cards = document.querySelectorAll(".project-card, .card, .skill-card");

window.addEventListener("scroll", () => {
  cards.forEach(card => {
    const top = card.getBoundingClientRect().top;
    if (top < window.innerHeight - 50) {
      card.style.opacity = 1;
      card.style.transform = "translateY(0)";
    }
  });
});

// initial state
cards.forEach(card => {
  card.style.opacity = 0;
  card.style.transform = "translateY(40px)";
  card.style.transition = "0.6s";
});

// Active nav link highlighting on scroll
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("nav a");

const observerOptions = {
  root: null,
  rootMargin: "-50% 0px -50% 0px",
  threshold: 0
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute("id");
      navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${id}`) {
          link.classList.add("active");
        }
      });
    }
  });
}, observerOptions);

sections.forEach(section => observer.observe(section));

// EmailJS Form Submission
document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();

  emailjs.sendForm(
    "service_ga7n2n3",
    "template_xvel5ri",
    this
  )
    .then(function () {
      alert("✅ Message sent successfully!");
    }, function (error) {
      alert("❌ Failed to send message");
      console.log(error);
    });
});
