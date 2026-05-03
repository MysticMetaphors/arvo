// Demo Mode autoplay timeline. Each scene is an array of timed steps.

import { DEMO_TARGETS } from "./demoTargets";

export type Step =
  | { kind: "move"; target: string; ms?: number }
  | { kind: "click"; target: string; ms?: number }
  | { kind: "type"; target: string; text: string; perCharMs?: number }
  | { kind: "wait"; ms: number }
  | { kind: "highlight"; target: string; ms?: number }
  | { kind: "caption"; text: string; ms?: number }
  | { kind: "nav"; target: string }
  | { kind: "escape" };

export interface Scene {
  id: string;
  title: string;
  steps: Step[];
}

export const DEMO_SCRIPT: Scene[] = [
  {
    id: "login",
    title: "Sign in",
    steps: [
      { kind: "caption", text: "Welcome to Nexus — let me show you around.", ms: 2200 },
      { kind: "move", target: DEMO_TARGETS.LOGIN_USERNAME },
      { kind: "click", target: DEMO_TARGETS.LOGIN_USERNAME },
      { kind: "type", target: DEMO_TARGETS.LOGIN_USERNAME, text: "admin", perCharMs: 70 },
      { kind: "wait", ms: 200 },
      { kind: "click", target: DEMO_TARGETS.LOGIN_PASSWORD },
      { kind: "type", target: DEMO_TARGETS.LOGIN_PASSWORD, text: "demo123", perCharMs: 70 },
      { kind: "wait", ms: 300 },
      { kind: "click", target: DEMO_TARGETS.LOGIN_SIGNIN },
      { kind: "wait", ms: 1400 },
    ],
  },
  {
    id: "dashboard",
    title: "Dashboard tour",
    steps: [
      { kind: "caption", text: "Dashboard with live KPIs, AI insights, and a streaming activity feed.", ms: 2400 },
      { kind: "highlight", target: DEMO_TARGETS.DASH_ACTIVITY, ms: 1600 },
      { kind: "wait", ms: 600 },
      { kind: "caption", text: "AI flagged Helios 14 Pro as low-stock. Let's draft a PO.", ms: 2200 },
      { kind: "click", target: DEMO_TARGETS.DASH_GENERATE_PO },
      { kind: "wait", ms: 1000 },
    ],
  },
  {
    id: "po",
    title: "Generate PO",
    steps: [
      { kind: "caption", text: "PO Builder — vendor preselected, line item suggested.", ms: 2200 },
      { kind: "wait", ms: 1200 },
      { kind: "click", target: DEMO_TARGETS.PO_SEND },
      { kind: "wait", ms: 1400 },
      { kind: "caption", text: "PO sent. Vendor acknowledged with a confirmation number.", ms: 2200 },
      { kind: "wait", ms: 600 },
      { kind: "escape" },
      { kind: "wait", ms: 500 },
    ],
  },
  {
    id: "inventory",
    title: "Inventory + bulk",
    steps: [
      { kind: "caption", text: "24 products with branded names and varied stock levels.", ms: 2200 },
      { kind: "click", target: DEMO_TARGETS.NAV_INVENTORY },
      { kind: "wait", ms: 900 },
      { kind: "caption", text: "Add Product opens a slide-over with full validation.", ms: 2200 },
      { kind: "click", target: DEMO_TARGETS.INV_ADD_PRODUCT },
      { kind: "wait", ms: 1400 },
      { kind: "escape" },
      { kind: "wait", ms: 500 },
      { kind: "caption", text: "Bulk select supports CSV export, price adjustment, category change.", ms: 2200 },
      { kind: "wait", ms: 700 },
    ],
  },
  {
    id: "vendors",
    title: "Vendors",
    steps: [
      { kind: "click", target: DEMO_TARGETS.NAV_VENDORS },
      { kind: "wait", ms: 1000 },
      { kind: "caption", text: "Vendor portal with lead times, on-time delivery, and PO history.", ms: 2400 },
      { kind: "wait", ms: 1000 },
    ],
  },
  {
    id: "transfer",
    title: "Stock Transfer",
    steps: [
      { kind: "click", target: DEMO_TARGETS.NAV_TRANSFERS },
      { kind: "wait", ms: 1000 },
      { kind: "caption", text: "Inter-branch transfers — pick source, destination, items, confirm.", ms: 2400 },
      { kind: "wait", ms: 1200 },
    ],
  },
  {
    id: "ai",
    title: "AI Assistant",
    steps: [
      { kind: "caption", text: "Built-in AI copilot for restock recommendations and forecasting.", ms: 2200 },
      { kind: "click", target: DEMO_TARGETS.AI_FAB },
      { kind: "wait", ms: 800 },
      { kind: "click", target: DEMO_TARGETS.AI_CHIP("restock") },
      { kind: "wait", ms: 2200 },
      { kind: "escape" },
      { kind: "wait", ms: 500 },
    ],
  },
  {
    id: "wrap",
    title: "Wrap",
    steps: [
      { kind: "caption", text: "Works online or offline — your changes sync automatically.", ms: 2600 },
      { kind: "wait", ms: 600 },
    ],
  },
];

function stepDurationMs(st: Step): number {
  if (st.kind === "wait") return st.ms;
  if (st.kind === "type") return st.text.length * (st.perCharMs ?? 60);
  if (st.kind === "nav") return 400;
  if (st.kind === "escape") return 200;
  return st.ms ?? 600;
}

export const DEMO_SCRIPT_TOTAL_MS = DEMO_SCRIPT.reduce(
  (sum, s) => sum + s.steps.reduce((acc, st) => acc + stepDurationMs(st), 0),
  0
);
