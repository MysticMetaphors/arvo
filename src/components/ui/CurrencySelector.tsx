"use client"
import { currencySymbols } from "@/lib/currencies";
import { ChevronLeft, SearchIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Props = {
  value: string;
  onChange: (currency: string) => void;
};

export default function CurrencySelector({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const activeCurrency = currencySymbols[value] || currencySymbols['usd'];
  const [search, setSearch] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        open &&
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        setSearch("");
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <div ref={containerRef} className="text-white relative z-50">
      <div className="relative w-full">
        <div onClick={() => setOpen(!open)} className="px-3 flex justify-center items-center gap-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md cursor-pointer">
          <span className="text-black dark:text-white text-sm">Choose your currency</span>

          <div className="p-2 flex items-center gap-2">
            <img src={activeCurrency.flag} alt={activeCurrency.label} className="w-5 h-5 rounded-full object-cover" />
            <span className="font-bold text-black dark:text-gray-300">
              {activeCurrency.label}
            </span>
          </div>
        </div>

        {open && (
          <div className="absolute left-0 scrollbar-none top-full mt-1 w-full max-h-60 overflow-y-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-xl">
            <div className="sticky top-0 z-10 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-b border-gray-100 dark:border-gray-700 p-2">
              <div className="relative group">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors" size={16} />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search currency..."
                  className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg placeholder:text-gray-400 text-gray-900 dark:text-gray-100 focus:outline-none transition-all"
                  autoFocus
                />
              </div>
            </div>
            {Object.entries(currencySymbols)
              .filter(([code, info]) =>
                code.toLowerCase().includes(search.toLowerCase()) ||
                info.name.toLowerCase().includes(search.toLowerCase())
              )
              .map(([code, info]) => (
                <div
                  key={code}
                  onClick={() => {
                    onChange(code); // Passes 'php', 'usd', etc.
                    setOpen(false);
                    setSearch("");
                  }}
                  className={`p-2 flex items-center gap-2 cursor-pointer ${activeCurrency.label === info.label ? 'bg-gray-100 dark:bg-gray-700' : ''} hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors`}
                >
                  <img src={info.flag} alt={info.label} className="w-5 h-5 rounded-full object-cover border border-gray-200" />
                  <span className="text-sm text-black dark:text-white flex items-center gap-2">
                    {info.name} ({info.symbol}) {activeCurrency.label === info.label && <ChevronLeft className="w-5 h-5" />}
                  </span>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}