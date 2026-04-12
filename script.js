const themeToggle = document.getElementById("theme-toggle");
const menuToggle = document.getElementById("menu-toggle");
const mobileNav = document.getElementById("mobile-nav");
const body = document.body;
const mobileLinks = mobileNav ? mobileNav.querySelectorAll("a") : [];

function syncThemeLabel(theme) {
  if (!themeToggle) {
    return;
  }

  themeToggle.textContent = theme === "dark" ? "Light mode" : "Dark mode";
}

function applyTheme(theme) {
  body.setAttribute("data-theme", theme);
  syncThemeLabel(theme);
  window.localStorage.setItem("portfolio-theme", theme);
}

function toggleMobileNav(forceOpen) {
  if (!mobileNav || !menuToggle) {
    return;
  }

  const isOpen =
    typeof forceOpen === "boolean" ? forceOpen : !mobileNav.classList.contains("is-open");

  mobileNav.classList.toggle("is-open", isOpen);
  menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
}

const savedTheme = window.localStorage.getItem("portfolio-theme");
applyTheme(savedTheme === "dark" ? "dark" : "light");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    applyTheme(body.getAttribute("data-theme") === "dark" ? "light" : "dark");
  });
}

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    toggleMobileNav();
  });
}

mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    toggleMobileNav(false);
  });
});
