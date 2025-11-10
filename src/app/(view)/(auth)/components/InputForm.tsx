"use client";
import { extractErrorMessage } from "@/app/shared/utils/form/extract-error-message";
import { findFieldError } from "@/app/shared/utils/form/find-field-error";
import type { ComponentProps } from "react";
import type { FieldErrors, FieldPath, FieldValues, UseFormRegister } from "react-hook-form";

type TypeInputFormProps<TFormValues extends FieldValues> = ComponentProps<"input"> & {
  label: string;
  name: FieldPath<TFormValues>;
  register: UseFormRegister<TFormValues>;
  errors: FieldErrors<TFormValues>;
  icon?: React.ReactNode;
  isPassword?: boolean;
  onTogglePassword?: (inputName: string) => void;
};

export const InputForm = <TFormValues extends FieldValues>({
  label,
  name,
  icon,
  register,
  errors,
  isPassword,
  onTogglePassword,
  ...rest
}: TypeInputFormProps<TFormValues>) => {
  const fieldError = findFieldError(errors, name);
  const message = extractErrorMessage(fieldError);

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col justify-center">
      <label htmlFor={name} className={`mb-1 font-bold ${message ? "text-red-500" : "text-black"}`}>
        {label}
      </label>

      <div className="relative flex w-full items-center">
        <input
          {...rest}
          {...register(name)}
          className={`w-full rounded-lg border outline-0 ${
            icon ? "py-3 pr-12 pl-3" : "p-3"
          } ${message ? "border-red-500" : "border-black/30"}`}
        />

        {icon && (
          <div
            onClick={() => onTogglePassword?.(name)}
            className={`absolute right-3 text-gray-500 ${isPassword ? "cursor-pointer" : ""}`}
          >
            {icon}
          </div>
        )}
      </div>

      {message && <p className="text-red-500">{message}</p>}
    </div>
  );
};
