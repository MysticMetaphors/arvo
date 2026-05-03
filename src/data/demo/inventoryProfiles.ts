// =============================================================================
// Industry profiles for the Inventory demo.
// Each non-default profile reseeds products + vendors when the user switches.
// =============================================================================

import { Product, Vendor, ProfileId } from "./inventoryData";

export interface ProfileMeta {
  id: ProfileId;
  name: string;
  blurb: string;
  examples: string;
  productIdLabel: string; // "SKU" | "Item code" | "NDC" | "Part #"
  productIdExample: string;
}

export interface ProfileData {
  meta: ProfileMeta;
  products: Product[];
  vendors: Vendor[];
}

// Retail meta (data lives in inventoryData.ts as the default seeds).
export const retailMeta: ProfileMeta = {
  id: "retail",
  name: "Workspace Retail",
  blurb: "Multi-branch tech & furniture retailer with POS, AI suggestions, and PO workflow.",
  examples: "Helios 14 Pro · Aeris Mesh Chair · Vantage 27\" 4K",
  productIdLabel: "SKU",
  productIdExample: "CMP-1401",
};

// -----------------------------------------------------------------------------
// F&B / Café
// -----------------------------------------------------------------------------

const fbVendors: Vendor[] = [
  { id: 1, name: "Sunrise Roasters",        contactEmail: "orders@sunrise-roasters.coop", contactPhone: "+1-503-555-0188", leadTimeDays: 4,  onTimeDeliveryPct: 96.2, openPOs: 2, lastOrderMinutesAgo: 23,   preferredCategories: ["Coffee","Beverages"] },
  { id: 2, name: "Meadowfield Dairy",       contactEmail: "ap@meadowfield-dairy.com",     contactPhone: "+1-608-555-0119", leadTimeDays: 2,  onTimeDeliveryPct: 98.8, openPOs: 3, lastOrderMinutesAgo: 14,   preferredCategories: ["Dairy"] },
  { id: 3, name: "Heritage Bakeshop",       contactEmail: "orders@heritage-bakeshop.com", contactPhone: "+1-718-555-0173", leadTimeDays: 1,  onTimeDeliveryPct: 99.4, openPOs: 1, lastOrderMinutesAgo: 47,   preferredCategories: ["Bakery"] },
  { id: 4, name: "Verde Farms Co-op",       contactEmail: "supply@verdefarms.coop",       contactPhone: "+1-413-555-0144", leadTimeDays: 3,  onTimeDeliveryPct: 92.6, openPOs: 2, lastOrderMinutesAgo: 89,   preferredCategories: ["Produce"] },
  { id: 5, name: "Coastal Provisions",      contactEmail: "orders@coastal-provisions.io", contactPhone: "+1-203-555-0157", leadTimeDays: 5,  onTimeDeliveryPct: 89.9, openPOs: 1, lastOrderMinutesAgo: 312,  preferredCategories: ["Pantry"] },
  { id: 6, name: "Polaris Sweeteners",      contactEmail: "billing@polaris-sweet.com",    contactPhone: "+1-617-555-0166", leadTimeDays: 7,  onTimeDeliveryPct: 94.1, openPOs: 0, lastOrderMinutesAgo: 1410, preferredCategories: ["Pantry"] },
];

const fbProducts: Product[] = [
  { id: 1,  sku: "BEV-0042", name: "House Espresso Beans · 1kg",     category: "Coffee",    stock: 38, price: 28.50, status: "active", reorderPoint: 20, vendorId: 1, meta: { unitOfMeasure: "kg",      expiry: "2026-09-12" } },
  { id: 2,  sku: "BEV-0043", name: "Single-Origin Ethiopia · 500g",  category: "Coffee",    stock: 12, price: 21.00, status: "active", reorderPoint: 15, vendorId: 1, meta: { unitOfMeasure: "500g",    expiry: "2026-08-20" } },
  { id: 3,  sku: "DAI-0101", name: "Whole Milk · 2L",                 category: "Dairy",    stock: 60, price: 4.25,  status: "active", reorderPoint: 40, vendorId: 2, meta: { unitOfMeasure: "L",       expiry: "2026-05-10" } },
  { id: 4,  sku: "DAI-0102", name: "Oat Milk Barista · 1L",           category: "Dairy",    stock: 22, price: 5.60,  status: "active", reorderPoint: 25, vendorId: 2, meta: { unitOfMeasure: "L",       expiry: "2026-06-04" } },
  { id: 5,  sku: "DAI-0110", name: "Heavy Cream · 1L",                category: "Dairy",    stock: 8,  price: 6.40,  status: "low",    reorderPoint: 15, vendorId: 2, meta: { unitOfMeasure: "L",       expiry: "2026-05-08" } },
  { id: 6,  sku: "BAK-0201", name: "Sourdough Loaf",                  category: "Bakery",   stock: 14, price: 8.50,  status: "active", reorderPoint: 10, vendorId: 3, meta: { unitOfMeasure: "each",    expiry: "2026-05-04" } },
  { id: 7,  sku: "BAK-0202", name: "Almond Croissant",                category: "Bakery",   stock: 0,  price: 4.75,  status: "out",    reorderPoint: 12, vendorId: 3, meta: { unitOfMeasure: "each",    expiry: "2026-05-04" } },
  { id: 8,  sku: "BAK-0210", name: "Multigrain Bagel · 6-pack",       category: "Bakery",   stock: 18, price: 9.20,  status: "active", reorderPoint: 12, vendorId: 3, meta: { unitOfMeasure: "pack",    expiry: "2026-05-06" } },
  { id: 9,  sku: "PRD-0301", name: "Hass Avocado",                    category: "Produce",  stock: 42, price: 2.10,  status: "active", reorderPoint: 30, vendorId: 4, meta: { unitOfMeasure: "each",    expiry: "2026-05-09" } },
  { id: 10, sku: "PRD-0310", name: "Cherry Tomato · 500g",            category: "Produce",  stock: 6,  price: 4.30,  status: "low",    reorderPoint: 10, vendorId: 4, meta: { unitOfMeasure: "500g",    expiry: "2026-05-07" } },
  { id: 11, sku: "PRD-0320", name: "Mixed Greens · 1kg",              category: "Produce",  stock: 9,  price: 12.40, status: "active", reorderPoint: 8,  vendorId: 4, meta: { unitOfMeasure: "kg",      expiry: "2026-05-06" } },
  { id: 12, sku: "PAN-0401", name: "Demerara Sugar · 5kg",            category: "Pantry",   stock: 14, price: 19.20, status: "active", reorderPoint: 8,  vendorId: 6, meta: { unitOfMeasure: "5kg" } },
  { id: 13, sku: "PAN-0410", name: "Vanilla Syrup · 750ml",           category: "Pantry",   stock: 11, price: 14.80, status: "active", reorderPoint: 8,  vendorId: 5, meta: { unitOfMeasure: "750ml" } },
  { id: 14, sku: "BEV-0050", name: "Sparkling Water · 24-pack",       category: "Beverages",stock: 24, price: 18.40, status: "active", reorderPoint: 15, vendorId: 5, meta: { unitOfMeasure: "24-pack" } },
];

// -----------------------------------------------------------------------------
// Pharmacy
// -----------------------------------------------------------------------------

const pharmacyVendors: Vendor[] = [
  { id: 1, name: "MedSource Distribution",   contactEmail: "orders@medsource-dist.com",   contactPhone: "+1-415-555-0182", leadTimeDays: 3,  onTimeDeliveryPct: 98.4, openPOs: 4, lastOrderMinutesAgo: 23,   preferredCategories: ["Antibiotics","Analgesics"] },
  { id: 2, name: "Helix Pharma Supplies",    contactEmail: "ap@helix-pharma.com",         contactPhone: "+1-617-555-0119", leadTimeDays: 5,  onTimeDeliveryPct: 96.1, openPOs: 2, lastOrderMinutesAgo: 89,   preferredCategories: ["Cardiovascular"] },
  { id: 3, name: "Beacon Cold-Chain",        contactEmail: "orders@beacon-coldchain.io",  contactPhone: "+1-503-555-0173", leadTimeDays: 4,  onTimeDeliveryPct: 99.0, openPOs: 1, lastOrderMinutesAgo: 312,  preferredCategories: ["Vaccines"] },
  { id: 4, name: "Ridge Generics LLC",       contactEmail: "purchasing@ridge-generics.com",contactPhone:"+1-310-555-0144", leadTimeDays: 6,  onTimeDeliveryPct: 92.6, openPOs: 3, lastOrderMinutesAgo: 47,   preferredCategories: ["Analgesics","Allergy"] },
  { id: 5, name: "Northshore Specialty Rx",  contactEmail: "ap@northshore-rx.com",        contactPhone: "+1-203-555-0157", leadTimeDays: 8,  onTimeDeliveryPct: 89.4, openPOs: 1, lastOrderMinutesAgo: 1410, preferredCategories: ["Diabetes"] },
  { id: 6, name: "Atlas Wholesalers",        contactEmail: "billing@atlas-wholesale.com", contactPhone: "+1-718-555-0166", leadTimeDays: 4,  onTimeDeliveryPct: 95.3, openPOs: 0, lastOrderMinutesAgo: 2580, preferredCategories: ["OTC"] },
];

const pharmacyProducts: Product[] = [
  { id: 1,  sku: "NDC 12345-001", name: "Amoxicillin 500mg · 30 caps",         category: "Antibiotics",    stock: 124, price: 18.40, status: "active", reorderPoint: 60, vendorId: 1, meta: { lotNumber: "LOT-A4291", expiry: "2027-03-12", controlled: false } },
  { id: 2,  sku: "NDC 12345-014", name: "Amoxicillin 250mg/5ml suspension",    category: "Antibiotics",    stock: 28,  price: 14.80, status: "active", reorderPoint: 30, vendorId: 1, meta: { lotNumber: "LOT-A4218", expiry: "2026-11-04", controlled: false } },
  { id: 3,  sku: "NDC 23456-100", name: "Paracetamol 500mg · 50 tabs",          category: "Analgesics",     stock: 312, price: 6.20,  status: "active", reorderPoint: 100,vendorId: 4, meta: { lotNumber: "LOT-P9120", expiry: "2028-02-01", controlled: false } },
  { id: 4,  sku: "NDC 23456-110", name: "Ibuprofen 200mg · 60 tabs",            category: "Analgesics",     stock: 246, price: 7.80,  status: "active", reorderPoint: 100,vendorId: 4, meta: { lotNumber: "LOT-I8412", expiry: "2027-09-18", controlled: false } },
  { id: 5,  sku: "NDC 34567-200", name: "Lisinopril 10mg · 30 tabs",            category: "Cardiovascular", stock: 84,  price: 22.40, status: "active", reorderPoint: 50, vendorId: 2, meta: { lotNumber: "LOT-L3304", expiry: "2027-06-30", controlled: false } },
  { id: 6,  sku: "NDC 34567-210", name: "Atorvastatin 20mg · 30 tabs",          category: "Cardiovascular", stock: 12,  price: 28.90, status: "low",    reorderPoint: 40, vendorId: 2, meta: { lotNumber: "LOT-AT901",expiry: "2026-12-15", controlled: false } },
  { id: 7,  sku: "NDC 45678-300", name: "Loratadine 10mg · 30 tabs",            category: "Allergy",        stock: 88,  price: 9.40,  status: "active", reorderPoint: 40, vendorId: 4, meta: { lotNumber: "LOT-LO221",expiry: "2027-04-22", controlled: false } },
  { id: 8,  sku: "NDC 56789-400", name: "Metformin 500mg · 60 tabs",            category: "Diabetes",       stock: 64,  price: 12.30, status: "active", reorderPoint: 40, vendorId: 5, meta: { lotNumber: "LOT-MF514",expiry: "2027-08-09", controlled: false } },
  { id: 9,  sku: "NDC 56789-420", name: "Insulin Glargine 100u/ml · 10ml vial", category: "Diabetes",       stock: 6,   price: 89.40, status: "low",    reorderPoint: 12, vendorId: 5, meta: { lotNumber: "LOT-IG189",expiry: "2026-08-30", controlled: false } },
  { id: 10, sku: "NDC 67890-500", name: "Influenza Vaccine · 0.5ml prefilled",  category: "Vaccines",       stock: 0,   price: 24.80, status: "out",    reorderPoint: 30, vendorId: 3, meta: { lotNumber: "LOT-FV218",expiry: "2026-06-30", controlled: false } },
  { id: 11, sku: "NDC 78901-600", name: "Acetaminophen 325mg · 100 tabs",       category: "OTC",            stock: 412, price: 8.90,  status: "active", reorderPoint: 100,vendorId: 6, meta: { lotNumber: "LOT-AC718",expiry: "2028-01-12", controlled: false } },
  { id: 12, sku: "NDC 78901-610", name: "Pseudoephedrine 30mg · 24 tabs",       category: "OTC",            stock: 18,  price: 11.20, status: "active", reorderPoint: 24, vendorId: 6, meta: { lotNumber: "LOT-PS422",expiry: "2027-02-28", controlled: true  } },
  { id: 13, sku: "NDC 89012-700", name: "Codeine/APAP 30/300mg · 30 tabs",      category: "Analgesics",     stock: 34,  price: 32.40, status: "active", reorderPoint: 24, vendorId: 1, meta: { lotNumber: "LOT-CO109",expiry: "2026-10-15", controlled: true  } },
];

// -----------------------------------------------------------------------------
// Auto Parts
// -----------------------------------------------------------------------------

const autoVendors: Vendor[] = [
  { id: 1, name: "Toyota OEM Distribution",  contactEmail: "ap@toyota-oem-dist.com",     contactPhone: "+1-310-555-0182", leadTimeDays: 6,  onTimeDeliveryPct: 96.4, openPOs: 3, lastOrderMinutesAgo: 23,   preferredCategories: ["Brakes","Engine","Electrical"] },
  { id: 2, name: "Honda Direct Parts",       contactEmail: "orders@honda-direct.com",    contactPhone: "+1-415-555-0119", leadTimeDays: 5,  onTimeDeliveryPct: 94.8, openPOs: 2, lastOrderMinutesAgo: 89,   preferredCategories: ["Brakes","Filters"] },
  { id: 3, name: "Apex Aftermarket",         contactEmail: "purchasing@apex-aftermkt.io",contactPhone: "+1-718-555-0173", leadTimeDays: 3,  onTimeDeliveryPct: 91.2, openPOs: 4, lastOrderMinutesAgo: 47,   preferredCategories: ["Brakes","Suspension"] },
  { id: 4, name: "Northshore Lubricants",    contactEmail: "billing@northshore-lub.com", contactPhone: "+1-503-555-0144", leadTimeDays: 2,  onTimeDeliveryPct: 99.0, openPOs: 1, lastOrderMinutesAgo: 312,  preferredCategories: ["Fluids"] },
  { id: 5, name: "Ridge Tire & Wheel",       contactEmail: "ap@ridge-tire.com",          contactPhone: "+1-619-555-0157", leadTimeDays: 7,  onTimeDeliveryPct: 88.4, openPOs: 2, lastOrderMinutesAgo: 1410, preferredCategories: ["Tires"] },
  { id: 6, name: "Atlas Body & Trim",        contactEmail: "orders@atlas-bodytrim.com",  contactPhone: "+1-617-555-0166", leadTimeDays: 9,  onTimeDeliveryPct: 86.1, openPOs: 0, lastOrderMinutesAgo: 2580, preferredCategories: ["Body"] },
];

const autoProducts: Product[] = [
  { id: 1,  sku: "Part # TY-04465-12010",  name: "Brake Pad Set Front · Toyota Camry 2018-2024",   category: "Brakes",     stock: 24, price: 89.90,  status: "active", reorderPoint: 12, vendorId: 1, meta: { oemPartNumber: "04465-12010", fitment: "Camry 2018-2024" } },
  { id: 2,  sku: "Part # TY-04466-33180",  name: "Brake Pad Set Rear · Toyota Camry 2018-2024",    category: "Brakes",     stock: 18, price: 74.50,  status: "active", reorderPoint: 10, vendorId: 1, meta: { oemPartNumber: "04466-33180", fitment: "Camry 2018-2024" } },
  { id: 3,  sku: "Part # HD-45022-T2A",    name: "Brake Pad Set Front · Honda Accord 2018-2022",   category: "Brakes",     stock: 4,  price: 92.40,  status: "low",    reorderPoint: 12, vendorId: 2, meta: { oemPartNumber: "45022-T2A-A50", fitment: "Accord 2018-2022" } },
  { id: 4,  sku: "Part # AP-PR-90418-A",   name: "Brake Rotor Pair · Universal 305mm",             category: "Brakes",     stock: 9,  price: 148.00, status: "active", reorderPoint: 8,  vendorId: 3, meta: { oemPartNumber: "AP-90418-A", fitment: "Multi-fit · 305mm" } },
  { id: 5,  sku: "Part # FL-15400-PLM",    name: "Oil Filter · Honda 1.5L/2.0L",                   category: "Filters",    stock: 88, price: 9.20,   status: "active", reorderPoint: 40, vendorId: 2, meta: { oemPartNumber: "15400-PLM-A02", fitment: "Honda 1.5L/2.0L" } },
  { id: 6,  sku: "Part # FL-90915-YZZD2",  name: "Oil Filter · Toyota 2.5L",                       category: "Filters",    stock: 124,price: 8.40,   status: "active", reorderPoint: 50, vendorId: 1, meta: { oemPartNumber: "90915-YZZD2", fitment: "Toyota 2.5L" } },
  { id: 7,  sku: "Part # FL-AF-17801-31170", name: "Air Filter · Toyota Camry V6",                  category: "Filters",    stock: 32, price: 14.20,  status: "active", reorderPoint: 20, vendorId: 1, meta: { oemPartNumber: "17801-31170", fitment: "Camry V6 2007+" } },
  { id: 8,  sku: "Part # FLD-5W30-4L",     name: "Engine Oil 5W-30 · Synthetic 4L",                category: "Fluids",     stock: 64, price: 38.40,  status: "active", reorderPoint: 30, vendorId: 4, meta: { oemPartNumber: "FLD-5W30-4", fitment: "Universal" } },
  { id: 9,  sku: "Part # FLD-DOT4-1L",     name: "Brake Fluid DOT 4 · 1L",                         category: "Fluids",     stock: 42, price: 12.80,  status: "active", reorderPoint: 25, vendorId: 4, meta: { oemPartNumber: "FLD-DOT4-1", fitment: "Universal" } },
  { id: 10, sku: "Part # AP-CV-90189",     name: "CV Axle Assembly · Camry/Avalon Front Right",    category: "Suspension", stock: 6,  price: 184.50, status: "low",    reorderPoint: 8,  vendorId: 3, meta: { oemPartNumber: "AP-90189-CR", fitment: "Camry/Avalon 2010-2018" } },
  { id: 11, sku: "Part # AP-SH-339101",    name: "Shock Absorber Rear · Pair",                     category: "Suspension", stock: 12, price: 218.00, status: "active", reorderPoint: 8,  vendorId: 3, meta: { oemPartNumber: "AP-SH-339101", fitment: "Multi-fit" } },
  { id: 12, sku: "Part # TY-90919-01180",  name: "Spark Plug Iridium · Toyota OEM",                category: "Engine",     stock: 0,  price: 11.40,  status: "out",    reorderPoint: 40, vendorId: 1, meta: { oemPartNumber: "90919-01180", fitment: "Toyota 2.5L/3.5L" } },
  { id: 13, sku: "Part # TR-205-55R16",    name: "All-Season Tire 205/55R16 · 91V",                category: "Tires",      stock: 18, price: 124.00, status: "active", reorderPoint: 16, vendorId: 5, meta: { oemPartNumber: "TR-205-55R16-91V", fitment: "16\" wheels" } },
  { id: 14, sku: "Part # AB-WX-7820",      name: "Side Mirror Glass · Camry Driver Side",          category: "Body",       stock: 4,  price: 48.90,  status: "low",    reorderPoint: 6,  vendorId: 6, meta: { oemPartNumber: "AB-WX-7820-LH", fitment: "Camry 2018-2024 LH" } },
];

// -----------------------------------------------------------------------------
// Registry
// -----------------------------------------------------------------------------

export const profileMetas: ProfileMeta[] = [
  retailMeta,
  {
    id: "fb",
    name: "Café & F&B",
    blurb: "Coffee shop / restaurant supply with expiry tracking and units of measure.",
    examples: "House Espresso · Sourdough Loaf · Whole Milk 2L",
    productIdLabel: "Item code",
    productIdExample: "BEV-0042",
  },
  {
    id: "pharmacy",
    name: "Pharmacy",
    blurb: "Prescription & OTC pharmacy with NDC codes, lot numbers, and expiry tracking.",
    examples: "Amoxicillin 500mg · Lisinopril 10mg · Insulin Glargine",
    productIdLabel: "NDC",
    productIdExample: "NDC 12345-001",
  },
  {
    id: "autoparts",
    name: "Auto Parts",
    blurb: "Multi-brand auto parts shop with OEM part numbers and vehicle fitment.",
    examples: "Toyota Brake Pads · Honda Oil Filter · DOT 4 Fluid",
    productIdLabel: "Part #",
    productIdExample: "Part # TY-04465-12010",
  },
];

export function profileById(id: ProfileId): ProfileMeta {
  return profileMetas.find(p => p.id === id) ?? retailMeta;
}

export function getProfileSeeds(id: ProfileId): { products?: Product[]; vendors?: Vendor[] } {
  switch (id) {
    case "fb":
      return { products: fbProducts, vendors: fbVendors };
    case "pharmacy":
      return { products: pharmacyProducts, vendors: pharmacyVendors };
    case "autoparts":
      return { products: autoProducts, vendors: autoVendors };
    case "retail":
    default:
      return {}; // retail uses inventoryData.ts defaults
  }
}
