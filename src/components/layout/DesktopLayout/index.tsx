'use client';

import { SearchBar } from '@/views/home/components/SearchBar';
import { FilterChips } from '@/views/home/components/FilterChips';
import { MerchantList } from '@/views/home/components/MerchantList';
import { MerchantDetail } from '@/views/home/components/MerchantDetail';
import { WeatherWidget } from '@/views/home/components/WeatherWidget';
import { MyLocationButton } from '@/components/map/MyLocationButton';
import { CurrentLocationLabel } from '@/components/map/CurrentLocationLabel';
import { OnnuriLogoIcon } from '@/components/ui/Icons';
import { useMapStore } from '@/store/useMapStore';
import * as styles from './DesktopLayout.css';

interface DesktopLayoutProps {
  mapSlot: React.ReactNode;
}

export function DesktopLayout({ mapSlot }: DesktopLayoutProps) {
  const selectedMerchant = useMapStore((s) => s.selectedMerchant);

  return (
    <div className={styles.root}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarTop}>
          <div className={styles.logoContainer}>
            <span className={styles.logoIcon}>
              <OnnuriLogoIcon />
            </span>
            <div>
              <h1 className={styles.logoText}>온누리맵</h1>
              <p className={styles.logoDesc}>내 주변 온누리상품권 가맹점 찾기</p>
            </div>
          </div>
          <SearchBar />
          <WeatherWidget />
          <FilterChips />
        </div>
        <div className={styles.sidebarScroll}>
          {selectedMerchant ? <MerchantDetail /> : <MerchantList />}
        </div>
      </aside>
      <main className={styles.mapArea}>
        {mapSlot}
        <MyLocationButton />
        <CurrentLocationLabel />
      </main>
    </div>
  );
}
