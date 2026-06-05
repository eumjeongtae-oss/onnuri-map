import { useEffect, useState } from 'react';
import { useMapStore } from '@/store/useMapStore';
import { useDebounce } from '@/hooks/useDebounce';
import type { LatLng } from '@/types/kakao';

export function useMapAddress() {
  const displayCenter = useMapStore((s) => s.displayCenter);
  const debouncedCenter = useDebounce<LatLng>(displayCenter, 400);
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (typeof kakao === 'undefined' || !kakao.maps?.services) return;

    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.coord2RegionCode(
      debouncedCenter.lng,
      debouncedCenter.lat,
      (result, status) => {
        if (status !== kakao.maps.services.Status.OK) {
          setAddress('주소 정보를 불러올 수 없음');
          return;
        }
        const region = result.find((r) => r.region_type === 'H');
        if (!region) {
          setAddress('알 수 없는 지역');
          return;
        }
        const { region_2depth_name, region_3depth_name } = region;
        setAddress(region_3depth_name ? `${region_2depth_name} ${region_3depth_name}` : region_2depth_name);
      },
    );
  }, [debouncedCenter]);

  return address;
}
