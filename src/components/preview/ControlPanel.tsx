"use client"

import { FeatureType, PageType, SiteConfig, Tier } from "@/app/preview/page";
import Link from "next/link";
import { useState } from "react";

interface Props {
  config: SiteConfig;
  setConfig: (config: SiteConfig) => void;
}

export default function ControlPanel({ config, setConfig }: Props) {
  const views = [
    { id: 'desktop', icon: 'fa-desktop', label: 'Desktop' },
    { id: 'tablet', icon: 'fa-tablet-screen-button', label: 'Tablet' },
    { id: 'mobile', icon: 'fa-mobile-screen-button', label: 'Mobile' }
  ]

  const getPageLimit = (tier: Tier) => {
    if (tier === 'starter') return 3;
    if (tier === 'growth') return 7;
    return -1;
  };

  const handleTierChange = (newTier: Tier) => {
    let newPages = [...config.selectedPages];
    const newLimit = getPageLimit(newTier);

    if (newTier !== 'ecommerce') {
      newPages = newPages.filter(p => p !== 'shop');
    }

    if (newLimit !== -1 && newPages.length > newLimit) {
      const otherPages = newPages.filter(p => p !== 'home');
      const shuffled = otherPages.sort(() => 0.5 - Math.random());
      const selectedOthers = shuffled.slice(0, newLimit - 1);
      newPages = ['home', ...selectedOthers];
    }

    const newConfig = {
      ...config,
      tier: newTier,
      selectedPages: newPages,
      selectedFeatures: [] // Always reset features
    };

    // Reset active page if the current active page was removed
    if (!newPages.includes(newConfig.activePage)) {
      newConfig.activePage = 'home';
    }

    setConfig(newConfig);
  };

  const handleChange = (key: keyof SiteConfig, value: any) => {
    setConfig({ ...config, [key]: value });
  };

  const togglePage = (page: PageType, limit: number) => {
    const exists = config.selectedPages.includes(page);
    if (page === 'shop' && config.tier !== 'ecommerce') return;

    if (exists) {
      if (page === 'home') return;
      setConfig({ ...config, selectedPages: config.selectedPages.filter(p => p !== page) });
    } else {
      if (limit !== -1 && config.selectedPages.length >= limit) return;
      setConfig({ ...config, selectedPages: [...config.selectedPages, page] });
    }
  };

  const toggleFeature = (feature: FeatureType, limit: number) => {
    const exists = config.selectedFeatures.includes(feature);
    if (exists) {
      setConfig({ ...config, selectedFeatures: config.selectedFeatures.filter(f => f !== feature) });
    } else {
      if (limit !== -1 && config.selectedFeatures.length >= limit) return;
      setConfig({ ...config, selectedFeatures: [...config.selectedFeatures, feature] });
    }
  };

  const tiers: { id: Tier; label: string; price: string; icon: string }[] = [
    { id: "starter", label: "Starter", price: "$20", icon: "fa-paper-plane" },
    { id: "growth", label: "Growth", price: "$30", icon: "fa-arrow-trend-up" },
    { id: "professional", label: "Professional", price: "$1000", icon: "fa-gem" },
    { id: "ecommerce", label: "E-commerce", price: "Custom", icon: "fa-store" },
  ];

  const currentLimit = getPageLimit(config.tier);
  const getFeatureLimit = () => {
    if (config.tier === 'professional') return 4;
    if (config.tier === 'ecommerce') return 6;
    return 0;
  };

  // Helper to format page labels
  const getPageLabel = (p: string) => {
    if (p === 'custom1') return 'Custom Page 1';
    if (p === 'custom2') return 'Custom Page 2';
    return p;
  };

  return (
    <div className="bg-white dark:bg-gray-800/[0.50] border border-gray-200 dark:border-white/10 rounded-lg p-5 h-full flex flex-col gap-5 shadow-xl dark:shadow-2xl transition-colors duration-300">

      {/* Header */}
      <div className="shrink-0">
        <div className="flex items-center justify-between shrink-0 mb-3">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">
            Configurator
          </h2>

          <button onClick={() => setConfig({...config, togglePanel: false})} className="visible lg:hidden px-2 py-1 text-sm rounded-sm bg-darkgreen-primary dark:bg-green-primary text-white dark:text-gray-800 font-semibold flex items-center gap-2 transition-all">
              Preview
          </button>
        </div>
        <div className="relative group">
          <i className="fa-solid fa-pen absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-xs transition-colors group-focus-within:text-green-600 dark:group-focus-within:text-green-500"></i>
          <input
            type="text"
            value={config.businessName}
            onChange={(e) => handleChange("businessName", e.target.value)}
            className="w-full bg-gray-50 dark:bg-black-primary border border-gray-200 dark:border-gray-700 rounded-md pl-8 pr-4 py-2.5 text-sm text-gray-900 dark:text-white focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all placeholder-gray-400 dark:placeholder-gray-600"
            placeholder="Business Name"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto min-h-0 pr-1 flex flex-col gap-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">

        {/* Device View */}
        <div>
          <label className="block text-[10px] font-bold text-gray-500 mb-2 uppercase tracking-wider">Device View</label>
          <div className="grid grid-cols-3 gap-2">
            {views.map((view) => (
              <button
                key={view.id}
                onClick={() => setConfig({ ...config, screenView: view.id as 'desktop' | 'tablet' | 'mobile' })}
                className={`${view.label === 'Desktop' ? 'md:flex hidden' : ''} flex flex-col items-center justify-center p-2.5 rounded-md border transition-all duration-200 
                  ${config.screenView === view.id
                    ? "bg-gray-100 dark:bg-gray-700 border-gray-400 dark:border-gray-500 text-gray-900 dark:text-white shadow-inner"
                    : "bg-white dark:bg-black-primary border-gray-200 dark:border-gray-800 text-gray-400 dark:text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-600 dark:hover:text-gray-300"
                  }`}
              >
                <i className={`fa-solid ${view.icon} text-sm mb-1.5`}></i>
                <span className="text-[10px] font-semibold tracking-wide">{view.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tier Grid */}
        <div>
          <label className="block text-[10px] font-bold text-gray-500 mb-2 uppercase tracking-wider">Select Tier</label>
          <div className="grid grid-cols-2 gap-2">
            {tiers.map((t) => (
              <button
                key={t.id}
                onClick={() => handleTierChange(t.id)}
                className={`flex flex-col items-center justify-center p-3 rounded-md border-2 transition-all duration-200 ${config.tier === t.id
                  ? "bg-darkgreen-primary/5 dark:bg-green-primary/20 border-darkgreen-primary text-darkgreen-primary dark:text-green-primary"
                  : "bg-white dark:bg-black-primary border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600"
                  }`}
              >
                <i className={`fa-solid ${t.icon} text-lg mb-1`}></i>
                <span className="text-xs font-bold">{t.label}</span>
                <span className="text-[10px] opacity-70">{t.price}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Pages Selection */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Sample Pages</label>
            <span className={`text-[10px] px-2 py-0.5 rounded-full ${config.selectedPages.length === currentLimit ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-300' : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'}`}>
              {currentLimit === -1 ? 'Unlimited' : `${config.selectedPages.length} / ${currentLimit}`}
            </span>
          </div>
          <div className="grid grid-cols-1 gap-1.5">
            {(['home', 'about', 'services', 'contact', 'blog', 'shop', 'custom1', 'custom2'] as PageType[]).map((page) => {
              const isLocked = page === 'shop' && config.tier !== 'ecommerce';
              const isActive = config.selectedPages.includes(page);

              return (
                <button
                  key={page}
                  onClick={() => togglePage(page, currentLimit)}
                  disabled={isLocked || page === 'home'}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-xs transition-all border ${isActive
                    ? 'bg-darkgreen-primary/5 dark:bg-green-primary/10 border-darkgreen-primary dark:border-green-500/30 text-darkgreen-primary dark:text-green-primary'
                    : 'bg-white dark:bg-black-primary border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800'
                    } ${isLocked ? 'opacity-40 cursor-not-allowed' : ''}`}
                >
                  <span className="capitalize">{getPageLabel(page)}</span>
                  {isLocked
                    ? <i className="fa-solid fa-lock text-[10px]"></i>
                    : <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-darkgreen-primary dark:bg-green-primary' : 'bg-gray-300 dark:bg-gray-700'}`}></div>
                  }
                </button>
              )
            })}
          </div>
        </div>

        {/* Feature Selection (Conditional) */}
        {(config.tier === 'professional' || config.tier === 'ecommerce') ? (
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Sample Features</label>
              <span className={`text-[10px] px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300`}>
                {config.selectedFeatures.length} / {getFeatureLimit()}
              </span>
            </div>
            <div className="grid grid-cols-1 gap-1.5">
              {(['booking', 'chat', 'analytics', 'shipping'] as FeatureType[]).map((ft) => {
                const isActive = config.selectedFeatures.includes(ft);
                return (
                  <button
                    key={ft}
                    onClick={() => toggleFeature(ft, getFeatureLimit())}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-xs transition-all border ${isActive
                      ? 'bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/30 text-blue-700 dark:text-blue-300'
                      : 'bg-white dark:bg-black-primary border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                  >
                    <span className="capitalize">{ft}</span>
                    <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-700'}`}></div>
                  </button>
                )
              })}
            </div>

            {/* CUSTOM CONTACT BUTTON */}
            <Link
              href="/contact"
              className="w-full rounded-md text-center mt-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400 text-[10px] hover:border-gray-900 dark:hover:border-white hover:text-gray-900 dark:hover:text-white transition-colors uppercase tracking-wide"
            >
              Need something custom? Contact Us
            </Link>
          </div>
        ) : (
          <div className="p-4 border border-dashed border-gray-200 dark:border-gray-800 rounded-md text-center">
            <p className="text-[10px] text-gray-500">Upgrade to Professional to unlock custom features.</p>
          </div>
        )}

      </div>

      {/* Footer */}
      <div className="shrink-0 pt-4 border-t border-gray-200 dark:border-gray-800">
        <label className="block text-[10px] font-bold text-gray-500 mb-2 uppercase tracking-wider">Sample Brand Color</label>
        <div className="flex gap-3 justify-between">
          {["#3b82f6", "#10b981", "#ef4444", "#f59e0b", "#8b5cf6"].map((color) => (
            <button
              key={color}
              onClick={() => handleChange("themeColor", color)}
              className={`w-6 h-6 rounded-full border border-gray-200 dark:border-gray-600 transition-all hover:scale-110 ${config.themeColor === color ? 'ring-2 ring-gray-900 dark:ring-white ring-offset-2 ring-offset-white dark:ring-offset-black border-transparent' : ''}`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}