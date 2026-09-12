const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const mobileMenu = document.getElementById("mobileMenu");
const navbar = document.getElementById("navbar");
const progress = document.getElementById("progress");

function setTheme(theme) {
  root.setAttribute("data-theme", theme);
  localStorage.setItem("archit-theme", theme);
  themeIcon.textContent = theme === "dark" ? "☀" : "☾";
  themeToggle.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
  themeToggle.dataset.tip = theme === "dark" ? "Light mode" : "Dark mode";
}
const saved = localStorage.getItem("archit-theme");
setTheme(saved || "light");

themeToggle.addEventListener("click", () => {
  setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
});

mobileMenu.addEventListener("click", () => navbar.classList.toggle("menu-open"));
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => navbar.classList.remove("menu-open"));
});

function updateProgress() {
  const scrollTop = window.scrollY;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${height > 0 ? (scrollTop / height) * 100 : 0}%`;
}
window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", (e) => {
    const target = document.querySelector(anchor.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});
