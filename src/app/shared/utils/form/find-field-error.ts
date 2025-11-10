import type { FieldErrors, FieldValues } from "react-hook-form";

export function findFieldError<T extends FieldValues>(errors: FieldErrors<T>, path: string) {
  return path.split(".").reduce((obj: any, key) => obj?.[key], errors);
}
