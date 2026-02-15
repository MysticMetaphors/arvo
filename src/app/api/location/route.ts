import { NextResponse } from 'next/server';
import { getCurrencyFromCountry } from '@/lib/currencyHelper';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const manualCountry = searchParams.get('country');

  let countryCode = manualCountry;
  console.log('Manual country from query:', manualCountry);

  console.log('All Headers:', Object.fromEntries(request.headers));

  if (!countryCode) {
    countryCode = request.headers.get('x-geo-country') || null;
  }

  const finalCountry = countryCode || 'US';
  const currencyCode = getCurrencyFromCountry(finalCountry);

  return NextResponse.json({
    detectedCountry: countryCode,
    currency: currencyCode,
  });
}