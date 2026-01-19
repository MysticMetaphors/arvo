import { NextResponse } from 'next/server';
import { getCurrencyFromCountry } from '@/lib/currencyHelper';

export async function GET(request: Request) {
  const countryCode = request.headers.get('x-vercel-ip-country') || 'US';

  const currencyInfo = getCurrencyFromCountry(countryCode);
  
  return NextResponse.json(currencyInfo);
}