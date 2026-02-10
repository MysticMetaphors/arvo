'use client';

import { useState, useEffect } from 'react';

interface BannerData {
  message: string;
  theme?: string;
  fontSize?: string;
  height?: string;
  color?: string;
  redirect_url?: string;
  action?: string;
}

const DEFAULT_CONFIG = {
  message: '',
  theme: 'dark',
  fontSize: '14px',
  height: '28px',
  color: '#ffffff',
  backgroundColor: 'rgba(6, 78, 59, 0.02)',
};

export default function SiteBanner() {
  const [bannerData, setBannerData] = useState<BannerData | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const response = await fetch('https://overmind.arvo.team/api/v1/get_site_banner');
        if (!response.ok) return;
        const data = await response.json();
        setBannerData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBanner();
  }, []);

  useEffect(() => {
    if (bannerData && !isClosed) {
      const timer = setTimeout(() => setIsVisible(true), 50);
      return () => clearTimeout(timer);
    }
  }, [bannerData, isClosed]);

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVisible(false);
    setTimeout(() => setIsClosed(true), 500);
  };

  const handleClick = () => {
    if (bannerData?.redirect_url) {
      window.location.href = bannerData.redirect_url;
    }
  };

  if (!bannerData || isClosed) return null;

  const currentHeight = bannerData.height || DEFAULT_CONFIG.height;

  const bannerStyle: React.CSSProperties = {
    height: currentHeight,
    fontSize: bannerData.fontSize || DEFAULT_CONFIG.fontSize,
    color: bannerData.color || DEFAULT_CONFIG.color,
    backgroundColor: DEFAULT_CONFIG.backgroundColor,
    
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 9999,
    
    transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
    transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
    
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: bannerData.redirect_url ? 'pointer' : 'default',
    
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: isVisible ? '0 4px 30px rgba(0, 0, 0, 0.1)' : 'none',
  };

  return (
    <div 
      style={bannerStyle} 
      onClick={handleClick}
      className="group relative overflow-hidden"
    >
      <div 
        className="absolute inset-0 pointer-events-none animate-shine"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
          transform: 'skewX(-20deg)',
        }}
      />

      <div className="relative z-10 flex gap-3 items-center px-8">
        <span className="font-semibold tracking-wide">{bannerData.message}</span>
      </div>

      <button
        onClick={handleClose}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-white/10 transition-colors z-20"
        aria-label="Close banner"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  );
}