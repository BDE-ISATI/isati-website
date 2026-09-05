import type { WeiWithLocation } from "@/shared/types/sharedTypes";
import useMyParticipation from "@/features/wei/hooks/queries/useMyParticipation";
import WeiTimeline from "@/features/wei/components/WeiTimeline";
import WeiCountdown from "@/features/wei/components/WeiCountdown";
import RegisterCta from "@/features/wei/components/RegisterCta";
import TeamBanner from "@/features/wei/components/TeamBanner";
import { parsePbDate } from "@/shared/lib/dates";
import { ParticipationsStateOptions } from "@/shared/types/pocketbase-types";

type EtapeInscriptionProps = {
  wei: WeiWithLocation
};

const dateFormat = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long" });

export default function EtapeInscription({ wei }: EtapeInscriptionProps) {
  const participation = useMyParticipation(wei.id);

  if (participation.isLoading) return null;

  const mine = participation.data;
  const registered = !!mine && mine.state !== ParticipationsStateOptions.cancelled;
  const parcours = parsePbDate(wei.parcours_starts_at);
  const team = mine?.expand?.team;

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col items-center justify-center gap-10 py-10 text-center">
        <WeiCountdown wei={wei} />

        {!registered && <RegisterCta wei={wei} />}

        {registered && (
          <div className="flex w-full max-w-md flex-col items-center gap-3">
            <p className="text-sm text-muted-foreground">
              {parcours
                ? `Les défis démarrent le ${dateFormat.format(parcours)}.`
                : "Les défis démarreront bientôt."}
              {!mine?.team && " En attendant, tu seras affecté à une équipe."}
            </p>

            {mine?.team && (
              team?.name ? (
                <TeamBanner
                  name={team.name}
                  color={team.color}
                  titleAs="h2"
                  className="w-full"
                />
              ) : (
                <p className="text-sm text-muted-foreground">
                  Ton équipe te sera révélée au début du parcours.
                </p>
              )
            )}
          </div>
        )}
      </div>

      <WeiTimeline wei={wei} className="mb-10" />
    </div>
  );
}
