import { useForm, type SubmitHandler } from "react-hook-form";
import { registerSchema, type RegisterFormData } from "../../schemas/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRegister } from "@/shared/hooks/data/useAuthMutations";

export const useRegisterForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authError, setAuthError] = useState<string>("");
  const { mutate } = useRegister();

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: {
        password: "",
        confirmPassword: "",
      },
    },
    mode: "onChange",
  });

  const handlePreviousStep = () => setCurrentStep(currentStep - 1);

  const handleNextStep = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let isValid = false;

    if (currentStep === 0) {
      isValid = await trigger(["name", "email"]);
    }

    if (isValid) {
      setCurrentStep(currentStep + 1);
    }
  };

  const onSubmit: SubmitHandler<RegisterFormData> = (data) => {
    mutate(
      {
        ...data,
        password: data.password.password,
        confirmPassword: data.password.confirmPassword,
      },
      {
        onSuccess: () => {
          setIsModalOpen(true);
        },
        onError: (error) => {
          const data = error.response?.data as { message: string };
          setAuthError(data.message);
        },
      },
    );
  };

  return {
    isModalOpen,
    authError,
    register,
    handleSubmit,
    errors,
    isSubmitting,
    handlePreviousStep,
    handleNextStep,
    onSubmit,
    currentStep,
    setAuthError,
  };
};
