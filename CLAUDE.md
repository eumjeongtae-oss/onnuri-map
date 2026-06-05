# 온누리맵 (Onnuri Map)

내 주변 온누리상품권 가맹점을 지도와 리스트로 찾아주는 반응형 웹 서비스.

## 세션 시작 시 필독

새 대화를 시작할 때마다 `.claude/memory/progress.md`를 읽어 현재 작업 맥락을 파악하고, 작업이 끝나면 완료 항목과 다음 할 일을 업데이트한다.

## 기술 스택

- **React 19 + TypeScript**
- **Next.js 15** (App Router — SSR/API Routes/Vercel 배포)
- **@vanilla-extract/css** (스타일링 — Zero-runtime CSS-in-JS, 빌드 타임 정적 CSS 추출)
- **Zustand** (전역 상태 관리)
- **TanStack Query v5** (서버 상태 관리 및 캐싱)
- **react-kakao-maps-sdk** (카카오맵 API 래퍼)

## 명령어

```bash
npm run dev      # 개발 서버 실행
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 서버 실행
npm run lint     # ESLint 검사
```

## 환경 변수

`.env` 파일 사용 (git 제외).

| 변수 | 설명 | 노출 범위 |
|------|------|-----------|
| `NEXT_PUBLIC_KAKAO_MAP_KEY` | 카카오맵 JavaScript App Key | 클라이언트 (필수) |
| `WEATHER_API_KEY` | OpenWeatherMap API Key | 서버 전용 |

> `WEATHER_API_KEY`는 Next.js API Route에서만 사용되므로 브라우저에 노출되지 않는다.
> 가맹점 데이터는 공공 API가 아닌 `public/data/onnuri_final.json` 로컬 파일로 서빙한다. API 키 불필요.

## 폴더 구조

```
src/
  app/
    layout.tsx                   # 루트 레이아웃 (HTML 구조, Providers 주입)
    page.tsx                     # 홈 페이지 (KakaoApp 렌더링)
    providers.tsx                # QueryClientProvider (클라이언트 컴포넌트)
    api/
      merchants/route.ts         # 가맹점 API Route (로컬 JSON → BBox 필터링 후 페이지네이션 응답)
      search/route.ts            # 카카오 장소 검색 API Route 프록시
      weather/route.ts           # 날씨 API Route (OpenWeatherMap 프록시)
  lib/
    merchantData.ts              # public/data/onnuri_final.json 로드 및 인메모리 캐시
  views/
    home/
      HomePage.tsx               # 지도 + 사이드바/바텀시트 통합 페이지
      components/
        SearchBar/               # 검색창 (카카오 Geocoder 연동)
        FilterChips/             # 상품권 종류 필터 (지류/모바일/카드)
        MerchantList/            # 현재 검색 영역 내 가맹점 리스트
        MerchantCard/            # 가맹점 카드 (리스트 항목)
        MerchantDetail/          # PC 사이드바 가맹점 상세 패널 (selectedMerchant 시 노출)
        WeatherWidget/           # 현재 위치 날씨 위젯
  components/
    KakaoApp.tsx                 # 카카오맵 로더 + 앱 루트 (클라이언트 컴포넌트)
    layout/
      DesktopLayout/             # 좌측 사이드바 + 우측 지도 (PC)
      MobileLayout/              # 전체 지도 + 플로팅 바 + 바텀시트 (Mobile)
    map/
      KakaoMap/                  # 카카오맵 래퍼 (onIdle → handleIdle, pendingMove 처리)
      MerchantMarker/            # 단일 가맹점 마커
      MerchantGroupMarker/       # 동일 좌표 가맹점 그룹 마커 (클릭 시 그룹 선택)
      MerchantGroupPopup/        # PC용 그룹 팝업 (지도 위에 오버레이)
      CurrentLocationMarker/     # 내 위치 파란 점 마커
      CurrentLocationLabel/      # 현재 지역명 라벨
      CenterPin/                 # 지도 중심 핀
      MapLoadingIndicator/       # 데이터 로딩 중 표시
      MyLocationButton/          # 내 위치로 이동 버튼
      SearchHereButton/          # "현 지도에서 검색" 버튼 (hasUnsearchedChanges 시 노출)
      ZoomWarningToast/          # 줌 레벨 경고 토스트
    ui/
      BottomSheet/               # 모바일 바텀시트 (스와이프 가능)
      MerchantModal/             # 모바일용 가맹점 상세 모달
      MerchantGroupModal/        # 모바일용 그룹 선택 모달
      Spinner/                   # 로딩 스피너
      ErrorFallback/             # 에러 폴백 UI
      Icons.tsx                  # SVG 아이콘 컴포넌트 모음
  styles/
    theme.css.ts                 # 디자인 토큰 — createGlobalTheme으로 CSS 변수 주입
    global.css.ts                # 전역 CSS 리셋 (globalStyle)
    common.css.ts                # 공용 스타일 유틸 (flexCenter, ellipsis 등)
  api/
    merchants.ts                 # 가맹점 fetch 함수 (/api/merchants 호출, 페이지 자동 병합)
    weather.ts                   # 날씨 fetch 함수 (/api/weather 호출)
  hooks/
    queries/
      useMerchantQueries.ts      # useMerchantsInBounds (searchBounds/searchZoom 기반)
      useWeatherQueries.ts       # useCurrentWeather
    useGeolocation.ts            # Geolocation API 훅
    useMapBounds.ts              # onIdle 핸들러 — BBox 추출, URL 동기화, 검색 트리거 결정
    useMapUrlSync.ts             # URL 쿼리 파라미터 ↔ 지도 상태 동기화
    useMapAddress.ts             # 지도 중심 좌표 → 행정구역명 변환
    useRegionMerchantSearch.ts   # 지역 기반 가맹점 검색 훅
    useDebounce.ts               # 검색 디바운스 훅
  store/
    useMapStore.ts               # 지도 상태 전체 관리 (center, zoom, bounds, searchBounds,
                                 #   shouldAutoSearch, hasUnsearchedChanges, selectedMerchant,
                                 #   selectedMerchantGroup, userLocation, pendingMove 등)
    useFilterStore.ts            # 상품권 필터 상태
  types/
    merchant.ts                  # Merchant, RawMerchant, MerchantType 타입
    api.ts                       # API Route 응답 타입
    kakao.ts                     # 카카오맵 관련 타입 보강
  utils/
    typeGuards.ts                # isOnnuriMerchant 등 타입 가드 함수
    mapUtils.ts                  # BBox 계산, groupMerchantsByLocation 등
    formatters.ts                # 순수 변환 함수
  lib/
    merchantData.ts              # (→ src/lib/merchantData.ts 참고)
public/
  data/
    onnuri_final.json            # 전처리 완료된 가맹점 데이터 (서버에서 직접 읽음)
```

## Next.js App Router 핵심 규칙

### Server Component vs Client Component

이 프로젝트는 지도 앱 특성상 거의 모든 컴포넌트가 클라이언트 컴포넌트다.

| 파일 | 컴포넌트 종류 | 이유 |
|------|--------------|------|
| `src/app/layout.tsx` | Server | HTML 구조만 담당 |
| `src/app/page.tsx` | Server | KakaoApp을 렌더링하는 얇은 래퍼 |
| `src/app/providers.tsx` | **Client** | QueryClient는 클라이언트에서 초기화 |
| `src/components/KakaoApp.tsx` | **Client** | useKakaoLoader 사용 |
| `src/views/home/` 이하 전부 | **Client** | 훅, 카카오맵, 브라우저 API 사용 |
| `src/store/`, `src/hooks/` | **Client** | Zustand, TanStack Query, useEffect 등 |
| `src/app/api/*/route.ts` | Server (Route Handler) | 외부 API 프록시 |

**규칙:** 훅(`useState`, `useEffect` 등), 브라우저 API(`window`, `navigator`), 이벤트 핸들러를 사용하는 파일은 반드시 파일 최상단에 `'use client';` 선언.

### API Route 구조

가맹점 데이터는 외부 API 없이 서버에서 로컬 JSON을 읽어 서빙한다. 날씨는 외부 API를 프록시한다.

```
브라우저 → /api/merchants?minLat=...  →  Next.js Route Handler  →  public/data/onnuri_final.json (로컬)
브라우저 → /api/weather?lat=...       →  Next.js Route Handler  →  api.openweathermap.org
```

- `src/lib/merchantData.ts`가 JSON 파일을 읽고 인메모리 캐시로 보관한다 (서버 재시작 전까지 유지).
- `src/api/merchants.ts`는 여러 페이지를 병렬 fetch 후 중복 제거까지 처리한다.
- `src/api/merchants.ts`와 `src/api/weather.ts`는 항상 `/api/...` 상대 경로로 호출한다.

## 반응형 레이아웃 전략

vanilla-extract 미디어 쿼리로 레이아웃을 완전히 분리한다.

**PC (≥ 768px)**
- 구조: 좌측 고정 사이드바 + 우측 전체 지도
- 사이드바 상단: 로고 + 검색창 + 날씨 위젯 + 필터칩
- 사이드바 하단: 가맹점 리스트 (스크롤) / 선택 시 MerchantDetail로 전환
- 마커 클릭 → MerchantGroupPopup (지도 위 오버레이), 단일이면 바로 MerchantDetail

**Mobile (< 768px)**
- 구조: 전체 화면 지도 + 상단 플로팅 바(검색 + 날씨 + 필터) + 하단 바텀시트
- 마커 클릭 → MerchantGroupModal 또는 MerchantModal (전체 화면 모달)

## 데이터 파이프라인 (타입 안정성)

JSON 파일 데이터도 런타임 스키마가 신뢰 불가이므로 3단계 방어 로직을 반드시 유지한다.

`RawMerchant` 실제 필드 (`src/types/merchant.ts`):
- `name`, `lat`, `lng`, `address`, `category`, `market`, `sido`, `sigungu`
- `paper`, `mobile`, `card` (boolean — 상품권 종류)
- `location_type: 'ADDRESS' | null` — null이면 좌표 없음, 필터링 대상
- `kakaoPlaceId?: string | null`

```ts
// 1단계: unknown으로 수신 (API Route 응답 items 배열)
const raw: unknown[] = response.items;

// 2단계: 타입 가드로 런타임 검증 (typeGuards.ts)
function isOnnuriMerchant(value: unknown): value is RawMerchant {
  return (
    typeof value === 'object' &&
    value !== null &&
    'name' in value &&
    'lat' in value &&
    'lng' in value &&
    (value as RawMerchant).lat !== null &&
    (value as RawMerchant).lng !== null
  );
}

// 3단계: 검증된 데이터만 Merchant[] 도메인 타입으로 변환
const merchants: Merchant[] = rawList.filter(isOnnuriMerchant).map(toMerchant);
```

## 카카오맵 연동 핵심 패턴

### 검색 트리거 방식 — "현 지도에서 검색" 버튼

지도 이동 시 자동으로 API 재요청하지 않는다. `useMapBounds`의 `handleIdle`이 `hasUnsearchedChanges: true`를 세팅하면 `SearchHereButton`이 노출되고, 사용자가 클릭할 때 `triggerSearch()`로 `searchBounds`를 갱신 → TanStack Query 재요청.

예외: `shouldAutoSearch: true`인 경우(초기 로드, 내 위치 이동 등)에는 자동 검색.

```ts
// useMapBounds.ts — handleIdle 요약
const handleIdle = (map: kakao.maps.Map) => {
  const bounds = extractBounds(map);
  state.setBounds(bounds);
  state.setDisplayCenter(center);
  updateUrl(lat, lng, zoom);

  if (state.shouldAutoSearch) {
    state.setSearchBounds(bounds);   // → queryKey 변경 → TanStack Query 재요청
    state.setShouldAutoSearch(false);
  } else {
    state.setHasUnsearchedChanges(true); // → SearchHereButton 노출
  }
};

// triggerSearch() — SearchHereButton 클릭 시
triggerSearch: () => set((s) => ({
  searchBounds: s.bounds,
  searchZoom: s.zoom,
  hasUnsearchedChanges: false,
}));
```

### 지역 검색 (Geocoder)

```ts
kakao.maps.services.geocoder.addressSearch(keyword, (result, status) => {
  if (status === kakao.maps.services.Status.OK) {
    map.panTo(new kakao.maps.LatLng(result[0].y, result[0].x));
  }
});
```

### 동일 좌표 그룹화

같은 `lat/lng`를 가진 가맹점은 `groupMerchantsByLocation()`으로 묶어 `MerchantGroupMarker` 하나로 렌더링. 클러스터러 라이브러리 사용 안 함.

## URL 상태 동기화

지도 중심 좌표와 줌 레벨을 URL 쿼리 파라미터로 유지한다. 뒤로가기 및 가맹점 위치 공유 지원.

```
/?lat=37.5665&lng=126.9780&zoom=14
```

## 스타일링

- **Vanilla Extract** 사용 — 런타임 오버헤드 없이 빌드 타임에 정적 CSS 파일로 추출됨
- 스타일 파일은 반드시 `.css.ts` 확장자 사용
- 테마는 `createGlobalTheme(':root', ...)` 으로 CSS 변수를 `:root`에 주입 (`theme.css.ts`)
  - 컴포넌트에서 `vars.colors.primary` 처럼 참조하면 빌드 시 `var(--colors-primary)`로 변환
  - `import { vars } from '@/styles/theme.css'` 로 불러와서 사용
- 전역 스타일은 `global.css.ts`를 `src/app/layout.tsx`에서 import하는 것만으로 적용
- 공용 스타일 유틸은 `src/styles/common.css.ts`에서 import해서 사용
  - 믹스인 객체: `flexCenter`, `flexBetween`, `ellipsis` — `style({ ...flexCenter })` 처럼 스프레드
  - 독립 클래스: `flexCenterClass`, `flexBetweenClass`, `ellipsisClass` — `className`으로 직접 적용
- 컴포넌트 스타일은 같은 폴더에 `ComponentName.css.ts` 파일로 분리
- 인라인 `style={{}}`은 임시 용도로만 — 가능하면 Vanilla Extract `.css.ts` 파일로 교체
- 반응형은 `@media` 조건을 `.css.ts` 파일 안에 직접 선언 (styled-components 방식 사용 안 함)

### 디자인 토큰 처리 규칙

CSS 변수를 아래 형식으로 전달할 때:
```
background: var(--color-primary, #FF6B35);
```
1. `theme.css.ts`에 해당 변수명이 이미 있으면 → 그대로 사용
2. 없으면 → `theme.css.ts`에 **전달받은 변수명 그대로** 키 이름으로 추가 후 사용

## TypeScript 규칙

- **`any` 사용 금지** — 불명확한 타입은 `unknown` 사용 후 타입 좁히기
- **타입 단언(`as`) 최소화** — 불가피한 경우 이유를 주석으로 명시
- **외부 입력(API 응답, Geolocation 콜백, catch 블록)은 반드시 타입 가드로 검증**

```ts
// catch 블록
catch (error: unknown) {
  if (error instanceof Error) console.error(error.message);
}

// 커스텀 타입 가드 (typeGuards.ts에 모아서 관리)
function isOnnuriMerchant(value: unknown): value is RawMerchant { ... }
```

- API 응답 타입은 반드시 `src/types/api.ts`에 정의 후 사용
- 가맹점 도메인 타입은 `src/types/merchant.ts`에 별도 관리
- 컴포넌트 props는 파일 상단에 `interface`로 선언
- 유니온 타입 적극 활용: `merchantType: 'paper' | 'mobile' | 'card'`

## 코딩 컨벤션

- 컴포넌트: **PascalCase** (`MerchantCard.tsx`)
- 훅: **camelCase** + `use` 접두사 (`useMapBounds.ts`)
- 폴더명: **소문자** (`views/home/components/`)
- 파일명은 역할 명확히 표현 (`Page`, `Widget`, `Layout`, `Card` 접미사 활용)
- API 호출은 컴포넌트에서 직접 하지 않고 `hooks/queries`, `hooks/mutations`를 통해 사용
- 컴포넌트 내 비즈니스 로직은 커스텀 훅으로 분리
- API 관련 파일(`api/`, `hooks/queries/`, `types/`)은 처음부터 도메인별로 분리
  - 예: `merchants.ts`, `weather.ts` — 하나의 파일에 모두 모으지 않는다
- 타입 가드 함수는 모두 `src/utils/typeGuards.ts`에서 관리

## 개발 마일스톤

| Phase | 내용 |
|-------|------|
| **Phase 1** | ~~Vite + vanilla-extract 세팅~~ → **Next.js + vanilla-extract 세팅**, 카카오맵 초기화, Geolocation으로 내 위치 표시 |
| **Phase 2** | PC/모바일 반응형 뼈대(사이드바, 바텀시트) 구축, 공공 API 연동 및 타입 가드 작성 |
| **Phase 3** | 지도 이동 → BBox 계산 → TanStack Query 캐싱 → 동적 리스트 동기화 |
| **Phase 4** | 검색 기능(Geocoder), 날씨 위젯, URL 상태 동기화, 즐겨찾기(로컬스토리지) |
| **Phase 5** | PWA 지원, Vercel 배포, 모바일 엣지 케이스 해결 |

## 커밋 메시지

```
feat: 카카오맵 초기화 및 내 위치 마커 추가
fix: BBox 계산 오류 수정
refactor: 가맹점 타입 가드 유틸로 분리
style: 모바일 바텀시트 스와이프 애니메이션 개선
chore: 환경 변수 설정 및 패키지 추가
```

## Claude에게 — 협업 방식

이 프로젝트 개발자는 주니어이므로 아래 방식으로 협업한다.

### 더 나은 방향이 있을 때

요청을 그대로 이행하기 전에, 더 나은 접근법이 있다고 판단되면 **먼저 제안하고 확인 후 진행**한다.

예시 상황:
- 컴포넌트 안에 로직을 직접 넣으려 하는데 커스텀 훅 분리가 나은 경우
- 반복 코드를 작성하려는데 공통 컴포넌트로 추출할 수 있는 경우
- Zustand store에 너무 많은 책임이 집중될 때
- 타입 가드 없이 API 응답을 바로 사용하려 할 때
- 보안상 문제가 있는 방식을 요청하는 경우 (환경 변수 노출, XSS 등)
- Server Component로 처리 가능한 작업을 Client Component로 만들려 할 때

제안 방식:
> "요청하신 방향으로도 구현 가능하지만, [이유] 때문에 [대안]이 더 적합할 것 같아요. 어떻게 할까요?"

### 올바르지 않은 명령일 때

잘못된 방향이라고 판단되면 그냥 따르지 말고 이유와 함께 바로잡아준다.

예시:
- TypeScript `any`를 쓰려 할 때 → 올바른 타입 선언 방법 안내
- API 응답을 타입 가드 없이 바로 사용하려 할 때 → 3단계 파이프라인 준수 안내
- 인라인 스타일을 계속 쓰려 할 때 → Vanilla Extract `.css.ts` 파일로 전환 제안
- API를 컴포넌트에서 직접 호출하려 할 때 → 훅 분리 안내
- 클라이언트에서 외부 API를 직접 호출하려 할 때 → API Route 프록시 안내

### 코드 분리 제안

작업 중 아래 상황이 보이면, 요청한 작업을 완료한 후 **짧게 분리 제안**한다.

**커스텀 훅으로 분리 제안 기준:**
- 동일한 로직(`useEffect` + `useState` 조합)이 2개 이상의 파일에 등장할 때
- 컴포넌트 파일이 약 150줄을 넘고, 상태/이펙트 로직이 UI와 섞여 있을 때

**유틸 함수로 분리 제안 기준:**
- 전화번호 포매팅, 좌표 계산 등 순수 변환 함수가 2곳 이상에서 쓰일 때

**공통 컴포넌트로 분리 제안 기준:**
- 거의 동일한 JSX 구조가 2개 이상의 파일에 반복될 때

**공통 스타일(`.css.ts`)로 즉시 추출 기준:**
- 새 컴포넌트에 스타일을 추가하기 전에, 기존 `.css.ts` 파일에 동일하거나 유사한 스타일이 있는지 먼저 확인
- 중복이면 제안 없이 **즉시** 공통 파일(`src/styles/`)로 추출하고 양쪽에서 import

제안 방식 (간결하게):
> "`formatPhoneNumber` 함수가 여러 곳에 쓰일 것 같아요. `src/utils/formatters.ts`로 분리할까요?"

### 설명 방식

- 코드만 던지지 않고 **왜 이렇게 했는지** 간단히 설명한다
- 생소한 개념은 짧게 부연한다 (예: "이건 BBox라고 해서, 지도 화면의 좌하단~우상단 좌표 범위예요")
- 선택지가 있을 때는 장단점을 간단히 비교해준다
- 카카오맵 API나 공공 API 특이사항은 미리 언급한다 (예: "카카오맵 클러스터러는 별도 스크립트 로드가 필요해요")
- Next.js App Router 관련 특이사항은 미리 언급한다 (예: "'use client' 누락 시 SSR 환경에서 오류 납니다")
