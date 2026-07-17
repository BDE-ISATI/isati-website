import { useEffect, useState } from "react";
import { NavLink, Navigate } from "react-router";
import { useForm } from "react-hook-form";

import useRegister from "@/features/auth/hooks/useRegister";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import type { RegisterFields } from "@/features/auth/authTypes";
import { getFieldError } from "@/shared/lib/pocketbase-errors";
import { isAllowedEmail } from "@/shared/lib/validation";
import IsatiAnimation from "@/shared/components/animations/IsatiAnimation";
import Button from "@/shared/components/ui/Button";
import Input from "@/shared/components/ui/Input";
import cn from "@/shared/utils/cn";

import logoISATINoBGRed from "@/assets/logoISATINoBGRed.svg";
import eyeOff from "@/assets/icons/eye-closed.svg";
import eye from "@/assets/icons/eye-open.svg";

function Register() {
  useEffect(() => {
    document.title = "Inscription | ISATI";
  }, []);

  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const { isLoading, register: registerPB, error: errorPB } = useRegister();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<RegisterFields>();
  const [eyeState, setEyeState] = useState(false);
  const [eyeConfirmState, setEyeConfirmState] = useState(false);

  function onRegister(data: RegisterFields) {
    registerPB(data);
  }

  function handleToggle() {
    setEyeState((c) => !c);
  }
  function handleConfirmToggle() {
    setEyeConfirmState((c) => !c);
  }

  if (isLoggedIn) return <Navigate to="/" />;

  const emailServerError = getFieldError(errorPB, "email");
  const passwordServerError = getFieldError(errorPB, "password");

  return (
    <>
      <img src={logoISATINoBGRed} alt="ISATI" className="mb-8 h-16 w-auto" />

      <div className="w-full max-w-sm">
        <h2 className="mb-6 text-2xl font-semibold">Inscription</h2>

        <div className="relative">
          <div inert={isLoading}
            className={cn(
              "transition duration-200",
              isLoading && "blur-sm pointer-events-none select-none",
            )}
          >
            <form
              noValidate
              onSubmit={handleSubmit(onRegister)}
              className="flex flex-col gap-4"
            >
              {/* Email */}
              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  variant={
                    errors.email || emailServerError ? "erreur" : "normal"
                  }
                  {...register("email", {
                    required: "Ce champ est requis.",
                    validate: (value) =>
                      isAllowedEmail(value) ||
                      "Utilisez votre adresse universitaire.",
                  })}
                />
                {errors.email && (
                  <span className="text-xs text-status-critical">
                    {errors.email.message}
                  </span>
                )}
                {emailServerError && (
                  <span className="text-xs text-status-critical">
                    {emailServerError}
                  </span>
                )}
              </div>

              {/* Mot de passe */}
              <div className="flex flex-col gap-1">
                <label htmlFor="password" className="text-sm font-medium">
                  Mot de passe
                </label>
                <div className="flex mb-4 relative">
                  <Input
                    id="password"
                    type={eyeState ? "text" : "password"}
                    variant={
                      errors.password || passwordServerError
                        ? "erreur"
                        : "normal"
                    }
                    {...register("password", {
                      required: "Ce champ est requis.",
                      minLength: { value: 8, message: "8 caractères minimum." },
                    })}
                  />
                  <span
                    className="flex justify-around items-center"
                    onClick={handleToggle}
                  >
                    <img
                      className="absolute mr-10"
                      src={eyeState ? eye : eyeOff}
                    />
                  </span>
                </div>

                {errors.password && (
                  <span className="text-xs text-status-critical">
                    {errors.password.message}
                  </span>
                )}
                {passwordServerError && (
                  <span className="text-xs text-status-critical">
                    {passwordServerError}
                  </span>
                )}
              </div>

              {/* Confirmation */}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="passwordConfirm"
                  className="text-sm font-medium"
                >
                  Confirmer le mot de passe
                </label>

                <div className="flex mb-4 relative">
                  <Input
                    id="passwordConfirm"
                    type={eyeConfirmState ? "text" : "password"}
                    variant={errors.passwordConfirm ? "erreur" : "normal"}
                    {...register("passwordConfirm", {
                      required: "Veuillez confirmer le mot de passe.",
                      validate: (value) =>
                        value === getValues("password") ||
                        "Les mots de passe ne correspondent pas.",
                    })}
                  />
                  <span
                    className="flex justify-around items-center"
                    onClick={handleConfirmToggle}
                  >
                    <img
                      className="absolute mr-10"
                      src={eyeConfirmState ? eye : eyeOff}
                    />
                  </span>
                </div>
                {errors.passwordConfirm && (
                  <span className="text-xs text-status-critical">
                    {errors.passwordConfirm.message}
                  </span>
                )}
              </div>

              {errorPB && !errorPB.response?.data && (
                <p className="rounded-md border border-status-critical bg-status-critical/10 px-3 py-2 text-sm text-status-critical">
                  Une erreur est survenue. Veuillez réessayer.
                </p>
              )}

              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? "Inscription…" : "S'inscrire"}
              </Button>
            </form>
          </div>
          {isLoading && (
            <div className="absolute inset-0 grid place-items-center">
              <IsatiAnimation style={{ width: 320, height: 180 }} />
            </div>
          )}
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          Déjà un compte ?{" "}
          <NavLink
            to="/login"
            className="font-medium text-link hover:underline"
          >
            Se connecter
          </NavLink>
        </p>
      </div>
    </>
  );
}

export default Register;
