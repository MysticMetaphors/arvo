"use client"

import { useMemo, useState } from "react";
import { TrashIcon, PlusIcon } from "@heroicons/react/24/outline";
import { SlideOver } from "./SlideOver";
import { usePersistedState } from "./usePersistedState";
import {
  initialProducts,
  initialVendors,
  initialNotifications,
  initialPurchaseOrders,
  Vendor,
  Product,
  PurchaseOrder,
  Notification,
} from "@/data/demo/inventoryData";

interface LineItem { productId: number; qty: number; unitPrice: number; }

interface POBuilderProps {
  open: boolean;
  onClose: () => void;
  isMobile: boolean;
  preselectVendorId?: number;
  preselectProductId?: number;
  onSent?: (po: PurchaseOrder) => void;
}

export function POBuilder({ open, onClose, isMobile, preselectVendorId, preselectProductId, onSent }: POBuilderProps) {
  const [vendors] = usePersistedState<Vendor[]>("vendors", initialVendors);
  const [products] = usePersistedState<Product[]>("products", initialProducts);
  const [, setPurchaseOrders] = usePersistedState<PurchaseOrder[]>("purchaseOrders", initialPurchaseOrders);
  const [, setNotifications] = usePersistedState<Notification[]>("notifications", initialNotifications);

  const [vendorId, setVendorId] = useState<number>(
    preselectVendorId ?? (preselectProductId
      ? products.find(p => p.id === preselectProductId)?.vendorId ?? vendors[0].id
      : vendors[0].id)
  );

  const [items, setItems] = useState<LineItem[]>(() => {
    if (preselectProductId) {
      const p = products.find(p => p.id === preselectProductId);
      if (p) return [{ productId: p.id, qty: Math.max(p.reorderPoint ?? 10, 10), unitPrice: p.price * 0.7 }];
    }
    return [];
  });

  const [shipping, setShipping] = useState(0);
  const [taxRate, setTaxRate] = useState(8.875);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState<PurchaseOrder | null>(null);

  const vendor = vendors.find(v => v.id === vendorId);
  const eligibleProducts = useMemo(() => {
    return products.filter(p => !vendor || (p.vendorId === vendorId) || (vendor.preferredCategories.includes(p.category)));
  }, [products, vendor, vendorId]);

  const subtotal = items.reduce((s, i) => s + i.qty * i.unitPrice, 0);
  const tax = subtotal * (taxRate / 100);
  const total = subtotal + tax + shipping;

  const addLine = (productId?: number) => {
    const candidate = productId
      ? products.find(p => p.id === productId)
      : eligibleProducts.find(p => !items.some(i => i.productId === p.id));
    if (!candidate) return;
    setItems([...items, { productId: candidate.id, qty: 10, unitPrice: candidate.price * 0.7 }]);
  };

  const updateLine = (idx: number, patch: Partial<LineItem>) => {
    setItems(items.map((it, i) => i === idx ? { ...it, ...patch } : it));
  };

  const removeLine = (idx: number) => setItems(items.filter((_, i) => i !== idx));

  const send = () => {
    if (!vendor || items.length === 0) return;
    setSending(true);
    setTimeout(() => {
      const idNum = 850 + Math.floor(Math.random() * 50);
      const ack = "ACK-" + Math.random().toString(36).slice(2, 7).toUpperCase();
      const po: PurchaseOrder = {
        id: `PO-2026-0${idNum}`,
        vendorId: vendor.id,
        status: "sent",
        total,
        itemCount: items.reduce((s, i) => s + i.qty, 0),
        createdMinutesAgo: 0,
        ackNumber: ack,
      };
      setPurchaseOrders((prev) => [po, ...prev]);
      setNotifications((prev) => [
        {
          id: Math.max(0, ...prev.map(n => n.id)) + 1,
          category: "vendor",
          title: `PO ${po.id} sent`,
          body: `Sent to ${vendor.name}. Confirmation ${ack}.`,
          minutesAgo: 0,
          unread: true,
        },
        ...prev,
      ]);
      setSending(false);
      setSent(po);
      onSent?.(po);
    }, 900);
  };

  const reset = () => {
    setItems([]);
    setSent(null);
  };

  return (
    <SlideOver
      open={open}
      onClose={() => { reset(); onClose(); }}
      isMobile={isMobile}
      width="lg"
      title={sent ? "Purchase Order Sent" : "New Purchase Order"}
      description={sent ? `${sent.id} · ${vendor?.name}` : vendor ? `Sending to ${vendor.name} · Lead ${vendor.leadTimeDays}d` : undefined}
      footer={
        sent ? (
          <div className="flex justify-end gap-2">
            <button
              onClick={() => { reset(); onClose(); }}
              className="px-4 py-2 text-sm font-medium bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors duration-150"
            >Done</button>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-2">
            <div className="text-xs text-slate-500">
              <span className="font-medium text-slate-900 tabular-nums">${total.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span> · {items.length} {items.length === 1 ? "line" : "lines"}
            </div>
            <div className="flex gap-2">
              <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors duration-150">Cancel</button>
              <button
                onClick={send}
                disabled={items.length === 0 || sending}
                data-demo-target="po.send"
                className="px-4 py-2 text-sm font-medium bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors duration-150 disabled:opacity-50"
              >{sending ? "Sending..." : "Send PO"}</button>
            </div>
          </div>
        )
      }
    >
      {sent ? (
        <div className="space-y-4">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
            <p className="text-sm text-emerald-900 font-medium mb-1">PO sent successfully</p>
            <p className="text-xs text-emerald-700">
              Confirmation <span className="font-mono">{sent.ackNumber}</span> · Estimated arrival {vendor?.leadTimeDays} days
            </p>
          </div>
          <dl className="space-y-2 text-sm">
            <Row label="Reference">{sent.id}</Row>
            <Row label="Vendor">{vendor?.name}</Row>
            <Row label="Item count" tabular>{sent.itemCount} units across {items.length} SKUs</Row>
            <Row label="Total" tabular><span className="font-medium">${sent.total.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span></Row>
            <Row label="Status"><span className="capitalize">{sent.status}</span></Row>
          </dl>
        </div>
      ) : (
        <div className="space-y-5">
          <div>
            <div className="text-xs font-medium text-slate-700 mb-1.5">Vendor</div>
            <select
              value={vendorId}
              onChange={(e) => setVendorId(Number(e.target.value))}
              className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-slate-300 outline-none transition-shadow duration-150"
            >
              {vendors.map(v => (
                <option key={v.id} value={v.id}>{v.name} · Lead {v.leadTimeDays}d · OTD {v.onTimeDeliveryPct}%</option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <div className="text-xs font-medium text-slate-700">Line items</div>
              <button
                onClick={() => addLine()}
                disabled={items.length >= eligibleProducts.length}
                className="text-xs font-medium text-slate-700 hover:text-slate-900 inline-flex items-center gap-1 px-2 py-1 rounded hover:bg-slate-100 transition-colors duration-150 disabled:opacity-40"
              ><PlusIcon className="h-3.5 w-3.5" /> Add line</button>
            </div>
            {items.length === 0 ? (
              <div className="border border-dashed border-slate-200 rounded-lg p-6 text-center">
                <p className="text-sm text-slate-500 mb-3">No line items yet</p>
                <button
                  onClick={() => addLine()}
                  className="text-xs font-medium text-slate-900 inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors duration-150"
                ><PlusIcon className="h-3.5 w-3.5" /> Add first line</button>
              </div>
            ) : (
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                    <tr>
                      <th className="text-left px-3 py-2 font-medium">Product</th>
                      <th className="text-right px-3 py-2 font-medium w-20">Qty</th>
                      <th className="text-right px-3 py-2 font-medium w-28">Unit cost</th>
                      <th className="text-right px-3 py-2 font-medium w-28">Line total</th>
                      <th className="w-8"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((it, idx) => {
                      const p = products.find(p => p.id === it.productId);
                      return (
                        <tr key={idx} className="border-t border-slate-100">
                          <td className="px-3 py-2">
                            <select
                              value={it.productId}
                              onChange={(e) => {
                                const newId = Number(e.target.value);
                                const np = products.find(p => p.id === newId);
                                updateLine(idx, { productId: newId, unitPrice: np ? np.price * 0.7 : it.unitPrice });
                              }}
                              className="text-sm bg-transparent outline-none w-full"
                            >
                              {eligibleProducts.map(pp => (
                                <option key={pp.id} value={pp.id}>{pp.name} ({pp.sku})</option>
                              ))}
                            </select>
                          </td>
                          <td className="px-3 py-2">
                            <input
                              type="number"
                              min={1}
                              value={it.qty}
                              onChange={(e) => updateLine(idx, { qty: Math.max(1, Number(e.target.value)) })}
                              className="w-full text-right tabular-nums bg-transparent outline-none"
                            />
                          </td>
                          <td className="px-3 py-2">
                            <input
                              type="number"
                              min={0}
                              step="0.01"
                              value={it.unitPrice}
                              onChange={(e) => updateLine(idx, { unitPrice: Math.max(0, Number(e.target.value)) })}
                              className="w-full text-right tabular-nums bg-transparent outline-none"
                            />
                          </td>
                          <td className="px-3 py-2 text-right tabular-nums font-medium text-slate-900">
                            ${(it.qty * it.unitPrice).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                          </td>
                          <td className="px-2 py-2 text-right">
                            <button
                              onClick={() => removeLine(idx)}
                              aria-label={`Remove ${p?.name}`}
                              className="text-slate-300 hover:text-red-600 transition-colors duration-150"
                            ><TrashIcon className="h-4 w-4" /></button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs font-medium text-slate-700 mb-1.5">Shipping (USD)</div>
              <input
                type="number"
                min={0}
                step="0.01"
                value={shipping}
                onChange={(e) => setShipping(Math.max(0, Number(e.target.value)))}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm tabular-nums focus:ring-2 focus:ring-slate-300 outline-none transition-shadow duration-150"
              />
            </div>
            <div>
              <div className="text-xs font-medium text-slate-700 mb-1.5">Tax rate (%)</div>
              <input
                type="number"
                min={0}
                step="0.01"
                value={taxRate}
                onChange={(e) => setTaxRate(Math.max(0, Number(e.target.value)))}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm tabular-nums focus:ring-2 focus:ring-slate-300 outline-none transition-shadow duration-150"
              />
            </div>
          </div>

          {items.length > 0 && (
            <div className="bg-slate-50 rounded-lg p-4 space-y-1.5 text-sm">
              <Row label="Subtotal" tabular>${subtotal.toLocaleString(undefined, { maximumFractionDigits: 2 })}</Row>
              <Row label={`Tax (${taxRate}%)`} tabular>${tax.toLocaleString(undefined, { maximumFractionDigits: 2 })}</Row>
              <Row label="Shipping" tabular>${shipping.toLocaleString(undefined, { maximumFractionDigits: 2 })}</Row>
              <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-900">Total</span>
                <span className="text-sm font-semibold text-slate-900 tabular-nums">${total.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </SlideOver>
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
