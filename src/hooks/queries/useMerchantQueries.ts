'use client';

import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchMerchantsInBounds } from '@/api/merchants';
import { useMapStore } from '@/store/useMapStore';

export function useMerchantsInBounds() {
  const searchBounds = useMapStore((s) => s.searchBounds);
  const searchZoom = useMapStore((s) => s.searchZoom);

  return useQuery({
    queryKey: ['merchants', searchBounds, searchZoom],
    queryFn: () => fetchMerchantsInBounds(searchBounds!, searchZoom),
    enabled: searchBounds !== null,
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  });
}
