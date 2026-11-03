/* ============================================================
   PACKFORM GLOBAL — CATALOGUE FILTERS
   Renders the product grid from PRODUCTS (products.js) and
   handles the material filter tabs, matching the original
   animated filter transitions.
   ============================================================ */

const FILTERS = ["All", "PETG", "PLA", "RPET", "PVC", "Custom"];
let activeFilter = "All";

function productCardHtml(product, delayClass) {
  return `
    <a href="product.html?id=${encodeURIComponent(product.id)}" class="no-underline">
      <div class="pf-product-card reveal ${delayClass} h-full flex flex-col">
        <div class="pf-product-img-wrap">
          ${renderImage(resolveProductImage(getProductImages(product)[0]), product.name)}
        </div>
        <div class="p-6 flex flex-col flex-1">
          <div class="pf-tag mb-3">${product.material}</div>
          <h3 class="text-[#1a1a1a] mb-2" style="font-size:1.125rem;">${product.name}</h3>
          <p class="text-[#6b6b6b] text-sm line-clamp-2 mb-4 flex-1">${product.description}</p>
          <div class="flex items-center gap-1 text-sm font-medium text-[#2d2d2d] mt-auto">
            View Details
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </div>
        </div>
      </div>
    </a>
  `;
}

function renderCatalogue() {
  const grid = document.getElementById("product-grid");
  const countEl = document.getElementById("product-count");
  const filtered =
    activeFilter === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.material === activeFilter);

  grid.innerHTML = filtered
    .map((product, index) => {
      const delayIdx = index % 6;
      const delayClass = delayIdx === 0 ? "" : `reveal-delay-${delayIdx}`;
      return productCardHtml(product, delayClass);
    })
    .join("");

  if (countEl) countEl.textContent = `${filtered.length} products`;

  resetAndObserveReveals(grid, 0.1);
}

function renderFilterTabs() {
  const bar = document.getElementById("filter-tabs");
  bar.innerHTML = FILTERS.map(
    (f) =>
      `<button type="button" class="pf-filter-tab${f === activeFilter ? " active" : ""}" data-filter="${f}" aria-pressed="${f === activeFilter}">${f}</button>`
  ).join("");

  bar.querySelectorAll("[data-filter]").forEach((btn) => {
    btn.addEventListener("click", () => {
      activeFilter = btn.getAttribute("data-filter");
      renderFilterTabs();
      renderCatalogue();
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderFilterTabs();
  renderCatalogue();
});
