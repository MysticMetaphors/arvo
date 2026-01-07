"use client"

import { useState } from "react";
import { DeviceMode } from "@/app/demo/attendance/page";
import { TimeTracking } from "./TimeTracking";
import { PayrollModule } from "./PayrollModule";
import { ManagementOps } from "./ManagementOps";
import { ReportsDashboard } from "./ReportsDashboard";
import { ReconciliationHub } from "./ReconciliationHub";
import { initialUsers, User, initialAttendance } from "@/data/demo/attendanceData";

type View = 'login' | 'time' | 'payroll' | 'kanban' | 'users' | 'reports' | 'reconciliation';

export default function AttendanceApp({ deviceMode }: { deviceMode: DeviceMode }) {
  const [view, setView] = useState<View>('login');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [logs, setLogs] = useState(initialAttendance);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showNotImpl, setShowNotImpl] = useState(false);

  const triggerNotImplemented = () => {
    setShowNotImpl(true);
    setTimeout(() => setShowNotImpl(false), 2500);
  };

  const isMobile = deviceMode === 'mobile';
  const pendingCount = logs.filter(l => l.justification?.status === 'pending').length;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = initialUsers.find(u => u.username === username);
    if (user && password === 'demo123') {
       setCurrentUser(user);
       // Admin defaults to Reports, Staff to Time
       setView(user.role === 'admin' ? 'reports' : 'time');
       setError("");
    } else {
       setError("Invalid credentials.");
    }
  };

  if (view === 'login') {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 pattern-grid-lg text-slate-800 relative">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-200 z-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-indigo-600 rounded-xl mx-auto flex items-center justify-center text-white text-3xl mb-4 shadow-lg shadow-indigo-200">
              <i className="fa-solid fa-user-clock"></i>
            </div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Arbiter</h1>
            <p className="text-slate-500 text-sm">Complete Attendance System</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Username</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="e.g. admin or john" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="Password" />
            </div>
            {error && <p className="text-red-500 text-sm text-center bg-red-50 p-2 rounded flex items-center justify-center gap-2"><i className="fa-solid fa-circle-exclamation"></i> {error}</p>}
            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition-all shadow-md hover:shadow-lg">Sign In</button>
          </form>
          <div className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded-lg text-center">
            <p className="text-xs font-bold text-slate-500 uppercase mb-1">Demo Credentials</p>
            <p className="text-sm text-slate-600">User: <span className="font-mono font-bold text-indigo-600">admin</span> or <span className="font-mono font-bold text-indigo-600">john</span></p>
            <p className="text-sm text-slate-600 mt-1">Pass: <span className="font-mono font-bold text-indigo-600">demo123</span></p>
          </div>
        </div>
        <p className="mt-8 text-slate-400 text-xs">© 2026 Arvo Team</p>
      </div>
    );
  }

  return (
    <div className="flex h-full bg-slate-50 text-slate-800 relative">
       {showNotImpl && (
          <div className="absolute top-6 left-1/2 -translate-x-1/2 z-[60] bg-slate-800 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 animate-in slide-in-from-top-4 fade-in">
             <i className="fa-solid fa-triangle-exclamation text-yellow-400"></i>
             <span className="font-bold text-sm">Feature implemented in full version.</span>
          </div>
       )}

       {!isMobile && (
          <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col shrink-0 text-slate-300">
             <div className="p-6 border-b border-slate-800 flex items-center gap-3 h-20">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white"><i className="fa-solid fa-user-clock"></i></div>
                <span className="font-bold text-lg text-white tracking-tight">Arbiter</span>
             </div>
             <div className="p-4">
                <div className="flex items-center gap-3 p-3 bg-slate-800 rounded-xl mb-6 border border-slate-700">
                   <div className="w-10 h-10 bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 rounded-full flex items-center justify-center font-bold">{currentUser?.name[0]}</div>
                   <div>
                      <div className="font-bold text-sm text-white">{currentUser?.name}</div>
                      <div className="text-xs text-slate-400 capitalize">{currentUser?.role}</div>
                   </div>
                </div>
                <nav className="space-y-1">
                   <p className="text-[10px] font-bold text-slate-500 uppercase mb-2 px-3 mt-2">Core</p>
                   {currentUser?.role === 'admin' && <NavBtn id="reports" label="Dashboard" icon="fa-chart-pie" active={view === 'reports'} onClick={() => setView('reports')} />}
                   <NavBtn id="time" label="Attendance" icon="fa-calendar-days" active={view === 'time'} onClick={() => setView('time')} />
                   
                   {currentUser?.role === 'admin' && (
                     <>
                        <p className="text-[10px] font-bold text-slate-500 uppercase mt-6 mb-2 px-3">HR Ops</p>
                        <NavBtn id="reconciliation" label="Documentation" icon="fa-wand-magic-sparkles" active={view === 'reconciliation'} onClick={() => setView('reconciliation')} badge={pendingCount} />
                        <NavBtn id="payroll" label="Payroll" icon="fa-money-check-dollar" active={view === 'payroll'} onClick={() => setView('payroll')} />
                        <NavBtn id="users" label="Employees" icon="fa-users" active={view === 'users'} onClick={() => setView('users')} />
                     </>
                   )}
                   <p className="text-[10px] font-bold text-slate-500 uppercase mt-6 mb-2 px-3">Tools</p>
                   <NavBtn id="kanban" label="Task Board" icon="fa-list-check" active={view === 'kanban'} onClick={() => setView('kanban')} />
                </nav>
             </div>
             <div className="mt-auto p-4 border-t border-slate-800">
                <button onClick={() => setView('login')} className="w-full flex items-center gap-3 px-3 py-2 text-red-400 hover:bg-slate-800 hover:text-white rounded-lg transition-colors text-sm font-bold">
                   <i className="fa-solid fa-right-from-bracket"></i> Logout
                </button>
             </div>
          </aside>
       )}

       <div className="flex-1 flex flex-col min-w-0">
          {isMobile && (
             <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4 shrink-0 text-white">
                <span className="font-bold">Arbiter</span>
                <button onClick={() => setView('login')} className="text-red-400"><i className="fa-solid fa-power-off"></i></button>
             </header>
          )}
          <main className="flex-1 overflow-y-auto p-4 md:p-8 relative">
             {view === 'reports' && <ReportsDashboard isMobile={isMobile} triggerNotImplemented={triggerNotImplemented} />}
             {view === 'time' && <TimeTracking user={currentUser!} logs={logs} setLogs={setLogs} isMobile={isMobile} triggerNotImplemented={triggerNotImplemented} />}
             {view === 'reconciliation' && <ReconciliationHub logs={logs} setLogs={setLogs} isMobile={isMobile} />}
             {view === 'payroll' && <PayrollModule user={currentUser!} logs={logs} setLogs={setLogs} isMobile={isMobile} triggerNotImplemented={triggerNotImplemented} />}
             {view === 'users' && <ManagementOps mode="users" isMobile={isMobile} triggerNotImplemented={triggerNotImplemented} />}
             {view === 'kanban' && <ManagementOps mode="kanban" isMobile={isMobile} triggerNotImplemented={triggerNotImplemented} />}
          </main>
          {isMobile && (
             <nav className="h-16 bg-white border-t border-slate-200 flex justify-around items-center shrink-0">
                <button onClick={() => setView('reports')} className={`text-xl ${view === 'reports' ? 'text-indigo-600' : 'text-slate-400'}`}><i className="fa-solid fa-chart-pie"></i></button>
                <button onClick={() => setView('time')} className={`text-xl ${view === 'time' ? 'text-indigo-600' : 'text-slate-400'}`}><i className="fa-solid fa-calendar-check"></i></button>
                {currentUser?.role === 'admin' && <button onClick={() => setView('reconciliation')} className={`text-xl relative ${view === 'reconciliation' ? 'text-indigo-600' : 'text-slate-400'}`}><i className="fa-solid fa-wand-magic-sparkles"></i>{pendingCount > 0 && <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border border-white"></span>}</button>}
             </nav>
          )}
       </div>
    </div>
  );
}

function NavBtn({ id, label, icon, active, onClick, badge }: any) {
   return (
      <button onClick={onClick} className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${active ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
         <div className="flex items-center gap-3"><i className={`fa-solid ${icon} w-5 text-center`}></i>{label}</div>
         {badge > 0 && <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">{badge}</span>}
      </button>
   )
}