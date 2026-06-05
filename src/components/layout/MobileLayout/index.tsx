import { SearchBar } from '@/views/home/components/SearchBar';
import { FilterChips } from '@/views/home/components/FilterChips';
import { MerchantList } from '@/views/home/components/MerchantList';
import { WeatherWidget } from '@/views/home/components/WeatherWidget';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { MyLocationButton } from '@/components/map/MyLocationButton';
import { CurrentLocationLabel } from '@/components/map/CurrentLocationLabel';
import * as styles from './MobileLayout.css';

interface MobileLayoutProps {
  mapSlot: React.ReactNode;
}

export function MobileLayout({ mapSlot }: MobileLayoutProps) {
  return (
    <div className={styles.root}>
      <div className={styles.mapArea}>
        {mapSlot}
        <MyLocationButton />
        <CurrentLocationLabel />
      </div>
      <div className={styles.floatingBar}>
        <SearchBar />
        <WeatherWidget />
        <FilterChips />
      </div>
      <BottomSheet>
        <MerchantList />
      </BottomSheet>
    </div>
  );
}
