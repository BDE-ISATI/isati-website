import useWeiParticipations from "@/features/wei/hooks/queries/useWeiParticipations";
import MemberRow from "@/features/wei/components/MemberRow";
import MemberSearch from "@/features/wei/components/MemberSearch";

import { getFirstErrorMessage } from "@/shared/lib/pocketbase-errors";
import Error from "@/shared/components/ui/Error";
import cn from "@/shared/utils/cn";

interface TeamMembersPanelProps {
  weiId: string
  teamId: string
  className?: string
}

export default function TeamMembersPanel({ weiId, teamId, className }: TeamMembersPanelProps) {

  const participations = useWeiParticipations(weiId);

  const members = participations.data?.filter((participation) => participation.team === teamId) ?? [];
  const students = members.filter((member) => member.role === "student").length;
  const leaders = members.length - students;

  const ordered = [...members].sort(
    (a, b) => Number(b.role === "team_leader") - Number(a.role === "team_leader")
  );

  return (
    <section
      className={cn(
        "w-full rounded-md border border-border bg-card p-4 text-card-foreground shadow-sm sm:p-6",
        className,
      )}
    >
      <h2 className="text-lg font-semibold">
        Membres <span className="text-base font-normal text-muted-foreground">- {students} + {leaders} chef(s)</span>
      </h2>

      <Error className="mt-2" message={getFirstErrorMessage(participations.error)} />

      {members.length === 0 && (
        <p className="mt-2 text-sm text-muted-foreground">Aucun membre affecté à cette équipe.</p>
      )}

      <ul className="mt-4 flex flex-col divide-y divide-border">
        {ordered.map((member) => (
          <MemberRow key={member.id} participation={member} teamId={teamId} />
        ))}
      </ul>

      <div className="mt-6 border-t border-border pt-4">
        <h3 className="mb-2 text-sm font-medium">Ajouter un membre</h3>
        <MemberSearch weiId={weiId} teamId={teamId} />
      </div>
    </section>
  );
}
