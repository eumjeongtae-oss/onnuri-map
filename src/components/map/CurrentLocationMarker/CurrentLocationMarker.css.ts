import { style, keyframes } from '@vanilla-extract/css';

const pulse = keyframes({
  '0%': {
    transform: 'scale(1)',
    opacity: 1,
    boxShadow: `0 0 0 0 rgba(0, 112, 243, 0.7)`,
  },
  '70%': {
    transform: 'scale(1.2)',
    boxShadow: `0 0 0 15px rgba(0, 112, 243, 0)`,
  },
  '100%': {
    transform: 'scale(1)',
    opacity: 1,
    boxShadow: `0 0 0 0 rgba(0, 112, 243, 0)`,
  },
});

export const marker = style({
  width: '16px',
  height: '16px',
  backgroundColor: '#0070f3', // Blue color for current location
  border: '3px solid white',
  borderRadius: '50%',
  position: 'absolute',
  top: '-8px',
  left: '-8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
  animation: `${pulse} 2s infinite`,
  zIndex: 10,
});
