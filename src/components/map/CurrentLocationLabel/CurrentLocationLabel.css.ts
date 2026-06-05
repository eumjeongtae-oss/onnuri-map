import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const label = style({
  position: 'absolute',
  top: vars.space.xl,
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: vars.zIndices.mapControl,
  display: 'inline-flex',
  alignItems: 'center',
  gap: vars.space.sm,
  padding: '10px 20px',
  backgroundColor: 'rgba(255, 255, 255, 0.85)',
  backdropFilter: 'blur(8px)',
  WebkitBackdropFilter: 'blur(8px)',
  borderRadius: vars.radii.full,
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
  border: '1px solid rgba(255, 255, 255, 0.4)',
  color: vars.colors.text,
  fontSize: vars.fontSizes.sm,
  fontWeight: vars.fontWeights.bold,
  pointerEvents: 'none',

  '@media': {
    '(max-width: 767px)': {
      top: '90px', // 모바일에서는 검색바 아래쯤 위치하도록 조정
    },
  },
});
