import { NextRequest, NextResponse } from 'next/server';
import { loadMerchants, toMerchant } from '@/lib/merchantData';
import type { Merchant } from '@/types/merchant';

const MAX_RESULTS = 10;

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get('q')?.trim().toLowerCase() ?? '';
  if (q.length < 1) {
    return NextResponse.json([]);
  }

  const all = loadMerchants();
  const results: Merchant[] = [];

  for (const raw of all) {
    if (results.length >= MAX_RESULTS) break;
    if (
      raw.name.toLowerCase().includes(q) ||
      raw.category.toLowerCase().includes(q) ||
      raw.market.toLowerCase().includes(q)
    ) {
      results.push(toMerchant(raw));
    }
  }

  return NextResponse.json(results);
}
