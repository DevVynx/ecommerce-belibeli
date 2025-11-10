import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema, type LoginFormData } from "../../../schemas/loginSchema";
import { useLogin } from "@/app/shared/hooks/data/useAuthMutations";

export const useLoginForm = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [authError, setAuthError] = useState<string>("");
  const { mutate } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    mutate(data, {
      onError: (error) => {
        const data = error.response?.data as { message: string };
        setAuthError(data.message);
      },
    });
  };

  const togglePasswordVisibility = () => setIsPasswordVisible((prev) => !prev);

  return {
    isPasswordVisible,
    authError,
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
    togglePasswordVisibility,
    setAuthError,
  };
};
