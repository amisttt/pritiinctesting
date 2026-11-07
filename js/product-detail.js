
/* ============================================================
   PRITI INC / Priti Inc — PRODUCT DETAIL PAGE

   Features:
   - Shared navbar styling and scroll behavior
   - Shared navigation link colors
   - Breadcrumb immediately below the navbar
   - Dynamic navbar-height spacing
   - 4:3 product image gallery
   - Image thumbnails and lightbox
   - Shared product descriptions
   - Product enquiry with prefilled product and material
   - Related products
   - Back to catalogue navigation
   ============================================================ */


/* ============================================================
   PRODUCT DESCRIPTION
   ============================================================ */

function getDetailProductDescription(product) {
  if (typeof getProductDescription === "function") {
    return getProductDescription(product);
  }

  return product.description || "";
}


/* ============================================================
   PRODUCT SUBCATEGORY
   ============================================================ */

function getDetailProductSubcategory(product) {
  const category = product.material;

  if (
    typeof CATEGORY_CONFIG === "undefined" ||
    !CATEGORY_CONFIG[category] ||
    !CATEGORY_CONFIG[category].subcategories
  ) {
    return null;
  }

  const subcategories = CATEGORY_CONFIG[category].subcategories;

  // Use explicitly assigned subcategory first.
  if (product.subcategory && subcategories[product.subcategory]) {
    return subcategories[product.subcategory];
  }

  // Fall back to identifying the subcategory from the product name.
  const name = (product.name || "").toLowerCase();

  if (name.includes("medical device tray")) {
    return subcategories.mdt || null;
  }

  if (name.includes("medical implant tray")) {
    return subcategories.mit || null;
  }

  if (name.includes("medical tray")) {
    return subcategories.mt || null;
  }

  return null;
}


/* ============================================================
   PRODUCT PAGE HEADER
   ============================================================ */

function initialiseProductPageHeader() {
  // Keep product-page-specific layout styling, but leave navbar colors,
  // logo state, and scroll behavior to the shared navigation in main.js.
  document.body.classList.add("product-detail-page");
}


/* ============================================================
   BREADCRUMB POSITIONING
   ============================================================ */

function positionProductBreadcrumb() {
  const navbar = document.querySelector(".pf-nav");
  const breadcrumb = document.querySelector(
    ".product-breadcrumb-section"
  );

  if (!breadcrumb) return;

  // If the navbar is fixed, position the breadcrumb directly below it.
  if (navbar) {
    const navbarHeight = navbar.getBoundingClientRect().height;

    breadcrumb.style.marginTop = `${navbarHeight}px`;
  } else {
    breadcrumb.style.marginTop = "0px";
  }
}


/* ============================================================
   PRODUCT DETAIL RENDER
   ============================================================ */

function renderProductDetail() {

  // Apply product-page styling before rendering content.
  initialiseProductPageHeader();

  const id = getQueryParam("id") || "";
  const product = getProductById(id);
  const root = document.getElementById("product-detail-root");

  if (!root) return;


  /* ==========================================================
     PRODUCT NOT FOUND
     ========================================================== */

  if (!product) {
    root.innerHTML = `
      <main class="pt-40 pf-section">

        <div class="pf-container text-center">

          <h1 class="text-[#1a1a1a] mb-4">
            Product Not Found
          </h1>

          <p class="text-[#6b6b6b] mb-8">
            The product you're looking for does not exist.
          </p>

          <a href="catalogue.html" class="pf-btn">
            Back to Catalogue
          </a>

        </div>

      </main>
    `;

    return;
  }


  /* ==========================================================
     PRODUCT DATA
     ========================================================== */

  document.title = `${product.name} — Priti Inc`;

  const material = product.material;
  const images = getProductImages(product) || [];
  const related = getRelatedProducts(material, product.id) || [];

  const productDescription = getDetailProductDescription(product);
  const subcategory = getDetailProductSubcategory(product);

  // Avoid an empty gallery if a product has no image entries.
  const galleryImages = images.length
    ? images
    : [""];


  /* ==========================================================
     IMAGE THUMBNAILS
     ========================================================== */

  const thumbsHtml =
    galleryImages.length > 1
      ? `
        <div
          class="grid gap-3"
          style="grid-template-columns: repeat(auto-fill, minmax(72px, 1fr));"
        >

          ${galleryImages.map((image, index) => `
            <button
              type="button"
              data-thumb-index="${index}"
              class="thumb-btn overflow-hidden aspect-square bg-[#f5f5f5] border-2 transition-colors ${
                index === 0
                  ? "border-[#2d2d2d]"
                  : "border-transparent"
              }"
              aria-label="View image ${index + 1}"
            >
              ${renderImage(
                resolveProductImage(image),
                "",
                { small: true }
              )}
            </button>
          `).join("")}

        </div>
      `
      : "";


  /* ==========================================================
     LIGHTBOX
     ========================================================== */

  const lightboxHtml = `
    <div id="pf-lightbox" class="pf-lightbox" hidden>

      <button
        type="button"
        id="lightbox-close"
        class="pf-lightbox-close"
        aria-label="Close image viewer"
      >
        &times;
      </button>

      <div class="pf-lightbox-stage">

        ${
          galleryImages.length > 1
            ? `
              <button
                type="button"
                id="lightbox-prev"
                class="pf-lightbox-nav pf-lightbox-prev"
                aria-label="Previous image"
              >
                &#8249;
              </button>
            `
            : ""
        }

        <div
          id="lightbox-image-wrap"
          class="pf-lightbox-image-wrap"
        ></div>

        ${
          galleryImages.length > 1
            ? `
              <button
                type="button"
                id="lightbox-next"
                class="pf-lightbox-nav pf-lightbox-next"
                aria-label="Next image"
              >
                &#8250;
              </button>
            `
            : ""
        }

      </div>

      ${
        galleryImages.length > 1
          ? `
            <div
              id="lightbox-counter"
              class="pf-lightbox-counter"
            ></div>
          `
          : ""
      }

    </div>
  `;


  /* ==========================================================
     RELATED PRODUCTS
     ========================================================== */

  const relatedHtml =
    related.length > 0
      ? `
        <section class="pf-section bg-[#f5f5f5]">

          <div class="pf-container">

            <div class="flex items-end justify-between mb-10">

              <div>

                <p class="pf-eyebrow mb-2">
                  You May Also Need
                </p>

                <h2 class="text-[#1a1a1a]">
                  Related Products
                </h2>

              </div>

              <a
                href="catalogue.html"
                class="text-sm font-medium text-[#2d2d2d] flex items-center gap-1"
              >
                View All

                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>

              </a>

            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

              ${related.map((item) => `
                <a
                  href="product.html?id=${encodeURIComponent(item.id)}"
                  class="no-underline"
                >

                  <div class="pf-product-card h-full flex flex-col">

                    <div class="pf-product-img-wrap">
                      ${renderImage(
                        resolveProductImage(getProductImages(item)[0]),
                        item.name
                      )}
                    </div>

                    <div class="p-5 flex flex-col flex-1">

                      <div class="pf-tag mb-2">
                        ${item.material}
                      </div>

                      <h3
                        class="text-[#1a1a1a] mb-2"
                        style="font-size:1rem;"
                      >
                        ${item.name}
                      </h3>

                      <p class="text-[#6b6b6b] text-sm line-clamp-2 mb-3 flex-1">
                        ${getDetailProductDescription(item)}
                      </p>

                      <span class="text-sm font-medium text-[#2d2d2d] flex items-center gap-1">

                        View Details

                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <line x1="5" y1="12" x2="19" y2="12"/>
                          <polyline points="12 5 19 12 12 19"/>
                        </svg>

                      </span>

                    </div>

                  </div>

                </a>
              `).join("")}

            </div>

          </div>

        </section>
      `
      : "";


  /* ==========================================================
     MAIN PRODUCT PAGE
     ========================================================== */

  root.innerHTML = `

    <main class="product-detail-main">

      <!-- Breadcrumb -->
      <section class="product-breadcrumb-section">

        <div class="pf-container py-6">

          <nav
            class="flex flex-wrap items-center gap-2 text-sm product-breadcrumb"
            aria-label="Breadcrumb"
          >

            <a href="index.html">
              Home
            </a>

            <span>/</span>

            <a href="catalogue.html">
              Catalogue
            </a>

            <span>/</span>

            <span>${material}</span>

            ${
              subcategory
                ? `
                  <span>/</span>
                  <span>${subcategory.name}</span>
                `
                : ""
            }

            <span>/</span>

            <span class="product-breadcrumb-current">
              ${product.name}
            </span>

          </nav>

        </div>

      </section>


      <!-- Product Information -->
      <section class="pf-section bg-white">

        <div class="pf-container">

          <div class="grid grid-cols-1 lg:grid-cols-11 gap-12 lg:gap-16">


            <!-- Product Gallery -->
            <div class="lg:col-span-6">

              <button
                type="button"
                id="main-image-wrap"
                class="block w-full overflow-hidden mb-4 aspect-[4/3] bg-[#f5f5f5] cursor-zoom-in"
                aria-label="Open product image gallery"
              >

                ${renderImage(
                  resolveProductImage(galleryImages[0]),
                  product.name,
                  {
                    className: "w-full h-full object-cover transition-opacity duration-300",
                    id: "main-product-image",
                  }
                )}

              </button>

              ${thumbsHtml}

            </div>


            <!-- Product Details -->
            <div class="lg:col-span-5">

              <div class="pf-tag mb-4">
                ${material}
              </div>

              <h1
                class="text-[#1a1a1a] mb-6"
                style="line-height:1.1;"
              >
                ${product.name}
              </h1>

              <div class="w-full h-px bg-[#e0e0e0] mb-6"></div>

              <div class="mb-8">

                <p class="text-[#6b6b6b] text-base leading-relaxed">
                  ${productDescription}
                </p>

              </div>

              <button
                type="button"
                id="get-quote-btn"
                class="pf-btn w-full justify-center mb-4"
              >
                Enquire Now
              </button>

              <p class="text-xs text-[#6b6b6b] text-center">
                Our specialists typically respond within 24 business hours.
              </p>

            </div>

          </div>

        </div>

      </section>


      ${relatedHtml}


      <!-- Back to Catalogue -->
      <section class="py-8 bg-white border-t border-[#e0e0e0]">

        <div class="pf-container">

          <a
            href="catalogue.html"
            class="inline-flex items-center gap-2 text-sm font-medium text-[#6b6b6b] hover:text-[#2d2d2d] transition-colors"
          >

            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <line x1="19" y1="12" x2="5" y2="12"/>
              <polyline points="12 19 5 12 12 5"/>
            </svg>

            Back to Catalogue

          </a>

        </div>

      </section>

    </main>

    ${lightboxHtml}

  `;


  /* ==========================================================
     POSITION BREADCRUMB BELOW NAVBAR
     ========================================================== */

  positionProductBreadcrumb();

  // Recalculate if the navbar height changes at different widths.
  window.addEventListener("resize", positionProductBreadcrumb);


  /* ==========================================================
     IMAGE GALLERY INTERACTIONS
     ========================================================== */

  let activeIndex = 0;

  const mainImageWrap = document.getElementById("main-image-wrap");
  const lightbox = document.getElementById("pf-lightbox");
  const lightboxImageWrap = document.getElementById("lightbox-image-wrap");
  const lightboxCounter = document.getElementById("lightbox-counter");


  function setActiveImage(index) {

    activeIndex =
      ((index % galleryImages.length) + galleryImages.length) %
      galleryImages.length;

    mainImageWrap.innerHTML = renderImage(
      resolveProductImage(galleryImages[activeIndex]),
      product.name,
      {
        className: "w-full h-full object-cover transition-opacity duration-300",
        id: "main-product-image",
      }
    );

    root.querySelectorAll(".thumb-btn").forEach((button, i) => {

      button.classList.toggle(
        "border-[#2d2d2d]",
        i === activeIndex
      );

      button.classList.toggle(
        "border-transparent",
        i !== activeIndex
      );

    });

  }


  function renderLightboxImage() {

    if (!lightboxImageWrap) return;

    lightboxImageWrap.innerHTML = renderImage(
      resolveProductImage(galleryImages[activeIndex]),
      product.name,
      {
        className: "pf-lightbox-image",
      }
    );

    if (lightboxCounter) {
      lightboxCounter.textContent =
        `${activeIndex + 1} / ${galleryImages.length}`;
    }

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


  mainImageWrap.addEventListener("click", () => {
    openLightbox(activeIndex);
  });


  root.querySelectorAll(".thumb-btn").forEach((button) => {

    button.addEventListener("click", () => {

      setActiveImage(
        Number(button.getAttribute("data-thumb-index"))
      );

    });

  });


  document
    .getElementById("lightbox-close")
    ?.addEventListener("click", closeLightbox);


  lightbox?.addEventListener("click", (event) => {

    if (event.target === lightbox) {
      closeLightbox();
    }

  });


  document
    .getElementById("lightbox-prev")
    ?.addEventListener("click", () => {

      setActiveImage(activeIndex - 1);
      renderLightboxImage();

    });


  document
    .getElementById("lightbox-next")
    ?.addEventListener("click", () => {

      setActiveImage(activeIndex + 1);
      renderLightboxImage();

    });


  document.addEventListener("keydown", (event) => {

    if (!lightbox || lightbox.hidden) return;

    if (event.key === "Escape") {
      closeLightbox();
    }

    if (event.key === "ArrowLeft" && galleryImages.length > 1) {
      setActiveImage(activeIndex - 1);
      renderLightboxImage();
    }

    if (event.key === "ArrowRight" && galleryImages.length > 1) {
      setActiveImage(activeIndex + 1);
      renderLightboxImage();
    }

  });


  /* ==========================================================
     PRODUCT ENQUIRY
     ========================================================== */

  document
    .getElementById("get-quote-btn")
    ?.addEventListener("click", () => {

      if (typeof openCustomEnquiryModal === "function") {

        openCustomEnquiryModal({
          productName: product.name,
          material: material,
        });

      } else {

        console.error(
          "Custom enquiry modal function is not available."
        );

      }

    });


  /* ==========================================================
     REVEAL ANIMATIONS
     ========================================================== */

  if (typeof initRevealObserver === "function") {
    initRevealObserver();
  }

}


/* ============================================================
   INITIALISE
   ============================================================ */

document.addEventListener("DOMContentLoaded", renderProductDetail);
