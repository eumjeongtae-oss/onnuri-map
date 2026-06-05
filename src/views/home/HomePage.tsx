'use client';

import { useEffect, useState, useMemo } from 'react';
import { KakaoMap } from '@/components/map/KakaoMap';
import { MerchantGroupMarker } from '@/components/map/MerchantGroupMarker';
import { MerchantGroupPopup } from '@/components/map/MerchantGroupPopup';
import { DesktopLayout } from '@/components/layout/DesktopLayout';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { MerchantModal } from '@/components/ui/MerchantModal';
import { MerchantGroupModal } from '@/components/ui/MerchantGroupModal';
import { CurrentLocationMarker } from '@/components/map/CurrentLocationMarker';
import { useMapStore } from '@/store/useMapStore';
import { useGeolocation } from '@/hooks/useGeolocation';
import { useMapUrlSync } from '@/hooks/useMapUrlSync';
import { useMerchantsInBounds } from '@/hooks/queries/useMerchantQueries';
import { groupMerchantsByLocation } from '@/utils/mapUtils';
import { MapLoadingIndicator } from '@/components/map/MapLoadingIndicator';
import { SearchHereButton } from '@/components/map/SearchHereButton';

const MOBILE_BREAKPOINT = 768;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => window.innerWidth < MOBILE_BREAKPOINT;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMobile(checkIsMobile());

    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return isMobile;
}

export function HomePage() {
  const setCenter = useMapStore((s) => s.setCenter);
  const setZoom = useMapStore((s) => s.setZoom);
  const setUserLocation = useMapStore((s) => s.setUserLocation);
  const { coords } = useGeolocation();
  const { data: result } = useMerchantsInBounds();
  const isMobile = useIsMobile();

  const { initializedFromUrl, isReady } = useMapUrlSync();

  useEffect(() => {
    if (coords) setUserLocation(coords);
  }, [coords, setUserLocation]);

  useEffect(() => {
    if (initializedFromUrl.current) return;
    if (coords) {
      setCenter(coords);
      setZoom(3);
    }
  }, [coords, initializedFromUrl, setCenter, setZoom]);

  const displayCenter = useMapStore((s) => s.displayCenter);

  const merchantGroups = useMemo(() => {
    if (result?.mode !== 'merchants') return [];
    const groups = groupMerchantsByLocation(result.data);
    
    // 중심좌표 기준으로 거리순 정렬하여 최대 300개 그룹만 렌더링 (렉 방지)
    const sorted = groups.sort((a, b) => {
      const distA = Math.pow(a[0].lat - displayCenter.lat, 2) + Math.pow(a[0].lng - displayCenter.lng, 2);
      const distB = Math.pow(b[0].lat - displayCenter.lat, 2) + Math.pow(b[0].lng - displayCenter.lng, 2);
      return distA - distB;
    });
    
    return sorted.slice(0, 10000);
  }, [result, displayCenter]);

  const mapElement = isReady ? (
    <KakaoMap>
      <SearchHereButton />
      <MapLoadingIndicator />
      {result?.mode === 'merchants' &&
        merchantGroups.map((group) => (
          <MerchantGroupMarker key={`${group[0].lat}-${group[0].lng}`} merchants={group} />
        ))}
      {!isMobile && <MerchantGroupPopup />}
      <CurrentLocationMarker />
    </KakaoMap>
  ) : null;

  if (isMobile) return (
    <>
      <MobileLayout mapSlot={mapElement} />
      <MerchantModal />
      <MerchantGroupModal />
    </>
  );
  return <DesktopLayout mapSlot={mapElement} />;
}
