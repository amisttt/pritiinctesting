/* ============================================================
   Priti Inc — MAIN
   Injects the shared Nav + Footer into every page (so you only
   edit them in one place) and wires up their interactions:
   scroll-based nav background, active link state, mobile menu.
   ============================================================ */

const NAV_LINKS = [
  { label: "Solutions", href: "index.html#solutions" },
  { label: "Catalogue", href: "catalogue.html" },
  { label: "About", href: "about.html" },
];

/** Renders the fixed top nav + slide-down mobile menu. */
function renderNav() {
  const isHero = document.body.dataset.page === "home";
const isProduct = document.body.dataset.page === "product";

  const desktopLinks = NAV_LINKS.map(
    (l) => `<a href="${l.href}" class="pf-nav-link nav-link-desktop" data-href="${l.href}">${l.label}</a>`
  ).join("");

  const mobileLinks = NAV_LINKS.map(
    (l) => `<a href="${l.href}" class="text-2xl font-bold text-[#1a1a1a] no-underline">${l.label}</a>`
  ).join("");

  const nav = document.createElement("nav");
  nav.className = "pf-nav";
  nav.setAttribute("aria-label", "Main navigation");
  nav.id = "pf-nav";
  nav.innerHTML = `
    <div class="pf-container">
      <div class="flex items-center justify-between h-20">
        <a href="index.html" class="pf-logo-link" aria-label="Go to homepage">

  <img
    src="assets/images/logo-white.png"
    alt="Priti Inc"
    class="pf-logo-image pf-logo-white"
  />

  <img
    src="assets/images/logo-grey.png"
    alt="Priti Inc"
    class="pf-logo-image pf-logo-grey"
  />

</a>
        <div class="hidden md:flex items-center gap-8" id="pf-desktop-links">
          ${desktopLinks}
          <a href="contact.html" class="pf-btn text-sm" id="pf-nav-cta" style="padding:10px 24px;">Contact Us</a>
        </div>
        <button type="button" class="md:hidden p-2" id="pf-hamburger" aria-label="Open menu" aria-expanded="false">
          <svg id="pf-icon-menu" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></svg>
          <svg id="pf-icon-close" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none;"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
    </div>
  `;

  const mobileMenu = document.createElement("div");
  mobileMenu.className = "pf-mobile-menu";
  mobileMenu.id = "pf-mobile-menu";
  mobileMenu.setAttribute("aria-hidden", "true");
  mobileMenu.innerHTML = `
    <div class="flex flex-col gap-6 mt-8">
      <a href="index.html" class="text-2xl font-bold text-[#1a1a1a] no-underline">Home</a>
      ${mobileLinks}
      <a href="contact.html" class="pf-btn mt-4 text-center" style="width:fit-content;">Contact Us</a>
    </div>
  `;

  document.body.prepend(mobileMenu);
  document.body.prepend(nav);

  const updateNavColors = () => {
    const scrolled = window.scrollY > 50;
    const useLight = !scrolled;

    nav.classList.toggle("scrolled", scrolled);
    nav.classList.toggle("nav-light", useLight);

    document.querySelectorAll(".nav-link-desktop").forEach((link) => {
      link.style.color = useLight ? "#ffffff" : "#1a1a1a";
    });

    const cta = document.getElementById("pf-nav-cta");
    if (cta) {
      cta.classList.toggle("pf-btn-outline", useLight);
    }
  };

  window.addEventListener("scroll", updateNavColors, { passive: true });
  updateNavColors();

  // Active link state
  const currentFile = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-link-desktop").forEach((a) => {
    const linkFile = a.getAttribute("data-href").split("#")[0] || "index.html";
    if (linkFile === currentFile) a.classList.add("active");
  });

  // Mobile menu toggle
  const hamburger = document.getElementById("pf-hamburger");
  const menuIcon = document.getElementById("pf-icon-menu");
  const closeIcon = document.getElementById("pf-icon-close");
  let mobileOpen = false;
  hamburger.addEventListener("click", () => {
    mobileOpen = !mobileOpen;
    mobileMenu.classList.toggle("open", mobileOpen);
    mobileMenu.setAttribute("aria-hidden", String(!mobileOpen));
    hamburger.setAttribute("aria-expanded", String(mobileOpen));
    hamburger.setAttribute("aria-label", mobileOpen ? "Close menu" : "Open menu");
    menuIcon.style.display = mobileOpen ? "none" : "block";
    closeIcon.style.display = mobileOpen ? "block" : "none";
  });
  mobileMenu.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      mobileOpen = false;
      mobileMenu.classList.remove("open");
      mobileMenu.setAttribute("aria-hidden", "true");
      hamburger.setAttribute("aria-expanded", "false");
      menuIcon.style.display = "block";
      closeIcon.style.display = "none";
    })
  );
}

/** Renders the dark 4-column footer. */
function renderFooter() {
  const year = new Date().getFullYear();
  const solutionsLinks = [
    //"Custom Thermoforming",
    //"Blister Packaging",
    //"Rigid Trays",
    //"Flexible Packaging",
  ]
    .map((item) => `<a href="catalogue.html" class="pf-footer-link">${item}</a>`)
    .join("");

  const footer = document.createElement("footer");
  footer.className = "pf-footer";
  footer.innerHTML = `
    <div class="pf-container">
      <div class="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-white/10">
        <div>
          <a href="./index.html" 
            class="pf-logo-link"
            aria-label="Go to homepage"
            style="position:relative; z-index:10; cursor:pointer;">

            <img
              src="assets/images/logo-white.png"
              alt="Priti Inc"
              class="pf-logo-image"
            />

</a>
          <p class="text-sm text-white/70">Precision Packaging. Global Scale.</p>
          <p class="text-sm text-white/60 leading-relaxed mb-6">Priti Inc is a trusted manufacturer of thermoformed, blister, and rigid packaging solutions, delivering quality-driven products and customised solutions to businesses across diverse industries.</p>
          
        </div>
        
        <div>
          <h4 class="text-xs font-semibold uppercase tracking-widest text-white/40 mb-5">Company</h4>
          <nav>
            <a href="about.html" class="pf-footer-link">About Us</a>
            <a href="catalogue.html" class="pf-footer-link">Catalogue</a>
            <a href="contact.html" class="pf-footer-link">Contact</a>
            <a href="about.html" class="pf-footer-link">Certifications</a>
            <a href="contact.html" class="pf-footer-link">Location</a>
          </nav>
        </div>
        <div>
          <h4 class="text-xs font-semibold uppercase tracking-widest text-white/40 mb-5">Contact</h4>
          <div class="space-y-3 text-sm text-white/60">
            <p><span class="block text-white/80 font-medium mb-1">Address</span>Plot No 46, Survey No 191, Param Trade Park-2<br/>Valsad, Gujarat, India</p>
            <p><span class="block text-white/80 font-medium mb-1">Phone</span>+91 95121 74214</p>
            <p><span class="block text-white/80 font-medium mb-1">Email</span><a href="mailto:info@pritiinc.com" class="hover:text-[#d90000] transition-colors">info@pritiinc.com</a></p>
            <p><span class="block text-white/80 font-medium mb-1">Hours</span>Tue&ndash;Sat: 09:00 AM&ndash;5:00 PM IST<br/>Closed Monday &amp; Public Holidays</p>
          </div>
        </div>
      </div>
      <div class="py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
        <p>&copy; ${year} Priti Inc. All rights reserved.</p>
        <div class="flex gap-6">
          <span class="cursor-pointer hover:text-white/60 transition-colors">Privacy Policy</span>
          <span class="cursor-pointer hover:text-white/60 transition-colors">Terms of Use</span>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(footer);
}

document.addEventListener("DOMContentLoaded", () => {
  renderNav();
  renderFooter();
});
