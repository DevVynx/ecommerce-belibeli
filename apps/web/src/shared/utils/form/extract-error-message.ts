export function extractErrorMessage(
  errorObject: any // eslint-disable-line @typescript-eslint/no-explicit-any
): string | null {
  if (!errorObject) return null;
  if (errorObject.message) return errorObject.message;
  for (const value of Object.values(errorObject)) {
    const nested = extractErrorMessage(value);
    if (nested) return nested;
  }
  return null;
}
