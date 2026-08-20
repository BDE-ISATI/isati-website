import type { UsersRecord } from "@/shared/types/pocketbase-types"
import { Navigate, useOutletContext } from "react-router";

import cn from "@/shared/utils/cn";
import ChangeAvatarField from "@/features/profile/components/ChangeAvatarField";
import ChangeUsernameField from "@/features/profile/components/ChangeUsernameField";
import useUpdateUsername from "@/features/profile/hooks/useUpdateUsername";
import useUpdateProfilePicture from "@/features/profile/hooks/useUpdateProfilePicture";
import { useNavigate } from "react-router";
import LoadingOverlay from "@/shared/components/ui/LoadingOverlay";
import ChangePasswordField from "@/features/profile/components/ChangePasswordField";
import useUpdatePassword from "@/features/profile/hooks/useUpdatePassword";
import type { PasswordFields } from "@/features/profile/profileTypes";
import DeleteAccountField from "@/features/profile/components/DeleteAccountField";
import useDeleteAccount from "@/features/profile/hooks/useDeleteAccount";
import { useAuthStore } from "@/features/auth/store/useAuthStore";


interface AccountContext {
  isLoading: boolean,
  user: NoInfer<UsersRecord>,
  error: Error | null,
  isForeign: boolean
}

 
export default function Account() {
  
  const { user, isForeign } = useOutletContext<AccountContext>();
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const navigate = useNavigate()

  const { update: updateUsername, isLoading: isLoadingUsernameUpdate, error: errorUsernameUpdate } = useUpdateUsername()
  const { update: updateAvatar, isLoading: isLoadingAvatarUpdate, error: errorAvatarUpdate } = useUpdateProfilePicture()
  const { update: updatePassword, reset: resetPasswordUpdate, isLoading: isLoadingPasswordUpdate, isSuccess: isSuccessPasswordUpdate, error: errorPasswordUpdate } = useUpdatePassword()
  const { delete: deleteAccount, isLoading: isLoadingAccountDelete, error: errorAccountDelete } = useDeleteAccount()

  const isBusy = isLoadingAvatarUpdate || isLoadingUsernameUpdate || isLoadingPasswordUpdate || isLoadingAccountDelete;

  function handlePasswordChange(fields: PasswordFields) {
    updatePassword({ userId: user.id, email: user.email, ...fields })
  }

  function handleAccountDelete(password: string) {
    deleteAccount({ id: user.id, password })
  }

  function handleUsernameChange(newUsername: string) {
    updateUsername({userId: user.id, username: newUsername}, { onSuccess: () => navigate(`/profile/${newUsername}/account`, { replace: true })})
  }

  function handleAvatarChange(avatarFile: File) {
    updateAvatar({ userId: user.id, avatarFile })
  }

  if (isForeign) {
    return <Navigate to={isLoggedIn ? `/profile/${user.username}/activities` : "/"} replace/>
  }

  return (
    <section className="flex flex-col gap-4">
      <header className="flex flex-col gap-0.5">
        <h1 className="text-lg sm:text-xl font-semibold leading-tight">Mon compte</h1>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Gérez les informations de connexion de votre compte
        </p>
      </header>

      <div className="relative">
        <dl inert={isBusy} className={cn(
          "flex flex-col divide-y divide-border border border-border rounded-md transition duration-200",
          isBusy && "blur-sm pointer-events-none select-none"
        )}>

          <ChangeAvatarField
            user={user}
            onConfirm={handleAvatarChange}
            isLoading={isLoadingAvatarUpdate}
            error={errorAvatarUpdate}
          />

          <ChangeUsernameField
            username={user.username}
            onConfirm={handleUsernameChange}
            isLoading={isLoadingUsernameUpdate}
            error={errorUsernameUpdate} 
          />

          <ChangePasswordField 
            onConfirm={handlePasswordChange}
            onReset={resetPasswordUpdate}
            isLoading={isLoadingPasswordUpdate}
            isSuccess={isSuccessPasswordUpdate}
            error={errorPasswordUpdate}
          />

          <DeleteAccountField
            onConfirm={handleAccountDelete}
            isLoading={isLoadingAccountDelete}
            error={errorAccountDelete}
          />

        </dl>

        {isBusy && <LoadingOverlay />}
      </div>
    </section>
  )
}
