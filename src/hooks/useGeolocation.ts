'use client';

import { useState, useEffect } from 'react';
import type { LatLng } from '@/types/kakao';

interface GeolocationState {
  coords: LatLng | null;
  error: string | null;
  loading: boolean;
}

export function useGeolocation(): GeolocationState {
  const [state, setState] = useState<GeolocationState>({
    coords: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setState({ coords: null, error: '위치 정보를 지원하지 않는 브라우저입니다.', loading: false });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          coords: { lat: position.coords.latitude, lng: position.coords.longitude },
          error: null,
          loading: false,
        });
      },
      (err) => {
        console.warn('Geolocation error:', err.message);
        // 개발 환경이거나 HTTP 환경이라 위치 접근이 막힌 경우 강남역을 임시 위치로 제공
        if (process.env.NODE_ENV === 'development' || err.code === 1) {
          setState({
            coords: { lat: 37.4979, lng: 127.0276 }, // 강남역
            error: null,
            loading: false,
          });
        } else {
          setState({ coords: null, error: err.message, loading: false });
        }
      },
      { enableHighAccuracy: true, timeout: 5000 },
    );
  }, []);

  return state;
}
