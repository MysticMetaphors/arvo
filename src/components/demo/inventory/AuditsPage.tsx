"use client"

import { useMemo, useState } from "react";
import {
  MagnifyingGlassIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import { usePersistedState } from "./usePersistedState";
import {
  Log,
  initialLogs,
  relativeTime,
  clockTime,
} from "@/data/demo/inventoryData";

type FilterCategory = "all" | Log["category"];
type DateRange = "today" | "7d" | "30d" | "all";

const CATEGORY_LABEL: Record<FilterCategory, string> = {
  all: "All",
  security: "Security",
  inventory: "Inventory",
  user: "Users",
  system: "System",
  error: "Errors",
};

const dotFor: Record<Log["category"], string> = {
  security: "bg-red-500",
  inventory: "bg-emerald-500",
  user: "bg-slate-400",
  system: "bg-slate-400",
  error: "bg-amber-500",
};

const PAGE_SIZE = 25;

interface AuditsPageProps {
  isMobile: boolean;
}

export function AuditsPage({ isMobile: _isMobile }: AuditsPageProps) {
  const [logs] = usePersistedState<Log[]>("auditLogs", initialLogs);

  const [category, setCategory] = useState<FilterCategory>("all");
  const [range, setRange] = useState<DateRange>("all");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const [expanded, setExpanded] = useState<number | null>(null);

  const now = useMemo(() => new Date(), []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return logs.filter((l) => {
      if (category !== "all" && l.category !== category) return false;
      if (range === "today" && l.minutesAgo > 60 * 24) return false;
      if (range === "7d" && l.minutesAgo > 60 * 24 * 7) return false;
      if (range === "30d" && l.minutesAgo > 60 * 24 * 30) return false;
      if (q && !`${l.action} ${l.user} ${l.ip ?? ""}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [logs, category, range, query]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  return (
    <div className="space-y-5" data-demo-stagger>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Audit History</h2>
          <p className="text-sm text-slate-500 mt-0.5">{filtered.length.toLocaleString()} events</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
        <div className="flex items-center gap-2 flex-wrap">
          {(Object.keys(CATEGORY_LABEL) as FilterCategory[]).map((c) => (
            <button
              key={c}
              onClick={() => { setCategory(c); setPage(0); }}
              data-demo-target={`audits.filter-${c}`}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors duration-150 ${
                category === c
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {CATEGORY_LABEL[c]}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[220px]">
            <MagnifyingGlassIcon className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(0); }}
              placeholder="Search action, user, IP…"
              className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-slate-300 outline-none transition-shadow duration-150"
            />
          </div>
          <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1">
            {(["today","7d","30d","all"] as DateRange[]).map((r) => (
              <button
                key={r}
                onClick={() => { setRange(r); setPage(0); }}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors duration-150 ${
                  range === r ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {r === "today" ? "Today" : r === "all" ? "All time" : r}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="text-left px-6 py-3 font-medium w-8"></th>
              <th className="text-left px-6 py-3 font-medium">Action</th>
              <th className="text-left px-6 py-3 font-medium">Actor</th>
              <th className="text-left px-6 py-3 font-medium">IP</th>
              <th className="text-right px-6 py-3 font-medium">Time</th>
              <th className="text-left px-6 py-3 font-medium w-8"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {pageItems.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-sm text-slate-400">
                  No matching events.
                </td>
              </tr>
            )}
            {pageItems.map((log) => (
              <Row
                key={log.id}
                log={log}
                expanded={expanded === log.id}
                now={now}
                onToggle={() => setExpanded(expanded === log.id ? null : log.id)}
              />
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        {filtered.length > PAGE_SIZE && (
          <div className="px-6 py-3 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500">
            <span>
              {page * PAGE_SIZE + 1}–{Math.min(filtered.length, (page + 1) * PAGE_SIZE)} of {filtered.length}
            </span>
            <div className="flex gap-1">
              <button
                onClick={() => setPage(Math.max(0, page - 1))}
                disabled={page === 0}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors duration-150 disabled:opacity-40"
              >Previous</button>
              <button
                onClick={() => setPage(Math.min(pages - 1, page + 1))}
                disabled={page >= pages - 1}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors duration-150 disabled:opacity-40"
              >Next</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Row({ log, expanded, onToggle, now }: { log: Log; expanded: boolean; onToggle: () => void; now: Date }) {
  const hasDetail = log.detail && Object.keys(log.detail).length > 0;
  return (
    <>
      <tr className="hover:bg-slate-50 transition-colors duration-150">
        <td className="px-6 py-3.5">
          <span className={`block w-2 h-2 rounded-full ${dotFor[log.category]}`}></span>
        </td>
        <td className="px-6 py-3.5">
          <div className="font-medium text-slate-900">{log.action}</div>
          <div className="text-xs text-slate-400 capitalize">{log.category}</div>
        </td>
        <td className="px-6 py-3.5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-slate-100 rounded-full flex items-center justify-center text-xs font-medium text-slate-700 shrink-0">
              {log.user[0]?.toUpperCase()}
            </div>
            <span className="text-slate-700">{log.user}</span>
          </div>
        </td>
        <td className="px-6 py-3.5 text-slate-500 font-mono text-xs">{log.ip ?? "—"}</td>
        <td className="px-6 py-3.5 text-right">
          <div className="text-slate-700 tabular-nums">{clockTime(log.minutesAgo, now)}</div>
          <div className="text-xs text-slate-400 tabular-nums">{relativeTime(log.minutesAgo)}</div>
        </td>
        <td className="px-3 py-3.5">
          {hasDetail && (
            <button
              onClick={onToggle}
              aria-label={expanded ? "Collapse" : "Expand"}
              className="text-slate-400 hover:text-slate-700 transition-colors duration-150"
            >
              {expanded ? <ChevronUpIcon className="h-4 w-4" /> : <ChevronDownIcon className="h-4 w-4" />}
            </button>
          )}
        </td>
      </tr>
      {expanded && hasDetail && (
        <tr>
          <td colSpan={6} className="px-6 pb-4">
            <pre className="text-xs bg-slate-50 border border-slate-200 rounded-lg p-3 overflow-x-auto text-slate-700">
{JSON.stringify(log.detail, null, 2)}
            </pre>
          </td>
        </tr>
      )}
    </>
  );
}
