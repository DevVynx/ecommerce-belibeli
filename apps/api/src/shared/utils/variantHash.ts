type OptionPair = {
  optionId: string;
  optionValueId: string;
};

function normalizeId(id: string) {
  return id.trim().toLowerCase();
}

/**
 * Build variant fingerprint string for a product + options.
 * Format:
 *   productId|optionId1:optionValueId1|optionId2:optionValueId2
 * or
 *   productId|no-opts
 */
export function buildVariantHash(productId: string, productOptions?: OptionPair[] | []): string {
  const pId = normalizeId(productId);

  const opts = Array.isArray(productOptions) ? productOptions : [];

  if (opts.length === 0) {
    return `${pId}|no-opts`;
  }

  // Validate and normalize each option, then sort by optionId to be deterministic
  const normalized = opts.map((o, i) => {
    if (!o || typeof o.optionId !== "string" || typeof o.optionValueId !== "string") {
      throw new TypeError(`productOptions[${i}] must have optionId and optionValueId strings`);
    }
    return {
      optionId: normalizeId(o.optionId),
      optionValueId: normalizeId(o.optionValueId),
    };
  });

  normalized.sort((a, b) => (a.optionId < b.optionId ? -1 : a.optionId > b.optionId ? 1 : 0));

  const parts = normalized.map((o) => `${o.optionId}:${o.optionValueId}`);

  return `${pId}|${parts.join("|")}`;
}
