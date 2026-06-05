import type { RawMerchant } from '@/types/merchant';

export function isOnnuriMerchant(value: unknown): value is RawMerchant {
  return (
    typeof value === 'object' &&
    value !== null &&
    'name' in value &&
    'lat' in value &&
    'lng' in value &&
    (value as RawMerchant).lat !== null &&
    (value as RawMerchant).lng !== null
  );
}
