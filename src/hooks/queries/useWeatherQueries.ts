'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchCurrentWeather } from '@/api/weather';
import type { LatLng } from '@/types/kakao';

export function useCurrentWeather(coords: LatLng | null) {
  return useQuery({
    queryKey: ['weather', coords],
    queryFn: () => fetchCurrentWeather(coords!),
    enabled: coords !== null,
    staleTime: 1000 * 60 * 10, // 10분
  });
}
