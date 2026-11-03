/* ============================================================
   PACKFORM GLOBAL — PRODUCT DATA
   ------------------------------------------------------------
   This is the ONLY file you need to edit to add, remove, or
   change products. See ADDING_NEW_PRODUCTS.md for a full guide.

   Each product needs:
     id          - unique slug, used in the URL (product.html?id=...)
     name        - product name shown on cards & detail page
     material    - one of: "PETG" | "PLA" | "RPET" | "PVC" | "Custom"
     description - short description shown on the catalogue card
     images      - ARRAY of image filenames for this product, e.g.:
                     images: ["petg_trayA_01.jpg", "petg_trayA_02.jpg"]
                   Files are loaded from assets/product-images/ — just
                   the filename goes here, no path needed. The catalogue
                   card and "You May Also Need" cards use the FIRST
                   entry; the product detail page renders a gallery
                   (main photo + thumbnails + lightbox) with exactly as
                   many images as are listed here — no more, no fewer,
                   nothing else to configure.

                   Until you have real photography for a product, keep
                   a single placeholder marker in the array, e.g.:
                     images: ["__PLACEHOLDER_PETG__"]
                   js/utils.js renders that as a labelled grey box
                   instead of a broken <img>.
   ============================================================ */

const PRODUCTS = 
[
  // PETG — 10 products
  {
    id: "petg-001",
    name: "PETG Medical Device Tray",
    material: "PETG",
    description:
      "High-clarity thermoformed tray for sterile medical device packaging. Designed for cleanroom environments and gamma sterilization compatibility.",
    moq: "5,000",
    images: ["__PLACEHOLDER_PETG__"],
  },
  {
    id: "petg-002",
    name: "PETG Electronics Component Tray",
    material: "PETG",
    description:
      "Anti-static PETG tray for precision electronics storage and transport. ESD-safe formulation with custom cavity configurations.",
    moq: "10,000",
    images: ["__PLACEHOLDER_PETG__"],
  },
  {
    id: "petg-003",
    name: "PETG Multi-Cavity Blister Pack",
    material: "PETG",
    description:
      "High-clarity multi-cavity blister packaging for consumer healthcare products. Excellent barrier properties and seal integrity.",
    moq: "20,000",
    images: ["__PLACEHOLDER_PETG__"],
  },
  {
    id: "petg-004",
    name: "PETG Rigid Clamshell Container",
    material: "PETG",
    description:
      "Snap-closure clamshell for retail display and product protection. Optically clear with high impact resistance across temperature ranges.",
    moq: "15,000",
    images: ["__PLACEHOLDER_PETG__"],
  },
  {
    id: "petg-005",
    name: "PETG Pharmaceutical Blister Tray",
    material: "PETG",
    description:
      "GMP-grade blister tray for unit-dose pharmaceutical packaging. Meets USP Class VI and FDA requirements for direct-contact drug applications.",
    moq: "50,000",
    images: ["__PLACEHOLDER_PETG__"],
  },
  {
    id: "petg-006",
    name: "PETG Diagnostic Kit Housing",
    material: "PETG",
    description:
      "Precision thermoformed housing for IVD diagnostic kits. Engineered for tight dimensional tolerances and cleanroom production.",
    moq: "8,000",
    images: ["__PLACEHOLDER_PETG__"],
  },
  {
    id: "petg-007",
    name: "PETG Industrial Parts Tray",
    material: "PETG",
    description:
      "Heavy-duty PETG tray for industrial component handling and shipping. Stackable design with custom foam insert compatibility.",
    moq: "3,000",
    images: ["__PLACEHOLDER_PETG__"],
  },
  {
    id: "petg-008",
    name: "PETG Surgical Instrument Tray",
    material: "PETG",
    description:
      "Sterilization-compatible tray for surgical instrument organization. Autoclave-rated with precision cavity machining.",
    moq: "2,500",
    images: ["__PLACEHOLDER_PETG__"],
  },
  {
    id: "petg-009",
    name: "PETG Cosmetic Insert Tray",
    material: "PETG",
    description:
      "Premium clear insert tray for luxury cosmetics packaging. Excellent gloss finish with tight forming tolerances for premium brand presentation.",
    moq: "25,000",
    images: ["__PLACEHOLDER_PETG__"],
  },
  {
    id: "petg-010",
    name: "PETG Retail Display Pod",
    material: "PETG",
    description:
      "Optically clear display pod for point-of-sale product presentation. High-gloss finish with integrated hanging hole feature.",
    moq: "10,000",
    images: ["__PLACEHOLDER_PETG__"],
  },

  // PLA — 10 products
  {
    id: "pla-001",
    name: "PLA Compostable Food Tray",
    material: "PLA",
    description:
      "Fully compostable PLA tray for fresh food and bakery packaging. Certified OK Compost and TÜV AUSTRIA for industrial composting.",
    moq: "30,000",
    images: ["__PLACEHOLDER_PLA__"],
  },
  {
    id: "pla-002",
    name: "PLA Clear Deli Container",
    material: "PLA",
    description:
      "Crystal-clear PLA hinged deli container with snap-close lid. Suitable for salads, desserts, and prepared foods. Freezer-safe formulation.",
    moq: "50,000",
    images: ["__PLACEHOLDER_PLA__"],
  },
  {
    id: "pla-003",
    name: "PLA Produce Clamshell Tray",
    material: "PLA",
    description:
      "Bio-based produce packaging with ventilation perforations. Maintains freshness while meeting retail sustainability commitments.",
    moq: "40,000",
    images: ["__PLACEHOLDER_PLA__"],
  },
  {
    id: "pla-004",
    name: "PLA Seedling Propagation Tray",
    material: "PLA",
    description:
      "Agricultural-grade PLA tray for seedling propagation. Designed to biodegrade in commercial composting facilities post-use.",
    moq: "20,000",
    images: ["__PLACEHOLDER_PLA__"],
  },
  {
    id: "pla-005",
    name: "PLA Eco Thermoform Insert",
    material: "PLA",
    description:
      "Sustainable thermoform insert for eco-conscious consumer brands. Excellent compatibility with paper-based outer packaging.",
    moq: "15,000",
    images: ["__PLACEHOLDER_PLA__"],
  },
  {
    id: "pla-006",
    name: "PLA Coffee Capsule Shell",
    material: "PLA",
    description:
      "Compostable single-use coffee capsule outer shell. Compatible with major espresso system geometries. Aroma barrier coating available.",
    moq: "100,000",
    images: ["__PLACEHOLDER_PLA__"],
  },
  {
    id: "pla-007",
    name: "PLA Bakery Window Lid",
    material: "PLA",
    description:
      "Bio-based transparent lid for bakery box cartons. High clarity with anti-fog coating for refrigerated display applications.",
    moq: "50,000",
    images: ["__PLACEHOLDER_PLA__"],
  },
  {
    id: "pla-008",
    name: "PLA Cosmetic Sample Tray",
    material: "PLA",
    description:
      "Sustainable cosmetic sample insert tray made from NatureWorks Ingeo PLA. For brands with packaging sustainability declarations.",
    moq: "20,000",
    images: ["__PLACEHOLDER_PLA__"],
  },
  {
    id: "pla-009",
    name: "PLA Cold Chain Compartment Tray",
    material: "PLA",
    description:
      "Low-temperature rated PLA tray for pharmaceutical cold chain transport. Maintains dimensional integrity down to -20°C.",
    moq: "10,000",
    images: ["__PLACEHOLDER_PLA__"],
  },
  {
    id: "pla-010",
    name: "PLA Retail Hang Tab Blister",
    material: "PLA",
    description:
      "Eco-conscious hang-tab blister for sustainable retail brands. Recyclable in facilities accepting PLA stream materials.",
    moq: "30,000",
    images: ["__PLACEHOLDER_PLA__"],
  },

  // RPET — 10 products
  {
    id: "rpet-001",
    name: "RPET Recycled Content Tray",
    material: "RPET",
    description:
      "Thermoformed tray manufactured from 100% post-consumer recycled PET. Reduces virgin plastic use by up to 85% versus conventional packaging.",
    moq: "20,000",
    images: ["__PLACEHOLDER_RPET__"],
  },
  {
    id: "rpet-002",
    name: "RPET Supermarket Ready Meal Tray",
    material: "RPET",
    description:
      "Dual-ovenable RPET tray for ambient and chilled ready meal applications. Certified food-contact safe with recycled content declaration.",
    moq: "100,000",
    images: ["__PLACEHOLDER_RPET__"],
  },
  {
    id: "rpet-003",
    name: "RPET Deli Packaging Insert",
    material: "RPET",
    description:
      "High-clarity recycled insert for premium deli and charcuterie presentation. Suitable for direct food contact with full traceability.",
    moq: "50,000",
    images: ["__PLACEHOLDER_RPET__"],
  },
  {
    id: "rpet-004",
    name: "RPET Electronics Packing Tray",
    material: "RPET",
    description:
      "Sustainable electronics transport tray using recycled PET. Meets leading OEM sustainability packaging requirements.",
    moq: "15,000",
    images: ["__PLACEHOLDER_RPET__"],
  },
  {
    id: "rpet-005",
    name: "RPET Cosmetic Refill Platform",
    material: "RPET",
    description:
      "Circular-economy cosmetic refill platform tray. Designed for closed-loop collection and re-thermoforming programs.",
    moq: "10,000",
    images: ["__PLACEHOLDER_RPET__"],
  },
  {
    id: "rpet-006",
    name: "RPET Pharma Secondary Pack",
    material: "RPET",
    description:
      "Recycled content secondary packaging tray for OTC pharmaceutical products. Maintains hygiene standards with food-grade RPET material.",
    moq: "25,000",
    images: ["__PLACEHOLDER_RPET__"],
  },
  {
    id: "rpet-007",
    name: "RPET Automotive Parts Carrier",
    material: "RPET",
    description:
      "Heavy-duty recycled tray for automotive components assembly lines. Engineered for repetitive handling cycles in JIT environments.",
    moq: "5,000",
    images: ["__PLACEHOLDER_RPET__"],
  },
  {
    id: "rpet-008",
    name: "RPET Apparel Hang Pack",
    material: "RPET",
    description:
      "Sustainable hang packaging insert for folded apparel. Made from ocean-bound recycled PET with verified chain-of-custody.",
    moq: "40,000",
    images: ["__PLACEHOLDER_RPET__"],
  },
  {
    id: "rpet-009",
    name: "RPET Stationery Blister Card",
    material: "RPET",
    description:
      "Recycled blister packaging for stationery and office products. Achieving recycled content targets for corporate sustainability reporting.",
    moq: "30,000",
    images: ["__PLACEHOLDER_RPET__"],
  },
  {
    id: "rpet-010",
    name: "RPET Hardware Component Tray",
    material: "RPET",
    description:
      "Industrial-grade RPET tray for hardware and fastener retail display. Withstands warehouse racking loads and point-of-sale handling.",
    moq: "8,000",
    images: ["__PLACEHOLDER_RPET__"],
  },

  // PVC — 10 products
  {
    id: "pvc-001",
    name: "PVC Pharmacy Blister Film",
    material: "PVC",
    description:
      "Standard-gauge PVC blister film for unit-dose oral solid dose packaging. Excellent formability and hermetic seal with aluminum foil lidding.",
    moq: "100,000",
    images: ["__PLACEHOLDER_PVC__"],
  },
  {
    id: "pvc-002",
    name: "PVC Rigid Sheet Thermoform",
    material: "PVC",
    description:
      "High-gloss rigid PVC thermoformed insert for consumer product display. Outstanding clarity and excellent printability for in-store branding.",
    moq: "30,000",
    images: ["__PLACEHOLDER_PVC__"],
  },
  {
    id: "pvc-003",
    name: "PVC Calendar Blister Pack",
    material: "PVC",
    description:
      "Precision thermoformed calendar blister for contraceptive and supplement compliance packaging. Push-through functionality validated to ISO standards.",
    moq: "50,000",
    images: ["__PLACEHOLDER_PVC__"],
  },
  {
    id: "pvc-004",
    name: "PVC Toy Packaging Blister",
    material: "PVC",
    description:
      "High-impact PVC clamshell and blister for toy retail packaging. Anti-fog coating available for clear product visibility at point of sale.",
    moq: "25,000",
    images: ["__PLACEHOLDER_PVC__"],
  },
  {
    id: "pvc-005",
    name: "PVC Hardware Hang Pack",
    material: "PVC",
    description:
      "Clear PVC hang packaging for hardware retail display. Resealable with double-blister construction for fastener and accessory products.",
    moq: "20,000",
    images: ["__PLACEHOLDER_PVC__"],
  },
  {
    id: "pvc-006",
    name: "PVC Cold Seal Blister Base",
    material: "PVC",
    description:
      "Ultra-low temperature thermoformed PVC blister base for cold seal pharmaceutical applications. Validated for peel force consistency.",
    moq: "75,000",
    images: ["__PLACEHOLDER_PVC__"],
  },
  {
    id: "pvc-007",
    name: "PVC Document Protection Sleeve",
    material: "PVC",
    description:
      "Crystal-clear PVC protective sleeve for documentation and certificate packaging. Archival-safe and UV-resistant formulation.",
    moq: "50,000",
    images: ["__PLACEHOLDER_PVC__"],
  },
  {
    id: "pvc-008",
    name: "PVC Cosmetic Retail Blister",
    material: "PVC",
    description:
      "Premium gloss PVC blister card for cosmetics retail display. Tri-fold blister design for maximum visual shelf presence.",
    moq: "30,000",
    images: ["__PLACEHOLDER_PVC__"],
  },
  {
    id: "pvc-009",
    name: "PVC Electronics Retail Pack",
    material: "PVC",
    description:
      "Anti-static clear PVC blister for consumer electronics accessories. Designed for retail planogram compliance and theft deterrence.",
    moq: "20,000",
    images: ["__PLACEHOLDER_PVC__"],
  },
  {
    id: "pvc-010",
    name: "PVC Industrial Seal Film",
    material: "PVC",
    description:
      "Industrial-grade PVC seal film for automated thermoforming lines. Consistent gauge tolerance with full roll traceability documentation.",
    moq: "200,000",
    images: ["__PLACEHOLDER_PVC__"],
  },

  // Custom — 10 products
  {
    id: "custom-001",
    name: "Custom Hybrid Material Tray",
    material: "Custom",
    description:
      "Engineered hybrid material tray combining structural rigidity with surface aesthetics. Developed in partnership with your material and packaging teams.",
    moq: "2,000",
    images: ["__PLACEHOLDER_Custom__"],
  },
  {
    id: "custom-002",
    name: "Custom Bio-Based Barrier Pack",
    material: "Custom",
    description:
      "Proprietary bio-based formulation with integrated moisture barrier. Developed for clients with dual performance and sustainability mandates.",
    moq: "5,000",
    images: ["__PLACEHOLDER_Custom__"],
  },
  {
    id: "custom-003",
    name: "Custom Multilayer Co-Extrusion Tray",
    material: "Custom",
    description:
      "Multilayer co-extruded tray with oxygen and moisture barriers. Tailored gas barrier performance for extended shelf-life applications.",
    moq: "10,000",
    images: ["__PLACEHOLDER_Custom__"],
  },
  {
    id: "custom-004",
    name: "Custom Anti-Corrosion Industrial Tray",
    material: "Custom",
    description:
      "VCI-impregnated custom tray for precision metal component protection. Prevents corrosion during ocean freight and long-term storage.",
    moq: "3,000",
    images: ["__PLACEHOLDER_Custom__"],
  },
  {
    id: "custom-005",
    name: "Custom Conductive Foam-Lined Carrier",
    material: "Custom",
    description:
      "ESD-certified custom packaging carrier with integrated conductive foam. Designed for semiconductor and PCB component protection.",
    moq: "2,500",
    images: ["__PLACEHOLDER_Custom__"],
  },
  {
    id: "custom-006",
    name: "Custom Shape Thermoform System",
    material: "Custom",
    description:
      "Bespoke thermoform system for uniquely shaped products. Tooling engineered from your CAD data with full pre-production validation.",
    moq: "1,500",
    images: ["__PLACEHOLDER_Custom__"],
  },
  {
    id: "custom-007",
    name: "Custom Pigmented Opaque Tray",
    material: "Custom",
    description:
      "Precisely pigmented opaque tray for light-sensitive product protection. Custom color matching to Pantone or brand specifications.",
    moq: "8,000",
    images: ["__PLACEHOLDER_Custom__"],
  },
  {
    id: "custom-008",
    name: "Custom Luxury Presentation Box Insert",
    material: "Custom",
    description:
      "Precision-formed luxury insert for premium brand packaging. Suede-texture or matte finish surface treatment available.",
    moq: "2,000",
    images: ["__PLACEHOLDER_Custom__"],
  },
  {
    id: "custom-009",
    name: "Custom Cleanroom Medical Pack",
    material: "Custom",
    description:
      "ISO Class 7 cleanroom-produced custom medical packaging. Traceable lot control with certificate of conformance on every shipment.",
    moq: "1,000",
    images: ["__PLACEHOLDER_Custom__"],
  },
  {
    id: "custom-010",
    name: "Custom Food-Grade Active Tray",
    material: "Custom",
    description:
      "Active packaging tray with integrated moisture absorber and oxygen scavenger. Extends fresh produce shelf life by up to 40%.",
    moq: "20,000",
    images: ["__PLACEHOLDER_Custom__"],
  },
];

function getProductById(id) {
  return PRODUCTS.find((p) => p.id === id);
}

function getRelatedProducts(material, excludeId, count = 3) {
  return PRODUCTS.filter((p) => p.material === material && p.id !== excludeId).slice(0, count);
}
