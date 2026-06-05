import { useMapStore } from '@/store/useMapStore';
import * as styles from './SearchHereButton.css';
import { SearchIcon } from '@/components/ui/Icons';

export function SearchHereButton() {
  const hasUnsearchedChanges = useMapStore((s) => s.hasUnsearchedChanges);
  const triggerSearch = useMapStore((s) => s.triggerSearch);

  if (!hasUnsearchedChanges) return null;

  return (
    <button className={styles.button} onClick={triggerSearch}>
      <SearchIcon size={14} />
      현 지도에서 검색
    </button>
  );
}
