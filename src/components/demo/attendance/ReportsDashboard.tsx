"use client"

import { useState } from "react";
import { initialUsers } from "@/data/demo/attendanceData";

export function ReportsDashboard({ isMobile, triggerNotImplemented }: { isMobile: boolean, triggerNotImplemented: () => void }) {
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  const dataPoints = [88, 92, 85, 94, 96, 45, 45, 98, 95, 92, 96, 98, 50, 50, 99]; // Dips are weekends
  const maxVal = 100;
  const days = Array.from({length: 15}, (_, i) => i + 1);

  // SVG Dimensions
  const height = 250;
  const width = 800;
  const padding = 20;
  
  // Calculate Path
  const xStep = (width - (padding * 2)) / (dataPoints.length - 1);
  const points = dataPoints.map((val, i) => {
     const x = padding + (i * xStep);
     const y = height - padding - ((val / maxVal) * (height - (padding * 2)));
     return `${x},${y}`;
  });

  const linePath = `M ${points.join(' L ')}`;
  const areaPath = `${linePath} L ${width - padding},${height - padding} L ${padding},${height - padding} Z`;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
           <h2 className="text-2xl font-bold text-slate-800">Executive Dashboard</h2>
           <p className="text-sm text-slate-500">Period: <span className="font-bold text-indigo-600">Feb 01 - Feb 15, 2024</span></p>
        </div>
        <button onClick={triggerNotImplemented} className="bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-slate-50 transition-all active:scale-95">
           <i className="fa-solid fa-filter mr-2"></i> Filter View
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-xl p-6 text-white shadow-lg relative overflow-hidden group">
            <div className="absolute right-0 top-0 p-4 opacity-10 text-6xl group-hover:scale-110 transition-transform"><i className="fa-solid fa-users"></i></div>
            <div className="text-xs font-bold text-indigo-200 uppercase mb-1">Headcount</div>
            <div className="text-3xl font-bold">24</div>
            <div className="text-xs text-indigo-200 mt-2 flex items-center gap-1"><i className="fa-solid fa-arrow-up"></i> 2 New Hires</div>
         </div>
         <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 relative overflow-hidden group">
            <div className="absolute right-0 top-0 p-4 opacity-5 text-6xl group-hover:scale-110 transition-transform"><i className="fa-solid fa-clock"></i></div>
            <div className="text-xs font-bold text-slate-400 uppercase mb-1">Avg. Attendance</div>
            <div className="text-3xl font-bold text-slate-800">89.2%</div>
            <div className="text-xs text-green-500 mt-2 font-bold flex items-center gap-1"><i className="fa-solid fa-arrow-trend-up"></i> +1.4% vs Jan</div>
         </div>
         <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 relative overflow-hidden group">
            <div className="absolute right-0 top-0 p-4 opacity-5 text-6xl group-hover:scale-110 transition-transform"><i className="fa-solid fa-money-bill-wave"></i></div>
            <div className="text-xs font-bold text-slate-400 uppercase mb-1">Payroll Est.</div>
            <div className="text-3xl font-bold text-slate-800">₱142k</div>
            <div className="text-xs text-slate-400 mt-2">Cycle ends Feb 15</div>
         </div>
         <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 relative overflow-hidden group">
            <div className="absolute right-0 top-0 p-4 opacity-5 text-6xl group-hover:scale-110 transition-transform"><i className="fa-solid fa-triangle-exclamation"></i></div>
            <div className="text-xs font-bold text-slate-400 uppercase mb-1">Pending Gaps</div>
            <div className="text-3xl font-bold text-orange-500">1</div>
            <div className="text-xs text-orange-400 mt-2 font-bold">Action Required</div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         
         {/* CHART */}
         <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col">
            <div className="flex justify-between items-center mb-6">
               <h3 className="font-bold text-slate-700">Attendance Trends (%)</h3>
               <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                  <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-indigo-500"></div> Workforce</div>
               </div>
            </div>
            
            <div className="flex-1 w-full relative">
               <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
                  <defs>
                     <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3"/>
                        <stop offset="100%" stopColor="#6366f1" stopOpacity="0"/>
                     </linearGradient>
                  </defs>

                  {/* Grid Lines (Y-Axis) */}
                  {[0, 25, 50, 75, 100].map((tick, i) => {
                     const y = height - padding - ((tick / maxVal) * (height - (padding * 2)));
                     return (
                        <g key={tick}>
                           <line x1={padding} y1={y} x2={width - padding} y2={y} stroke="#e2e8f0" strokeDasharray="4 4" />
                           <text x={0} y={y + 3} fontSize="10" fill="#94a3b8" textAnchor="start">{tick}%</text>
                        </g>
                     )
                  })}

                  {/* Area Fill */}
                  <path d={areaPath} fill="url(#gradient)" />

                  {/* Line Path */}
                  <path d={linePath} fill="none" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

                  {/* Interactive Points */}
                  {dataPoints.map((val, i) => {
                     const x = padding + (i * xStep);
                     const y = height - padding - ((val / maxVal) * (height - (padding * 2)));
                     return (
                        <g 
                           key={i} 
                           onMouseEnter={() => setHoveredPoint(i)}
                           onMouseLeave={() => setHoveredPoint(null)}
                           className="cursor-pointer"
                        >
                           {/* Invisible Hit Area */}
                           <rect x={x - 10} y={0} width={20} height={height} fill="transparent" />
                           
                           {/* Visible Dot (Only on hover or active) */}
                           <circle 
                              cx={x} cy={y} 
                              r={hoveredPoint === i ? 6 : 0} 
                              fill="#fff" stroke="#6366f1" strokeWidth="3" 
                              className="transition-all duration-200"
                           />
                           
                           {/* Tooltip */}
                           {hoveredPoint === i && (
                              <foreignObject x={x - 40} y={y - 50} width={80} height={40}>
                                 <div className="bg-slate-800 text-white text-[10px] rounded py-1 px-2 text-center shadow-xl">
                                    <div className="font-bold">Feb {i + 1}</div>
                                    <div>{val}% Present</div>
                                    {/* Triangle */}
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-800"></div>
                                 </div>
                              </foreignObject>
                           )}
                        </g>
                     );
                  })}
               </svg>
            </div>
            
            {/* X-Axis Labels */}
            <div className="flex justify-between px-2 mt-2 text-[10px] text-slate-400 font-bold uppercase">
               {days.filter((d) => d % 3 === 1).map(d => (
                  <span key={d}>Feb {d}</span>
               ))}
               <span>Feb 15</span>
            </div>
         </div>

         {/* Top Employees List */}
         <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col">
            <div className="flex justify-between items-center mb-4">
               <h3 className="font-bold text-slate-700">Top Performers</h3>
               <button onClick={triggerNotImplemented} className="text-xs text-indigo-600 font-bold hover:underline">View All</button>
            </div>
            <div className="space-y-4 flex-1">
               {initialUsers.filter(u => u.role === 'staff').map((u, i) => (
                  <div key={u.id} className="flex items-center gap-3 pb-3 border-b border-slate-50 last:border-0 last:pb-0">
                     <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs border border-indigo-100">{i + 1}</div>
                     <div className="flex-1">
                        <div className="font-bold text-sm text-slate-800">{u.name}</div>
                        <div className="text-xs text-slate-500">100% On-time</div>
                     </div>
                     <div className="text-emerald-500 text-xs font-bold bg-emerald-50 px-2 py-1 rounded"><i className="fa-solid fa-star mr-1"></i> 5.0</div>
                  </div>
               ))}
               <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs border border-indigo-100">3</div>
                  <div className="flex-1">
                     <div className="font-bold text-sm text-slate-800">Maria Santos</div>
                     <div className="text-xs text-slate-500">98% On-time</div>
                  </div>
                  <div className="text-emerald-500 text-xs font-bold bg-emerald-50 px-2 py-1 rounded"><i className="fa-solid fa-star mr-1"></i> 4.9</div>
               </div>
            </div>
            
            <button onClick={triggerNotImplemented} className="w-full mt-4 py-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-500 hover:bg-slate-50 transition-colors">
               Generate Performance Report
            </button>
         </div>
      </div>
    </div>
  );
}