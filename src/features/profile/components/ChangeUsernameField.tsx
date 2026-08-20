import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@/shared/components/ui/Button";
import UsernameInput from "@/shared/components/ui/UsernameInput";
import useDebounce from "../hooks/useDebounce";
import useIsUsernameUnique from "../hooks/useIsUsernameUnique";
import type { UsernameFields } from "../profileTypes";
import PenIcon from "@/assets/icons/pen.svg?react"
import XIcon from "@/assets/icons/x.svg?react"
import type { ClientResponseError } from "pocketbase";
import { getRawFieldError } from "@/shared/lib/pocketbase-errors";

interface ChangeUsernameFieldProps {
  username?: string,
  onConfirm: (newUsername: string) => void,
  isLoading: boolean,
  error: ClientResponseError | null,
}

export default function ChangeUsernameField({ username, onConfirm, isLoading, error }: ChangeUsernameFieldProps) {

  const [ isEditing, setIsEditing ] = useState<boolean>(false);
  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm<UsernameFields>();

  const newUsername = watch("newUsername");
  const usernameDebonce = useDebounce(newUsername, 300);
  const { isLoading: isLoadingUnique, isUnique } = useIsUsernameUnique(usernameDebonce);

  const showStatus = newUsername?.length > 2;
  const isChecking = isLoadingUnique || newUsername !== usernameDebonce;

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
            <form noValidate onSubmit={handleSubmit((data) => onConfirm(data.newUsername))}>
              <UsernameInput id="newUsername" aria-describedby="newUsernameHint" size="small" placeholder={username} autoFocus
                showStatus={showStatus}
                isChecking={isChecking}
                isUnique={isUnique}
                validationError={errors.newUsername?.message}
                submitError={getRawFieldError(error, "username")}
                actions={
                  <>
                    <Button type="submit" size="small" disabled={isChecking || isLoading} className="shrink-0">
                      Confirmer
                    </Button>
                    <Button type="button" onClick={handleToggle} variant="destructiveGhost" size="icon" aria-label="Annuler" className="shrink-0">
                      <XIcon className="w-4 h-4" />
                    </Button>
                  </>
                }
                {...register("newUsername", {required: "Ce champ est requis."})}
              />
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
