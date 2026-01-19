import { currencySymbols } from "./currencies";

const EUROZONE = new Set([
  'AT', 'BE', 'CY', 'EE', 'FI', 'FR', 'DE', 'GR', 'IE', 'IT', 
  'LV', 'LT', 'LU', 'MT', 'NL', 'PT', 'SK', 'SI', 'ES'
]);

const COUNTRY_MAP: Record<string, keyof typeof currencySymbols> = {
  US: 'usd', PH: 'php', JP: 'jpy', GB: 'gbp', AU: 'aud', 
  CA: 'cad', IN: 'inr', KR: 'krw', CN: 'cny', SG: 'sgd', 
  HK: 'hkd', NZ: 'nzd', CH: 'chf', MX: 'mxn', RU: 'rub', 
  TH: 'thb', VN: 'vnd', TR: 'try', BR: 'brl', ZA: 'zar',
};

export function getCurrencyFromCountry(countryCode: string) {
  const code = countryCode.toUpperCase();
  if (EUROZONE.has(code)) return currencySymbols.eur;

  const currencyKey = COUNTRY_MAP[code];
  if (currencyKey && currencySymbols[currencyKey]) {
    return currencySymbols[currencyKey];
  }

  return currencySymbols.usd;
}