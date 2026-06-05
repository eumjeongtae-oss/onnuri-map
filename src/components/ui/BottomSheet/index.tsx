'use client';

import { useState, useRef } from 'react';
import * as styles from './BottomSheet.css';

type SnapPoint = 'peek' | 'half' | 'full';

interface BottomSheetProps {
  children: React.ReactNode;
}

export function BottomSheet({ children }: BottomSheetProps) {
  const [snap, setSnap] = useState<SnapPoint>('peek');
  const startY = useRef(0);
  const fromHandle = useRef(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleHandleTouchStart = (e: React.TouchEvent) => {
    fromHandle.current = true;
    startY.current = e.touches[0].clientY;
  };

  const handleSheetTouchStart = (e: React.TouchEvent) => {
    if (fromHandle.current) return;
    startY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const delta = startY.current - e.changedTouches[0].clientY;
    const scrollTop = contentRef.current?.scrollTop ?? 0;

    if (snap === 'peek') {
      // peek 상태: 시트 전체 영역에서 위로 스와이프 시 열림
      if (delta > 40) setSnap('half');
    } else if (fromHandle.current) {
      // 핸들 영역: 항상 스냅 변경
      if (delta > 40) setSnap((s) => (s === 'half' ? 'full' : 'full'));
      else if (delta < -40) setSnap((s) => (s === 'full' ? 'half' : 'peek'));
    } else if (delta < -40 && scrollTop === 0) {
      // content 영역: 최상단에서 아래로 스와이프할 때만 닫힘
      setSnap((s) => (s === 'full' ? 'half' : 'peek'));
    }

    fromHandle.current = false;
  };

  return (
    <div
      className={styles.sheet[snap]}
      onTouchStart={handleSheetTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={() => { fromHandle.current = false; }}
    >
      <div className={styles.handle} onTouchStart={handleHandleTouchStart}>
        <div className={styles.handleBar} />
      </div>
      <div
        ref={contentRef}
        className={snap === 'peek' ? styles.contentHidden : styles.content}
      >
        {children}
      </div>
    </div>
  );
}
