'use client';

import { useKakaoLoader } from 'react-kakao-maps-sdk';
import { HomePage } from '@/views/home/HomePage';
import { Spinner } from '@/components/ui/Spinner';
import { ErrorFallback } from '@/components/ui/ErrorFallback';
import { flexCenterClass } from '@/styles/common.css';

export function KakaoApp() {
  const [loading, error] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_MAP_KEY as string,
    libraries: ['services', 'clusterer'],
  });

  if (loading) {
    return (
      <div className={flexCenterClass} style={{ height: '100vh' }}>
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return <ErrorFallback message="카카오맵을 불러오지 못했어요. 잠시 후 다시 시도해 주세요." />;
  }

  return <HomePage />;
}
