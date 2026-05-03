"use client"

import { useMemo, useState } from "react";
import {
  EnvelopeIcon,
  PhoneIcon,
  ClockIcon,
  CheckBadgeIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { usePersistedState } from "./usePersistedState";
import { SlideOver } from "./SlideOver";
import { POBuilder } from "./POBuilder";
import {
  initialVendors,
  initialPurchaseOrders,
  Vendor,
  PurchaseOrder,
  relativeTime,
} from "@/data/demo/inventoryData";

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0])
    .join("")
    .toUpperCase();

const tintForName = (name: string) => {
  const tints = ["bg-slate-100 text-slate-700", "bg-emerald-50 text-emerald-700", "bg-amber-50 text-amber-700", "bg-blue-50 text-blue-700"];
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return tints[h % tints.length];
};

const poStatusTint: Record<PurchaseOrder["status"], string> = {
  draft: "bg-slate-100 text-slate-600",
  sent: "bg-blue-50 text-blue-700",
  received: "bg-emerald-50 text-emerald-700",
  invoiced: "bg-amber-50 text-amber-700",
  closed: "bg-slate-100 text-slate-500",
};

interface VendorsPageProps {
  isMobile: boolean;
}

export function VendorsPage({ isMobile }: VendorsPageProps) {
  const [vendors] = usePersistedState<Vendor[]>("vendors", initialVendors);
  const [pos] = usePersistedState<PurchaseOrder[]>("purchaseOrders", initialPurchaseOrders);
  const [active, setActive] = useState<Vendor | null>(null);
  const [poBuilderFor, setPoBuilderFor] = useState<Vendor | null>(null);

  const vendorPOs = useMemo(() => {
    if (!active) return [];
    return pos.filter((p) => p.vendorId === active.id).sort((a, b) => a.createdMinutesAgo - b.createdMinutesAgo);
  }, [active, pos]);

  return (
    <div className="space-y-6" data-demo-stagger>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Vendors</h2>
          <p className="text-sm text-slate-500 mt-0.5">{vendors.length} suppliers · {pos.filter(p => p.status === "sent" || p.status === "draft").length} active POs</p>
        </div>
      </div>

      <div className={`grid gap-4 ${isMobile ? "grid-cols-1" : "grid-cols-2 lg:grid-cols-3"}`} data-demo-stagger="fast">
        {vendors.map((v) => (
          <button
            key={v.id}
            onClick={() => setActive(v)}
            data-demo-target={`vendors.card-${v.id}`}
            className="text-left bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-150"
          >
            <div className="flex items-start gap-3 mb-4">
              <div className={`h-11 w-11 rounded-lg flex items-center justify-center text-sm font-semibold ${tintForName(v.name)}`}>
                {initials(v.name)}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-base font-semibold text-slate-900 truncate">{v.name}</h3>
                <p className="text-xs text-slate-500 truncate">{v.preferredCategories.join(" · ")}</p>
              </div>
            </div>
            <dl className="space-y-1.5 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-slate-500 inline-flex items-center gap-1.5"><ClockIcon className="h-4 w-4" /> Lead time</dt>
                <dd className="text-slate-900 font-medium tabular-nums">{v.leadTimeDays}d</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-slate-500 inline-flex items-center gap-1.5"><CheckBadgeIcon className="h-4 w-4" /> On-time</dt>
                <dd className={`font-medium tabular-nums ${v.onTimeDeliveryPct >= 95 ? "text-emerald-700" : v.onTimeDeliveryPct >= 90 ? "text-amber-700" : "text-red-700"}`}>{v.onTimeDeliveryPct}%</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-slate-500">Open POs</dt>
                <dd className="text-slate-900 font-medium tabular-nums">{v.openPOs}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-slate-500">Last order</dt>
                <dd className="text-slate-500 text-xs tabular-nums">{relativeTime(v.lastOrderMinutesAgo)}</dd>
              </div>
            </dl>
          </button>
        ))}
      </div>

      {active && (
        <SlideOver
          open
          onClose={() => setActive(null)}
          isMobile={isMobile}
          width="lg"
          title={active.name}
          description={`${active.preferredCategories.join(" · ")} · Lead ${active.leadTimeDays}d`}
          footer={
            <div className="flex justify-end">
              <button
                onClick={() => setPoBuilderFor(active)}
                data-demo-target="vendors.generate-po"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors duration-150"
              >
                <PlusIcon className="h-4 w-4" /> Generate New PO
              </button>
            </div>
          }
        >
          <div className="space-y-6">
            <section className="space-y-2">
              <div className="text-xs font-medium uppercase tracking-wide text-slate-500">Contact</div>
              <div className="bg-slate-50 rounded-lg p-3 space-y-1.5 text-sm">
                <div className="inline-flex items-center gap-2 text-slate-700">
                  <EnvelopeIcon className="h-4 w-4 text-slate-400" />
                  <a href={`mailto:${active.contactEmail}`} className="hover:text-slate-900">{active.contactEmail}</a>
                </div>
                <div className="inline-flex items-center gap-2 text-slate-700">
                  <PhoneIcon className="h-4 w-4 text-slate-400" />
                  <span>{active.contactPhone}</span>
                </div>
              </div>
            </section>

            <section className="grid grid-cols-3 gap-3">
              <Stat label="Lead time" value={`${active.leadTimeDays}d`} />
              <Stat label="On-time" value={`${active.onTimeDeliveryPct}%`} />
              <Stat label="Open POs" value={String(active.openPOs)} />
            </section>

            <section>
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs font-medium uppercase tracking-wide text-slate-500">PO history</div>
                <span className="text-xs text-slate-400 tabular-nums">{vendorPOs.length} records</span>
              </div>
              {vendorPOs.length === 0 ? (
                <p className="text-sm text-slate-400 text-center py-6">No purchase orders yet.</p>
              ) : (
                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                      <tr>
                        <th className="text-left px-3 py-2 font-medium">PO #</th>
                        <th className="text-left px-3 py-2 font-medium">Status</th>
                        <th className="text-right px-3 py-2 font-medium">Items</th>
                        <th className="text-right px-3 py-2 font-medium">Total</th>
                        <th className="text-right px-3 py-2 font-medium">Created</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {vendorPOs.map(po => (
                        <tr key={po.id}>
                          <td className="px-3 py-2 font-mono text-xs">{po.id}</td>
                          <td className="px-3 py-2">
                            <span className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-medium capitalize ${poStatusTint[po.status]}`}>
                              {po.status}
                            </span>
                          </td>
                          <td className="px-3 py-2 text-right tabular-nums">{po.itemCount}</td>
                          <td className="px-3 py-2 text-right tabular-nums font-medium">${po.total.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                          <td className="px-3 py-2 text-right text-xs text-slate-500 tabular-nums">{relativeTime(po.createdMinutesAgo)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>

            <section>
              <div className="text-xs font-medium uppercase tracking-wide text-slate-500 mb-2">Preferred categories</div>
              <div className="flex flex-wrap gap-2">
                {active.preferredCategories.map(c => (
                  <span key={c} className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium">{c}</span>
                ))}
              </div>
            </section>
          </div>
        </SlideOver>
      )}

      <POBuilder
        open={!!poBuilderFor}
        onClose={() => setPoBuilderFor(null)}
        isMobile={isMobile}
        preselectVendorId={poBuilderFor?.id}
      />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-slate-50 rounded-lg p-3">
      <div className="text-[11px] font-medium uppercase tracking-wide text-slate-500">{label}</div>
      <div className="text-lg font-semibold text-slate-900 tabular-nums mt-0.5">{value}</div>
    </div>
  );
}
