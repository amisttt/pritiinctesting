# Priti Inc — Static Website

A pure HTML + CSS + JavaScript rebuild of the Priti Inc site.
No Node.js, no npm, no build step — upload the files as-is to Hostinger,
or open `index.html` directly in a browser to preview locally.

## Folder Structure

```
/
├── index.html            Home page
├── about.html             About Us page
├── catalogue.html         Product catalogue (filterable grid)
├── product.html           Product detail page (reads ?id=... from the URL)
├── contact.html           Contact page
├── css/
│   └── style.css          Design system: colors, type scale, components, animations
├── js/
│   ├── main.js             Injects the shared Nav + Footer into every page
│   ├── animations.js       Scroll-reveal (IntersectionObserver) + parallax
│   ├── products.js         ⭐ Product data — the file you edit to manage products
│   ├── filters.js          Catalogue filter tabs + product grid rendering
│   ├── product-detail.js   Renders the single product page + material copy
│   ├── quote-modal.js      "Get Quote" modal, submits via mailto:
│   ├── contact.js          Contact form, submits via mailto:
│   └── utils.js            Shared helpers (placeholder images, query params, mailto builder)
├── assets/
│   ├── images/             Drop general site photography here
│   └── icons/              Drop certification badges / icons here
├── README.md               This file
└── ADDING_NEW_PRODUCTS.md  Step-by-step guide to managing the catalogue
```

## How to Upload to Hostinger

1. Log in to Hostinger → **File Manager** (or connect via FTP).
2. Open your domain's `public_html` folder.
3. Upload every file and folder from this project **as-is**, keeping the
   folder structure (`css/`, `js/`, `assets/` must sit next to the `.html`
   files).
4. Visit your domain — the site works immediately, no build or install step.

You can also just double-click `index.html` on your own computer to preview
the site before uploading (a few effects like `background-attachment: fixed`
parallax may behave slightly differently over `file://` vs a real server,
but everything else works fine).

## About the Placeholder Images

The original project generated all photography on the fly through an AI
image service that isn't available outside that platform, so this export
doesn't include any real photos. Every image slot (hero, banners, capability
blocks, industry cards, product photos, certification badges) currently
renders as a light grey **labelled placeholder box** that preserves the
exact aspect ratio, layout, and hover animation of the real image it stands
in for.

**To replace a placeholder with a real photo:**

- **Product photos** — see `ADDING_NEW_PRODUCTS.md`, section "Replacing a
  product photo."
- **Everything else (hero, banners, capability/industry sections, cert
  badges)** — open the relevant `.html` file, find the
  `<div class="pf-placeholder">...</div>` for that section (the label text
  tells you which image and its recommended dimensions), and replace it
  with a real `<img>` tag, e.g.:

  ```html
  <!-- Before -->
  <div class="pf-placeholder"><span>Hero: Manufacturing Facility (1920x1080)</span></div>

  <!-- After -->
  <img src="assets/images/hero-manufacturing.jpg" alt="Manufacturing facility" class="pf-hero-bg" style="object-fit:cover;" />
  ```

  For background-image style placeholders (hero, banners, parallax strip),
  keep the same wrapper `<div>` and just switch to a real background image:

  ```html
  <div class="pf-hero-bg" style="background-image:url('assets/images/hero-manufacturing.jpg');"></div>
  ```

## Editing Products

All 50 products live in `js/products.js` as a single JavaScript array. See
**`ADDING_NEW_PRODUCTS.md`** for the full guide — in short, adding a new
product only requires editing that one file (plus dropping an image into
`assets/product-images/` if you have a real photo).

## Editing Categories / Filters

Material categories (currently `PETG`, `PLA`, `RPET`, `PVC`, `Custom`) are
listed in two places that need to stay in sync:

1. The `FILTERS` array at the top of `js/filters.js` (controls the filter
   tab buttons on the Catalogue page).
2. The `material` field on each product object in `js/products.js`.

To add a new category, add its name to `FILTERS` and start using it as the
`material` value on any products you want tagged with it — the filter tab
will pick it up automatically. See `ADDING_NEW_PRODUCTS.md` for a worked
example.

## Contact Form & "Get Quote" Modal

The original site submitted these forms to a backend server. A static
Hostinger site has no backend, so both forms now build a **`mailto:`**
link (pre-filled with a subject line and the form's contents) and open the
visitor's email client when submitted. This requires no configuration and
works out of the box, but the visitor's own email client must be set up to
send mail.

**If you'd rather have submissions land directly in an inbox or database
without relying on the visitor's email client**, swap the `mailto:` step
in `js/contact.js` and `js/quote-modal.js` for a form-backend service such
as [Formspree](https://formspree.io), [Getform](https://getform.io), or
[Web3Forms](https://web3forms.com) — these are free/low-cost services that
accept a normal `fetch()`/form POST from static sites and forward
submissions to your email. Each service gives you an endpoint URL and a
couple of lines of example code to paste in.

## Maintaining the Project

- **Global colors, fonts, spacing, animations** → `css/style.css`
  (the `:root` block at the top holds all the design tokens).
- **Navigation links / footer content** → `js/main.js`
  (`NAV_LINKS` array and the `renderFooter()` function).
- **Page copy** (headlines, paragraphs) → edit directly inside the
  relevant `.html` file; all text is plain HTML, not templated.
- **Products & categories** → `js/products.js` and `js/filters.js`
  (see `ADDING_NEW_PRODUCTS.md`).

No file needs npm, Vite, React, or any build step — every change takes
effect the moment you save and re-upload the file.
