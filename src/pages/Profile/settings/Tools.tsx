import { useOutletContext } from "react-router";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import useHasPermission from "@/features/roles/hooks/useHasPermission";
import type { ProfileOutletContext } from "@/features/profile/profileTypes";
import ButtonLink from "@/shared/components/ui/ButtonLink";
import LoadingOverlay from "@/shared/components/ui/LoadingOverlay";
import cn from "@/shared/utils/cn";

export default function Tools() {

  const { user } = useOutletContext<ProfileOutletContext>();
  const loggedInUser = useAuthStore((s) => s.user);

  const isBusy = false //placeholder : à changer si besoin de chargement.

  const isOwnProfile = loggedInUser?.id === user.id;
  const showWeiPanel = useHasPermission("view", "wei_panel") && isOwnProfile;
  const showValidations = useHasPermission("view", "validations") && isOwnProfile;

  return (
    <section className="flex flex-col gap-4">
      <header className="flex flex-col gap-0.5">
        <h1 className="text-lg sm:text-xl font-semibold leading-tight">Mes outils</h1>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Accédez aux différents outils de votre compte
        </p>
      </header>

      <div className="relative">
        <dl inert={isBusy} className={cn(
          "flex flex-col divide-y divide-border border border-border rounded-md transition duration-200",
          isBusy && "blur-sm pointer-events-none select-none"
        )}>

          {showWeiPanel && (
            <div className="flex flex-row items-center justify-between gap-3 p-3 text-sm">
              <div className="flex flex-col min-w-0">
                <dt className="text-muted-foreground">Panel WEI</dt>
                <dd className="truncate">Gérez le WEI et ses équipes</dd>
              </div>
              <ButtonLink to="/wei/panel" variant="secondary" size="small" className="shrink-0">
                Ouvrir
              </ButtonLink>
            </div>
          )}

          {showValidations && (
            <div className="flex flex-row items-center justify-between gap-3 p-3 text-sm">
              <div className="flex flex-col min-w-0">
                <dt className="text-muted-foreground">Validations</dt>
                <dd className="truncate">Traitez les demandes de validation</dd>
              </div>
              <ButtonLink to="/wei/validation" variant="secondary" size="small" className="shrink-0">
                Ouvrir
              </ButtonLink>
            </div>
          )}

          {!showWeiPanel && !showValidations && (
            <p className="p-3 text-sm text-muted-foreground">
              Aucun outil disponible.
            </p>
          )}

        </dl>

        {isBusy && <LoadingOverlay />}
      </div>

    </section>
  )
}
