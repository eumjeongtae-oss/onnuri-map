import { style, keyframes } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

const markerBounce = keyframes({
  '0%':   { transform: 'scale(1)' },
  '40%':  { transform: 'scale(1.5)' },
  '65%':  { transform: 'scale(1.2)' },
  '80%':  { transform: 'scale(1.38)' },
  '100%': { transform: 'scale(1.3)' },
});

export const markerWrapper = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  cursor: 'pointer',
  transformOrigin: 'bottom center',
  pointerEvents: 'auto',
});

export const markerSelected = style({
  animation: `${markerBounce} 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards`,
  zIndex: 10,
});

export const markerPin = style({
  width: '36px',
  height: '36px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: vars.colors.primary,
  color: '#fff',
  boxShadow: '0 4px 10px rgba(16, 185, 129, 0.25), 0 2px 4px rgba(0, 0, 0, 0.1)',
  border: '2.5px solid white',
  zIndex: 2,
  position: 'relative',
  transition: 'background-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease',
  selectors: {
    [`${markerWrapper}:hover &`]: {
      transform: 'scale(1.1) translateY(-1px)',
      boxShadow: '0 6px 14px rgba(30, 41, 59, 0.15)',
    },
  },
});

export const markerPinSelected = style({
  backgroundColor: vars.colors.secondary,
  boxShadow: '0 4px 12px rgba(15, 118, 110, 0.4), 0 2px 4px rgba(0, 0, 0, 0.1)',
});

export const markerTail = style({
  width: 0,
  height: 0,
  borderLeft: '6px solid transparent',
  borderRight: '6px solid transparent',
  borderTop: `8px solid ${vars.colors.primary}`,
  marginTop: '-1px',
  zIndex: 1,
  filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.15))',
  transition: 'border-top-color 0.2s ease',
});

export const markerTailSelected = style({
  borderTopColor: vars.colors.secondary,
});
