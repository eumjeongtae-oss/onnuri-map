'use client';

import { CustomOverlayMap } from 'react-kakao-maps-sdk';
import { useMapStore } from '@/store/useMapStore';
import type { Merchant } from '@/types/merchant';
import { StorefrontIcon } from '@/components/ui/Icons';
import * as styles from './MerchantMarker.css';

interface MerchantMarkerProps {
  merchant: Merchant;
}

export function MerchantMarker({ merchant }: MerchantMarkerProps) {
  const setSelectedMerchant = useMapStore((s) => s.setSelectedMerchant);
  const setActiveMerchant = useMapStore((s) => s.setActiveMerchant);
  const setCenter = useMapStore((s) => s.setCenter);
  const activeMerchant = useMapStore((s) => s.activeMerchant);

  const isActive = activeMerchant?.id === merchant.id;

  const handleClick = () => {
    setCenter({ lat: merchant.lat, lng: merchant.lng });
    setSelectedMerchant(merchant);
    setActiveMerchant(merchant);
  };

  return (
    <CustomOverlayMap
      position={{ lat: merchant.lat, lng: merchant.lng }}
      yAnchor={1}
      zIndex={isActive ? 10 : 1}
    >
      <div
        className={`${styles.markerWrapper} ${isActive ? styles.markerSelected : ''}`}
        onClick={handleClick}
        title={merchant.name}
      >
        <div className={`${styles.markerPin} ${isActive ? styles.markerPinSelected : ''}`}>
          <StorefrontIcon size={16} />
        </div>
        <div className={`${styles.markerTail} ${isActive ? styles.markerTailSelected : ''}`}></div>
      </div>
    </CustomOverlayMap>
  );
}
