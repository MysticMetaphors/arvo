import { FeatureType, PageType, SiteConfig, Tier } from "@/app/preview/page";

interface Props {
  config: SiteConfig;
  setConfig: (config: SiteConfig) => void;
}

export default function ControlPanel({ config, setConfig }: Props) {
  
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
    { id: "starter", label: "Starter", price: "$20", icon: "fa-seedling" },
    { id: "growth", label: "Growth", price: "$30", icon: "fa-arrow-trend-up" },
    { id: "professional", label: "Profesional", price: "$1000", icon: "fa-briefcase" },
    { id: "ecommerce", label: "E-commerce", price: "Custom", icon: "fa-cart-shopping" },
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
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 h-full flex flex-col gap-5 shadow-2xl">
      
      {/* Header */}
      <div className="shrink-0">
        <h2 className="text-lg font-bold text-white tracking-tight mb-3">Configurator</h2>
        <div className="relative group">
          <i className="fa-solid fa-pen absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs transition-colors group-focus-within:text-green-500"></i>
          <input
            type="text"
            value={config.businessName}
            onChange={(e) => handleChange("businessName", e.target.value)}
            className="w-full bg-black-primary border border-gray-700 rounded-xl pl-8 pr-4 py-2.5 text-sm text-white focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all placeholder-gray-600"
            placeholder="Business Name"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto min-h-0 pr-1 flex flex-col gap-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
        
        {/* Tier Grid */}
        <div>
          <label className="block text-[10px] font-bold text-gray-500 mb-2 uppercase tracking-wider">Select Tier</label>
          <div className="grid grid-cols-2 gap-2">
            {tiers.map((t) => (
              <button
                key={t.id}
                onClick={() => handleTierChange(t.id)}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all duration-200 ${
                  config.tier === t.id
                    ? "bg-green-900/20 border-green-500 text-green-400"
                    : "bg-black-primary border-gray-800 text-gray-400 hover:bg-gray-800 hover:border-gray-600"
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
             <span className={`text-[10px] px-2 py-0.5 rounded-full ${config.selectedPages.length === currentLimit ? 'bg-red-900/30 text-red-300' : 'bg-gray-800 text-gray-400'}`}>
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
                   className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs transition-all border ${
                      isActive 
                      ? 'bg-green-500/10 border-green-500/30 text-green-300' 
                      : 'bg-black-primary border-gray-800 text-gray-500 hover:bg-gray-800'
                   } ${isLocked ? 'opacity-40 cursor-not-allowed' : ''}`}
                 >
                   <span className="capitalize">{getPageLabel(page)}</span>
                   {isLocked 
                     ? <i className="fa-solid fa-lock text-[10px]"></i> 
                     : <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-500' : 'bg-gray-700'}`}></div>
                   }
                 </button>
               )
            })}
          </div>
        </div>

        {/* Feature Selection (Conditional) */}
        {(config.tier === 'professional' || config.tier === 'ecommerce') ? (
            <div>
              <div className="flex justify-between items-center mb-2">
                 <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Sample Features</label>
                 <span className={`text-[10px] px-2 py-0.5 rounded-full bg-blue-900/30 text-blue-300`}>
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
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs transition-all border ${
                           isActive 
                           ? 'bg-blue-500/10 border-blue-500/30 text-blue-300' 
                           : 'bg-black-primary border-gray-800 text-gray-500 hover:bg-gray-800'
                        }`}
                      >
                        <span className="capitalize">{ft}</span>
                        <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-blue-500' : 'bg-gray-700'}`}></div>
                      </button>
                   )
                })}
              </div>

              {/* CUSTOM CONTACT BUTTON */}
              <button 
                className="w-full mt-4 py-2 border border-gray-700 text-gray-400 text-[10px] rounded-lg hover:border-white hover:text-white transition-colors uppercase tracking-wide"
              >
                 Need something custom? Contact Us
              </button>
            </div>
        ) : (
            <div className="p-4 border border-dashed border-gray-800 rounded-xl text-center">
                <p className="text-[10px] text-gray-500">Upgrade to Professional to unlock custom features.</p>
            </div>
        )}

      </div>

      {/* Footer */}
      <div className="shrink-0 pt-4 border-t border-gray-800">
        <label className="block text-[10px] font-bold text-gray-500 mb-2 uppercase tracking-wider">Sample Brand Color</label>
        <div className="flex gap-3 justify-between">
          {["#3b82f6", "#10b981", "#ef4444", "#f59e0b", "#8b5cf6"].map((color) => (
            <button
              key={color}
              onClick={() => handleChange("themeColor", color)}
              className={`w-6 h-6 rounded-full border border-gray-600 transition-all hover:scale-110 ${config.themeColor === color ? 'ring-2 ring-white ring-offset-2 ring-offset-black border-transparent' : ''}`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}