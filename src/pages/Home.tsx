import { useEffect } from "react";

import { useAuthStore } from "@/features/auth/store/useAuthStore";
import useCurrentWei from "@/features/wei/hooks/queries/useCurrentWei";
import useMyParticipation from "@/features/wei/hooks/queries/useMyParticipation";
import weiPhase from "@/features/wei/libs/phase";
import {
  ParticipationsStateOptions,
  UsersLevelOptions,
  UsersSchoolYearOptions,
} from "@/shared/types/pocketbase-types";

function Home() {

  useEffect(() => {
    document.title = 'Accueil | ISATI';
  }, []);

  const user = useAuthStore((s) => s.user);
  const currentWei = useCurrentWei();
  const participation = useMyParticipation(currentWei.data?.id);

  const phase = weiPhase(currentWei.data ?? null);

  const eligible =
    user?.school_year === UsersSchoolYearOptions.E1 &&
    user?.level === UsersLevelOptions.ingenieur;

  const registered =
    !!participation.data && participation.data.state !== ParticipationsStateOptions.cancelled;

  const message = !phase?.isActive || !eligible
    ? null
    : phase.phase === "registration"
      ? registered
        ? "Ton inscription au WEI est enregistrée. Retrouve toutes les infos via le bouton WEI dans la barre de navigation."
        : "Les inscriptions au WEI sont ouvertes ! Inscris-toi dès maintenant via le bouton WEI dans la barre de navigation."
      : phase.phase === "waiting"
        ? "Les inscriptions au WEI sont closes. Retrouve toutes les infos via le bouton WEI dans la barre de navigation."
        : "Le WEI a commencé ! Retrouve les défis et le classement via le bouton WEI dans la barre de navigation.";

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
