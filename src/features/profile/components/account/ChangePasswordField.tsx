import { useState } from "react";
import { useForm } from "react-hook-form";
import type { ClientResponseError } from "pocketbase";
import Button from "@/shared/components/ui/Button";
import PasswordInput from "@/shared/components/ui/PasswordInput";
import { getFieldError, getFirstErrorMessage } from "@/shared/lib/pocketbase-errors";
import type { PasswordFields } from "@/features/profile/profileTypes";
import Error from "@/shared/components/ui/Error";
import PenIcon from "@/assets/icons/pen.svg?react"
import XIcon from "@/assets/icons/x.svg?react"
import Check from "@/assets/icons/check.svg?react"

interface ChangePasswordFieldProps {
  onConfirm: (fields: PasswordFields) => void,
  onReset: () => void,
  isLoading: boolean,
  isSuccess: boolean,
  error: ClientResponseError | null,
}

export default function ChangePasswordField({ onConfirm, onReset, isLoading, isSuccess, error }: ChangePasswordFieldProps) {

  const [ isEditing, setIsEditing ] = useState<boolean>(false);
  const { register, handleSubmit, formState: { errors }, getValues, reset } = useForm<PasswordFields>();

  const oldPasswordServerError = getFieldError(error, "oldPassword");
  const passwordServerError = getFieldError(error, "password");

  const isOpen = isEditing && !isSuccess;

  function handleToggle() {
    reset();
    onReset();
    setIsEditing(!isOpen);
  }

  return (
    <div className="flex flex-col gap-1 p-3 text-sm">
      {isOpen ? (
        <>
          <dt className="text-muted-foreground">Mot de passe</dt>
          <dd>
            <form noValidate onSubmit={handleSubmit(onConfirm)} className="flex flex-col gap-3">

              {/* Mot de passe actuel */}
              <div className="flex flex-col gap-1">
                <label htmlFor="oldPassword" className="text-muted-foreground">
                  Mot de passe actuel
                </label>
                <PasswordInput id="oldPassword" size="small" autoFocus autoComplete="current-password"
                  variant={errors.oldPassword || oldPasswordServerError ? "error" : "normal"}
                  {...register("oldPassword", { required: "Ce champ est requis." })}
                />
                <Error message={errors.oldPassword?.message}/>
                <Error message={oldPasswordServerError}/>
              </div>

              {/* Nouveau mot de passe */}
              <div className="flex flex-col gap-1">
                <label htmlFor="password" className="text-muted-foreground">
                  Nouveau mot de passe
                </label>
                <PasswordInput id="password" size="small" autoComplete="new-password" variant={errors.password || passwordServerError ? "error" : "normal"}
                  {...register("password", {  required: "Ce champ est requis.", minLength: { value: 4, message: "4 caractères minimum." },
                    validate: (value) =>
                      value !== getValues("oldPassword") ||
                      "Le nouveau mot de passe doit être différent de l'ancien.",
                  })}
                />
                <Error message={errors.password?.message}/>
                <Error message={passwordServerError}/>
              </div>

              {/* Confirmation du nouveau mot de passe */}
              <div className="flex flex-col gap-1">
                <label htmlFor="passwordConfirm" className="text-muted-foreground">
                  Confirmer le nouveau mot de passe
                </label>
                <PasswordInput id="passwordConfirm" size="small" autoComplete="new-password" variant={errors.passwordConfirm ? "error" : "normal"}
                  {...register("passwordConfirm", { required: "Veuillez confirmer le mot de passe.",
                    validate: (value) =>
                      value === getValues("password") ||
                      "Les mots de passe ne correspondent pas.",
                  })}
                />
                <Error message={errors.passwordConfirm?.message}/>
              </div>

              <div className="flex flex-row items-center justify-end gap-2">
                <Button type="submit" size="small" disabled={isLoading} className="shrink-0">
                  Confirmer
                </Button>
                <Button type="button" onClick={handleToggle} variant="destructiveGhost" size="icon" aria-label="Annuler" className="shrink-0">
                  <XIcon className="w-4 h-4" />
                </Button>
              </div>

              {!oldPasswordServerError && !passwordServerError && (
                <Error message={getFirstErrorMessage(error)}/>
              )}
            </form>
          </dd>
        </>
      ) : (
        <div className="flex flex-row items-center justify-between gap-3">
          <div className="flex flex-col min-w-0">
            <dt className="text-muted-foreground">Mot de passe</dt>
            {isSuccess ? (
              <dd className="flex flex-row items-center gap-1 text-status-success">
                <Check className="w-4 h-4 shrink-0"/>
                <span className="truncate">Mot de passe modifié</span>
              </dd>
            ) : (
              <dd className="truncate">Changez de mot de passe</dd>
            )}
          </div>
          <Button onClick={handleToggle} variant="secondary" size="small" className="shrink-0">
            <PenIcon className="w-4 h-4" />
            Changer
          </Button>
        </div>
      )}
    </div>
  );
}
