import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';
import { flexCenter } from '@/styles/common.css';

export const container = style({
  ...flexCenter,
  flexDirection: 'column',
  gap: vars.space.md,
  padding: vars.space.xl,
  color: vars.colors.textMuted,
});

export const message = style({
  fontSize: vars.fontSizes.sm,
  textAlign: 'center',
});

export const retryButton = style({
  padding: `${vars.space.sm} ${vars.space.md}`,
  borderRadius: vars.radii.md,
  backgroundColor: vars.colors.primary,
  color: '#fff',
  fontSize: vars.fontSizes.sm,
  fontWeight: vars.fontWeights.medium,
  ':hover': {
    backgroundColor: vars.colors.primaryDark,
  },
});
