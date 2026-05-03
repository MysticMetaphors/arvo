"use client"

import { DeviceMode } from "@/app/demo/inventory/page";
import { useState, useEffect } from "react";
import {
  BanknotesIcon,
  UsersIcon,
  ArchiveBoxIcon,
  ListBulletIcon,
  ArrowTrendingUpIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { ActivityTicker } from "./ActivityTicker";

interface DashboardChartsProps {
  deviceMode: DeviceMode;
  onGeneratePO?: () => void;
}

export function DashboardCharts({ deviceMode, onGeneratePO }: DashboardChartsProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <DashboardSkeleton />;

  const isMobile = deviceMode === "mobile";

  return (
    <div className="space-y-6" data-demo-stagger>
      {/* AI Insights Panel */}
      <div className="bg-slate-900 text-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-2 text-slate-400 text-xs font-medium uppercase tracking-wide">
          <SparklesIcon className="h-4 w-4" />
          Nexus AI
        </div>
        <h3 className="text-lg font-semibold mb-2">
          Revenue up 8.4% week-over-week, driven by Helios 14 Pro reorders.
        </h3>
        <p className="text-slate-300 text-sm max-w-2xl mb-5">
          Helios 14 Pro projected to deplete in 3.2 days at the current 14-unit/day velocity.
          Recommended PO: 60 units, est. $94,800.
        </p>
        <button
          onClick={onGeneratePO}
          data-demo-target="dashboard.generate-po"
          className="bg-white text-slate-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-100 transition-colors duration-150"
        >
          Generate PO
        </button>
      </div>

      {/* KPI Grid */}
      <div className={`grid gap-4 ${isMobile ? "grid-cols-1" : "grid-cols-2 lg:grid-cols-4"}`} data-demo-stagger="fast">
        <StatCard title="Total Revenue"  value="$284,712"        trend="+8.4%"            positive  Icon={BanknotesIcon} />
        <StatCard title="Active Users"   value="47"              trend="+3"               positive  Icon={UsersIcon} />
        <StatCard title="Stock Alerts"   value="7 low / 2 critical" trend="+3 today"     positive={false} Icon={ArchiveBoxIcon} />
        <StatCard title="Pending Tasks"  value="18"              trend="4 overdue"        positive={false} Icon={ListBulletIcon} />
      </div>

      {/* Live Activity */}
      <ActivityTicker />

      {/* Charts */}
      <div className={`grid gap-6 ${isMobile ? "grid-cols-1" : "grid-cols-3"}`}>
        {/* Revenue Overview */}
        <div className={`${isMobile ? "" : "col-span-2"} bg-white p-6 rounded-xl border border-slate-200 shadow-sm`}>
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-base font-semibold text-slate-900">Revenue Overview</h4>
            <span className="text-xs text-slate-500 inline-flex items-center gap-1">
              <ArrowTrendingUpIcon className="h-4 w-4 text-emerald-600" />
              Last 7 days
            </span>
          </div>
          <RevenueLineChart />
        </div>

        {/* Stock Value */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <h4 className="text-base font-semibold text-slate-900 mb-4">Stock Value</h4>
          <StockDonut />
        </div>
      </div>
    </div>
  );
}

// --- KPI card ----------------------------------------------------------------

function StatCard({
  title,
  value,
  trend,
  positive,
  Icon,
}: {
  title: string;
  value: string;
  trend: string;
  positive: boolean;
  Icon: typeof BanknotesIcon;
}) {
  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
      <div className="flex justify-between items-start mb-3">
        <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
          <Icon className="h-5 w-5" />
        </div>
        <span
          className={`text-xs font-medium px-2 py-1 rounded-full ${
            positive ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
          }`}
        >
          {trend}
        </span>
      </div>
      <h3 className="text-2xl font-semibold text-slate-900 tabular-nums">{value}</h3>
      <p className="text-xs text-slate-500 uppercase tracking-wide mt-1">{title}</p>
    </div>
  );
}

// --- Revenue line chart (data-driven, hover tooltip) -------------------------

const REVENUE_DATA = [
  { day: "Mon", value: 38400 },
  { day: "Tue", value: 41200 },
  { day: "Wed", value: 36800 },
  { day: "Thu", value: 43500 },
  { day: "Fri", value: 47200 },
  { day: "Sat", value: 39600 },
  { day: "Sun", value: 38012 },
];

function RevenueLineChart() {
  const [hovered, setHovered] = useState<number | null>(null);
  const W = 100;
  const H = 50;
  const padX = 4;
  const padY = 6;
  const min = Math.min(...REVENUE_DATA.map(d => d.value));
  const max = Math.max(...REVENUE_DATA.map(d => d.value));
  const span = max - min || 1;

  const points = REVENUE_DATA.map((d, i) => {
    const x = padX + (i * (W - padX * 2)) / (REVENUE_DATA.length - 1);
    const y = H - padY - ((d.value - min) / span) * (H - padY * 2);
    return { x, y, ...d, i };
  });

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
  const areaPath = `${linePath} L${points[points.length - 1].x},${H} L${points[0].x},${H} Z`;

  return (
    <div className="h-64 relative">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="w-full h-full">
        <defs>
          <linearGradient id="revArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0f172a" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line x1="0" y1={H * 0.25} x2={W} y2={H * 0.25} stroke="#e2e8f0" strokeWidth="0.3" />
        <line x1="0" y1={H * 0.5}  x2={W} y2={H * 0.5}  stroke="#e2e8f0" strokeWidth="0.3" />
        <line x1="0" y1={H * 0.75} x2={W} y2={H * 0.75} stroke="#e2e8f0" strokeWidth="0.3" />

        <path d={areaPath} fill="url(#revArea)" />
        <path d={linePath} fill="none" stroke="#0f172a" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />

        {points.map(p => (
          <g key={p.i}>
            <circle cx={p.x} cy={p.y} r="0.9" fill="#fff" stroke="#0f172a" strokeWidth="0.5" />
            <rect
              x={p.x - 5}
              y={0}
              width="10"
              height={H}
              fill="transparent"
              onMouseEnter={() => setHovered(p.i)}
              onMouseLeave={() => setHovered(null)}
            />
          </g>
        ))}
      </svg>

      <div className="absolute inset-x-0 bottom-0 flex justify-between px-1 text-[10px] text-slate-400 uppercase tracking-wide">
        {REVENUE_DATA.map(d => <span key={d.day}>{d.day}</span>)}
      </div>

      {hovered !== null && (
        <div
          className="absolute bg-slate-900 text-white text-xs rounded-lg px-3 py-2 shadow-md pointer-events-none -translate-x-1/2 -translate-y-full"
          style={{
            left: `${(points[hovered].x / W) * 100}%`,
            top: `${(points[hovered].y / H) * 100}%`,
          }}
        >
          <div className="font-medium">{points[hovered].day}</div>
          <div className="text-slate-300 tabular-nums">${points[hovered].value.toLocaleString()}</div>
        </div>
      )}
    </div>
  );
}

// --- Stock donut (3 segments, hover, no spin) --------------------------------

const STOCK_SEGMENTS = [
  { label: "Computing",   value: 184200, color: "#0f172a" },
  { label: "Furniture",   value: 71400,  color: "#475569" },
  { label: "Peripherals", value: 48600,  color: "#94a3b8" },
];

function StockDonut() {
  const [hovered, setHovered] = useState<number | null>(null);
  const total = STOCK_SEGMENTS.reduce((a, b) => a + b.value, 0);
  const C = 2 * Math.PI * 15.915;
  let offset = 0;
  const segs = STOCK_SEGMENTS.map((s, i) => {
    const len = (s.value / total) * C;
    const node = { ...s, len, offset };
    offset += len;
    return { ...node, i };
  });

  const center = hovered === null
    ? { label: "Total", value: `$${(total / 1000).toFixed(1)}k` }
    : { label: STOCK_SEGMENTS[hovered].label, value: `$${(STOCK_SEGMENTS[hovered].value / 1000).toFixed(1)}k` };

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 flex items-center justify-center relative">
        <svg viewBox="0 0 36 36" className="w-44 h-44 -rotate-90">
          <circle cx="18" cy="18" r="15.915" fill="none" stroke="#e2e8f0" strokeWidth="3.6" />
          {segs.map(s => (
            <circle
              key={s.i}
              cx="18"
              cy="18"
              r="15.915"
              fill="none"
              stroke={s.color}
              strokeWidth="3.6"
              strokeLinecap="butt"
              strokeDasharray={`${s.len} ${C - s.len}`}
              strokeDashoffset={-s.offset}
              opacity={hovered === null || hovered === s.i ? 1 : 0.3}
              onMouseEnter={() => setHovered(s.i)}
              onMouseLeave={() => setHovered(null)}
              className="transition-opacity duration-150 cursor-pointer"
            />
          ))}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-2xl font-semibold text-slate-900 tabular-nums">{center.value}</span>
          <span className="text-xs text-slate-500 mt-0.5">{center.label}</span>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        {STOCK_SEGMENTS.map((s, i) => (
          <div
            key={s.label}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            className="flex items-center justify-between text-xs cursor-pointer"
          >
            <span className="flex items-center gap-2 text-slate-700">
              <span className="w-2 h-2 rounded-full" style={{ background: s.color }}></span>
              {s.label}
            </span>
            <span className="font-medium text-slate-900 tabular-nums">${s.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Skeleton ----------------------------------------------------------------

function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-36 bg-slate-200 rounded-xl w-full"></div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map(i => <div key={i} className="h-28 bg-slate-200 rounded-xl"></div>)}
      </div>
      <div className="h-72 bg-slate-200 rounded-xl"></div>
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 h-72 bg-slate-200 rounded-xl"></div>
        <div className="h-72 bg-slate-200 rounded-xl"></div>
      </div>
    </div>
  );
}
