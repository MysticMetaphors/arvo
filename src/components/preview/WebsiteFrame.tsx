import { PageType, SiteConfig } from "@/app/preview/page";
import { motion, AnimatePresence } from "framer-motion";
import Desktop from "../mockups/Desktop";
import Phone from "../mockups/Phone";
import Tablet from "../mockups/Tablet";
import { useState } from "react";

interface Props {
  config: SiteConfig;
  setConfig: (config: SiteConfig) => void;
}

export default function WebsiteFrame({ config, setConfig }: Props) {
  const isEcommerce = config.tier === "ecommerce";
  const [navigationOpen, setNavigationOpen] = useState(false);

  const navigate = (page: PageType) => {
    setConfig({ ...config, activePage: page });
  };

  const getPageLabel = (p: string) => {
    if (p === 'custom1') return 'Custom 1';
    if (p === 'custom2') return 'Custom 2';
    return p;
  };

  const renderContent = () => {
    switch (config.activePage) {
      case 'home':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-12 pb-10">
            <section className="bg-gray-50 px-8 py-24 text-center">
              <h2 className="text-4xl font-extrabold text-slate-900 mb-4">
                Welcome to <span style={{ color: config.themeColor }}>{config.businessName}</span>
              </h2>
              <p className="max-w-xl mx-auto text-gray-600 mb-8">
                Your partner in success. {isEcommerce && "Browse our exclusive collection today."}
              </p>
              <div className="flex justify-center flex-wrap gap-4">
                <button
                  onClick={() => config.selectedPages.includes('contact') ? navigate('contact') : null}
                  className="px-8 py-3 rounded-full text-white font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
                  style={{ backgroundColor: config.themeColor }}
                >
                  Contact Us
                </button>
                {config.selectedFeatures.includes('booking') && (
                  <button className="px-8 py-3 rounded-full bg-white border border-gray-200 text-gray-700 font-semibold shadow-sm hover:bg-gray-50 flex items-center gap-2 transition-all">
                    <i className="fa-regular fa-calendar-check"></i> Book Now
                  </button>
                )}
              </div>
            </section>

            <section className={`grid ${config.screenView === 'mobile' || config.screenView === 'tablet' ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'} gap-6 px-8 max-w-5xl mx-auto`}>
              {[1, 2, 3].map(i => (
                <div key={i} className="p-8 border border-gray-100 rounded-3xl bg-white shadow-sm flex flex-col items-center text-center hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-2xl bg-gray-50 mb-4 flex items-center justify-center text-slate-700 text-xl"><i className="fa-solid fa-star"></i></div>
                  <h4 className="font-bold text-slate-900 mb-2">Feature {i}</h4>
                  <p className="text-sm text-gray-500">Included in your plan. Fully customizable content.</p>
                </div>
              ))}
            </section>

            {config.selectedPages.includes('blog') && (
              <section className="px-8 max-w-5xl mx-auto">
                <h3 className="text-2xl font-bold mb-6 text-slate-900">Latest Updates</h3>
                <div className={`grid ${config.screenView === 'mobile' ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'} gap-4`}>
                  <div className="bg-gray-100 h-48 rounded-3xl flex items-center justify-center text-gray-400">Post 1</div>
                  <div className="bg-gray-100 h-48 rounded-3xl flex items-center justify-center text-gray-400">Post 2</div>
                </div>
              </section>
            )}
          </motion.div>
        );

      case 'about':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-8 py-20 max-w-4xl mx-auto min-h-[600px]">
            <h2 className="text-3xl font-bold mb-8 text-slate-900">About Us</h2>
            <div className={`flex ${config.screenView === 'mobile' ? 'flex-col' : 'flex-row'} gap-8 items-start`}>
              <div className={`${config.screenView === 'mobile' ? 'w-full' : 'w-1/3'} bg-gray-200 aspect-[3/4] rounded-3xl flex items-center justify-center text-gray-400"`}>
                <i className="fa-solid fa-image text-3xl"></i>
              </div>
              <div className={`${config.screenView === 'mobile' ? 'w-full' : 'w-2/3'} space-y-6 text-gray-600 leading-relaxed`}>
                <p>{config.businessName} is dedicated to providing the best service possible.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.</p>
                <div className="p-6 bg-gray-50 rounded-3xl italic">
                  "We build dreams into reality."
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 'shop':
        if (!isEcommerce) return <div className="h-full flex flex-col items-center justify-center text-red-400">Upgrade to Ecommerce to view this page.</div>;

        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-8 py-20 max-w-5xl mx-auto min-h-[800px]">
            <h2 className="text-3xl font-bold mb-8 text-slate-900">Shop</h2>
            <div className={`grid ${config.screenView === 'mobile' ? 'grid-cols-1' : config.screenView === 'tablet' ? 'grid-cols-2' : 'grid-cols-3'} gap-6`}>
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="bg-white border border-gray-100 rounded-3xl p-4 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group">
                  <div className="bg-gray-100 aspect-square rounded-2xl mb-3 flex items-center justify-center text-gray-300 group-hover:bg-gray-200 transition-colors"><i className="fa-solid fa-shirt"></i></div>
                  <div className="font-bold text-sm text-slate-800">Product {i}</div>
                  <div className="text-xs text-gray-500 mt-1">$99.00</div>
                  <button className={`w-full mt-4 py-2 text-xs text-white rounded-xl font-bold ${config.screenView === 'mobile' || config.screenView === 'tablet' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`} style={{ backgroundColor: config.themeColor }}>Add to Cart</button>
                </div>
              ))}
            </div>
          </motion.div>
        )

      case 'custom1':
      case 'custom2':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-8 py-20 text-center min-h-[600px]">
            <h2 className="text-3xl font-bold mb-4 text-slate-900">{getPageLabel(config.activePage)}</h2>
            <p className="text-gray-500 mb-8">This is a custom page that can be tailored to your specific needs.</p>
            <div className="grid grid-cols-2 gap-4 max-w-3xl mx-auto">
              <div className="h-40 bg-gray-100 rounded-3xl"></div>
              <div className="h-40 bg-gray-100 rounded-3xl"></div>
              <div className="h-40 bg-gray-100 rounded-3xl col-span-2"></div>
            </div>
          </motion.div>
        )

      default:
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-8 py-20 text-center min-h-[600px]">
            <h2 className="text-3xl font-bold mb-4 capitalize text-slate-900">{config.activePage}</h2>
            <div className="mt-8 h-64 bg-gray-50 rounded-3xl border border-dashed border-gray-300 flex items-center justify-center text-gray-400">
              Content Placeholder
            </div>
          </motion.div>
        );
    }
  };

  const renderWrapper = (content: React.ReactNode) => {
    switch (config.screenView) {
      case 'mobile':
        return (
          <Phone>
            {content}
          </Phone>
        );
      case 'tablet':
        return (
          <Tablet>
            {content}
          </Tablet>
        );
      case 'desktop':
      default:
        return (
          <Desktop>
            {content}
          </Desktop>
        );
    }
  };

  const PageContent = () => (
    <div className="relative w-full h-full flex flex-col bg-white">
      <div className="absolute inset-0 overflow-y-auto scrollbar-none">
        <nav className={`border-b border-gray-100 flex flex-wrap gap-4 justify-between items-center bg-white/95 backdrop-blur sticky top-0 z-30 ${config.screenView === 'mobile' ? 'px-4 py-3' : 'px-8 py-5'}`}>
          <h1
            className={`font-bold cursor-pointer flex items-center gap-2 ${config.screenView === 'mobile' ? 'text-lg' : 'text-xl'}`}
            style={{ color: config.themeColor }}
            onClick={() => navigate('home')}
          >
            {config.businessName}
          </h1>

          <div className={`${config.screenView === 'mobile' || config.screenView === 'tablet' ? 'hidden' : 'flex'} gap-6 text-sm font-medium text-gray-600`}>
            {config.selectedPages.map(page => (
              <span
                key={page}
                onClick={() => navigate(page)}
                className={`cursor-pointer hover:text-black capitalize transition-colors ${config.activePage === page ? 'text-black font-bold' : ''}`}
              >
                {getPageLabel(page)}
              </span>
            ))}
          </div>
          {/* Mobile Menu Icon */}
          <div className={`${config.screenView === 'mobile' || config.screenView === 'tablet' ? 'block' : 'hidden'} text-gray-600`}>
            <i onClick={() => setNavigationOpen(!navigationOpen)} className={`fa-solid fa-${navigationOpen ? 'x' : 'bars'} text-xl`}></i>
          </div>

          <div className={`${navigationOpen ? 'block' : 'hidden'} absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-md py-4 md:py-6`}>
            {config.selectedPages.map(page => (
              <div
                key={page}
                onClick={() => { navigate(page); setNavigationOpen(false); }}
                className={`px-6 py-3 cursor-pointer hover:bg-gray-50 capitalize text-black ${config.activePage === page ? 'bg-gray-100 font-bold' : ''}`}
              >
                {getPageLabel(page)}
              </div>
            ))}
          </div>
        </nav>

        {/* Content */}
        <main className="min-h-full">
          <AnimatePresence mode="wait">
            <div key={config.activePage}>
              {renderContent()}
            </div>
          </AnimatePresence>
        </main>

        {/* Footer */}
        <footer className="bg-slate-900 text-white mt-auto py-12 px-8">
          <div className={`flex ${config.screenView === 'mobile' ? 'flex-col gap-6 text-center items-center' : 'justify-between items-start'}`}>
            <div>
              <p className="font-bold text-lg mb-2">{config.businessName}</p>
              <p className="text-slate-500 text-sm">© 2024 All rights reserved.</p>
            </div>
            <div className="flex gap-4">
              <i className="fa-brands fa-facebook text-xl text-gray-400 hover:text-white cursor-pointer transition-colors"></i>
              <i className="fa-brands fa-instagram text-xl text-gray-400 hover:text-white cursor-pointer transition-colors"></i>
            </div>
          </div>
        </footer>
      </div>

      {config.selectedFeatures.includes('chat') && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute right-4 rounded-full shadow-2xl flex items-center justify-center text-white z-50 cursor-pointer hover:scale-110 transition-transform bottom-6 w-12 h-12"
          style={{ backgroundColor: config.themeColor }}
        >
          <i className={`fa-solid fa-comments ${config.screenView === 'mobile' ? 'text-lg' : 'text-xl'}`}></i>
          <div className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white"></div>
        </motion.div>
      )}

      {config.selectedFeatures.includes('analytics') && (
        <div className="absolute left-4 px-3 py-1 bg-black/80 text-white text-[10px] rounded-full backdrop-blur pointer-events-none z-50 bottom-6">
          Analytics Active
        </div>
      )}
    </div>
  );

  // Render
  return (
    <div className="w-full h-full">
      {renderWrapper(<PageContent />)}
    </div>
  );
}