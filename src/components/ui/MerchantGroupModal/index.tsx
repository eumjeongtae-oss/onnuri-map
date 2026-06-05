'use client';

import { useMapStore } from '@/store/useMapStore';
import * as styles from './MerchantGroupModal.css';

export function MerchantGroupModal() {
  const group = useMapStore((s) => s.selectedMerchantGroup);
  const setSelectedMerchantGroup = useMapStore((s) => s.setSelectedMerchantGroup);
  const setSelectedMerchant = useMapStore((s) => s.setSelectedMerchant);
  const setActiveMerchant = useMapStore((s) => s.setActiveMerchant);

  if (!group || group.length === 0) return null;

  const handleSelect = (merchant: typeof group[0]) => {
    setSelectedMerchant(merchant);
    setActiveMerchant(merchant);
  };

  return (
    <div className={styles.backdrop} onClick={() => setSelectedMerchantGroup(null)}>
      <div className={styles.card} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.titleGroup}>
            <h2 className={styles.title}>같은 위치에 있는 상점들</h2>
            <span className={styles.subtitle}>총 {group.length}개의 가맹점이 있습니다.</span>
          </div>
          <button
            className={styles.closeButton}
            onClick={() => setSelectedMerchantGroup(null)}
            aria-label="닫기"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className={styles.list}>
          {group.map((merchant) => (
            <div key={merchant.id} className={styles.listItem} onClick={() => handleSelect(merchant)}>
              <span className={styles.itemName}>{merchant.name}</span>
              <span className={styles.itemCategory}>{merchant.category}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
