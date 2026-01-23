export function isSaleActive(promotionEnd: string | null) {
  if (!promotionEnd) return false;

  const end = new Date(promotionEnd);

  if (isNaN(end.getTime())) return false;

  return Date.now() < end.getTime();
}
