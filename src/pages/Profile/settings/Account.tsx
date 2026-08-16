import type { UsersRecord } from "@/shared/types/pocketbase-types"
import { useOutletContext } from "react-router";
import PenIcon from "@/assets/icons/pen.svg?react"
import Button from "@/shared/components/ui/Button";
import pb from "@/shared/lib/pocketbase";
import cn from "@/shared/utils/cn";
import ChangeAvatarButton from "@/features/profile/components/ChangeAvatarButton";
import { useState } from "react";
import Input from "@/shared/components/ui/Input";
import type { UsernameFields } from "@/features/profile/profileTypes";
import { useForm } from "react-hook-form";
import CircleAlert from "@/assets/icons/circle-alert.svg?react"
import useDebounce from "@/features/profile/hooks/useDebounce";
import useIsUsernameUnique from "@/features/profile/hooks/useIsUsernameUnique";
import Check from "@/assets/icons/check.svg?react"
import Loader from "@/assets/icons/loader.svg?react"
import useUpdateUsername from "@/features/profile/hooks/useUpdateUsername";
import { useNavigate } from "react-router";


interface AccountContext {
  isLoading: boolean,
  user: NoInfer<UsersRecord>,
  error: Error | null,
}


export default function Account() {
  const { user } = useOutletContext<AccountContext>();
  const [ usernameField, setUsernameField ] = useState<boolean>(false);
  const { register, handleSubmit, formState: { errors: userNameErrors }, reset , watch} = useForm<UsernameFields>();

  const usernameDebonce = useDebounce(watch("newUsername"), 300);
  const { isLoading: isLoadingUsername, isUnique, error: errorUsername } = useIsUsernameUnique(usernameDebonce);
  const { update, isLoading: isLoadingUsernameUpdate, error: errorUsernameUpdate } = useUpdateUsername()
  const navigate = useNavigate()
  
  const avatarSizes = [
    { thumb: "200x200", className: "w-16 h-16 sm:w-28 sm:h-28" }, 
    { thumb: "100x100", className: "w-12 h-12 sm:w-20 sm:h-20" },
    { thumb: "50x50", className: "w-10 h-10" },                  
  ]

  function handlePasswordButton() {
    console.log("button 1")
    return   
  }

  function handleUsernameButton() {
    console.log((new Date()).toISOString().replace('T', ' '))
    setUsernameField(!usernameField)
  }

  function handleUsernameChange(data: UsernameFields) {
    update({userId: user.id, username: data.newUsername}, { onSuccess: () => navigate(`/profile/${data.newUsername}/account`, { replace: true })})
  }

  

  return (
    <section className="flex flex-col gap-4">
      <header className="flex flex-col gap-0.5">
        <h1 className="text-lg sm:text-xl font-semibold leading-tight">Mon compte</h1>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Gérez les informations de connexion de votre compte
        </p>
      </header>

      <dl className="flex flex-col divide-y divide-border border border-border rounded-md">
        <div className="flex flex-row items-center justify-between gap-3 p-3">
          <div className="flex flex-col min-w-0 text-sm">
            <dt className="text-muted-foreground">Photo de profil</dt>
            <dd className="flex flex-row items-end pt-1">
              {avatarSizes.map((size) => (
                <img
                  key={size.thumb}
                  src={user.avatar ? pb.files.getURL(user, user.avatar, { thumb: size.thumb }) : undefined}
                  alt={user.username}
                  className={cn("rounded-full border border-border object-cover shrink-0", size.className)}
                />
              ))}
            </dd>
          </div>
          <ChangeAvatarButton user={user}/>
        </div>
        
        <div className="flex flex-row items-center justify-between gap-3 p-3">
          <div className="flex flex-col min-w-0 text-sm">
            <dt className="text-muted-foreground">Nom d'utilisateur</dt>
            <dd className="truncate">{user.username}</dd>
          </div>
          <Button onClick={handleUsernameButton} variant="secondary" size="small" className="gap-1.5 shrink-0">
            <PenIcon className="w-4 h-4" />
            Changer
          </Button>
          
        </div>
        <div>{usernameField ? 
        
        <form noValidate onSubmit={handleSubmit(handleUsernameChange)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="newUsername" className="text-sm font-medium">
              Nouveau nom d'utilisateur
            </label>
            <Input id="newUsername" type="text" variant={isLoadingUsername ? "normal" : (isUnique ? "ok" : "erreur") }
              {...register("newUsername", {required: "Ce champ est requis."})}
            />
            { (watch("newUsername")?.length > 2) ? ((!isLoadingUsername && watch("newUsername") == usernameDebonce) ?
            ((isUnique) ? (
              <div className="flex flex-row items-center text-status-success gap-1">
                <Check className="w-3 h-3"/>
                <p className="text-xs">
                  Disponible
                </p>
              </div>
            ): 
              <div className="flex flex-row items-center text-status-critical gap-1">
                <CircleAlert className="w-3 h-3"/>
                <p className="text-xs">
                  Déjà utilisé
                </p>
              </div>) : 
              <div className="flex flex-row items-center gap-1">
                <Loader className="w-3 h-3"/>
                <p className="text-xs">
                  Chargement
                </p>
              </div>
            ) : null
            }
          </div>
          <Button type="submit" disabled={isLoadingUsername} className="w-full">
            {isLoadingUsername ? "Changement en cours..." : "Confirmez"}
          </Button>
          {errorUsernameUpdate && (
            <div className="flex flex-row items-center text-status-critical gap-2"> 
              <CircleAlert className="w-4 h-4"/>
              <p className="text-sm ">
                {errorUsernameUpdate.message}
              </p>
            </div>
            
          )}
        </form>
         : null}
        </div>

        <div className="flex flex-row items-center justify-between gap-3 p-3">
          <div className="flex flex-col min-w-0 text-sm">
            <dt className="text-muted-foreground">Mot de passe</dt>
            <dd className="truncate">Changez de mot de passe</dd>
          </div>

          <Button onClick={handlePasswordButton} variant="secondary" size="small" className="gap-1.5 shrink-0">
            <PenIcon className="w-4 h-4" />
            Changer
          </Button>
  
        </div>
      </dl>
    </section>
  )
}
