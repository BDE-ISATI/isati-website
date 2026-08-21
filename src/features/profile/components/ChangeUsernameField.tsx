import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@/shared/components/ui/Button";
import UsernameInput from "@/shared/components/ui/UsernameInput";
import type { UsernameFields } from "../profileTypes";
import PenIcon from "@/assets/icons/pen.svg?react"
import XIcon from "@/assets/icons/x.svg?react"
import type { ClientResponseError } from "pocketbase";
import { getFirstErrorMessage } from "@/shared/lib/pocketbase-errors";

interface ChangeUsernameFieldProps {
  username?: string,
  onConfirm: (newUsername: string) => void,
  isLoading: boolean,
  error: ClientResponseError | null,
}

export default function ChangeUsernameField({ username, onConfirm, isLoading, error }: ChangeUsernameFieldProps) {

  const [ isEditing, setIsEditing ] = useState<boolean>(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<UsernameFields>();

  function handleToggle() {
    reset();
    setIsEditing(!isEditing);
  }

  return (
    <div className="flex flex-col gap-1 p-3 text-sm">
      {isEditing ? (
        <>
          <dt>
            <label htmlFor="newUsername" className="text-muted-foreground">
              Nom d'utilisateur
            </label>
          </dt>
          <dd>
            <p id="newUsernameHint" className="mb-1 text-xs text-muted-foreground">
              Vous ne pouvez changer de nom d'utilisateur qu'une fois tous les 14 jours.
            </p>
            <form noValidate onSubmit={handleSubmit((data) => onConfirm(data.newUsername))} className="flex flex-row items-start gap-2">
              <UsernameInput id="newUsername" aria-describedby="newUsernameHint" size="small" placeholder={username} autoFocus
                validationError={errors.newUsername?.message}
                submitError={getFirstErrorMessage(error)}
                {...register("newUsername", {required: "Ce champ est requis."})}
              />
              <Button type="submit" size="small" disabled={isLoading} className="shrink-0">
                Confirmer
              </Button>
              <Button type="button" onClick={handleToggle} variant="destructiveGhost" size="icon" aria-label="Annuler" className="shrink-0">
                <XIcon className="w-4 h-4" />
              </Button>
            </form>
          </dd>
        </>

      ) : (
        <div className="flex flex-row items-center justify-between gap-3">
          <div className="flex flex-col min-w-0">
            <dt className="text-muted-foreground">Nom d'utilisateur</dt>
            <dd className="truncate">{username}</dd>
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
