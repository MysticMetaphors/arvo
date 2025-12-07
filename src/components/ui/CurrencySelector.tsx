"use client"

import { currencySymbols } from "@/lib/currencies";
import { useState } from "react";

type Props = {
  value: string;
  onChange: (currency: string) => void;
};

export default function CurrencySelector({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="text-white">
      <div className="relative w-full">
        <div
          onClick={() => setOpen(!open)}
          className="px-3 flex justify-center items-center gap-3 bg-gray-800 border border-gray-700 rounded-md cursor-pointer"
        >
          <span>Choose your currency</span>

          <div className="p-2 flex items-center justify-between cursor-pointer">
            <div className="flex items-center gap-2">
              <img
                src={currencySymbols[value]?.flag}
                className="w-5 h-5 rounded-full object-center"
              />
              <span className="font-bold text-gray-300">{value.toUpperCase()}</span>
            </div>
          </div>
        </div>

        {open && (
          <div className="absolute left-0 top-full border border-gray-700 bg-gray-800 rounded-md mt-1 w-full shadow-md z-10 max-h-100 overflow-y-scroll scrollbar-none">
            {Object.keys(currencySymbols).map((code) => (
              <div
                key={code}
                className="p-2 flex items-center gap-2 cursor-pointer hover:bg-gray-700"
                onClick={() => {
                  onChange(code);
                  setOpen(false);
                }}
              >
                <img
                  src={currencySymbols[code].flag}
                  className="w-5 h-5 rounded-full object-center"
                />
                <span>
                  {currencySymbols[code].label} ({currencySymbols[code].symbol})
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>

  );
}
