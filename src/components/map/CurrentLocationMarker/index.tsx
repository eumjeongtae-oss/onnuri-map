import { CustomOverlayMap } from 'react-kakao-maps-sdk';
import { useMapStore } from '@/store/useMapStore';
import * as styles from './CurrentLocationMarker.css';

export function CurrentLocationMarker() {
  const userLocation = useMapStore((s) => s.userLocation);

  if (!userLocation) return null;

  return (
    <CustomOverlayMap position={userLocation} zIndex={10}>
      <div className={styles.marker} title="현재 위치" />
    </CustomOverlayMap>
  );
}
