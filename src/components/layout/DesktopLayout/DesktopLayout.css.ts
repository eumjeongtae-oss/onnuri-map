import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const root = style({
  position: 'relative',
  height: '100vh',
  width: '100vw',
  overflow: 'hidden',
});

export const mapArea = style({
  position: 'absolute',
  inset: 0,
  zIndex: vars.zIndices.map,
});

export const sidebar = style({
  position: 'absolute',
  top: vars.space.md,
  left: vars.space.md,
  bottom: vars.space.md,
  width: 380,
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: vars.colors.surface,
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border: `1px solid rgba(255, 255, 255, 0.4)`,
  borderRadius: vars.radii.lg,
  boxShadow: vars.shadows.lg,
  overflow: 'hidden',
  zIndex: vars.zIndices.floatingBar,
});

export const sidebarTop = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.md,
  padding: vars.space.md,
  borderBottom: `1px solid ${vars.colors.border}`,
  flexShrink: 0,
});

export const logoContainer = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space.sm,
  paddingBottom: vars.space.xs,
});

export const logoIcon = style({
  fontSize: '24px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '42px',
  height: '42px',
  backgroundColor: vars.colors.primaryLight,
  borderRadius: vars.radii.md,
  boxShadow: '0 4px 10px rgba(255, 111, 97, 0.15)',
});

export const logoText = style({
  fontSize: vars.fontSizes.lg,
  fontWeight: vars.fontWeights.bold,
  color: vars.colors.text,
  letterSpacing: '-0.02em',
});

export const logoDesc = style({
  fontSize: vars.fontSizes.xs,
  color: vars.colors.textMuted,
  marginTop: '2px',
});

export const sidebarScroll = style({
  flex: 1,
  overflowY: 'auto',
  padding: vars.space.md,
});
