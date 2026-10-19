export function formatUzPhone(rawDigits: string): string {
  const digits = rawDigits.replace(/\D/g, "").slice(0, 9);
  const parts = [
    digits.slice(0, 2),
    digits.slice(2, 5),
    digits.slice(5, 7),
    digits.slice(7, 9),
  ].filter(Boolean);
  return parts.join(" ");
}

export function isCompleteUzPhone(rawDigits: string): boolean {
  return rawDigits.replace(/\D/g, "").length === 9;
}
