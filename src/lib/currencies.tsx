type CurrencyInfo = {
  symbol: string;
  flag: string;
  label: string;
};

export const currencySymbols: Record<string, CurrencyInfo> = {
  usd: { symbol: "$", flag: "https://flagcdn.com/us.svg", label: "USD" },
  eur: { symbol: "€", flag: "https://flagcdn.com/eu.svg", label: "EUR" },
  php: { symbol: "₱", flag: "https://flagcdn.com/ph.svg", label: "PHP" },
  jpy: { symbol: "¥", flag: "https://flagcdn.com/jp.svg", label: "JPY" },
  gbp: { symbol: "£", flag: "https://flagcdn.com/gb.svg", label: "GBP" },
  aud: { symbol: "A$", flag: "https://flagcdn.com/au.svg", label: "AUD" },
  cad: { symbol: "C$", flag: "https://flagcdn.com/ca.svg", label: "CAD" },
  inr: { symbol: "₹", flag: "https://flagcdn.com/in.svg", label: "INR" },
  krw: { symbol: "₩", flag: "https://flagcdn.com/kr.svg", label: "KRW" },
  cny: { symbol: "¥", flag: "https://flagcdn.com/cn.svg", label: "CNY" },
  sgd: { symbol: "S$", flag: "https://flagcdn.com/sg.svg", label: "SGD" },
  hkd: { symbol: "HK$", flag: "https://flagcdn.com/hk.svg", label: "HKD" },
  nzd: { symbol: "NZ$", flag: "https://flagcdn.com/nz.svg", label: "NZD" },
  chf: { symbol: "CHF", flag: "https://flagcdn.com/ch.svg", label: "CHF" },
  mxn: { symbol: "MX$", flag: "https://flagcdn.com/mx.svg", label: "MXN" },
  rub: { symbol: "₽", flag: "https://flagcdn.com/ru.svg", label: "RUB" },
  thb: { symbol: "฿", flag: "https://flagcdn.com/th.svg", label: "THB" },
  vnd: { symbol: "₫", flag: "https://flagcdn.com/vn.svg", label: "VND" },
  try: { symbol: "₺", flag: "https://flagcdn.com/tr.svg", label: "TRY" },
  brl: { symbol: "R$", flag: "https://flagcdn.com/br.svg", label: "BRL" },
  zar: { symbol: "R", flag: "https://flagcdn.com/za.svg", label: "ZAR" }
};
