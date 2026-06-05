'use client';

import { useCallback, useRef } from 'react';
import { useMapStore } from '@/store/useMapStore';
import type { MapBounds } from '@/types/kakao';

export function useMapBounds() {

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleIdle = useCallback(
    (map: kakao.maps.Map) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        const bounds = map.getBounds();
        const updatedBounds: MapBounds = {
          sw: {
            lat: bounds.getSouthWest().getLat(),
            lng: bounds.getSouthWest().getLng(),
          },
          ne: {
            lat: bounds.getNorthEast().getLat(),
            lng: bounds.getNorthEast().getLng(),
          },
        };
        const mapCenter = map.getCenter();
        const zoom = map.getLevel();

        const state = useMapStore.getState();
        
        // 1. 화면 업데이트 (URL 및 UI 상태)
        state.setBounds(updatedBounds);
        state.setDisplayCenter({ lat: mapCenter.getLat(), lng: mapCenter.getLng() });

        const lat = mapCenter.getLat();
        const lng = mapCenter.getLng();
        const urlParams = new URLSearchParams();
        urlParams.set('lat', lat.toFixed(4));
        urlParams.set('lng', lng.toFixed(4));
        urlParams.set('zoom', String(zoom));
        window.history.replaceState(null, '', `?${urlParams.toString()}`);

        // 2. 검색 트리거 로직
        if (state.shouldAutoSearch) {
          state.setSearchBounds(updatedBounds);
          state.setSearchZoom(zoom);
          state.setShouldAutoSearch(false);
          state.setHasUnsearchedChanges(false);
        } else {
          state.setHasUnsearchedChanges(true);
        }
      }, 300);
    },
    [],
  );

  return { handleIdle };
}
