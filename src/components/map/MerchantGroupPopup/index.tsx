'use client';

import { useMapStore } from '@/store/useMapStore';
import { CustomOverlayMap } from 'react-kakao-maps-sdk';
import * as styles from './MerchantGroupPopup.css';

export function MerchantGroupPopup() {
  const group = useMapStore((s) => s.selectedMerchantGroup);
  const setSelectedMerchantGroup = useMapStore((s) => s.setSelectedMerchantGroup);
  const setSelectedMerchant = useMapStore((s) => s.setSelectedMerchant);
  const setActiveMerchant = useMapStore((s) => s.setActiveMerchant);

  if (!group || group.length === 0) return null;

  const baseLocation = { lat: group[0].lat, lng: group[0].lng };

  const handleSelect = (merchant: typeof group[0], e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedMerchant(merchant);
    setActiveMerchant(merchant);
    // 선택하면 그룹 팝업은 닫힘 (useMapStore에서 setSelectedMerchant 시 자동 처리됨)
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedMerchantGroup(null);
  };

  return (
    <CustomOverlayMap
      position={baseLocation}
      yAnchor={1} // 마커 위에 위치하도록 설정
      zIndex={20}
    >
      <div
        className={styles.popupContainer}
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <div>
            <h3 className={styles.title}>같은 위치에 있는 상점들</h3>
            <span className={styles.subtitle}>총 {group.length}곳이 있습니다</span>
          </div>
          <button className={styles.closeButton} onClick={handleClose} aria-label="닫기">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className={styles.list}>
          {group.map((merchant) => (
            <div
              key={merchant.id}
              className={styles.listItem}
              onClick={(e) => handleSelect(merchant, e)}
            >
              <span className={styles.itemName}>{merchant.name}</span>
              <span className={styles.itemCategory}>{merchant.category}</span>
            </div>
          ))}
        </div>

        {/* 말풍선 꼬리 */}
        <div className={styles.popupTail} />
      </div>
    </CustomOverlayMap>
  );
}
