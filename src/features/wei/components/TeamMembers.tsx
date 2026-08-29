import { darken } from "color2k";
import pb from "@/shared/lib/pocketbase";
import type { TeamMember, TeamScore } from "@/shared/types/sharedTypes";
import useTeamMembers from "@/features/wei/hooks/queries/useTeamMembers";
import { getFirstErrorMessage } from "@/shared/lib/pocketbase-errors";
import Error from "@/shared/components/ui/Error";
import cn from "@/shared/utils/cn";

interface TeamMembersProps {
  team: TeamScore
  className?: string
}

export default function TeamMembers({ team, className }: TeamMembersProps) {

  const members = useTeamMembers(team.id);

  const ordered = members.data
    ? [...members.data].sort((a, b) => Number(b.role === "team_leader") - Number(a.role === "team_leader"))
    : [];

  return (
    <section
      className={cn(
        "w-full rounded-md border border-border bg-card p-4 text-card-foreground shadow-sm sm:p-6",
        className,
      )}
    >
      <h2 className="text-lg font-semibold">Membres</h2>

      <Error className="mt-2" message={getFirstErrorMessage(members.error)} />

      {members.data?.length === 0 && (
        <p className="mt-2 text-sm text-muted-foreground">Aucun membre affecté à cette équipe.</p>
      )}

      <ul className="mt-4 flex flex-col divide-y divide-border">
        {ordered.map((member) => (
          <li key={member.id} className="flex flex-row items-center gap-3 py-3 first:pt-0 last:pb-0">
            <Member member={member} team={team} />
            <span className="ml-auto shrink-0 text-sm font-medium">
              {member.score ?? 0} pts
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Member({ member, team }: { member: TeamMember, team: TeamScore }) {

  const user = member.expand?.user;

  if (!user) return <span className="text-sm text-muted-foreground">Participant inconnu</span>;

  const avatarURL = user.avatar ? pb.files.getURL(user, user.avatar, { thumb: "100x100" }) : undefined;

  return (
    <span className="flex min-w-0 flex-row items-center gap-2">
      <img
        src={avatarURL}
        alt=""
        className="h-8 w-8 shrink-0 rounded-full border border-border object-cover"
      />
      <span className="truncate text-sm font-medium">{user.username}</span>
      {member.role === "team_leader" && (
        <span
          style={{
            backgroundColor: team.color,
            borderColor: team.color ? darken(team.color, 0.09) : undefined,
          }}
          className="inline-flex shrink-0 items-center rounded-md border-2 px-2 py-0.5 text-xs font-medium text-white"
        >
          Chef d'équipe
        </span>
      )}
    </span>
  );
}
