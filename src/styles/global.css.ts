import { globalStyle } from '@vanilla-extract/css';
import { vars } from './theme.css';

globalStyle('*, *::before, *::after', {
  boxSizing: 'border-box',
  margin: 0,
  padding: 0,
});

globalStyle('html, body', {
  height: '100%',
  fontFamily: "'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  fontSize: '16px',
  lineHeight: 1.5,
  color: vars.colors.text,
  backgroundColor: vars.colors.background,
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
});

globalStyle('a', {
  color: 'inherit',
  textDecoration: 'none',
});

globalStyle('button', {
  cursor: 'pointer',
  border: 'none',
  background: 'none',
  fontFamily: 'inherit',
});

globalStyle('ul, ol', {
  listStyle: 'none',
});

/* 슬림한 모던 스크롤바 디자인 */
globalStyle('::-webkit-scrollbar', {
  width: '6px',
  height: '6px',
});

globalStyle('::-webkit-scrollbar-track', {
  background: 'transparent',
});

globalStyle('::-webkit-scrollbar-thumb', {
  backgroundColor: 'rgba(30, 41, 59, 0.12)',
  borderRadius: '9999px',
});

globalStyle('::-webkit-scrollbar-thumb:hover', {
  backgroundColor: 'rgba(30, 41, 59, 0.25)',
});

