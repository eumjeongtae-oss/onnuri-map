import { useMerchantsInBounds } from '@/hooks/queries/useMerchantQueries';
import { useFilterStore } from '@/store/useFilterStore';
import { MerchantCard } from '@/views/home/components/MerchantCard';
import { Spinner } from '@/components/ui/Spinner';
import { ErrorFallback } from '@/components/ui/ErrorFallback';
import * as styles from './MerchantList.css';

export function MerchantList() {
  const { data: result, isLoading, isError, refetch } = useMerchantsInBounds();
  const activeFilters = useFilterStore((s) => s.activeFilters);

  if (isLoading) {
    return (
      <div className={styles.center}>
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return <ErrorFallback message="가맹점 정보를 불러오지 못했어요." onRetry={() => refetch()} />;
  }

  if (result?.mode !== 'merchants') {
    return <p className={styles.empty}>지도를 더 확대하면 가맹점 목록을 볼 수 있어요.</p>;
  }

  const merchants = result.data; // Merchant[]로 타입 확정
  const filtered =
    activeFilters.length === 0
      ? merchants
      : merchants.filter((m) => m.merchantTypes.some((t) => activeFilters.includes(t)));

  if (!filtered.length) {
    return <p className={styles.empty}>현재 지도 영역에 가맹점이 없어요.</p>;
  }

  return (
    <ul className={styles.list}>
      {filtered.map((merchant) => (
        <li key={merchant.id}>
          <MerchantCard merchant={merchant} />
        </li>
      ))}
    </ul>
  );
}
