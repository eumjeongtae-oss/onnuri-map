import type { LatLng } from '@/types/kakao';
import type { WeatherApiResponse } from '@/types/api';

export async function fetchCurrentWeather(coords: LatLng): Promise<WeatherApiResponse> {
  const params = new URLSearchParams({
    lat: String(coords.lat),
    lon: String(coords.lng),
  });

  const res = await fetch(`/api/weather?${params}`);
  if (!res.ok) throw new Error(`날씨 API 오류: ${res.status}`);

  const raw: unknown = await res.json();
  return raw as WeatherApiResponse;
}