import useWeiParticipations from "@/features/wei/hooks/queries/useWeiParticipations";
import MemberIdentity from "@/features/wei/components/MemberIdentity";

import { getFirstErrorMessage } from "@/shared/lib/pocketbase-errors";
import Error from "@/shared/components/ui/Error";
import cn from "@/shared/utils/cn";

interface UnassignedPanelProps {
  weiId: string
  className?: string
}

export default function UnassignedPanel({ weiId, className }: UnassignedPanelProps) {

  const participations = useWeiParticipations(weiId);

  const unassigned = participations.data?.filter((participation) => participation.state === "pending") ?? [];

  return (
    <section
      className={cn(
        "w-full rounded-md border border-border bg-card p-4 text-card-foreground shadow-sm",
        className,
      )}
    >
      <h2 className="text-lg font-semibold">
        Inscrits sans équipe <span className="text-base font-normal text-muted-foreground">- {unassigned.length}</span>
      </h2>

      <Error className="mt-2" message={getFirstErrorMessage(participations.error)} />

      {unassigned.length === 0 ? (
        <p className="mt-2 text-sm text-muted-foreground">
          {participations.data?.length ? "La répartition est terminée." : "Aucun inscrit pour le moment."}
        </p>
      ) : (
        <ul className="mt-4 flex max-h-96 flex-col divide-y divide-border overflow-y-auto">
          {unassigned.map((participation) => (
            <li key={participation.id} className="py-2 first:pt-0 last:pb-0">
              <MemberIdentity user={participation.expand?.user} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
