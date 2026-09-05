import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@/shared/components/ui/Button";
import PasswordInput from "@/shared/components/ui/PasswordInput";
import type { DeleteAccountFields } from "@/features/profile/profileTypes";
import XIcon from "@/assets/icons/x.svg?react"
import Error from "@/shared/components/ui/Error";
import { getFirstErrorMessage } from "@/shared/lib/pocketbase-errors";
import type { ClientResponseError } from "pocketbase";


interface DeleteAccountFieldProps {
  onConfirm: (password: string) => void,
  isLoading: boolean,
  error: ClientResponseError | null,
}

export default function DeleteAccountField({ onConfirm, isLoading, error }: DeleteAccountFieldProps) {

  const [ isEditing, setIsEditing ] = useState<boolean>(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<DeleteAccountFields>();

  function handleToggle() {
    reset();
    setIsEditing(!isEditing);
  }



  return (
    <div className="flex flex-col gap-1 p-3 text-sm">
      {isEditing ? (
        <>
          <dt>
            <label htmlFor="deleteAccountPassword" className="text-muted-foreground">
              Confirmez votre mot de passe pour supprimer votre compte
            </label>
          </dt>
          <dd>
            <form noValidate onSubmit={handleSubmit((data) => onConfirm(data.password))} className="flex flex-col gap-1">
              <div className="flex flex-row items-center gap-2">
                <PasswordInput
                  id="deleteAccountPassword"
                  size="small"
                  autoFocus
                  autoComplete="current-password"
                  variant={errors.password || error ? "error" : "normal"}
                  wrapperClassName="min-w-0 grow"
                  {...register("password", { required: "Ce champ est requis." })}
                />
                <Button type="submit" variant="destructive" size="small" disabled={isLoading} className="shrink-0">
                  Confirmer
                </Button>
                <Button type="button" onClick={handleToggle} variant="destructiveGhost" size="icon" aria-label="Annuler" className="shrink-0">
                  <XIcon className="w-4 h-4" />
                </Button>
              </div>

              <Error message={errors.password?.message}/>

              <Error message={getFirstErrorMessage(error)}/>

            </form>
          </dd>
        </>
      ) : (
        <>
          <dt className="sr-only">Suppression du compte</dt>
          <dd className="flex justify-center">
            <Button onClick={handleToggle} variant="destructive" size="small" className="w-full sm:w-auto">
              Supprimer mon compte
            </Button>
          </dd>
  
        </>
      )}
    </div>
  );
}
