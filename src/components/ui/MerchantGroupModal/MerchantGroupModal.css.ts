import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';
import { backdrop, card, header, closeButton } from '../MerchantModal/MerchantModal.css';

export { backdrop, card, header, closeButton };

export const titleGroup = style({
  flex: 1,
});

export const title = style({
  fontSize: vars.fontSizes.lg,
  fontWeight: vars.fontWeights.bold,
  color: vars.colors.text,
  marginBottom: '4px',
});

export const subtitle = style({
  fontSize: vars.fontSizes.sm,
  color: vars.colors.textMuted,
});

export const list = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.sm,
  marginTop: vars.space.md,
  maxHeight: '60vh', // Mobile viewport height limit
  overflowY: 'auto',
  paddingRight: vars.space.xs,
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
});

export const listItem = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '12px 14px',
  borderRadius: vars.radii.md,
  backgroundColor: 'rgba(255, 255, 255, 0.6)',
  border: `1px solid ${vars.colors.border}`,
  cursor: 'pointer',
  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
  ':hover': {
    backgroundColor: vars.colors.primaryLight,
    borderColor: 'rgba(255, 111, 97, 0.3)',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 10px rgba(255, 111, 97, 0.1)',
  },
  ':active': {
    backgroundColor: vars.colors.primaryLight,
    borderColor: vars.colors.primary,
    transform: 'scale(0.98)',
  },
});

export const itemName = style({
  fontSize: vars.fontSizes.md,
  fontWeight: vars.fontWeights.bold,
  color: vars.colors.text,
  marginBottom: '4px',
});

export const itemCategory = style({
  fontSize: vars.fontSizes.xs,
  color: vars.colors.secondary,
});
