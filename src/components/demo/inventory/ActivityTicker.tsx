"use client"

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCartIcon,
  CubeIcon,
  UserIcon,
  ShieldCheckIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import {
  ActivityEvent,
  initialActivityEvents,
  incomingActivityEvents,
  relativeTime,
} from "@/data/demo/inventoryData";

const VISIBLE = 8;

const iconFor: Record<ActivityEvent["category"], typeof ShoppingCartIcon> = {
  order: ShoppingCartIcon,
  stock: CubeIcon,
  user: UserIcon,
  po: TruckIcon,
  security: ShieldCheckIcon,
};

const tintFor: Record<ActivityEvent["category"], string> = {
  order: "bg-emerald-50 text-emerald-600",
  stock: "bg-slate-100 text-slate-600",
  user: "bg-slate-100 text-slate-600",
  po: "bg-amber-50 text-amber-600",
  security: "bg-red-50 text-red-600",
};

export function ActivityTicker() {
  const [events, setEvents] = useState<ActivityEvent[]>(() =>
    initialActivityEvents.slice(0, VISIBLE)
  );
  const [paused, setPaused] = useState(false);
  const nextIdRef = useRef(1000);
  const incomingIndexRef = useRef(0);

  const mountTime = useMemo(() => Date.now(), []);

  useEffect(() => {
    if (paused) return;
    const tick = () => {
      const template = incomingActivityEvents[incomingIndexRef.current % incomingActivityEvents.length];
      incomingIndexRef.current += 1;
      const fresh: ActivityEvent = {
        id: ++nextIdRef.current,
        category: template.category,
        message: template.message,
        actor: template.actor,
        minutesAgo: 0,
      };
      setEvents((prev) => [fresh, ...prev].slice(0, VISIBLE));
    };
    const delay = 4000 + Math.random() * 2000;
    const t = setTimeout(tick, delay);
    return () => clearTimeout(t);
  }, [events, paused]);

  return (
    <div
      className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      data-demo-target="dashboard.activity"
    >
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="relative inline-flex">
            <span className="absolute inline-flex h-2 w-2 rounded-full bg-emerald-500 opacity-75 animate-ping"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
          </span>
          <h3 className="text-base font-semibold text-slate-900">Live Activity</h3>
        </div>
        <span className="text-xs text-slate-400">
          {paused ? "Paused" : "Streaming"}
        </span>
      </div>
      <ul className="divide-y divide-slate-100 max-h-72 overflow-hidden">
        <AnimatePresence initial={false}>
          {events.map((e) => {
            const Icon = iconFor[e.category];
            const tint = tintFor[e.category];
            const delta = Math.max(0, Math.floor((Date.now() - mountTime) / 60000));
            const min = e.minutesAgo + delta;
            return (
              <motion.li
                key={e.id}
                layout
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="px-6 py-3 flex items-center gap-3 text-sm"
              >
                <span className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${tint}`}>
                  <Icon className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-slate-800 truncate">{e.message}</div>
                  <div className="text-xs text-slate-400">{e.actor}</div>
                </div>
                <span className="text-xs text-slate-400 tabular-nums shrink-0">
                  {min < 1 ? "just now" : relativeTime(min)}
                </span>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>
    </div>
  );
}
