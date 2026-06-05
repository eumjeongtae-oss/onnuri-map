import { useFilterStore } from '@/store/useFilterStore';
import type { MerchantType } from '@/types/merchant';
import * as styles from './FilterChips.css';

const FILTER_LABELS: Record<MerchantType, string> = {
  paper: '지류',
  mobile: '모바일',
  card: '카드',
};

export function FilterChips() {
  const { activeFilters, toggleFilter } = useFilterStore();

  return (
    <div className={styles.container}>
      {(Object.keys(FILTER_LABELS) as MerchantType[]).map((type) => (
        <button
          key={type}
          className={styles.chip[activeFilters.includes(type) ? 'active' : 'inactive']}
          onClick={() => toggleFilter(type)}
        >
          {FILTER_LABELS[type]}
        </button>
      ))}
    </div>
  );
}
