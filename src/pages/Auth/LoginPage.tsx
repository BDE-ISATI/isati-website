import { useEffect, useState } from "react";
import { NavLink, Navigate } from "react-router";
import { useForm } from "react-hook-form";


import useAuth from "@/features/auth/hooks/useAuth";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import type { LoginFields } from "@/features/auth/authTypes";
import LoadingOverlay from "@/shared/components/ui/LoadingOverlay";
import Button from "@/shared/components/ui/Button";
import Input from "@/shared/components/ui/Input";
import cn from "@/shared/utils/cn";

import PasswordInput from "@/shared/components/ui/PasswordInput";
import { getFirstErrorMessage, hasErrorCode } from "@/shared/lib/pocketbase-errors";
import VerificationBanner from "@/shared/components/layout/VerificationBanner";
import Error from "@/shared/components/ui/Error";

import Logo from "@/assets/logos/isati.svg?react";

function Login() {

  useEffect(() => {
    document.title = "Connexion | ISATI";
  }, []);

  const user = useAuthStore((s) => s.user)
  const login = useAuth();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<LoginFields>();
  const [ unverifiedEmail, setUnverifiedEmail ] = useState<string | null>(null)


  function onLogin(data: LoginFields) {
    login.mutate(data, {
      onSuccess: () => {
        reset();
        setUnverifiedEmail(null);
      },
      onError: (error, variables) => {
        if (hasErrorCode(error, "email_not_verified")) {
          setUnverifiedEmail(variables.email);
        } else {
          setUnverifiedEmail(null);
        }
      }
  });
  }

  if (user) {
    return user.level ? <Navigate to="/" replace/> : <Navigate to="/onboarding" replace/>;
  }
  
  

  return (
    <>
      <Logo className="mb-8 h-16 w-auto text-accent"/>
      <div className="w-full max-w-sm">
        <h2 className="mb-6 text-2xl font-semibold">Connexion</h2>

       

        <div className="relative" >
          <div inert={login.isPending} className={cn("transition duration-200", login.isPending && "blur-sm pointer-events-none select-none")}>
            <form noValidate onSubmit={handleSubmit(onLogin)} className="flex flex-col gap-4">
              
              {/* email */}
              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input id="email" type="email" variant={errors.email ? "error" : "normal"}
                  {...register("email", {required: "Ce champ est requis."})} //, validate: (value) => isAllowedEmail(value) || "Utilisez votre adresse universitaire."
                />

                <Error message={errors.email?.message}/>
                
              </div>

              {/* Mot de passe*/}
              <div className="flex flex-col gap-1">
                <label htmlFor="password" className="text-sm font-medium">
                  Mot de passe
                </label>

                <PasswordInput id="password" autoComplete="current-password" variant={errors.password ? "error" : "normal"}
                  {...register("password", { required: "Ce champ est requis." })}
                />

                <Error message={errors.password?.message}/>

              </div>

              <Button type="submit" disabled={login.isPending} className="w-full">
                {login.isPending ? "Connexion…" : "Se connecter"}
              </Button>

              <Error message={getFirstErrorMessage(login.error)}/>

              {unverifiedEmail && <VerificationBanner email={unverifiedEmail} />}
              
            </form>
          </div>
          {login.isPending && <LoadingOverlay />}
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          Pas de compte ?{" "}
          <NavLink to="/register" className="font-medium text-link hover:underline">
            S'inscrire
          </NavLink>
        </p>
      </div>
    </>
  );
}

export default Login;
