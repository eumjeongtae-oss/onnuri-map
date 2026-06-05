import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const params = new URLSearchParams({
    lat: searchParams.get('lat') ?? '',
    lon: searchParams.get('lon') ?? '',
    appid: process.env.WEATHER_API_KEY!,
    units: 'metric',
    lang: 'kr',
  });

  const res = await fetch(`${WEATHER_API_URL}?${params}`);

  if (!res.ok) {
    return NextResponse.json({ error: `날씨 API 오류: ${res.status}` }, { status: res.status });
  }

  const data: unknown = await res.json();
  return NextResponse.json(data);
}
