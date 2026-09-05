import { Link } from "react-router";
import { darken, transparentize } from "color2k";

import useFactions from "@/features/wei/hooks/queries/useFactions";
import useTeamScores from "@/features/wei/hooks/queries/useTeamScores";
import useWeiParticipations from "@/features/wei/hooks/queries/useWeiParticipations";

import type { TeamScore } from "@/shared/types/sharedTypes";
import { getFirstErrorMessage } from "@/shared/lib/pocketbase-errors";
import Error from "@/shared/components/ui/Error";
import ChevronRight from "@/assets/icons/chevron-right.svg?react";
import PlusIcon from "@/assets/icons/plus.svg?react";
import cn from "@/shared/utils/cn";

interface TeamListProps {
  weiId: string
  canWrite: boolean
  className?: string
}

export default function TeamList({ weiId, canWrite, className }: TeamListProps) {

  const teams = useTeamScores(weiId);
  const factions = useFactions(weiId);
  const participations = useWeiParticipations(weiId);

  const hasFaction = (factions.data?.length ?? 0) > 0;
  const factionIds = new Set(factions.data?.map((faction) => faction.id));
  const orphans = teams.data?.filter((team) => !team.faction || !factionIds.has(team.faction)) ?? [];

  function teamStats(teamId: string) {
    const members = participations.data?.filter(
      (participation) => participation.state === "assigned" && participation.team === teamId
    ) ?? [];
    const leaders = members.filter((member) => member.role === "team_leader").length;
    return { students: members.length - leaders, leaders: leaders };
  }

  function row(team: TeamScore, subtitle?: string) {
    const stats = teamStats(team.id);

    return (
      <li key={team.id}>
        <Link
          to={canWrite ? `/wei/panel/${weiId}/teams/${team.id}/edit` : `/wei/team/${team.id}`}
          className="flex flex-row items-center gap-3 rounded-md border border-border bg-card p-4 text-card-foreground shadow-sm transition duration-200 hover:shadow-md motion-reduce:transition-none"
        >
          <span
            aria-hidden="true"
            style={{
              backgroundColor: team.color,
              borderColor: team.color ? darken(team.color, 0.09) : undefined,
            }}
            className="h-10 w-10 shrink-0 rounded-full border-2"
          />

          <span className="flex min-w-0 flex-col">
            <span className="truncate font-medium">{team.name}</span>
            {subtitle && <span className="truncate text-sm text-muted-foreground">{subtitle}</span>}
          </span>

          <span className="ml-auto shrink-0 text-sm font-medium">
            {stats.students}
            {stats.leaders > 0 && (
              <span className="font-normal text-muted-foreground"> + {stats.leaders} chef(s)</span>
            )}
          </span>

          <ChevronRight aria-hidden="true" className="h-5 w-5 shrink-0 text-muted-foreground" />
        </Link>
      </li>
    );
  }

  return (
    <section className={cn("flex w-full flex-col gap-3", className)}>
      <h2 className="text-lg font-semibold">Équipes</h2>

      <Error message={getFirstErrorMessage(teams.error)} />

      {teams.data?.length === 0 && (
        <p className="text-sm text-muted-foreground">Aucune équipe pour ce WEI.</p>
      )}

      {hasFaction ? (
        <div className="flex flex-col gap-4">
          {factions.data?.map((faction) => {
            const factionTeams = teams.data?.filter((team) => team.faction === faction.id) ?? [];

            return (
              <div
                key={faction.id}
                style={{
                  borderColor: faction.color ? darken(faction.color, 0.09) : undefined,
                  backgroundColor: faction.color ? transparentize(faction.color, 0.9) : undefined,
                }}
                className="flex flex-col gap-3 rounded-md border-2 border-border p-3"
              >
                <h3 className="text-sm font-semibold">{faction.name}</h3>

                {factionTeams.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Aucune équipe.</p>
                ) : (
                  <ul className="flex flex-col gap-3">
                    {factionTeams.map((team) => row(team))}
                  </ul>
                )}
              </div>
            );
          })}

          {orphans.length > 0 && (
            <div className="flex flex-col gap-3">
              <h3 className="text-sm font-semibold text-muted-foreground">Sans faction</h3>
              <ul className="flex flex-col gap-3">
                {orphans.map((team) => row(team))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {teams.data?.map((team) => row(team, "Sans faction"))}
        </ul>
      )}

      {canWrite && (
        <Link
          to={`/wei/panel/${weiId}/teams/new`}
          className="flex min-h-16 items-center justify-center rounded-md border border-dashed border-accent p-4 text-accent transition duration-200 hover:bg-accent/5 motion-reduce:transition-none"
        >
          <PlusIcon aria-hidden="true" className="h-6 w-6" />
          <span className="sr-only">Créer une équipe</span>
        </Link>
      )}
    </section>
  );
}
