import { useState, useMemo } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import { initialProducts, initialBranches, initialCustomers, initialEmployees, initialTasks, initialUsers, Product, Branch, User, Customer, Task } from "@/data/demo/inventoryData";
import { usePersistedState } from "./usePersistedState";
import { SlideOver } from "./SlideOver";
import { ProductDetail } from "./ProductDetail";
import {
  TrashIcon,
  PencilSquareIcon,
  PlusIcon,
  BuildingStorefrontIcon,
  MapPinIcon,
  UserIcon,
  XMarkIcon,
  CheckCircleIcon,
  ArrowDownTrayIcon,
  ArrowsUpDownIcon,
  TagIcon,
  ArchiveBoxXMarkIcon,
} from "@heroicons/react/24/outline";

interface TableProps { isMobile: boolean; }

const PRODUCT_CATEGORIES = ["Computing", "Peripherals", "Furniture", "Accessories"];
const SKU_PREFIX: Record<string, string> = {
  Computing: "CMP",
  Peripherals: "PER",
  Furniture: "FRN",
  Accessories: "ACC",
};

type ProductDraft = Omit<Product, "id"> & { id?: number };

function emptyProduct(): ProductDraft {
  return {
    sku: "",
    name: "",
    category: "Computing",
    stock: 0,
    price: 0,
    status: "active",
    reorderPoint: 10,
  };
}

// --- PRODUCTS TABLE ---
function downloadProductsCsv(rows: Product[], filename: string) {
  const header = ["SKU","Name","Category","Stock","Reorder Point","Unit Price","Status"];
  const data: (string | number)[][] = [
    header,
    ...rows.map(p => [p.sku, p.name, p.category, p.stock, p.reorderPoint ?? "", p.price, p.status]),
  ];
  const csv = data.map(r => r.map(cell => {
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

export function ProductTable({ isMobile }: TableProps) {
  const [products, setProducts] = usePersistedState<Product[]>("products", initialProducts);
  const [editing, setEditing] = useState<ProductDraft | null>(null);
  const [detail, setDetail] = useState<Product | null>(null);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [bulkPriceOpen, setBulkPriceOpen] = useState(false);
  const [bulkCategoryOpen, setBulkCategoryOpen] = useState(false);

  const allSelected = products.length > 0 && selected.size === products.length;
  const someSelected = selected.size > 0 && !allSelected;
  const selectedProducts = useMemo(() => products.filter(p => selected.has(p.id)), [products, selected]);

  const toggleAll = () => {
    setSelected(allSelected ? new Set() : new Set(products.map(p => p.id)));
  };

  const toggle = (id: number) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id); else next.add(id);
    setSelected(next);
  };

  const clearSelection = () => setSelected(new Set());

  const handleDelete = (id: number) => setProducts(products.filter(p => p.id !== id));

  const bulkDelete = () => {
    setProducts(products.filter(p => !selected.has(p.id)));
    clearSelection();
  };

  const bulkMarkInactive = () => {
    setProducts(products.map(p => selected.has(p.id) ? { ...p, status: "out" } : p));
    clearSelection();
  };

  const bulkAdjustPrice = (pct: number) => {
    const factor = 1 + pct / 100;
    setProducts(products.map(p => selected.has(p.id) ? { ...p, price: Math.round(p.price * factor * 100) / 100 } : p));
    setBulkPriceOpen(false);
    clearSelection();
  };

  const bulkChangeCategory = (cat: string) => {
    setProducts(products.map(p => selected.has(p.id) ? { ...p, category: cat } : p));
    setBulkCategoryOpen(false);
    clearSelection();
  };

  const bulkExport = () => {
    downloadProductsCsv(selectedProducts, `inventory-export-${new Date().toISOString().slice(0,10)}.csv`);
  };

  const openNew = () => setEditing(emptyProduct());
  const openEdit = (p: Product) => setEditing({ ...p });

  const save = (draft: ProductDraft) => {
    if (draft.id != null) {
      setProducts(products.map(p => (p.id === draft.id ? { ...p, ...draft } as Product : p)));
    } else {
      const nextId = (products.length ? Math.max(...products.map(p => p.id)) : 0) + 1;
      const sku = draft.sku || `${SKU_PREFIX[draft.category] ?? "SKU"}-${String(nextId).padStart(4, "0")}`;
      setProducts([{ ...draft, id: nextId, sku } as Product, ...products]);
    }
    setEditing(null);
  };

  return (
    <>
      {isMobile ? (
        <div className="space-y-4">
          <button
            onClick={openNew}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-900 text-white text-sm font-medium shadow-sm"
          >
            <PlusIcon className="h-4 w-4" /> Add Product
          </button>
          {products.map(p => (
            <div key={p.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <button
                  onClick={() => setDetail(p)}
                  className="text-left font-medium text-slate-900 hover:text-slate-700 transition-colors duration-150"
                >{p.name}</button>
                <span className={`px-2 py-0.5 text-[11px] font-medium rounded-full ${p.stock < 5 ? "bg-red-50 text-red-700" : p.stock < (p.reorderPoint ?? 0) ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700"}`}>
                  {p.status}
                </span>
              </div>
              <p className="text-xs text-slate-500 mb-3 tabular-nums">SKU {p.sku} · ${p.price.toLocaleString()}</p>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600">Stock: <span className="font-medium text-slate-900 tabular-nums">{p.stock}</span></span>
                <div className="flex gap-3">
                  <button onClick={() => openEdit(p)} className="text-slate-700 font-medium text-xs hover:text-slate-900">Edit</button>
                  <button onClick={() => handleDelete(p.id)} className="text-red-600 font-medium text-xs hover:text-red-700">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
            <h3 className="text-base font-semibold text-slate-900">Inventory <span className="text-slate-400 font-normal">· {products.length} items</span></h3>
            <button
              onClick={openNew}
              data-demo-target="inventory.add-product"
              className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-150"
            >
              <PlusIcon className="h-4 w-4" /> Add Product
            </button>
          </div>
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500 font-medium tracking-wide">
              <tr>
                <th className="pl-6 pr-2 py-3 w-10">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    ref={el => { if (el) el.indeterminate = someSelected; }}
                    onChange={toggleAll}
                    className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-300 cursor-pointer"
                  />
                </th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Stock</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.map(p => (
                <tr
                  key={p.id}
                  className={`transition-colors duration-150 ${selected.has(p.id) ? "bg-slate-50" : "hover:bg-slate-50"}`}
                >
                  <td className="pl-6 pr-2 py-3.5 w-10">
                    <input
                      type="checkbox"
                      checked={selected.has(p.id)}
                      onChange={() => toggle(p.id)}
                      className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-300 cursor-pointer"
                    />
                  </td>
                  <td className="px-6 py-3.5">
                    <button
                      onClick={() => setDetail(p)}
                      data-demo-target={`inventory.row-${p.id}`}
                      className="text-left font-medium text-slate-900 hover:text-slate-700 transition-colors duration-150"
                    >
                      {p.name}
                    </button>
                    <div className="text-[11px] text-slate-400 font-normal">{p.sku}</div>
                  </td>
                  <td className="px-6 py-3.5 text-slate-600">{p.category}</td>
                  <td className="px-6 py-3.5 tabular-nums">{p.stock}</td>
                  <td className="px-6 py-3.5 tabular-nums">${p.price.toLocaleString()}</td>
                  <td className="px-6 py-3.5">
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${
                      p.status === "active" ? "bg-emerald-50 text-emerald-700" :
                      p.status === "low"    ? "bg-amber-50 text-amber-700" :
                                              "bg-red-50 text-red-700"
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-6 py-3.5 text-right">
                    <div className="inline-flex gap-1">
                      <button
                        onClick={() => openEdit(p)}
                        aria-label="Edit"
                        className="h-8 w-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors duration-150"
                      ><PencilSquareIcon className="h-4 w-4" /></button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        aria-label="Delete"
                        className="h-8 w-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors duration-150"
                      ><TrashIcon className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <AnimatePresence>
        {selected.size > 0 && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: "tween", duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
            className="fixed left-1/2 -translate-x-1/2 bottom-6 z-40 bg-slate-900 text-white rounded-2xl shadow-xl px-4 py-2.5 flex items-center gap-2"
          >
            <span className="text-sm font-medium tabular-nums pr-2 border-r border-white/20">{selected.size} selected</span>
            <BulkBtn onClick={() => setBulkPriceOpen(true)} icon={<ArrowsUpDownIcon className="h-4 w-4" />}>Bulk price</BulkBtn>
            <BulkBtn onClick={() => setBulkCategoryOpen(true)} icon={<TagIcon className="h-4 w-4" />}>Category</BulkBtn>
            <BulkBtn onClick={bulkMarkInactive} icon={<ArchiveBoxXMarkIcon className="h-4 w-4" />}>Mark out</BulkBtn>
            <BulkBtn onClick={bulkExport} icon={<ArrowDownTrayIcon className="h-4 w-4" />} data-demo-target="inventory.bulk-export">Export CSV</BulkBtn>
            <BulkBtn onClick={bulkDelete} icon={<TrashIcon className="h-4 w-4" />} danger>Delete</BulkBtn>
            <button
              onClick={clearSelection}
              aria-label="Clear selection"
              className="ml-1 h-7 w-7 flex items-center justify-center rounded-md hover:bg-white/10 transition-colors duration-150"
            ><XMarkIcon className="h-4 w-4" /></button>
          </motion.div>
        )}
      </AnimatePresence>

      {bulkPriceOpen && (
        <BulkPriceDialog
          isMobile={isMobile}
          sample={selectedProducts[0]}
          count={selected.size}
          onCancel={() => setBulkPriceOpen(false)}
          onApply={bulkAdjustPrice}
        />
      )}
      {bulkCategoryOpen && (
        <BulkCategoryDialog
          isMobile={isMobile}
          count={selected.size}
          onCancel={() => setBulkCategoryOpen(false)}
          onApply={bulkChangeCategory}
        />
      )}

      {editing && (
        <ProductForm
          isMobile={isMobile}
          draft={editing}
          onClose={() => setEditing(null)}
          onSave={save}
        />
      )}

      <ProductDetail product={detail} onClose={() => setDetail(null)} isMobile={isMobile} />
    </>
  );
}

function BulkBtn({ children, onClick, icon, danger, ...rest }: { children: React.ReactNode; onClick: () => void; icon: React.ReactNode; danger?: boolean; [k: string]: unknown }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors duration-150 ${
        danger ? "text-red-300 hover:bg-red-500/15 hover:text-red-200" : "text-slate-200 hover:bg-white/10"
      }`}
      {...rest}
    >
      {icon}
      {children}
    </button>
  );
}

function BulkPriceDialog({ count, sample, onCancel, onApply, isMobile }: { count: number; sample?: Product; onCancel: () => void; onApply: (pct: number) => void; isMobile: boolean }) {
  const [pct, setPct] = useState(10);
  const previewOld = sample?.price ?? 0;
  const previewNew = previewOld ? Math.round(previewOld * (1 + pct / 100) * 100) / 100 : 0;

  return (
    <SlideOver
      open
      onClose={onCancel}
      isMobile={isMobile}
      title="Bulk price adjustment"
      description={`Apply a percentage change to ${count} products`}
      footer={
        <div className="flex justify-end gap-2">
          <button onClick={onCancel} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors duration-150">Cancel</button>
          <button
            onClick={() => onApply(pct)}
            className="px-4 py-2 text-sm font-medium bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors duration-150"
          >Apply {pct >= 0 ? "+" : ""}{pct}%</button>
        </div>
      }
    >
      <div className="space-y-4">
        <div className="flex gap-2">
          {[-15, -10, -5, 0, 5, 10, 15].map(v => (
            <button
              key={v}
              onClick={() => setPct(v)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
                pct === v ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >{v >= 0 ? "+" : ""}{v}%</button>
          ))}
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-700">Custom %</label>
          <input
            type="number"
            value={pct}
            onChange={(e) => setPct(Number(e.target.value))}
            step="0.5"
            className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm tabular-nums focus:ring-2 focus:ring-slate-300 outline-none transition-shadow duration-150"
          />
        </div>
        {sample && (
          <div className="bg-slate-50 rounded-lg p-4">
            <div className="text-xs font-medium uppercase tracking-wide text-slate-500 mb-2">Preview · {sample.name}</div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">Old</span>
              <span className="text-slate-700 tabular-nums">${previewOld.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">New</span>
              <span className={`font-semibold tabular-nums ${pct > 0 ? "text-emerald-700" : pct < 0 ? "text-red-700" : "text-slate-900"}`}>${previewNew.toLocaleString()}</span>
            </div>
          </div>
        )}
      </div>
    </SlideOver>
  );
}

function BulkCategoryDialog({ count, onCancel, onApply, isMobile }: { count: number; onCancel: () => void; onApply: (c: string) => void; isMobile: boolean }) {
  const [cat, setCat] = useState(PRODUCT_CATEGORIES[0]);
  return (
    <SlideOver
      open
      onClose={onCancel}
      isMobile={isMobile}
      title="Change category"
      description={`Apply to ${count} products`}
      footer={
        <div className="flex justify-end gap-2">
          <button onClick={onCancel} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors duration-150">Cancel</button>
          <button
            onClick={() => onApply(cat)}
            className="px-4 py-2 text-sm font-medium bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors duration-150"
          >Apply</button>
        </div>
      }
    >
      <div className="space-y-2">
        {PRODUCT_CATEGORIES.map(c => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`w-full text-left px-4 py-3 rounded-lg border transition-colors duration-150 ${
              cat === c ? "border-slate-900 bg-slate-50" : "border-slate-200 hover:bg-slate-50"
            }`}
          >
            <div className="text-sm font-medium text-slate-900">{c}</div>
          </button>
        ))}
      </div>
    </SlideOver>
  );
}

function ProductForm({
  draft,
  onClose,
  onSave,
  isMobile,
}: {
  draft: ProductDraft;
  onClose: () => void;
  onSave: (d: ProductDraft) => void;
  isMobile: boolean;
}) {
  const [d, setD] = useState<ProductDraft>(draft);
  const isEdit = d.id != null;
  const valid = d.name.trim().length > 0 && d.price >= 0 && d.stock >= 0;

  const update = <K extends keyof ProductDraft>(k: K, v: ProductDraft[K]) => setD({ ...d, [k]: v });

  return (
    <SlideOver
      open
      onClose={onClose}
      isMobile={isMobile}
      title={isEdit ? "Edit Product" : "Add Product"}
      description={isEdit ? `Update details for ${d.name || d.sku}` : "Create a new SKU in your catalog"}
      footer={
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors duration-150"
          >Cancel</button>
          <button
            onClick={() => valid && onSave(d)}
            disabled={!valid}
            data-demo-target="inventory.product-form-submit"
            className="px-4 py-2 text-sm font-medium bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
          >{isEdit ? "Save changes" : "Create product"}</button>
        </div>
      }
    >
      <div className="space-y-4">
        <Field label="Product name">
          <input
            value={d.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="e.g. Helios 14 Pro"
            className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-slate-300 outline-none transition-shadow duration-150"
          />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="SKU" hint={isEdit ? undefined : "Auto-generated if blank"}>
            <input
              value={d.sku}
              onChange={(e) => update("sku", e.target.value.toUpperCase())}
              placeholder={`${SKU_PREFIX[d.category]}-####`}
              className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm font-mono focus:ring-2 focus:ring-slate-300 outline-none transition-shadow duration-150"
            />
          </Field>
          <Field label="Category">
            <select
              value={d.category}
              onChange={(e) => update("category", e.target.value)}
              className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-slate-300 outline-none transition-shadow duration-150"
            >
              {PRODUCT_CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Unit price (USD)">
            <input
              type="number"
              min={0}
              step="0.01"
              value={d.price}
              onChange={(e) => update("price", Number(e.target.value))}
              className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm tabular-nums focus:ring-2 focus:ring-slate-300 outline-none transition-shadow duration-150"
            />
          </Field>
          <Field label="Stock on hand">
            <input
              type="number"
              min={0}
              step="1"
              value={d.stock}
              onChange={(e) => update("stock", Number(e.target.value))}
              className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm tabular-nums focus:ring-2 focus:ring-slate-300 outline-none transition-shadow duration-150"
            />
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Reorder point">
            <input
              type="number"
              min={0}
              step="1"
              value={d.reorderPoint ?? 0}
              onChange={(e) => update("reorderPoint", Number(e.target.value))}
              className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm tabular-nums focus:ring-2 focus:ring-slate-300 outline-none transition-shadow duration-150"
            />
          </Field>
          <Field label="Status">
            <select
              value={d.status}
              onChange={(e) => update("status", e.target.value as Product["status"])}
              className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-slate-300 outline-none transition-shadow duration-150"
            >
              <option value="active">Active</option>
              <option value="low">Low</option>
              <option value="out">Out of stock</option>
            </select>
          </Field>
        </div>
      </div>
    </SlideOver>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="text-xs font-medium text-slate-700">{label}</span>
        {hint && <span className="text-[11px] text-slate-400">{hint}</span>}
      </div>
      {children}
    </label>
  );
}

// --- BRANCH TABLE ---
export function BranchTable({ isMobile }: TableProps) {
  const [branches, setBranches] = usePersistedState<Branch[]>("branches", initialBranches);
  const [editing, setEditing] = useState<Partial<Branch> | null>(null);

  const save = (draft: Partial<Branch>) => {
    if (draft.id != null) {
      setBranches(branches.map(b => b.id === draft.id ? { ...b, ...draft } as Branch : b));
    } else {
      const nextId = (branches.length ? Math.max(...branches.map(b => b.id)) : 0) + 1;
      setBranches([{ ...draft, id: nextId } as Branch, ...branches]);
    }
    setEditing(null);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {branches.map(b => (
          <div key={b.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-150 relative group">
            <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
              <button
                onClick={() => setEditing(b)}
                aria-label="Edit branch"
                className="h-8 w-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors duration-150"
              ><PencilSquareIcon className="h-4 w-4" /></button>
              <button
                onClick={() => setBranches(branches.filter(br => br.id !== b.id))}
                aria-label="Delete branch"
                className="h-8 w-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors duration-150"
              ><TrashIcon className="h-4 w-4" /></button>
            </div>
            <div className="w-10 h-10 bg-slate-100 text-slate-600 rounded-lg flex items-center justify-center mb-4">
              <BuildingStorefrontIcon className="h-5 w-5" />
            </div>
            <h3 className="text-base font-semibold text-slate-900">{b.name}</h3>
            <p className="text-slate-500 text-sm mt-1 inline-flex items-center gap-1.5">
              <MapPinIcon className="h-4 w-4" />
              {b.location}
            </p>
            <div className="pt-4 mt-4 border-t border-slate-100 text-sm space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500">Region</span>
                <span className="font-medium text-slate-900">{b.region}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Manager</span>
                <span className="font-medium text-slate-900">{b.manager}</span>
              </div>
            </div>
          </div>
        ))}
        <button
          onClick={() => setEditing({ name: "", location: "", region: "", manager: "" })}
          data-demo-target="branches.add-branch"
          className="border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-slate-400 hover:border-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-colors duration-150 min-h-[220px]"
        >
          <PlusIcon className="h-8 w-8 mb-2" />
          <span className="text-sm font-medium">Add Branch</span>
        </button>
      </div>
      {editing && (
        <BranchForm
          isMobile={isMobile}
          draft={editing}
          onClose={() => setEditing(null)}
          onSave={save}
        />
      )}
    </>
  );
}

function BranchForm({ draft, onClose, onSave, isMobile }: { draft: Partial<Branch>; onClose: () => void; onSave: (d: Partial<Branch>) => void; isMobile: boolean }) {
  const [d, setD] = useState<Partial<Branch>>(draft);
  const isEdit = d.id != null;
  const valid = (d.name ?? "").trim().length > 0 && (d.location ?? "").trim().length > 0;
  const update = <K extends keyof Branch>(k: K, v: Branch[K]) => setD({ ...d, [k]: v });

  return (
    <SlideOver
      open
      onClose={onClose}
      isMobile={isMobile}
      title={isEdit ? "Edit Branch" : "Add Branch"}
      description={isEdit ? `Update details for ${d.name}` : "Open a new branch location"}
      footer={
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors duration-150">Cancel</button>
          <button
            onClick={() => valid && onSave(d)}
            disabled={!valid}
            className="px-4 py-2 text-sm font-medium bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors duration-150 disabled:opacity-50"
          >{isEdit ? "Save changes" : "Create branch"}</button>
        </div>
      }
    >
      <div className="space-y-4">
        <Field label="Branch name">
          <input
            value={d.name ?? ""}
            onChange={(e) => update("name", e.target.value)}
            placeholder="e.g. Manhattan HQ"
            className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-slate-300 outline-none transition-shadow duration-150"
          />
        </Field>
        <Field label="Location">
          <input
            value={d.location ?? ""}
            onChange={(e) => update("location", e.target.value)}
            placeholder="City, State"
            className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-slate-300 outline-none transition-shadow duration-150"
          />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Region">
            <select
              value={d.region ?? "Northeast"}
              onChange={(e) => update("region", e.target.value)}
              className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-slate-300 outline-none transition-shadow duration-150"
            >
              <option>Northeast</option>
              <option>South</option>
              <option>Midwest</option>
              <option>West</option>
              <option>Canada</option>
              <option>International</option>
            </select>
          </Field>
          <Field label="Manager">
            <input
              value={d.manager ?? ""}
              onChange={(e) => update("manager", e.target.value)}
              placeholder="Full name"
              className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-slate-300 outline-none transition-shadow duration-150"
            />
          </Field>
        </div>
      </div>
    </SlideOver>
  );
}

// --- USER TABLE ---
const PERMISSION_AREAS = ["Inventory", "Users", "Reports", "Vendors"] as const;
type PermissionArea = typeof PERMISSION_AREAS[number];
type PermissionLevel = "none" | "read" | "write" | "admin";

interface UserPermissions { [area: string]: PermissionLevel; }

const defaultPermsByRole: Record<User["role"], UserPermissions> = {
  admin:   { Inventory: "admin", Users: "admin", Reports: "admin", Vendors: "admin" },
  manager: { Inventory: "write", Users: "read",  Reports: "write", Vendors: "write" },
  staff:   { Inventory: "read",  Users: "none",  Reports: "read",  Vendors: "none"  },
};

const roleTint: Record<User["role"], string> = {
  admin:   "bg-slate-900 text-white",
  manager: "bg-slate-100 text-slate-700",
  staff:   "bg-slate-50 text-slate-600 border border-slate-200",
};

export function UserTable({ isMobile }: TableProps) {
  const [users, setUsers] = usePersistedState<User[]>("users", initialUsers);
  const [adding, setAdding] = useState(false);
  const [editingPerms, setEditingPerms] = useState<User | null>(null);

  const addUser = (draft: Partial<User>) => {
    const nextId = (users.length ? Math.max(...users.map(u => u.id)) : 0) + 1;
    setUsers([
      {
        id: nextId,
        username: draft.username ?? `user${nextId}`,
        name: draft.name ?? "",
        email: draft.email ?? "",
        role: draft.role ?? "staff",
        branchId: draft.branchId,
        status: "active",
        lastActiveMinutesAgo: 0,
      },
      ...users,
    ]);
    setAdding(false);
  };

  return (
    <>
      {isMobile ? (
        <div className="space-y-4">
          <button
            onClick={() => setAdding(true)}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-900 text-white text-sm font-medium"
          ><PlusIcon className="h-4 w-4" /> Add User</button>
          {users.map(u => (
            <div key={u.id} className="bg-white p-4 rounded-xl border border-slate-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 bg-slate-100 rounded-full flex items-center justify-center text-slate-600">
                  <UserIcon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-slate-900 truncate">{u.name}</div>
                  <div className="text-xs text-slate-500 truncate">{u.email}</div>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium capitalize ${roleTint[u.role]}`}>{u.role}</span>
              </div>
              <button
                onClick={() => setEditingPerms(u)}
                className="w-full mt-2 py-2 bg-slate-100 text-slate-700 text-xs font-medium rounded-lg hover:bg-slate-200 transition-colors duration-150"
              >Edit Permissions</button>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 bg-white border-b border-slate-200 flex justify-between items-center">
            <h3 className="text-base font-semibold text-slate-900">System Users <span className="text-slate-400 font-normal">· {users.length}</span></h3>
            <button
              onClick={() => setAdding(true)}
              data-demo-target="users.add-user"
              className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-150"
            ><PlusIcon className="h-4 w-4" /> Add User</button>
          </div>
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase text-slate-500 font-medium tracking-wide border-b border-slate-200 bg-slate-50">
              <tr>
                <th className="px-6 py-3">User</th>
                <th className="px-6 py-3">Role</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map(u => (
                <tr key={u.id} className="hover:bg-slate-50 transition-colors duration-150">
                  <td className="px-6 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 shrink-0">
                        <UserIcon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-medium text-slate-900">{u.name}</div>
                        <div className="text-xs text-slate-500">{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-3.5">
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium capitalize ${roleTint[u.role]}`}>{u.role}</span>
                  </td>
                  <td className="px-6 py-3.5">
                    <span className={`text-xs font-medium ${u.status === "active" ? "text-emerald-700" : "text-slate-500"}`}>
                      {u.status === "active" ? "Active" : "Locked"}
                    </span>
                  </td>
                  <td className="px-6 py-3.5 text-right">
                    <button
                      onClick={() => setEditingPerms(u)}
                      data-demo-target={`users.edit-permissions-${u.id}`}
                      className="text-slate-500 hover:text-slate-900 text-xs font-medium px-2 py-1 rounded hover:bg-slate-100 transition-colors duration-150"
                    >Edit Permissions</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {adding && (
        <UserForm
          isMobile={isMobile}
          onClose={() => setAdding(false)}
          onSave={addUser}
        />
      )}

      {editingPerms && (
        <PermissionsForm
          isMobile={isMobile}
          user={editingPerms}
          onClose={() => setEditingPerms(null)}
          onSave={(updated) => {
            setUsers(users.map(u => u.id === updated.id ? updated : u));
            setEditingPerms(null);
          }}
        />
      )}
    </>
  );
}

function UserForm({ onClose, onSave, isMobile }: { onClose: () => void; onSave: (d: Partial<User>) => void; isMobile: boolean }) {
  const [d, setD] = useState<Partial<User>>({ role: "staff" });
  const valid = (d.name ?? "").trim().length > 0 && (d.email ?? "").includes("@");
  const update = <K extends keyof User>(k: K, v: User[K]) => setD({ ...d, [k]: v });

  return (
    <SlideOver
      open
      onClose={onClose}
      isMobile={isMobile}
      title="Add User"
      description="Invite a teammate to the system"
      footer={
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors duration-150">Cancel</button>
          <button
            onClick={() => valid && onSave(d)}
            disabled={!valid}
            className="px-4 py-2 text-sm font-medium bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors duration-150 disabled:opacity-50"
          >Send invite</button>
        </div>
      }
    >
      <div className="space-y-4">
        <Field label="Full name">
          <input
            value={d.name ?? ""}
            onChange={(e) => update("name", e.target.value)}
            placeholder="e.g. Alex Morgan"
            className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-slate-300 outline-none transition-shadow duration-150"
          />
        </Field>
        <Field label="Email">
          <input
            type="email"
            value={d.email ?? ""}
            onChange={(e) => update("email", e.target.value)}
            placeholder="alex.morgan@company.com"
            className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-slate-300 outline-none transition-shadow duration-150"
          />
        </Field>
        <Field label="Username" hint="optional">
          <input
            value={d.username ?? ""}
            onChange={(e) => update("username", e.target.value.toLowerCase())}
            placeholder="auto-generated if blank"
            className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm font-mono focus:ring-2 focus:ring-slate-300 outline-none transition-shadow duration-150"
          />
        </Field>
        <Field label="Role">
          <div className="grid grid-cols-3 gap-2">
            {(["admin","manager","staff"] as const).map(r => (
              <button
                key={r}
                type="button"
                onClick={() => update("role", r)}
                className={`px-3 py-2 rounded-lg text-sm font-medium capitalize transition-colors duration-150 ${
                  d.role === r ? "bg-slate-900 text-white" : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >{r}</button>
            ))}
          </div>
        </Field>
        <Field label="Branch assignment">
          <select
            value={d.branchId ?? ""}
            onChange={(e) => update("branchId", e.target.value ? Number(e.target.value) : undefined)}
            className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-slate-300 outline-none transition-shadow duration-150"
          >
            <option value="">No branch (corporate)</option>
            {initialBranches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
          </select>
        </Field>
      </div>
    </SlideOver>
  );
}

function PermissionsForm({ user, onClose, onSave, isMobile }: { user: User; onClose: () => void; onSave: (u: User) => void; isMobile: boolean }) {
  const [role, setRole] = useState<User["role"]>(user.role);
  const [perms, setPerms] = useState<UserPermissions>(defaultPermsByRole[user.role]);

  const setPerm = (area: PermissionArea, level: PermissionLevel) => setPerms({ ...perms, [area]: level });

  const applyRoleDefaults = (r: User["role"]) => {
    setRole(r);
    setPerms(defaultPermsByRole[r]);
  };

  return (
    <SlideOver
      open
      onClose={onClose}
      isMobile={isMobile}
      title={`Permissions — ${user.name}`}
      description={user.email}
      footer={
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors duration-150">Cancel</button>
          <button
            onClick={() => onSave({ ...user, role })}
            className="px-4 py-2 text-sm font-medium bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors duration-150"
          >Save changes</button>
        </div>
      }
    >
      <div className="space-y-5">
        <Field label="Role">
          <div className="grid grid-cols-3 gap-2">
            {(["admin","manager","staff"] as const).map(r => (
              <button
                key={r}
                type="button"
                onClick={() => applyRoleDefaults(r)}
                className={`px-3 py-2 rounded-lg text-sm font-medium capitalize transition-colors duration-150 ${
                  role === r ? "bg-slate-900 text-white" : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >{r}</button>
            ))}
          </div>
        </Field>
        <div>
          <div className="text-xs font-medium text-slate-700 mb-2">Permissions matrix</div>
          <div className="rounded-lg border border-slate-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-3 py-2 text-left font-medium">Area</th>
                  {(["none","read","write","admin"] as const).map(l => (
                    <th key={l} className="px-3 py-2 text-center font-medium capitalize">{l}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PERMISSION_AREAS.map(area => (
                  <tr key={area} className="border-t border-slate-100">
                    <td className="px-3 py-2 font-medium text-slate-700">{area}</td>
                    {(["none","read","write","admin"] as const).map(l => (
                      <td key={l} className="px-3 py-2 text-center">
                        <button
                          onClick={() => setPerm(area, l)}
                          aria-label={`${area} ${l}`}
                          className={`h-6 w-6 rounded-full inline-flex items-center justify-center transition-colors duration-150 ${
                            perms[area] === l ? "bg-slate-900 text-white" : "bg-slate-100 text-transparent hover:bg-slate-200"
                          }`}
                        >
                          {perms[area] === l && <CheckCircleIcon className="h-4 w-4" />}
                        </button>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </SlideOver>
  );
}

// --- CRM & KANBAN (RETAINED) ---
export function CustomerTable({ isMobile }: TableProps) {
   const [customers] = usePersistedState<Customer[]>("customers", initialCustomers);
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

type KanbanCol = Task["status"];
const KANBAN_COLS: { id: KanbanCol; label: string }[] = [
  { id: "todo",     label: "To Do" },
  { id: "progress", label: "In Progress" },
  { id: "done",     label: "Done" },
];

const priorityTint: Record<NonNullable<Task["priority"]>, string> = {
  high: "bg-red-50 text-red-700 border-red-100",
  med:  "bg-amber-50 text-amber-700 border-amber-100",
  low:  "bg-slate-50 text-slate-600 border-slate-200",
};

export function KanbanBoard({ isMobile }: TableProps) {
  const [tasks, setTasks] = usePersistedState<Task[]>("tasks", initialTasks);
  const [addingTo, setAddingTo] = useState<KanbanCol | null>(null);

  const tasksFor = (col: KanbanCol) => tasks.filter(t => t.status === col);

  const reorderColumn = (col: KanbanCol, newOrder: Task[]) => {
    const others = tasks.filter(t => t.status !== col);
    setTasks([...others, ...newOrder.map(t => ({ ...t, status: col }))]);
  };

  const moveTaskToColumn = (taskId: number, target: KanbanCol) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, status: target } : t));
  };

  const addTask = (col: KanbanCol, title: string, assignee: string) => {
    const nextId = (tasks.length ? Math.max(...tasks.map(t => t.id)) : 0) + 1;
    setTasks([...tasks, { id: nextId, title, assignee, status: col, priority: "med" }]);
    setAddingTo(null);
  };

  const deleteTask = (taskId: number) => setTasks(tasks.filter(t => t.id !== taskId));

  return (
    <div className={`grid gap-4 ${isMobile ? "grid-cols-1" : "grid-cols-3"}`}>
      {KANBAN_COLS.map(col => {
        const items = tasksFor(col.id);
        return (
          <div
            key={col.id}
            className="bg-slate-50 rounded-xl p-4 flex flex-col min-h-[400px] border border-slate-200"
            onDragOver={(e) => e.preventDefault()}
          >
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-xs font-medium text-slate-700 uppercase tracking-wide">{col.label}</h4>
              <span className="bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full text-xs font-medium tabular-nums">
                {items.length}
              </span>
            </div>

            <Reorder.Group
              axis="y"
              values={items}
              onReorder={(newOrder) => reorderColumn(col.id, newOrder)}
              className="space-y-3 flex-1"
            >
              {items.map(t => (
                <Reorder.Item
                  key={t.id}
                  value={t}
                  whileDrag={{ scale: 1.03, boxShadow: "0 8px 24px rgba(15,23,42,0.12)" }}
                  className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm cursor-grab active:cursor-grabbing group"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <p className="text-sm font-medium text-slate-900 leading-snug">{t.title}</p>
                    <button
                      onClick={() => deleteTask(t.id)}
                      aria-label="Delete task"
                      className="text-slate-300 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-150 shrink-0"
                    ><XMarkIcon className="h-4 w-4" /></button>
                  </div>
                  {t.priority && (
                    <span className={`inline-flex text-[10px] uppercase tracking-wide font-medium px-1.5 py-0.5 rounded border ${priorityTint[t.priority]} mb-2`}>
                      {t.priority === "med" ? "medium" : t.priority}
                    </span>
                  )}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center text-[11px] text-slate-700 font-medium shrink-0">
                        {t.assignee[0]}
                      </div>
                      <span className="text-xs text-slate-500 truncate">{t.assignee}</span>
                    </div>
                    <KanbanQuickMove
                      current={col.id}
                      onMove={(to) => moveTaskToColumn(t.id, to)}
                    />
                  </div>
                </Reorder.Item>
              ))}
            </Reorder.Group>

            {addingTo === col.id ? (
              <AddTaskInline
                onCancel={() => setAddingTo(null)}
                onAdd={(title, assignee) => addTask(col.id, title, assignee)}
              />
            ) : (
              <button
                onClick={() => setAddingTo(col.id)}
                data-demo-target={`kanban.add-${col.id}`}
                className="mt-3 w-full py-2 border border-dashed border-slate-300 rounded-lg text-slate-500 text-xs font-medium hover:bg-white hover:text-slate-900 hover:border-slate-400 transition-colors duration-150 flex items-center justify-center gap-1.5"
              ><PlusIcon className="h-4 w-4" /> Add Task</button>
            )}
          </div>
        );
      })}
    </div>
  );
}

function KanbanQuickMove({ current, onMove }: { current: KanbanCol; onMove: (to: KanbanCol) => void }) {
  const others = KANBAN_COLS.filter(c => c.id !== current);
  return (
    <div className="hidden group-hover:flex gap-1">
      {others.map(c => (
        <button
          key={c.id}
          onClick={() => onMove(c.id)}
          className="text-[10px] uppercase tracking-wide font-medium text-slate-400 hover:text-slate-900 px-1.5 py-0.5 rounded hover:bg-slate-100 transition-colors duration-150"
        >{c.label}</button>
      ))}
    </div>
  );
}

function AddTaskInline({ onCancel, onAdd }: { onCancel: () => void; onAdd: (title: string, assignee: string) => void }) {
  const [title, setTitle] = useState("");
  const [assignee, setAssignee] = useState("Riley Chen");
  const valid = title.trim().length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15 }}
      className="mt-3 bg-white rounded-lg border border-slate-300 p-3 space-y-2 shadow-sm"
    >
      <input
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && valid) onAdd(title.trim(), assignee);
          if (e.key === "Escape") onCancel();
        }}
        placeholder="Task title…"
        className="w-full text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400 bg-transparent"
      />
      <select
        value={assignee}
        onChange={(e) => setAssignee(e.target.value)}
        className="w-full text-xs text-slate-600 bg-slate-50 rounded px-2 py-1 border border-slate-200 outline-none"
      >
        {initialEmployees.slice(0, 8).map(e => <option key={e.id}>{e.name}</option>)}
      </select>
      <div className="flex gap-2 pt-1">
        <button
          onClick={() => valid && onAdd(title.trim(), assignee)}
          disabled={!valid}
          className="flex-1 py-1.5 bg-slate-900 text-white text-xs font-medium rounded hover:bg-slate-800 transition-colors duration-150 disabled:opacity-50"
        >Add</button>
        <button
          onClick={onCancel}
          className="px-3 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-100 rounded transition-colors duration-150"
        >Cancel</button>
      </div>
    </motion.div>
  );
}