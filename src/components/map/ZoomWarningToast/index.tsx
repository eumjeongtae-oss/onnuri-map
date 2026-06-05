import * as styles from './ZoomWarningToast.css';

export function ZoomWarningToast() {
  return (
    <div className={styles.toastContainer}>
      <div className={styles.iconWrapper}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          <line x1="11" y1="8" x2="11" y2="14"></line>
          <line x1="8" y1="11" x2="14" y2="11"></line>
        </svg>
      </div>
      <p className={styles.text}>지도를 확대해서 가맹점을 확인하세요</p>
    </div>
  );
}
