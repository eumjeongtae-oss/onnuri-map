import * as styles from './ErrorFallback.css';

interface ErrorFallbackProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorFallback({ message = '오류가 발생했습니다.', onRetry }: ErrorFallbackProps) {
  return (
    <div className={styles.container}>
      <p className={styles.message}>{message}</p>
      {onRetry && (
        <button className={styles.retryButton} onClick={onRetry}>
          다시 시도
        </button>
      )}
    </div>
  );
}
