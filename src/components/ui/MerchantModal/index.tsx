'use client';

import { useMapStore } from '@/store/useMapStore';
import type { MerchantType } from '@/types/merchant';
import * as styles from './MerchantModal.css';

const BADGE_INFO: Record<MerchantType, { label: string; className: string }> = {
  paper: { label: '지류', className: styles.badgePaper },
  mobile: { label: '모바일', className: styles.badgeMobile },
  card: { label: '카드', className: styles.badgeCard },
};

export function MerchantModal() {
  const merchant = useMapStore((s) => s.selectedMerchant);
  const setSelectedMerchant = useMapStore((s) => s.setSelectedMerchant);

  if (!merchant) return null;

  const kakaoMapUrl = merchant.kakaoPlaceId
    ? `https://place.map.kakao.com/${merchant.kakaoPlaceId}`
    : `https://map.kakao.com/link/map/${encodeURIComponent(merchant.name)},${merchant.lat},${merchant.lng}`;

  return (
    <div className={styles.backdrop} onClick={() => setSelectedMerchant(null)}>
      <div className={styles.card} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.titleGroup}>
            <h2 className={styles.name}>{merchant.name}</h2>
            <span className={styles.categoryBadge}>{merchant.category}</span>
          </div>
          <button
            className={styles.closeButton}
            onClick={() => setSelectedMerchant(null)}
            aria-label="닫기"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className={styles.divider} />

        <div className={styles.infoList}>
          <div className={styles.infoRow}>
            <svg className={styles.infoIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className={styles.infoValue}>{merchant.address || merchant.market}</span>
          </div>
          {merchant.market && (
            <div className={styles.infoRow}>
              <svg className={styles.infoIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              <span className={styles.infoValue}>{merchant.market}</span>
            </div>
          )}
        </div>

        <div className={styles.typesRow}>
          {merchant.merchantTypes.map((type) => (
            <span key={type} className={BADGE_INFO[type].className}>
              {BADGE_INFO[type].label}
            </span>
          ))}
        </div>

        <div className={styles.actions}>
          <a
            className={styles.kakaoButton}
            href={kakaoMapUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 3C7.04 3 3 6.36 3 10.5c0 2.62 1.68 4.93 4.23 6.33l-.93 3.46c-.08.3.26.53.52.36L11 18.06c.33.03.66.05.99.05C16.96 18.1 21 14.74 21 10.6 21 6.46 16.96 3 12 3z"/>
            </svg>
            카카오맵으로 보기
          </a>
        </div>
      </div>
    </div>
  );
}
