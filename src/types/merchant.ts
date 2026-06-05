export type MerchantType = 'paper' | 'mobile' | 'card';

export interface Merchant {
  id: string;
  name: string;
  category: string;
  market: string;
  sido: string;
  sigungu: string;
  address: string;
  lat: number;
  lng: number;
  merchantTypes: MerchantType[];
  kakaoPlaceId: string | null;
}

// onnuri_final.json 아이템 구조 (2024 데이터 기준)
export interface RawMerchant {
  name: string;
  market: string;
  sido: string;
  sigungu: string;
  address: string;
  category: string;
  paper: boolean;
  mobile: boolean;
  card: boolean;
  year: string;
  lat: number | null;
  lng: number | null;
  location_type: 'ADDRESS' | null;
  kakaoPlaceId?: string | null;
}
