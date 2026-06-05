import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';
import { markerPin, markerPinSelected, markerTail, markerTailSelected, markerWrapper, markerSelected } from '../MerchantMarker/MerchantMarker.css';

// 기존 스타일을 재사용하거나 덮어씁니다.
export { markerPin, markerPinSelected, markerTail, markerTailSelected, markerWrapper, markerSelected };

export const badgePin = style([
  markerPin,
  {
    backgroundColor: vars.colors.primary,
    fontWeight: 'bold',
    fontSize: '14px',
    lineHeight: 1,
    letterSpacing: '-0.5px',
  },
]);

export const badgePinSelected = style([
  markerPinSelected,
  {
    backgroundColor: vars.colors.secondary,
  }
]);
