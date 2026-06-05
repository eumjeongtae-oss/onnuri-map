import { style, keyframes } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

const popIn = keyframes({
  from: { opacity: 0, transform: 'translateY(10px) scale(0.96)' },
  to: { opacity: 1, transform: 'translateY(0) scale(1)' },
});

export const popupContainer = style({
  position: 'absolute',
  bottom: '40px', // 마커 위에 표시 (마커 높이 고려)
  left: '50%',
  transform: 'translateX(-50%)',
  width: '280px',
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  borderRadius: vars.radii.lg,
  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
  border: '1px solid rgba(255, 255, 255, 0.6)',
  padding: vars.space.md,
  animation: `${popIn} 0.25s cubic-bezier(0.34, 1.56, 0.64, 1) forwards`,
  pointerEvents: 'auto',
  zIndex: 100,
});

export const popupTail = style({
  position: 'absolute',
  bottom: '-8px',
  left: '50%',
  transform: 'translateX(-50%)',
  width: 0,
  height: 0,
  borderLeft: '8px solid transparent',
  borderRight: '8px solid transparent',
  borderTop: '8px solid rgba(255, 255, 255, 0.95)',
  filter: 'drop-shadow(0 4px 3px rgba(0,0,0,0.05))',
});

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: vars.space.sm,
  borderBottom: `1px solid ${vars.colors.border}`,
  paddingBottom: vars.space.xs,
});

export const title = style({
  fontSize: vars.fontSizes.sm,
  fontWeight: vars.fontWeights.bold,
  color: vars.colors.text,
  margin: 0,
});

export const subtitle = style({
  fontSize: vars.fontSizes.xs,
  color: vars.colors.textMuted,
  display: 'block',
  marginTop: '2px',
});

export const closeButton = style({
  background: 'none',
  border: 'none',
  padding: '4px',
  margin: '-4px',
  cursor: 'pointer',
  color: vars.colors.textMuted,
  borderRadius: vars.radii.full,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.2s ease',
  ':hover': {
    backgroundColor: vars.colors.background,
    color: vars.colors.text,
  },
});

export const list = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.xs,
  maxHeight: '220px',
  overflowY: 'auto',
  paddingRight: '4px',
  // 세련된 커스텀 스크롤바
  '::-webkit-scrollbar': {
    width: '4px',
  },
  '::-webkit-scrollbar-track': {
    backgroundColor: 'transparent',
  },
  '::-webkit-scrollbar-thumb': {
    backgroundColor: vars.colors.border,
    borderRadius: vars.radii.full,
  },
  selectors: {
    '&::-webkit-scrollbar-thumb:hover': {
      backgroundColor: vars.colors.textMuted,
    },
  },
});

export const listItem = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '8px 10px',
  borderRadius: vars.radii.md,
  cursor: 'pointer',
  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
  border: '1px solid transparent',
  backgroundColor: 'transparent',
  ':hover': {
    backgroundColor: vars.colors.primaryLight,
    borderColor: 'rgba(255, 111, 97, 0.2)',
    transform: 'translateY(-1px)',
    boxShadow: '0 2px 5px rgba(255, 111, 97, 0.08)',
  },
  ':active': {
    transform: 'scale(0.98)',
  },
});

export const itemName = style({
  fontSize: vars.fontSizes.sm,
  fontWeight: vars.fontWeights.bold,
  color: vars.colors.text,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

export const itemCategory = style({
  fontSize: '11px',
  color: vars.colors.secondary,
  marginTop: '2px',
});
