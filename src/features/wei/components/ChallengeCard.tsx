import { type CSSProperties } from "react";
import { Link } from "react-router";
import pb from "@/shared/lib/pocketbase";
import type { ChallengeWithRelations } from "@/shared/types/sharedTypes";
import ChallengeDifficulty from "@/features/wei/components/ChallengeDifficulty";
import ChallengeScope from "@/features/wei/components/ChallengeScope";
import useHasPermission from "@/features/roles/hooks/useHasPermission";
import ChevronRight from "@/assets/icons/chevron-right.svg?react";
import challengeWindow from "@/features/wei/libs/challenge";
import useNow from "@/shared/hooks/useNow";
import cn from "@/shared/utils/cn";

interface ChallengeCardProps {
  challenge: ChallengeWithRelations
  className?: string
}

export default function ChallengeCard({ challenge, className }: ChallengeCardProps) {
  const now = useNow();
  const canViewHidden = useHasPermission("view", "challenges");

  const { notStarted, countdown } = challengeWindow(challenge, now);

  const title = challenge.title || "Prochain défi";
  const difficulty = Number(challenge.difficulty);
  const imageURL = challenge.image
    ? pb.files.getURL(challenge, challenge.image, { thumb: "500x500" })
    : undefined;

  const clickable = !notStarted || canViewHidden;

  const card = (
    <article
      style={{
        "--challenge-color": notStarted
          ? "var(--color-foreground)"
          : challenge.color || "var(--color-accent)",
      } as CSSProperties}
      className={cn(
        "overflow-hidden rounded-md border-2 border-border bg-card text-card-foreground shadow-sm transition duration-200 motion-reduce:transition-none",
        clickable && "hover:-translate-y-1 hover:border-(--challenge-color) hover:shadow-lg",
        !clickable && className,
      )}
    >
      <div className="relative aspect-video">
        {imageURL && !notStarted ? (
          <img src={imageURL} alt={title} className="h-full w-full object-cover" />
        ) : (
          <div
            className={cn(
              "flex h-full w-full items-center justify-center",
              notStarted ? "bg-foreground/70" : "bg-muted",
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                "text-6xl font-bold",
                notStarted ? "text-background/80" : "text-muted-foreground",
              )}
            >
              ?
            </span>
          </div>
        )}

        <ChallengeDifficulty
          level={difficulty}
          className="absolute top-2 left-2 rounded-full bg-background/80 px-2 py-1 backdrop-blur-sm"
        />

        {!notStarted && (
          <ChallengeScope
            scope={challenge.scope}
            className="absolute top-2 right-2 rounded-full bg-background/80 px-2 py-1 backdrop-blur-sm"
          />
        )}

        {!notStarted && !!challenge.points && (
          <span className="absolute bottom-2 left-2 rounded-full bg-background/80 px-2 py-1 text-xs font-semibold backdrop-blur-sm">
            {challenge.points} pts
          </span>
        )}
      </div>

      <div className="flex flex-row items-center gap-3 bg-(--challenge-color) px-4 py-3 text-white">
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-semibold">{title}</h3>
          <p className="text-xs opacity-90">{countdown}</p>
        </div>
        {clickable && <ChevronRight aria-hidden="true" className="h-6 w-6 shrink-0" />}
      </div>
    </article>
  );

  if (!clickable) return card;

  return (
    <Link
      to={`/wei/challenge/${challenge.id}`}
      aria-label={`Voir le défi ${title}`}
      className={cn("block", className)}
    >
      {card}
    </Link>
  );
}
