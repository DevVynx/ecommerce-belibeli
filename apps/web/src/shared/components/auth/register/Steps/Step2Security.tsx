import { EyeIcon, EyeOffIcon, LockIcon } from "lucide-react";
import { useState } from "react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

import { Field, FieldError, FieldGroup, FieldLabel } from "@/shared/components/shadcn-ui/field";
import { Input } from "@/shared/components/shadcn-ui/input";
import type { RegisterFormData } from "@/shared/schemas/auth/registerForm";
import { findFieldError } from "@/shared/utils/form/find-field-error";

type StepProps = {
  register: UseFormRegister<RegisterFormData>;
  errors: FieldErrors<RegisterFormData>;
};

export const Step2Security = ({ register, errors }: StepProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const passwordError = findFieldError(errors, "password.password");
  const confirmPasswordError = findFieldError(errors, "password.confirmPassword");

  return (
    <FieldGroup className="gap-4">
      {/* Senha */}
      <Field data-invalid={!!passwordError} className="gap-2">
        <FieldLabel htmlFor="reg-password">Senha</FieldLabel>
        <div className="relative">
          <Input
            {...register("password.password")}
            id="reg-password"
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Digite a sua senha"
            aria-invalid={!!passwordError}
            className={`bg-background text-foreground px-10 ${!!passwordError && "border-destructive focus-visible:ring-destructive"}`}
          />
          <div className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 -translate-y-1/2">
            <LockIcon className="size-5" />
          </div>
          <button
            type="button"
            onClick={() => setIsPasswordVisible((prev) => !prev)}
            className="text-muted-foreground hover:text-foreground focus-visible:ring-ring absolute top-1/2 right-3 -translate-y-1/2 rounded-sm transition-colors focus:outline-none focus-visible:ring-2"
            aria-label={isPasswordVisible ? "Ocultar senha" : "Mostrar senha"}
          >
            {isPasswordVisible ? <EyeIcon className="size-5" /> : <EyeOffIcon className="size-5" />}
          </button>
        </div>
        {!!passwordError && <FieldError errors={[passwordError]} />}
      </Field>

      {/* Confirmação de Senha */}
      <Field data-invalid={!!confirmPasswordError} className="gap-2">
        <FieldLabel htmlFor="reg-confirmPassword">Confirme a senha</FieldLabel>
        <div className="relative">
          <Input
            {...register("password.confirmPassword")}
            id="reg-confirmPassword"
            type={isConfirmPasswordVisible ? "text" : "password"}
            placeholder="Confirme a sua senha"
            aria-invalid={!!confirmPasswordError}
            className={`bg-background text-foreground px-10 ${!!confirmPasswordError && "border-destructive focus-visible:ring-destructive"}`}
          />
          <div className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 -translate-y-1/2">
            <LockIcon className="size-5" />
          </div>
          <button
            type="button"
            onClick={() => setIsConfirmPasswordVisible((prev) => !prev)}
            className="text-muted-foreground hover:text-foreground focus-visible:ring-ring absolute top-1/2 right-3 -translate-y-1/2 rounded-sm transition-colors focus:outline-none focus-visible:ring-2"
            aria-label={isConfirmPasswordVisible ? "Ocultar senha" : "Mostrar senha"}
          >
            {isConfirmPasswordVisible ? (
              <EyeIcon className="size-5" />
            ) : (
              <EyeOffIcon className="size-5" />
            )}
          </button>
        </div>
        {!!confirmPasswordError && <FieldError errors={[confirmPasswordError]} />}
      </Field>
    </FieldGroup>
  );
};
