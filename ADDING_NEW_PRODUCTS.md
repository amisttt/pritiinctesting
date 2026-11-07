# Adding, Editing & Removing Products

Everything about the product catalogue lives in **one file**:
`js/products.js`. You will only need a second location — the
`assets/product-images/` folder — if you're adding real photos.

## 1. Where product images go

```
assets/
└── product-images/
    ├── petg_trayA_01.jpg
    ├── petg_trayA_02.jpg
    ├── petg_trayA_03.jpg
    ├── pla_box_01.jpg
    └── ...
```

Create this folder if it doesn't exist yet, and put every product photo
inside it. Keep filenames lowercase with underscores or hyphens, no spaces
(e.g. `petg_trayA_01.jpg`, not `PETG Tray A 01.JPG`).

Recommended size: roughly **800×800px**, JPG or WebP, under ~300KB so pages
load quickly.

### The gallery is fully dynamic — no fixed number of images

Each product has an `images` array in `js/products.js` (see §2). The
product detail page automatically renders exactly as many images as are
in that array — as the main photo, the thumbnail row, and the lightbox —
whether that's 1 image or 15. There are no empty placeholder slots, and
you never need to touch any code to change the count:

- **To add more photos** to a product: upload the files into
  `assets/product-images/` and add their filenames to that product's
  `images` array. Nothing else needs editing.
- **To remove a photo**: delete its filename from the `images` array
  (the file itself can stay in the folder or be deleted too). The
  gallery automatically shows one fewer image.

This works because the site is static with no backend — browsers can't
scan a folder to "discover" images on their own, so the `images` array
in `js/products.js` is the single source of truth for which photos exist
for each product.

## 2. Adding a new product object

Open `js/products.js` and find the `PRODUCTS` array. Copy an existing
product block that's closest to what you need and change the values:

```js
{
  id: "petg-011",                       // unique — see rule below
  name: "PETG Cosmetic Insert Tray",     // shown on the card & detail page
  material: "PETG",                     // must match an existing category, or a new one (see §9)
  description:
    "Short 1-2 sentence description shown on the catalogue card.",
  moq: "5,000",                         // minimum order quantity, as text
  images: [                             // as many filenames as you have photos
    "petg-cosmetic-insert-01.jpg",
    "petg-cosmetic-insert-02.jpg",
    "petg-cosmetic-insert-03.jpg",
  ],
},
```

Just the filename goes in `images` — not the folder path. The site loads
every entry from `assets/product-images/` automatically. The catalogue
card and "You May Also Need" cards use the first entry in the array as
the product's thumbnail; the detail page gallery uses all of them.

Add this object anywhere inside the `PRODUCTS` array (a new line before the
closing `];` is easiest). Save the file — no build step needed, just
re-upload it.

**`id` rules:** must be unique across the whole array. The convention used
throughout is `<material-lowercase>-<3-digit-number>`, e.g. `pvc-006`, but
any unique slug works — it's what shows up in the URL as
`product.html?id=your-id`.

## 3. Assigning its category

Set the `material` field to one of the existing categories:
`"PETG"`, `"PLA"`, `"RPET"`, `"PVC"`, or `"Custom"` — or a brand-new
category name (see §9 below).

## 4. How filters detect categories

The filter tab **buttons** on the Catalogue page come from the `FILTERS`
array at the top of `js/filters.js`:

```js
const FILTERS = ["All", "PETG", "PLA", "RPET", "PVC", "Custom"];
```

Filtering itself just compares each product's `material` field against the
active tab. So:

- Using an **existing** category on a new product → nothing else to do,
  it'll show up under that tab automatically.
- Using a **brand-new** category → you must also add it to the `FILTERS`
  array (see §9), or it'll only show up under the "All" tab.

## 5. How products are sorted

Products display in the exact order they appear in the `PRODUCTS` array —
there's no automatic sorting. To reorder the grid, reorder the objects in
the array.

## 6. Changing product information

Find the product's object in `js/products.js` by its `id` or `name`, and
edit any field (`name`, `description`, `moq`, `material`). Changes apply to
both the catalogue card and the product detail page immediately.

To edit the longer technical copy shown on the **detail page** (the
material-specific paragraphs under "Technical Information"), see the
`MATERIAL_DESCRIPTIONS` object near the top of `js/product-detail.js` —
this copy is shared by every product of that material, not per-product.

## 7. Replacing or adding a product's photos

1. Drop the new image file(s) into `assets/product-images/`.
2. In `js/products.js`, update that product's `images` array with the
   filename(s), e.g.:
   ```js
   images: ["petg-medical-tray-v2-01.jpg", "petg-medical-tray-v2-02.jpg"],
   ```
   The gallery on the product detail page (main photo, thumbnails, and
   lightbox) automatically shows exactly as many images as are listed
   here — add a filename to show one more, remove one to show one
   fewer. No other file needs to change.

Until you add real photos, keep a single placeholder marker in the
array, e.g. `images: ["__PLACEHOLDER_PETG__"]`, which `js/utils.js`
renders as a labelled grey box instead of a broken `<img>` tag — so
nothing breaks visually while you're still sourcing real photography.

## 8. Removing a product

Delete its whole `{ ... }` object (including the surrounding braces and
trailing comma) from the `PRODUCTS` array in `js/products.js`. It will
disappear from the catalogue and its detail page (`product.html?id=...`)
will show a friendly "Product Not Found" message if anyone still links to
it.

## 9. Creating an entirely new material category

1. **`js/products.js`** — start using the new category name as the
   `material` value on any product(s), e.g. `material: "Bioplastic"`.
2. **`js/filters.js`** — add the same name to the `FILTERS` array so a
   filter tab appears for it:
   ```js
   const FILTERS = ["All", "PETG", "PLA", "RPET", "PVC", "Custom", "Bioplastic"];
   ```
3. *(Optional)* **`js/product-detail.js`** — add an entry to
   `MATERIAL_DESCRIPTIONS` keyed by the new category name, with 4
   paragraphs of technical copy for the detail page. If you skip this,
   products in the new category will fall back to the PETG copy.

That's it — no other files need to change.

## 10. Keeping everything in one file

For 95% of catalogue changes (add, edit, remove, reorder, re-categorize an
existing product), **`js/products.js` is the only file you need to touch.**
You only need to also touch `js/filters.js` when introducing a brand-new
material category, and `js/product-detail.js` only if you want unique
technical copy for that new category rather than reusing PETG's.
