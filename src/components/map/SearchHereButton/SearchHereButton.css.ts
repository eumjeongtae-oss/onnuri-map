import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const button = style({
  position: 'absolute',
  bottom: '100px', // 모바일 바텀시트 및 내 위치 버튼 위
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 10,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '6px',
  padding: '10px 20px',
  backgroundColor: vars.colors.surfaceSolid,
  borderRadius: '24px',
  boxShadow: vars.shadows.md,
  fontSize: '14px',
  fontWeight: '700',
  color: vars.colors.primary,
  border: `1px solid ${vars.colors.primaryLight}`,
  cursor: 'pointer',
  transition: 'all 0.2s ease',

  ':hover': {
    backgroundColor: vars.colors.primaryLight,
    transform: 'translateX(-50%) translateY(-2px)',
    boxShadow: vars.shadows.lg,
  },
  
  ':active': {
    transform: 'translateX(-50%) translateY(0)',
  },

  '@media': {
    '(min-width: 768px)': {
      bottom: '40px', // PC에서는 화면 하단에 배치
    },
  },
});
