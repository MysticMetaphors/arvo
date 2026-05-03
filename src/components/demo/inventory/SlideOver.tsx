"use client"

import { ReactNode, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface SlideOverProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  width?: "sm" | "md" | "lg";
  children: ReactNode;
  footer?: ReactNode;
  isMobile?: boolean;
  demoTarget?: string;
}

const widthClass = {
  sm: "md:w-[420px]",
  md: "md:w-[520px]",
  lg: "md:w-[640px]",
};

export function SlideOver({
  open,
  onClose,
  title,
  description,
  width = "md",
  children,
  footer,
  isMobile,
  demoTarget,
}: SlideOverProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="absolute inset-0 z-50 flex" data-demo-target={demoTarget}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />
          <motion.aside
            initial={isMobile ? { y: "100%" } : { x: "100%" }}
            animate={isMobile ? { y: 0 } : { x: 0 }}
            exit={isMobile ? { y: "100%" } : { x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            className={[
              "relative ml-auto bg-white shadow-xl flex flex-col",
              isMobile
                ? "w-full mt-auto rounded-t-2xl max-h-[92%]"
                : `w-full ${widthClass[width]} h-full rounded-l-2xl`,
            ].join(" ")}
          >
            <header className="flex items-start justify-between gap-4 px-6 py-5 border-b border-slate-200 shrink-0">
              <div className="min-w-0">
                <h2 className="text-base font-semibold text-slate-900 truncate">
                  {title}
                </h2>
                {description && (
                  <p className="text-xs text-slate-500 mt-1">{description}</p>
                )}
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="text-slate-400 hover:text-slate-700 transition-colors duration-150"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </header>
            <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>
            {footer && (
              <footer className="px-6 py-4 border-t border-slate-200 bg-slate-50 shrink-0">
                {footer}
              </footer>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
