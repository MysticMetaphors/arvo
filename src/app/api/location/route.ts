import { NextResponse } from 'next/server';
import { getCurrencyFromCountry } from '@/lib/currencyHelper';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const manualCountry = searchParams.get('country');

  // Fallback to US or cf-ipcountry
  const countryCode = manualCountry || request.headers.get('x-geo-country') || request.headers.get('cf-ipcountry') || 'US';
  const currencyCode = getCurrencyFromCountry(countryCode);

  return NextResponse.json({
    detectedCountry: countryCode,
    currency: currencyCode,
  });
}