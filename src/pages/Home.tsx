import { useEffect } from "react";

import { useAuthStore } from "@/features/auth/store/useAuthStore";
import useCurrentWei from "@/features/wei/hooks/queries/useCurrentWei";
import useMyParticipation from "@/features/wei/hooks/queries/useMyParticipation";
import weiPhase from "@/features/wei/libs/phase";
import { isWeiEligible, registrationOpen } from "@/features/wei/libs/registration";
import { ParticipationsStateOptions } from "@/shared/types/pocketbase-types";

function Home() {

  useEffect(() => {
    document.title = 'Accueil | ISATI';
  }, []);

  const user = useAuthStore((s) => s.user);
  const currentWei = useCurrentWei();
  const participation = useMyParticipation(currentWei.data?.id);

  const phase = weiPhase(currentWei.data ?? null);

  const eligible = isWeiEligible(user);

  const registered =
    !!participation.data && participation.data.state !== ParticipationsStateOptions.cancelled;

  const message = !phase?.isActive || !eligible
    ? null
    : phase.phase === "registration"
      ? registered
        ? "Inscription au WEI validée. Infos dans l'onglet WEI."
        : "Inscriptions au WEI ouvertes. Rendez-vous dans l'onglet WEI."
      : !registered && registrationOpen(currentWei.data ?? null)
        ? "Le parcours a commencé, tu peux encore t'inscrire. Rendez-vous dans l'onglet WEI."
        : "Le WEI a commencé. Défis et classement dans l'onglet WEI.";

  return (
    <>
      {message && (
        <div
          role="status"
          className="w-full bg-warning px-4 py-2.5 text-center text-sm font-medium text-warning-foreground"
        >
          {message}
        </div>
      )}
    </>
  )

}


export default Home;
