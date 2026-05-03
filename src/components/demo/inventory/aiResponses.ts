// Scripted AI replies for the AIAssistant demo. Picks a response by matching
// the lowercase user input against `triggers`. Falls back to FALLBACK if no match.

export interface AIReply {
  text: string;
  card?: AICard;
  followUps?: string[];
}

export type AICard =
  | { kind: "topSellers"; items: { name: string; units: number; revenue: number }[] }
  | { kind: "restock"; items: { sku: string; name: string; daysToDeplete: number; suggestedQty: number }[] }
  | { kind: "anomalies"; items: { title: string; detail: string; severity: "info" | "warn" | "alert" }[] };

interface ScriptedReply {
  triggers: string[];
  reply: AIReply;
}

export const AI_QUICK_PROMPTS = [
  "Top sellers this week",
  "Restock recommendations",
  "Anomalies",
] as const;

const SCRIPTED: ScriptedReply[] = [
  {
    triggers: ["top sellers", "best selling", "this week"],
    reply: {
      text: "Top sellers this week — Helios 14 Pro is leading by a wide margin. Computing accounted for 64% of revenue.",
      card: {
        kind: "topSellers",
        items: [
          { name: "Helios 14 Pro",         units: 18, revenue: 34182 },
          { name: "Vantage 27\" 4K",       units: 14, revenue: 8106 },
          { name: "Aeris Mesh Chair",      units: 9,  revenue: 6561 },
          { name: "Tactus Mech K1",        units: 22, revenue: 4158 },
        ],
      },
      followUps: ["Restock recommendations", "Forecast next week"],
    },
  },
  {
    triggers: ["restock", "reorder", "recommendation"],
    reply: {
      text: "Three SKUs are projected to deplete within the next 5 days at current velocity. I can draft POs for each.",
      card: {
        kind: "restock",
        items: [
          { sku: "CMP-1401", name: "Helios 14 Pro",        daysToDeplete: 3.2, suggestedQty: 60 },
          { sku: "CMP-1601", name: "Helios 16 Studio",     daysToDeplete: 4.1, suggestedQty: 30 },
          { sku: "PER-A500", name: "Lumen Studio Mic",     daysToDeplete: 2.8, suggestedQty: 24 },
        ],
      },
      followUps: ["Draft a PO for Helios 14 Pro", "Top sellers this week"],
    },
  },
  {
    triggers: ["anomal", "weird", "unusual", "alert"],
    reply: {
      text: "Two anomalies in the last 24 hours.",
      card: {
        kind: "anomalies",
        items: [
          { title: "Drift Wireless Mouse stocked out at Manhattan HQ", detail: "Last sale 2h ago. Brooklyn Annex has 12 units.", severity: "warn" },
          { title: "Apex Manufacturing on-time delivery dropped to 87.6%", detail: "Q1 average was 94.2%. Worth a check-in.", severity: "info" },
        ],
      },
      followUps: ["Initiate transfer from Brooklyn", "Anything else?"],
    },
  },
  {
    triggers: ["draft", "po for helios", "purchase order"],
    reply: {
      text: "Drafting a PO for Helios 14 Pro × 60 units to Helios Computing Ltd. Estimated cost $94,800 (vendor cost ~70% of retail). Open the Vendors module and click 'Generate New PO' on Helios Computing — it'll prefill from this suggestion.",
      followUps: ["Restock recommendations", "Top sellers this week"],
    },
  },
  {
    triggers: ["forecast", "next week", "projection"],
    reply: {
      text: "Projected revenue for next week: $312k–$338k (+10–14% vs. current week) assuming Helios reorders complete on schedule. Confidence interval is wide because we have 2 critical-stock SKUs that could shift outcomes by ~$18k either way.",
      followUps: ["Restock recommendations"],
    },
  },
  {
    triggers: ["hello", "hi ", "hey"],
    reply: {
      text: "Hi — I'm Nexus AI. I can help with restock recommendations, sales analysis, anomalies, and PO drafts. What would you like to look at?",
      followUps: ["Top sellers this week", "Restock recommendations", "Anomalies"],
    },
  },
];

const FALLBACK: AIReply = {
  text: "I'm reviewing your inventory data for that — give me a moment. In the meantime, try one of the quick prompts.",
  followUps: ["Top sellers this week", "Restock recommendations", "Anomalies"],
};

export function aiReply(input: string): AIReply {
  const q = input.toLowerCase();
  for (const s of SCRIPTED) {
    if (s.triggers.some((t) => q.includes(t))) return s.reply;
  }
  return FALLBACK;
}
