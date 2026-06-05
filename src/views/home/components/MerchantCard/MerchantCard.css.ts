import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';
import { flexBetween, ellipsis } from '@/styles/common.css';

export const card = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  textAlign: 'left',
  padding: vars.space.md,
  borderRadius: vars.radii.md,
  backgroundColor: vars.colors.surfaceSolid,
  border: `1.5px solid ${vars.colors.border}`,
  boxShadow: vars.shadows.sm,
  transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  ':hover': {
    borderColor: vars.colors.primary,
    boxShadow: vars.shadows.md,
    transform: 'translateY(-2px)',
  },
  ':active': {
    transform: 'translateY(0)',
  },
});

export const header = style({
  ...flexBetween,
  gap: vars.space.sm,
  marginBottom: vars.space.sm,
  width: '100%',
});

export const name = style({
  ...ellipsis,
  fontSize: vars.fontSizes.md,
  fontWeight: vars.fontWeights.bold,
  color: vars.colors.text,
  flex: 1,
});

export const category = style({
  flexShrink: 0,
  fontSize: '11px',
  fontWeight: vars.fontWeights.medium,
  color: vars.colors.secondary,
  backgroundColor: `color-mix(in srgb, ${vars.colors.secondary} 8%, transparent)`,
  padding: `2px ${vars.space.sm}`,
  borderRadius: vars.radii.full,
});

export const infoRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space.xs,
  fontSize: vars.fontSizes.sm,
  color: vars.colors.textMuted,
  marginTop: '6px',
  width: '100%',
});

export const infoIcon = style({
  flexShrink: 0,
  color: vars.colors.textMuted,
  opacity: 0.6,
});

export const addressText = style({
  ...ellipsis,
  flex: 1,
});

export const phoneText = style({
  flex: 1,
});

export const badgeContainer = style({
  display: 'flex',
  gap: vars.space.xs,
  marginTop: vars.space.sm,
});

const badgeBase = style({
  fontSize: '10px',
  fontWeight: vars.fontWeights.bold,
  padding: '2px 8px',
  borderRadius: vars.radii.sm,
  letterSpacing: '-0.02em',
});

export const badgePaper = style([
  badgeBase,
  {
    color: '#B45309', // Amber 700
    backgroundColor: '#FEF3C7', // Amber 100
  },
]);

export const badgeMobile = style([
  badgeBase,
  {
    color: '#047857',
    backgroundColor: '#D1FAE5',
  },
]);

export const badgeCard = style([
  badgeBase,
  {
    color: '#1D4ED8',
    backgroundColor: '#DBEAFE',
  },
]);

