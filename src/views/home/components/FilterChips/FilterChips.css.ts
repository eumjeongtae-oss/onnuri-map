import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const container = style({
  display: 'flex',
  gap: vars.space.sm,
  flexWrap: 'wrap',
});

const chipBase = style({
  padding: `${vars.space.xs} ${vars.space.md}`,
  borderRadius: vars.radii.full,
  fontSize: vars.fontSizes.sm,
  fontWeight: vars.fontWeights.medium,
  border: 'none',
  transition: 'all 0.2s ease',
  cursor: 'pointer',
});

export const chip = styleVariants({
  active: [
    chipBase,
    {
      backgroundColor: vars.colors.primary,
      color: '#fff',
      fontWeight: vars.fontWeights.bold,
      boxShadow: `0 4px 12px rgba(255, 111, 97, 0.3)`,
      transform: 'translateY(-1px)',
    },
  ],
  inactive: [
    chipBase,
    {
      backgroundColor: vars.colors.surfaceSolid,
      color: vars.colors.textMuted,
      border: `1.5px solid ${vars.colors.border}`,
      boxShadow: 'none',
      ':hover': {
        backgroundColor: vars.colors.primaryLight,
        color: vars.colors.primaryDark,
        borderColor: 'transparent',
        transform: 'translateY(-1px)',
      },
    },
  ],
});

