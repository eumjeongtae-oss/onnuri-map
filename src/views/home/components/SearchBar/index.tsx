'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useMapStore } from '@/store/useMapStore';
import { useDebounce } from '@/hooks/useDebounce';
import { useRegionMerchantSearch, type SearchResultItem } from '@/hooks/useRegionMerchantSearch';
import * as styles from './SearchBar.css';

export function SearchBar() {
  const [value, setValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const setSelectedMerchant = useMapStore((s) => s.setSelectedMerchant);
  const setActiveMerchant = useMapStore((s) => s.setActiveMerchant);
  const setPendingMove = useMapStore((s) => s.setPendingMove);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const debouncedQuery = useDebounce(isTyping ? value : '', 300);

  const { results, isLoading } = useRegionMerchantSearch(debouncedQuery);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsOpen(debouncedQuery.trim() !== '');
  }, [debouncedQuery]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (!isTyping) setIsTyping(true);
    if (!e.target.value.trim()) setIsOpen(false);
  };

  const handleSelect = useCallback(
    (item: SearchResultItem) => {
      setIsTyping(false);
      setIsOpen(false);

      if (item.type === 'merchant') {
        const merchant = item.data;
        setPendingMove({ lat: merchant.lat, lng: merchant.lng, zoom: 3 });
        setSelectedMerchant(merchant);
        setActiveMerchant(merchant);
        setValue(merchant.name);
      } else if (item.type === 'place') {
        setPendingMove({ lat: item.lat, lng: item.lng, zoom: 4 });
        setValue(item.name);
      }
    },
    [setPendingMove, setSelectedMerchant, setActiveMerchant],
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') setIsOpen(false);
  };

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <div className={styles.container}>
        <input
          className={styles.input}
          type="text"
          placeholder="지역, 가게 이름 검색"
          value={value}
          onChange={handleChange}
          onFocus={() => { if (value.trim() !== '') setIsOpen(true); }}
          onKeyDown={handleKeyDown}
        />
      </div>

      {isOpen && (
        <div className={styles.dropdown}>
          {isLoading ? (
            <div style={{ padding: '16px', textAlign: 'center', color: '#888' }}>
              검색 중...
            </div>
          ) : results.length === 0 ? (
            <div style={{ padding: '16px', textAlign: 'center', color: '#888' }}>
              검색 결과가 없습니다.
            </div>
          ) : (
            results.map((item) => {
              if (item.type === 'place') {
                return (
                  <button
                    key={`place-${item.id}`}
                    className={styles.dropdownItem}
                    onClick={() => handleSelect(item)}
                  >
                    <div className={`${styles.badge} ${styles.badgePlace}`}>지역</div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', flex: 1, overflow: 'hidden' }}>
                      <span className={styles.itemName}>{item.name}</span>
                      <span className={styles.itemSub}>{item.address}</span>
                    </div>
                  </button>
                );
              }

              // item.type === 'merchant'
              return (
                <button
                  key={`merchant-${item.data.id}`}
                  className={styles.dropdownItem}
                  onClick={() => handleSelect(item)}
                >
                  <div className={`${styles.badge} ${styles.badgeMerchant}`}>가게</div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', flex: 1, overflow: 'hidden' }}>
                    <span className={styles.itemName}>{item.data.name}</span>
                    <span className={styles.itemSub}>{item.data.sigungu} · {item.data.category}</span>
                  </div>
                </button>
              );
            }))}
        </div>
      )}
    </div>
  );
}
