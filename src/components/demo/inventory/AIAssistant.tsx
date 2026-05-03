"use client"

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SparklesIcon,
  XMarkIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { aiReply, AI_QUICK_PROMPTS, AIReply, AICard } from "./aiResponses";

interface Message {
  id: number;
  role: "user" | "assistant";
  text: string;
  card?: AICard;
  followUps?: string[];
}

const SEED_MESSAGES: Message[] = [
  {
    id: 1,
    role: "assistant",
    text: "Hi Riley — I noticed Helios 14 Pro stock is low. Want me to draft a PO, or show the forecast first?",
    followUps: ["Restock recommendations", "Top sellers this week", "Anomalies"],
  },
];

export function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(SEED_MESSAGES);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const nextIdRef = useRef(2);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing, open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const userMsg: Message = { id: nextIdRef.current++, role: "user", text: trimmed };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTyping(true);

    const r = aiReply(trimmed);
    setTimeout(() => {
      const assistantMsg: Message = { id: nextIdRef.current++, role: "assistant", text: r.text, card: r.card, followUps: r.followUps };
      setMessages((m) => [...m, assistantMsg]);
      setTyping(false);
    }, 700 + Math.random() * 600);
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setOpen(true)}
        data-demo-target="ai.fab"
        aria-label="Open AI Assistant"
        className="absolute bottom-6 right-6 h-12 w-12 rounded-full bg-slate-900 text-white shadow-lg hover:bg-slate-800 transition-colors duration-150 flex items-center justify-center z-30"
      >
        <SparklesIcon className="h-5 w-5" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <div className="absolute inset-0 z-40 pointer-events-none">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-slate-900/30 pointer-events-auto"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              className="absolute right-0 top-0 bottom-0 w-full md:w-[400px] bg-white border-l border-slate-200 shadow-xl flex flex-col pointer-events-auto"
            >
              <header className="px-5 py-4 border-b border-slate-200 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="h-9 w-9 rounded-full bg-slate-900 text-white flex items-center justify-center">
                    <SparklesIcon className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">Nexus AI</h3>
                    <p className="text-xs text-slate-500">Inventory copilot</p>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="text-slate-400 hover:text-slate-700 transition-colors duration-150"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </header>

              <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
                {messages.map((m) => <MessageBubble key={m.id} m={m} onFollowUp={send} />)}
                {typing && (
                  <div className="flex items-center gap-2 text-slate-400">
                    <div className="h-7 w-7 rounded-full bg-slate-100 flex items-center justify-center">
                      <SparklesIcon className="h-3.5 w-3.5 text-slate-500" />
                    </div>
                    <TypingDots />
                  </div>
                )}
              </div>

              <div className="px-4 pb-3 shrink-0">
                <div className="flex gap-1.5 overflow-x-auto pb-2 -mx-1 px-1">
                  {AI_QUICK_PROMPTS.map((p) => (
                    <button
                      key={p}
                      onClick={() => send(p)}
                      data-demo-target={`ai.chip-${p.split(" ")[0].toLowerCase()}`}
                      className="shrink-0 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-xs font-medium text-slate-700 transition-colors duration-150"
                    >{p}</button>
                  ))}
                </div>
              </div>

              <form
                onSubmit={(e) => { e.preventDefault(); send(input); }}
                className="px-4 pb-4 shrink-0"
              >
                <div className="flex items-center gap-2 border border-slate-200 rounded-xl p-1.5 focus-within:ring-2 focus-within:ring-slate-300 transition-shadow duration-150">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask anything about your inventory…"
                    className="flex-1 px-2 py-1.5 text-sm bg-transparent outline-none placeholder:text-slate-400"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim()}
                    aria-label="Send"
                    className="h-8 w-8 rounded-lg bg-slate-900 text-white flex items-center justify-center disabled:opacity-40 hover:bg-slate-800 transition-colors duration-150"
                  >
                    <PaperAirplaneIcon className="h-4 w-4" />
                  </button>
                </div>
              </form>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

function MessageBubble({ m, onFollowUp }: { m: Message; onFollowUp: (q: string) => void }) {
  if (m.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] bg-slate-900 text-white rounded-2xl rounded-tr-md px-4 py-2.5 text-sm">
          {m.text}
        </div>
      </div>
    );
  }
  return (
    <div className="flex gap-2.5 max-w-[92%]">
      <div className="h-7 w-7 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
        <SparklesIcon className="h-3.5 w-3.5 text-slate-500" />
      </div>
      <div className="space-y-2 min-w-0 flex-1">
        <div className="bg-slate-50 rounded-2xl rounded-tl-md px-4 py-2.5 text-sm text-slate-800 leading-snug">
          {m.text}
        </div>
        {m.card && <ResponseCard card={m.card} />}
        {m.followUps && m.followUps.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {m.followUps.map((f) => (
              <button
                key={f}
                onClick={() => onFollowUp(f)}
                className="px-2.5 py-1 rounded-full text-xs font-medium text-slate-600 bg-white border border-slate-200 hover:border-slate-400 hover:text-slate-900 transition-colors duration-150"
              >{f}</button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ResponseCard({ card }: { card: AICard }) {
  if (card.kind === "topSellers") {
    return (
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="text-left px-3 py-2 font-medium">Product</th>
              <th className="text-right px-3 py-2 font-medium">Units</th>
              <th className="text-right px-3 py-2 font-medium">Revenue</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {card.items.map((it) => (
              <tr key={it.name}>
                <td className="px-3 py-2 text-slate-900">{it.name}</td>
                <td className="px-3 py-2 text-right tabular-nums">{it.units}</td>
                <td className="px-3 py-2 text-right tabular-nums font-medium">${it.revenue.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  if (card.kind === "restock") {
    return (
      <div className="space-y-1.5">
        {card.items.map((it) => (
          <div key={it.sku} className="bg-white border border-slate-200 rounded-lg px-3 py-2 flex items-center justify-between gap-2 text-sm">
            <div className="min-w-0">
              <div className="font-medium text-slate-900 truncate">{it.name}</div>
              <div className="text-xs text-slate-500 tabular-nums">{it.sku} · depletes in {it.daysToDeplete}d</div>
            </div>
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-slate-900 text-white tabular-nums">+{it.suggestedQty}</span>
          </div>
        ))}
      </div>
    );
  }
  // anomalies
  const sev: Record<typeof card.items[number]["severity"], string> = {
    info: "bg-slate-50 text-slate-700 border-slate-200",
    warn: "bg-amber-50 text-amber-800 border-amber-200",
    alert: "bg-red-50 text-red-800 border-red-200",
  };
  return (
    <div className="space-y-1.5">
      {card.items.map((it) => (
        <div key={it.title} className={`rounded-lg px-3 py-2 border text-sm ${sev[it.severity]}`}>
          <div className="font-medium leading-tight">{it.title}</div>
          <div className="text-xs opacity-80 mt-0.5">{it.detail}</div>
        </div>
      ))}
    </div>
  );
}

function TypingDots() {
  return (
    <div className="flex gap-1 px-3 py-2 bg-slate-50 rounded-2xl rounded-tl-md">
      {[0, 1, 2].map(i => (
        <motion.span
          key={i}
          className="block h-1.5 w-1.5 rounded-full bg-slate-400"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </div>
  );
}
