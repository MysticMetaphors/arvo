"use client"

import { useState } from "react";
import { User, AttendanceRecord, initialUsers } from "@/data/demo/attendanceData";

interface Props {
   user: User;
   logs: AttendanceRecord[];
   setLogs: (logs: AttendanceRecord[]) => void;
   isMobile: boolean;
   triggerNotImplemented: () => void;
}

export function PayrollModule({ user, logs, setLogs, isMobile, triggerNotImplemented }: Props) {
  const [showPayslip, setShowPayslip] = useState<number | null>(null);

  // Filter logs with pending justifications
  const pendingLogs = logs.filter(l => l.justification?.status === 'pending');

  const approveJustification = (logId: number) => {
     const updatedLogs = logs.map(l => {
        if (l.id === logId) {
           return { 
              ...l, 
              totalHours: l.totalHours + (l.justification?.hours || 0),
              justification: { ...l.justification!, status: 'approved' as const, resolvedBy: user.name, resolvedAt: new Date().toISOString() }, 
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
           return { 
              ...l, 
              justification: { ...l.justification!, status: 'rejected' as const, resolvedBy: user.name, resolvedAt: new Date().toISOString() } 
           };
        }
        return l;
     });
     setLogs(updatedLogs);
  };

  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
         <div>
            <h2 className="text-2xl font-bold text-slate-800">Payroll</h2>
            <p className="text-sm text-slate-500">Period: <span className="font-bold text-indigo-600 cursor-pointer border-b border-dashed border-indigo-300" onClick={triggerNotImplemented}>Feb 01 - Feb 15, 2024</span></p>
         </div>
         <button onClick={triggerNotImplemented} className="bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-50 shadow-sm">
            <i className="fa-solid fa-download mr-2"></i> Export CSV
         </button>
       </div>

       {/* RECONCILIATION WIDGET (Compact for Payroll View) */}
       {pendingLogs.length > 0 ? (
          <div className="bg-white rounded-xl shadow-md border border-indigo-100 overflow-hidden animate-in fade-in slide-in-from-left-2">
             <div className="bg-indigo-50 px-6 py-4 border-b border-indigo-100 flex items-center gap-2">
                <i className="fa-solid fa-wand-magic-sparkles text-indigo-600"></i>
                <h3 className="font-bold text-indigo-900">Pending Reconciliations</h3>
             </div>
             <table className="w-full text-left text-sm">
                <thead className="bg-white text-slate-500 font-bold text-xs uppercase border-b border-slate-100">
                   <tr>
                      <th className="px-6 py-3">Employee</th>
                      <th className="px-6 py-3">Date / Discrepancy</th>
                      <th className="px-6 py-3">Justification</th>
                      <th className="px-6 py-3 text-right">Actions</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                   {pendingLogs.map(log => (
                      <tr key={log.id} className="hover:bg-slate-50">
                         <td className="px-6 py-4 font-bold text-slate-700">
                            {initialUsers.find(u => u.id === log.userId)?.name}
                         </td>
                         <td className="px-6 py-4">
                            <div className="text-slate-800 font-bold">{log.date}</div>
                            <div className="text-xs text-red-500 font-bold">Missing 1 Hr</div>
                         </td>
                         <td className="px-6 py-4">
                            <div className="italic text-slate-600 bg-slate-100 p-2 rounded border border-slate-200 truncate max-w-xs">
                               "{log.justification?.reason}"
                            </div>
                         </td>
                         <td className="px-6 py-4 text-right space-x-2">
                            <button onClick={() => rejectJustification(log.id)} className="text-xs font-bold text-slate-400 hover:text-red-500 px-3 py-1">Reject</button>
                            <button onClick={() => approveJustification(log.id)} className="text-xs font-bold bg-indigo-600 text-white px-3 py-1.5 rounded hover:bg-indigo-700 shadow-sm">Approve</button>
                         </td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
       ) : (
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-emerald-700 text-sm flex items-center gap-3 shadow-sm">
             <div className="bg-emerald-100 p-2 rounded-full"><i className="fa-solid fa-check"></i></div>
             All time logs reconciled. Ready for payroll processing.
          </div>
       )}

       {/* Payroll Table */}
       <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-left text-sm">
             <thead className="bg-slate-50 text-slate-500 font-bold text-xs uppercase border-b border-slate-200">
                <tr>
                   <th className="px-6 py-4">Employee</th>
                   <th className="px-6 py-4">Rate</th>
                   <th className="px-6 py-4">Period</th>
                   <th className="px-6 py-4">Est. Gross Pay</th>
                   <th className="px-6 py-4 text-right">Actions</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-slate-100">
                {initialUsers.filter(u => u.role !== 'admin').map(emp => {
                   const empLogs = logs.filter(l => l.userId === emp.id);
                   const totalHours = empLogs.reduce((acc, curr) => acc + curr.totalHours, 0);
                   const hourlyRate = emp.rateAmount / 8; // Assuming 8hr day for Daily rate
                   const gross = totalHours * hourlyRate;

                   return (
                      <tr key={emp.id} className="hover:bg-slate-50 transition-colors">
                         <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                               <div className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center font-bold text-xs border border-indigo-100">{emp.name[0]}</div>
                               <div className="font-bold text-slate-800">{emp.name}</div>
                            </div>
                         </td>
                         <td className="px-6 py-4">
                            <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-[10px] font-bold uppercase">{emp.rateType}</span>
                            <span className="ml-2 text-xs text-slate-500 font-mono">₱{emp.rateAmount}/day</span>
                         </td>
                         <td className="px-6 py-4 text-slate-500 text-xs">Feb 01 - Feb 15</td>
                         <td className="px-6 py-4 font-mono font-bold text-emerald-600">₱{gross.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                         <td className="px-6 py-4 text-right">
                            <button onClick={() => setShowPayslip(emp.id)} className="text-indigo-600 hover:text-indigo-700 font-bold text-xs border border-indigo-200 px-3 py-1.5 rounded-lg hover:bg-indigo-50 transition-colors">View Payslip</button>
                         </td>
                      </tr>
                   )
                })}
             </tbody>
          </table>
       </div>

       {/* Payslip Modal */}
       {showPayslip && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
             <div className="bg-white w-full max-w-xl p-0 rounded-xl shadow-2xl relative overflow-hidden animate-in zoom-in-95">
                {/* Header */}
                <div className="bg-slate-50 border-b border-slate-200 p-4 flex justify-between items-center">
                   <h3 className="font-bold text-slate-800">Payslip Preview</h3>
                   <button onClick={() => setShowPayslip(null)} className="text-slate-400 hover:text-slate-600"><i className="fa-solid fa-xmark"></i></button>
                </div>

                {/* Payslip Content */}
                <div className="p-8">
                   {/* Company & Period Header */}
                   <div className="flex justify-between items-start border-b-2 border-slate-800 pb-6 mb-6">
                      <div>
                         <h2 className="font-bold text-xl uppercase tracking-widest text-slate-800">Arbiter Systems</h2>
                         <p className="text-xs text-slate-500">123 Business Rd, Manila</p>
                      </div>
                      <div className="text-right">
                         <p className="text-xs font-bold text-slate-400 uppercase">Pay Period</p>
                         <p className="font-bold text-slate-800">Feb 01 - Feb 15, 2024</p>
                      </div>
                   </div>

                   {/* Employee Details */}
                   <div className="grid grid-cols-2 gap-8 mb-8 bg-slate-50 p-4 rounded-lg border border-slate-100">
                      <div>
                         <p className="text-[10px] uppercase text-slate-400 font-bold mb-1">Employee Name</p>
                         <p className="font-bold text-slate-800">{initialUsers.find(u => u.id === showPayslip)?.name}</p>
                         <p className="text-xs text-slate-500">ID: #{showPayslip?.toString().padStart(4, '0')}</p>
                      </div>
                      <div className="text-right">
                         <p className="text-[10px] uppercase text-slate-400 font-bold mb-1">Rate Information</p>
                         <p className="font-bold text-slate-800">₱{initialUsers.find(u => u.id === showPayslip)?.rateAmount.toLocaleString()} / Day</p>
                         <p className="text-xs text-slate-500 capitalize">{initialUsers.find(u => u.id === showPayslip)?.rateType}</p>
                      </div>
                   </div>

                   {/* Earnings & Deductions Grid */}
                   <div className="grid grid-cols-2 gap-8 mb-6">
                      
                      {/* Earnings */}
                      <div>
                         <h4 className="font-bold text-slate-700 text-sm uppercase border-b border-slate-200 pb-2 mb-3">Earnings</h4>
                         {(() => {
                            const emp = initialUsers.find(u => u.id === showPayslip)!;
                            const empLogs = logs.filter(l => l.userId === emp.id);
                            // Calculate total hours (reconciled hours are already added to totalHours in the logic)
                            const totalHours = empLogs.reduce((acc, curr) => acc + curr.totalHours, 0);
                            const hourlyRate = emp.rateAmount / 8;
                            const basicPay = totalHours * hourlyRate;
                            
                            return (
                               <div className="space-y-2 text-sm">
                                  <div className="flex justify-between">
                                     <span className="text-slate-600">Basic Pay</span>
                                     <span className="font-mono text-slate-800">{basicPay.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                                  </div>
                                  <div className="text-xs text-slate-400 pl-2">
                                     {totalHours} hrs @ ₱{hourlyRate.toFixed(2)}/hr
                                  </div>
                                  <div className="flex justify-between">
                                     <span className="text-slate-600">Overtime</span>
                                     <span className="font-mono text-slate-800">0.00</span>
                                  </div>
                                  <div className="flex justify-between border-t border-slate-100 pt-2 mt-2">
                                     <span className="font-bold text-slate-700">Total Earnings</span>
                                     <span className="font-mono font-bold text-slate-800">₱{basicPay.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                                  </div>
                               </div>
                            )
                         })()}
                      </div>

                      {/* Deductions */}
                      <div>
                         <h4 className="font-bold text-slate-700 text-sm uppercase border-b border-slate-200 pb-2 mb-3">Deductions</h4>
                         <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                               <span className="text-slate-600">Absences</span>
                               <span className="font-mono text-slate-800">0.00</span>
                            </div>
                            <div className="flex justify-between">
                               <span className="text-slate-600">Late / Undertime</span>
                               <span className="font-mono text-slate-800">0.00</span>
                            </div>
                            <div className="flex justify-between">
                               <span className="text-slate-600">SSS Contribution</span>
                               <span className="font-mono text-slate-800">580.00</span>
                            </div>
                            <div className="flex justify-between">
                               <span className="text-slate-600">PhilHealth</span>
                               <span className="font-mono text-slate-800">400.00</span>
                            </div>
                            <div className="flex justify-between border-t border-slate-100 pt-2 mt-2">
                               <span className="font-bold text-slate-700">Total Deductions</span>
                               <span className="font-mono font-bold text-red-500">980.00</span>
                            </div>
                         </div>
                      </div>
                   </div>

                   {/* Net Pay */}
                   <div className="bg-slate-800 text-white p-4 rounded-lg flex justify-between items-center shadow-lg">
                      <span className="font-bold text-sm uppercase opacity-80">Net Pay</span>
                      {(() => {
                         const emp = initialUsers.find(u => u.id === showPayslip)!;
                         const empLogs = logs.filter(l => l.userId === emp.id);
                         const totalHours = empLogs.reduce((acc, curr) => acc + curr.totalHours, 0);
                         const hourlyRate = emp.rateAmount / 8;
                         const basicPay = totalHours * hourlyRate;
                         const net = basicPay - 980; // Minus mock deductions
                         return <span className="font-bold text-2xl font-mono">₱{net.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                      })()}
                   </div>
                </div>

                <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">
                   <button onClick={() => setShowPayslip(null)} className="px-4 py-2 text-slate-500 font-bold text-sm hover:text-slate-700">Close</button>
                   <button onClick={triggerNotImplemented} className="px-6 py-2 bg-indigo-600 text-white font-bold text-sm rounded-lg hover:bg-indigo-700 shadow-sm flex items-center gap-2"><i className="fa-solid fa-print"></i> Print Payslip</button>
                </div>
             </div>
          </div>
       )}
    </div>
  );
}