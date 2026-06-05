import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const container = style({
  position: 'absolute',
  right: vars.space.md,
  bottom: vars.space.xl,
  zIndex: vars.zIndices.mapControl,
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.sm,

  '@media': {
    '(max-width: 767px)': {
      bottom: 'calc(15vh + 16px)',
    },
  },
});

export const button = style({
  width: 48,
  height: 48,
  padding: 0,
  borderRadius: vars.radii.full,
  border: '1px solid rgba(255, 255, 255, 0.4)',
  backgroundColor: 'rgba(255, 255, 255, 0.85)',
  backdropFilter: 'blur(8px)',
  WebkitBackdropFilter: 'blur(8px)',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: vars.colors.text,
  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',

  ':hover': {
    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.12)',
    transform: 'translateY(-2px)',
    color: vars.colors.primary,
  },

  ':active': {
    transform: 'translateY(0)',
  },

  ':disabled': {
    color: vars.colors.textMuted,
    cursor: 'not-allowed',
    transform: 'none',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
  },

  '@media': {
    '(min-width: 768px)': {
      width: 'auto',
      padding: '0 20px',
    },
  },
});

export const text = style({
  marginLeft: '8px',
  fontWeight: '600',
  fontSize: '15px',
  display: 'none',

  '@media': {
    '(min-width: 768px)': {
      display: 'inline',
    },
  },
});
