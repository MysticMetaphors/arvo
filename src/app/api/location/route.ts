import { NextResponse } from 'next/server';
import { geolocation } from '@vercel/edge';
import { getCurrencyFromCountry } from '@/lib/currencyHelper';

export const runtime = 'edge';

export async function GET(request: Request) {
  // Localhost testing
  const { searchParams } = new URL(request.url);
  const manualCountry = searchParams.get('country');

  const { country } = geolocation(request);
  const countryCode = manualCountry || country || 'US';
  const currencyCode = getCurrencyFromCountry(countryCode);

  return NextResponse.json({
    detectedCountry: countryCode,
    currency: currencyCode
  });
}