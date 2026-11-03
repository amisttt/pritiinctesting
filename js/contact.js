/* ============================================================
   PACKFORM GLOBAL — CONTACT FORM
   Submits via mailto: (opens the visitor's email client with a
   prefilled message) since a static site has no backend to
   receive submissions directly.
   ============================================================ */

const CONTACT_RECIPIENT = "enquiries@packformglobal.com";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  if (!form) return;
  const errorEl = document.getElementById("contact-form-error");
  const successEl = document.getElementById("contact-form-success");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const company = form.company.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const message = form.message.value.trim();

    if (!name || !company || !email || !message) {
      errorEl.textContent = "Please fill in all required fields.";
      errorEl.style.display = "block";
      return;
    }
    errorEl.style.display = "none";

    const mailto = buildMailtoLink({
      to: CONTACT_RECIPIENT,
      subject: `Website Enquiry from ${name}`,
      bodyLines: [
        `Name: ${name}`,
        `Company: ${company}`,
        phone ? `Phone: ${phone}` : "",
        `Email: ${email}`,
        "",
        `Message:\n${message}`,
      ],
    });

    window.location.href = mailto;

    form.style.display = "none";
    successEl.style.display = "block";
  });
});
