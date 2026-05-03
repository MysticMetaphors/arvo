"use client"

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BellIcon,
  CubeIcon,
  ShieldCheckIcon,
  UserPlusIcon,
  Cog6ToothIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import { Notification, initialNotifications, relativeTime } from "@/data/demo/inventoryData";
import { usePersistedState } from "./usePersistedState";

const iconFor: Record<Notification["category"], typeof BellIcon> = {
  stock: CubeIcon,
  vendor: TruckIcon,
  security: ShieldCheckIcon,
  customer: UserPlusIcon,
  system: Cog6ToothIcon,
};

const tintFor: Record<Notification["category"], string> = {
  stock: "text-slate-600 bg-slate-100",
  vendor: "text-amber-600 bg-amber-50",
  security: "text-red-600 bg-red-50",
  customer: "text-emerald-600 bg-emerald-50",
  system: "text-slate-600 bg-slate-100",
};

export function NotificationCenter() {
  const [items, setItems] = usePersistedState<Notification[]>(
    "notifications",
    initialNotifications
  );
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const unreadCount = useMemo(() => items.filter(i => i.unread).length, [items]);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const markAllRead = () => setItems(items.map(i => ({ ...i, unread: false })));
  const dismiss = (id: number) => setItems(items.filter(i => i.id !== id));

  return (
    <div ref={ref} className="relative" data-demo-target="header.notifications">
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Notifications"
        className="relative h-9 w-9 flex items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 transition-colors duration-150"
      >
        <BellIcon className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 h-4 min-w-[16px] px-1 bg-red-600 text-white text-[10px] font-medium rounded-full flex items-center justify-center tabular-nums">
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-[360px] max-w-[90vw] bg-white rounded-xl border border-slate-200 shadow-xl z-40 overflow-hidden"
          >
            <header className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-base font-semibold text-slate-900">Notifications</h3>
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors duration-150"
                >Mark all read</button>
              )}
            </header>
            <ul className="max-h-[420px] overflow-y-auto divide-y divide-slate-100">
              {items.length === 0 && (
                <li className="px-5 py-12 text-center text-slate-400 text-sm">
                  You're all caught up.
                </li>
              )}
              {items.map(n => {
                const Icon = iconFor[n.category];
                const tint = tintFor[n.category];
                return (
                  <li
                    key={n.id}
                    className={`px-5 py-3 flex gap-3 group transition-colors duration-150 ${n.unread ? "bg-slate-50/50" : ""}`}
                  >
                    <span className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${tint}`}>
                      <Icon className="h-4 w-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-medium text-slate-900 leading-tight">{n.title}</p>
                        <span className="text-xs text-slate-400 shrink-0 tabular-nums">{relativeTime(n.minutesAgo)}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">{n.body}</p>
                      <button
                        onClick={() => dismiss(n.id)}
                        className="text-xs text-slate-400 hover:text-slate-900 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                      >Dismiss</button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
