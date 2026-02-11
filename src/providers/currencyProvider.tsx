"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { currencySymbols } from "@/lib/currencies"; // Your file

interface CurrencyContextType {
  currencyCode: string;
  setCurrency: (code: string) => void;
  loading: boolean;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currencyCode, setCurrencyCode] = useState<string>("usd");
  const [loading, setLoading] = useState(true);


  const handleSetCurrency = (code: string) => {
    setCurrencyCode(code);
    localStorage.setItem("user-currency", code);
  };

  useEffect(() => {
    const init = async () => {
      const saved = localStorage.getItem("user-currency");
      if (saved && currencySymbols[saved]) {
        setCurrencyCode(saved);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("/api/location", { cache: "no-store" });
        const data = await res.json();
        if (data?.currency && currencySymbols[data.currency]) {
          handleSetCurrency(data.currency);
        }
      } catch (err) {
        console.warn("Location detection failed, defaulting to USD");
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  return (
    <CurrencyContext.Provider value={{ currencyCode, setCurrency: handleSetCurrency, loading }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) throw new Error("useCurrency must be used within Provider");
  return context;
};