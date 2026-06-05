// 카카오맵 전역 타입 보강
// window.kakao는 kakao maps SDK 스크립트 로드 후 주입됨

export interface LatLng {
  lat: number;
  lng: number;
}

export interface MapBounds {
  sw: LatLng;
  ne: LatLng;
}
