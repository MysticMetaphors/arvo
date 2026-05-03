"use client"

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowPathIcon,
  ArrowRightOnRectangleIcon,
  UserIcon,
  Squares2X2Icon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { resetDemoState, switchProfile, usePersistedState } from "./usePersistedState";
import { profileMetas, getProfileSeeds } from "@/data/demo/inventoryProfiles";
import { ProfileId } from "@/data/demo/inventoryData";
import { SlideOver } from "./SlideOver";

interface UserMenuProps {
  name: string;
  role: string;
  onLogout: () => void;
}

export function UserMenu({ name, role, onLogout }: UserMenuProps) {
  const [activeProfile] = usePersistedState<ProfileId>("demoProfile", "retail");
  const [open, setOpen] = useState(false);
  const [confirmingReset, setConfirmingReset] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setConfirmingReset(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  useEffect(() => {
    if (!confirmingReset) return;
    const t = setTimeout(() => setConfirmingReset(false), 3000);
    return () => clearTimeout(t);
  }, [confirmingReset]);

  const handleReset = () => {
    if (!confirmingReset) {
      setConfirmingReset(true);
      return;
    }
    resetDemoState();
  };

  return (
    <div ref={ref} className="relative" data-demo-target="header.user-menu">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-3 pl-4 border-l border-slate-200 hover:bg-slate-50 -my-2 py-2 pr-2 rounded-r-lg transition-colors duration-150"
      >
        <div className="text-right hidden md:block">
          <div className="text-sm font-medium text-slate-900">{name}</div>
          <div className="text-xs text-slate-500">{role}</div>
        </div>
        <div className="w-9 h-9 bg-slate-200 rounded-full flex items-center justify-center text-slate-600">
          <UserIcon className="h-5 w-5" />
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl border border-slate-200 shadow-xl z-40 overflow-hidden"
          >
            <div className="px-4 py-3 border-b border-slate-100">
              <div className="text-sm font-medium text-slate-900">{name}</div>
              <div className="text-xs text-slate-500">{role}</div>
            </div>
            <div className="py-1">
              <button
                onClick={() => { setOpen(false); setPickerOpen(true); }}
                data-demo-target="profile.switcher"
                className="w-full flex items-center justify-between gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors duration-150"
              >
                <span className="inline-flex items-center gap-3">
                  <Squares2X2Icon className="h-4 w-4" />
                  Switch Demo Profile
                </span>
                <span className="text-xs text-slate-400">
                  {profileMetas.find(p => p.id === activeProfile)?.name ?? "Retail"}
                </span>
              </button>
              <button
                onClick={handleReset}
                className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors duration-150 ${confirmingReset ? "text-red-600 bg-red-50" : "text-slate-700 hover:bg-slate-50"}`}
              >
                <ArrowPathIcon className="h-4 w-4" />
                {confirmingReset ? "Confirm reset?" : "Reset Demo Data"}
              </button>
              <button
                onClick={() => { setOpen(false); onLogout(); }}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors duration-150"
              >
                <ArrowRightOnRectangleIcon className="h-4 w-4" />
                Sign out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <SlideOver
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        isMobile={false}
        width="lg"
        title="Switch Demo Profile"
        description="Reseeds the demo to a different industry vertical. Existing data is replaced."
      >
        <div className="grid gap-3">
          {profileMetas.map(p => {
            const isActive = activeProfile === p.id;
            return (
              <button
                key={p.id}
                onClick={() => switchProfile(p.id, getProfileSeeds(p.id))}
                data-demo-target={`profile.option-${p.id}`}
                className={`text-left p-5 rounded-xl border transition-colors duration-150 ${
                  isActive ? "border-slate-900 bg-slate-50" : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">{p.name}</h3>
                    <p className="text-sm text-slate-500 mt-0.5">{p.blurb}</p>
                  </div>
                  {isActive && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium">
                      <CheckCircleIcon className="h-4 w-4" /> Active
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                  <span><span className="font-medium text-slate-700">{p.productIdLabel}:</span> <span className="font-mono">{p.productIdExample}</span></span>
                  <span className="text-slate-300">·</span>
                  <span className="truncate">{p.examples}</span>
                </div>
              </button>
            );
          })}
        </div>
      </SlideOver>
    </div>
  );
}
