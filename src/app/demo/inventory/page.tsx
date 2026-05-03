"use client"

import { useEffect, useState } from "react";
import InventorySystem from "@/components/demo/inventory/InventorySystem";
import { DemoMode } from "@/components/demo/inventory/DemoMode";
import { profileMetas, getProfileSeeds } from "@/data/demo/inventoryProfiles";
import { switchProfile, usePersistedState } from "@/components/demo/inventory/usePersistedState";
import { ProfileId } from "@/data/demo/inventoryData";

export type DeviceMode = 'desktop' | 'tablet' | 'mobile';

const PROFILE_DOMAIN: Record<ProfileId, string> = {
  retail: "nexus-retail.demo",
  fb: "cafe-pos.demo",
  pharmacy: "pharmacy-rx.demo",
  autoparts: "autoshop-parts.demo",
};

export default function InventoryPage() {
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('desktop');
  const [chromeShown, setChromeShown] = useState(false);
  const [profilePickerOpen, setProfilePickerOpen] = useState(false);
  const [activeProfile] = usePersistedState<ProfileId>("demoProfile", "retail");
  const [demoActive, setDemoActive] = useState(false);

  // Trigger autoplay only on first mount when ?autoplay=1 is present.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("autoplay") === "1" && deviceMode !== "mobile") {
      setDemoActive(true);
    }
    // intentionally only react to mount + deviceMode flips
  }, [deviceMode]);

  // Hide / restore the global site nav, footer, banner, and scroll-to-top button.
  useEffect(() => {
    if (typeof document === "undefined") return;
    const targets: HTMLElement[] = [];
    document.querySelectorAll<HTMLElement>("body > nav, body > footer").forEach(el => targets.push(el));
    document.querySelectorAll<HTMLElement>("body > div.group.relative.overflow-hidden").forEach(el => targets.push(el));
    document.querySelectorAll<HTMLElement>("body > button[aria-label]").forEach(el => {
      if (/scroll/i.test(el.getAttribute("aria-label") ?? "")) targets.push(el);
    });

    const previous = targets.map(el => el.style.display);
    targets.forEach(el => {
      el.style.display = chromeShown ? "" : "none";
    });

    return () => {
      targets.forEach((el, i) => { el.style.display = previous[i]; });
    };
  }, [chromeShown]);

  const containerStyle = () => {
    switch (deviceMode) {
      case 'mobile':  return 'w-[375px] h-[760px] rounded-[30px] border-[8px] border-gray-800';
      case 'tablet':  return 'w-[768px] h-[900px] rounded-xl border border-gray-700';
      default:        return 'w-full max-w-[1600px] h-[calc(100vh-9rem)] min-h-[760px] rounded-xl border border-gray-700';
    }
  };

  const profile = profileMetas.find(p => p.id === activeProfile) ?? profileMetas[0];
  const url = `secure.${PROFILE_DOMAIN[profile.id]}/dashboard`;

  const pickProfile = (id: ProfileId) => {
    if (id === activeProfile) {
      setProfilePickerOpen(false);
      return;
    }
    // Reseed and reload — InventorySystem will pick up the new dataset.
    switchProfile(id, getProfileSeeds(id));
  };

  return (
    <main className="min-h-screen w-full bg-black-primary pt-6 pb-6 px-4 flex flex-col items-center font-sans">
      {/* Device toggle */}
      <div className="mb-4 flex items-center gap-4 bg-zinc-900 p-2 rounded-full border border-zinc-700 shadow-lg">
        <button onClick={() => setDeviceMode('desktop')} className={`px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 transition-all ${deviceMode === 'desktop' ? 'bg-green-primary text-gray-900' : 'text-zinc-400 hover:text-white'}`}>
          <i className="fa-solid fa-desktop"></i> Desktop
        </button>
        <button onClick={() => setDeviceMode('tablet')} className={`px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 transition-all ${deviceMode === 'tablet' ? 'bg-green-primary text-gray-900' : 'text-zinc-400 hover:text-white'}`}>
          <i className="fa-solid fa-tablet-screen-button"></i> Tablet
        </button>
        <button onClick={() => setDeviceMode('mobile')} className={`px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 transition-all ${deviceMode === 'mobile' ? 'bg-green-primary text-gray-900' : 'text-zinc-400 hover:text-white'}`}>
          <i className="fa-solid fa-mobile-screen-button"></i> Mobile
        </button>
      </div>

      {/* Browser frame */}
      <div className={`bg-white shadow-2xl overflow-hidden flex flex-col relative transition-all duration-500 ease-in-out ${containerStyle()}`}>
        {deviceMode !== 'mobile' && (
          <div className="bg-gray-100 border-b border-gray-300 px-4 py-2 flex items-center gap-4 shrink-0 relative z-20">
            <div className="flex gap-2 shrink-0">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>

            {/* URL bar with profile picker */}
            <div className="flex-1 relative">
              <button
                onClick={() => setProfilePickerOpen(o => !o)}
                aria-label="Switch industry profile"
                className="w-full bg-white border border-gray-300 rounded-md py-1.5 px-4 text-xs text-gray-600 flex items-center gap-2 font-mono hover:border-gray-400 transition-colors"
              >
                <i className="fa-solid fa-lock text-[10px] text-green-600 shrink-0"></i>
                <span className="truncate">{url}</span>
                <span className="ml-auto inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wide font-sans font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                  {profile.name}
                  <i className="fa-solid fa-chevron-down text-[8px]"></i>
                </span>
              </button>

              {profilePickerOpen && (
                <>
                  <div className="fixed inset-0 z-30" onClick={() => setProfilePickerOpen(false)} />
                  <div className="absolute left-0 right-0 mt-1.5 bg-white border border-gray-200 rounded-lg shadow-xl z-40 overflow-hidden">
                    <div className="px-4 py-2.5 border-b border-gray-100 text-[10px] font-semibold uppercase tracking-wide text-gray-500">
                      Switch Industry Profile
                    </div>
                    {profileMetas.map(p => {
                      const active = p.id === activeProfile;
                      return (
                        <button
                          key={p.id}
                          onClick={() => pickProfile(p.id)}
                          className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-start gap-3 border-b border-gray-50 last:border-0 ${active ? "bg-gray-50" : ""}`}
                        >
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-gray-900">{p.name}</span>
                              {active && <span className="text-[10px] font-medium text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded uppercase tracking-wide">Active</span>}
                            </div>
                            <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{p.blurb}</p>
                            <p className="text-[11px] text-gray-400 font-mono mt-1">secure.{PROFILE_DOMAIN[p.id]}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>

            <button
              onClick={() => setChromeShown(c => !c)}
              aria-label={chromeShown ? "Hide site navigation" : "Show site navigation"}
              title={chromeShown ? "Hide site navigation" : "Show site navigation"}
              className={`shrink-0 inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-md transition-colors ${
                chromeShown
                  ? "bg-slate-900 text-white hover:bg-slate-800"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              <i className={`fa-solid ${chromeShown ? "fa-eye-slash" : "fa-eye"} text-[10px]`}></i>
              Site nav
            </button>
            <i className="fa-solid fa-rotate-right text-xs text-gray-500 cursor-pointer hover:text-gray-700"></i>
          </div>
        )}

        <div className="relative flex-1 bg-slate-50 overflow-hidden">
          <InventorySystem deviceMode={deviceMode} />
        </div>
      </div>

      <p className="mt-3 text-gray-500 text-xs">
        {deviceMode === 'mobile' ? 'Mobile View (375px)' : deviceMode === 'tablet' ? 'Tablet View (768px)' : `Desktop · ${profile.name}`}
      </p>

      <DemoMode active={demoActive && deviceMode !== "mobile"} onExit={() => setDemoActive(false)} />
    </main>
  );
}
