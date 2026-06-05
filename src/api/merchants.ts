import type { MapBounds } from '@/types/kakao';
import type { MerchantsRouteResponse } from '@/types/api';
import type { Merchant, RawMerchant, MerchantType } from '@/types/merchant';
import { isOnnuriMerchant } from '@/utils/typeGuards';

export type MerchantsResult = { mode: 'merchants'; data: Merchant[] };

function toMerchantTypes(raw: RawMerchant): MerchantType[] {
  const types: MerchantType[] = [];
  if (raw.paper) types.push('paper');
  if (raw.mobile) types.push('mobile');
  if (raw.card) types.push('card');
  return types.length > 0 ? types : ['paper'];
}

function toMerchant(raw: RawMerchant): Merchant {
  return {
    id: `${raw.name}-${raw.lat}-${raw.lng}`,
    name: raw.name,
    category: raw.category,
    market: raw.market,
    sido: raw.sido,
    sigungu: raw.sigungu,
    address: raw.address,
    lat: raw.lat as number,
    lng: raw.lng as number,
    merchantTypes: toMerchantTypes(raw),
    kakaoPlaceId: raw.kakaoPlaceId ?? null,
  };
}

const PAGE_SIZE = 500;
const MAX_MERCHANTS = 3000;

async function fetchPage(bounds: MapBounds, zoom: number, pageNo: number): Promise<MerchantsRouteResponse> {
  const params = new URLSearchParams({
    zoom: String(zoom),
    pageNo: String(pageNo),
    numOfRows: String(PAGE_SIZE),
    minLat: String(bounds.sw.lat),
    maxLat: String(bounds.ne.lat),
    minLon: String(bounds.sw.lng),
    maxLon: String(bounds.ne.lng),
  });
  const res = await fetch(`/api/merchants?${params}`);
  if (!res.ok) throw new Error(`API 오류: ${res.status}`);
  return res.json() as Promise<MerchantsRouteResponse>;
}

export async function fetchMerchantsInBounds(bounds: MapBounds, zoom: number): Promise<MerchantsResult> {
  const first = await fetchPage(bounds, zoom, 1);

  const allItems: unknown[] = [...first.items];
  const totalCount = first.totalCount;

  if (totalCount > PAGE_SIZE) {
    const cappedTotal = Math.min(totalCount, MAX_MERCHANTS);
    const totalPages = Math.ceil(cappedTotal / PAGE_SIZE);
    const remainingPageNos = Array.from({ length: totalPages - 1 }, (_, i) => i + 2);
    const remainingPages = await Promise.all(remainingPageNos.map((no) => fetchPage(bounds, zoom, no)));
    for (const page of remainingPages) {
      allItems.push(...page.items);
    }
  }

  const deduplicatedMerchants = Array.from(
    new Map(
      allItems
        .filter(isOnnuriMerchant)
        .map(toMerchant)
        .map((m) => [m.id, m])
    ).values()
  );

  return { mode: 'merchants', data: deduplicatedMerchants };
}
