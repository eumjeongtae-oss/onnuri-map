'use client';

import { CustomOverlayMap } from 'react-kakao-maps-sdk';
import { useMapStore } from '@/store/useMapStore';
import type { Merchant } from '@/types/merchant';
import { StorefrontIcon } from '@/components/ui/Icons';
import * as styles from './MerchantGroupMarker.css';

interface MerchantGroupMarkerProps {
  merchants: Merchant[];
}

export function MerchantGroupMarker({ merchants }: MerchantGroupMarkerProps) {
  const setSelectedMerchant = useMapStore((s) => s.setSelectedMerchant);
  const setSelectedMerchantGroup = useMapStore((s) => s.setSelectedMerchantGroup);
  const setActiveMerchant = useMapStore((s) => s.setActiveMerchant);
  const setCenter = useMapStore((s) => s.setCenter);
  const activeMerchant = useMapStore((s) => s.activeMerchant);
  const selectedMerchantGroup = useMapStore((s) => s.selectedMerchantGroup);

  if (merchants.length === 0) return null;

  const baseMerchant = merchants[0];
  const isSingle = merchants.length === 1;

  // 그룹이 선택되었거나, 그룹 내의 단일 가게가 active 상태인지 확인
  const isGroupActive = selectedMerchantGroup?.some(m => m.lat === baseMerchant.lat && m.lng === baseMerchant.lng);
  const isSingleActive = activeMerchant && activeMerchant.lat === baseMerchant.lat && activeMerchant.lng === baseMerchant.lng;
  const isActive = isGroupActive || isSingleActive;

  const handleClick = () => {
    setCenter({ lat: baseMerchant.lat, lng: baseMerchant.lng });

    if (isSingle) {
      setSelectedMerchant(baseMerchant);
      setActiveMerchant(baseMerchant);
    } else {
      setSelectedMerchantGroup(merchants);
    }
  };

  return (
    <CustomOverlayMap
      position={{ lat: baseMerchant.lat, lng: baseMerchant.lng }}
      yAnchor={1}
      zIndex={isActive ? 10 : 1}
    >
      <div
        className={`${styles.markerWrapper} ${isActive ? styles.markerSelected : ''}`}
        onClick={handleClick}
        title={isSingle ? baseMerchant.name : `${merchants.length}개의 가맹점`}
      >
        <div className={`${styles.badgePin} ${isActive ? styles.badgePinSelected : ''}`}>
          {isSingle ? <StorefrontIcon size={16} /> : `+${merchants.length}`}
        </div>
        <div className={`${styles.markerTail} ${isActive ? styles.markerTailSelected : ''}`}></div>
      </div>
    </CustomOverlayMap>
  );
}
