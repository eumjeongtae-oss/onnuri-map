import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';
import { flexBetween, ellipsis } from '@/styles/common.css';

export const wrapper = style({
  position: 'relative',
  width: '100%',
});

export const container = style({
  ...flexBetween,
  gap: vars.space.sm,
  padding: `${vars.space.sm} ${vars.space.md}`,
  backgroundColor: vars.colors.surfaceSolid,
  borderRadius: vars.radii.full,
  boxShadow: vars.shadows.md,
  border: '1.5px solid transparent',
  transition: 'all 0.2s ease',
  selectors: {
    '&:focus-within': {
      borderColor: vars.colors.primary,
      boxShadow: `0 0 0 4px rgba(255, 111, 97, 0.15), ${vars.shadows.md}`,
    },
  },
});


export const input = style({
  flex: 1,
  border: 'none',
  outline: 'none',
  fontSize: vars.fontSizes.md,
  color: vars.colors.text,
  backgroundColor: 'transparent',
  '::placeholder': {
    color: vars.colors.textMuted,
  },
});

export const dropdown = style({
  position: 'absolute',
  top: 'calc(100% + 6px)',
  left: 0,
  right: 0,
  backgroundColor: vars.colors.surfaceSolid,
  borderRadius: vars.radii.md,
  boxShadow: vars.shadows.lg,
  border: `1px solid ${vars.colors.border}`,
  overflow: 'hidden',
  zIndex: 50,
  maxHeight: '360px',
  overflowY: 'auto',
});

export const dropdownItem = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space.sm,
  width: '100%',
  textAlign: 'left',
  padding: `${vars.space.sm} ${vars.space.md}`,
  border: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  transition: 'background-color 0.15s ease',
  ':hover': {
    backgroundColor: vars.colors.primaryLight,
  },
});

export const badge = style({
  flexShrink: 0,
  fontSize: '0.7rem',
  fontWeight: vars.fontWeights.bold,
  padding: '4px 8px',
  borderRadius: vars.radii.sm,
  whiteSpace: 'nowrap',
});

export const badgePlace = style({
  backgroundColor: 'rgba(59, 130, 246, 0.15)',
  color: '#2563EB',
});

export const badgeMerchant = style({
  backgroundColor: 'rgba(255, 111, 97, 0.15)',
  color: vars.colors.primary,
});

export const itemName = style({
  ...ellipsis,
  fontSize: vars.fontSizes.sm,
  fontWeight: vars.fontWeights.medium,
  color: vars.colors.text,
});

export const itemSub = style({
  ...ellipsis,
  fontSize: vars.fontSizes.xs,
  color: vars.colors.textMuted,
});
