type CurrencyInfo = {
  symbol: string;
  flag: string;
  label: string;
  name: string;
};

export const currencySymbols: Record<string, CurrencyInfo> = {
  php: { symbol: "₱", flag: "https://flagcdn.com/ph.svg", label: "PHP", name: "Philippine" }, // Philippines
  usd: { symbol: "$", flag: "https://flagcdn.com/us.svg", label: "USD", name: "USA" }, // USA
  inr: { symbol: "₹", flag: "https://flagcdn.com/in.svg", label: "INR", name: "Indian" }, // India
  sek: { symbol: "kr", flag: "https://flagcdn.com/se.svg", label: "SEK", name: "Sweden" }, // Sweden
  sgd: { symbol: "S$", flag: "https://flagcdn.com/sg.svg", label: "SGD", name: "Singapore" }, // Singapore
  eur: { symbol: "€", flag: "https://flagcdn.com/eu.svg", label: "EUR", name: "Euro" }, // France, Ireland, Netherlands
  jpy: { symbol: "¥", flag: "https://flagcdn.com/jp.svg", label: "JPY", name: "Japan" }, // Japan
  vnd: { symbol: "₫", flag: "https://flagcdn.com/vn.svg", label: "VND", name: "Vietnam" }, // Vietnam
  cad: { symbol: "C$", flag: "https://flagcdn.com/ca.svg", label: "CAD", name: "Canada" }, // Canada
  lak: { symbol: "₭", flag: "https://flagcdn.com/la.svg", label: "LAK", name: "Laos" }, // Laos
  thb: { symbol: "฿", flag: "https://flagcdn.com/th.svg", label: "THB", name: "Thailand" }, // Thailand
  gbp: { symbol: "£", flag: "https://flagcdn.com/gb.svg", label: "GBP", name: "UK" }, // UK
  aud: { symbol: "A$", flag: "https://flagcdn.com/au.svg", label: "AUD", name: "Australia" }, // Australia
  cny: { symbol: "¥", flag: "https://flagcdn.com/cn.svg", label: "CNY", name: "China" }, // China
  krw: { symbol: "₩", flag: "https://flagcdn.com/kr.svg", label: "KRW", name: "South Korea" }, // South Korea
  chf: { symbol: "CHF", flag: "https://flagcdn.com/ch.svg", label: "CHF", name: "Switzerland" }, // Switzerland
  hkd: { symbol: "HK$", flag: "https://flagcdn.com/hk.svg", label: "HKD", name: "Hong Kong" }, // Hong Kong
  nzd: { symbol: "NZ$", flag: "https://flagcdn.com/nz.svg", label: "NZD", name: "New Zealand" }, // New Zealand
  idr: { symbol: "Rp", flag: "https://flagcdn.com/id.svg", label: "IDR", name: "Indonesia" }, // Indonesia
  myr: { symbol: "RM", flag: "https://flagcdn.com/my.svg", label: "MYR", name: "Malaysia" }, // Malaysia
  brl: { symbol: "R$", flag: "https://flagcdn.com/br.svg", label: "BRL", name: "Brazil" }, // Brazil
  mxn: { symbol: "MX$", flag: "https://flagcdn.com/mx.svg", label: "MXN", name: "Mexico" }, // Mexico
};
