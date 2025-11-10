export function isSaleActive(promotionEnd: Date | null) {
  if (!promotionEnd) return false;

  const now = new Date();
  const end = new Date(promotionEnd);

  return now < end;
}
