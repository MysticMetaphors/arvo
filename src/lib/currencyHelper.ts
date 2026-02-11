import { currencySymbols } from "./currencies";

export type CurrencyInfo = {
  symbol: string;
  flag: string;
  label: string;
  name: string;
};

export const EUROZONE = new Set([
  'AT', 'BE', 'CY', 'EE', 'FI', 'FR', 'DE', 'GR', 'IE', 'IT',
  'LV', 'LT', 'LU', 'MT', 'NL', 'PT', 'SK', 'SI', 'ES', 'HR'
]);

export const COUNTRY_MAP: Record<string, keyof typeof currencySymbols> = {
  PH: 'php', // Philippines
  US: 'usd', // United States
  IN: 'inr', // India
  SE: 'sek', // Sweden
  SG: 'sgd', // Singapore
  FR: 'eur', // France
  JP: 'jpy', // Japan
  VN: 'vnd', // Vietnam
  CA: 'cad', // Canada
  IE: 'eur', // Ireland
  LA: 'lak', // Lao People's Democratic Republic
  NL: 'eur', // Netherlands
  TH: 'thb', // Thailand
  GB: 'gbp', // United Kingdom
  AU: 'aud', // Australia
  CN: 'cny', // China
  KR: 'krw', // South Korea
  CH: 'chf', // Switzerland
  HK: 'hkd', // Hong Kong
  NZ: 'nzd', // New Zealand
  ID: 'idr', // Indonesia
  MY: 'myr', // Malaysia
  BR: 'brl', // Brazil
  MX: 'mxn', // Mexico
  DE: 'eur', // Germany
  IT: 'eur', // Italy
  ES: 'eur', // Spain
};

export function getCurrencyFromCountry(countryCode: string): string {
  const code = countryCode.toUpperCase();

  if (EUROZONE.has(code)) return 'eur';

  const currencyKey = COUNTRY_MAP[code];
  if (currencyKey && currencySymbols[currencyKey]) {
    return currencyKey;
  }

  return 'usd';
}
