'use client';

import { create } from 'zustand';
import type { MerchantType } from '@/types/merchant';

interface FilterState {
  activeFilters: MerchantType[];
  toggleFilter: (type: MerchantType) => void;
  clearFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  activeFilters: [],
  toggleFilter: (type) =>
    set((state) => ({
      activeFilters: state.activeFilters.includes(type)
        ? state.activeFilters.filter((f) => f !== type)
        : [...state.activeFilters, type],
    })),
  clearFilters: () => set({ activeFilters: [] }),
}));
