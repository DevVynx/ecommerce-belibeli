import { InputForm } from "@/app/(view)/(auth)/components/InputForm";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { RegisterFormData } from "../../schemas/registerSchema";
import { MailIcon, UserIcon } from "lucide-react";

type StepProps = {
  register: UseFormRegister<RegisterFormData>;
  errors: FieldErrors<RegisterFormData>;
};

export const Step1Identification = ({ register, errors }: StepProps) => {
  return (
    <>
      <InputForm
        label="Nome"
        placeholder="Digite o seu nome"
        name="name"
        icon={<UserIcon className="size-6" />}
        register={register}
        errors={errors}
      />
      <InputForm
        label="Email"
        placeholder="Example99@gmail.com"
        name="email"
        icon={<MailIcon className="size-6" />}
        register={register}
        errors={errors}
      />
    </>
  );
};
