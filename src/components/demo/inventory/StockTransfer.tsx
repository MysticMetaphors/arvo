"use client"

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TruckIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  XMarkIcon,
  PlusIcon,
  MinusIcon,
  BuildingStorefrontIcon,
} from "@heroicons/react/24/outline";
import { usePersistedState } from "./usePersistedState";
import {
  initialBranches,
  initialProducts,
  initialTransfers,
  Branch,
  Product,
  Transfer,
  relativeTime,
} from "@/data/demo/inventoryData";

interface StockTransferProps {
  isMobile: boolean;
}

interface CartLine { productId: number; qty: number; }

type Step = 0 | 1 | 2 | 3 | 4;

export function StockTransfer({ isMobile }: StockTransferProps) {
  const [branches] = usePersistedState<Branch[]>("branches", initialBranches);
  const [products] = usePersistedState<Product[]>("products", initialProducts);
  const [transfers, setTransfers] = usePersistedState<Transfer[]>("transfers", initialTransfers);

  const [step, setStep] = useState<Step>(0);
  const [fromId, setFromId] = useState<number | null>(null);
  const [toId, setToId] = useState<number | null>(null);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [confirmed, setConfirmed] = useState<Transfer | null>(null);

  const fromBranch = branches.find(b => b.id === fromId);
  const toBranch = branches.find(b => b.id === toId);

  const totalUnits = cart.reduce((s, l) => s + l.qty, 0);

  const reset = () => {
    setStep(0);
    setFromId(null);
    setToId(null);
    setCart([]);
    setConfirmed(null);
  };

  const advance = () => setStep((s => Math.min(4, s + 1) as Step)(step));
  const back = () => setStep((s => Math.max(0, s - 1) as Step)(step));

  const adjust = (productId: number, delta: number) => {
    const existing = cart.find(l => l.productId === productId);
    if (!existing) {
      if (delta > 0) setCart([...cart, { productId, qty: delta }]);
      return;
    }
    const next = existing.qty + delta;
    if (next <= 0) setCart(cart.filter(l => l.productId !== productId));
    else setCart(cart.map(l => l.productId === productId ? { ...l, qty: next } : l));
  };

  const setQty = (productId: number, qty: number) => {
    if (qty <= 0) setCart(cart.filter(l => l.productId !== productId));
    else if (cart.find(l => l.productId === productId)) {
      setCart(cart.map(l => l.productId === productId ? { ...l, qty } : l));
    } else {
      setCart([...cart, { productId, qty }]);
    }
  };

  const submit = () => {
    if (!fromBranch || !toBranch || cart.length === 0) return;
    setStep(3);
    setTimeout(() => {
      const nextNum = 1043 + Math.floor(Math.random() * 30);
      const t: Transfer = {
        id: `TR-${nextNum}`,
        fromBranchId: fromBranch.id,
        toBranchId: toBranch.id,
        itemCount: totalUnits,
        status: "in_transit",
        minutesAgo: 0,
      };
      setTransfers([t, ...transfers]);
      setConfirmed(t);
      setStep(4);
    }, 1800);
  };

  const recentTransfers = useMemo(() => transfers.slice(0, 6), [transfers]);

  return (
    <div className="space-y-6" data-demo-stagger>
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Stock Transfer</h2>
          <p className="text-sm text-slate-500 mt-0.5">Move inventory between branches</p>
        </div>
        {step > 0 && step < 3 && (
          <button onClick={reset} className="text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors duration-150">
            Cancel transfer
          </button>
        )}
      </div>

      <Stepper step={step} />

      <div className="bg-white border border-slate-200 rounded-xl p-6 min-h-[400px]" data-demo-target="transfer.workspace">
        {step === 0 && (
          <StepCards
            title="Source branch"
            description="Where the inventory is moving from"
            branches={branches}
            selectedId={fromId}
            onSelect={(id) => { setFromId(id); setStep(1); }}
            isMobile={isMobile}
          />
        )}
        {step === 1 && (
          <StepCards
            title="Destination branch"
            description={`Moving from ${fromBranch?.name}. Pick destination.`}
            branches={branches.filter(b => b.id !== fromId)}
            selectedId={toId}
            onSelect={(id) => { setToId(id); setStep(2); }}
            isMobile={isMobile}
            onBack={back}
          />
        )}
        {step === 2 && fromBranch && toBranch && (
          <PickItems
            from={fromBranch}
            to={toBranch}
            products={products}
            cart={cart}
            onAdjust={adjust}
            onSet={setQty}
            onBack={back}
            onContinue={submit}
            totalUnits={totalUnits}
          />
        )}
        {step === 3 && fromBranch && toBranch && (
          <InTransit from={fromBranch} to={toBranch} units={totalUnits} />
        )}
        {step === 4 && confirmed && fromBranch && toBranch && (
          <Confirmed transfer={confirmed} from={fromBranch} to={toBranch} onReset={reset} />
        )}
      </div>

      {/* Recent transfers */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="text-base font-semibold text-slate-900">Recent transfers</h3>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="text-left px-6 py-3 font-medium">Reference</th>
              <th className="text-left px-6 py-3 font-medium">From</th>
              <th className="text-left px-6 py-3 font-medium">To</th>
              <th className="text-right px-6 py-3 font-medium">Units</th>
              <th className="text-left px-6 py-3 font-medium">Status</th>
              <th className="text-right px-6 py-3 font-medium">When</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {recentTransfers.map(t => {
              const from = branches.find(b => b.id === t.fromBranchId);
              const to = branches.find(b => b.id === t.toBranchId);
              return (
                <tr key={t.id} className="hover:bg-slate-50 transition-colors duration-150">
                  <td className="px-6 py-3 font-mono text-xs">{t.id}</td>
                  <td className="px-6 py-3 text-slate-700">{from?.name ?? "—"}</td>
                  <td className="px-6 py-3 text-slate-700">{to?.name ?? "—"}</td>
                  <td className="px-6 py-3 text-right tabular-nums">{t.itemCount}</td>
                  <td className="px-6 py-3">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-medium ${
                      t.status === "in_transit" ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700"
                    }`}>
                      {t.status === "in_transit" ? "In transit" : "Completed"}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-right text-xs text-slate-500 tabular-nums">{relativeTime(t.minutesAgo)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const STEP_LABELS = ["Source", "Destination", "Items", "Transit", "Done"];

function Stepper({ step }: { step: Step }) {
  return (
    <div className="flex items-center gap-2">
      {STEP_LABELS.map((label, i) => {
        const active = i === step;
        const done = i < step;
        return (
          <div key={label} className="flex items-center gap-2">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-colors duration-150 ${
              done ? "bg-emerald-50 text-emerald-700" :
              active ? "bg-slate-900 text-white" :
              "bg-slate-100 text-slate-500"
            }`}>
              <span className="tabular-nums">{i + 1}</span>
              <span>{label}</span>
            </div>
            {i < STEP_LABELS.length - 1 && <div className="w-6 h-px bg-slate-200" />}
          </div>
        );
      })}
    </div>
  );
}

function StepCards({ title, description, branches, selectedId, onSelect, isMobile, onBack }: {
  title: string;
  description: string;
  branches: Branch[];
  selectedId: number | null;
  onSelect: (id: number) => void;
  isMobile: boolean;
  onBack?: () => void;
}) {
  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-base font-semibold text-slate-900">{title}</h3>
          <p className="text-sm text-slate-500 mt-0.5">{description}</p>
        </div>
        {onBack && (
          <button onClick={onBack} className="text-xs font-medium text-slate-500 hover:text-slate-900 inline-flex items-center gap-1 transition-colors duration-150">
            <ArrowLeftIcon className="h-3.5 w-3.5" /> Back
          </button>
        )}
      </div>
      <div className={`grid gap-3 ${isMobile ? "grid-cols-1" : "grid-cols-2 md:grid-cols-3"}`}>
        {branches.map(b => (
          <button
            key={b.id}
            onClick={() => onSelect(b.id)}
            className={`text-left p-4 rounded-xl border transition-all duration-150 ${
              selectedId === b.id
                ? "border-slate-900 bg-slate-50 shadow-sm"
                : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                <BuildingStorefrontIcon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="font-medium text-slate-900 truncate">{b.name}</div>
                <div className="text-xs text-slate-500 truncate">{b.location}</div>
                <div className="text-[11px] text-slate-400 mt-1">{b.region}</div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function PickItems({ from, to, products, cart, onAdjust, onSet, onBack, onContinue, totalUnits }: {
  from: Branch;
  to: Branch;
  products: Product[];
  cart: CartLine[];
  onAdjust: (productId: number, delta: number) => void;
  onSet: (productId: number, qty: number) => void;
  onBack: () => void;
  onContinue: () => void;
  totalUnits: number;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3 text-sm">
          <span className="text-slate-500">Transfer:</span>
          <span className="font-medium text-slate-900">{from.name}</span>
          <ArrowRightIcon className="h-4 w-4 text-slate-400" />
          <span className="font-medium text-slate-900">{to.name}</span>
        </div>
        <button onClick={onBack} className="text-xs font-medium text-slate-500 hover:text-slate-900 inline-flex items-center gap-1 transition-colors duration-150">
          <ArrowLeftIcon className="h-3.5 w-3.5" /> Change destination
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Available products */}
        <div className="border border-slate-200 rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-100 bg-slate-50 text-xs font-medium uppercase tracking-wide text-slate-500">
            Available at {from.name}
          </div>
          <ul className="max-h-80 overflow-y-auto divide-y divide-slate-100">
            {products.map(p => {
              const inCart = cart.find(l => l.productId === p.id);
              return (
                <li key={p.id} className="px-4 py-2.5 flex items-center justify-between gap-3 text-sm">
                  <div className="min-w-0">
                    <div className="font-medium text-slate-900 truncate">{p.name}</div>
                    <div className="text-xs text-slate-500 tabular-nums">{p.sku} · {p.stock} on hand</div>
                  </div>
                  <button
                    onClick={() => onAdjust(p.id, 1)}
                    disabled={p.stock === 0}
                    className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-medium text-slate-700 disabled:opacity-50 transition-colors duration-150"
                  >
                    {inCart ? `+1 (${inCart.qty})` : "Add"}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Cart */}
        <div className="border border-slate-200 rounded-xl overflow-hidden flex flex-col">
          <div className="px-4 py-3 border-b border-slate-100 bg-slate-50 text-xs font-medium uppercase tracking-wide text-slate-500 flex justify-between">
            <span>Transfer cart</span>
            <span className="text-slate-700 tabular-nums">{totalUnits} units</span>
          </div>
          {cart.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-sm text-slate-400 py-12">
              Add items to begin
            </div>
          ) : (
            <ul className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
              {cart.map(l => {
                const p = products.find(p => p.id === l.productId);
                if (!p) return null;
                return (
                  <li key={l.productId} className="px-4 py-2.5 flex items-center justify-between gap-2 text-sm">
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-slate-900 truncate">{p.name}</div>
                      <div className="text-xs text-slate-500">{p.sku}</div>
                    </div>
                    <div className="inline-flex items-center gap-1">
                      <button
                        onClick={() => onAdjust(l.productId, -1)}
                        className="h-7 w-7 flex items-center justify-center rounded-md hover:bg-slate-100 text-slate-600"
                      ><MinusIcon className="h-4 w-4" /></button>
                      <input
                        type="number"
                        min={0}
                        value={l.qty}
                        onChange={(e) => onSet(l.productId, Math.max(0, Number(e.target.value)))}
                        className="w-12 text-center text-sm tabular-nums bg-transparent outline-none border-b border-slate-200 focus:border-slate-500"
                      />
                      <button
                        onClick={() => onAdjust(l.productId, 1)}
                        className="h-7 w-7 flex items-center justify-center rounded-md hover:bg-slate-100 text-slate-600"
                      ><PlusIcon className="h-4 w-4" /></button>
                      <button
                        onClick={() => onSet(l.productId, 0)}
                        className="h-7 w-7 flex items-center justify-center rounded-md hover:bg-red-50 text-slate-400 hover:text-red-600 ml-1"
                      ><XMarkIcon className="h-4 w-4" /></button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={onContinue}
          disabled={cart.length === 0}
          data-demo-target="transfer.confirm"
          className="px-4 py-2.5 text-sm font-medium bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors duration-150 disabled:opacity-50"
        >
          Confirm transfer · {totalUnits} units
        </button>
      </div>
    </div>
  );
}

function InTransit({ from, to, units }: { from: Branch; to: Branch; units: number }) {
  return (
    <div className="py-12 flex flex-col items-center justify-center">
      <div className="relative w-full max-w-lg h-20 mb-6">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-slate-200" />
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-slate-900 origin-left" style={{ animation: "scaleX 1.6s ease-in-out forwards" }} />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-slate-100 rounded-full border-2 border-slate-900 flex items-center justify-center text-slate-700">
          <BuildingStorefrontIcon className="h-5 w-5" />
        </div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-10 h-10 bg-slate-100 rounded-full border-2 border-slate-200 flex items-center justify-center text-slate-700">
          <BuildingStorefrontIcon className="h-5 w-5" />
        </div>
        <motion.div
          initial={{ left: "0%" }}
          animate={{ left: "100%" }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-lg"
        >
          <TruckIcon className="h-6 w-6" />
        </motion.div>
      </div>
      <p className="text-sm font-medium text-slate-900">Transferring {units} units</p>
      <p className="text-xs text-slate-500 mt-1">{from.name} → {to.name}</p>
      <style>{`@keyframes scaleX { from { transform: scaleX(0); translate: 0 -50%; } to { transform: scaleX(1); translate: 0 -50%; } }`}</style>
    </div>
  );
}

function Confirmed({ transfer, from, to, onReset }: { transfer: Transfer; from: Branch; to: Branch; onReset: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        key="confirmed"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-8 flex flex-col items-center text-center"
      >
        <div className="h-12 w-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
          <CheckCircleIcon className="h-7 w-7" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900">Transfer dispatched</h3>
        <p className="text-sm text-slate-500 mt-1">
          {transfer.itemCount} units · <span className="font-mono">{transfer.id}</span>
        </p>
        <div className="text-sm text-slate-700 mt-4 inline-flex items-center gap-2">
          <span className="font-medium">{from.name}</span>
          <ArrowRightIcon className="h-4 w-4 text-slate-400" />
          <span className="font-medium">{to.name}</span>
        </div>
        <button
          onClick={onReset}
          className="mt-6 px-4 py-2 text-sm font-medium bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors duration-150"
        >
          New transfer
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
