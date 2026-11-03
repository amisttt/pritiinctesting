/* ============================================================
   PACKFORM GLOBAL — PRODUCT DETAIL PAGE
   Reads ?id=... from the URL and renders the matching product
   from products.js.
   ============================================================ */

const MATERIAL_DESCRIPTIONS = {
  PETG: [
    "PETG (Polyethylene Terephthalate Glycol) is PackForm's most specified rigid packaging material, offering an exceptional balance of optical clarity, impact resistance, and chemical compatibility. Its glycol modification eliminates the brittleness found in standard PET, enabling reliable thermoforming at commercial scale with dimensional repeatability across millions of units.",
    "Our PETG formulations are available in food-contact certified, medical-grade, and ESD-protected variants. Each formulation undergoes rigorous incoming material qualification and is processed through PackForm's automated thermoforming lines under strict temperature and forming pressure controls.",
    "The material's excellent clarity — up to 90% light transmission — makes PETG the preferred choice for retail packaging where product visibility is critical. Its resistance to moisture and a wide range of chemicals ensures reliable protection throughout the entire supply chain.",
    "PackForm's PETG thermoformed packaging carries full material traceability from resin lot to finished carton, supporting our customers' regulatory documentation requirements across medical, pharmaceutical, and food-grade applications.",
  ],
  PLA: [
    "PLA (Polylactic Acid) represents PackForm's commitment to sustainable packaging innovation. Derived from renewable plant-based feedstocks — primarily corn starch or sugarcane — our PLA formulations provide excellent thermoformability while enabling end-of-life composting in industrial facilities certified to EN 13432 or ASTM D6400.",
    "Our PLA materials are sourced from NatureWorks Ingeo™ and TotalEnergies Corbion, ensuring consistent molecular weight distribution and optimal forming characteristics. We have optimized our thermoforming tooling and process parameters specifically for PLA's unique temperature window.",
    "For applications requiring moisture or gas barrier performance beyond standard PLA, PackForm offers barrier-coated PLA constructions that extend shelf life without sacrificing compostability certifications. These advanced constructions are particularly well-suited for fresh food, bakery, and prepared meals applications.",
    "Brand owners choosing PLA through PackForm receive full life cycle assessment (LCA) documentation and verified compostable content claims — materials required by major retailers in their own sustainability reporting.",
  ],
  RPET: [
    "RPET (Recycled Polyethylene Terephthalate) packaging from PackForm is manufactured using post-consumer recycled content sourced through certified collection and reprocessing partners. Our RPET supply chain maintains full chain-of-custody documentation to substantiate recycled content claims in your product packaging.",
    "PackForm's RPET thermoforms deliver mechanical performance comparable to virgin PET while achieving recycled content levels from 50% to 100% PCR. We work with each customer to identify the maximum technically feasible recycled content for their specific application, performance requirements, and regulatory framework.",
    "For food-contact RPET applications, all recycled feedstock passes through a decontamination process validated to FDA and EFSA guidelines for post-consumer recycled materials. Our quality systems include incoming material testing for heavy metals, VOCs, and organoleptic properties.",
    "Automotive, electronics, and industrial customers choosing RPET benefit from measurable Scope 3 emissions reductions — typically 60–75% lower carbon footprint versus virgin PET — supporting corporate sustainability targets and ESG reporting obligations.",
  ],
  PVC: [
    "PVC (Polyvinyl Chloride) remains one of the most established materials in pharmaceutical, healthcare, and consumer retail packaging due to its combination of thermoformability, barrier properties, and compatibility with automated packaging machinery. PackForm's PVC formulations are specified to the grade and thickness requirements of your packaging line.",
    "For pharmaceutical blister applications, our PVC films are available in standard, PVDC-coated, and ACLAR-laminated constructions to meet moisture vapor transmission rate (MVTR) requirements for moisture-sensitive active pharmaceutical ingredients. All pharmaceutical-grade PVC materials are manufactured under GMP conditions with full batch traceability.",
    "Retail and consumer applications benefit from PVC's outstanding optical clarity, gloss retention, and ease of heat sealing to paperboard blister cards or aluminum foil. PackForm offers tri-fold, slide-blister, and clamshell configurations engineered to your retail planogram dimensions.",
    "We acknowledge the environmental considerations associated with PVC and actively support customers seeking to transition to alternative materials. Our technical team can provide a side-by-side comparison of PVC against alternative materials for your specific application, including performance data, regulatory implications, and cost modeling.",
  ],
  Custom: [
    "PackForm's Custom materials program exists to solve packaging challenges that standard materials cannot address. Whether your product requires a unique combination of barrier performance, structural rigidity, optical properties, or regulatory certifications — our material science team works from your specification to identify or develop the optimal solution.",
    "Custom development projects at PackForm follow a structured stage-gate process: material specification, supplier qualification, laboratory testing, prototype thermoforming, and customer validation before commercial commitment. Our R&D laboratory maintains a library of over 200 proprietary and partner-developed material formulations available for customer evaluation.",
    "For customers with sustainability mandates, PackForm's custom program includes development of bio-based, recycled-content, and recyclable material constructions that meet specific performance thresholds. We have delivered custom packaging materials for Fortune 100 brand owners with zero-compromise sustainability and performance requirements.",
    "All custom material projects include IP protection through NDAs and, where novel formulations are developed, co-patent arrangements are available. PackForm's commercial team will structure a custom development agreement that protects your investment while ensuring production flexibility at industrial scale.",
  ],
};

function renderProductDetail() {
  const id = getQueryParam("id") || "";
  const product = getProductById(id);
  const root = document.getElementById("product-detail-root");

  if (!product) {
    root.innerHTML = `
      <main class="pt-40 pf-section">
        <div class="pf-container text-center">
          <h1 class="text-[#1a1a1a] mb-4">Product Not Found</h1>
          <p class="text-[#6b6b6b] mb-8">The product you're looking for does not exist.</p>
          <a href="catalogue.html" class="pf-btn">Back to Catalogue</a>
        </div>
      </main>
    `;
    return;
  }

  document.title = `${product.name} — PackForm Global`;

  const related = getRelatedProducts(product.material, product.id);
  const descriptions = MATERIAL_DESCRIPTIONS[product.material] || MATERIAL_DESCRIPTIONS.PETG;

  // Gallery is built entirely from product.images — however many
  // entries are in that array is exactly how many images render
  // (main photo, thumbnails, and lightbox). No fixed placeholder
  // count, no empty slots.
  const images = getProductImages(product);

  const thumbsHtml =
    images.length > 1
      ? `
        <div class="grid gap-3" style="grid-template-columns: repeat(auto-fill, minmax(72px, 1fr));">
          ${images
            .map(
              (imgSrc, i) => `
                <button type="button" data-thumb-index="${i}" class="thumb-btn overflow-hidden aspect-square bg-[#f5f5f5] border-2 transition-colors ${i === 0 ? "border-[#2d2d2d]" : "border-transparent"}" aria-label="View image ${i + 1} of ${images.length}">
                  ${renderImage(resolveProductImage(imgSrc), "", { small: true })}
                </button>
              `
            )
            .join("")}
        </div>
      `
      : "";

  const lightboxHtml = `
    <div id="pf-lightbox" class="pf-lightbox" hidden>
      <button type="button" id="lightbox-close" class="pf-lightbox-close" aria-label="Close image viewer">&times;</button>
      <div class="pf-lightbox-stage">
        ${images.length > 1 ? `<button type="button" id="lightbox-prev" class="pf-lightbox-nav pf-lightbox-prev" aria-label="Previous image">&#8249;</button>` : ""}
        <div id="lightbox-image-wrap" class="pf-lightbox-image-wrap"></div>
        ${images.length > 1 ? `<button type="button" id="lightbox-next" class="pf-lightbox-nav pf-lightbox-next" aria-label="Next image">&#8250;</button>` : ""}
      </div>
      ${images.length > 1 ? `<div id="lightbox-counter" class="pf-lightbox-counter"></div>` : ""}
    </div>
  `;

  const relatedHtml =
    related.length > 0
      ? `
        <section class="pf-section bg-[#f5f5f5]">
          <div class="pf-container">
            <div class="flex items-end justify-between mb-10">
              <div>
                <p class="pf-eyebrow mb-2">You May Also Need</p>
                <h2 class="text-[#1a1a1a]">Related Products</h2>
              </div>
              <a href="catalogue.html" class="text-sm font-medium text-[#2d2d2d] flex items-center gap-1">
                View All
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </a>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              ${related
                .map(
                  (r) => `
                    <a href="product.html?id=${encodeURIComponent(r.id)}" class="no-underline">
                      <div class="pf-product-card h-full flex flex-col">
                        <div class="pf-product-img-wrap">${renderImage(resolveProductImage(getProductImages(r)[0]), r.name)}</div>
                        <div class="p-5 flex flex-col flex-1">
                          <div class="pf-tag mb-2">${r.material}</div>
                          <h3 class="text-[#1a1a1a] mb-2" style="font-size:1rem;">${r.name}</h3>
                          <p class="text-[#6b6b6b] text-sm line-clamp-2 mb-3 flex-1">${r.description}</p>
                          <span class="text-sm font-medium text-[#2d2d2d] flex items-center gap-1">
                            View Details
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                          </span>
                        </div>
                      </div>
                    </a>
                  `
                )
                .join("")}
            </div>
          </div>
        </section>
      `
      : "";

  root.innerHTML = `
    <main class="pt-24">
      <div class="pf-container py-6 border-b border-[#e0e0e0]">
        <nav class="flex items-center gap-2 text-sm text-[#6b6b6b]" aria-label="Breadcrumb">
          <a href="index.html" class="hover:text-[#d90000] transition-colors">Home</a>
          <span>/</span>
          <a href="catalogue.html" class="hover:text-[#d90000] transition-colors">Catalogue</a>
          <span>/</span>
          <span class="text-[#1a1a1a] font-medium">${product.name}</span>
        </nav>
      </div>

      <section class="pf-section bg-white">
        <div class="pf-container">
          <div class="grid grid-cols-1 lg:grid-cols-11 gap-12 lg:gap-16">
            <div class="lg:col-span-6">
              <button type="button" id="main-image-wrap" class="block w-full overflow-hidden mb-4 aspect-[4/3] bg-[#f5f5f5] cursor-zoom-in" aria-label="Open image ${images.length > 1 ? "gallery" : ""}">
                ${renderImage(resolveProductImage(images[0]), product.name, { className: "w-full h-full object-cover transition-opacity duration-300", id: "main-product-image" })}
              </button>
              ${thumbsHtml}
            </div>

            <div class="lg:col-span-5">
              <div class="pf-tag mb-4">${product.material}</div>
              <h1 class="text-[#1a1a1a] mb-4" style="line-height:1.1;">${product.name}</h1>
              <p class="text-[#6b6b6b] text-sm mb-6">
                <span class="font-medium text-[#1a1a1a]">Minimum Order Quantity:</span> ${product.moq} units
              </p>
              <div class="w-full h-px bg-[#e0e0e0] mb-6"></div>
              <div class="space-y-4 mb-8">
                ${descriptions
                  .slice(0, 2)
                  .map((p) => `<p class="text-[#6b6b6b] text-sm leading-relaxed">${p}</p>`)
                  .join("")}
              </div>
              <button type="button" id="get-quote-btn" class="pf-btn w-full justify-center mb-4">Get Quote</button>
              <p class="text-xs text-[#6b6b6b] text-center">Our specialists typically respond within 24 business hours.</p>
            </div>
          </div>
        </div>
      </section>

      ${relatedHtml}

      <section class="py-8 bg-white border-t border-[#e0e0e0]">
        <div class="pf-container">
          <a href="catalogue.html" class="inline-flex items-center gap-2 text-sm font-medium text-[#6b6b6b] hover:text-[#2d2d2d] transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            Back to Catalogue
          </a>
        </div>
      </section>
    </main>
    ${lightboxHtml}
  `;

  // ── Gallery: thumbnail switching + lightbox ─────────────────────
  // Fully driven by `images` (product.images from products.js) — works
  // identically whether a product has 1 image or 20, nothing here is
  // hardcoded to a specific count.
  let activeIndex = 0;
  const mainImageWrap = document.getElementById("main-image-wrap");
  const lightbox = document.getElementById("pf-lightbox");
  const lightboxImageWrap = document.getElementById("lightbox-image-wrap");
  const lightboxCounter = document.getElementById("lightbox-counter");

  function setActiveImage(index) {
    activeIndex = ((index % images.length) + images.length) % images.length;
    mainImageWrap.innerHTML = renderImage(resolveProductImage(images[activeIndex]), product.name, {
      className: "w-full h-full object-cover transition-opacity duration-300",
      id: "main-product-image",
    });
    root.querySelectorAll(".thumb-btn").forEach((btn, i) => {
      btn.classList.toggle("border-[#2d2d2d]", i === activeIndex);
      btn.classList.toggle("border-transparent", i !== activeIndex);
    });
  }

  function renderLightboxImage() {
    if (!lightboxImageWrap) return;
    lightboxImageWrap.innerHTML = renderImage(resolveProductImage(images[activeIndex]), product.name, {
      className: "pf-lightbox-image",
    });
    if (lightboxCounter) lightboxCounter.textContent = `${activeIndex + 1} / ${images.length}`;
  }

  function openLightbox(index) {
    setActiveImage(index);
    renderLightboxImage();
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.hidden = true;
    document.body.style.overflow = "";
  }

  mainImageWrap.addEventListener("click", () => openLightbox(activeIndex));

  root.querySelectorAll(".thumb-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      setActiveImage(Number(btn.getAttribute("data-thumb-index")));
    });
  });

  document.getElementById("lightbox-close")?.addEventListener("click", closeLightbox);
  lightbox?.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.getElementById("lightbox-prev")?.addEventListener("click", () => {
    setActiveImage(activeIndex - 1);
    renderLightboxImage();
  });
  document.getElementById("lightbox-next")?.addEventListener("click", () => {
    setActiveImage(activeIndex + 1);
    renderLightboxImage();
  });
  document.addEventListener("keydown", (e) => {
    if (!lightbox || lightbox.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft" && images.length > 1) {
      setActiveImage(activeIndex - 1);
      renderLightboxImage();
    }
    if (e.key === "ArrowRight" && images.length > 1) {
      setActiveImage(activeIndex + 1);
      renderLightboxImage();
    }
  });

  document.getElementById("get-quote-btn").addEventListener("click", () => {
    openQuoteModal({ productName: product.name, material: product.material, moq: product.moq });
  });

  initRevealObserver();
}

document.addEventListener("DOMContentLoaded", renderProductDetail);
