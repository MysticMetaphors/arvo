import { useState, useEffect, useMemo } from "react";
import { initialEmployees, initialLogs, initialCampaigns, initialProducts, Employee, Campaign, Log, Product, clockTime } from "@/data/demo/inventoryData";
import { usePersistedState } from "./usePersistedState";
import { EyeIcon, EyeSlashIcon, ClipboardDocumentIcon, CheckIcon } from "@heroicons/react/24/outline";

interface FeatureProps { isMobile?: boolean; }

// --- HELPERS ---
function useToast() {
   const [msg, setMsg] = useState("");
   const show = (message: string) => {
      setMsg(message);
      setTimeout(() => setMsg(""), 3000);
   }
   return { msg, show };
}

function downloadCsv(filename: string, rows: (string | number)[][]) {
   const csv = rows.map(r => r.map(cell => {
      const s = String(cell ?? "");
      return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
   }).join(",")).join("\n");
   const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
   const url = URL.createObjectURL(blob);
   const a = document.createElement("a");
   a.href = url;
   a.download = filename;
   document.body.appendChild(a);
   a.click();
   document.body.removeChild(a);
   URL.revokeObjectURL(url);
}

function maskToken(token: string, visibleSuffix = 7): string {
   if (token.length <= visibleSuffix) return token;
   const tail = token.slice(-visibleSuffix);
   const head = token.slice(0, 8); // "sk_live_"
   const middleLen = Math.max(token.length - 8 - visibleSuffix, 4);
   return head + "•".repeat(middleLen) + tail;
}

// --- REPORT GENERATOR ---
export function ReportGenerator() {
  const [loading, setLoading] = useState(false);
  const [reportType, setReportType] = useState("Sales Summary");
  const [format, setFormat] = useState<"PDF" | "CSV">("CSV");
  const { msg, show } = useToast();

  const handleDownload = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (format === "CSV") {
        const filename = `${reportType.toLowerCase().replace(/ /g, "-")}-${new Date().toISOString().slice(0, 10)}.csv`;
        const rows: (string | number)[][] = [
          ["Report", reportType],
          ["Generated", new Date().toLocaleString()],
          [],
          ["SKU", "Product", "Stock", "Unit Price", "Status"],
          ...initialProducts.map(p => [p.sku, p.name, p.stock, p.price, p.status]),
        ];
        downloadCsv(filename, rows);
      }
      show(`${reportType} ${format} ready.`);
    }, 1100);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl border border-slate-200 shadow-sm relative">
      {msg && <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-emerald-600 text-white px-6 py-2 rounded-full shadow-lg z-50 text-sm font-medium animate-in fade-in slide-in-from-top-4">{msg}</div>}
      <div className="text-center mb-8">
        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-500">
          <i className="fa-solid fa-file-invoice"></i>
        </div>
        <h3 className="text-base font-semibold text-slate-900">Generate Report</h3>
        <p className="text-sm text-slate-500 mt-1">Select parameters to export system data.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">Report Type</label>
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="w-full p-3 border border-slate-200 rounded-lg bg-slate-50 outline-none focus:ring-2 focus:ring-slate-300 text-sm"
          >
            <option>Sales Summary</option>
            <option>Inventory Valuation</option>
            <option>User Audit Log</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">Format</label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setFormat("PDF")}
              className={`flex-1 py-3 border rounded-lg text-sm font-medium transition-colors duration-150 ${format === "PDF" ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"}`}
            >PDF</button>
            <button
              type="button"
              onClick={() => setFormat("CSV")}
              className={`flex-1 py-3 border rounded-lg text-sm font-medium transition-colors duration-150 ${format === "CSV" ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"}`}
            >CSV</button>
          </div>
        </div>
      </div>

      <button 
        onClick={handleDownload}
        disabled={loading}
        className="w-full py-4 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-wait"
      >
        {loading ? <i className="fa-solid fa-circle-notch animate-spin"></i> : <i className="fa-solid fa-download"></i>}
        {loading ? "Generating..." : "Download Report"}
      </button>
    </div>
  );
}

// --- POS SYSTEM ---
export function PosSystem({ isMobile }: FeatureProps) {
  const [cart, setCart] = useState<{product: Product, uniqueId: number}[]>([]);
  const [loading, setLoading] = useState(false);
  const { msg, show } = useToast();

  const addToCart = (p: Product) => {
    setCart([...cart, { product: p, uniqueId: Math.random() }]);
  };

  const removeFromCart = (uniqueId: number) => {
     setCart(cart.filter(item => item.uniqueId !== uniqueId));
  };

  const handleCheckout = () => {
     if(cart.length === 0) return;
     setLoading(true);
     setTimeout(() => {
        setLoading(false);
        setCart([]);
        show("Order Processed Successfully!");
     }, 1500);
  };

  const total = cart.reduce((a, b) => a + b.product.price, 0);

  return (
    <div className={`flex h-[calc(100vh-140px)] gap-6 ${isMobile ? 'flex-col' : 'flex-row'} relative`}>
       {msg && <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-2 rounded-full shadow-lg z-50 text-sm font-bold animate-in fade-in slide-in-from-top-4">{msg}</div>}
       
       {/* Product Grid */}
       <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
             {initialProducts.map(p => (
                <div key={p.id} onClick={() => addToCart(p)} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 cursor-pointer hover:border-indigo-500 hover:shadow-md transition-all group">
                   <div className="aspect-square bg-slate-100 rounded-lg mb-2 flex items-center justify-center text-slate-300 group-hover:bg-indigo-50 group-hover:text-indigo-300 transition-colors"><i className="fa-solid fa-image text-2xl"></i></div>
                   <h4 className="font-bold text-sm text-slate-800 line-clamp-1">{p.name}</h4>
                   <p className="text-indigo-600 font-bold text-sm">${p.price}</p>
                </div>
             ))}
          </div>
       </div>
       
       {/* Live Cart Sidebar */}
       <div className={`${isMobile ? 'h-64' : 'w-80'} bg-white rounded-xl shadow-lg border border-slate-200 flex flex-col shrink-0`}>
          <div className="p-4 border-b border-slate-100 font-bold text-slate-800 flex justify-between items-center">
             <span>Current Order</span>
             <span className="bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded-full">{cart.length} items</span>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
             {cart.length === 0 && (
               <div className="h-full flex flex-col items-center justify-center text-slate-300">
                  <i className="fa-solid fa-basket-shopping text-3xl mb-2"></i>
                  <p className="text-sm">Cart Empty</p>
               </div>
             )}
             {cart.map((item) => (
                <div key={item.uniqueId} className="flex justify-between items-center text-sm p-2 hover:bg-slate-50 rounded group">
                   <div className="flex-1 truncate pr-2">{item.product.name}</div>
                   <div className="font-mono text-slate-600 mr-3">${item.product.price}</div>
                   <button onClick={() => removeFromCart(item.uniqueId)} className="text-slate-300 hover:text-red-500"><i className="fa-solid fa-xmark"></i></button>
                </div>
             ))}
          </div>
          <div className="p-4 bg-slate-50 border-t border-slate-200">
             <div className="flex justify-between font-bold text-lg mb-4 text-slate-800">
                <span>Total</span> 
                <span>${total.toFixed(2)}</span>
             </div>
             <button 
                onClick={handleCheckout} 
                disabled={loading || cart.length === 0}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
             >
                {loading ? <i className="fa-solid fa-spinner animate-spin"></i> : "Checkout"}
             </button>
          </div>
       </div>
    </div>
  )
}

// --- PAYROLL SYSTEM ---
export function PayrollSystem({ isMobile }: FeatureProps) {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [loading, setLoading] = useState(false);
  const { msg, show } = useToast();

  const toggleStatus = (id: number) => {
    setEmployees(prev => prev.map(e => e.id === id ? { ...e, status: e.status === 'paid' ? 'pending' : 'paid' } : e));
  };

  const handleAddEmployee = () => {
     const newId = Math.max(...employees.map(e => e.id)) + 1;
     setEmployees([...employees, { id: newId, name: "New Hire", position: "Trainee", salary: 2500, status: 'pending' }]);
  };

  const handleRunBatch = () => {
    setLoading(true);
    setTimeout(() => {
       setEmployees(prev => prev.map(e => ({ ...e, status: 'paid' })));
       setLoading(false);
       show("Batch Payment Processed!");
    }, 2000);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden relative">
       {msg && <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-2 rounded-full shadow-lg z-50 text-sm font-bold animate-in fade-in slide-in-from-top-4">{msg}</div>}
       
       <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 bg-white">
          <h2 className="text-xl font-bold text-slate-800">Payroll Processing</h2>
          <div className="flex gap-2 w-full md:w-auto">
             <button onClick={handleAddEmployee} className="flex-1 md:flex-none px-4 py-2 border border-slate-300 text-slate-600 rounded-lg text-sm font-bold hover:bg-slate-50">
               + Add Employee
             </button>
             <button 
               onClick={handleRunBatch}
               disabled={loading}
               className="flex-1 md:flex-none bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-green-700 disabled:opacity-70 transition-all flex items-center justify-center gap-2"
             >
               {loading && <i className="fa-solid fa-circle-notch animate-spin"></i>}
               Run Batch Payment
             </button>
          </div>
       </div>
       <div className="divide-y divide-slate-100">
          {employees.map(emp => (
             <div key={emp.id} className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold">{emp.name[0]}</div>
                   <div>
                      <div className="font-bold text-sm text-slate-800">{emp.name}</div>
                      <div className="text-xs text-slate-500">{emp.position}</div>
                   </div>
                </div>
                <div className="text-right flex items-center gap-4">
                   <div className="hidden md:block">
                      <div className="font-mono font-bold text-slate-700">${emp.salary.toLocaleString()}</div>
                   </div>
                   <button 
                     onClick={() => toggleStatus(emp.id)}
                     className={`w-24 py-1 rounded text-[10px] uppercase font-bold transition-all ${emp.status === 'paid' ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-orange-100 text-orange-600 hover:bg-orange-200'}`}
                   >
                     {emp.status}
                   </button>
                </div>
             </div>
          ))}
       </div>
    </div>
  )
}

// --- CAMPAIGN MANAGER ---
export function CampaignManager({ isMobile }: FeatureProps) {
   const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);
   const [subject, setSubject] = useState("");
   const { msg, show } = useToast();

   const handleDelete = (id: number) => {
      setCampaigns(campaigns.filter(c => c.id !== id));
   };

   const handleSend = () => {
      if(!subject) return;
      const newId = Math.max(...campaigns.map(c => c.id)) + 1;
      setCampaigns([{ id: newId, name: subject, status: 'sent', openRate: 0, recipients: 0 }, ...campaigns]);
      setSubject("");
      show("Campaign Sent Successfully!");
   };

   return (
     <div className="space-y-6 relative">
        {msg && <div className="absolute top-0 right-0 bg-green-600 text-white px-6 py-2 rounded-lg shadow-lg z-50 text-sm font-bold animate-in fade-in slide-in-from-right-4">{msg}</div>}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {/* Email Builder */}
           <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-fit">
              <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
                 <i className="fa-solid fa-pen-nib text-indigo-500"></i> Create Campaign
              </h3>
              <div className="space-y-3">
                 <input 
                    type="text" 
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Subject Line" 
                    className="w-full p-3 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none" 
                 />
                 <textarea placeholder="Email Body HTML..." className="w-full p-3 border border-slate-200 rounded-lg text-sm h-32 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"></textarea>
                 <button 
                    onClick={handleSend}
                    disabled={!subject}
                    className="w-full bg-slate-800 hover:bg-slate-900 text-white py-3 rounded-lg font-bold text-sm transition-all disabled:opacity-50"
                 >
                    Send to All Customers
                 </button>
              </div>
           </div>

           {/* Analytics List */}
           <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
                 <i className="fa-solid fa-chart-simple text-emerald-500"></i> Performance
              </h3>
              <div className="space-y-4">
                 {campaigns.length === 0 && <p className="text-slate-400 text-sm text-center py-4">No active campaigns</p>}
                 {campaigns.map(c => (
                    <div key={c.id} className="group border-b border-slate-50 pb-4 last:border-0 last:pb-0">
                       <div className="flex justify-between text-sm mb-1">
                          <span className="font-bold text-slate-700">{c.name}</span> 
                          <button onClick={() => handleDelete(c.id)} className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><i className="fa-solid fa-trash"></i></button>
                       </div>
                       <div className="flex justify-between text-xs text-slate-500 mb-1">
                          <span className="uppercase font-bold text-[10px] bg-slate-100 px-1 rounded">{c.status}</span>
                          <span>{c.openRate}% Open Rate</span>
                       </div>
                       <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div style={{width: `${c.openRate}%`}} className="h-full bg-emerald-500 transition-all duration-1000"></div>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>
     </div>
   )
}

// --- SECURITY HUB ---
export function SecurityHub({ isMobile }: FeatureProps) {
   const [key, setKey] = usePersistedState<string>("apiToken", "sk_live_83kjsd923ksj293skj293");
   const [logs, setLogs] = usePersistedState<Log[]>("auditLogs", initialLogs);

   const [revealed, setRevealed] = useState(false);
   const [copied, setCopied] = useState(false);
   const [confirmingClear, setConfirmingClear] = useState(false);
   const { msg, show } = useToast();

   const now = useMemo(() => new Date(), []);

   useEffect(() => {
      if (!revealed) return;
      const t = setTimeout(() => setRevealed(false), 10_000);
      return () => clearTimeout(t);
   }, [revealed]);

   useEffect(() => {
      if (!confirmingClear) return;
      const t = setTimeout(() => setConfirmingClear(false), 3000);
      return () => clearTimeout(t);
   }, [confirmingClear]);

   const rollKey = () => {
      const fresh = "sk_live_" +
         Math.random().toString(36).slice(2) +
         Math.random().toString(36).slice(2);
      setKey(fresh);
      setRevealed(true);
      show("New API token generated. Visible for 10 seconds.");
   };

   const copyKey = async () => {
      try {
         await navigator.clipboard.writeText(key);
         setCopied(true);
         setTimeout(() => setCopied(false), 1500);
      } catch {
         show("Copy unavailable in this browser.");
      }
   };

   const clearLogs = () => {
      if (!confirmingClear) {
         setConfirmingClear(true);
         return;
      }
      setLogs([]);
      setConfirmingClear(false);
      show("Audit log cleared.");
   };

   return (
      <div className="space-y-6 relative">
         {msg && <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 bg-emerald-600 text-white px-6 py-2 rounded-full shadow-lg z-50 text-sm font-medium animate-in fade-in slide-in-from-top-4">{msg}</div>}

         {/* Key Manager */}
         <div className="bg-slate-900 text-white p-6 rounded-xl shadow-sm">
            <h3 className="text-base font-semibold mb-1">API Access Token</h3>
            <p className="text-slate-400 text-xs mb-4">Use this secret to authenticate external requests to the inventory API.</p>
            <div className="flex gap-2 items-center">
               <code className="bg-black/40 border border-white/10 px-3 py-2.5 rounded-lg text-emerald-400 font-mono text-xs flex-1 truncate select-all">
                  {revealed ? key : maskToken(key)}
               </code>
               <button
                  onClick={() => setRevealed(v => !v)}
                  aria-label={revealed ? "Hide token" : "Reveal token"}
                  className="h-10 w-10 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors duration-150 border border-white/10"
               >
                  {revealed ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
               </button>
               <button
                  onClick={copyKey}
                  aria-label="Copy token"
                  className="h-10 w-10 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors duration-150 border border-white/10"
               >
                  {copied ? <CheckIcon className="h-5 w-5 text-emerald-400" /> : <ClipboardDocumentIcon className="h-5 w-5" />}
               </button>
               <button
                  onClick={rollKey}
                  className="h-10 px-4 rounded-lg bg-white text-slate-900 hover:bg-slate-100 font-medium text-xs transition-colors duration-150"
               >Roll Key</button>
            </div>
            {revealed && (
               <p className="text-amber-400 text-[11px] mt-3">Visible for a limited time. Auto-hide in 10s.</p>
            )}
         </div>

         {/* Log Viewer */}
         <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
               <h3 className="text-base font-semibold text-slate-900">System Audit Log</h3>
               <button
                  onClick={clearLogs}
                  className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors duration-150 ${confirmingClear ? "border-red-600 bg-red-600 text-white" : "border-slate-200 text-slate-500 hover:text-red-600 hover:border-red-200"}`}
               >
                  {confirmingClear ? "Confirm clear?" : "Clear Logs"}
               </button>
            </div>
            <div className="max-h-80 overflow-y-auto">
               {logs.length === 0 && <p className="text-center text-slate-400 text-sm py-8">Log is empty.</p>}
               {logs.map(log => (
                  <div key={log.id} className="px-6 py-3 border-b border-slate-100 last:border-0 text-sm flex justify-between items-center hover:bg-slate-50">
                     <div className="flex items-center gap-3 min-w-0">
                        <div className={`w-2 h-2 rounded-full shrink-0 ${
                           log.category === "security" ? "bg-red-500" :
                           log.category === "error"    ? "bg-amber-500" :
                           log.category === "inventory"? "bg-emerald-500" :
                                                         "bg-slate-400"
                        }`}></div>
                        <span className="text-slate-700 font-medium truncate">{log.action}</span>
                     </div>
                     <div className="text-right shrink-0 ml-4">
                        <div className="text-slate-500 text-xs tabular-nums">{clockTime(log.minutesAgo, now)}</div>
                        <div className="text-[11px] text-slate-400">{log.user}</div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   )
}

// --- BRANDING SETTINGS ---
export function BrandingSettings() {
   const [saving, setSaving] = useState(false);
   const [saved, setSaved] = useState(false);

   const handleSave = () => {
      setSaving(true);
      setTimeout(() => {
         setSaving(false);
         setSaved(true);
         setTimeout(() => setSaved(false), 2000);
      }, 1000);
   };

   return (
      <div className="max-w-xl mx-auto bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
         <h2 className="text-xl font-bold mb-6 text-slate-800">Theme & Branding</h2>
         
         <div className="grid grid-cols-2 gap-6 mb-8">
            <div>
               <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Primary Color</label>
               <div className="flex gap-2">
                  <input type="color" className="w-10 h-10 rounded cursor-pointer border-none bg-transparent" defaultValue="#4f46e5" />
                  <div className="flex-1 py-2 px-3 bg-slate-100 rounded text-xs font-mono text-slate-600">#4f46e5</div>
               </div>
            </div>
            <div>
               <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Accent Color</label>
               <div className="flex gap-2">
                  <input type="color" className="w-10 h-10 rounded cursor-pointer border-none bg-transparent" defaultValue="#10b981" />
                  <div className="flex-1 py-2 px-3 bg-slate-100 rounded text-xs font-mono text-slate-600">#10b981</div>
               </div>
            </div>
         </div>

         <div className="mb-8">
            <label className="text-xs font-bold text-slate-500 mb-2 block uppercase">Company Logo</label>
            <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center text-slate-400 text-sm hover:border-indigo-500 hover:text-indigo-500 hover:bg-indigo-50 transition-all cursor-pointer group">
               <i className="fa-solid fa-cloud-arrow-up text-3xl mb-3 block group-hover:scale-110 transition-transform"></i>
               <span className="font-bold">Click to upload</span> or drag and drop<br/>
               <span className="text-xs font-normal opacity-70">SVG, PNG, JPG (max 2MB)</span>
            </div>
         </div>

         <button 
            onClick={handleSave}
            disabled={saving}
            className={`w-full py-3 rounded-lg font-bold text-white transition-all flex items-center justify-center gap-2 ${saved ? 'bg-green-600' : 'bg-slate-800 hover:bg-slate-900'}`}
         >
            {saving ? <i className="fa-solid fa-circle-notch animate-spin"></i> : saved ? <i className="fa-solid fa-check"></i> : null}
            {saving ? "Saving..." : saved ? "Changes Saved" : "Save Settings"}
         </button>
      </div>
   )
}

// --- GENERIC CUSTOM PAGE ---
export function CustomGenericPage({ title }: { title: string }) {
   return (
      <div className="p-8 text-center">
         <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300 text-4xl shadow-inner">
             <i className="fa-solid fa-file-dashed"></i>
         </div>
         <h2 className="text-2xl font-bold text-slate-700 mb-2">{title}</h2>
         <p className="text-slate-500 mb-8 max-w-md mx-auto">
             This is a demonstration of a custom module. We can build specific workflows tailored to your unique business requirements here.
         </p>
         
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
             {[1,2,3].map(i => (
                 <div key={i} className="h-40 bg-white border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center text-slate-400 hover:border-indigo-300 hover:bg-indigo-50 transition-colors">
                     Module Widget {i}
                 </div>
             ))}
         </div>
      </div>
   )
}