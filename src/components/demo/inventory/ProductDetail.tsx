"use client"

import { useMemo, useState } from "react";
import { ArchiveBoxIcon, ClockIcon, TruckIcon, BuildingStorefrontIcon } from "@heroicons/react/24/outline";
import { SlideOver } from "./SlideOver";
import { POBuilder } from "./POBuilder";
import { usePersistedState } from "./usePersistedState";
import {
  Product,
  Branch,
  Vendor,
  Log,
  initialBranches,
  initialVendors,
  initialLogs,
  relativeTime,
} from "@/data/demo/inventoryData";

interface ProductDetailProps {
  product: Product | null;
  onClose: () => void;
  isMobile: boolean;
}

type Tab = "overview" | "branches" | "activity" | "vendors";

export function ProductDetail({ product, onClose, isMobile }: ProductDetailProps) {
  const [tab, setTab] = useState<Tab>("overview");
  const [poOpen, setPoOpen] = useState(false);
  const [branches] = usePersistedState<Branch[]>("branches", initialBranches);
  const [vendors] = usePersistedState<Vendor[]>("vendors", initialVendors);
  const [logs] = usePersistedState<Log[]>("auditLogs", initialLogs);

  const productActivity = useMemo(() => {
    if (!product) return [];
    return logs.filter((l) => l.detail?.sku === product.sku || `${l.action}`.includes(product.name)).slice(0, 8);
  }, [product, logs]);

  const stockByBranch = useMemo(() => {
    if (!product) return [];
    // Distribute the product's total stock pseudo-deterministically across branches.
    const seed = product.id * 13;
    const weights = branches.map((_, i) => ((seed + i * 7) % 100) + 10);
    const total = weights.reduce((a, b) => a + b, 0);
    return branches.map((b, i) => ({
      branch: b,
      units: Math.max(0, Math.round((weights[i] / total) * product.stock)),
    }));
  }, [product, branches]);

  const productVendors = useMemo(() => {
    if (!product) return [];
    return vendors
      .filter((v) => v.id === product.vendorId || v.preferredCategories.includes(product.category))
      .slice(0, 4)
      .map((v, i) => ({
        vendor: v,
        leadDays: v.leadTimeDays + (i === 0 ? 0 : i * 2),
        unitCost: Math.round(product.price * (0.62 + i * 0.04) * 100) / 100,
        primary: v.id === product.vendorId,
      }));
  }, [product, vendors]);

  if (!product) return null;
  const maxBranchUnits = Math.max(1, ...stockByBranch.map(s => s.units));

  return (
    <>
      <SlideOver
        open={!!product}
        onClose={onClose}
        isMobile={isMobile}
        width="lg"
        title={product.name}
        description={`${product.sku} · ${product.category}`}
        footer={
          <div className="flex justify-between items-center gap-3">
            <div className="text-xs text-slate-500">
              <span className="font-medium text-slate-900 tabular-nums">${product.price.toLocaleString()}</span> · stock <span className="tabular-nums">{product.stock}</span>
            </div>
            <button
              onClick={() => setPoOpen(true)}
              data-demo-target="product.generate-po"
              className="px-4 py-2 text-sm font-medium bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors duration-150"
            >Generate PO for this product</button>
          </div>
        }
      >
        <div className="space-y-5">
          <Tabs current={tab} onChange={setTab} />
          {tab === "overview" && (
            <Overview product={product} />
          )}
          {tab === "branches" && (
            <BranchBreakdown rows={stockByBranch} max={maxBranchUnits} />
          )}
          {tab === "activity" && (
            <ActivityList rows={productActivity} />
          )}
          {tab === "vendors" && (
            <VendorRows rows={productVendors} />
          )}
        </div>
      </SlideOver>

      <POBuilder
        open={poOpen}
        onClose={() => setPoOpen(false)}
        isMobile={isMobile}
        preselectVendorId={product.vendorId}
        preselectProductId={product.id}
      />
    </>
  );
}

function Tabs({ current, onChange }: { current: Tab; onChange: (t: Tab) => void }) {
  const tabs: { id: Tab; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "branches", label: "Stock by Branch" },
    { id: "activity", label: "Recent Activity" },
    { id: "vendors", label: "Vendors" },
  ];
  return (
    <div className="border-b border-slate-200 -mt-1">
      <div className="flex gap-1 overflow-x-auto">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            className={`px-3 py-2 text-sm font-medium relative transition-colors duration-150 ${
              current === t.id ? "text-slate-900" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {t.label}
            {current === t.id && (
              <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-slate-900" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

function Overview({ product }: { product: Product }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <Stat label="Stock on hand" value={product.stock.toString()} icon={<ArchiveBoxIcon className="h-4 w-4" />} />
        <Stat label="Reorder point" value={(product.reorderPoint ?? 0).toString()} icon={<ClockIcon className="h-4 w-4" />} />
      </div>
      <dl className="bg-slate-50 rounded-lg p-4 space-y-2 text-sm">
        <Row label="SKU"><span className="font-mono">{product.sku}</span></Row>
        <Row label="Category">{product.category}</Row>
        <Row label="Unit price" tabular>${product.price.toLocaleString()}</Row>
        <Row label="Status"><span className="capitalize">{product.status}</span></Row>
        {product.meta?.warrantyMonths != null && <Row label="Warranty">{product.meta.warrantyMonths} months</Row>}
        {product.meta?.unitOfMeasure && <Row label="Unit of measure">{product.meta.unitOfMeasure}</Row>}
        {product.meta?.expiry && <Row label="Expiry">{product.meta.expiry}</Row>}
        {product.meta?.lotNumber && <Row label="Lot number"><span className="font-mono">{product.meta.lotNumber}</span></Row>}
        {product.meta?.controlled && <Row label="Controlled"><span className="text-amber-700 font-medium">Yes</span></Row>}
        {product.meta?.oemPartNumber && <Row label="OEM part #"><span className="font-mono">{product.meta.oemPartNumber}</span></Row>}
        {product.meta?.fitment && <Row label="Fitment">{product.meta.fitment}</Row>}
      </dl>
    </div>
  );
}

function BranchBreakdown({ rows, max }: { rows: { branch: Branch; units: number }[]; max: number }) {
  return (
    <div className="space-y-2">
      {rows.map(({ branch, units }) => (
        <div key={branch.id} className="bg-white border border-slate-200 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <BuildingStorefrontIcon className="h-4 w-4 text-slate-500" />
              <span className="text-sm font-medium text-slate-900">{branch.name}</span>
              <span className="text-xs text-slate-400">{branch.region}</span>
            </div>
            <span className="text-sm font-medium tabular-nums">{units}</span>
          </div>
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-slate-900" style={{ width: `${(units / max) * 100}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function ActivityList({ rows }: { rows: Log[] }) {
  if (rows.length === 0) {
    return <p className="text-sm text-slate-400 text-center py-8">No recent activity for this SKU.</p>;
  }
  return (
    <ul className="divide-y divide-slate-100 border border-slate-200 rounded-lg overflow-hidden">
      {rows.map((log) => (
        <li key={log.id} className="px-4 py-2.5 flex items-center justify-between gap-3 text-sm bg-white">
          <div className="min-w-0">
            <div className="text-slate-900 font-medium truncate">{log.action}</div>
            <div className="text-xs text-slate-500">{log.user}</div>
          </div>
          <span className="text-xs text-slate-400 tabular-nums shrink-0">{relativeTime(log.minutesAgo)}</span>
        </li>
      ))}
    </ul>
  );
}

function VendorRows({ rows }: { rows: { vendor: Vendor; leadDays: number; unitCost: number; primary: boolean }[] }) {
  if (rows.length === 0) {
    return <p className="text-sm text-slate-400 text-center py-8">No vendors associated.</p>;
  }
  return (
    <ul className="space-y-2">
      {rows.map(({ vendor, leadDays, unitCost, primary }) => (
        <li key={vendor.id} className="bg-white border border-slate-200 rounded-lg p-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="h-9 w-9 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
              <TruckIcon className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <div className="text-sm font-medium text-slate-900 truncate">
                {vendor.name}
                {primary && <span className="ml-2 text-[10px] uppercase tracking-wide font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">Primary</span>}
              </div>
              <div className="text-xs text-slate-500">Lead {leadDays}d · OTD {vendor.onTimeDeliveryPct}%</div>
            </div>
          </div>
          <div className="text-right shrink-0">
            <div className="text-sm font-medium text-slate-900 tabular-nums">${unitCost.toFixed(2)}</div>
            <div className="text-[11px] text-slate-400">unit cost</div>
          </div>
        </li>
      ))}
    </ul>
  );
}

function Stat({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <div className="bg-slate-50 rounded-lg p-3">
      <div className="text-[11px] font-medium uppercase tracking-wide text-slate-500 inline-flex items-center gap-1.5">
        {icon}
        {label}
      </div>
      <div className="text-lg font-semibold text-slate-900 tabular-nums mt-0.5">{value}</div>
    </div>
  );
}

function Row({ label, children, tabular }: { label: string; children: React.ReactNode; tabular?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-slate-500">{label}</dt>
      <dd className={`text-slate-900 ${tabular ? "tabular-nums" : ""}`}>{children}</dd>
    </div>
  );
}
