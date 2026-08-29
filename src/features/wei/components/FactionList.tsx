import { Link } from "react-router";
import { darken, transparentize } from "color2k";

import useFactions from "@/features/wei/hooks/queries/useFactions";
import useTeamScores from "@/features/wei/hooks/queries/useTeamScores";
import useWeiParticipations from "@/features/wei/hooks/queries/useWeiParticipations";

import pb from "@/shared/lib/pocketbase";
import { getFirstErrorMessage } from "@/shared/lib/pocketbase-errors";
import Error from "@/shared/components/ui/Error";
import ButtonLink from "@/shared/components/ui/ButtonLink";
import PenIcon from "@/assets/icons/pen.svg?react";
import PlusIcon from "@/assets/icons/plus.svg?react";
import cn from "@/shared/utils/cn";

interface FactionListProps {
  weiId: string
  canWrite: boolean
  className?: string
}

export default function FactionList({ weiId, canWrite, className }: FactionListProps) {

  const factions = useFactions(weiId);
  const teams = useTeamScores(weiId);
  const participations = useWeiParticipations(weiId);

  function factionStats(factionId: string) {
    const factionTeams = teams.data?.filter((team) => team.faction === factionId) ?? [];
    const teamIds = factionTeams.map((team) => team.id);
    const members = participations.data?.filter(
      (participation) => participation.state === "assigned" && teamIds.includes(participation.team)
    ) ?? [];
    return { teams: factionTeams.length, members: members.length };
  }

  return (
    <section className={cn("flex w-full flex-col gap-3", className)}>
      <h2 className="text-lg font-semibold">Factions</h2>

      <Error message={getFirstErrorMessage(factions.error)} />

      {factions.data?.length === 0 && (
        <p className="text-sm text-muted-foreground">Aucune faction pour ce WEI.</p>
      )}

      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {factions.data?.map((faction) => {
          const stats = factionStats(faction.id);
          const logoURL = faction.logo ? pb.files.getURL(faction, faction.logo, { thumb: "100x100" }) : undefined;

          return (
            <li key={faction.id} className="relative">
              <div
                style={{
                  borderColor: faction.color ? darken(faction.color, 0.09) : undefined,
                  backgroundColor: faction.color ? transparentize(faction.color, 0.9) : undefined,
                }}
                className="flex h-full flex-row items-center gap-3 rounded-md border-2 border-border bg-card p-4 text-card-foreground shadow-sm"
              >
                {logoURL ? (
                  <img src={logoURL} alt="" className="h-12 w-12 shrink-0 rounded-md border border-border object-cover" />
                ) : (
                  <span
                    aria-hidden="true"
                    style={{
                      backgroundColor: faction.color,
                      borderColor: faction.color ? darken(faction.color, 0.09) : undefined,
                    }}
                    className="h-12 w-12 shrink-0 rounded-md border-2"
                  />
                )}

                <div className="flex min-w-0 flex-col">
                  <span className="truncate font-medium">{faction.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {stats.teams} équipe(s) · {stats.members} membre(s)
                  </span>
                </div>
              </div>

              {canWrite && (
                <ButtonLink
                  to={`/wei/panel/${weiId}/factions/${faction.id}/edit`}
                  aria-label={`Modifier la faction ${faction.name}`}
                  variant="secondary"
                  size="icon"
                  className="absolute top-2 right-2 shadow-sm"
                >
                  <PenIcon className="h-4 w-4" />
                </ButtonLink>
              )}
            </li>
          );
        })}

        {canWrite && (
          <li>
            <Link
              to={`/wei/panel/${weiId}/factions/new`}
              className="flex h-full min-h-20 items-center justify-center rounded-md border border-dashed border-accent p-4 text-accent transition duration-200 hover:bg-accent/5 motion-reduce:transition-none"
            >
              <PlusIcon aria-hidden="true" className="h-6 w-6" />
              <span className="sr-only">Créer une faction</span>
            </Link>
          </li>
        )}
      </ul>
    </section>
  );
}
