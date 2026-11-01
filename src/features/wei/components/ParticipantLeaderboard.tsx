import { useState } from "react";
import { Link } from "react-router";
import pb from "@/shared/lib/pocketbase";
import type { ParticipationScore, TeamScore } from "@/shared/types/sharedTypes";
import Button from "@/shared/components/ui/Button";
import cn from "@/shared/utils/cn";

interface ParticipantLeaderboardProps {
  weiId: string
  scores: ParticipationScore[]
  teams: TeamScore[]
  highlightUserId?: string
  className?: string
}

const COLLAPSE_ABOVE = 15;
const TOP_COUNT = 10;

export default function ParticipantLeaderboard({ weiId, scores, teams, highlightUserId, className }: ParticipantLeaderboardProps) {

  const [ expanded, setExpanded ] = useState<boolean>(false);

  const teamById = new Map<string, TeamScore>(teams.map((team) => [team.id, team]));
  const ranked = scores.map((entry, index) => ({ entry: entry, rank: index + 1 }));
  const highlightIndex = highlightUserId ? ranked.findIndex((row) => row.entry.user === highlightUserId) : -1;
  const collapsed = !expanded && ranked.length > COLLAPSE_ABOVE;

  const visible = collapsed
    ? ranked.filter((_, index) => index < TOP_COUNT || (highlightIndex >= 0 && Math.abs(index - highlightIndex) <= 1))
    : ranked;

  return (
    <section
      className={cn(
        "w-full rounded-md border border-border bg-card p-4 text-card-foreground shadow-sm sm:p-6",
        className,
      )}
    >
      <h2 className="text-lg font-semibold">Classement des participants</h2>

      {ranked.length === 0 && (
        <p className="mt-2 text-sm text-muted-foreground">Le classement démarre avec les premières validations.</p>
      )}

      <ul className="mt-4 flex flex-col divide-y divide-border">
        {visible.map((row, index) => {
          const previous = visible[index - 1];
          const user = row.entry.expand?.user;
          const team = row.entry.team ? teamById.get(row.entry.team) : undefined;
          const avatarURL = user?.avatar ? pb.files.getURL(user, user.avatar, { thumb: "100x100" }) : undefined;
          const current = !!highlightUserId && row.entry.user === highlightUserId;

          return (
            <li key={row.entry.id} className="flex flex-col">
              {previous && previous.rank + 1 !== row.rank && (
                <span aria-hidden="true" className="py-1 text-center text-xs text-muted-foreground">···</span>
              )}

              <Link
                to={`/wei/${weiId}/participant/${row.entry.user}`}
                aria-label={`Voir l'activité de ${user?.username || "ce participant"}`}
                className={cn(
                  "-mx-2 flex flex-row items-center gap-3 rounded-md px-2 py-3 transition duration-200 hover:bg-muted motion-reduce:transition-none",
                  current && "bg-muted",
                )}
              >
                <span className="w-6 shrink-0 text-center text-sm font-semibold tabular-nums text-muted-foreground">
                  {row.rank}
                </span>

                <img
                  src={avatarURL}
                  alt=""
                  className="h-8 w-8 shrink-0 rounded-full border border-border bg-muted object-cover"
                />

                <span className="flex min-w-0 flex-1 flex-col">
                  <span className={cn("truncate text-sm", current ? "font-semibold" : "font-medium")}>
                    {user?.username || "Participant inconnu"}
                  </span>
                  {team && (
                    <span className="flex min-w-0 flex-row items-center gap-1.5 text-xs text-muted-foreground">
                      <span
                        aria-hidden="true"
                        style={{ backgroundColor: team.color || "var(--color-accent)" }}
                        className="h-2 w-2 shrink-0 rounded-full"
                      />
                      <span className="truncate">{team.name || "Équipe sans nom"}</span>
                    </span>
                  )}
                </span>

                <span className="shrink-0 text-sm font-medium tabular-nums">
                  {row.entry.score ?? 0} pts
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      {collapsed && (
        <Button
          type="button"
          onClick={() => setExpanded(true)}
          variant="secondary"
          size="small"
          className="mt-4"
        >
          Tout afficher ({ranked.length})
        </Button>
      )}
    </section>
  );
}
