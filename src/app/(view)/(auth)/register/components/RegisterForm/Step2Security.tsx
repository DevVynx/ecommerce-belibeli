"use client";
import { InputForm } from "@/app/(view)/(auth)/components/InputForm";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { RegisterFormData } from "../../schemas/registerSchema";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

type StepProps = {
  register: UseFormRegister<RegisterFormData>;
  errors: FieldErrors<RegisterFormData>;
};

export const Step2Security = ({ register, errors }: StepProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const togglePasswordVisibility = (inputName: string) => {
    if (inputName === "password.password") {
      setIsPasswordVisible((prev) => !prev);
    } else if (inputName === "password.confirmPassword") {
      setIsConfirmPasswordVisible((prev) => !prev);
    }
  };
  return (
    <>
      <InputForm
        isPassword={true}
        type={isPasswordVisible ? "text" : "password"}
        icon={
          isPasswordVisible ? <EyeIcon className="size-6" /> : <EyeOffIcon className="size-6" />
        }
        label="Senha"
        placeholder="Digite a sua senha"
        name="password.password"
        register={register}
        errors={errors}
        onTogglePassword={togglePasswordVisibility}
      />
      <InputForm
        isPassword={true}
        type={isConfirmPasswordVisible ? "text" : "password"}
        icon={
          isConfirmPasswordVisible ? (
            <EyeIcon className="size-6" />
          ) : (
            <EyeOffIcon className="size-6" />
          )
        }
        label="Confirme a senha"
        placeholder="Confirme a sua senha"
        name="password.confirmPassword"
        register={register}
        errors={errors}
        onTogglePassword={togglePasswordVisibility}
      />
    </>
  );
};
