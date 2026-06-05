import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const centerPinWrapper = style({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -100%)',
  zIndex: vars.zIndices.mapControl,
  pointerEvents: 'none',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const pinShadow = style({
  width: '12px',
  height: '4px',
  backgroundColor: 'rgba(0,0,0,0.2)',
  borderRadius: '50%',
  marginTop: '-2px',
  filter: 'blur(2px)',
});
