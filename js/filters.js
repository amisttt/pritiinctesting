
/* ============================================================
   PRITI INC — CATEGORY & SUBCATEGORY NAVIGATION

   Main materials:
     PETG | HIPS | APET | Custom

   PETG categories:
     mdt — Medical Device Trays
     mit — Medical Implant Trays
     mt  — Medical Trays

   Behaviour:
     - PETG is selected by default.
     - All PETG products appear initially.
     - No "All PETG" filter button.
     - Material and category filters share one navigation bar.
     - PETG material introduction appears with each category
       description instead of in a separate section.
     - HIPS and APET retain their material descriptions.
     - Custom opens the common enquiry modal.
   ============================================================ */

const CATALOGUE_CATEGORIES = ["PETG", "HIPS", "APET", "Custom"];

let activeCategory = "PETG";
let activeSubcategory = "all";


/* ============================================================
   SHARED MATERIAL INTRODUCTIONS
   ============================================================ */

const MATERIAL_INTRODUCTIONS = {
  PETG:
    "PETG is a high-clarity, medical-grade material, precision thermoformed to meet specific product and protection requirements.",
};


/* ============================================================
   PRODUCT CATEGORY HELPERS
   ============================================================ */

function getProductSubcategory(product) {
  if (product.subcategory) {
    return product.subcategory;
  }

  if (product.material !== "PETG") {
    return null;
  }

  const name = product.name.toLowerCase();

  if (name.includes("medical device tray")) {
    return "mdt";
  }

  if (name.includes("medical implant tray")) {
    return "mit";
  }

  if (name.includes("medical tray")) {
    return "mt";
  }

  return null;
}


/* ============================================================
   PRODUCT CARD
   ============================================================ */

function productCardHtml(product, delayClass) {
  const productDescription =
    typeof getProductDescription === "function"
      ? getProductDescription(product)
      : product.description || "";

  return `
    <a
      href="product.html?id=${encodeURIComponent(product.id)}"
      class="no-underline"
    >
      <div class="pf-product-card reveal ${delayClass} h-full flex flex-col">

        <div class="pf-product-img-wrap">
          ${renderImage(
            resolveProductImage(getProductImages(product)[0]),
            product.name
          )}
        </div>

        <div class="p-6 flex flex-col flex-1">

          <div class="pf-tag mb-3">
            ${product.material}
          </div>

          <h3
            class="text-[#1a1a1a] mb-2"
            style="font-size:1.125rem;"
          >
            ${product.name}
          </h3>

          <p class="text-[#6b6b6b] text-sm line-clamp-2 mb-4 flex-1">
            ${productDescription}
          </p>

          <div class="flex items-center gap-1 text-sm font-medium text-[#2d2d2d] mt-auto">
            View Details

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
          </div>

        </div>
      </div>
    </a>
  `;
}


/* ============================================================
   MAIN MATERIAL NAVIGATION
   ============================================================ */

function renderCategoryTabs() {
  const bar = document.getElementById("category-tabs");

  if (!bar) return;

  bar.innerHTML = CATALOGUE_CATEGORIES.map((category) => `
    <button
      type="button"
      class="pf-filter-tab${category === activeCategory ? " active" : ""}"
      data-category="${category}"
      aria-pressed="${category === activeCategory}"
    >
      ${category}
    </button>
  `).join("");

  bar.querySelectorAll("[data-category]").forEach((button) => {
    button.addEventListener("click", () => {
      const selectedCategory = button.dataset.category;

      if (selectedCategory === "Custom") {
        if (typeof openCustomEnquiryModal === "function") {
          openCustomEnquiryModal();
        } else {
          console.error(
            "Custom enquiry modal function is not available."
          );
        }

        return;
      }

      activeCategory = selectedCategory;
      activeSubcategory = "all";

      renderCataloguePage();
    });
  });
}


/* ============================================================
   MATERIAL DESCRIPTION
   ============================================================ */

function renderCategoryDescription() {
  const informationSection = document.getElementById(
    "category-information"
  );

  const headingEl = document.getElementById("category-heading");
  const descriptionEl = document.getElementById("category-description");
  const materialNoteEl = document.getElementById("category-material-note");

  const config = CATEGORY_CONFIG[activeCategory];

  if (!config) {
    console.error(
      `Missing CATEGORY_CONFIG for ${activeCategory}.`
    );
    return;
  }

  // PETG introduction is integrated into the subcategory
  // description, so its separate information section is hidden.
  if (activeCategory === "PETG") {
    if (informationSection) {
      informationSection.style.display = "none";
    }

    return;
  }

  if (informationSection) {
    informationSection.style.display = "";
  }

  if (headingEl) {
    headingEl.textContent = `${config.name} Packaging Solutions`;
  }

  if (descriptionEl) {
    descriptionEl.textContent = config.description || "";
  }

  if (materialNoteEl) {
    materialNoteEl.textContent = config.materialNote || "";
  }
}


/* ============================================================
   PETG CATEGORY NAVIGATION
   ============================================================ */

function renderSubcategoryTabs() {
  const bar = document.getElementById("subcategory-tabs");
  const navigationGroup = document.getElementById(
    "subcategory-navigation-group"
  );

  if (!bar) return;

  const config = CATEGORY_CONFIG[activeCategory];
  const subcategories = config?.subcategories || {};

  const hasSubcategories = Object.keys(subcategories).length > 0;

  // HIPS and APET do not currently have subcategories.
  if (!hasSubcategories || activeCategory !== "PETG") {
    bar.innerHTML = "";

    if (navigationGroup) {
      navigationGroup.style.display = "none";
    }

    return;
  }

  if (navigationGroup) {
    navigationGroup.style.display = "";
  }

  // Fixed display order.
  const categoryOptions = [
    { id: "mdt", name: "Medical Device Trays" },
    { id: "mit", name: "Medical Implant Trays" },
    { id: "mt", name: "Medical Trays" },
  ].filter((item) => subcategories[item.id]);

  bar.innerHTML = categoryOptions.map((subcategory) => `
    <button
      type="button"
      class="pf-filter-tab pf-subcategory-tab${
        subcategory.id === activeSubcategory ? " active" : ""
      }"
      data-subcategory="${subcategory.id}"
      aria-pressed="${subcategory.id === activeSubcategory}"
    >
      ${subcategory.name}
    </button>
  `).join("");

  bar.querySelectorAll("[data-subcategory]").forEach((button) => {
    button.addEventListener("click", () => {
      activeSubcategory = button.dataset.subcategory;

      renderSubcategoryTabs();
      renderSubcategoryDescription();
      renderCatalogue();
    });
  });
}


/* ============================================================
   CATEGORY HEADING AND DESCRIPTION
   ============================================================ */

function renderSubcategoryDescription() {
  const headingEl = document.getElementById("subcategory-heading");
  const descriptionEl = document.getElementById(
    "subcategory-description"
  );

  if (!headingEl || !descriptionEl) return;

  // Initial PETG view displays all PETG products.
  if (
    activeCategory === "PETG" &&
    activeSubcategory === "all"
  ) {
    headingEl.textContent = "PETG Products";

    descriptionEl.textContent = "";
    descriptionEl.style.display = "none";

    return;
  }

  // HIPS and APET use their material descriptions above.
  if (activeCategory !== "PETG") {
    headingEl.textContent = `${activeCategory} Products`;

    descriptionEl.textContent = "";
    descriptionEl.style.display = "none";

    return;
  }

  const subcategory =
    CATEGORY_CONFIG.PETG.subcategories[activeSubcategory];

  if (!subcategory) return;

  headingEl.textContent = subcategory.name;

  const materialIntroduction =
    MATERIAL_INTRODUCTIONS.PETG;

  const subcategoryDescription =
    subcategory.description || "";

  descriptionEl.textContent = [
    materialIntroduction,
    subcategoryDescription
  ].filter(Boolean).join(" ");

  descriptionEl.style.display = "";
}


/* ============================================================
   PRODUCT GRID
   ============================================================ */

function renderCatalogue() {
  const grid = document.getElementById("product-grid");

  if (!grid) return;

  let filteredProducts = PRODUCTS.filter(
    (product) => product.material === activeCategory
  );

  // Apply subcategory filtering only for PETG.
  if (
    activeCategory === "PETG" &&
    activeSubcategory !== "all"
  ) {
    filteredProducts = filteredProducts.filter(
      (product) =>
        getProductSubcategory(product) === activeSubcategory
    );
  }

  grid.innerHTML = filteredProducts.length
    ? filteredProducts
        .map((product, index) => {
          const delayIdx = index % 6;

          const delayClass =
            delayIdx === 0 ? "" : `reveal-delay-${delayIdx}`;

          return productCardHtml(product, delayClass);
        })
        .join("")
    : `
      <div class="col-span-full py-12 text-center">
        <p class="text-[#6b6b6b]">
          No products are currently available in this category.
        </p>
      </div>
    `;

  resetAndObserveReveals(grid, 0.1);
}


/* ============================================================
   COMPLETE CATALOGUE RENDER
   ============================================================ */

function renderCataloguePage() {
  renderCategoryTabs();
  renderCategoryDescription();
  renderSubcategoryTabs();
  renderSubcategoryDescription();
  renderCatalogue();
}


/* ============================================================
   INITIALISE
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  renderCataloguePage();
});
