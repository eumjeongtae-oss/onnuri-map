'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { LatLng, MapBounds } from '@/types/kakao';
import type { Merchant } from '@/types/merchant';

export interface PendingMove {
  lat: number;
  lng: number;
  zoom: number;
}

interface MapState {
  center: LatLng;
  displayCenter: LatLng;
  zoom: number;
  bounds: MapBounds | null; // This is now purely display bounds
  searchBounds: MapBounds | null; // Bounds used for API queries
  searchZoom: number; // Zoom level used for API queries
  shouldAutoSearch: boolean; // Flag to indicate next idle should auto-search
  hasUnsearchedChanges: boolean; // Flag to show "Search Here" button
  selectedMerchant: Merchant | null;
  selectedMerchantGroup: Merchant[] | null;
  activeMerchant: Merchant | null;
  userLocation: LatLng | null;
  locationVersion: number;
  pendingMove: PendingMove | null;
  setCenter: (center: LatLng) => void;
  setDisplayCenter: (center: LatLng) => void;
  setZoom: (zoom: number) => void;
  setBounds: (bounds: MapBounds) => void;
  setSearchBounds: (bounds: MapBounds) => void;
  setSearchZoom: (zoom: number) => void;
  setShouldAutoSearch: (should: boolean) => void;
  setHasUnsearchedChanges: (has: boolean) => void;
  triggerSearch: () => void;
  setSelectedMerchant: (merchant: Merchant | null) => void;
  setSelectedMerchantGroup: (group: Merchant[] | null) => void;
  setActiveMerchant: (merchant: Merchant) => void;
  setUserLocation: (location: LatLng) => void;
  flyToUserLocation: () => void;
  flyToInitialLocation: () => void;
  setPendingMove: (move: PendingMove | null) => void;
}

const INITIAL_CENTER: LatLng = { lat: 37.5665, lng: 126.978 };

export const useMapStore = create<MapState>()(
  persist(
    (set) => ({
      center: INITIAL_CENTER,
      displayCenter: INITIAL_CENTER,
      zoom: 5,
      bounds: null,
      searchBounds: null,
      searchZoom: 5,
      shouldAutoSearch: true, // Auto-search on initial load
      hasUnsearchedChanges: false,
      selectedMerchant: null,
      selectedMerchantGroup: null,
      activeMerchant: null,
      userLocation: null,
      locationVersion: 0,
      pendingMove: null,
      setCenter: (center) => set({ center }),
      setDisplayCenter: (displayCenter) => set({ displayCenter }),
      setZoom: (zoom) => set({ zoom }),
      setBounds: (bounds) => set({ bounds }),
      setSearchBounds: (searchBounds) => set({ searchBounds }),
      setSearchZoom: (searchZoom) => set({ searchZoom }),
      setShouldAutoSearch: (shouldAutoSearch) => set({ shouldAutoSearch }),
      setHasUnsearchedChanges: (hasUnsearchedChanges) => set({ hasUnsearchedChanges }),
      triggerSearch: () => set((state) => ({ 
        searchBounds: state.bounds, 
        searchZoom: state.zoom, 
        hasUnsearchedChanges: false 
      })),
      setSelectedMerchant: (merchant) => set({ selectedMerchant: merchant, selectedMerchantGroup: null }),
      setSelectedMerchantGroup: (group) => set({ selectedMerchantGroup: group, selectedMerchant: null }),
      setActiveMerchant: (merchant) => set({ activeMerchant: merchant }),
      setUserLocation: (location) => set({ userLocation: location }),
      flyToUserLocation: () => set((s) => ({ locationVersion: s.locationVersion + 1, shouldAutoSearch: true })),
      flyToInitialLocation: () => set({ pendingMove: { lat: INITIAL_CENTER.lat, lng: INITIAL_CENTER.lng, zoom: 5 }, shouldAutoSearch: true }),
      setPendingMove: (move) => set({ pendingMove: move, shouldAutoSearch: true }),
    }),
    {
      name: 'map-storage',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        selectedMerchant: state.selectedMerchant,
        selectedMerchantGroup: state.selectedMerchantGroup,
        activeMerchant: state.activeMerchant,
      }),
    }
  )
);
