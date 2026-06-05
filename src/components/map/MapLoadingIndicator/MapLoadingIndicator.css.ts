import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const container = style({
  position: 'absolute',
  top: '20px',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 10,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  padding: '8px 16px',
  backgroundColor: vars.colors.surfaceSolid,
  borderRadius: '20px',
  boxShadow: vars.shadows.md,
  fontSize: '14px',
  fontWeight: '500',
  color: vars.colors.text,
  pointerEvents: 'none', // 지도를 클릭하거나 조작하는 데 방해되지 않도록 설정
});
