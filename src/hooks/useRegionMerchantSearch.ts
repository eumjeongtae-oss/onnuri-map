'use client';

import { useState, useEffect } from 'react';
import type { Merchant } from '@/types/merchant';

export type SearchResultItem =
  | { type: 'place'; id: string; name: string; address: string; lat: number; lng: number }
  | { type: 'merchant'; data: Merchant };

export function useRegionMerchantSearch(query: string) {
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setResults([]);
      return;
    }

    let cancelled = false;
    setIsLoading(true);

    const fetchMerchants = fetch(`/api/search?q=${encodeURIComponent(query)}`)
      .then((res) => res.json() as Promise<Merchant[]>)
      .then((data) => data.map((m) => ({ type: 'merchant' as const, data: m })))
      .catch(() => [] as SearchResultItem[]);

    const fetchPlaces = new Promise<SearchResultItem[]>((resolve) => {
      if (typeof kakao === 'undefined' || !kakao.maps?.services) {
        resolve([]);
        return;
      }
      const timeoutId = setTimeout(() => {
        resolve([]);
      }, 3000); // 3초 동안 응답 없으면 실패로 간주하고 빈 배열 반환

      const places = new kakao.maps.services.Places();
      places.keywordSearch(query, (data, status) => {
        clearTimeout(timeoutId);
        if (status === kakao.maps.services.Status.OK) {
          console.log('Places API 결과:', data);
          const placeResults = data.slice(0, 5).map((p) => ({
            type: 'place' as const,
            id: p.id,
            name: p.place_name,
            address: p.address_name,
            lat: Number(p.y),
            lng: Number(p.x),
          }));
          resolve(placeResults);
        } else {
          console.log('Places API 실패 또는 결과 없음:', status);
          resolve([]);
        }
      });
    });

    Promise.all([fetchPlaces, fetchMerchants]).then(([places, merchants]) => {
      if (!cancelled) {
        setResults([...places, ...merchants]);
        setIsLoading(false);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [query]);

  // 하위 호환성을 위해 merchants 배열도 제공
  const merchants = results.filter((r) => r.type === 'merchant').map((r) => r.data as Merchant);

  return { results, merchants, isLoading };
}
