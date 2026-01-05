"use client"

import { useState } from "react";
import ControlPanel from "@/components/preview/ControlPanel";
import WebsiteFrame from "@/components/preview/WebsiteFrame";

export type Tier = "starter" | "growth" | "professional" | "ecommerce";
export type PageType = "home" | "about" | "contact" | "services" | "portfolio" | "blog" | "shop" | "custom1" | "custom2";
export type FeatureType = "booking" | "chat" | "analytics" | "membership" | "shipping";

export interface SiteConfig {
  businessName: string;
  tier: Tier;
  themeColor: string;
  selectedPages: PageType[]; 
  activePage: PageType;
  selectedFeatures: FeatureType[]; 
}

export default function PreviewPage() {
  const [config, setConfig] = useState<SiteConfig>({
    businessName: "My Business",
    tier: "starter",
    themeColor: "#3b82f6",
    selectedPages: ["home", "about", "contact"],
    activePage: "home",
    selectedFeatures: [],
  });

  return (
    <main className="fixed inset-0 z-[90] bg-black-primary pt-28 pb-4 px-4 md:px-6 flex flex-col lg:flex-row gap-6 overflow-hidden">
      <aside className="w-full lg:w-80 shrink-0 h-full flex flex-col z-50">
        <ControlPanel config={config} setConfig={setConfig} />
      </aside>

      <section className="flex-1 h-full min-h-0 relative z-40">
        <WebsiteFrame config={config} setConfig={setConfig} />
      </section>
    </main>
  );
}