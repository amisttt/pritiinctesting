/* ============================================================
   PACKFORM GLOBAL — QUOTE MODAL
   Recreates the animated fade+scale quote request modal.
   Submission opens the user's email client (mailto:) prefilled
   with the product info and form fields, since a static site has
   no backend to receive the request directly. To wire this up to
   a real form backend instead, see the note in README.md.
   ============================================================ */

const QUOTE_RECIPIENT = "enquiries@packformglobal.com";

function openQuoteModal({ productName, material, moq }) {
  closeQuoteModal(); // ensure no duplicate

  const overlay = document.createElement("div");
  overlay.className = "pf-modal-overlay";
  overlay.id = "quote-modal-overlay";
  overlay.setAttribute("role", "presentation");

  overlay.innerHTML = `
    <div class="pf-modal-card" role="dialog" aria-modal="true" aria-labelledby="quote-modal-title">
      <div class="flex items-start justify-between mb-6">
        <div>
          <h3 id="quote-modal-title" class="text-2xl font-bold text-[#1a1a1a]">Request a Quote</h3>
          <p class="text-sm text-[#6b6b6b] mt-1">Our specialists typically respond within 24 business hours.</p>
        </div>
        <button type="button" id="quote-modal-close" class="text-[#6b6b6b] hover:text-[#1a1a1a] transition-colors p-1 ml-4" aria-label="Close modal">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>

      <form id="quote-form" novalidate>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 p-4 bg-[#f5f5f5]">
          <div>
            <p class="text-xs font-medium uppercase tracking-wider text-[#6b6b6b] mb-1">Product</p>
            <p class="text-sm font-medium text-[#1a1a1a]">${productName}</p>
          </div>
          <div>
            <p class="text-xs font-medium uppercase tracking-wider text-[#6b6b6b] mb-1">Material</p>
            <p class="text-sm font-medium text-[#1a1a1a]">${material}</p>
          </div>
          <div>
            <p class="text-xs font-medium uppercase tracking-wider text-[#6b6b6b] mb-1">MOQ</p>
            <p class="text-sm font-medium text-[#1a1a1a]">${moq} units</p>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label for="modal-name" class="block text-xs font-medium uppercase tracking-wider text-[#6b6b6b] mb-1">Name <span class="text-[#d90000]">*</span></label>
            <input id="modal-name" name="name" type="text" required placeholder="Your full name" autocomplete="name" class="w-full border border-[#e0e0e0] px-4 py-3 text-sm focus:outline-none focus:border-[#2d2d2d] transition-colors" />
          </div>
          <div>
            <label for="modal-company" class="block text-xs font-medium uppercase tracking-wider text-[#6b6b6b] mb-1">Company Name <span class="text-[#d90000]">*</span></label>
            <input id="modal-company" name="company" type="text" required placeholder="Your company" autocomplete="organization" class="w-full border border-[#e0e0e0] px-4 py-3 text-sm focus:outline-none focus:border-[#2d2d2d] transition-colors" />
          </div>
          <div>
            <label for="modal-phone" class="block text-xs font-medium uppercase tracking-wider text-[#6b6b6b] mb-1">Phone</label>
            <input id="modal-phone" name="phone" type="tel" placeholder="+1 555 000 0000" autocomplete="tel" class="w-full border border-[#e0e0e0] px-4 py-3 text-sm focus:outline-none focus:border-[#2d2d2d] transition-colors" />
          </div>
          <div>
            <label for="modal-email" class="block text-xs font-medium uppercase tracking-wider text-[#6b6b6b] mb-1">Email <span class="text-[#d90000]">*</span></label>
            <input id="modal-email" name="email" type="email" required placeholder="you@company.com" autocomplete="email" class="w-full border border-[#e0e0e0] px-4 py-3 text-sm focus:outline-none focus:border-[#2d2d2d] transition-colors" />
          </div>
        </div>
        <div class="mb-6">
          <label for="modal-message" class="block text-xs font-medium uppercase tracking-wider text-[#6b6b6b] mb-1">Message</label>
          <textarea id="modal-message" name="message" rows="4" placeholder="Describe your packaging requirements, dimensions, or any specific details..." class="w-full border border-[#e0e0e0] px-4 py-3 text-sm focus:outline-none focus:border-[#2d2d2d] transition-colors resize-none"></textarea>
        </div>

        <p id="quote-form-error" class="text-sm text-[#d90000] mb-4" style="display:none;"></p>

        <button type="submit" class="pf-btn w-full justify-center gap-2">Submit Quote Request</button>
      </form>
    </div>
  `;

  document.body.appendChild(overlay);

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeQuoteModal();
  });
  document.getElementById("quote-modal-close").addEventListener("click", closeQuoteModal);
  document.addEventListener("keydown", quoteModalEscHandler);

  document.getElementById("quote-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const company = form.company.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const message = form.message.value.trim();
    const errorEl = document.getElementById("quote-form-error");

    if (!name || !company || !email) {
      errorEl.textContent = "Please fill in all required fields.";
      errorEl.style.display = "block";
      return;
    }
    errorEl.style.display = "none";

    const mailto = buildMailtoLink({
      to: QUOTE_RECIPIENT,
      subject: `Quote Request: ${productName}`,
      bodyLines: [
        `Product: ${productName}`,
        `Material: ${material}`,
        `MOQ: ${moq} units`,
        "",
        `Name: ${name}`,
        `Company: ${company}`,
        phone ? `Phone: ${phone}` : "",
        `Email: ${email}`,
        "",
        message ? `Message:\n${message}` : "",
      ],
    });

    window.location.href = mailto;
    showQuoteModalSuccess();
  });
}

function showQuoteModalSuccess() {
  const card = document.querySelector("#quote-modal-overlay .pf-modal-card");
  if (!card) return;
  card.innerHTML = `
    <div class="py-12 text-center">
      <div class="text-4xl mb-4">&#10003;</div>
      <h4 class="text-xl font-semibold text-[#1a1a1a] mb-2">Opening Your Email Client&hellip;</h4>
      <p class="text-[#6b6b6b]">We've prefilled a quote request email — just hit send. A packaging specialist will be in touch within 24 business hours.</p>
    </div>
  `;
  setTimeout(closeQuoteModal, 3000);
}

function quoteModalEscHandler(e) {
  if (e.key === "Escape") closeQuoteModal();
}

function closeQuoteModal() {
  const overlay = document.getElementById("quote-modal-overlay");
  if (overlay) overlay.remove();
  document.removeEventListener("keydown", quoteModalEscHandler);
}
