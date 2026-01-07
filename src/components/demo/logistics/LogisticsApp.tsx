"use client"

import { useState } from "react";
import { DeviceMode } from "@/app/demo/logistics/page";
import { FleetDashboard } from "./FleetDashboard";
import { ManagementModules, DriverTaskBoard } from "./ManagementModules";
import { LiveMap } from "./LiveMap";

type View = 'login' | 'map' | 'dashboard' | 'admin' | 'tickets' | 'driver_tasks';

export default function LogisticsApp({ deviceMode }: { deviceMode: DeviceMode }) {
  const [view, setView] = useState<View>('login');
  const [userRole, setUserRole] = useState<'admin' | 'driver' | null>(null);

  const isMobile = deviceMode === 'mobile';

  const handleLogin = (role: 'admin' | 'driver') => {
    setUserRole(role);
    setView(role === 'admin' ? 'map' : 'driver_tasks');
  };

  const NavBtn = ({ id, icon, label }: { id: View, icon: string, label: string }) => (
    <button 
      onClick={() => setView(id)}
      className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all ${view === id ? 'text-cyan-400 bg-cyan-900/20' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
    >
      <i className={`fa-solid ${icon} text-xl mb-1`}></i>
      {!isMobile && <span className="text-[10px] uppercase font-bold tracking-wide">{label}</span>}
    </button>
  );

  // --- LOGIN SCREEN ---
  if (view === 'login') {
    return (
      <div className="w-full h-full flex items-center justify-center bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #0891b2 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl w-full max-w-sm shadow-2xl relative z-10 text-center">
           <div className="w-20 h-20 bg-cyan-900/30 rounded-full flex items-center justify-center mx-auto mb-6 border border-cyan-500/30 text-cyan-400 text-3xl shadow-[0_0_30px_rgba(34,211,238,0.2)]">
              <i className="fa-solid fa-satellite-dish"></i>
           </div>
           <h1 className="text-2xl font-bold mb-2 tracking-tight">Logistics Command</h1>
           <p className="text-slate-400 text-xs mb-8">Secure Logistics Portal</p>
           
           <div className="space-y-3">
             <button onClick={() => handleLogin('admin')} className="w-full py-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-sm font-bold flex items-center justify-between px-6 group transition-all">
                <span>Dispatcher / Admin</span>
                <i className="fa-solid fa-arrow-right text-slate-500 group-hover:text-cyan-400 transition-colors"></i>
             </button>
             <button onClick={() => handleLogin('driver')} className="w-full py-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-sm font-bold flex items-center justify-between px-6 group transition-all">
                <span>Driver Portal</span>
                <i className="fa-solid fa-arrow-right text-slate-500 group-hover:text-cyan-400 transition-colors"></i>
             </button>
           </div>
        </div>
      </div>
    );
  }

  // --- APP LAYOUT ---
  return (
    <div className="flex h-full bg-slate-950 text-slate-200 font-sans">
      
      {/* Sidebar (Desktop/Tablet) */}
      {!isMobile && (
        <aside className="w-20 bg-slate-900 border-r border-slate-800 flex flex-col items-center py-6 shrink-0 z-20">
           <div className="w-10 h-10 bg-cyan-600 rounded-lg flex items-center justify-center text-white mb-8 shadow-lg shadow-cyan-900/50"><i className="fa-solid fa-truck-fast"></i></div>
           
           <nav className="flex-1 space-y-4 w-full px-2">
             {userRole === 'admin' ? (
               <>
                 <NavBtn id="map" icon="fa-map-location-dot" label="Live Map" />
                 <NavBtn id="dashboard" icon="fa-video" label="Dash Cams" />
                 <NavBtn id="admin" icon="fa-users-gear" label="Manage" />
                 <NavBtn id="tickets" icon="fa-headset" label="Support" />
               </>
             ) : (
               <>
                 <NavBtn id="driver_tasks" icon="fa-clipboard-list" label="My Tasks" />
                 <NavBtn id="tickets" icon="fa-triangle-exclamation" label="Report" />
               </>
             )}
           </nav>
           
           <button onClick={() => setView('login')} className="w-10 h-10 rounded-lg bg-slate-800 text-red-400 hover:text-white hover:bg-red-600 transition-colors flex items-center justify-center">
             <i className="fa-solid fa-power-off"></i>
           </button>
        </aside>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 relative h-full">
        {/* Mobile Header */}
        {isMobile && (
           <header className="h-14 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4 shrink-0">
              <span className="font-bold text-cyan-400">FleetCommand</span>
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs border border-slate-700">
                {userRole === 'admin' ? 'A' : 'D'}
              </div>
           </header>
        )}

        <main className="flex-1 overflow-hidden relative bg-slate-950">
           {view === 'map' && <LiveMap isMobile={isMobile} />}
           {view === 'dashboard' && <FleetDashboard isMobile={isMobile} />}
           {view === 'admin' && <ManagementModules mode="admin" isMobile={isMobile} />}
           {view === 'tickets' && <ManagementModules mode="tickets" isMobile={isMobile} />}
           {view === 'driver_tasks' && <DriverTaskBoard isMobile={isMobile} />}
        </main>

        {/* Mobile Bottom Nav */}
        {isMobile && (
          <nav className="h-16 bg-slate-900 border-t border-slate-800 flex items-center justify-around px-2 shrink-0">
             {userRole === 'admin' ? (
               <>
                 <NavBtn id="map" icon="fa-map" label="" />
                 <NavBtn id="dashboard" icon="fa-video" label="" />
                 <NavBtn id="admin" icon="fa-users" label="" />
                 <NavBtn id="tickets" icon="fa-headset" label="" />
               </>
             ) : (
               <>
                 <NavBtn id="driver_tasks" icon="fa-list" label="" />
                 <NavBtn id="tickets" icon="fa-triangle-exclamation" label="" />
               </>
             )}
             <button onClick={() => setView('login')} className="text-red-400"><i className="fa-solid fa-power-off text-xl"></i></button>
          </nav>
        )}
      </div>
    </div>
  );
}