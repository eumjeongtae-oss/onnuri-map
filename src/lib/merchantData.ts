import fs from 'fs';
import path from 'path';
import type { RawMerchant, Merchant, MerchantType } from '@/types/merchant';

let cache: RawMerchant[] | null = null;

export function loadMerchants(): RawMerchant[] {
  if (cache) return cache;
  const filePath = path.join(process.cwd(), 'public', 'data', 'onnuri_final.json');
  const raw: unknown = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  cache = (raw as RawMerchant[]).filter((m) => m.location_type !== null);
  return cache;
}

function toMerchantTypes(raw: RawMerchant): MerchantType[] {
  const types: MerchantType[] = [];
  if (raw.paper) types.push('paper');
  if (raw.mobile) types.push('mobile');
  if (raw.card) types.push('card');
  return types.length > 0 ? types : ['paper'];
}

export function toMerchant(raw: RawMerchant): Merchant {
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
