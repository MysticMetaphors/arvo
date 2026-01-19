"use client"
import { currencySymbols } from "@/lib/currencies"; 
import { useState } from "react";

type Props = {
  value: string; 
  onChange: (currency: string) => void;
};

export default function CurrencySelector({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const activeCurrency = currencySymbols[value] || currencySymbols['usd'];

  return (
    <div className="text-white relative z-50"> 
      <div className="relative w-full">
        <div onClick={() => setOpen(!open)} className="px-3 flex justify-center items-center gap-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md cursor-pointer">
          <span className="text-black dark:text-white text-sm">Choose your currency</span>

          <div className="p-2 flex items-center gap-2">
            <img src={activeCurrency.flag} alt={activeCurrency.label} className="w-5 h-5 rounded-full object-cover"/>
            <span className="font-bold text-black dark:text-gray-300">
              {activeCurrency.label}
            </span>
          </div>
        </div>

        {open && (
          <div className="absolute left-0 top-full mt-1 w-full max-h-60 overflow-y-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-xl">
            {Object.entries(currencySymbols).map(([code, info]) => (
              <div
                key={code}
                onClick={() => {
                  onChange(code); // Passes 'php', 'usd', etc.
                  setOpen(false);
                }}
                className="p-2 flex items-center gap-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <img src={info.flag} alt={info.label} className="w-5 h-5 rounded-full object-cover border border-gray-200"/>
                <span className="text-sm text-black dark:text-white">
                  {info.label} ({info.symbol})
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}