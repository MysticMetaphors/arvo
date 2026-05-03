"use client"

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDemoMode } from "./useDemoMode";

interface DemoModeProps {
  active: boolean;
  onExit: () => void;
}

export function DemoMode({ active, onExit }: DemoModeProps) {
  const cursorElRef = useRef<HTMLDivElement | null>(null);

  const { state } = useDemoMode({
    enabled: active,
    speed: 1,
    onExit,
    cursorTargetRef: cursorElRef,
  });

  // Hide system cursor, mark body for the demo-only animation system,
  // and inject click-ring keyframes once at mount.
  useEffect(() => {
    if (!active) return;
    document.body.classList.add("demo-mode");
    const style = document.createElement("style");
    style.setAttribute("data-demo-mode", "1");
    style.textContent = `
      body.demo-mode { cursor: none !important; }
      @keyframes demo-click-ring {
        0%   { transform: scale(0.4); opacity: 0.7; }
        100% { transform: scale(2.4); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
    return () => {
      style.remove();
      document.body.classList.remove("demo-mode");
    };
  }, [active]);

  if (!active) return null;

  return (
    <>
      {/* Highlight ring */}
      <AnimatePresence>
        {state.highlight && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed pointer-events-none z-[9998]"
            style={{
              left: state.highlight.left - 4,
              top: state.highlight.top - 4,
              width: state.highlight.width + 8,
              height: state.highlight.height + 8,
              borderRadius: 12,
              boxShadow: "0 0 0 3px rgba(15,23,42,0.9), 0 0 0 8px rgba(15,23,42,0.15)",
            }}
          />
        )}
      </AnimatePresence>

      {/* Virtual cursor — pinned to viewport (0,0), positioned by transform via ref */}
      <div
        ref={cursorElRef}
        className="pointer-events-none z-[9999]"
        style={{ position: "fixed", top: 0, left: 0, willChange: "transform" }}
      >
        <svg width="22" height="26" viewBox="0 0 22 26" className="drop-shadow-lg block">
          <path
            d="M2 2 L2 22 L7 17 L11 25 L14 23 L10 15 L17 15 Z"
            fill="white"
            stroke="#0f172a"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
        {state.cursor.clicking && (
          <span
            className="absolute -left-3 -top-3 w-8 h-8 rounded-full border-2 border-slate-900"
            style={{ animation: "demo-click-ring 0.45s ease-out forwards" }}
          />
        )}
      </div>

      {/* Caption */}
      <AnimatePresence mode="wait">
        {state.caption && (
          <motion.div
            key={state.caption}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="fixed left-1/2 -translate-x-1/2 z-[9997] max-w-2xl px-6 py-3 bg-slate-900/95 backdrop-blur text-white text-sm rounded-2xl shadow-xl text-center"
            style={{ bottom: 32 }}
          >
            {state.caption}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
