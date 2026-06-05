import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';
import { flexCenter } from '@/styles/common.css';

export const list = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.sm,
  padding: vars.space.md,
});

export const center = style({
  ...flexCenter,
  padding: vars.space.xl,
});

export const empty = style({
  textAlign: 'center',
  padding: vars.space.xl,
  fontSize: vars.fontSizes.sm,
  color: vars.colors.textMuted,
});
