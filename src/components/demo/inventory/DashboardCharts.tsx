import { DeviceMode } from "@/app/demo/inventory/page";
import { useState, useEffect } from "react";

export function DashboardCharts({ deviceMode }: { deviceMode: DeviceMode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500); // Simulate data fetch
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <DashboardSkeleton />;

  return (
    <div className="space-y-6">
      {/* AI Insights Panel */}
      <div className="bg-gradient-to-r from-indigo-900 to-indigo-800 rounded-xl p-6 text-white shadow-lg relative overflow-hidden">
         <div className="absolute top-0 right-0 p-8 opacity-10 text-9xl"><i className="fa-solid fa-robot"></i></div>
         <div className="relative z-10">
           <div className="flex items-center gap-2 mb-2 text-indigo-200 text-xs font-bold uppercase tracking-wider">
             <i className="fa-solid fa-sparkles"></i> Nexus AI Intelligence
           </div>
           <h3 className="text-xl font-bold mb-2">Sales trending up 15% this week.</h3>
           <p className="text-indigo-100 text-sm max-w-lg mb-4">
             Based on current velocity, "Pro Workstations" will be out of stock in 4 days. Recommended: Reorder 20 units from Vendor A immediately.
           </p>
           <button className="bg-white text-indigo-900 px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-50 transition-colors">
             Generate PO
           </button>
         </div>
      </div>

      {/* KPI Grid */}
      <div className={`grid gap-4 ${deviceMode === 'mobile' ? 'grid-cols-1' : 'grid-cols-2 lg:grid-cols-4'}`}>
         <StatCard title="Total Revenue" value="$12,345" trend="+12%" positive={true} icon="fa-dollar-sign" />
         <StatCard title="Active Users" value="1,000,001" trend="+5%" positive={true} icon="fa-users" />
         <StatCard title="Stock Alerts" value="4 Items" trend="-2" positive={false} icon="fa-box" />
         <StatCard title="Pending Tasks" value="12" trend="3 Urgent" positive={false} icon="fa-list-check" />
      </div>

      {/* Chartsssssssssssss */}
      <div className={`grid gap-6 ${deviceMode === 'mobile' ? 'grid-cols-1' : 'grid-cols-3'}`}>
         
         {/* Revenue */}
         <div className="col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h4 className="font-bold text-slate-800 mb-6">Revenue Overview</h4>
            <div className="h-64 relative">
               <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                  <line x1="0" y1="10" x2="100" y2="10" stroke="#e2e8f0" strokeWidth="0.5" />
                  <line x1="0" y1="30" x2="100" y2="30" stroke="#e2e8f0" strokeWidth="0.5" />
                  <path d="M0,50 L0,35 L20,25 L40,30 L60,15 L80,20 L100,5 L100,50 Z" fill="rgba(79, 70, 229, 0.1)" />
                  <path d="M0,35 L20,25 L40,30 L60,15 L80,20 L100,5" fill="none" stroke="#4f46e5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="20" cy="25" r="1.5" fill="#fff" stroke="#4f46e5" strokeWidth="1" />
                  <circle cx="60" cy="15" r="1.5" fill="#fff" stroke="#4f46e5" strokeWidth="1" />
                  <circle cx="100" cy="5" r="1.5" fill="#fff" stroke="#4f46e5" strokeWidth="1" />
               </svg>
            </div>
         </div>

         {/* Stock */}
         <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
            <h4 className="font-bold text-slate-800 mb-4">Stock Value</h4>
            <div className="flex-1 flex items-center justify-center relative">
               <svg viewBox="0 0 36 36" className="w-40 h-40 animate-spin-slow">
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="#e2e8f0" strokeWidth="3.8" />
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="#4f46e5" strokeWidth="3.8" strokeDasharray="70 30" strokeDashoffset="25" />
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="#10b981" strokeWidth="3.8" strokeDasharray="20 80" strokeDashoffset="-45" />
               </svg>
               <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-slate-800">70%</span>
                  <span className="text-[10px] text-slate-400 uppercase">Electronics</span>
               </div>
            </div>
            <div className="mt-4 space-y-2">
               <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-indigo-600"></span> Electronics</span>
                  <span className="font-bold">$25k</span>
               </div>
               <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Accessories</span>
                  <span className="font-bold">$8k</span>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, trend, positive, icon }: any) {
  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
       <div className="flex justify-between items-start mb-2">
          <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-slate-500">
             <i className={`fa-solid ${icon}`}></i>
          </div>
          <span className={`text-xs font-bold px-2 py-1 rounded-full ${positive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
             {trend}
          </span>
       </div>
       <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
       <p className="text-xs text-slate-500 uppercase font-bold mt-1">{title}</p>
    </div>
  )
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
       <div className="h-40 bg-slate-200 rounded-xl w-full"></div>
       <div className="grid grid-cols-4 gap-4">
          {[1,2,3,4].map(i => <div key={i} className="h-32 bg-slate-200 rounded-xl"></div>)}
       </div>
       <div className="h-64 bg-slate-200 rounded-xl"></div>
    </div>
  )
}