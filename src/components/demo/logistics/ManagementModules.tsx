import { useState } from "react";
import { initialDrivers, initialTickets, initialTasks, Driver, Ticket } from "@/data/demo/logisticsData";

interface Props { mode: 'admin' | 'tickets'; isMobile: boolean; }

export function ManagementModules({ mode, isMobile }: Props) {
   if (mode === 'admin') return <DriverList isMobile={isMobile} />;
   if (mode === 'tickets') return <TicketBoard isMobile={isMobile} />;
   return null;
}

// --- ADMIN: DRIVER CRUD ---
function DriverList({ isMobile }: { isMobile: boolean }) {
  const [drivers, setDrivers] = useState<Driver[]>(initialDrivers);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);

  // Modal for Driver Details
  if (selectedDriver) {
    return (
      <div className="absolute inset-0 z-50 bg-slate-950/80 backdrop-blur flex items-center justify-center p-4">
         <div className="bg-slate-900 border border-slate-700 w-full max-w-md rounded-2xl p-6 shadow-2xl">
            <div className="flex justify-between items-start mb-6">
               <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center text-2xl text-slate-500"><i className="fa-solid fa-user"></i></div>
                  <div>
                     <h2 className="text-xl font-bold text-white">{selectedDriver.name}</h2>
                     <span className="text-xs font-bold bg-green-900/50 text-green-400 px-2 py-0.5 rounded uppercase">{selectedDriver.status}</span>
                  </div>
               </div>
               <button onClick={() => setSelectedDriver(null)} className="text-slate-500 hover:text-white"><i className="fa-solid fa-xmark text-xl"></i></button>
            </div>
            
            <div className="space-y-4 mb-6">
               <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                  <p className="text-[10px] font-bold text-slate-500 uppercase">Contact</p>
                  <p className="text-sm font-mono text-cyan-400">{selectedDriver.contact}</p>
               </div>
               <div className="p-3 bg-red-900/10 rounded-lg border border-red-900/30">
                  <p className="text-[10px] font-bold text-red-400 uppercase"><i className="fa-solid fa-kit-medical mr-1"></i> Emergency Contact</p>
                  <p className="text-sm font-bold text-red-200">{selectedDriver.emergencyContact}</p>
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                     <p className="text-[10px] font-bold text-slate-500 uppercase">License Exp</p>
                     <p className="text-sm text-white">{selectedDriver.licenseExp}</p>
                  </div>
                  <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                     <p className="text-[10px] font-bold text-slate-500 uppercase">Score</p>
                     <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden"><div style={{width: `${selectedDriver.performanceScore}%`}} className="h-full bg-green-500"></div></div>
                        <span className="text-xs font-bold text-white">{selectedDriver.performanceScore}</span>
                     </div>
                  </div>
               </div>
            </div>

            <div className="flex gap-3">
               <button className="flex-1 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl text-sm transition-colors">Assign Vehicle</button>
               <button className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-sm transition-colors">Edit Profile</button>
            </div>
         </div>
      </div>
    )
  }

  // Table View
  return (
     <div className="h-full p-4 overflow-y-auto bg-slate-950">
        <div className="flex justify-between items-center mb-6">
           <h2 className="text-xl font-bold text-white">Driver Management</h2>
           <button className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg shadow-cyan-900/20"><i className="fa-solid fa-plus mr-2"></i> Add Driver</button>
        </div>
        <div className="space-y-3">
           {drivers.map(d => (
              <div key={d.id} onClick={() => setSelectedDriver(d)} className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center justify-between hover:bg-slate-800 transition-colors cursor-pointer group">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-slate-500 group-hover:bg-slate-700 group-hover:text-white transition-colors"><i className="fa-solid fa-user"></i></div>
                    <div>
                       <div className="font-bold text-slate-200">{d.name}</div>
                       <div className="text-xs text-slate-500">{d.assignedVehicleId ? `Vehicle #${d.assignedVehicleId}` : 'Unassigned'}</div>
                    </div>
                 </div>
                 <div className="text-right">
                    <div className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded mb-1 inline-block ${d.status === 'active' ? 'bg-green-900/30 text-green-400' : 'bg-slate-700 text-slate-400'}`}>{d.status}</div>
                    <div className="text-[10px] text-slate-500">Score: {d.performanceScore}</div>
                 </div>
              </div>
           ))}
        </div>
     </div>
  )
}

// --- TICKETING SYSTEM ---
function TicketBoard({ isMobile }: { isMobile: boolean }) {
   const [tickets] = useState<Ticket[]>(initialTickets);

   return (
      <div className="h-full p-4 overflow-y-auto bg-slate-950">
         <h2 className="text-xl font-bold text-white mb-6">Support Tickets</h2>
         <div className="space-y-4">
            {tickets.map(t => (
               <div key={t.id} className="bg-slate-900 border border-slate-800 p-4 rounded-xl relative overflow-hidden">
                  <div className={`absolute top-0 left-0 w-1 h-full ${t.priority === 'high' ? 'bg-red-500' : 'bg-yellow-500'}`}></div>
                  <div className="pl-4">
                     <div className="flex justify-between items-start mb-2">
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${t.type === 'breakdown' ? 'bg-red-900/30 text-red-400' : 'bg-blue-900/30 text-blue-400'}`}>{t.type}</span>
                        <span className="text-xs text-slate-500">{t.status}</span>
                     </div>
                     <h3 className="font-bold text-white text-sm mb-1">{t.description}</h3>
                     <p className="text-xs text-slate-400">Reported by: <span className="text-cyan-400">{t.driver}</span></p>
                     
                     <div className="mt-4 flex gap-2">
                        <button className="flex-1 bg-slate-800 hover:bg-slate-700 text-white py-2 rounded-lg text-xs font-bold">Contact Driver</button>
                        <button className="flex-1 bg-cyan-900/30 text-cyan-400 hover:bg-cyan-900/50 py-2 rounded-lg text-xs font-bold">Resolve</button>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>
   )
}

// --- DRIVER VIEW: TASKS ---
export function DriverTaskBoard({ isMobile }: { isMobile: boolean }) {
   const [tasks] = useState(initialTasks);

   return (
      <div className="h-full p-4 overflow-y-auto bg-slate-950">
         <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 border border-slate-700"><i className="fa-solid fa-user-astronaut text-xl"></i></div>
            <div>
               <h2 className="text-lg font-bold text-white">Hello, Juan</h2>
               <p className="text-xs text-cyan-400 font-bold uppercase">Vehicle: NCA-1234</p>
            </div>
         </div>

         <h3 className="text-xs font-bold text-slate-500 uppercase mb-3">Current Assignment</h3>
         <div className="space-y-4">
            {tasks.map(task => (
               <div key={task.id} className={`p-5 rounded-2xl border ${task.status === 'active' ? 'bg-cyan-900/10 border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.1)]' : 'bg-slate-900 border-slate-800 opacity-60'}`}>
                  <div className="flex justify-between items-start mb-3">
                     <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded ${task.status === 'active' ? 'bg-cyan-500 text-black' : 'bg-slate-700 text-slate-300'}`}>{task.status}</span>
                     {task.status === 'active' && <i className="fa-solid fa-location-arrow text-cyan-400 animate-pulse"></i>}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{task.title}</h3>
                  <p className="text-slate-400 text-sm mb-4"><i className="fa-solid fa-map-pin mr-2 text-slate-500"></i>{task.address}</p>
                  
                  {/* AI Integration */}
                  <div className="bg-slate-950 border border-slate-800 p-3 rounded-lg flex gap-3 items-start">
                     <i className="fa-solid fa-robot text-purple-400 mt-1"></i>
                     <div>
                        <p className="text-[10px] font-bold text-purple-400 uppercase mb-0.5">AI Optimization</p>
                        <p className="text-xs text-slate-300 italic">"{task.aiNote}"</p>
                     </div>
                  </div>

                  {task.status === 'active' && (
                     <button className="w-full mt-4 bg-green-600 hover:bg-green-500 text-white py-3 rounded-xl font-bold text-sm shadow-lg transition-all">Mark Delivered</button>
                  )}
               </div>
            ))}
         </div>
      </div>
   )
}