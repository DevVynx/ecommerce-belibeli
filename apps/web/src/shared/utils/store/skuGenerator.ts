function abbreviate(word: string): string {
  return word
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]/g, "")
    .slice(0, 4)
    .toUpperCase();
}

export function generateSku(name: string, attributes: Record<string, string>): string {
  const parts = [abbreviate(name), ...Object.values(attributes).map(abbreviate)];
  return parts.join("-");
}
