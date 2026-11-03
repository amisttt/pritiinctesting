/* ============================================================
   PACKFORM GLOBAL — ANIMATIONS
   IntersectionObserver-driven scroll reveals + parallax.
   Recreates the original useReveal() / useParallax() React hooks
   in vanilla JS.
   ============================================================ */

/**
 * Observes every .reveal element currently in the document and
 * adds .is-visible the first time each one enters the viewport.
 * Call this again after injecting new markup (e.g. after a
 * catalogue filter re-render) to pick up new .reveal elements.
 */
function initRevealObserver(root = document, threshold = 0.15) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold }
  );

  const elements = root.querySelectorAll(".reveal:not(.is-visible)");
  for (const el of elements) {
    observer.observe(el);
  }
  return observer;
}

/**
 * Re-runs the reveal animation for a freshly-rendered container
 * (used by the catalogue filter, which replaces the whole grid).
 */
function resetAndObserveReveals(container, threshold = 0.1) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold }
  );
  const elements = container.querySelectorAll(".reveal");
  for (const el of elements) {
    el.classList.remove("is-visible");
    observer.observe(el);
  }
  return observer;
}

/**
 * Subtle background-position parallax on the manufacturing process
 * image on the Home page, matching the original scroll handler.
 */
function initProcessParallax() {
  const el = document.getElementById("process-parallax-img");
  if (!el) return;
  const onScroll = () => {
    const rect = el.getBoundingClientRect();
    const offset = (rect.top / window.innerHeight) * 30;
    el.style.backgroundPositionY = `calc(50% + ${offset}px)`;
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

document.addEventListener("DOMContentLoaded", () => {
  initRevealObserver();
  initProcessParallax();
});
