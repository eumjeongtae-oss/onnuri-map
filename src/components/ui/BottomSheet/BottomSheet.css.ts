import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

const sheetBase = style({
  position: 'fixed',
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: vars.colors.surface,
  borderRadius: `${vars.radii.lg} ${vars.radii.lg} 0 0`,
  boxShadow: vars.shadows.lg,
  zIndex: vars.zIndices.bottomSheet,
  transition: 'height 0.3s ease',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
});

export const sheet = styleVariants({
  peek: [sheetBase, { height: '15vh' }],
  half: [sheetBase, { height: '50vh' }],
  full: [sheetBase, { height: '90vh' }],
});

export const handle = style({
  padding: `${vars.space.sm} 0`,
  display: 'flex',
  justifyContent: 'center',
  flexShrink: 0,
  cursor: 'grab',
});

export const handleBar = style({
  width: 40,
  height: 4,
  borderRadius: vars.radii.full,
  backgroundColor: vars.colors.border,
});

export const content = style({
  flex: 1,
  overflowY: 'auto',
});

export const contentHidden = style({
  flex: 1,
  overflow: 'hidden',
});
