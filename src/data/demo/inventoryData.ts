// =============================================================================
// Inventory Demo: Seed Data
// =============================================================================
//
// The active demo profile drives which data is surfaced. The Retail (Workspace
// Tech) profile is fully built out below. Other profiles (F&B, Pharmacy,
// Auto Parts) are scaffolded with smaller representative seed sets so the
// "Switch Profile" feature demonstrates vertical adaptability.

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export type ProfileId = "retail" | "fb" | "pharmacy" | "autoparts";

export interface ProductFieldMeta {
  unitOfMeasure?: string;
  expiry?: string;        // ISO date
  lotNumber?: string;
  controlled?: boolean;
  oemPartNumber?: string;
  fitment?: string;
  warrantyMonths?: number;
}

export interface Product {
  id: number;
  sku: string;
  name: string;
  category: string;
  stock: number;
  price: number;
  status: "active" | "low" | "out";
  reorderPoint?: number;
  vendorId?: number;
  meta?: ProductFieldMeta;
}

export interface Branch {
  id: number;
  name: string;
  location: string;
  region: string;
  manager: string;
}

export interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  role: "admin" | "manager" | "staff";
  branchId?: number;
  status: "active" | "locked";
  lastActiveMinutesAgo: number;
}

export interface Customer {
  id: number;
  name: string;
  email: string;
  spent: number;
  tier: "gold" | "silver" | "bronze";
}

export interface Employee {
  id: number;
  name: string;
  position: string;
  salary: number;
  status: "paid" | "pending";
  branchId?: number;
}

export interface Task {
  id: number;
  title: string;
  assignee: string;
  status: "todo" | "progress" | "done";
  priority?: "low" | "med" | "high";
}

export interface Log {
  id: number;
  minutesAgo: number;
  action: string;
  user: string;
  ip?: string;
  category: "security" | "inventory" | "user" | "system" | "error";
  detail?: Record<string, string | number>;
}

export interface Campaign {
  id: number;
  name: string;
  status: "sent" | "draft" | "scheduled";
  openRate: number;
  recipients: number;
}

export interface Vendor {
  id: number;
  name: string;
  contactEmail: string;
  contactPhone: string;
  leadTimeDays: number;
  onTimeDeliveryPct: number;
  openPOs: number;
  lastOrderMinutesAgo: number;
  preferredCategories: string[];
}

export interface PurchaseOrder {
  id: string;            // PO-2026-0844
  vendorId: number;
  status: "draft" | "sent" | "received" | "invoiced" | "closed";
  total: number;
  itemCount: number;
  createdMinutesAgo: number;
  ackNumber?: string;
}

export interface Notification {
  id: number;
  category: "stock" | "system" | "security" | "customer" | "vendor";
  title: string;
  body: string;
  minutesAgo: number;
  unread: boolean;
}

export interface Transfer {
  id: string;            // TR-1042
  fromBranchId: number;
  toBranchId: number;
  itemCount: number;
  status: "in_transit" | "completed";
  minutesAgo: number;
}

export interface ActivityEvent {
  id: number;
  category: "order" | "stock" | "user" | "po" | "security";
  message: string;
  actor: string;
  minutesAgo: number;
}

// -----------------------------------------------------------------------------
// Retail (default profile)
// -----------------------------------------------------------------------------

export const initialProducts: Product[] = [
  // Computing
  { id: 1,  sku: "CMP-1401", name: "Helios 14 Pro",          category: "Computing",   stock: 18,  price: 1899, status: "active", reorderPoint: 12, vendorId: 1, meta: { warrantyMonths: 24 } },
  { id: 2,  sku: "CMP-1601", name: "Helios 16 Studio",       category: "Computing",   stock: 7,   price: 2649, status: "low",    reorderPoint: 8,  vendorId: 1, meta: { warrantyMonths: 24 } },
  { id: 3,  sku: "CMP-2110", name: "Apex Mini Desktop",      category: "Computing",   stock: 42,  price: 849,  status: "active", reorderPoint: 20, vendorId: 1, meta: { warrantyMonths: 24 } },
  { id: 4,  sku: "CMP-2701", name: "Vantage 27\" 4K Display",category: "Computing",   stock: 24,  price: 579,  status: "active", reorderPoint: 15, vendorId: 2, meta: { warrantyMonths: 36 } },
  { id: 5,  sku: "CMP-3201", name: "Vantage 32\" Curved",    category: "Computing",   stock: 11,  price: 849,  status: "active", reorderPoint: 10, vendorId: 2, meta: { warrantyMonths: 36 } },
  { id: 6,  sku: "CMP-DK01", name: "Strata Docking Hub",     category: "Computing",   stock: 67,  price: 129,  status: "active", reorderPoint: 40, vendorId: 3, meta: { warrantyMonths: 12 } },
  // Peripherals
  { id: 7,  sku: "PER-K100", name: "Tactus Mech K1",         category: "Peripherals", stock: 89,  price: 189,  status: "active", reorderPoint: 30, vendorId: 3 },
  { id: 8,  sku: "PER-K200", name: "Tactus Slim K2",         category: "Peripherals", stock: 124, price: 129,  status: "active", reorderPoint: 40, vendorId: 3 },
  { id: 9,  sku: "PER-M050", name: "Drift Wireless Mouse",   category: "Peripherals", stock: 0,   price: 79,   status: "out",    reorderPoint: 30, vendorId: 3 },
  { id: 10, sku: "PER-M100", name: "Apex Trackpad",          category: "Peripherals", stock: 38,  price: 109,  status: "active", reorderPoint: 25, vendorId: 3 },
  { id: 11, sku: "PER-W400", name: "Axis 4K Webcam",         category: "Peripherals", stock: 16,  price: 219,  status: "active", reorderPoint: 12, vendorId: 4 },
  { id: 12, sku: "PER-A500", name: "Lumen Studio Mic",       category: "Peripherals", stock: 4,   price: 249,  status: "low",    reorderPoint: 10, vendorId: 4 },
  { id: 13, sku: "PER-S700", name: "Echo Conference Speaker",category: "Peripherals", stock: 22,  price: 389,  status: "active", reorderPoint: 12, vendorId: 4 },
  { id: 14, sku: "PER-E300", name: "Pulse Wireless Earbuds", category: "Peripherals", stock: 73,  price: 179,  status: "active", reorderPoint: 30, vendorId: 4 },
  // Furniture
  { id: 15, sku: "FRN-CH10", name: "Aeris Mesh Chair",       category: "Furniture",   stock: 14,  price: 729,  status: "active", reorderPoint: 8,  vendorId: 5 },
  { id: 16, sku: "FRN-CH20", name: "Aeris Executive",        category: "Furniture",   stock: 6,   price: 1189, status: "low",    reorderPoint: 6,  vendorId: 5 },
  { id: 17, sku: "FRN-DK10", name: "Forge Drafting Desk",    category: "Furniture",   stock: 9,   price: 499,  status: "active", reorderPoint: 6,  vendorId: 5 },
  { id: 18, sku: "FRN-DK20", name: "Strata Standing Desk",   category: "Furniture",   stock: 21,  price: 849,  status: "active", reorderPoint: 10, vendorId: 5 },
  { id: 19, sku: "FRN-AR05", name: "Anchor Monitor Arm",     category: "Furniture",   stock: 48,  price: 149,  status: "active", reorderPoint: 20, vendorId: 6 },
  { id: 20, sku: "FRN-SH10", name: "Tessera Modular Shelving",category:"Furniture",   stock: 17,  price: 329,  status: "active", reorderPoint: 10, vendorId: 6 },
  // Accessories
  { id: 21, sku: "ACC-NB03", name: "Glyph A5 Notebook (3-pack)",category:"Accessories",stock: 312, price: 24,  status: "active", reorderPoint: 100,vendorId: 7 },
  { id: 22, sku: "ACC-ST01", name: "Quill Stylus Pro",       category: "Accessories", stock: 56,  price: 119,  status: "active", reorderPoint: 25, vendorId: 7 },
  { id: 23, sku: "ACC-LM01", name: "Beacon Smart Lamp",      category: "Accessories", stock: 8,   price: 89,   status: "low",    reorderPoint: 15, vendorId: 7 },
  { id: 24, sku: "ACC-CB01", name: "Ridge Cable Organizer",  category: "Accessories", stock: 340, price: 19,   status: "active", reorderPoint: 100,vendorId: 7 },
];

export const initialBranches: Branch[] = [
  { id: 1, name: "Manhattan HQ",      location: "New York, NY",     region: "Northeast", manager: "Priya Raghavan" },
  { id: 2, name: "Brooklyn Annex",    location: "Brooklyn, NY",     region: "Northeast", manager: "Marcus Tanaka" },
  { id: 3, name: "Bay Area Hub",      location: "San Francisco, CA",region: "West",      manager: "Linh Tran" },
  { id: 4, name: "Austin Center",     location: "Austin, TX",       region: "South",     manager: "Mateusz Kowalski" },
  { id: 5, name: "Chicago Outpost",   location: "Chicago, IL",      region: "Midwest",   manager: "Aisha Okafor" },
  { id: 6, name: "Toronto Flagship",  location: "Toronto, ON",      region: "Canada",    manager: "Daniela Soares" },
];

export const initialUsers: User[] = [
  { id: 1, username: "admin",         name: "Riley Chen",       email: "riley.chen@nexus-co.com",       role: "admin",   branchId: 1, status: "active", lastActiveMinutesAgo: 2 },
  { id: 2, username: "p.raghavan",    name: "Priya Raghavan",   email: "p.raghavan@nexus-co.com",       role: "manager", branchId: 1, status: "active", lastActiveMinutesAgo: 14 },
  { id: 3, username: "m.tanaka",      name: "Marcus Tanaka",    email: "m.tanaka@nexus-co.com",         role: "manager", branchId: 2, status: "active", lastActiveMinutesAgo: 47 },
  { id: 4, username: "l.tran",        name: "Linh Tran",        email: "l.tran@nexus-co.com",           role: "manager", branchId: 3, status: "active", lastActiveMinutesAgo: 142 },
  { id: 5, username: "a.morgan",      name: "Alex Morgan",      email: "alex.morgan@nexus-co.com",      role: "staff",   branchId: 1, status: "active", lastActiveMinutesAgo: 9 },
  { id: 6, username: "d.soares",      name: "Daniela Soares",   email: "d.soares@nexus-co.com",         role: "manager", branchId: 6, status: "active", lastActiveMinutesAgo: 318 },
  { id: 7, username: "j.fitzgerald",  name: "Jamie Fitzgerald", email: "j.fitzgerald@nexus-co.com",     role: "staff",   branchId: 4, status: "active", lastActiveMinutesAgo: 1480 },
  { id: 8, username: "guest_audit",   name: "Audit Reviewer",   email: "audit@external-partner.io",     role: "staff",   branchId: 1, status: "locked", lastActiveMinutesAgo: 8640 },
];

export const initialCustomers: Customer[] = [
  { id: 1,  name: "Northwind Tools Inc.",      email: "ap@northwind-tools.com",       spent: 47210, tier: "gold" },
  { id: 2,  name: "Apex Manufacturing",        email: "purchasing@apex-mfg.io",       spent: 31290, tier: "gold" },
  { id: 3,  name: "Bridgewater Co.",           email: "ops@bridgewater-co.com",       spent: 18432, tier: "silver" },
  { id: 4,  name: "Riverside Systems GmbH",    email: "kontakt@riverside-systems.de", spent: 22847, tier: "silver" },
  { id: 5,  name: "Cascade Logistics LLC",     email: "billing@cascade-log.com",      spent: 9420,  tier: "silver" },
  { id: 6,  name: "Meridian Health Group",     email: "ops@meridian-health.org",      spent: 64812, tier: "gold" },
  { id: 7,  name: "Sunrise Bakery Co-op",      email: "admin@sunrise-bakery.coop",    spent: 2840,  tier: "bronze" },
  { id: 8,  name: "Atlas Construction",        email: "ap@atlas-construction.com",    spent: 12390, tier: "silver" },
  { id: 9,  name: "Lighthouse Studios",        email: "billing@lighthouse-st.com",    spent: 8420,  tier: "bronze" },
  { id: 10, name: "Polaris Software KK",       email: "purchasing@polaris.co.jp",     spent: 19238, tier: "silver" },
  { id: 11, name: "Greenfield Agronomy",       email: "ops@greenfield-agro.com",      spent: 4720,  tier: "bronze" },
  { id: 12, name: "Harbor & Co. Realty",       email: "admin@harbor-realty.com",      spent: 3290,  tier: "bronze" },
  { id: 13, name: "Vesta Architecture",        email: "studio@vesta-arch.com",        spent: 11820, tier: "silver" },
  { id: 14, name: "Solstice Marketing",        email: "team@solstice-mktg.com",       spent: 7390,  tier: "bronze" },
  { id: 15, name: "Northshore Legal LLP",      email: "billing@northshore-legal.com", spent: 28471, tier: "gold" },
];

export const initialEmployees: Employee[] = [
  { id: 1,  name: "Priya Raghavan",   position: "Branch Manager",   salary: 7200, status: "paid",    branchId: 1 },
  { id: 2,  name: "Marcus Tanaka",    position: "Branch Manager",   salary: 6900, status: "paid",    branchId: 2 },
  { id: 3,  name: "Linh Tran",        position: "Branch Manager",   salary: 7400, status: "paid",    branchId: 3 },
  { id: 4,  name: "Mateusz Kowalski", position: "Branch Manager",   salary: 6850, status: "paid",    branchId: 4 },
  { id: 5,  name: "Aisha Okafor",     position: "Branch Manager",   salary: 6800, status: "paid",    branchId: 5 },
  { id: 6,  name: "Daniela Soares",   position: "Branch Manager",   salary: 7100, status: "paid",    branchId: 6 },
  { id: 7,  name: "Alex Morgan",      position: "Sales Associate",  salary: 3450, status: "pending", branchId: 1 },
  { id: 8,  name: "Jamie Fitzgerald", position: "Sales Associate",  salary: 3200, status: "pending", branchId: 4 },
  { id: 9,  name: "Sam Pereira",      position: "Inventory Clerk",  salary: 2850, status: "pending", branchId: 1 },
  { id: 10, name: "Olu Adebayo",      position: "Inventory Clerk",  salary: 2900, status: "paid",    branchId: 3 },
  { id: 11, name: "Yuki Tanaka",      position: "POS Specialist",   salary: 3120, status: "paid",    branchId: 2 },
  { id: 12, name: "Hana Park",        position: "Customer Support", salary: 3380, status: "pending", branchId: 5 },
];

export const initialTasks: Task[] = [
  // To do (4)
  { id: 1, title: "Reconcile Q1 inventory variance for Computing",  assignee: "Sam Pereira",      status: "todo", priority: "high" },
  { id: 2, title: "Onboard Apex Manufacturing as approved vendor",  assignee: "Priya Raghavan",   status: "todo", priority: "med" },
  { id: 3, title: "Audit returns workflow at Brooklyn Annex",       assignee: "Marcus Tanaka",    status: "todo", priority: "low" },
  { id: 4, title: "Update reorder points for low-velocity SKUs",    assignee: "Olu Adebayo",      status: "todo", priority: "med" },
  // In progress (4)
  { id: 5, title: "Migrate POS terminals to v3.4 firmware",         assignee: "Riley Chen",       status: "progress", priority: "high" },
  { id: 6, title: "Q2 vendor performance review",                   assignee: "Daniela Soares",   status: "progress", priority: "med" },
  { id: 7, title: "Investigate Helios 14 Pro stock discrepancy",    assignee: "Alex Morgan",      status: "progress", priority: "high" },
  { id: 8, title: "Refresh customer loyalty tier rules",            assignee: "Linh Tran",        status: "progress", priority: "low" },
  // Done (3)
  { id: 9,  title: "Approve March payroll batch",                   assignee: "Priya Raghavan",   status: "done", priority: "med" },
  { id: 10, title: "Roll API token for production gateway",         assignee: "Riley Chen",       status: "done", priority: "high" },
  { id: 11, title: "Send Winter Sale follow-up campaign",           assignee: "Solstice Marketing", status: "done", priority: "low" },
];

export const initialLogs: Log[] = [
  { id: 1,  minutesAgo: 2,    action: "API token rotated",                              user: "Riley Chen",     ip: "10.0.4.21",  category: "security", detail: { tokenLast4: "j293" } },
  { id: 2,  minutesAgo: 8,    action: "Stock adjusted: Helios 14 Pro +12 units",         user: "Sam Pereira",    ip: "10.0.4.18",  category: "inventory", detail: { sku: "CMP-1401", delta: 12 } },
  { id: 3,  minutesAgo: 14,   action: "User signed in",                                  user: "Priya Raghavan", ip: "10.0.4.21",  category: "user" },
  { id: 4,  minutesAgo: 23,   action: "PO PO-2026-0844 sent",                            user: "Riley Chen",     ip: "10.0.4.21",  category: "inventory", detail: { vendor: "Apex Manufacturing", total: 18420 } },
  { id: 5,  minutesAgo: 31,   action: "Failed login (3 attempts)",                       user: "unknown",        ip: "203.0.113.45", category: "security" },
  { id: 6,  minutesAgo: 47,   action: "Customer onboarded: Bridgewater Co.",             user: "Linh Tran",      ip: "10.0.4.41",  category: "user" },
  { id: 7,  minutesAgo: 62,   action: "Branch transfer TR-1041 completed",               user: "Marcus Tanaka",  ip: "10.0.4.32",  category: "inventory" },
  { id: 8,  minutesAgo: 89,   action: "Bulk price update applied (+4.5%) to 18 SKUs",    user: "Riley Chen",     ip: "10.0.4.21",  category: "inventory" },
  { id: 9,  minutesAgo: 110,  action: "Payroll batch #M03 processed",                    user: "Priya Raghavan", ip: "10.0.4.21",  category: "system" },
  { id: 10, minutesAgo: 138,  action: "Stock alert: Lumen Studio Mic below reorder",     user: "system",         category: "inventory", detail: { sku: "PER-A500", stock: 4 } },
  { id: 11, minutesAgo: 187,  action: "User permissions changed",                        user: "Riley Chen",     ip: "10.0.4.21",  category: "user", detail: { target: "j.fitzgerald", role: "staff" } },
  { id: 12, minutesAgo: 240,  action: "Session timeout",                                 user: "Marcus Tanaka",  category: "user" },
  { id: 13, minutesAgo: 312,  action: "PO PO-2026-0843 acknowledged by Strata Supplies", user: "system",         category: "inventory" },
  { id: 14, minutesAgo: 380,  action: "Stock count audit started: Brooklyn Annex",       user: "Marcus Tanaka",  ip: "10.0.4.32",  category: "inventory" },
  { id: 15, minutesAgo: 445,  action: "Vendor onboarded: Tessera Furniture Co.",         user: "Daniela Soares", ip: "10.0.4.61",  category: "system" },
  { id: 16, minutesAgo: 522,  action: "Webhook endpoint test",                           user: "Riley Chen",     ip: "10.0.4.21",  category: "system" },
  { id: 17, minutesAgo: 610,  action: "User locked: guest_audit (max attempts)",         user: "system",         category: "security" },
  { id: 18, minutesAgo: 718,  action: "Branding theme updated",                          user: "Riley Chen",     ip: "10.0.4.21",  category: "system" },
  { id: 19, minutesAgo: 854,  action: "Export generated: inventory-snapshot.csv",        user: "Linh Tran",      ip: "10.0.4.41",  category: "system" },
  { id: 20, minutesAgo: 1024, action: "Stock transfer TR-1040 dispatched",               user: "Linh Tran",      ip: "10.0.4.41",  category: "inventory" },
  { id: 21, minutesAgo: 1228, action: "Marketing campaign sent: 1,420 recipients",       user: "Solstice Marketing", category: "system" },
  { id: 22, minutesAgo: 1410, action: "Database backup verified",                        user: "system",         category: "system" },
  { id: 23, minutesAgo: 1620, action: "Payment gateway connection re-established",       user: "system",         category: "error" },
  { id: 24, minutesAgo: 1845, action: "Webhook delivery failed (retried 3×)",            user: "system",         category: "error", detail: { endpoint: "/inventory.updated" } },
  { id: 25, minutesAgo: 2210, action: "User signed in",                                  user: "Daniela Soares", ip: "10.0.4.61",  category: "user" },
  { id: 26, minutesAgo: 2580, action: "Permissions matrix updated",                      user: "Riley Chen",     ip: "10.0.4.21",  category: "user" },
  { id: 27, minutesAgo: 2940, action: "Audit log export downloaded",                     user: "Audit Reviewer", ip: "203.0.113.99", category: "security" },
  { id: 28, minutesAgo: 3420, action: "Bulk SKU import: 18 items added",                 user: "Riley Chen",     ip: "10.0.4.21",  category: "inventory" },
  { id: 29, minutesAgo: 5040, action: "Quarterly inventory variance report generated",   user: "Priya Raghavan", ip: "10.0.4.21",  category: "system" },
  { id: 30, minutesAgo: 7200, action: "System backup completed",                         user: "system",         category: "system" },
];

export const initialCampaigns: Campaign[] = [
  { id: 1, name: "Winter Sale Blast",                status: "sent",      openRate: 31.4, recipients: 4820 },
  { id: 2, name: "New Arrival: Helios 14 Pro",       status: "sent",      openRate: 22.7, recipients: 2940 },
  { id: 3, name: "Loyalty Tier Refresh",             status: "scheduled", openRate: 0,    recipients: 1820 },
  { id: 4, name: "Q2 Vendor Spotlight",              status: "draft",     openRate: 0,    recipients: 0 },
  { id: 5, name: "Aeris Chair Spring Promo",         status: "sent",      openRate: 14.2, recipients: 3120 },
];

export const initialVendors: Vendor[] = [
  { id: 1, name: "Helios Computing Ltd.",     contactEmail: "ap@helios-computing.com",   contactPhone: "+1-415-555-0182", leadTimeDays: 14, onTimeDeliveryPct: 96.2, openPOs: 3, lastOrderMinutesAgo: 23,    preferredCategories: ["Computing"] },
  { id: 2, name: "Vantage Display Co.",       contactEmail: "orders@vantage-display.com",contactPhone: "+1-512-555-0119", leadTimeDays: 9,  onTimeDeliveryPct: 91.4, openPOs: 1, lastOrderMinutesAgo: 312,   preferredCategories: ["Computing"] },
  { id: 3, name: "Strata Supplies",           contactEmail: "orders@strata-supplies.io", contactPhone: "+1-718-555-0173", leadTimeDays: 5,  onTimeDeliveryPct: 98.1, openPOs: 2, lastOrderMinutesAgo: 89,    preferredCategories: ["Computing","Peripherals"] },
  { id: 4, name: "Apex Manufacturing",        contactEmail: "purchasing@apex-mfg.io",    contactPhone: "+1-310-555-0144", leadTimeDays: 12, onTimeDeliveryPct: 87.6, openPOs: 4, lastOrderMinutesAgo: 47,    preferredCategories: ["Peripherals"] },
  { id: 5, name: "Aeris Furniture Group",     contactEmail: "ap@aeris-furniture.com",    contactPhone: "+1-203-555-0157", leadTimeDays: 21, onTimeDeliveryPct: 89.9, openPOs: 2, lastOrderMinutesAgo: 1410,  preferredCategories: ["Furniture"] },
  { id: 6, name: "Tessera Furniture Co.",     contactEmail: "orders@tessera-furn.com",   contactPhone: "+1-617-555-0166", leadTimeDays: 18, onTimeDeliveryPct: 93.3, openPOs: 1, lastOrderMinutesAgo: 445,   preferredCategories: ["Furniture"] },
  { id: 7, name: "Glyph Stationery Partners", contactEmail: "billing@glyph-paper.co",    contactPhone: "+1-503-555-0188", leadTimeDays: 4,  onTimeDeliveryPct: 99.0, openPOs: 0, lastOrderMinutesAgo: 2580,  preferredCategories: ["Accessories"] },
  { id: 8, name: "Ridge Logistics & Cable",   contactEmail: "ap@ridge-cable.com",        contactPhone: "+1-619-555-0145", leadTimeDays: 7,  onTimeDeliveryPct: 94.8, openPOs: 1, lastOrderMinutesAgo: 854,   preferredCategories: ["Accessories"] },
];

export const initialPurchaseOrders: PurchaseOrder[] = [
  { id: "PO-2026-0847", vendorId: 1, status: "draft",    total: 18420.00, itemCount: 4, createdMinutesAgo: 5,    ackNumber: undefined },
  { id: "PO-2026-0846", vendorId: 4, status: "sent",     total: 7290.00,  itemCount: 6, createdMinutesAgo: 47,   ackNumber: "ACK-X1Q24" },
  { id: "PO-2026-0845", vendorId: 3, status: "received", total: 12480.00, itemCount: 8, createdMinutesAgo: 89,   ackNumber: "ACK-S3M19" },
  { id: "PO-2026-0844", vendorId: 4, status: "sent",     total: 9420.00,  itemCount: 5, createdMinutesAgo: 23,   ackNumber: "ACK-A8K42" },
  { id: "PO-2026-0843", vendorId: 3, status: "invoiced", total: 4290.00,  itemCount: 3, createdMinutesAgo: 312,  ackNumber: "ACK-S3M18" },
  { id: "PO-2026-0842", vendorId: 1, status: "received", total: 31290.00, itemCount: 8, createdMinutesAgo: 522,  ackNumber: "ACK-H1P09" },
  { id: "PO-2026-0841", vendorId: 5, status: "closed",   total: 8420.00,  itemCount: 4, createdMinutesAgo: 1410, ackNumber: "ACK-AE721" },
  { id: "PO-2026-0840", vendorId: 2, status: "received", total: 6840.00,  itemCount: 6, createdMinutesAgo: 312,  ackNumber: "ACK-VD118" },
  { id: "PO-2026-0839", vendorId: 4, status: "received", total: 5210.00,  itemCount: 4, createdMinutesAgo: 718,  ackNumber: "ACK-A8K38" },
  { id: "PO-2026-0838", vendorId: 6, status: "closed",   total: 12840.00, itemCount: 5, createdMinutesAgo: 445,  ackNumber: "ACK-TF103" },
  { id: "PO-2026-0837", vendorId: 7, status: "closed",   total: 1840.00,  itemCount: 3, createdMinutesAgo: 2580, ackNumber: "ACK-GS291" },
  { id: "PO-2026-0836", vendorId: 8, status: "received", total: 3290.00,  itemCount: 4, createdMinutesAgo: 854,  ackNumber: "ACK-RC042" },
  { id: "PO-2026-0835", vendorId: 1, status: "invoiced", total: 21840.00, itemCount: 7, createdMinutesAgo: 1845, ackNumber: "ACK-H1P08" },
  { id: "PO-2026-0834", vendorId: 5, status: "closed",   total: 9840.00,  itemCount: 4, createdMinutesAgo: 2210, ackNumber: "ACK-AE719" },
];

export const initialNotifications: Notification[] = [
  { id: 1, category: "stock",    title: "Low stock: Helios 16 Studio",    body: "7 units remaining — below reorder point of 8.",        minutesAgo: 5,    unread: true },
  { id: 2, category: "vendor",   title: "PO acknowledged",                 body: "Apex Manufacturing acknowledged PO-2026-0844.",        minutesAgo: 23,   unread: true },
  { id: 3, category: "security", title: "API token rotated",               body: "Token rotated by Riley Chen.",                         minutesAgo: 31,   unread: true },
  { id: 4, category: "stock",    title: "Out of stock: Drift Wireless Mouse", body: "0 units. Last sale 2h ago.",                       minutesAgo: 62,   unread: false },
  { id: 5, category: "customer", title: "New customer onboarded",          body: "Bridgewater Co. signed up. Default tier: silver.",     minutesAgo: 47,   unread: false },
  { id: 6, category: "system",   title: "Payroll batch processed",         body: "Batch #M03: 12 employees, $52,140 total.",              minutesAgo: 110,  unread: false },
  { id: 7, category: "stock",    title: "Reorder suggestion ready",        body: "AI: PO for Helios 14 Pro × 60 units suggested.",        minutesAgo: 14,   unread: true },
  { id: 8, category: "security", title: "Failed login attempts",           body: "3 failed attempts from 203.0.113.45.",                  minutesAgo: 31,   unread: false },
];

export const initialTransfers: Transfer[] = [
  { id: "TR-1042", fromBranchId: 1, toBranchId: 3, itemCount: 12, status: "in_transit", minutesAgo: 18 },
  { id: "TR-1041", fromBranchId: 2, toBranchId: 1, itemCount: 6,  status: "completed",  minutesAgo: 62 },
  { id: "TR-1040", fromBranchId: 3, toBranchId: 4, itemCount: 24, status: "completed",  minutesAgo: 1024 },
  { id: "TR-1039", fromBranchId: 1, toBranchId: 5, itemCount: 8,  status: "completed",  minutesAgo: 1845 },
  { id: "TR-1038", fromBranchId: 6, toBranchId: 2, itemCount: 14, status: "completed",  minutesAgo: 2940 },
  { id: "TR-1037", fromBranchId: 4, toBranchId: 1, itemCount: 4,  status: "completed",  minutesAgo: 5040 },
];

export const initialActivityEvents: ActivityEvent[] = [
  { id: 1,  category: "order",    message: "Order #4821 processed at Manhattan HQ",            actor: "Alex Morgan",      minutesAgo: 1 },
  { id: 2,  category: "stock",    message: "Helios 14 Pro stock updated +12 units",            actor: "Sam Pereira",      minutesAgo: 8 },
  { id: 3,  category: "user",     message: "Priya Raghavan signed in",                          actor: "Priya Raghavan",   minutesAgo: 14 },
  { id: 4,  category: "po",       message: "PO PO-2026-0844 acknowledged by Apex Manufacturing",actor: "system",           minutesAgo: 23 },
  { id: 5,  category: "security", message: "API token rotated",                                 actor: "Riley Chen",       minutesAgo: 31 },
  { id: 6,  category: "order",    message: "Order #4820 — Vantage 27\" 4K × 2 — Bay Area Hub",  actor: "Olu Adebayo",      minutesAgo: 38 },
  { id: 7,  category: "stock",    message: "Stock transfer TR-1041 completed",                  actor: "Marcus Tanaka",    minutesAgo: 62 },
  { id: 8,  category: "order",    message: "Order #4819 — Aeris Mesh Chair × 4 — Brooklyn",     actor: "Marcus Tanaka",    minutesAgo: 78 },
  { id: 9,  category: "user",     message: "Alex Morgan signed in from new device",             actor: "Alex Morgan",      minutesAgo: 9 },
  { id: 10, category: "po",       message: "PO PO-2026-0843 invoiced by Strata Supplies",       actor: "system",           minutesAgo: 312 },
];

// Pool of "incoming" events that the live ticker prepends over time.
export const incomingActivityEvents: Omit<ActivityEvent, "id" | "minutesAgo">[] = [
  { category: "order",    message: "Order #4822 processed at Manhattan HQ",            actor: "Alex Morgan" },
  { category: "stock",    message: "Helios 16 Studio reorder suggested by AI",         actor: "Nexus AI" },
  { category: "user",     message: "Yuki Tanaka signed in",                            actor: "Yuki Tanaka" },
  { category: "order",    message: "Order #4823 — Tactus Mech K1 × 6 — Austin",       actor: "Jamie Fitzgerald" },
  { category: "stock",    message: "Lumen Studio Mic stock adjusted -2 units",         actor: "Sam Pereira" },
  { category: "po",       message: "PO PO-2026-0846 dispatched to Apex Manufacturing", actor: "Riley Chen" },
  { category: "order",    message: "Order #4824 — Strata Standing Desk × 2 — Toronto", actor: "Daniela Soares" },
  { category: "security", message: "Webhook signature verified",                       actor: "system" },
  { category: "stock",    message: "Stock transfer TR-1042 dispatched",                actor: "Riley Chen" },
  { category: "order",    message: "Order #4825 — Helios 14 Pro × 1 — Bay Area Hub",   actor: "Olu Adebayo" },
];

export function relativeTime(min: number): string {
  if (min < 1) return "just now";
  if (min < 60) return `${min}m ago`;
  if (min < 1440) return `${Math.floor(min / 60)}h ago`;
  return `${Math.floor(min / 1440)}d ago`;
}

export function clockTime(min: number, now: Date = new Date()): string {
  const t = new Date(now.getTime() - min * 60_000);
  return t.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}
