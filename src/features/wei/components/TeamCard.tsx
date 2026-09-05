import { Link } from "react-router";
import { darken } from "color2k";
import type { TeamScore } from "@/shared/types/sharedTypes";
import ChevronRight from "@/assets/icons/chevron-right.svg?react";
import cn from "@/shared/utils/cn";

interface TeamCardProps {
  team: TeamScore
  rank: number
  className?: string
}

export default function TeamCard({ team, rank, className }: TeamCardProps) {

  const name = team.name || "Équipe sans nom";
  const color = team.color || "var(--color-accent)";

  return (
    <Link
      to={`/wei/team/${team.id}`}
      aria-label={`Voir l'équipe ${name}`}
      className={cn("block rounded-md", className)}
    >
      <article className="flex flex-row items-center gap-4 rounded-md border-2 border-border bg-card p-4 text-card-foreground shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transition-none sm:gap-6 sm:p-5">

        <span
          aria-hidden="true"
          style={{
            backgroundColor: color,
            borderColor: team.color ? darken(team.color, 0.09) : undefined,
          }}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 text-lg font-bold text-white"
        >
          {rank}
        </span>

        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <h2 className="truncate font-semibold">{name}</h2>
          {team.description ? (
            <p className="line-clamp-2 text-sm text-muted-foreground">{team.description}</p>
          ) : (
            <p className="text-sm text-muted-foreground">Aucune description.</p>
          )}
        </div>

        <div className="flex shrink-0 flex-col items-end">
          <span className="text-2xl leading-none font-bold sm:text-3xl">{team.score ?? 0}</span>
          <span className="text-xs text-muted-foreground">
            {(team.score ?? 0) > 1 ? "points" : "point"}
          </span>
        </div>

        <ChevronRight aria-hidden="true" className="h-6 w-6 shrink-0 text-muted-foreground" />
      </article>
    </Link>
  );
}
