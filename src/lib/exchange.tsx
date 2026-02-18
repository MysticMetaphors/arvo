"use client";

import { useState, useEffect } from "react";
import { currencySymbols } from "@/lib/currencies";

interface ExchangeProps {
  currencies: string;
  amount: number;
  base: string;
}

export function Exchange({ currencies, amount, base }: ExchangeProps) {
  const [converted, setConverted] = useState<string>("");

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        // console.log(currencies, amount, base);
        const res = await fetch(
          `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currencies}.json`
        );

        if (!res.ok) throw new Error("Failed to fetch rates");

        const data = await res.json();
        const rate = data[currencies]?.[base];

        if (!rate) throw new Error("Rate not found");

        if (isMounted) {
          const rawAmount = amount * rate;
          let cleanAmount = 0;

          if (rawAmount < 1000) {
            // If less than 1,000, round to nearest 10
            // Example: 188 -> 190
            cleanAmount = Math.round(rawAmount / 10) * 10;
          } else {
            // If greater than 1,000, round to nearest 100
            // Example: 1,188 -> 1,200 | 59,398 -> 59,400
            cleanAmount = Math.round(rawAmount / 100) * 100;
          }

          const symbol = currencySymbols[base]?.symbol || base.toUpperCase();

          const formatted = new Intl.NumberFormat('en-US', {
            maximumFractionDigits: 0,
          }).format(cleanAmount - 1);

          setConverted(`${symbol} ${formatted}`);
        }
      } catch (err) {
        console.warn("Currency conversion error:", err);
        if (isMounted) {
          const fallbackSymbol = currencySymbols[base]?.symbol || base.toUpperCase();
          setConverted(`${fallbackSymbol} ${amount}`);
        }
      }
    };

    if (amount && currencies && base) {
      fetchData();
    }

    return () => { isMounted = false; };
  }, [currencies, amount, base]);

  //default to USD
  if (!converted) return <span className="animate-pulse">${amount}</span>;

  return (
    <span title={`Converted from ${currencies.toUpperCase()}`}>
      {converted}
    </span>
  );
}