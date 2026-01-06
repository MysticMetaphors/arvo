import { useState } from "react";
import { initialProducts, initialBranches, initialCustomers, initialTasks, initialUsers } from "@/data/demo/inventoryData";

interface TableProps { isMobile: boolean; }

// --- PRODUCTS TABLE ---
export function ProductTable({ isMobile }: TableProps) {
  const [products, setProducts] = useState(initialProducts);
  const handleDelete = (id: number) => setProducts(products.filter(p => p.id !== id));

  if (isMobile) {
    return (
      <div className="space-y-4">
         {products.map(p => (
           <div key={p.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
              <div className="flex justify-between items-start mb-2">
                 <h4 className="font-bold text-slate-800">{p.name}</h4>
                 <span className={`px-2 py-0.5 text-[10px] uppercase font-bold rounded ${p.stock < 5 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>{p.status}</span>
              </div>
              <p className="text-xs text-slate-500 mb-2">SKU: {p.sku} | ${p.price}</p>
              <div className="flex justify-between items-center text-sm">
                 <span>Stock: <strong>{p.stock}</strong></span>
                 <div className="flex gap-3">
                    <button className="text-indigo-600 font-bold text-xs">Edit</button>
                    <button onClick={() => handleDelete(p.id)} className="text-red-500 font-bold text-xs">Delete</button>
                 </div>
              </div>
           </div>
         ))}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-200 flex justify-between bg-white">
         <h3 className="font-bold text-slate-700">Inventory List</h3>
         <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded text-sm font-bold transition-colors">Add Product</button>
      </div>
      <table className="w-full text-sm text-left">
         <thead className="bg-slate-50 text-xs uppercase text-slate-500 font-bold">
            <tr><th className="px-6 py-4">Name</th><th className="px-6 py-4">Category</th><th className="px-6 py-4">Stock</th><th className="px-6 py-4">Price</th><th className="px-6 py-4">Status</th><th className="px-6 py-4 text-right">Action</th></tr>
         </thead>
         <tbody className="divide-y divide-slate-100">
            {products.map(p => (
               <tr key={p.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-bold text-slate-700">{p.name}<div className="text-[10px] text-slate-400 font-normal">{p.sku}</div></td>
                  <td className="px-6 py-4 text-slate-600">{p.category}</td>
                  <td className="px-6 py-4 font-mono">{p.stock}</td>
                  <td className="px-6 py-4 font-mono">${p.price}</td>
                  <td className="px-6 py-4"><span className={`px-2 py-1 rounded text-[10px] uppercase font-bold ${p.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{p.status}</span></td>
                  <td className="px-6 py-4 text-right"><button onClick={() => handleDelete(p.id)} className="text-slate-400 hover:text-red-600"><i className="fa-solid fa-trash"></i></button></td>
               </tr>
            ))}
         </tbody>
      </table>
    </div>
  );
}

// --- BRANCH TABLE (RESTORED) ---
export function BranchTable({ isMobile }: TableProps) {
  const [branches, setBranches] = useState(initialBranches);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
       {branches.map(b => (
         <div key={b.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative group">
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
               <button onClick={() => setBranches(branches.filter(br => br.id !== b.id))} className="text-slate-300 hover:text-red-500"><i className="fa-solid fa-trash"></i></button>
            </div>
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center text-xl mb-4">
               <i className="fa-solid fa-shop"></i>
            </div>
            <h3 className="font-bold text-lg text-slate-800">{b.name}</h3>
            <p className="text-slate-500 text-sm mb-4"><i className="fa-solid fa-location-dot mr-2"></i>{b.location}</p>
            <div className="pt-4 border-t border-slate-100 text-sm">
               <div className="flex justify-between mb-2">
                  <span className="text-slate-500">Manager:</span>
                  <span className="font-medium">{b.manager}</span>
               </div>
            </div>
         </div>
       ))}
       <button className="border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center text-slate-400 hover:border-indigo-500 hover:text-indigo-500 transition-all min-h-[200px]">
          <i className="fa-solid fa-plus text-3xl mb-2"></i>
          <span className="font-bold">Add Branch</span>
       </button>
    </div>
  )
}

// --- USER TABLE (RESTORED) ---
export function UserTable({ isMobile }: TableProps) {
  const [users, setUsers] = useState(initialUsers);

  if (isMobile) {
      return (
          <div className="space-y-4">
              {users.map(u => (
                  <div key={u.id} className="bg-white p-4 rounded-xl border border-slate-200">
                      <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center"><i className="fa-solid fa-user text-slate-500"></i></div>
                          <div>
                              <div className="font-bold text-slate-800">{u.name}</div>
                              <div className="text-xs text-slate-500 capitalize">{u.role}</div>
                          </div>
                      </div>
                      <button className="w-full mt-2 py-2 bg-slate-100 text-slate-600 text-xs font-bold rounded">Edit Permissions</button>
                  </div>
              ))}
          </div>
      )
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
        <h3 className="font-bold text-slate-700">System Users</h3>
        <button className="bg-white border border-slate-300 text-slate-700 px-3 py-1 rounded text-sm hover:bg-slate-50">Add User</button>
      </div>
      <table className="w-full text-left text-sm">
        <thead className="text-xs uppercase text-slate-500 font-bold border-b border-slate-200">
           <tr><th className="px-6 py-3">User</th><th className="px-6 py-3">Role</th><th className="px-6 py-3 text-right">Actions</th></tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
           {users.map(u => (
             <tr key={u.id}>
               <td className="px-6 py-4 font-bold text-slate-700 flex items-center gap-3">
                 <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center text-slate-500 text-xs"><i className="fa-solid fa-user"></i></div>
                 {u.name} ({u.username})
               </td>
               <td className="px-6 py-4">
                 <span className={`px-2 py-1 rounded text-[10px] uppercase font-bold ${
                    u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                 }`}>
                   {u.role}
                 </span>
               </td>
               <td className="px-6 py-4 text-right">
                 <button className="text-slate-400 hover:text-indigo-600 text-xs font-bold underline">Edit Permissions</button>
               </td>
             </tr>
           ))}
        </tbody>
      </table>
    </div>
  )
}

// --- CRM & KANBAN (RETAINED) ---
export function CustomerTable({ isMobile }: TableProps) {
   const [customers] = useState(initialCustomers);
   return (
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
         <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 font-bold text-slate-700">Loyalty Database</div>
         {isMobile ? (
             <div className="p-4 space-y-4">
                {customers.map(c => (
                   <div key={c.id} className="border p-3 rounded-lg">
                      <div className="font-bold">{c.name}</div>
                      <div className="text-xs text-slate-500">{c.email}</div>
                      <div className="mt-2 text-xs font-bold text-indigo-600 uppercase">{c.tier} Member</div>
                   </div>
                ))}
             </div>
         ) : (
            <table className="w-full text-sm text-left">
               <thead className="bg-white border-b text-xs uppercase text-slate-500"><tr><th className="px-6 py-3">Customer</th><th className="px-6 py-3">Total Spend</th><th className="px-6 py-3">Tier</th></tr></thead>
               <tbody>
                  {customers.map(c => (
                     <tr key={c.id} className="border-b hover:bg-slate-50">
                        <td className="px-6 py-4 font-medium">{c.name}<br/><span className="text-xs text-slate-400 font-normal">{c.email}</span></td>
                        <td className="px-6 py-4 font-mono">${c.spent}</td>
                        <td className="px-6 py-4"><span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-[10px] font-bold uppercase">{c.tier}</span></td>
                     </tr>
                  ))}
               </tbody>
            </table>
         )}
      </div>
   )
}

export function KanbanBoard({ isMobile }: TableProps) {
  const [tasks] = useState(initialTasks);
  const cols = ['todo', 'progress', 'done'];

  return (
    <div className={`grid gap-4 h-full ${isMobile ? 'grid-cols-1' : 'grid-cols-3'}`}>
       {cols.map(col => (
         <div key={col} className="bg-slate-100 rounded-xl p-4 flex flex-col">
            <div className="flex justify-between items-center mb-4">
               <h4 className="font-bold text-slate-600 uppercase text-xs">{col.replace('todo', 'To Do')}</h4>
               <span className="bg-slate-200 px-2 rounded-full text-xs font-bold text-slate-500">{tasks.filter(t => t.status === col).length}</span>
            </div>
            <div className="space-y-3 flex-1">
               {tasks.filter(t => t.status === col).map(t => (
                  <div key={t.id} className="bg-white p-3 rounded-lg shadow-sm border border-slate-200 cursor-move hover:shadow-md transition-shadow">
                     <p className="text-sm font-bold text-slate-700 mb-2">{t.title}</p>
                     <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                           <div className="w-5 h-5 bg-indigo-100 rounded-full flex items-center justify-center text-[10px] text-indigo-700 font-bold">{t.assignee[0]}</div>
                           <span className="text-xs text-slate-400">{t.assignee}</span>
                        </div>
                     </div>
                  </div>
               ))}
               <button className="w-full py-2 border-2 border-dashed border-slate-300 rounded-lg text-slate-400 text-xs font-bold hover:bg-slate-200">+ Add Task</button>
            </div>
         </div>
       ))}
    </div>
  )
}