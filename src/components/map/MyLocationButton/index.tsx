import { useMapStore } from '@/store/useMapStore';
import * as styles from './MyLocationButton.css';

export function MyLocationButton() {
  const flyToUserLocation = useMapStore((s) => s.flyToUserLocation);
  const userLocation = useMapStore((s) => s.userLocation);

  return (
    <div className={styles.container}>
      {/* <button
        className={styles.button}
        onClick={flyToInitialLocation}
        aria-label="처음 위치로 이동"
        title="처음 위치로 이동"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z" fill="currentColor"/>
        </svg>
      </button> */}

      <button
        className={styles.button}
        onClick={flyToUserLocation}
        disabled={!userLocation}
        aria-label="내 위치로 이동"
        title="내 위치로 이동"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z" fill="currentColor"/>
        </svg>
        <span className={styles.text}>내 위치</span>
      </button>
    </div>
  );
}
