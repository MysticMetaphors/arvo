// Type-checked map of all `data-demo-target` names referenced by the demo
// script. Keep in sync with the components that emit them.

export const DEMO_TARGETS = {
  // Login
  LOGIN_USERNAME: "login.username",
  LOGIN_PASSWORD: "login.password",
  LOGIN_SIGNIN: "login.signin",
  LOGIN_WATCH_DEMO: "login.watch-demo",

  // Header
  HEADER_NOTIFICATIONS: "header.notifications",
  HEADER_USER_MENU: "header.user-menu",

  // Dashboard
  DASH_GENERATE_PO: "dashboard.generate-po",
  DASH_ACTIVITY: "dashboard.activity",

  // Sidebar nav (synthetic — resolved at runtime to the active sidebar button)
  NAV_DASHBOARD: "nav.dashboard",
  NAV_INVENTORY: "nav.inventory",
  NAV_BRANCHES: "nav.branches",
  NAV_TRANSFERS: "nav.transfers",
  NAV_VENDORS: "nav.vendors",
  NAV_AUDITS: "nav.audits",
  NAV_KANBAN: "nav.kanban",

  // Inventory
  INV_ADD_PRODUCT: "inventory.add-product",
  INV_PRODUCT_FORM_SUBMIT: "inventory.product-form-submit",
  INV_BULK_EXPORT: "inventory.bulk-export",
  INV_ROW: (id: number) => `inventory.row-${id}`,

  // Product detail
  PRODUCT_GENERATE_PO: "product.generate-po",

  // PO builder
  PO_SEND: "po.send",

  // Vendors
  VENDOR_CARD: (id: number) => `vendors.card-${id}`,
  VENDORS_GENERATE_PO: "vendors.generate-po",

  // Audits
  AUDITS_FILTER: (cat: string) => `audits.filter-${cat}`,

  // Branches
  BRANCH_ADD: "branches.add-branch",

  // Users
  USERS_ADD: "users.add-user",
  USER_EDIT_PERMISSIONS: (id: number) => `users.edit-permissions-${id}`,

  // Kanban
  KANBAN_ADD: (col: string) => `kanban.add-${col}`,

  // Stock transfer
  TRANSFER_WORKSPACE: "transfer.workspace",
  TRANSFER_CONFIRM: "transfer.confirm",

  // AI
  AI_FAB: "ai.fab",
  AI_CHIP: (slug: string) => `ai.chip-${slug}`,

  // Profile
  PROFILE_SWITCHER: "profile.switcher",
  PROFILE_OPTION: (id: string) => `profile.option-${id}`,
} as const;

export type DemoTarget = string;
