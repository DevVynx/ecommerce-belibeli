import { ChevronLeftIcon, LockClosedIcon } from "@/assets/Icons";
import { OrDivider } from "@/app/(view)/(auth)/components/OrDivider";
import googleGLogo from "@/assets/images/auth-logos/google-G.png";
import Link from "next/link";
import { SocialLoginButton } from "@/app/(view)/(auth)/components/SocialLoginButton";
import { SucessRegisterModal } from "../SucessRegisterModal/SucessRegisterModal";
import { ErrorNotification } from "@/shared/components/ErrorNotification";
import { Step1Identification } from "./Step1Identification";
import { Step2Security } from "./Step2Security";
import { useRegisterForm } from "./useRegisterForm";

export const RegisterForm = () => {
  const {
    authError,
    errors,
    handleNextStep,
    handlePreviousStep,
    handleSubmit,
    isModalOpen,
    isSubmitting,
    onSubmit,
    register,
    currentStep,
    setAuthError,
  } = useRegisterForm();

  const StepFormContent = [
    <Step1Identification key="step1" register={register} errors={errors} />,
    <Step2Security key="step2" register={register} errors={errors} />,
  ];

  return (
    <div className="flex w-full flex-col items-center gap-3">
      <div>
        <h1 className="mt-5 text-center text-2xl font-bold">Crie a sua conta BeliBeli</h1>
        <p className="flex justify-center text-sm text-green-500">
          <LockClosedIcon className="size-5" />
          Seus dados estão protegidos.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-4">
        {currentStep === 1 && (
          <button
            onClick={handlePreviousStep}
            className="absolute top-6 left-3 rounded-full border p-1 active:bg-black/20 lg:hidden"
          >
            {<ChevronLeftIcon className="size-7" />}
          </button>
        )}

        {StepFormContent[currentStep]}

        {currentStep === 0 ? (
          <>
            <button
              onClick={handleNextStep}
              className="mx-auto mt-5 w-full max-w-lg cursor-pointer rounded-lg bg-black py-4 font-bold text-white transition-colors hover:bg-black/80 active:bg-black/60"
            >
              Continuar
            </button>

            <p className="text-center text-sm text-black/60">
              Você já possui uma conta?{" "}
              <span className="cursor-pointer font-bold text-black underline active:text-black/70">
                <Link href={"/login"}>Login</Link>
              </span>
            </p>
          </>
        ) : (
          <div className="mx-auto mt-5 flex w-full max-w-lg gap-4">
            <button
              onClick={handlePreviousStep}
              disabled={isSubmitting}
              className="hidden w-full cursor-pointer rounded-lg border border-black bg-white py-4 font-bold text-black transition-colors hover:bg-zinc-100 active:bg-black/20 lg:inline-block"
            >
              Voltar
            </button>

            <button
              type="submit"
              disabled={isSubmitting || !!authError}
              className="w-full cursor-pointer rounded-lg bg-black py-4 font-bold text-white transition-colors hover:bg-black/80 active:bg-black/60"
            >
              {isSubmitting ? "Registrando..." : "Registrar"}
            </button>
          </div>
        )}
      </form>

      {currentStep === 0 && (
        <div className="w-full max-w-lg">
          <OrDivider />
          <div className="flex flex-col gap-3">
            <SocialLoginButton src={googleGLogo} alt="Prosseguir com o Google" />
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-black/90 p-2">
          <SucessRegisterModal />
        </div>
      )}

      {authError && (
        <ErrorNotification
          title="Erro ao tentar criar a sua conta"
          message={authError}
          onClose={() => setAuthError("")}
        />
      )}
    </div>
  );
};
