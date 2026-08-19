import { useState } from "react";
import { useForm } from "react-hook-form";
import type { ClientResponseError } from "pocketbase";
import Button from "@/shared/components/ui/Button";
import PasswordInput from "@/shared/components/ui/PasswordInput";
import { getFieldError } from "@/shared/lib/pocketbase-errors";
import type { PasswordFields } from "../profileTypes";
import PenIcon from "@/assets/icons/pen.svg?react"
import XIcon from "@/assets/icons/x.svg?react"
import CircleAlert from "@/assets/icons/circle-alert.svg?react"
import Check from "@/assets/icons/check.svg?react"

interface ChangePasswordFieldProps {
  onConfirm: (fields: PasswordFields) => void,
  onReset: () => void,
  isLoading: boolean,
  isSuccess: boolean,
  error: Error | null,
}

export default function ChangePasswordField({ onConfirm, onReset, isLoading, isSuccess, error }: ChangePasswordFieldProps) {

  const [ isEditing, setIsEditing ] = useState<boolean>(false);
  const { register, handleSubmit, formState: { errors }, getValues, reset } = useForm<PasswordFields>();

  const serverError = error as ClientResponseError | null;
  const oldPasswordServerError = getFieldError(serverError, "oldPassword");
  const passwordServerError = getFieldError(serverError, "password");

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
                <PasswordInput
                  id="oldPassword"
                  size="small"
                  autoFocus
                  autoComplete="current-password"
                  variant={errors.oldPassword || oldPasswordServerError ? "erreur" : "normal"}
                  {...register("oldPassword", { required: "Ce champ est requis." })}
                />
                {errors.oldPassword && (
                  <div className="flex flex-row items-center gap-1 text-status-critical">
                    <CircleAlert className="w-3 h-3 shrink-0"/>
                    <span className="text-xs">{errors.oldPassword.message}</span>
                  </div>
                )}
                {oldPasswordServerError && (
                  <div className="flex flex-row items-center gap-1 text-status-critical">
                    <CircleAlert className="w-3 h-3 shrink-0"/>
                    <span className="text-xs">{oldPasswordServerError}</span>
                  </div>
                )}
              </div>

              {/* Nouveau mot de passe */}
              <div className="flex flex-col gap-1">
                <label htmlFor="password" className="text-muted-foreground">
                  Nouveau mot de passe
                </label>
                <PasswordInput
                  id="password"
                  size="small"
                  autoComplete="new-password"
                  variant={errors.password || passwordServerError ? "erreur" : "normal"}
                  {...register("password", {
                    required: "Ce champ est requis.",
                    minLength: { value: 4, message: "4 caractères minimum." },
                    validate: (value) =>
                      value !== getValues("oldPassword") ||
                      "Le nouveau mot de passe doit être différent de l'ancien.",
                  })}
                />
                {errors.password && (
                  <div className="flex flex-row items-center gap-1 text-status-critical">
                    <CircleAlert className="w-3 h-3 shrink-0"/>
                    <span className="text-xs">{errors.password.message}</span>
                  </div>
                )}
                {passwordServerError && (
                  <div className="flex flex-row items-center gap-1 text-status-critical">
                    <CircleAlert className="w-3 h-3 shrink-0"/>
                    <span className="text-xs">{passwordServerError}</span>
                  </div>
                )}
              </div>

              {/* Confirmation du nouveau mot de passe */}
              <div className="flex flex-col gap-1">
                <label htmlFor="passwordConfirm" className="text-muted-foreground">
                  Confirmer le nouveau mot de passe
                </label>
                <PasswordInput
                  id="passwordConfirm"
                  size="small"
                  autoComplete="new-password"
                  variant={errors.passwordConfirm ? "erreur" : "normal"}
                  {...register("passwordConfirm", {
                    required: "Veuillez confirmer le mot de passe.",
                    validate: (value) =>
                      value === getValues("password") ||
                      "Les mots de passe ne correspondent pas.",
                  })}
                />
                {errors.passwordConfirm && (
                  <div className="flex flex-row items-center gap-1 text-status-critical">
                    <CircleAlert className="w-3 h-3 shrink-0"/>
                    <span className="text-xs">{errors.passwordConfirm.message}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-row items-center justify-end gap-2">
                <Button type="submit" size="small" disabled={isLoading} className="shrink-0">
                  Confirmer
                </Button>
                <Button type="button" onClick={handleToggle} variant="destructiveGhost" size="small" aria-label="Annuler" className="shrink-0 p-1.5">
                  <XIcon className="w-4 h-4" />
                </Button>
              </div>

              {error && !oldPasswordServerError && !passwordServerError && (
                <div className="flex flex-row items-center gap-1 text-status-critical">
                  <CircleAlert className="w-3 h-3 shrink-0"/>
                  <span className="text-xs">{error.message}</span>
                </div>
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
          <Button onClick={handleToggle} variant="secondary" size="small" className="gap-1.5 shrink-0">
            <PenIcon className="w-4 h-4" />
            Changer
          </Button>
        </div>
      )}
    </div>
  );
}
