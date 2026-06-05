import { NextRequest, NextResponse } from 'next/server';
import { loadMerchants } from '@/lib/merchantData';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const minLat = parseFloat(searchParams.get('minLat') ?? '-90');
  const maxLat = parseFloat(searchParams.get('maxLat') ?? '90');
  const minLon = parseFloat(searchParams.get('minLon') ?? '-180');
  const maxLon = parseFloat(searchParams.get('maxLon') ?? '180');
  const pageNo = Math.max(1, parseInt(searchParams.get('pageNo') ?? '1', 10));
  const numOfRows = Math.min(500, Math.max(1, parseInt(searchParams.get('numOfRows') ?? '500', 10)));

  const all = loadMerchants();
  const filtered = all.filter(
    (m) => m.lat! >= minLat && m.lat! <= maxLat && m.lng! >= minLon && m.lng! <= maxLon,
  );
  const start = (pageNo - 1) * numOfRows;
  const items = filtered.slice(start, start + numOfRows);

  return NextResponse.json({ mode: 'merchants', items, numOfRows, pageNo, totalCount: filtered.length });
}
