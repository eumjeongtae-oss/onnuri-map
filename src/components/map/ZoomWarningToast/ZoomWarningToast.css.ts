import { style, keyframes } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

const fadeInDown = keyframes({
  '0%': { opacity: 0, transform: 'translate(-50%, -20px)' },
  '100%': { opacity: 1, transform: 'translate(-50%, 0)' },
});

export const toastContainer = style({
  position: 'absolute',
  top: '20px',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 30, // 카카오맵 컨트롤들보다 위에 보이도록
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '12px 20px',
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(8px)',
  WebkitBackdropFilter: 'blur(8px)',
  borderRadius: '24px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  border: `1px solid ${vars.colors.border}`,
  animation: `${fadeInDown} 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards`,
  pointerEvents: 'none', // 클릭 통과
});

export const iconWrapper = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: vars.colors.primary, // 웜 탠저린 계열
});

export const text = style({
  fontSize: '14px',
  fontWeight: 600,
  color: vars.colors.text,
  margin: 0,
});
