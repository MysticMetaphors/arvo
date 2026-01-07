"use client"

import { useEffect, useState } from "react";
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
  screenView: 'desktop' | 'tablet' | 'mobile';
  togglePanel: boolean;
}

export default function PreviewPage() {
  const [config, setConfig] = useState<SiteConfig>({
    businessName: "My Business",
    tier: "starter",
    themeColor: "#3b82f6",
    selectedPages: ["home", "about", "contact"],
    activePage: "home",
    selectedFeatures: [],
    screenView: 'desktop',
    togglePanel: false,
  });

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 640;
      setConfig((prev) => ({
        ...prev,
        screenView: isMobile ? 'mobile' : 'desktop'
      }));
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <main className="fixed inset-0 z-[90] bg-white dark:bg-black-primary pt-28 pb-4 px-4 lg:px-6 flex flex-col lg:flex-row gap-6 overflow-hidden">
      <aside className={`w-full lg:w-80 shrink-0 h-full flex flex-col z-50 ${config.togglePanel ? 'block' : 'hidden lg:block'}`}>
        <ControlPanel config={config} setConfig={setConfig} />
      </aside>

      <section className="flex-1 h-full min-h-0 relative z-40">
        <button onClick={() => setConfig({ ...config, togglePanel: true })} className="mb-4 visible lg:hidden px-2 py-1 text-sm rounded-sm bg-darkgreen-primary dark:bg-green-primary text-white dark:text-gray-800 font-semibold flex items-center gap-2 transition-all">
          Back
        </button>
        <WebsiteFrame config={config} setConfig={setConfig} />
      </section>
    </main>
  );
}