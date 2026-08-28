import { type CSSProperties } from "react";
import { darken } from "color2k";
import pb from "@/shared/lib/pocketbase";
import type { ChallengeWithRelations } from "@/shared/types/sharedTypes";
import ChallengeDifficulty from "@/features/wei/components/ChallengeDifficulty";
import ChallengeScope from "@/features/wei/components/ChallengeScope";
import challengeWindow from "@/features/wei/libs/challenge";
import useNow from "@/shared/hooks/useNow";
import cn from "@/shared/utils/cn";

interface ChallengeBannerProps {
  challenge: ChallengeWithRelations
  className?: string
}

export default function ChallengeBanner({ challenge, className }: ChallengeBannerProps) {
  const now = useNow();
  const { notStarted, countdown } = challengeWindow(challenge, now);

  const title = challenge.title || "Prochain défi";
  const categories = challenge.expand?.category ?? [];
  const imageURL = challenge.image ? pb.files.getURL(challenge, challenge.image) : undefined;

  return (
    <section
      style={{
        "--challenge-color": notStarted
          ? "var(--color-foreground)"
          : challenge.color || "var(--color-accent)",
      } as CSSProperties}
      className={cn(
        "w-full overflow-hidden rounded-md border border-border bg-card text-card-foreground shadow-sm",
        className,
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
                "text-8xl font-bold",
                notStarted ? "text-background/80" : "text-muted-foreground",
              )}
            >
              ?
            </span>
          </div>
        )}

        {!notStarted && (
          <>
            <ChallengeDifficulty
              level={Number(challenge.difficulty)}
              showLabel
              className="absolute top-2 left-2 rounded-full bg-background/80 px-2 py-1 text-foreground backdrop-blur-sm"
            />

            <ChallengeScope
              scope={challenge.scope}
              className="absolute top-2 right-2 rounded-full bg-background/80 px-2 py-1 text-foreground backdrop-blur-sm"
            />

            {categories.length > 0 && (
              <div className="absolute bottom-2 left-2 flex flex-row flex-wrap gap-1.5">
                {categories.map((category) => (
                  <span
                    key={category.id}
                    style={{
                      backgroundColor: category.color,
                      borderColor: category.color ? darken(category.color, 0.09) : undefined,
                    }}
                    className="inline-flex items-center rounded-md border-2 px-2 py-0.5 text-xs font-medium text-white"
                  >
                    {category.name}
                  </span>
                ))}
              </div>
            )}

            <span className="absolute right-2 bottom-2 rounded-full bg-background/80 px-3 py-1 text-lg font-bold text-foreground backdrop-blur-sm">
              {challenge.points} pts
            </span>
          </>
        )}
      </div>

      <div className="flex flex-row items-center gap-3 bg-(--challenge-color) px-4 py-3 text-white">
        <h1 className="min-w-0 flex-1 truncate text-xl font-bold sm:text-2xl">{title}</h1>
        <p className="shrink-0 text-xs tabular-nums opacity-90 sm:text-sm">{countdown}</p>
      </div>
    </section>
  );
}
