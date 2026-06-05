import { createGlobalTheme } from '@vanilla-extract/css';

export const vars = createGlobalTheme(':root', {
  colors: {
    primary: '#10B981', // 깔끔하고 신뢰감을 주는 에메랄드 그린
    primaryLight: '#D1FAE5', // 부드러운 그린 틴트 백그라운드
    primaryDark: '#047857', // 깊은 그린
    secondary: '#0F766E', // 보조색도 조화로운 틸 그린으로 변경
    background: '#FAF9F6', // 눈이 편안한 웜 알라바스터 화이트
    surface: 'rgba(255, 255, 255, 0.75)', // 글래스모피즘 반투명 카드 서피스
    surfaceSolid: '#FFFFFF',
    text: '#1E293B', // 부드러운 슬레이트 네이비 블랙 (Slate 900)
    textMuted: '#64748B', // 보조 텍스트 (Slate 500)
    border: 'rgba(226, 232, 240, 0.8)', // 은은하게 블렌딩되는 테두리선
    error: '#EF4444',
    success: '#10B981',
  },
  space: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  radii: {
    sm: '8px',
    md: '16px',
    lg: '24px',
    full: '9999px',
  },
  fontSizes: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
    xxl: '24px',
  },
  fontWeights: {
    regular: '400',
    medium: '500',
    bold: '700',
  },
  shadows: {
    sm: '0 2px 8px rgba(30, 41, 59, 0.04)',
    md: '0 12px 30px rgba(30, 41, 59, 0.06), 0 2px 8px rgba(30, 41, 59, 0.04)',
    lg: '0 20px 50px rgba(30, 41, 59, 0.12), 0 4px 12px rgba(30, 41, 59, 0.04)',
  },
  zIndices: {
    map: '0',
    mapControl: '5',
    floatingBar: '10',
    bottomSheet: '20',
    modal: '30',
    toast: '40',
  },
});

