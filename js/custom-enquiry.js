
/* ============================================================
   Priti Inc — COMMON ENQUIRY MODAL

   Shared enquiry form used by:
     - Custom catalogue category
     - Category contact buttons
     - Individual product detail pages

   Optional product context:
     openCustomEnquiryModal({
       productName: product.name,
       material: product.material
     });

   Uses mailto submission. No backend required.
   ============================================================ */

const CUSTOM_ENQUIRY_RECIPIENT = "info@pritiinc.com";

let customEnquiryContext = {};

/* ============================================================
   OPEN ENQUIRY MODAL
   ============================================================ */

function openCustomEnquiryModal(options = {}) {
  closeCustomEnquiryModal();

  customEnquiryContext = {
    productName: options.productName || "",
    material: options.material || "",
  };

  const overlay = document.createElement("div");
  overlay.className = "pf-modal-overlay";
  overlay.id = "custom-enquiry-overlay";
  overlay.setAttribute("role", "presentation");

  overlay.innerHTML = `
    <div
      class="pf-modal-card"
      role="dialog"
      aria-modal="true"
      aria-labelledby="custom-enquiry-title"
    >
      <div class="flex items-start justify-between mb-6">
        <div>
          <p class="text-xs font-semibold uppercase tracking-widest text-[#d90000] mb-2">
            Packaging Enquiry
          </p>

          <h3
            id="custom-enquiry-title"
            class="text-2xl font-bold text-[#1a1a1a]"
          >
            Tell Us What You Need
          </h3>

          <p class="text-sm text-[#6b6b6b] mt-1">
            Share your requirements and our team will get back to you.
          </p>
        </div>

        <button
          type="button"
          id="custom-enquiry-close"
          class="text-[#6b6b6b] hover:text-[#1a1a1a] transition-colors p-1 ml-4"
          aria-label="Close modal"
        >
          <svg width="20" height="20" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="18" x2="18" y2="6"/>
          </svg>
        </button>
      </div>

      <div
        id="custom-product-context"
        class="mb-5 p-4 bg-[#f5f5f5]"
        style="display:none;"
      >
        <p class="text-xs font-medium uppercase tracking-wider text-[#6b6b6b] mb-1">
          Enquiring About
        </p>

        <p
          id="custom-product-name"
          class="text-sm font-semibold text-[#1a1a1a]"
        ></p>
      </div>

      <form id="custom-enquiry-form" novalidate>

        <!-- Name and Phone -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">

          <div>
            <label
              for="custom-name"
              class="block text-xs font-medium uppercase tracking-wider text-[#6b6b6b] mb-1"
            >
              Name <span class="text-[#d90000]">*</span>
            </label>

            <input
              id="custom-name"
              name="name"
              type="text"
              required
              autocomplete="name"
              placeholder="Your full name"
              class="w-full border border-[#e0e0e0] px-4 py-3 text-sm focus:outline-none focus:border-[#2d2d2d] transition-colors"
            />
          </div>

          <div>
            <label
              for="custom-phone"
              class="block text-xs font-medium uppercase tracking-wider text-[#6b6b6b] mb-1"
            >
              Phone Number <span class="text-[#d90000]">*</span>
            </label>

            <input
              id="custom-phone"
              name="phone"
              type="tel"
              required
              autocomplete="tel"
              placeholder="+91 00000 00000"
              class="w-full border border-[#e0e0e0] px-4 py-3 text-sm focus:outline-none focus:border-[#2d2d2d] transition-colors"
            />
          </div>

        </div>

        <!-- Material and Quantity -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">

          <div>
            <label
              for="custom-material"
              class="block text-xs font-medium uppercase tracking-wider text-[#6b6b6b] mb-1"
            >
              Material <span class="text-[#d90000]">*</span>
            </label>

            <input
              id="custom-material"
              name="material"
              type="text"
              required
              placeholder="Enter material preference"
              class="w-full border border-[#e0e0e0] px-4 py-3 text-sm focus:outline-none focus:border-[#2d2d2d] transition-colors"
            />
          </div>

          <div>
            <label
              for="custom-quantity"
              class="block text-xs font-medium uppercase tracking-wider text-[#6b6b6b] mb-1"
            >
              Quantity <span class="text-[#d90000]">*</span>
            </label>

            <input
              id="custom-quantity"
              name="quantity"
              type="number"
              min="1"
              required
              placeholder="Required quantity"
              class="w-full border border-[#e0e0e0] px-4 py-3 text-sm focus:outline-none focus:border-[#2d2d2d] transition-colors"
            />
          </div>

        </div>

        <!-- Requirement -->
        <div class="mb-6">
          <label
            for="custom-requirement"
            class="block text-xs font-medium uppercase tracking-wider text-[#6b6b6b] mb-1"
          >
            Describe Your Requirement
            <span class="text-[#d90000]">*</span>
          </label>

          <textarea
            id="custom-requirement"
            name="requirement"
            rows="4"
            required
            placeholder="Describe the product, dimensions, packaging type, or any specific requirements..."
            class="w-full border border-[#e0e0e0] px-4 py-3 text-sm focus:outline-none focus:border-[#2d2d2d] transition-colors resize-none"
          ></textarea>
        </div>

        <p
          id="custom-enquiry-error"
          class="text-sm text-[#d90000] mb-4"
          role="alert"
          style="display:none;"
        ></p>

        <button
          type="submit"
          class="pf-btn w-full justify-center gap-2"
        >
          Submit Enquiry
        </button>

      </form>
    </div>
  `;

  document.body.appendChild(overlay);

  // Display product context when opened from a product page.
  if (customEnquiryContext.productName) {
    const context = document.getElementById("custom-product-context");
    const productName = document.getElementById("custom-product-name");

    context.style.display = "block";
    productName.textContent = customEnquiryContext.productName;
  }

  // Prefill material when opened from a product page.
  if (customEnquiryContext.material) {
    document.getElementById("custom-material").value =
      customEnquiryContext.material;
  }

  // Close when clicking outside the modal.
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      closeCustomEnquiryModal();
    }
  });

  document
    .getElementById("custom-enquiry-close")
    .addEventListener("click", closeCustomEnquiryModal);

  document.addEventListener("keydown", customEnquiryEscHandler);

  document
    .getElementById("custom-enquiry-form")
    .addEventListener("submit", submitCustomEnquiry);

  document.getElementById("custom-name").focus();
}


/* ============================================================
   FORM SUBMISSION
   ============================================================ */

function submitCustomEnquiry(event) {
  event.preventDefault();

  const form = event.currentTarget;

  const name = form.elements["name"].value.trim();
  const phone = form.elements["phone"].value.trim();
  const material = form.elements["material"].value.trim();
  const quantity = form.elements["quantity"].value.trim();
  const requirement = form.elements["requirement"].value.trim();

  const errorEl = document.getElementById("custom-enquiry-error");

  if (!name || !phone || !material || !quantity || !requirement) {
    errorEl.textContent = "Please fill in all required fields.";
    errorEl.style.display = "block";
    return;
  }

  if (Number(quantity) < 1 || !Number.isFinite(Number(quantity))) {
    errorEl.textContent = "Please enter a valid quantity.";
    errorEl.style.display = "block";
    return;
  }

  errorEl.style.display = "none";

  const bodyLines = [
    "PACKAGING ENQUIRY",
    "",
    customEnquiryContext.productName
      ? `Product: ${customEnquiryContext.productName}`
      : "",
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Material: ${material}`,
    `Quantity: ${quantity}`,
    "",
    "Requirement:",
    requirement,
  ];

  const mailto = buildMailtoLink({
    to: CUSTOM_ENQUIRY_RECIPIENT,
    subject: customEnquiryContext.productName
      ? `Product Enquiry: ${customEnquiryContext.productName}`
      : "Custom Packaging Enquiry",
    bodyLines,
  });

  showCustomEnquirySuccess();

  window.location.href = mailto;
}


/* ============================================================
   SUCCESS MESSAGE
   ============================================================ */

function showCustomEnquirySuccess() {
  const card = document.querySelector(
    "#custom-enquiry-overlay .pf-modal-card"
  );

  if (!card) return;

  card.innerHTML = `
    <div class="py-12 text-center">

      <div class="text-4xl mb-4 text-[#2d2d2d]">
        &#10003;
      </div>

      <h4 class="text-xl font-semibold text-[#1a1a1a] mb-2">
        Opening Your Email Client...
      </h4>

      <p class="text-[#6b6b6b]">
        Your enquiry has been prepared.
        Please review the email and click Send to submit it.
      </p>

    </div>
  `;

  setTimeout(closeCustomEnquiryModal, 4000);
}


/* ============================================================
   MODAL CLOSE HANDLERS
   ============================================================ */

function customEnquiryEscHandler(event) {
  if (event.key === "Escape") {
    closeCustomEnquiryModal();
  }
}

function closeCustomEnquiryModal() {
  const overlay = document.getElementById("custom-enquiry-overlay");

  if (overlay) overlay.remove();

  document.removeEventListener("keydown", customEnquiryEscHandler);

  customEnquiryContext = {};
}
