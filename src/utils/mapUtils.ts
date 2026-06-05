import type { MapBounds } from '@/types/kakao';

export function boundsToQueryParams(bounds: MapBounds): Record<string, string> {
  return {
    minLat: String(bounds.sw.lat),
    maxLat: String(bounds.ne.lat),
    minLng: String(bounds.sw.lng),
    maxLng: String(bounds.ne.lng),
  };
}

/**
 * 동일한 좌표를 가진 마커들을 배열로 그룹화합니다.
 * @param merchants 상점 배열
 * @returns 동일 좌표를 가진 상점들의 배열 리스트
 */
export function groupMerchantsByLocation<T extends { lat: number; lng: number }>(merchants: T[]): T[][] {
  const groups = new Map<string, T[]>();

  merchants.forEach((m) => {
    const key = `${m.lat}-${m.lng}`;
    if (!groups.has(key)) {
      groups.set(key, []);
    }
    groups.get(key)!.push(m);
  });

  return Array.from(groups.values());
}
