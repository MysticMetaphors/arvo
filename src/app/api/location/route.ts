import { NextResponse } from 'next/server';
import { geolocation } from '@vercel/edge';
import { getCurrencyFromCountry } from '@/lib/currencyHelper';

export const runtime = 'edge';

export async function GET(request: Request) {
  const { country } = geolocation(request);
  const countryCode = country || 'US';

  const currencyInfo = getCurrencyFromCountry(countryCode);

  console.log(`Detected Country: ${country} (Using: ${countryCode})`);

  return NextResponse.json(currencyInfo);
}