"use client"

import { useState } from "react";
import { initialTasks, initialUsers, Task, User } from "@/data/demo/attendanceData";

interface Props { mode: 'users' | 'kanban' | 'reports'; isMobile: boolean; triggerNotImplemented: () => void; }

export function ManagementOps({ mode, isMobile, triggerNotImplemented }: Props) {
   if (mode === 'users') return <UserDirectory trigger={triggerNotImplemented} />;
   if (mode === 'kanban') return <KanbanBoard />;
   if (mode === 'reports') return <ReportsView trigger={triggerNotImplemented} />;
   return null;
}

function KanbanBoard() {
   const [tasks, setTasks] = useState<Task[]>(initialTasks);
   const [newTaskTitle, setNewTaskTitle] = useState("");
   const [isAdding, setIsAdding] = useState(false);

   const moveTask = (taskId: number, currentStatus: string) => {
      const nextStatus = currentStatus === 'todo' ? 'doing' : currentStatus === 'doing' ? 'done' : 'todo';
      setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: nextStatus as any } : t));
   };

   const addTask = () => {
      if (newTaskTitle.trim()) {
         const newTask: Task = {
            id: Math.max(...tasks.map(t => t.id)) + 1,
            title: newTaskTitle,
            description: "New task added via board",
            assigneeId: 2,
            status: 'todo',
            priority: 'medium'
         };
         setTasks([...tasks, newTask]);
         setNewTaskTitle("");
         setIsAdding(false);
      }
   };

   return (
      <div className="h-full flex flex-col">
         <div className="flex justify-between items-center mb-6">
             <h2 className="text-2xl font-bold text-slate-800">Task Board</h2>
             <button onClick={() => setIsAdding(!isAdding)} className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-indigo-700 transition-colors"><i className="fa-solid fa-plus mr-2"></i> New Task</button>
         </div>
         {isAdding && (
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6 flex gap-3 animate-in fade-in slide-in-from-top-2">
               <input type="text" value={newTaskTitle} onChange={(e) => setNewTaskTitle(e.target.value)} placeholder="Enter task title..." className="flex-1 border border-slate-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
               <button onClick={addTask} className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-green-600">Add</button>
            </div>
         )}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 items-start">
            {['todo', 'doing', 'done'].map(status => (
               <div key={status} className="bg-slate-100 rounded-xl p-4 flex flex-col h-full border border-slate-200">
                  <div className="flex justify-between items-center mb-4 text-xs font-bold uppercase text-slate-500 tracking-wider">
                     <span>{status}</span>
                     <span className="bg-slate-200 px-2 py-0.5 rounded-full text-slate-600">{tasks.filter(t => t.status === status).length}</span>
                  </div>
                  <div className="space-y-3">
                     {tasks.filter(t => t.status === status).map(t => (
                        <div key={t.id} onClick={() => moveTask(t.id, status)} className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 cursor-pointer hover:shadow-md hover:border-indigo-300 transition-all group relative">
                           <div className="flex justify-between items-start mb-2">
                              <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${t.priority === 'high' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>{t.priority}</span>
                              <i className="fa-solid fa-arrow-right text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity"></i>
                           </div>
                           <p className="font-bold text-slate-700 text-sm mb-1">{t.title}</p>
                           <p className="text-xs text-slate-400 mb-3 line-clamp-2">{t.description}</p>
                           <div className="flex items-center gap-2 pt-2 border-t border-slate-50">
                              <div className="w-5 h-5 bg-indigo-100 rounded-full flex items-center justify-center text-[10px] text-indigo-600 font-bold border border-indigo-200">{initialUsers.find(u => u.id === t.assigneeId)?.name[0]}</div>
                              <span className="text-[10px] text-slate-400">Assignee</span>
                           </div>
                        </div>
                     ))}
                     {tasks.filter(t => t.status === status).length === 0 && <div className="text-center py-8 text-slate-400 text-xs italic border-2 border-dashed border-slate-200 rounded-lg">No tasks</div>}
                  </div>
               </div>
            ))}
         </div>
      </div>
   )
}

function UserDirectory({ trigger }: { trigger: () => void }) {
   const [users, setUsers] = useState(initialUsers);
   const [showAdd, setShowAdd] = useState(false);
   const [newUser, setNewUser] = useState({ name: "", email: "", role: "staff" });

   const handleAddUser = () => {
      const u: User = { id: Math.max(...users.map(u => u.id)) + 1, username: newUser.name.toLowerCase().replace(" ", ""), name: newUser.name, email: newUser.email, role: newUser.role as any, rateType: 'daily', rateAmount: 500, status: 'active' };
      setUsers([...users, u]);
      setShowAdd(false);
      setNewUser({ name: "", email: "", role: "staff" });
   };

   return (
      <div>
         <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-slate-800">Employee Directory</h2>
            <button onClick={() => setShowAdd(true)} className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-700 shadow-sm transition-colors"><i className="fa-solid fa-user-plus mr-2"></i> Add Employee</button>
         </div>
         {showAdd && (
            <div className="fixed inset-0 z-50 bg-slate-900/50 flex items-center justify-center p-4">
               <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-sm animate-in zoom-in-95">
                  <h3 className="font-bold text-lg mb-4">New Employee</h3>
                  <div className="space-y-3 mb-6">
                     <input type="text" placeholder="Full Name" className="w-full border p-2 rounded text-sm" value={newUser.name} onChange={e => setNewUser({...newUser, name: e.target.value})} />
                     <input type="email" placeholder="Email Address" className="w-full border p-2 rounded text-sm" value={newUser.email} onChange={e => setNewUser({...newUser, email: e.target.value})} />
                     <select className="w-full border p-2 rounded text-sm" value={newUser.role} onChange={e => setNewUser({...newUser, role: e.target.value})}><option value="staff">Staff</option><option value="admin">Admin</option></select>
                  </div>
                  <div className="flex gap-2">
                     <button onClick={() => setShowAdd(false)} className="flex-1 py-2 text-slate-500 font-bold hover:bg-slate-50 rounded">Cancel</button>
                     <button onClick={handleAddUser} className="flex-1 py-2 bg-indigo-600 text-white font-bold rounded hover:bg-indigo-700">Create</button>
                  </div>
               </div>
            </div>
         )}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map(u => (
               <div key={u.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4 hover:border-indigo-300 transition-colors group">
                  <div className="w-12 h-12 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center text-xl group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors"><i className="fa-solid fa-user"></i></div>
                  <div>
                     <div className="font-bold text-slate-800">{u.name}</div>
                     <div className="text-xs text-slate-500">{u.email}</div>
                     <div className="mt-2 flex gap-2"><span className="text-[10px] bg-slate-100 inline-block px-2 py-0.5 rounded font-bold uppercase text-slate-600">{u.role}</span></div>
                  </div>
                  <button onClick={trigger} className="ml-auto text-slate-300 hover:text-indigo-500"><i className="fa-solid fa-pen"></i></button>
               </div>
            ))}
         </div>
      </div>
   )
}

function ReportsView({ trigger }: { trigger: () => void }) {
   return (
      <div className="max-w-4xl">
         <h2 className="text-2xl font-bold text-slate-800 mb-6">Monthly Analytics</h2>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
               <div className="text-xs font-bold text-slate-400 uppercase mb-2">Total Payroll</div>
               <div className="text-2xl font-bold text-slate-800">₱142,500</div>
               <div className="text-xs text-green-500 font-bold mt-1"><i className="fa-solid fa-arrow-up"></i> 12% vs last month</div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
               <div className="text-xs font-bold text-slate-400 uppercase mb-2">Attendance Rate</div>
               <div className="text-2xl font-bold text-green-600">98.2%</div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
               <div className="text-xs font-bold text-slate-400 uppercase mb-2">Late Arrivals</div>
               <div className="text-2xl font-bold text-red-500">3</div>
            </div>
         </div>
         <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-500 text-2xl mb-4"><i className="fa-solid fa-file-csv"></i></div>
            <h3 className="font-bold text-lg text-slate-800">Export Data</h3>
            <p className="text-sm text-slate-500 mb-6 max-w-sm">Download full breakdown for external auditing.</p>
            <button onClick={trigger} className="bg-slate-800 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-900 shadow-lg transition-transform active:scale-95">Download CSV Report</button>
         </div>
      </div>
   )
}