"use client"

import { useState } from "react";
import AttendanceApp from "@/components/demo/attendance/AttendanceApp";

export type DeviceMode = 'desktop' | 'tablet' | 'mobile';

export default function ArbiterPage() {
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('desktop');

  const getContainerStyle = () => {
    switch(deviceMode) {
      case 'mobile': return 'w-[375px] h-[800px] rounded-[30px] border-[8px] border-slate-800 shadow-2xl';
      case 'tablet': return 'w-[768px] h-[1000px] rounded-xl border-4 border-slate-800 shadow-2xl';
      case 'desktop': default: return 'w-full max-w-[1400px] h-[125vh] rounded-xl border border-slate-700 shadow-2xl';
    }
  };

  return (
    <main className="min-h-screen w-full bg-slate-950 pt-20 pb-12 px-4 flex flex-col items-center font-sans">
      <div className="mb-8 flex items-center gap-4 bg-slate-900 p-2 rounded-full border border-slate-700 shadow-lg">
        <button onClick={() => setDeviceMode('desktop')} className={`px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 transition-all ${deviceMode === 'desktop' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}>
          <i className="fa-solid fa-desktop"></i> Desktop
        </button>
        <button onClick={() => setDeviceMode('tablet')} className={`px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 transition-all ${deviceMode === 'tablet' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}>
          <i className="fa-solid fa-tablet-screen-button"></i> Tablet
        </button>
        <button onClick={() => setDeviceMode('mobile')} className={`px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 transition-all ${deviceMode === 'mobile' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}>
          <i className="fa-solid fa-mobile-screen-button"></i> Mobile
        </button>
      </div>

      <div className={`bg-white overflow-hidden flex flex-col relative transition-all duration-500 ease-in-out ${getContainerStyle()}`}>
        {deviceMode !== 'mobile' && (
          <div className="bg-slate-100 border-b border-slate-200 px-4 py-3 flex items-center gap-4 shrink-0">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400 border border-red-500/30" />
              <div className="w-3 h-3 rounded-full bg-yellow-400 border border-yellow-500/30" />
              <div className="w-3 h-3 rounded-full bg-green-400 border border-green-500/30" />
            </div>
            <div className="flex-1 bg-white border border-slate-300 rounded-md py-1.5 px-4 text-xs text-slate-500 flex justify-between items-center font-mono shadow-sm">
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-lock text-[10px] text-green-600"></i>
                <span className="text-slate-700 font-bold">secure.attendance.demo</span>
              </div>
              <i className="fa-solid fa-rotate-right cursor-pointer hover:text-slate-800 transition-colors"></i>
            </div>
          </div>
        )}
        <div className="relative flex-1 bg-slate-50 overflow-hidden">
          <AttendanceApp deviceMode={deviceMode} />
        </div>
      </div>
    </main>
  );
}