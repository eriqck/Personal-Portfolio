const projects = [
  {
    name: "Ticketia",
    type: "Event Ticketing Platform",
    tone: "dark",
    image: "./assets/ticketia.png",
    summary:
      "A focused ticketing experience that helps people discover events and gives organizers a clear path to publish and manage them.",
    link: "https://ticketia.live/",
    github: "https://github.com/eriqck/ticketia",
  },
];

function createProjectCard(project) {
  const article = document.createElement("article");
  article.className = "gallery-card gallery-card--featured";
  article.dataset.tone = project.tone;

  article.innerHTML = `
    <div class="gallery-card__media">
      <img class="gallery-card__image" src="${project.image}" alt="${project.name} preview" />
    </div>
    <div class="gallery-card__content">
      <p class="gallery-card__type">${project.type}</p>
      <h3>${project.name}</h3>
      <p class="gallery-card__summary">${project.summary}</p>
      <div class="gallery-card__links">
        <a class="gallery-card__primary-link" href="${project.link}" target="_blank" rel="noreferrer">Visit live site <span aria-hidden="true">↗</span></a>
        <a class="gallery-card__secondary-link" href="${project.github}" target="_blank" rel="noreferrer">View source <span aria-hidden="true">↗</span></a>
      </div>
    </div>
  `;

  return article;
}

function renderGallery() {
  const gallery = document.getElementById("project-gallery");
  if (!gallery) return;

  projects.slice(0, 4).forEach((project) => {
    gallery.appendChild(createProjectCard(project));
  });
}

function renderLedger() {
  const ledger = document.getElementById("ledger-list");
  if (!ledger) return;

  projects.forEach((project) => {
    const item = document.createElement("article");
    item.className = "ledger-item";
    item.innerHTML = `
      <h3><a href="${project.link}" target="_blank" rel="noreferrer">${project.name}</a></h3>
      <p>${project.summary}</p>
      ${
        project.github
          ? `<a class="ledger-item__repo" href="${project.github}" target="_blank" rel="noreferrer">View on GitHub</a>`
          : ""
      }
    `;
    ledger.appendChild(item);
  });
}

function setupMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const mobileNav = document.querySelector(".mobile-nav");
  if (!toggle || !mobileNav) return;

  toggle.addEventListener("click", () => {
    const isOpen = mobileNav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function setupContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const firstName = formData.get("firstName") || "";
    const lastName = formData.get("lastName") || "";
    const email = formData.get("email") || "";
    const message = formData.get("message") || "";

    const subject = encodeURIComponent(`Portfolio inquiry from ${firstName} ${lastName}`.trim());
    const body = encodeURIComponent(`Name: ${firstName} ${lastName}\nEmail: ${email}\n\n${message}`);

    window.location.href = `mailto:ericdavid348@gmail.com?subject=${subject}&body=${body}`;
  });
}

function setupHeroTyping() {
  const target = document.querySelector(".terminal-text");
  if (!target) return;

  const fullText = target.dataset.text || target.textContent || "";
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (prefersReducedMotion.matches) {
    target.textContent = fullText;
    return;
  }

  let index = 0;
  let deleting = false;

  const tick = () => {
    target.textContent = fullText.slice(0, index);

    if (!deleting && index < fullText.length) {
      index += 1;
      window.setTimeout(tick, 90);
      return;
    }

    if (!deleting && index === fullText.length) {
      deleting = true;
      window.setTimeout(tick, 1400);
      return;
    }

    if (deleting && index > 0) {
      index -= 1;
      window.setTimeout(tick, 42);
      return;
    }

    deleting = false;
    window.setTimeout(tick, 420);
  };

  target.textContent = "";
  tick();
}

function setupServicesTerminal() {
  const container = document.getElementById("services-terminal-lines");
  if (!container) return;

  const lines = [
    {
      label: "passion:",
      text: "I love building useful products that feel clear, fast, and easy to trust.",
      tone: "passion",
    },
    {
      label: "automation:",
      text: "I design smart business automation that removes manual steps and keeps work moving.",
      tone: "automation",
    },
    {
      label: "whatsapp-bots:",
      text: "Custom WhatsApp bots for support, lead capture, booking, reminders, and follow-up flows.",
      tone: "whatsapp",
    },
    {
      label: "payments:",
      text: "Payment gateway integration with clean checkout logic, confirmations, and transaction handling.",
      tone: "payments",
    },
    {
      label: "systems:",
      text: "Dashboards, admin tools, storefronts, APIs, and product systems built around real business needs.",
      tone: "systems",
    },
    {
      label: "goal:",
      text: "Turn ideas into dependable software that helps people work smarter and sell more smoothly.",
      tone: "closing",
    },
  ];

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const renderStatic = () => {
    container.innerHTML = lines
      .map(
        (line) => `
          <div class="services-terminal__line services-terminal__line--${line.tone}">
            <span class="services-terminal__label">${line.label}</span>
            <span class="services-terminal__text">${line.text}</span>
          </div>
        `
      )
      .join("");
  };

  if (prefersReducedMotion.matches) {
    renderStatic();
    return;
  }

  let lineIndex = 0;

  const typeLine = () => {
    if (lineIndex >= lines.length) {
      window.setTimeout(() => {
        container.innerHTML = "";
        lineIndex = 0;
        typeLine();
      }, 2200);
      return;
    }

    const line = lines[lineIndex];
    const row = document.createElement("div");
    row.className = `services-terminal__line services-terminal__line--${line.tone}`;

    const label = document.createElement("span");
    label.className = "services-terminal__label";
    label.textContent = line.label;

    const text = document.createElement("span");
    text.className = "services-terminal__text services-terminal__typing";

    const content = document.createElement("span");
    const cursor = document.createElement("span");
    cursor.className = "services-terminal__cursor";
    cursor.setAttribute("aria-hidden", "true");

    text.append(content, cursor);
    row.append(label, text);
    container.append(row);

    let charIndex = 0;

    const tick = () => {
      content.textContent = line.text.slice(0, charIndex);

      if (charIndex < line.text.length) {
        charIndex += 1;
        window.setTimeout(tick, 22);
        return;
      }

      text.classList.remove("services-terminal__typing");
      cursor.remove();
      lineIndex += 1;
      window.setTimeout(typeLine, 240);
    };

    tick();
  };

  container.innerHTML = "";
  typeLine();
}

renderGallery();
renderLedger();
setupMenu();
setupContactForm();
setupHeroTyping();
setupServicesTerminal();
