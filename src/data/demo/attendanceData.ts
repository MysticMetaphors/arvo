export interface User {
  id: number;
  username: string;
  name: string;
  role: 'admin' | 'staff';
  email: string;
  rateType: 'daily' | 'monthly';
  rateAmount: number;
  status: 'active' | 'inactive';
}

export interface AttendanceRecord {
  id: number;
  userId: number;
  date: string; // YYYY-MM-DD
  timeIn: string; 
  timeOut: string | null;
  breaks: { start: string; end: string }[];
  totalHours: number;
  expectedHours: number;
  status: 'complete' | 'gap' | 'overtime' | 'absent' | 'ongoing';
  justification?: {
    reason: string;
    hours: number;
    status: 'pending' | 'approved' | 'rejected';
    timestamp: string; // When the request was made
    resolvedBy?: string; // Who approved/rejected it
    resolvedAt?: string; // When it was resolved
  };
}

export interface Task {
  id: number;
  title: string;
  description: string;
  assigneeId: number;
  status: 'todo' | 'doing' | 'done';
  priority: 'low' | 'medium' | 'high';
}

export const initialUsers: User[] = [
  { id: 1, username: "admin", name: "Admin Owner", role: 'admin', email: "boss@arbiter.ph", rateType: 'monthly', rateAmount: 60000, status: 'active' },
  { id: 2, username: "john", name: "John Baker", role: 'staff', email: "john@arbiter.ph", rateType: 'daily', rateAmount: 650, status: 'active' },
  { id: 3, username: "anna", name: "Anna Cashier", role: 'staff', email: "anna@arbiter.ph", rateType: 'daily', rateAmount: 600, status: 'active' },
];

export const initialAttendance: AttendanceRecord[] = [
  { 
    id: 99, userId: 2, date: "2024-01-28", timeIn: "08:00", timeOut: "16:00", 
    breaks: [{start: "12:00", end: "13:00"}], 
    totalHours: 8, expectedHours: 8, status: 'complete',
    justification: {
      reason: "System offline during checkout. Manual time provided.",
      hours: 1,
      status: 'approved',
      timestamp: "2024-01-28T16:05:00Z",
      resolvedBy: "Admin Owner",
      resolvedAt: "2024-01-29T09:00:00Z"
    }
  },
  { 
    id: 98, userId: 3, date: "2024-01-29", timeIn: "09:30", timeOut: "17:00", 
    breaks: [{start: "12:00", end: "13:00"}], 
    totalHours: 6.5, expectedHours: 8, status: 'gap',
    justification: {
      reason: "Traffic caused late arrival.",
      hours: 1.5,
      status: 'rejected',
      timestamp: "2024-01-29T17:15:00Z",
      resolvedBy: "Admin Owner",
      resolvedAt: "2024-01-30T08:30:00Z"
    }
  },
  { 
    id: 101, userId: 2, date: "2024-02-01", timeIn: "08:00", timeOut: "17:00", 
    breaks: [{start: "12:00", end: "13:00"}], 
    totalHours: 8, expectedHours: 8, status: 'complete' 
  },
  { 
    id: 102, userId: 2, date: "2024-02-02", timeIn: "08:00", timeOut: "16:00", 
    breaks: [{start: "12:00", end: "13:00"}], 
    totalHours: 7, expectedHours: 8, status: 'gap',
    justification: {
       reason: "Emergency supply run to market.",
       hours: 1,
       status: 'pending',
       timestamp: "2024-02-02T16:15:00Z"
    }
  },
  { 
    id: 103, userId: 2, date: "2024-02-03", timeIn: "09:00", timeOut: "18:00", 
    breaks: [{start: "13:00", end: "14:00"}], 
    totalHours: 8, expectedHours: 8, status: 'complete' 
  },
];

export const initialTasks: Task[] = [
  { id: 1, title: "Q1 Inventory Audit", description: "Count all flour sacks", assigneeId: 2, status: 'doing', priority: 'high' },
  { id: 2, title: "Update POS Menu", description: "Add new seasonal items", assigneeId: 3, status: 'todo', priority: 'medium' },
];