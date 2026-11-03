/* ============================================================
   PACKFORM GLOBAL — UTILITIES
   Small shared helpers used across pages.
   ============================================================ */

/**
 * Human-readable labels for the placeholder image keys used in
 * products.js and inline in the HTML pages. Swap the underlying
 * markup (see renderPlaceholder / renderImage below) for a real
 * <img> tag once you have real photography — see
 * ADDING_NEW_PRODUCTS.md and README.md for instructions.
 */
const PLACEHOLDER_LABELS = {
  __PLACEHOLDER_PETG__: "PETG Product Photo",
  __PLACEHOLDER_PLA__: "PLA Product Photo",
  __PLACEHOLDER_RPET__: "RPET Product Photo",
  __PLACEHOLDER_PVC__: "PVC Product Photo",
  __PLACEHOLDER_Custom__: "Custom Product Photo",
};

/**
 * Renders either a real <img> (if the src does not start with the
 * "__PLACEHOLDER_" marker) or a styled placeholder box with a label,
 * so the layout, aspect ratio, and hover effects all still work
 * before real photography is dropped in.
 */
function renderImage(src, alt, opts = {}) {
  const { className = "", loading = "lazy", small = false, id = "" } = opts;
  const idAttr = id ? ` id="${id}"` : "";
  if (typeof src === "string" && src.startsWith("__PLACEHOLDER_")) {
    const label = PLACEHOLDER_LABELS[src] || alt || "Image";
    return `<div${idAttr} class="pf-placeholder${small ? " pf-placeholder-sm" : ""} ${className}"><span>${escapeHtml(label)}</span></div>`;
  }
  return `<img${idAttr} src="${src}" alt="${escapeHtml(alt || "")}" class="${className}" loading="${loading}" />`;
}

/**
 * Every product's `images` array holds either a placeholder marker
 * (e.g. "__PLACEHOLDER_PETG__") or a bare filename (e.g.
 * "petg_trayA_01.jpg"). This resolves a bare filename to its full
 * path under assets/product-images/, and passes placeholder markers
 * or already-qualified paths straight through unchanged. This is the
 * single place that knows where product photos live on disk — see
 * ADDING_NEW_PRODUCTS.md.
 */
function resolveProductImage(entry) {
  if (typeof entry !== "string") return entry;
  if (entry.startsWith("__PLACEHOLDER_")) return entry;
  if (entry.startsWith("assets/product-images/") || entry.startsWith("/") || entry.startsWith("http")) {
    return entry;
  }
  return `assets/product-images/${entry}`;
}

/**
 * Returns a product's images as a safe array. Falls back to a single
 * placeholder if `images` is missing or empty, so the gallery never
 * has zero images to render.
 */
function getProductImages(product) {
  if (product && Array.isArray(product.images) && product.images.length > 0) {
    return product.images;
  }
  return ["__PLACEHOLDER_PETG__"];
}

/** Generic full-bleed placeholder for hero/banner background divs. */
function placeholderBackgroundDiv(label, className = "") {
  return `<div class="pf-placeholder ${className}" style="position:absolute;inset:0;"><span>${escapeHtml(label)}</span></div>`;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/** Reads a query-string parameter from the current URL. */
function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

/** Builds a mailto: link with a prefilled subject and body. */
function buildMailtoLink({ to, subject, bodyLines }) {
  const body = bodyLines.filter(Boolean).join("\n");
  const params = new URLSearchParams({ subject, body });
  return `mailto:${to}?${params.toString().replace(/\+/g, "%20")}`;
}
