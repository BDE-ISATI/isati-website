import { useEffect } from "react";
import { NavLink, Navigate } from "react-router";
import { useForm } from "react-hook-form";

import useRegister from "@/features/auth/hooks/useRegister";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import type { RegisterFields } from "@/features/auth/authTypes";
import { getFieldError, getFirstErrorMessage } from "@/shared/lib/pocketbase-errors";
import { isAllowedEmail } from "@/shared/lib/validation";
import LoadingOverlay from "@/shared/components/ui/LoadingOverlay";
import Button from "@/shared/components/ui/Button";
import Input from "@/shared/components/ui/Input";
import cn from "@/shared/utils/cn";

import PasswordInput from "@/shared/components/ui/PasswordInput";
import UsernameInput from "@/shared/components/ui/UsernameInput";
import useDebounce from "@/features/profile/hooks/useDebounce";
import useIsUsernameUnique from "@/features/profile/hooks/useIsUsernameUnique";
import Error from "@/shared/components/ui/Error";

import Logo from "@/assets/logos/isati.svg?react";

function Register() {
  
  useEffect(() => {
    document.title = "Inscription | ISATI";
  }, []);

  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  
  // Hook formulaire + inscription
  const { isLoading: isLoadingRegister, register: registerAccount, error: registerError } = useRegister();
  const { register, handleSubmit, formState: { errors }, getValues, watch } = useForm<RegisterFields>();

  // Username
  const username = watch("username");
  const debouncedUsername = useDebounce(username, 300);
  const { isLoading: isLoadingUnique, isUnique } = useIsUsernameUnique(debouncedUsername);

  const showStatus = username?.length >= 2;
  const isChecking = isLoadingUnique || username !== debouncedUsername;

  const usernameServerError = getFieldError(registerError, "username");
  const emailServerError = getFieldError(registerError, "email");
  const passwordServerError = getFieldError(registerError, "password");
  const passwordConfirmServerError = getFieldError(registerError, "passwordConfirm");


  if (isLoggedIn) return <Navigate to="/" replace/>;

  return (
    <>
  
      <Logo className="mb-8 h-16 w-auto text-accent"/>

      <div className="w-full max-w-sm">
        <h2 className="mb-6 text-2xl font-semibold">Inscription</h2>
        <div className="relative">
          <div inert={isLoadingRegister}
            className={cn(
              "transition duration-200",
              isLoadingRegister && "blur-sm pointer-events-none select-none",
            )}
          >
            <form noValidate onSubmit={handleSubmit((data) => registerAccount(data))} className="flex flex-col gap-4">
              {/* Username */}
              <div className="flex flex-col gap-1">
                <label htmlFor="username" className="text-sm font-medium">
                  Nom d'utilisateur
                </label>
                <UsernameInput
                  showStatus={showStatus}
                  isChecking={isChecking}
                  isUnique={isUnique}
                  validationError={errors.username?.message}
                  submitError={usernameServerError}
                  id="username"
                  type="text"
                  {...register("username", {
                    required: "Ce champ est requis.",
                  })}
                />

              </div>


              {/* Email */}
              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  variant={
                    errors.email || emailServerError ? "error" : "normal"
                  }
                  {...register("email", {
                    required: "Ce champ est requis.",
                    validate: (value) => isAllowedEmail(value) || "Utilisez votre adresse universitaire.", })}
                />

                <Error message={errors.email?.message}/>
                <Error message={emailServerError}/>
           
              </div>

              {/* Mot de passe */}
              <div className="flex flex-col gap-1">
                <label htmlFor="password" className="text-sm font-medium">
                  Mot de passe
                </label>

                <PasswordInput
                  id="password"
                  autoComplete="new-password"
                  variant={errors.password || passwordServerError ? "error" : "normal"}
                  {...register("password", {
                    required: "Ce champ est requis.",
                    minLength: { value: 4, message: "4 caractères minimum." },
                  })}
                />

                <Error message={errors.password?.message}/>
                <Error message={passwordServerError}/>

              </div>

              {/* Confirmation */}
              <div className="flex flex-col gap-1">
                <label htmlFor="passwordConfirm" className="text-sm font-medium">
                  Confirmer le mot de passe
                </label>

                <PasswordInput
                  id="passwordConfirm"
                  autoComplete="new-password"
                  variant={errors.passwordConfirm || passwordConfirmServerError ? "error" : "normal"}
                  {...register("passwordConfirm", {
                    required: "Veuillez confirmer le mot de passe.",
                    validate: (value) => value === getValues("password") || "Les mots de passe ne correspondent pas.",
                  })}
                />

                <Error message={errors.passwordConfirm?.message}/>
                <Error message={passwordConfirmServerError}/>

              </div>

              <Button type="submit" disabled={isLoadingRegister || isChecking || !isUnique } className="w-full">
                {isLoadingRegister ? "Inscription…" : "S'inscrire"}
              </Button>
     
              <Error message={getFirstErrorMessage(registerError)}/>
             
            </form>
          </div>
          {isLoadingRegister && <LoadingOverlay />}
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          Déjà un compte ?{" "}
          <NavLink to="/login" className="font-medium text-link hover:underline" >
            Se connecter
          </NavLink>
        </p>
      </div>
    </>
  );
}

export default Register;
