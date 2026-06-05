import { style, keyframes } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';
import { flexBetween } from '@/styles/common.css';

const slideUp = keyframes({
  from: { opacity: 0, transform: 'translateY(12px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
});

export const panel = style({
  padding: vars.space.md,
  backgroundColor: vars.colors.surfaceSolid,
  borderRadius: vars.radii.md,
  border: `1.5px solid ${vars.colors.border}`,
  boxShadow: vars.shadows.md,
  marginBottom: vars.space.md,
  animationName: slideUp,
  animationDuration: '0.3s',
  animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
});

export const header = style({
  ...flexBetween,
  alignItems: 'flex-start',
  marginBottom: vars.space.md,
  gap: vars.space.sm,
});

export const name = style({
  fontSize: vars.fontSizes.lg,
  fontWeight: vars.fontWeights.bold,
  color: vars.colors.text,
  marginBottom: '4px',
});

export const category = style({
  fontSize: vars.fontSizes.xs,
  fontWeight: vars.fontWeights.medium,
  color: vars.colors.secondary,
  backgroundColor: `color-mix(in srgb, ${vars.colors.secondary} 8%, transparent)`,
  padding: `2px ${vars.space.sm}`,
  borderRadius: vars.radii.full,
  display: 'inline-block',
});

export const closeButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: vars.colors.textMuted,
  padding: vars.space.xs,
  borderRadius: vars.radii.full,
  transition: 'all 0.2s ease',
  cursor: 'pointer',
  ':hover': {
    backgroundColor: vars.colors.primaryLight,
    color: vars.colors.primaryDark,
  },
});

export const infoList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.sm,
  fontSize: vars.fontSizes.sm,
  marginBottom: vars.space.md,
  borderTop: `1px solid ${vars.colors.border}`,
  paddingTop: vars.space.md,
});

export const infoRow = style({
  display: 'flex',
  alignItems: 'flex-start',
  gap: vars.space.sm,
  lineHeight: 1.4,
});

export const infoLabel = style({
  color: vars.colors.textMuted,
  fontWeight: vars.fontWeights.medium,
  width: '50px',
  flexShrink: 0,
});

export const infoValue = style({
  color: vars.colors.text,
  flex: 1,
});

export const actionContainer = style({
  display: 'flex',
  gap: vars.space.sm,
  marginTop: vars.space.md,
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
});

export const directionsButton = style([
  buttonBase,
  {
    backgroundColor: vars.colors.primary,
    color: '#ffffff',
    boxShadow: `0 4px 12px rgba(255, 111, 97, 0.25)`,
    ':hover': {
      backgroundColor: vars.colors.primaryDark,
      transform: 'translateY(-1px)',
      boxShadow: `0 6px 16px rgba(255, 111, 97, 0.35)`,
    },
    ':active': {
      transform: 'translateY(0)',
    },
  },
]);

export const kakaoButton = style([
  buttonBase,
  {
    backgroundColor: '#FEE500',
    color: '#191919',
    textDecoration: 'none',
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

export const callButton = style([
  buttonBase,
  {
    backgroundColor: vars.colors.surfaceSolid,
    color: vars.colors.text,
    border: `1.5px solid ${vars.colors.border}`,
    ':hover': {
      backgroundColor: vars.colors.background,
      borderColor: vars.colors.textMuted,
      transform: 'translateY(-1px)',
    },
    ':active': {
      transform: 'translateY(0)',
    },
  },
]);

