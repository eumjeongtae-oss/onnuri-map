import { useMapAddress } from '@/hooks/useMapAddress';
import { vars } from '@/styles/theme.css';
import * as styles from './CurrentLocationLabel.css';

export function CurrentLocationLabel() {
  const address = useMapAddress();

  return (
    <div className={styles.label}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill={vars.colors.primary} />
      </svg>
      <span>{address || '위치 찾는 중...'}</span>
    </div>
  );
}
