import { Navigate, useOutletContext } from "react-router";

import cn from "@/shared/utils/cn";
import ChangeAvatarField from "@/features/profile/components/account/ChangeAvatarField";
import ChangeUsernameField from "@/features/profile/components/account/ChangeUsernameField";
import useUpdateUsername from "@/features/profile/hooks/useUpdateUsername";
import useUpdateProfilePicture from "@/features/profile/hooks/useUpdateProfilePicture";
import { useNavigate } from "react-router";
import LoadingOverlay from "@/shared/components/ui/LoadingOverlay";
import ChangePasswordField from "@/features/profile/components/account/ChangePasswordField";
import useUpdatePassword from "@/features/profile/hooks/useUpdatePassword";
import type { PasswordFields } from "@/features/profile/profileTypes";
import DeleteAccountField from "@/features/profile/components/account/DeleteAccountField";
import useDeleteAccount from "@/features/profile/hooks/useDeleteAccount";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import type { ProfileOutletContext } from "@/features/profile/profileTypes";

 
export default function Account() {
  
  const { user, isForeign } = useOutletContext<ProfileOutletContext>();
  const loggedInUser = useAuthStore((s) => s.user);
  const navigate = useNavigate()

  const usernameUpdate = useUpdateUsername()
  const avatarUpdate = useUpdateProfilePicture()
  const passwordUpdate = useUpdatePassword()
  const accountDelete = useDeleteAccount()

  const isBusy = avatarUpdate.isPending || usernameUpdate.isPending || passwordUpdate.isPending || accountDelete.isPending;

  function handlePasswordChange(fields: PasswordFields) {
    passwordUpdate.mutate({ userId: user.id, email: user.email, ...fields })
  }

  function handleAccountDelete(password: string) {
    accountDelete.mutate({ id: user.id, password })
  }

  function handleUsernameChange(newUsername: string) {
    usernameUpdate.mutate({userId: user.id, username: newUsername}, { onSuccess: () => navigate(`/profile/${newUsername}/account`, { replace: true })})
  }

  function handleAvatarChange(avatarFile: File) {
    avatarUpdate.mutate({ userId: user.id, avatarFile })
  }

  if (isForeign) {
    return <Navigate to={loggedInUser ? `/profile/${user.username}/activities` : "/"} replace/>
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
            isLoading={avatarUpdate.isPending}
            error={avatarUpdate.error}
          />

          <ChangeUsernameField
            username={user.username}
            onConfirm={handleUsernameChange}
            isLoading={usernameUpdate.isPending}
            error={usernameUpdate.error}
          />

          <ChangePasswordField
            onConfirm={handlePasswordChange}
            onReset={passwordUpdate.reset}
            isLoading={passwordUpdate.isPending}
            isSuccess={passwordUpdate.isSuccess}
            error={passwordUpdate.error}
          />

          <DeleteAccountField
            onConfirm={handleAccountDelete}
            isLoading={accountDelete.isPending}
            error={accountDelete.error}
          />

        </dl>

        {isBusy && <LoadingOverlay />}
      </div>
    </section>
  )
}
