import type { WeiWithLocation } from "@/shared/types/sharedTypes";
import WeiTimeline from "@/features/wei/components/WeiTimeline";
import WeiCountdown from "@/features/wei/components/WeiCountdown";
import useHasPermission from "@/features/roles/hooks/useHasPermission";
import useMyParticipation from "@/features/wei/hooks/queries/useMyParticipation";
import WeiHub from "@/features/wei/components/hub/WeiHub";
import HubAttente from "@/features/wei/components/hub/HubAttente";
import { ParticipationsStateOptions } from "@/shared/types/pocketbase-types";
import ButtonLink from "@/shared/components/ui/ButtonLink";
import ChevronRight from "@/assets/icons/chevron-right.svg?react";

type EtapeWeekendProps = {
  wei: WeiWithLocation
};

export default function EtapeWeekend({ wei }: EtapeWeekendProps) {

  const canReview = useHasPermission("view", "validations");
  const participation = useMyParticipation(wei.id);

  if (participation.isLoading) return null;

  const mine = participation.data;

  if (mine?.state === ParticipationsStateOptions.assigned && mine.team) {
    return <WeiHub wei={wei} participation={mine} />;
  }

  if (mine && mine.state !== ParticipationsStateOptions.cancelled) {
    return <HubAttente wei={wei} />;
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col items-center justify-center gap-10 py-10 text-center">
        <WeiCountdown wei={wei} />

        <div className="flex max-w-md flex-col items-center gap-2">
          <h2 className="text-lg font-semibold">C'est le week-end</h2>

          <div className="flex flex-row flex-wrap items-center justify-center gap-3">
            <ButtonLink to="/wei/challenge" variant="accent">
              Les défis
              <ChevronRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink to="/wei/team" variant="secondary">
              Classement des équipes
              <ChevronRight className="h-4 w-4" />
            </ButtonLink>
            {canReview && (
              <ButtonLink to="/wei/validation" variant="secondary">
                Valider les preuves
                <ChevronRight className="h-4 w-4" />
              </ButtonLink>
            )}
          </div>
        </div>
      </div>

      <WeiTimeline wei={wei} className="mb-10" />
    </div>
  );
}
