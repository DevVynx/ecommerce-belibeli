"use client";
import { InputForm } from "@/app/(view)/(auth)/components/InputForm";
import { EnvelopeIcon, EyeIcon, EyeSlashIcon } from "@/assets/Icons";
import { OrDivider } from "@/app/(view)/(auth)/components/OrDivider";
import { SocialLoginButton } from "@/app/(view)/(auth)/components/SocialLoginButton";
import googleGLogo from "@/assets/images/auth-logos/google-G.png";
import Link from "next/link";
import { useLoginForm } from "./useLoginForm";
import { ErrorNotification } from "@/app/shared/components/ErrorNotification";

export const LoginForm = () => {
  const {
    authError,
    errors,
    handleSubmit,
    isPasswordVisible,
    isSubmitting,
    onSubmit,
    register,
    togglePasswordVisibility,
    setAuthError,
  } = useLoginForm();

  return (
    <div className="flex w-full flex-col items-center gap-3 p-6">
      <div className="mb-4 w-full max-w-lg">
        <h1 className="mt-5 text-center text-4xl font-bold lg:mb-2 lg:text-left lg:text-4xl">
          Login
        </h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-4">
        <InputForm
          label="Email"
          placeholder="Digite o seu email"
          name="email"
          icon={<EnvelopeIcon className="size-6" />}
          register={register}
          errors={errors}
        />

        <InputForm
          isPassword={true}
          type={isPasswordVisible ? "text" : "password"}
          icon={
            isPasswordVisible ? <EyeIcon className="size-6" /> : <EyeSlashIcon className="size-6" />
          }
          label="Senha"
          placeholder="Digite a sua senha"
          name="password"
          register={register}
          errors={errors}
          onTogglePassword={togglePasswordVisibility}
        />

        <div className="mx-auto flex w-full max-w-lg justify-between">
          <div className="flex items-center gap-2 lg:mt-2">
            <input type="checkbox" id="rememberMe" className="h-4 w-4" />
            <label htmlFor="rememberMe" className="text-sm text-black/70">
              Lembrar login
            </label>
          </div>

          <span className="cursor-pointer self-end text-sm font-bold text-black underline active:text-black/70">
            <a href={"/register"}>Esqueceu a senha?</a>
          </span>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !!authError}
          className="mx-auto mt-5 w-full max-w-lg cursor-pointer rounded-lg bg-black py-4 font-bold text-white transition-colors hover:bg-black/80 active:bg-black/60"
        >
          {isSubmitting ? "Entrando..." : "Entrar"}
        </button>

        <p className="mt-2 text-center text-sm text-black/60">
          Não possui uma conta?{" "}
          <span className="cursor-pointer font-bold text-black underline active:text-black/70">
            <Link href={"/register"}>Crie uma</Link>
          </span>
        </p>
      </form>

      <div className="w-full max-w-lg">
        <OrDivider />
        <div className="flex flex-col gap-3">
          <SocialLoginButton src={googleGLogo} alt="Prosseguir com o Google" />
        </div>
      </div>

      {authError && (
        <ErrorNotification
          title="Erro ao tentar fazer login"
          message={authError}
          onClose={() => setAuthError("")}
        />
      )}
    </div>
  );
};
