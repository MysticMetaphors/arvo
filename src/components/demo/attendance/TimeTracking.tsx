"use client"

import { useState } from "react";
import { User, AttendanceRecord } from "@/data/demo/attendanceData";

interface Props { 
  user: User; 
  logs: AttendanceRecord[]; 
  setLogs: (logs: AttendanceRecord[]) => void;
  isMobile: boolean; 
  triggerNotImplemented: () => void;
}

export function TimeTracking({ user, logs, setLogs, isMobile, triggerNotImplemented }: Props) {
  const [isClockedIn, setIsClockedIn] = useState(false);
  
  // State for justification
  const [justifyingLogId, setJustifyingLogId] = useState<number | null>(null);
  const [reason, setReason] = useState("");

  const handleClockToggle = () => {
    setIsClockedIn(!isClockedIn);
  };

  const submitJustification = () => {
     if (justifyingLogId && reason.trim()) {
        const updatedLogs = logs.map(log => {
           if (log.id === justifyingLogId) {
              return { 
                 ...log, 
                 justification: { 
                    reason: reason, 
                    hours: 1, 
                    status: 'pending' as const, 
                    timestamp: new Date().toISOString() 
                 }, 
                 status: 'gap' as const 
              };
           }
           return log;
        });
        setLogs(updatedLogs);
        setJustifyingLogId(null);
        setReason("");
     }
  };

  const displayLogs = user.role === 'admin' ? logs : logs.filter(l => l.userId === user.id);
  const activeGaps = displayLogs.filter(l => l.status === 'gap' && !l.justification);

  // Calendar Helpers
  const daysInMonth = 29;
  const startDayOffset = 4;

  const renderCalendarDay = (day: number) => {
    const dateStr = `2024-02-${day.toString().padStart(2, '0')}`;
    const log = displayLogs.find(l => l.date === dateStr);
    const isToday = day === 5;
    
    let bgClass = "bg-white";
    let dotClass = "hidden";

    if (log) {
       if (log.status === 'complete') { bgClass = "bg-green-50"; dotClass = "bg-green-500"; }
       else if (log.status === 'gap') { bgClass = "bg-orange-50"; dotClass = "bg-orange-500"; }
    } else if (isToday && isClockedIn) {
       bgClass = "bg-indigo-50 border-indigo-200";
       dotClass = "bg-indigo-600 animate-pulse";
    }

    return (
       <div key={day} className={`h-24 border border-slate-100 rounded-lg p-2 flex flex-col justify-between transition-all ${bgClass} ${isToday ? 'ring-2 ring-indigo-500 ring-offset-2' : ''}`}>
          <div className="flex justify-between items-start">
             <span className={`text-xs font-bold ${isToday ? 'text-indigo-600' : 'text-slate-400'}`}>{day}</span>
             {log?.status === 'gap' && <i className="fa-solid fa-circle-exclamation text-orange-400 text-[10px]"></i>}
          </div>
          <div className="flex justify-end">
             <div className={`w-2 h-2 rounded-full ${dotClass}`}></div>
          </div>
       </div>
    );
  };

  return (
    <div className="space-y-6">
       
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div>
             <h2 className="text-2xl font-bold text-slate-800">Time & Attendance</h2>
             <p className="text-slate-500 text-sm">Today is <span className="font-bold text-indigo-600">February 5, 2024</span></p>
          </div>
          <button 
            onClick={handleClockToggle}
            className={`px-8 py-4 rounded-xl font-bold text-white shadow-lg transition-transform active:scale-95 flex items-center gap-3 ${isClockedIn ? 'bg-red-500 hover:bg-red-600' : 'bg-indigo-600 hover:bg-indigo-700'}`}
          >
             <div className={`w-3 h-3 rounded-full ${isClockedIn ? 'bg-white animate-pulse' : 'bg-white/50'}`}></div>
             {isClockedIn ? "CLOCK OUT" : "CLOCK IN"}
          </button>
       </div>

       {/* GAP ALERT */}
       {user.role === 'staff' && activeGaps.length > 0 && (
          <div className="bg-orange-50 border border-orange-200 p-4 rounded-xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
             <div className="bg-orange-100 p-2 rounded-lg text-orange-600"><i className="fa-solid fa-triangle-exclamation"></i></div>
             <div className="flex-1">
                <h3 className="font-bold text-orange-800">Attendance Discrepancy Detected</h3>
                <p className="text-sm text-orange-700 mb-2">On <span className="font-bold">Feb 02</span>, you logged 7 hours (Target: 8h). Please document your activity.</p>
                <button onClick={() => setJustifyingLogId(activeGaps[0].id)} className="bg-orange-600 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-sm hover:bg-orange-700 transition-colors">Resolve Now</button>
             </div>
          </div>
       )}

       {/* CALENDAR VIEW */}
       <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex justify-between items-center mb-6">
             <h3 className="font-bold text-slate-700">February 2024</h3>
             <div className="flex gap-2 text-xs">
                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-500"></div> Complete</div>
                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-orange-500"></div> Gap</div>
             </div>
          </div>
          <div className="grid grid-cols-7 gap-2">
             {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (<div key={d} className="text-center text-xs font-bold text-slate-400 uppercase mb-2">{d}</div>))}
             {Array.from({ length: startDayOffset }).map((_, i) => <div key={`empty-${i}`} className="bg-slate-50 rounded-lg opacity-50"></div>)}
             {Array.from({ length: daysInMonth }).map((_, i) => renderCalendarDay(i + 1))}
          </div>
       </div>

       {/* TIMELINE LIST VIEW */}
       <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100 font-bold text-slate-700 flex justify-between items-center">
             <span>Daily Timeline Breakdown</span>
             
             {/* ADMIN ONLY: IMPORT BUTTON */}
             {user.role === 'admin' && (
                <button 
                  onClick={triggerNotImplemented}
                  className="text-xs bg-slate-800 text-white px-3 py-1.5 rounded-lg font-bold hover:bg-slate-900 shadow-sm flex items-center gap-2"
                >
                  <i className="fa-solid fa-file-import"></i> Import Biometrics
                </button>
             )}
          </div>
          <div className="divide-y divide-slate-100">
             {displayLogs.map(log => (
                <div key={log.id} className="p-6 hover:bg-slate-50 transition-colors group">
                   <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="w-48 shrink-0">
                         <div className="font-bold text-slate-800 text-sm">Feb {log.date.split('-')[2]}, 2024</div>
                         <div className="text-xs text-slate-500">{log.userId === 2 ? 'John Baker' : 'Anna Cashier'}</div>
                      </div>

                      {/* Timeline Bar */}
                      <div className="flex-1 min-w-[200px]">
                         <div className="flex justify-between text-[10px] text-slate-400 mb-1 font-mono uppercase">
                            <span>08:00</span><span>12:00</span><span>13:00</span><span>17:00</span>
                         </div>
                         <div className="h-4 bg-slate-100 rounded-full overflow-hidden flex relative border border-slate-200">
                            {/* Work Segment 1 */}
                            <div className="h-full bg-indigo-500 w-[40%] rounded-l-sm" title="Worked"></div>
                            {/* Break */}
                            <div className="h-full bg-slate-200 w-[10%]" style={{backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, #94a3b8 2px, #94a3b8 3px)'}} title="Break"></div>
                            {/* Work Segment 2 (Shortened if Gap) */}
                            <div className={`h-full w-[30%] ${log.status === 'gap' ? 'bg-orange-400' : 'bg-indigo-500'}`}></div>
                            {/* Gap */}
                            {log.status === 'gap' && (
                               <div className="h-full bg-red-500/10 w-[10%] border-l border-dashed border-red-300 relative group/gap cursor-help">
                                  <div className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center text-[8px] font-bold text-red-500">?</div>
                               </div>
                            )}
                         </div>
                         <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                            <span>In: {log.timeIn}</span>
                            <span>Out: {log.timeOut}</span>
                         </div>
                      </div>
                      <div className="text-right w-24 shrink-0 font-bold text-slate-700">{log.totalHours} hrs</div>
                   </div>
                </div>
             ))}
          </div>
       </div>

       {/* JUSTIFICATION MODAL */}
       {justifyingLogId && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
             <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md border border-slate-200">
                <h3 className="font-bold text-lg text-slate-800 mb-1">Document Missing Hour</h3>
                <p className="text-xs text-slate-500 mb-4">Feb 02, 2024 • 1 Hour Gap</p>
                <div className="mb-4">
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Write-up</label>
                  <textarea 
                     className="w-full border border-slate-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                     rows={3}
                     placeholder="Explain the activity..."
                     value={reason}
                     onChange={(e) => setReason(e.target.value)}
                  ></textarea>
                </div>
                <div className="flex gap-3">
                   <button onClick={() => setJustifyingLogId(null)} className="flex-1 py-3 text-slate-500 font-bold hover:bg-slate-50 rounded-lg text-sm border border-transparent hover:border-slate-200">Cancel</button>
                   <button onClick={submitJustification} disabled={!reason.trim()} className="flex-1 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 text-sm disabled:opacity-50">Submit</button>
                </div>
             </div>
          </div>
       )}
    </div>
  );
}