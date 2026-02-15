import { NextResponse } from 'next/server';
import { getCurrencyFromCountry } from '@/lib/currencyHelper';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const manualCountry = searchParams.get('country');

  let countryCode = manualCountry;
  console.log('Manual country from query:', manualCountry);

  if (!countryCode) {
    countryCode = request.headers.get('cf-ipcountry') || null;
  }

  const finalCountry = countryCode || 'US';
  const currencyCode = getCurrencyFromCountry(finalCountry);

  return NextResponse.json({
    detectedCountry: finalCountry,
    currency: currencyCode,
  });
}