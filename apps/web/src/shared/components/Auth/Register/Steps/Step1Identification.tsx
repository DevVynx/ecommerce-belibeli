import { MailIcon, UserIcon } from "lucide-react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

import { Field, FieldError, FieldGroup, FieldLabel } from "@/shared/components/shadcn-ui/field";
import { Input } from "@/shared/components/shadcn-ui/input";
import type { RegisterFormData } from "@/shared/schemas/auth/registerForm";
import { findFieldError } from "@/shared/utils/form/find-field-error";

type StepProps = {
  register: UseFormRegister<RegisterFormData>;
  errors: FieldErrors<RegisterFormData>;
};

export const Step1Identification = ({ register, errors }: StepProps) => {
  const nameError = findFieldError(errors, "name");
  const emailError = findFieldError(errors, "email");

  return (
    <FieldGroup className="gap-4">
      <Field data-invalid={!!nameError} className="gap-2">
        <FieldLabel htmlFor="reg-name">Nome</FieldLabel>
        <div className="relative">
          <Input
            {...register("name")}
            id="reg-name"
            placeholder="Digite o seu nome"
            aria-invalid={!!nameError}
            className={`bg-background text-foreground pl-10 ${!!nameError && "border-destructive focus-visible:ring-destructive"}`}
          />
          <div className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 -translate-y-1/2">
            <UserIcon className="size-5" />
          </div>
        </div>
        {!!nameError && <FieldError errors={[nameError]} />}
      </Field>

      <Field data-invalid={!!emailError} className="gap-2">
        <FieldLabel htmlFor="reg-email">Email</FieldLabel>
        <div className="relative">
          <Input
            {...register("email")}
            id="reg-email"
            type="email"
            placeholder="Digite o seu email"
            aria-invalid={!!emailError}
            className={`bg-background text-foreground pl-10 ${!!emailError && "border-destructive focus-visible:ring-destructive"}`}
          />
          <div className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 -translate-y-1/2">
            <MailIcon className="size-5" />
          </div>
        </div>
        {!!emailError && <FieldError errors={[emailError]} />}
      </Field>
    </FieldGroup>
  );
};
