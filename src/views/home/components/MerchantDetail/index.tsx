import { useMapStore } from '@/store/useMapStore';
import * as styles from './MerchantDetail.css';

export function MerchantDetail() {
  const merchant = useMapStore((s) => s.selectedMerchant);
  const setSelectedMerchant = useMapStore((s) => s.setSelectedMerchant);

  if (!merchant) return null;

  const kakaoMapUrl = merchant.kakaoPlaceId
    ? `https://place.map.kakao.com/${merchant.kakaoPlaceId}`
    : `https://map.kakao.com/link/map/${encodeURIComponent(merchant.name)},${merchant.lat},${merchant.lng}`;

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.name}>{merchant.name}</h2>
          <span className={styles.category}>{merchant.category}</span>
        </div>
        <button className={styles.closeButton} onClick={() => setSelectedMerchant(null)} aria-label="닫기">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <div className={styles.infoList}>
        <div className={styles.infoRow}>
          <span className={styles.infoLabel}>주소</span>
          <span className={styles.infoValue}>{[merchant.sido, merchant.sigungu, merchant.address].filter(Boolean).join(' ')}</span>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.infoLabel}>시장명</span>
          <span className={styles.infoValue}>{merchant.market}</span>
        </div>
      </div>

      <div className={styles.actionContainer}>
        <a className={styles.kakaoButton} href={kakaoMapUrl} target="_blank" rel="noopener noreferrer">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 3C7.04 3 3 6.36 3 10.5c0 2.62 1.68 4.93 4.23 6.33l-.93 3.46c-.08.3.26.53.52.36L11 18.06c.33.03.66.05.99.05C16.96 18.1 21 14.74 21 10.6 21 6.46 16.96 3 12 3z"/>
          </svg>
          카카오맵으로 보기
        </a>
      </div>
    </div>
  );
}
