import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const root = style({
  position: 'relative',
  height: '100vh',
  overflow: 'hidden',
});

export const mapArea = style({
  position: 'relative',
  width: '100%',
  height: '100%',
});

export const floatingBar = style({
  position: 'absolute',
  top: vars.space.md,
  left: vars.space.md,
  right: vars.space.md,
  zIndex: vars.zIndices.floatingBar,
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.sm,
});

export const infoRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space.sm,
  flexWrap: 'wrap',
});
