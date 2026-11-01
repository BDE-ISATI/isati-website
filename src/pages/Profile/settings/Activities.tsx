import { Link, useOutletContext } from "react-router";
import type { ProfileOutletContext } from "@/features/profile/profileTypes";
import type { ParticipationWithWei } from "@/shared/types/sharedTypes";
import type { ParticipationsStateOptions } from "@/shared/types/pocketbase-types";
import useUserParticipations from "@/features/wei/hooks/queries/useUserParticipations";
import { getFirstErrorMessage } from "@/shared/lib/pocketbase-errors";
import ButtonLink from "@/shared/components/ui/ButtonLink";
import Error from "@/shared/components/ui/Error";
import LoadingOverlay from "@/shared/components/ui/LoadingOverlay";
import ChevronRight from "@/assets/icons/chevron-right.svg?react";
import cn from "@/shared/utils/cn";

const STATE_LABELS: Record<ParticipationsStateOptions, string> = {
  pending: "Inscription en attente",
  assigned: "Affecté à une équipe",
  cancelled: "Inscription annulée",
};

export default function Activities() {

  const { user, isForeign } = useOutletContext<ProfileOutletContext>();
  const participations = useUserParticipations(user.id);

  return (
    <section className="flex flex-col gap-4">
      <header className="flex flex-col gap-0.5">
        <h1 className="text-lg sm:text-xl font-semibold leading-tight">
          {isForeign ? `Activités de ${user.username}` : "Mes activités"}
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Les WEI auxquels {isForeign ? "cette personne a" : "vous avez"} participé
        </p>
      </header>

      <Error message={getFirstErrorMessage(participations.error)} />

      <div className="relative">
        <div inert={participations.isPending} className={cn(
          "flex flex-col gap-2 transition duration-200",
          participations.isPending && "blur-sm pointer-events-none select-none"
        )}>
          {participations.data?.length === 0 && (
            <div className="flex flex-col items-start gap-2 text-sm">
              <p className="text-muted-foreground">Aucune participation au WEI.</p>
              {!isForeign && (
                <ButtonLink to="/wei" variant="secondary" size="small">Voir le WEI</ButtonLink>
              )}
            </div>
          )}

          {!!participations.data?.length && (
            <ul className="flex flex-col divide-y divide-border rounded-md border border-border">
              {participations.data.map((participation) => (
                <li key={participation.id}>
                  <WeiRow participation={participation} userId={user.id} />
                </li>
              ))}
            </ul>
          )}
        </div>

        {participations.isPending && <LoadingOverlay />}
      </div>
    </section>
  )
}

function WeiRow({ participation, userId }: { participation: ParticipationWithWei, userId: string }) {

  const wei = participation.expand?.wei;
  const state = participation.state || "pending";

  const content = (
    <>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="truncate font-medium">
          {`WEI ${wei?.year ?? ""}`.trim()}
          {wei?.title && <span className="text-muted-foreground"> · {wei.title}</span>}
        </span>
        <span className="truncate text-xs text-muted-foreground">{STATE_LABELS[state]}</span>
      </span>

      {state === "assigned" && <ChevronRight aria-hidden="true" className="h-4 w-4 shrink-0 text-muted-foreground" />}
    </>
  );

  if (state !== "assigned") {
    return <div className="flex flex-row items-center gap-3 p-3 text-sm">{content}</div>;
  }

  return (
    <Link
      to={`/wei/${participation.wei}/participant/${userId}`}
      className="flex flex-row items-center gap-3 p-3 text-sm transition duration-200 hover:bg-muted motion-reduce:transition-none"
    >
      {content}
    </Link>
  );
}
