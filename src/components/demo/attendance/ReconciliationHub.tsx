"use client"

import { AttendanceRecord, initialUsers } from "@/data/demo/attendanceData";

interface Props {
   logs: AttendanceRecord[];
   setLogs: (logs: AttendanceRecord[]) => void;
   isMobile: boolean;
}

export function ReconciliationHub({ logs, setLogs, isMobile }: Props) {
  const pendingLogs = logs.filter(l => l.justification?.status === 'pending');
  const historyLogs = logs.filter(l => l.justification?.status === 'approved' || l.justification?.status === 'rejected');

  const approveJustification = (logId: number) => {
     const updatedLogs = logs.map(l => {
        if (l.id === logId) {
           return { 
              ...l, 
              totalHours: l.totalHours + (l.justification?.hours || 0),
              justification: { ...l.justification!, status: 'approved' as const, resolvedBy: 'Admin', resolvedAt: new Date().toISOString() }, 
              status: 'complete' as const 
           };
        }
        return l;
     });
     setLogs(updatedLogs);
  };

  const rejectJustification = (logId: number) => {
     const updatedLogs = logs.map(l => {
        if (l.id === logId) {
           return { ...l, justification: { ...l.justification!, status: 'rejected' as const, resolvedBy: 'Admin', resolvedAt: new Date().toISOString() } };
        }
        return l;
     });
     setLogs(updatedLogs);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
       <div>
         <h2 className="text-2xl font-bold text-slate-800">Documentation</h2>
         <p className="text-sm text-slate-500">Manage time discrepancies and documentation.</p>
       </div>

       {/* PENDING REQUESTS */}
       <div>
          <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-orange-500"></div> Pending Review ({pendingLogs.length})
          </h3>
          
          {pendingLogs.length === 0 && (
             <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 text-center text-slate-400 text-sm italic">
                No pending reconciliation requests.
             </div>
          )}

          <div className="grid grid-cols-1 gap-4">
             {pendingLogs.map(log => {
                const user = initialUsers.find(u => u.id === log.userId);
                return (
                   <div key={log.id} className="bg-white rounded-xl shadow-md border-l-4 border-orange-500 overflow-hidden">
                      <div className="p-6">
                         <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                               <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600">{user?.name[0]}</div>
                               <div>
                                  <div className="font-bold text-slate-800 text-lg">{user?.name}</div>
                                  <div className="text-xs text-slate-500">Staff ID: #{user?.id.toString().padStart(3, '0')}</div>
                               </div>
                            </div>
                            <div className="text-right">
                               <div className="font-bold text-slate-800">{log.date}</div>
                               <div className="text-xs text-red-500 font-bold bg-red-50 px-2 py-1 rounded mt-1">
                                  Gap: 1 Hour (16:00 vs 17:00)
                               </div>
                            </div>
                         </div>

                         <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 relative mb-6">
                            <i className="fa-solid fa-quote-left absolute -top-2 -left-2 text-slate-300 text-xl bg-white p-1 rounded-full"></i>
                            <div className="text-sm text-slate-700 italic">"{log.justification?.reason}"</div>
                            <div className="text-[10px] text-slate-400 mt-2 text-right">Submitted at: {new Date(log.justification?.timestamp || "").toLocaleString()}</div>
                         </div>

                         <div className="flex gap-3 justify-end">
                            <button onClick={() => rejectJustification(log.id)} className="px-5 py-2 border border-slate-200 text-slate-600 font-bold rounded-lg text-sm hover:bg-slate-50 hover:text-red-500">Reject</button>
                            <button onClick={() => approveJustification(log.id)} className="px-5 py-2 bg-indigo-600 text-white font-bold rounded-lg text-sm hover:bg-indigo-700 shadow-sm">Approve & Reconcile</button>
                         </div>
                      </div>
                   </div>
                );
             })}
          </div>
       </div>

       {/* HISTORY LOG */}
       <div>
          <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-slate-400"></div> History Log
          </h3>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-500 font-bold text-xs uppercase border-b border-slate-200">
                   <tr>
                      <th className="px-6 py-3">Employee</th>
                      <th className="px-6 py-3">Date</th>
                      <th className="px-6 py-3">Documentation</th>
                      <th className="px-6 py-3">Status</th>
                      <th className="px-6 py-3">Resolved By</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                   {historyLogs.map(log => (
                      <tr key={log.id} className="hover:bg-slate-50">
                         <td className="px-6 py-4 font-bold text-slate-700">{initialUsers.find(u => u.id === log.userId)?.name}</td>
                         <td className="px-6 py-4 text-slate-600">{log.date}</td>
                         <td className="px-6 py-4 max-w-xs truncate text-slate-500 italic">"{log.justification?.reason}"</td>
                         <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${log.justification?.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                               {log.justification?.status}
                            </span>
                         </td>
                         <td className="px-6 py-4 text-xs text-slate-500">
                            {log.justification?.resolvedBy} <span className="text-slate-400">({new Date(log.justification?.resolvedAt || "").toLocaleDateString()})</span>
                         </td>
                      </tr>
                   ))}
                   {historyLogs.length === 0 && (
                      <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-400 text-xs italic">No history available</td></tr>
                   )}
                </tbody>
             </table>
          </div>
       </div>
    </div>
  );
}