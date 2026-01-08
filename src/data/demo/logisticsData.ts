export interface Driver {
  id: number;
  name: string;
  contact: string;
  emergencyContact: string;
  licenseExp: string;
  status: 'active' | 'rest' | 'leave';
  assignedVehicleId: number | null;
  performanceScore: number; // 0-100
  currentTask: string;
}

export interface Vehicle {
  id: number;
  plate: string;
  model: string;
  type: 'truck' | 'van' | 'motorcycle';
  status: 'moving' | 'idle' | 'maintenance';
  fuelLevel: number; // %
  speed: number; // km/h
  odometer: number;
  dataUsage: { used: number; total: number }; // GB
  gps: { lat: number; lng: number; location: string };
  camFeed: string;
}

export interface Ticket {
  id: number;
  type: 'breakdown' | 'accident' | 'concern' | 'software';
  priority: 'high' | 'medium' | 'low';
  driver: string;
  description: string;
  status: 'open' | 'resolved';
}

export interface Task {
  id: number;
  title: string;
  address: string;
  status: 'pending' | 'active' | 'completed';
  aiNote: string;
}

export const initialDrivers: Driver[] = [
  { id: 1, name: "Juan Dela Cruz", contact: "0917-123-4567", emergencyContact: "Maria (Wife) - 0918-555-0101", licenseExp: "2027-10-15", status: 'active', assignedVehicleId: 101, performanceScore: 94, currentTask: "Delivery to Masinag" },
  { id: 2, name: "Ardzkie", contact: "0922-987-6543", emergencyContact: "Lola (Grandma) - 0919-555-0102", licenseExp: "2026-05-20", status: 'active', assignedVehicleId: 102, performanceScore: 88, currentTask: "Pickup at Cogeo" },
  { id: 3, name: "Jose Rizal", contact: "0999-111-2222", emergencyContact: "Paciano (Brother) - 0920-555-0103", licenseExp: "2028-12-30", status: 'rest', assignedVehicleId: null, performanceScore: 98, currentTask: "None" },
];

export const initialVehicles: Vehicle[] = [
  { id: 101, plate: "NCA-1234", model: "Isuzu Elf", type: 'truck', status: 'moving', fuelLevel: 72, speed: 45, odometer: 12450, dataUsage: { used: 4.2, total: 10 }, gps: { lat: 14.6, lng: 121.1, location: "Sumulong Hwy, Antipolo" }, camFeed: "bg-slate-800" },
  { id: 102, plate: "ABC-5678", model: "L300 Van", type: 'van', status: 'idle', fuelLevel: 30, speed: 0, odometer: 45100, dataUsage: { used: 8.9, total: 10 }, gps: { lat: 14.62, lng: 121.12, location: "Marcos Hwy, Antipolo" }, camFeed: "bg-slate-700" },
  { id: 103, plate: "MC-9988", model: "Yamaha NMAX", type: 'motorcycle', status: 'maintenance', fuelLevel: 10, speed: 0, odometer: 5000, dataUsage: { used: 1.1, total: 5 }, gps: { lat: 14.58, lng: 121.17, location: "Shop - Antipolo Bayan" }, camFeed: "bg-slate-900" },
];

export const initialTickets: Ticket[] = [
  { id: 1, type: 'breakdown', priority: 'high', driver: "Pedro Penduko", description: "Engine overheating near Cogeo Gate 2", status: 'open' },
  { id: 2, type: 'concern', priority: 'low', driver: "Juan Dela Cruz", description: "Requesting schedule change for next week", status: 'open' },
];

export const initialTasks: Task[] = [
  { id: 1, title: "Deliver Package #8832", address: "Cloud 9 Hotel, Sumulong Hwy", status: 'active', aiNote: "Traffic light. Est. arrival 14 mins." },
  { id: 2, title: "Pickup Cargo #9912", address: "Antipolo Public Market", status: 'pending', aiNote: "Optimal route: Take Circumferential Rd." },
];