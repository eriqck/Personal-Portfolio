function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  const expanded = icon.classList.toggle("open");

  menu.classList.toggle("open", expanded);
  icon.setAttribute("aria-expanded", expanded ? "true" : "false");
}
