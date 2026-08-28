import type { WeiWithLocation } from "@/shared/types/sharedTypes";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import useMyParticipation from "@/features/wei/hooks/queries/useMyParticipation";
import useRegisterToWei from "@/features/wei/hooks/mutations/useRegisterToWei";
import WeiTimeline from "@/features/wei/components/WeiTimeline";
import WeiCountdown from "@/features/wei/components/WeiCountdown";
import Button from "@/shared/components/ui/Button";
import ButtonLink from "@/shared/components/ui/ButtonLink";
import Error from "@/shared/components/ui/Error";
import { getFirstErrorMessage } from "@/shared/lib/pocketbase-errors";
import {
  ParticipationsStateOptions,
  UsersLevelOptions,
  UsersSchoolYearOptions,
} from "@/shared/types/pocketbase-types";

type EtapeInscriptionProps = {
  wei: WeiWithLocation
};

export default function EtapeInscription({ wei }: EtapeInscriptionProps) {
  const user = useAuthStore((s) => s.user);
  const participation = useMyParticipation(wei.id);
  const register = useRegisterToWei();

  const eligible =
    user?.school_year === UsersSchoolYearOptions.E1 &&
    user?.level === UsersLevelOptions.ingenieur;

  const registered =
    !!participation.data && participation.data.state !== ParticipationsStateOptions.cancelled;

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col items-center justify-center gap-10 py-10 text-center">
        <WeiCountdown wei={wei} />

        <div className="flex flex-col items-center gap-3">
          {!user && (
            <>
              <p className="text-sm text-muted-foreground">
                Connecte-toi pour t'inscrire au WEI.
              </p>
              <ButtonLink to="/login" variant="accent">
                Se connecter
              </ButtonLink>
            </>
          )}

          {user && !eligible && (
            <p className="text-sm text-muted-foreground">
              Les inscriptions au WEI sont réservées aux 1<sup>re</sup> année ingénieur.
            </p>
          )}

          {user && eligible && registered && (
            <p className="text-sm text-muted-foreground">
              Ton inscription est enregistrée.
            </p>
          )}

          {user && eligible && !registered && (
            <>
              <p className="text-sm text-muted-foreground">
                Les inscriptions sont ouvertes. Ton équipe te sera communiquée à leur fermeture.
              </p>
              <Button
                variant="accent"
                disabled={register.isPending || participation.isPending}
                onClick={() => register.mutate({ userId: user.id })}
              >
                M'inscrire au WEI
              </Button>
            </>
          )}

          <Error message={getFirstErrorMessage(participation.error)} />
          <Error message={getFirstErrorMessage(register.error)} />
        </div>
      </div>

      <WeiTimeline wei={wei} className="mb-10" />
    </div>
  );
}
