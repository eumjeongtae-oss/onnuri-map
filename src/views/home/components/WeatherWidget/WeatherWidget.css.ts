import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const widget = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space.xs,
  padding: `${vars.space.xs} ${vars.space.sm}`,
  backgroundColor: vars.colors.surface,
  borderRadius: vars.radii.full,
  boxShadow: vars.shadows.sm,
  border: `1px solid ${vars.colors.border}`,
});

export const temp = style({
  fontSize: vars.fontSizes.md,
  fontWeight: vars.fontWeights.bold,
  color: vars.colors.text,
});

export const desc = style({
  fontSize: vars.fontSizes.sm,
  color: vars.colors.textMuted,
});
