const whatsappNumber = "905536759110";

function whatsappUrl(message) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

document.querySelectorAll("[data-whatsapp]").forEach((link) => {
  link.href = whatsappUrl(link.dataset.whatsapp);
  link.target = "_blank";
  link.rel = "noopener noreferrer";
});

document.querySelectorAll("[data-service]").forEach((link) => {
  const service = link.dataset.service;
  const message = `Merhaba Bizim Temizlik, ${service} hizmetiniz hakkında bilgi ve fiyat almak istiyorum.`;
  link.href = whatsappUrl(message);
  link.target = "_blank";
  link.rel = "noopener noreferrer";
});

const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector(".primary-nav");

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute("aria-label", isExpanded ? "Menüyü aç" : "Menüyü kapat");
  primaryNav.classList.toggle("is-open", !isExpanded);
});

primaryNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    primaryNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Menüyü aç");
  });
});

document.querySelector("#contact-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const name = formData.get("name").trim();
  const phone = formData.get("phone").trim();
  const service = formData.get("service").trim();
  const message = formData.get("message").trim();
  const whatsappMessage = [
    "Merhaba Bizim Temizlik.",
    `Ad Soyad: ${name}`,
    `Telefon: ${phone}`,
    `İlgilendiğim Hizmet: ${service}`,
    `Mesaj: ${message || "Belirtilmedi"}`
  ].join("\n");

  window.open(whatsappUrl(whatsappMessage), "_blank", "noopener,noreferrer");
});

document.querySelector("#current-year").textContent = new Date().getFullYear();

function initScrollAnimations() {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reducedMotion || !("IntersectionObserver" in window)) return;

  const revealSelectors = [
    ".section-heading .eyebrow",
    ".section-heading h2",
    ".section-heading > p:last-child",
    ".trust-grid > div",
    ".services-grid .service-card",
    ".why-intro",
    ".benefit-grid .benefit",
    ".process-list li",
    ".about-image",
    ".about-copy",
    ".faq-intro",
    ".faq-list",
    ".contact-copy",
    ".contact-form"
  ];

  revealSelectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((element) => {
      element.classList.add("scroll-reveal");
    });
  });
  document.querySelector(".about-image")?.classList.add("scroll-reveal-media");

  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      currentObserver.unobserve(entry.target);
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -35px 0px"
  });

  document.querySelectorAll(".scroll-reveal").forEach((element) => {
    observer.observe(element);
  });
  document.documentElement.classList.add("motion-ready");
}

initScrollAnimations();