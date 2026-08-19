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


import logoISATINoBGRed from "@/assets/logoISATINoBGRed.svg";
import PasswordInput from "@/shared/components/ui/PasswordInput";
import { getFirstErrorMessage, hasErrorCode } from "@/shared/lib/pocketbase-errors";
import VerificationBanner from "@/shared/components/layout/VerificationBanner";
import Error from "@/shared/components/ui/Error";

function Login() {

  useEffect(() => {
    document.title = "Connexion | ISATI";
  }, []);

  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const user = useAuthStore((s) => s.user)
  const { isLoading, login, error } = useAuth();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<LoginFields>();
  const [ unverifiedEmail, setUnverifiedEmail ] = useState<string | null>(null)


  function onLogin(data: LoginFields) {
    login(data, {
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

  if (isLoggedIn) {
    return user?.level ? <Navigate to="/" replace/> : <Navigate to="/onboarding" replace/>;
  }
  
  

  return (
    <>
      <img src={logoISATINoBGRed} alt="ISATI" className="mb-8 h-16 w-auto"/>
      <div className="w-full max-w-sm">
        <h2 className="mb-6 text-2xl font-semibold">Connexion</h2>

       

        <div className="relative" >
          <div inert={isLoading} className={cn("transition duration-200", isLoading && "blur-sm pointer-events-none select-none")}>
            <form noValidate onSubmit={handleSubmit(onLogin)} className="flex flex-col gap-4">
              
              {/* email */}
              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input id="email" type="email" variant={errors.email ? "erreur" : "normal"}
                  {...register("email", {required: "Ce champ est requis."})} //, validate: (value) => isAllowedEmail(value) || "Utilisez votre adresse universitaire."
                />

                <Error message={errors.email?.message}/>
                
              </div>

              {/* Mot de passe*/}
              <div className="flex flex-col gap-1">
                <label htmlFor="password" className="text-sm font-medium">
                  Mot de passe
                </label>

                <PasswordInput id="password" autoComplete="current-password" variant={errors.password ? "erreur" : "normal"}
                  {...register("password", { required: "Ce champ est requis." })}
                />

                <Error message={errors.password?.message}/>

              </div>

              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? "Connexion…" : "Se connecter"}
              </Button>

              <Error message={getFirstErrorMessage(error)}/>

              {unverifiedEmail && <VerificationBanner email={unverifiedEmail} />}
              
            </form>
          </div>
          {isLoading && <LoadingOverlay />}
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
