export interface Product { id: number; sku: string; name: string; category: string; stock: number; price: number; status: 'active' | 'low' | 'out'; }
export interface Branch { id: number; name: string; location: string; manager: string; }
export interface User { id: number; username: string; name: string; role: 'admin' | 'manager' | 'editor'; lastActive: string; status: 'active' | 'locked'; }
export interface Customer { id: number; name: string; email: string; spent: number; tier: 'gold' | 'silver' | 'bronze'; }
export interface Employee { id: number; name: string; position: string; salary: number; status: 'paid' | 'pending'; }
export interface Task { id: number; title: string; assignee: string; status: 'todo' | 'progress' | 'done'; }
export interface Log { id: number; time: string; action: string; user: string; type: 'security' | 'system' | 'audit'; }
export interface Campaign { id: number; name: string; status: 'sent' | 'draft'; openRate: number; }

export const initialProducts: Product[] = [
  { id: 1, sku: "TECH-101", name: "Pro Workstation Laptop", category: "Electronics", stock: 15, price: 1299, status: 'active' },
  { id: 2, sku: "TECH-102", name: "Mechanical Keyboard", category: "Accessories", stock: 4, price: 149, status: 'low' },
  { id: 3, sku: "FURN-005", name: "ErgoMesh Chair", category: "Furniture", stock: 0, price: 399, status: 'out' },
  { id: 4, sku: "DEV-001", name: "4K Monitor 27\"", category: "Electronics", stock: 22, price: 450, status: 'active' },
  { id: 5, sku: "ACC-003", name: "USB-C Hub", category: "Accessories", stock: 50, price: 49, status: 'active' },
];

export const initialBranches: Branch[] = [
  { id: 1, name: "HQ - New York", location: "Manhattan, NY", manager: "Sarah Connor" },
  { id: 2, name: "West Coast Hub", location: "San Francisco, CA", manager: "John Smith" },
];

export const initialCustomers: Customer[] = [
  { id: 1, name: "Alice Freeman", email: "alice@corp.com", spent: 12500, tier: 'gold' },
  { id: 2, name: "Bob Miller", email: "bob@gmail.com", spent: 450, tier: 'bronze' },
  { id: 3, name: "Charlie Day", email: "charlie@dev.io", spent: 3200, tier: 'silver' },
];

export const initialEmployees: Employee[] = [
  { id: 1, name: "David Rose", position: "Store Manager", salary: 4500, status: 'paid' },
  { id: 2, name: "Alexis Rose", position: "Sales Assoc.", salary: 3200, status: 'pending' },
  { id: 3, name: "Stevie Budd", position: "Inventory Clerk", salary: 3100, status: 'pending' },
];

export const initialTasks: Task[] = [
  { id: 1, title: "Restock Keyboards", assignee: "Stevie", status: 'todo' },
  { id: 2, title: "Q4 Sales Report", assignee: "David", status: 'progress' },
  { id: 3, title: "Update POS Software", assignee: "IT Admin", status: 'done' },
];

export const initialUsers: User[] = [
  { id: 1, username: "admin", name: "Super Admin", role: "admin", lastActive: "Just now", status: 'active' },
  { id: 2, username: "ardzkie", name: "Juan Doe", role: "manager", lastActive: "2 hours ago", status: 'active' },
  { id: 3, username: "guest_user", name: "Guest", role: "editor", lastActive: "1 day ago", status: 'locked' },
];

export const initialLogs: Log[] = [
  { id: 1, time: "10:42 AM", action: "API Key Generated", user: "Admin", type: "security" },
  { id: 2, time: "10:30 AM", action: "Payroll Processed (Batch #402)", user: "Finance", type: "audit" },
  { id: 3, time: "09:15 AM", action: "Failed Login IP: 192.168.1.55", user: "Unknown", type: "security" },
  { id: 4, time: "08:00 AM", action: "System Backup Complete", user: "System", type: "system" },
];

export const initialCampaigns: Campaign[] = [
  { id: 1, name: "Winter Sale Blast", status: "sent", openRate: 42 },
  { id: 2, name: "New Arrival: Laptops", status: "draft", openRate: 0 },
];