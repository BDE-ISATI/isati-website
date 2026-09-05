import type { CSSProperties } from "react";
import { Link } from "react-router";
import type { ChallengeWithRelations } from "@/shared/types/sharedTypes";
import ChallengeDifficulty from "@/features/wei/components/ChallengeDifficulty";
import challengeWindow from "@/features/wei/libs/challenge";
import ButtonLink from "@/shared/components/ui/ButtonLink";
import ChevronRight from "@/assets/icons/chevron-right.svg?react";

interface HubSuggestionsProps {
  challenges: ChallengeWithRelations[]
  total: number
  now: number
}

export default function HubSuggestions({ challenges, total, now }: HubSuggestionsProps) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-lg font-semibold">Défis suggérés</h2>

      {total === 0 && (
        <p className="rounded-md border border-border bg-muted p-4 text-sm text-muted-foreground">
          Les défis arrivent bientôt.
        </p>
      )}

      {total > 0 && challenges.length === 0 && (
        <div className="flex flex-col items-start gap-2 rounded-md border border-border bg-muted p-4 text-sm">
          <p>Tu as tout validé, bien joué !</p>
          <ButtonLink to="/wei/team" variant="secondary" size="small">
            Voir le classement
            <ChevronRight className="h-4 w-4" />
          </ButtonLink>
        </div>
      )}

      {challenges.length > 0 && (
        <ul className="flex flex-row gap-3 overflow-x-auto pb-2 snap-x">
          {challenges.map((challenge) => (
            <li key={challenge.id} className="w-56 shrink-0 snap-start">
              <HubChallengeCard challenge={challenge} now={now} />
            </li>
          ))}
          <li className="flex w-40 shrink-0 snap-start items-center justify-center">
            <ButtonLink to="/wei/challenge" variant="secondary" size="small">
              Voir tous les défis
              <ChevronRight className="h-4 w-4" />
            </ButtonLink>
          </li>
        </ul>
      )}
    </section>
  );
}

function HubChallengeCard({ challenge, now }: { challenge: ChallengeWithRelations, now: number }) {
  const { countdown } = challengeWindow(challenge, now);
  const category = challenge.expand?.category?.[0];
  const title = challenge.title || "Défi sans titre";

  return (
    <Link
      to={`/wei/challenge/${challenge.id}`}
      aria-label={`Voir le défi ${title}`}
      style={{ "--challenge-color": challenge.color || "var(--color-accent)" } as CSSProperties}
      className="flex h-full flex-col gap-2 rounded-md border border-border border-l-4 border-l-(--challenge-color) bg-muted p-3 transition duration-200 hover:-translate-y-0.5 hover:bg-border motion-reduce:transition-none"
    >
      <h3 className="line-clamp-2 leading-tight font-semibold">{title}</h3>

      {category && (
        <span className="flex flex-row items-center gap-1.5 text-xs text-muted-foreground">
          <span aria-hidden="true" style={{ backgroundColor: category.color }} className="h-2.5 w-2.5 shrink-0 rounded-full" />
          <span className="truncate">{category.name}</span>
        </span>
      )}

      <div className="mt-auto flex flex-row items-center justify-between gap-2">
        <ChallengeDifficulty level={Number(challenge.difficulty)} />
        {!!challenge.points && <span className="text-xs font-semibold">{challenge.points} pts</span>}
      </div>

      <p className="text-xs text-muted-foreground">{countdown}</p>
    </Link>
  );
}
