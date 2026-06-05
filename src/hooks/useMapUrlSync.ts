'use client';

import { useEffect, useRef, useState } from 'react';
import { useMapStore } from '@/store/useMapStore';

export function useMapUrlSync() {
  const setCenter = useMapStore((s) => s.setCenter);
  const setZoom = useMapStore((s) => s.setZoom);
  const initializedFromUrl = useRef(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const lat = parseFloat(params.get('lat') ?? '');
    const lng = parseFloat(params.get('lng') ?? '');
    const z = parseInt(params.get('zoom') ?? '', 10);

    if (!isNaN(lat) && !isNaN(lng)) {
      setCenter({ lat, lng });
      useMapStore.getState().setShouldAutoSearch(true);
      initializedFromUrl.current = true;
    }
    if (!isNaN(z)) setZoom(z);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsReady(true);
  }, [setCenter, setZoom]);

  return { initializedFromUrl, isReady };
}
