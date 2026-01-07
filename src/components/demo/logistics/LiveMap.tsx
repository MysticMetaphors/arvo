"use client"

import { useState, useRef, MouseEvent } from "react";

export function LiveMap({ isMobile }: { isMobile: boolean }) {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  
  // refs for drag calculations to avoid closure staleness
  const dragStart = useRef({ x: 0, y: 0 });

  // Base Dimensions
  const WIDTH = 800;
  const HEIGHT = 600;

  // cam (note this map is entirely for demo only)
  const handleZoom = (direction: 'in' | 'out') => {
    setZoom(prev => {
      const newZoom = direction === 'in' ? prev * 1.3 : prev / 1.3;
      return Math.min(Math.max(newZoom, 1), 6); 
    });
  };

  const resetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: MouseEvent) => {
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    
    // delta
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;

    setPan(prev => ({
      x: prev.x - (dx / zoom), 
      y: prev.y - (dy / zoom)
    }));

    dragStart.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const viewW = WIDTH / zoom;
  const viewH = HEIGHT / zoom;
  const viewX = (WIDTH - viewW) / 2 + pan.x;
  const viewY = (HEIGHT - viewH) / 2 + pan.y;
  const viewBoxString = `${viewX} ${viewY} ${viewW} ${viewH}`;

  const markerScale = 1 / zoom;

  return (
    <div className="relative w-full h-full bg-[#0f172a] overflow-hidden">
      
      {/* MAP CONTROLS */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
         <button onClick={() => handleZoom('in')} className="w-9 h-9 bg-slate-800 border border-slate-600 text-white rounded shadow-lg hover:bg-slate-700 active:scale-95 transition-all"><i className="fa-solid fa-plus text-xs"></i></button>
         <button onClick={() => handleZoom('out')} className="w-9 h-9 bg-slate-800 border border-slate-600 text-white rounded shadow-lg hover:bg-slate-700 active:scale-95 transition-all"><i className="fa-solid fa-minus text-xs"></i></button>
         <button onClick={resetView} className="w-9 h-9 bg-cyan-700 text-white rounded shadow-lg hover:bg-cyan-600 active:scale-95 transition-all mt-2" title="Reset View"><i className="fa-solid fa-expand text-xs"></i></button>
      </div>

      {/* STATUS OVERLAY */}
      <div className="absolute top-4 left-4 z-20 bg-slate-900/90 backdrop-blur border border-slate-700 p-3 rounded-lg shadow-xl pointer-events-none select-none">
         <h3 className="font-bold text-white text-xs mb-1 flex items-center gap-2"><i className="fa-solid fa-satellite-dish text-cyan-400"></i> Sector: Antipolo North</h3>
         <div className="flex gap-4 text-[10px] font-mono text-slate-400">
            <div><span className="text-cyan-400 font-bold">●</span> Moving: 1</div>
            <div><span className="text-yellow-500 font-bold">●</span> Idle: 1</div>
         </div>
      </div>

      {/* SVG MAP */}
      <svg 
        className={`w-full h-full transition-transform duration-75 ease-linear ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        viewBox={viewBoxString} 
        preserveAspectRatio="xMidYMid slice"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
         <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
               <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="1"/>
            </pattern>
            <marker id="arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
               <path d="M 0 0 L 6 3 L 0 6 z" fill="#06b6d4" />
            </marker>
         </defs>

         {/* Background */}
         <rect x="0" y="0" width={WIDTH} height={HEIGHT} fill="#0f172a" />
         <rect x="0" y="0" width={WIDTH} height={HEIGHT} fill="url(#grid)" opacity="0.5" />

         <g strokeLinecap="round" strokeLinejoin="round" fill="none" className="pointer-events-none">
            {/* Marcos Hwy */}
            <path d="M -50 150 L 850 150" stroke="#334155" strokeWidth="25" />
            <path d="M -50 150 L 850 150" stroke="#1e293b" strokeWidth="2" strokeDasharray="10 10" />

            {/* Sumulong Hwy */}
            <path d="M 150 150 Q 200 350 400 350 T 700 450" stroke="#334155" strokeWidth="20" />
            
            {/* Ortigas Ext */}
            <path d="M 0 600 L 300 400 L 400 350" stroke="#334155" strokeWidth="20" />
            
            {/* Circumferential */}
            <path d="M 600 150 L 500 350 L 400 350" stroke="#334155" strokeWidth="15" />
         </g>

         {/* --- LOCAL ROADS --- */}
         <g stroke="#1e293b" strokeWidth="6" fill="none" className="pointer-events-none">
            <path d="M 400 350 L 400 550" /> 
            <path d="M 200 150 L 200 50" /> 
            <path d="M 500 350 L 550 500" />
         </g>

         {/* --- LABELS --- */}
         <g fontFamily="monospace" fill="#64748b" fontWeight="bold" fontSize="12" style={{ textTransform: 'uppercase', letterSpacing: '1px' }} className="pointer-events-none select-none">
            <text x="50" y="130">Marcos Hwy</text>
            <text x="420" y="340">Junction</text>
            <text x="650" y="440">Sumulong Hwy</text>
            <text x="20" y="580">Ortigas Ext</text>
            <text x="380" y="580">Town Proper</text>
         </g>

         {/* --- ACTIVE ROUTE --- */}
         <path 
            d="M 150 150 Q 200 350 300 350" 
            stroke="#06b6d4" 
            strokeWidth="4" 
            strokeDasharray="10 5" 
            fill="none"
            className="animate-pulse pointer-events-none"
         />
         
         {/* DESTINATION MARKER */}
         <foreignObject x="280" y="330" width="40" height="40" overflow="visible" className="pointer-events-none">
            <div className="flex flex-col items-center transform -translate-x-1/2 -translate-y-1/2" style={{ transform: `translate(-50%, -50%) scale(${Math.max(markerScale, 0.5)})` }}>
               <div className="relative">
                  <i className="fa-solid fa-location-dot text-red-500 text-3xl drop-shadow-md animate-bounce"></i>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-red-900/80 border border-red-500/50 text-white text-[10px] font-bold px-2 py-0.5 rounded whitespace-nowrap shadow-lg">
                    Task #33
                  </div>
               </div>
            </div>
         </foreignObject>

         {/* VEHICLE 1: MOVING TRUCK */}
         <foreignObject x="200" y="270" width="60" height="60" overflow="visible">
            <div 
               className="group cursor-pointer" 
               style={{ transform: `translate(-50%, -50%) scale(${Math.max(markerScale, 0.6)})` }}
            >
               <div className="relative flex flex-col items-center">
                  <div className="absolute w-24 h-24 bg-cyan-500/10 rounded-full animate-ping pointer-events-none"></div>
                  
                  <div className="relative w-10 h-10 bg-slate-900 border-2 border-cyan-400 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.4)] z-10 transition-transform group-hover:scale-110">
                     <i className="fa-solid fa-truck-fast text-cyan-400 text-sm"></i>
                  </div>

                  {/* INFO CARD */}
                  <div className="absolute bottom-12 bg-slate-900/95 border border-cyan-500/30 p-3 rounded-xl shadow-2xl w-40 opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-30 backdrop-blur-md">
                     <div className="flex justify-between items-center mb-1 border-b border-slate-700 pb-1">
                        <span className="font-bold text-white text-xs">NCA-1234</span>
                        <span className="text-[10px] text-cyan-400 font-mono">45 km/h</span>
                     </div>
                     <div className="text-[10px] text-slate-400 mb-1">Driver: <span className="text-white">Ardzkie</span></div>
                     <div className="text-[10px] text-slate-400">Task: <span className="text-white">Delivery #8832</span></div>
                  </div>
               </div>
            </div>
         </foreignObject>

         {/* VEHICLE 2: IDLE VAN */}
         <foreignObject x="500" y="150" width="40" height="40" overflow="visible">
            <div 
               className="group cursor-pointer" 
               style={{ transform: `translate(-50%, -50%) scale(${Math.max(markerScale, 0.6)})` }}
            >
               <div className="relative flex flex-col items-center">
                  <div className="w-8 h-8 bg-slate-900 border-2 border-yellow-500 rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 z-10">
                     <i className="fa-solid fa-van-shuttle text-yellow-500 text-xs"></i>
                  </div>

                  <div className="absolute -top-3 -right-3 bg-yellow-600 text-black text-[8px] font-bold px-1.5 py-0.5 rounded-full border border-yellow-400">
                     IDLE
                  </div>

                  {/* INFO CARD */}
                  <div className="absolute bottom-10 bg-slate-900/95 border border-yellow-500/30 p-2 rounded-lg shadow-xl w-32 opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-30 backdrop-blur-md">
                     <div className="text-xs font-bold text-white mb-1">ABC-5678</div>
                     <div className="text-[10px] text-yellow-500 uppercase font-bold">Stopped (12m)</div>
                     <div className="text-[10px] text-slate-500 mt-1">Marcos Hwy Stopover</div>
                  </div>
               </div>
            </div>
         </foreignObject>

      </svg>
    </div>
  );
}