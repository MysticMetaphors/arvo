"use client"

import { useState } from "react";
import InventorySystem from "@/components/demo/inventory/InventorySystem";

export type DeviceMode = 'desktop' | 'tablet' | 'mobile';

export default function InventoryPage() {
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('desktop');

  // Calculate container width based on mode
  const getContainerStyle = () => {
    switch (deviceMode) {
      case 'mobile': return 'w-[375px] h-[800px] rounded-[30px] border-[8px] border-gray-800';
      case 'tablet': return 'w-[768px] h-[900px] rounded-xl border border-gray-700';
      case 'desktop': default: return 'w-full max-w-[1600px] h-[125vh] rounded-xl border border-gray-700';
    }
  };

  return (
    <main className="min-h-screen w-full bg-black-primary pt-20 pb-12 px-4 flex flex-col items-center font-sans">
      <div className="mb-8 flex items-center gap-4 bg-zinc-900 p-2 rounded-full border border-zinc-700 shadow-lg">
        <button onClick={() => setDeviceMode('desktop')} className={`px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 transition-all ${deviceMode === 'desktop' ? 'bg-green-primary text-gray-900' : 'text-zinc-400 hover:text-white'}`}>
          <i className="fa-solid fa-desktop"></i> Desktop
        </button>
        <button onClick={() => setDeviceMode('tablet')} className={`px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 transition-all ${deviceMode === 'tablet' ? 'bg-green-primary text-gray-900' : 'text-zinc-400 hover:text-white'}`}>
          <i className="fa-solid fa-tablet-screen-button"></i> Tablet
        </button>
        <button onClick={() => setDeviceMode('mobile')} className={`px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 transition-all ${deviceMode === 'mobile' ? 'bg-green-primary text-gray-900' : 'text-zinc-400 hover:text-white'}`}>
          <i className="fa-solid fa-mobile-screen-button"></i> Mobile
        </button>
      </div>

      {/* Browser Container */}
      <div className={`bg-white shadow-2xl overflow-hidden flex flex-col relative transition-all duration-500 ease-in-out ${getContainerStyle()}`}>

        {/* Browser Chrome (Address Bar) - Only show on Desktop/Tablet mode for realism */}
        {deviceMode !== 'mobile' && (
          <div className="bg-gray-100 border-b border-gray-300 px-4 py-2 flex items-center gap-4 shrink-0">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="flex-1 bg-white border border-gray-300 rounded-md py-1 px-4 text-xs text-gray-600 flex justify-between items-center font-mono">
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-lock text-[10px] text-green-600"></i>
                <span>secure.inventory-sys.demo/dashboard</span>
              </div>
              <i className="fa-solid fa-rotate-right cursor-pointer hover:text-gray-600"></i>
            </div>
          </div>
        )}

        {/* The Application */}
        <div className="relative flex-1 bg-slate-50 overflow-hidden">
          <InventorySystem deviceMode={deviceMode} />
        </div>
      </div>

      <p className="mt-4 text-gray-500 text-xs">
        {deviceMode === 'mobile' ? 'Mobile View (375px)' : deviceMode === 'tablet' ? 'Tablet View (768px)' : 'Desktop View (Full Width)'}
      </p>
    </main>
  );
}