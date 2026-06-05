import { useRef, useEffect, useCallback } from 'react';
import { Map } from 'react-kakao-maps-sdk';
import { useMapStore } from '@/store/useMapStore';
import { useMapBounds } from '@/hooks/useMapBounds';

const MY_LOCATION_ZOOM = 3;

interface KakaoMapProps {
  children?: React.ReactNode;
}

export function KakaoMap({ children }: KakaoMapProps) {
  const center = useMapStore((s) => s.center);
  const zoom = useMapStore((s) => s.zoom);
  const setZoom = useMapStore((s) => s.setZoom);
  const userLocation = useMapStore((s) => s.userLocation);
  const locationVersion = useMapStore((s) => s.locationVersion);
  const pendingMove = useMapStore((s) => s.pendingMove);
  const setPendingMove = useMapStore((s) => s.setPendingMove);
  const { handleIdle } = useMapBounds();

  const mapRef = useRef<kakao.maps.Map | null>(null);

  useEffect(() => {
    const map = mapRef.current;
    if (locationVersion === 0 || !map || !userLocation) return;
    map.setCenter(new kakao.maps.LatLng(userLocation.lat, userLocation.lng));
    map.setLevel(MY_LOCATION_ZOOM);
  }, [locationVersion, userLocation]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !pendingMove) return;
    map.setCenter(new kakao.maps.LatLng(pendingMove.lat, pendingMove.lng));
    map.setLevel(pendingMove.zoom);
    setPendingMove(null);
  }, [pendingMove, setPendingMove]);

  return (
    <Map
      center={{ lat: center.lat, lng: center.lng }}
      level={zoom}
      style={{ width: '100%', height: '100%' }}
      onCreate={useCallback((map: kakao.maps.Map) => {
        mapRef.current = map;
        map.setMinLevel(1);
        map.setMaxLevel(4);
        handleIdle(map);
      }, [handleIdle])}
      onIdle={handleIdle}
      onZoomChanged={(map) => setZoom(map.getLevel())}
    >
      {children}
    </Map>
  );
}
