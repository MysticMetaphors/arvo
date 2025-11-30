

import Toast from "@/components/ui/toast";

import { createRoot } from "react-dom/client";
import { useEffect, useState } from 'react';
import { currencySymbols } from "./currencies";

export function appendToast(containerId: string, theme: string, text: string) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const toastWrapper = document.createElement('div');
  container.appendChild(toastWrapper);

  const root = createRoot(toastWrapper);
  root.render(<Toast theme={theme} text={text} />);

  setTimeout(() => {
    root.unmount();
    container.removeChild(toastWrapper);
  }, 5000);
}

type ExchangeProps = {
  currencies: string;
  base: string;
  amount: number;
};

export function Exchange({ currencies, amount, base }: ExchangeProps) {
  const [converted, setConverted] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const exchange = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currencies}.json`);
        const exchangeRes = await exchange.json();

        const symbol = currencySymbols[base].symbol || `(${base.toUpperCase()})`;
        const rate = exchangeRes[currencies][base];
        const convertedAmount = (amount * rate).toFixed();

        setConverted(`${symbol}${Number(convertedAmount).toLocaleString()}`);
      } catch (error) {
        console.log('Unexpected Error Occurred!');
        setConverted(`₱${amount}`)
        // appendToast('append-toast', 'error', 'Oops! Currency conversion is unavailable')
      }
    };

    fetchData();
  }, [currencies, amount, base]);

  return <span>{converted || 'Loading...'}</span>;
}
