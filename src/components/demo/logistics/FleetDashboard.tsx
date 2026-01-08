import { useState } from "react";
import { initialVehicles, Vehicle } from "@/data/demo/logisticsData";

export function FleetDashboard({ isMobile }: { isMobile: boolean }) {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(initialVehicles[0]);

  return (
    <div className="h-full flex flex-col md:flex-row bg-slate-950">
      
      {/* CCTV Grid */}
      <div className="flex-1 p-4 overflow-y-auto">
        <h2 className="text-slate-400 text-xs font-bold uppercase mb-4 flex items-center gap-2">
           <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span> Live Feeds
        </h2>
        <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-2 lg:grid-cols-3'}`}>
           {initialVehicles.map(v => (
             <div 
               key={v.id} 
               onClick={() => setSelectedVehicle(v)}
               className={`relative aspect-video bg-slate-800 rounded-lg overflow-hidden border-2 cursor-pointer transition-all group ${selectedVehicle?.id === v.id ? 'border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.3)]' : 'border-slate-800 hover:border-slate-600'}`}
             >
                {/* Placeholder Cam Feed */}
                <div className={`absolute inset-0 opacity-20 ${v.camFeed}`}></div>
                <div className="absolute inset-0 flex items-center justify-center text-slate-600 font-mono text-4xl opacity-10">NO SIGNAL</div>
                
                {/* Overlay Data */}
                <div className="absolute top-2 left-2 bg-black/50 px-2 py-1 rounded text-[10px] font-mono text-white flex items-center gap-2">
                   <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span> REC
                   <span>{v.plate}</span>
                </div>
                <div className="absolute bottom-2 right-2 text-[10px] font-mono text-cyan-400">{v.model}</div>
             </div>
           ))}
        </div>
      </div>

      {/* Telemetry Sidebar */}
      {selectedVehicle && (
        <div className={`${isMobile ? 'h-1/2 border-t' : 'w-80 border-l'} border-slate-800 bg-slate-900 p-6 overflow-y-auto`}>
           <h3 className="font-bold text-white text-lg mb-1">{selectedVehicle.plate}</h3>
           <p className="text-cyan-400 text-xs font-bold uppercase mb-6">{selectedVehicle.model} • {selectedVehicle.type}</p>

           <div className="space-y-6">
              {/* Location */}
              <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                 <div className="flex items-center gap-3 mb-2">
                    <i className="fa-solid fa-location-crosshairs text-cyan-500"></i>
                    <span className="text-xs font-bold text-slate-400">CURRENT LOCATION</span>
                 </div>
                 <p className="text-sm text-white">{selectedVehicle.gps.location}</p>
                 <p className="text-[10px] text-slate-500 font-mono mt-1">{selectedVehicle.gps.lat}, {selectedVehicle.gps.lng}</p>
              </div>

              {/* Data Usage */}
              <div>
                 <div className="flex justify-between text-xs font-bold text-slate-400 mb-2">
                    <span>DATA USAGE (5G)</span>
                    <span className={selectedVehicle.dataUsage.used > 8 ? 'text-red-500' : 'text-green-500'}>{selectedVehicle.dataUsage.used} / {selectedVehicle.dataUsage.total} GB</span>
                 </div>
                 <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${selectedVehicle.dataUsage.used > 8 ? 'bg-red-500' : 'bg-cyan-500'}`} 
                      style={{ width: `${(selectedVehicle.dataUsage.used / selectedVehicle.dataUsage.total) * 100}%` }}
                    ></div>
                 </div>
              </div>

              {/* Live Stats */}
              <div className="grid grid-cols-2 gap-3">
                 <StatBox label="SPEED" value={`${selectedVehicle.speed} km/h`} icon="fa-gauge-high" />
                 <StatBox label="FUEL" value={`${selectedVehicle.fuelLevel}%`} icon="fa-gas-pump" alert={selectedVehicle.fuelLevel < 20} />
                 <StatBox label="ODOMETER" value={`${selectedVehicle.odometer} km`} icon="fa-road" />
                 <StatBox label="STATUS" value={selectedVehicle.status} icon="fa-info-circle" />
              </div>

              {/* Driver Contact */}
              <div className="pt-4 border-t border-slate-800">
                 <p className="text-xs font-bold text-slate-500 mb-2">ASSIGNED DRIVER</p>
                 <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold">JD</div>
                    <div>
                       <div className="text-sm font-bold text-white">Juan Dela Cruz</div>
                       <div className="text-[10px] text-slate-400">0917-123-4567</div>
                    </div>
                    <button className="ml-auto w-8 h-8 rounded bg-cyan-900/30 text-cyan-400 hover:bg-cyan-600 hover:text-white transition-colors"><i className="fa-solid fa-phone"></i></button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}

function StatBox({ label, value, icon, alert }: any) {
   return (
      <div className={`bg-slate-800 p-3 rounded-lg border ${alert ? 'border-red-500/50 bg-red-900/10' : 'border-slate-700'}`}>
         <div className={`text-[10px] font-bold mb-1 flex items-center gap-2 ${alert ? 'text-red-400' : 'text-slate-500'}`}>
            <i className={`fa-solid ${icon}`}></i> {label}
         </div>
         <div className={`text-sm font-bold font-mono ${alert ? 'text-red-100' : 'text-white'}`}>{value}</div>
      </div>
   )
}