const typingElement = document.getElementById("typing");
const phrases = [
  "Desenvolvedor Web • Front-End • Soluções Digitais",
  "Automação, dashboards e sistemas empresariais",
  "Foco em performance, usabilidade e evolução contínua",
];

let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function runTyping() {
  if (!typingElement) return;

  const phrase = phrases[phraseIndex];
  typingElement.textContent = phrase.slice(0, charIndex);

  if (!deleting && charIndex < phrase.length) {
    charIndex += 1;
    setTimeout(runTyping, 45);
    return;
  }

  if (!deleting && charIndex === phrase.length) {
    deleting = true;
    setTimeout(runTyping, 1500);
    return;
  }

  if (deleting && charIndex > 0) {
    charIndex -= 1;
    setTimeout(runTyping, 26);
    return;
  }

  deleting = false;
  phraseIndex = (phraseIndex + 1) % phrases.length;
  setTimeout(runTyping, 250);
}

runTyping();

const stats = document.querySelectorAll(".stat strong");
const visibleMap = new WeakMap();

function animateCounter(node) {
  if (visibleMap.get(node)) return;
  visibleMap.set(node, true);

  const target = Number(node.dataset.target || "0");
  if (Number.isNaN(target)) return;

  let current = 0;
  const step = Math.max(1, Math.ceil(target / 30));
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      node.textContent = String(target);
      clearInterval(timer);
      return;
    }
    node.textContent = String(current);
  }, 32);
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) animateCounter(entry.target);
    });
  },
  { threshold: 0.5 }
);

stats.forEach((stat) => observer.observe(stat));

const buttons = document.querySelectorAll(".filter");
const experiences = document.querySelectorAll(".experience");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    buttons.forEach((b) => b.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;
    experiences.forEach((item) => {
      const show = filter === "all" || item.dataset.category === filter;
      item.style.display = show ? "block" : "none";
    });
  });
});

const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());
