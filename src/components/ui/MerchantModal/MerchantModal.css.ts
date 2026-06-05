import { style, keyframes } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

const backdropFadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const cardSlideIn = keyframes({
  from: { opacity: 0, transform: 'translateY(20px) scale(0.96)' },
  to: { opacity: 1, transform: 'translateY(0) scale(1)' },
});

export const backdrop = style({
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(15, 23, 42, 0.45)',
  zIndex: vars.zIndices.modal,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: vars.space.md,
  animation: `${backdropFadeIn} 0.2s ease`,
});

export const card = style({
  backgroundColor: vars.colors.surfaceSolid,
  borderRadius: vars.radii.lg,
  boxShadow: vars.shadows.lg,
  width: '100%',
  maxWidth: '440px',
  padding: vars.space.lg,
  animation: `${cardSlideIn} 0.25s cubic-bezier(0.16, 1, 0.3, 1)`,
});

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: vars.space.sm,
  marginBottom: vars.space.md,
});

export const titleGroup = style({
  flex: 1,
  minWidth: 0,
});

export const name = style({
  fontSize: vars.fontSizes.xl,
  fontWeight: vars.fontWeights.bold,
  color: vars.colors.text,
  marginBottom: '6px',
  wordBreak: 'keep-all',
});

export const categoryBadge = style({
  display: 'inline-block',
  fontSize: vars.fontSizes.xs,
  fontWeight: vars.fontWeights.medium,
  color: vars.colors.secondary,
  backgroundColor: `color-mix(in srgb, ${vars.colors.secondary} 10%, transparent)`,
  padding: `2px ${vars.space.sm}`,
  borderRadius: vars.radii.full,
});

export const closeButton = style({
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: vars.space.xs,
  borderRadius: vars.radii.full,
  color: vars.colors.textMuted,
  cursor: 'pointer',
  transition: 'all 0.15s ease',
  ':hover': {
    backgroundColor: vars.colors.primaryLight,
    color: vars.colors.primaryDark,
  },
});

export const divider = style({
  height: '1px',
  backgroundColor: vars.colors.border,
  margin: `0 0 ${vars.space.md} 0`,
});

export const infoList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.sm,
});

export const infoRow = style({
  display: 'flex',
  alignItems: 'flex-start',
  gap: vars.space.sm,
  fontSize: vars.fontSizes.sm,
  lineHeight: '1.5',
});

export const infoIcon = style({
  flexShrink: 0,
  marginTop: '2px',
  color: vars.colors.textMuted,
});

export const infoValue = style({
  color: vars.colors.text,
  flex: 1,
  wordBreak: 'keep-all',
});

export const typesRow = style({
  display: 'flex',
  gap: vars.space.xs,
  flexWrap: 'wrap',
  marginTop: vars.space.md,
});

export const badgePaper = style({
  fontSize: vars.fontSizes.xs,
  fontWeight: vars.fontWeights.medium,
  color: '#92400E',
  backgroundColor: '#FEF3C7',
  padding: `2px ${vars.space.sm}`,
  borderRadius: vars.radii.full,
  border: '1px solid #FDE68A',
});

export const badgeMobile = style({
  fontSize: vars.fontSizes.xs,
  fontWeight: vars.fontWeights.medium,
  color: '#1D4ED8',
  backgroundColor: '#EFF6FF',
  padding: `2px ${vars.space.sm}`,
  borderRadius: vars.radii.full,
  border: '1px solid #BFDBFE',
});

export const badgeCard = style({
  fontSize: vars.fontSizes.xs,
  fontWeight: vars.fontWeights.medium,
  color: '#065F46',
  backgroundColor: '#ECFDF5',
  padding: `2px ${vars.space.sm}`,
  borderRadius: vars.radii.full,
  border: '1px solid #A7F3D0',
});

export const actions = style({
  display: 'flex',
  gap: vars.space.sm,
  marginTop: vars.space.lg,
});

const buttonBase = style({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: vars.space.xs,
  padding: `${vars.space.sm} ${vars.space.md}`,
  borderRadius: vars.radii.md,
  fontSize: vars.fontSizes.sm,
  fontWeight: vars.fontWeights.bold,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  textDecoration: 'none',
});

export const kakaoButton = style([
  buttonBase,
  {
    backgroundColor: '#FEE500',
    color: '#191919',
    ':hover': {
      backgroundColor: '#F5DC00',
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(254, 229, 0, 0.4)',
    },
    ':active': {
      transform: 'translateY(0)',
    },
  },
]);

export const directionsButton = style([
  buttonBase,
  {
    backgroundColor: vars.colors.primary,
    color: '#ffffff',
    ':hover': {
      backgroundColor: vars.colors.primaryDark,
      transform: 'translateY(-1px)',
      boxShadow: `0 4px 12px rgba(255, 111, 97, 0.35)`,
    },
    ':active': {
      transform: 'translateY(0)',
    },
  },
]);
