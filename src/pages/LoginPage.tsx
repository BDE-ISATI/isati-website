import { useEffect, useState } from "react";
import { NavLink, Navigate, useSearchParams } from "react-router";
import { useForm } from "react-hook-form";
import { ClientResponseError } from "pocketbase";

import useAuth from "@/features/auth/hooks/useAuth";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import type { LoginFields } from "@/features/auth/authTypes";
import IsatiAnimation from "@/shared/components/animations/IsatiAnimation";
import Button from "@/shared/components/ui/Button";
import Input from "@/shared/components/ui/Input";
import { isAllowedEmail } from "@/shared/lib/validation";
import cn from "@/shared/utils/cn";


import logoISATINoBGRed from "@/assets/logoISATINoBGRed.svg";
import eyeOff from "@/assets/icons/eye-closed.svg";
import eye from "@/assets/icons/eye-open.svg";

function Login() {

  useEffect(() => {
    document.title = "Connexion | ISATI";
  }, []);

  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const user = useAuthStore((s) => s.user)
  const { isLoading, login, error } = useAuth();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<LoginFields>();
  const [ eyeState, setEyeState ] = useState(false);

  const [ searchParams ] = useSearchParams();
  const registered = searchParams.get("registered");

  
  function onLogin(data: LoginFields) {
    login(data, { onSuccess: () => { 
      reset();
    }});
  }

  function handleToggle() {
    setEyeState((c) => !c)
  }

  if (isLoggedIn) {
    return user?.level ? <Navigate to="/" replace/> : <Navigate to="/onboarding" replace/>;
  }
  


  return (
    <>
      <img src={logoISATINoBGRed} alt="ISATI" className="mb-8 h-16 w-auto"/>
      <div className="w-full max-w-sm">
        <h2 className="mb-6 text-2xl font-semibold">Connexion</h2>

        {/* Vérification email */}
        {registered && (
          <p className="mb-4 text-sm text-status-success">
            Un email de vérification a été envoyé.
          </p>
        )}

        <div className="relative" >
          <div inert={isLoading} className={cn("transition duration-200", isLoading && "blur-sm pointer-events-none select-none")}>
            <form noValidate onSubmit={handleSubmit(onLogin)} className="flex flex-col gap-4">
              
              {/* email */}
              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input id="email" type="email" variant={errors.email ? "erreur" : "normal"}
                  {...register("email", {required: "Ce champ est requis.", validate: (value) => isAllowedEmail(value) || "Utilisez votre adresse universitaire."})}
                />
                {errors.email && (
                  <span className="text-xs text-status-critical">
                    {errors.email.message}
                  </span>
                )}
              </div>

              {/* Mot de passe*/}
              <div className="flex flex-col gap-1">
                <label htmlFor="password" className="text-sm font-medium">
                  Mot de passe
                </label>

                <div className= "flex mb-4 relative">
                  <Input id="password" type={eyeState ? "text" : "password"} variant={errors.password ? "erreur" : "normal"} 
                    {...register("password", { required: "Ce champ est requis." })}
                  />
                  <span className="flex justify-around items-center" onClick={handleToggle}>
                    <img className="absolute mr-10" src={eyeState ? eye: eyeOff}/>
                  </span>
                </div>
            

                {errors.password && (
                  <span className="text-xs text-status-critical">
                    {errors.password.message}
                  </span>
                )}
              </div>

              {error && (
                <p className="rounded-md border border-status-critical  px-3 py-2 text-sm text-status-critical">
                  {error instanceof ClientResponseError && error.status === 400 ? "Email ou mot de passe incorrect." : "Une erreur est survenue. Veuillez réessayer."}
                </p>
              )}

              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? "Connexion…" : "Se connecter"}
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
