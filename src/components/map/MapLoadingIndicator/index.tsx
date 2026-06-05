import { useMerchantsInBounds } from '@/hooks/queries/useMerchantQueries';
import { Spinner } from '@/components/ui/Spinner';
import * as styles from './MapLoadingIndicator.css';

export function MapLoadingIndicator() {
  const { isFetching } = useMerchantsInBounds();

  if (!isFetching) return null;

  return (
    <div className={styles.container}>
      <Spinner size="sm" />
      <span>가맹점 찾는 중...</span>
    </div>
  );
}
