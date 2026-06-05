# 온누리맵

내 주변 온누리상품권 가맹점을 지도와 리스트로 찾아주는 반응형 웹 서비스.

## 미리보기

| PC | Mobile |
|---|---|
| 좌측 사이드바 + 지도 | 전체화면 지도 + 바텀시트 |

## 주요 기능

- **현재 위치 기반 가맹점 탐색** — Geolocation API로 내 위치를 자동으로 감지
- **지도 연동 리스트** — 지도를 이동하면 "현 지도에서 검색" 버튼이 나타나고, 클릭 시 해당 영역의 가맹점 목록을 불러옴
- **상품권 종류 필터** — 지류 / 모바일 / 카드 상품권 종류별 필터링
- **가맹점 검색** — 카카오 Geocoder를 활용한 주소 및 지역 검색
- **가맹점 상세 정보** — 업종, 주소, 전화번호, 지도 마커 포커스
- **날씨 위젯** — 현재 위치의 날씨 표시
- **URL 상태 동기화** — 지도 중심 좌표와 줌 레벨을 URL 쿼리로 유지 (뒤로가기, 위치 공유 지원)
- **반응형 레이아웃** — PC는 사이드바 + 지도, 모바일은 바텀시트 + 지도 구조

## 기술 스택

| 분류 | 기술 |
|------|------|
| 프레임워크 | Next.js 15 (App Router) |
| UI | React 19 + TypeScript |
| 스타일링 | vanilla-extract (Zero-runtime CSS-in-JS) |
| 전역 상태 | Zustand |
| 서버 상태 / 캐싱 | TanStack Query v5 |
| 지도 | 카카오맵 API (react-kakao-maps-sdk) |
| 배포 | Vercel |

## 시작하기

### 요구사항

- Node.js 18 이상
- 카카오 개발자 계정 (JavaScript App Key)
- OpenWeatherMap API Key
- 공공데이터포털 API Key (소상공인시장진흥공단)

### 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 아래 값을 채웁니다.

```env
NEXT_PUBLIC_KAKAO_MAP_KEY=카카오맵_JavaScript_App_Key
WEATHER_API_KEY=OpenWeatherMap_API_Key
PUBLIC_DATA_KEY=공공데이터포털_API_Key
```

> `WEATHER_API_KEY`와 `PUBLIC_DATA_KEY`는 Next.js API Route에서만 사용되므로 브라우저에 노출되지 않습니다.

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (http://localhost:3000)
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

## 프로젝트 구조

```
src/
  app/                    # Next.js App Router
    api/
      merchants/          # 가맹점 API Route (공공데이터포털 프록시)
      weather/            # 날씨 API Route (OpenWeatherMap 프록시)
  components/
    layout/               # DesktopLayout, MobileLayout
    map/                  # KakaoMap, MerchantMarker, 각종 지도 UI
    ui/                   # BottomSheet, Spinner, Modal 등 공용 컴포넌트
  views/
    home/                 # 홈 페이지 + 하위 컴포넌트
      components/
        SearchBar/        # 검색창 (카카오 Geocoder 연동)
        FilterChips/      # 상품권 종류 필터
        MerchantList/     # 가맹점 리스트
        MerchantCard/     # 가맹점 카드
        MerchantDetail/   # 가맹점 상세 패널
        WeatherWidget/    # 날씨 위젯
  hooks/
    queries/              # TanStack Query 훅
  store/                  # Zustand 스토어
  styles/                 # 디자인 토큰, 전역 스타일, 공용 유틸
  types/                  # TypeScript 타입 정의
  utils/                  # 타입 가드, 포매터, 지도 유틸
```

## API 구조

외부 API는 서버에서 호출해 CORS를 우회하고 API 키를 클라이언트에 노출하지 않습니다.

```
브라우저 → /api/merchants?minLat=...  →  Next.js Route Handler  →  공공데이터포털
브라우저 → /api/weather?lat=...       →  Next.js Route Handler  →  OpenWeatherMap
```

## 라이선스

MIT
