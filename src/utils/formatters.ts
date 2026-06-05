export function formatPhoneNumber(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  if (digits.length === 11) {
    return digits.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  }
  if (digits.length === 10) {
    return digits.replace(/(\d{3})(\d{3,4})(\d{4})/, '$1-$2-$3');
  }
  return raw;
}
