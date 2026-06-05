'use client';

import { useMapStore } from '@/store/useMapStore';
import type { Merchant, MerchantType } from '@/types/merchant';
import * as styles from './MerchantCard.css';

interface MerchantCardProps {
  merchant: Merchant;
}

const BADGE_INFO: Record<MerchantType, { label: string; className: string }> = {
  paper: { label: '지류', className: styles.badgePaper },
  mobile: { label: '모바일', className: styles.badgeMobile },
  card: { label: '카드', className: styles.badgeCard },
};

export function MerchantCard({ merchant }: MerchantCardProps) {
  const setSelectedMerchant = useMapStore((s) => s.setSelectedMerchant);
  const setCenter = useMapStore((s) => s.setCenter);

  const handleClick = () => {
    setSelectedMerchant(merchant);
    setCenter({ lat: merchant.lat, lng: merchant.lng });
  };

  return (
    <button className={styles.card} onClick={handleClick}>
      <div className={styles.header}>
        <span className={styles.name}>{merchant.name}</span>
        <span className={styles.category}>{merchant.category}</span>
      </div>

      <div className={styles.infoRow}>
        <svg className={styles.infoIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        <span className={styles.addressText}>{merchant.address}</span>
      </div>

      <div className={styles.badgeContainer}>
        {merchant.merchantTypes.map((type) => (
          <span key={type} className={BADGE_INFO[type].className}>
            {BADGE_INFO[type].label}
          </span>
        ))}
      </div>
    </button>
  );
}
