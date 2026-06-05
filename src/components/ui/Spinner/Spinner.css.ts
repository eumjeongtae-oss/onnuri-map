import { style, styleVariants, keyframes } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

const spin = keyframes({
  from: { transform: 'rotate(0deg)' },
  to: { transform: 'rotate(360deg)' },
});

const base = style({
  borderRadius: '50%',
  border: `3px solid ${vars.colors.border}`,
  borderTopColor: vars.colors.primary,
  animation: `${spin} 0.7s linear infinite`,
});

export const spinner = styleVariants({
  sm: [base, { width: 16, height: 16 }],
  md: [base, { width: 32, height: 32 }],
  lg: [base, { width: 48, height: 48 }],
});
