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