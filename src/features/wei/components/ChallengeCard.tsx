import { useEffect, useState, type CSSProperties } from "react";
import { Link } from "react-router";
import pb from "@/shared/lib/pocketbase";
import type { ChallengeWithRelations } from "@/shared/types/sharedTypes";
import ChallengeDifficulty from "@/features/wei/components/ChallengeDifficulty";
import useHasPermission from "@/features/roles/hooks/useHasPermission";
import ChevronRight from "@/assets/icons/chevron-right.svg?react";
import cn from "@/shared/utils/cn";

interface ChallengeCardProps {
  challenge: ChallengeWithRelations
  className?: string
}

function parseDate(iso?: string) {
  if (!iso) return null;
  const time = new Date(iso.replace(" ", "T")).getTime();
  return Number.isNaN(time) ? null : time;
}

function formatRemaining(ms: number) {
  const total = Math.floor(ms / 1000);
  const days = Math.floor(total / 86400);
  const clock = [Math.floor((total % 86400) / 3600), Math.floor((total % 3600) / 60), total % 60]
    .map((v) => String(v).padStart(2, "0"))
    .join(":");
  return days > 0 ? `${days} j ${clock}` : clock;
}

export default function ChallengeCard({ challenge, className }: ChallengeCardProps) {
  const [now, setNow] = useState(() => Date.now());
  const canViewHidden = useHasPermission("view", "challenges");

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const start = parseDate(challenge.start_date);
  const end = parseDate(challenge.end_date);
  const notStarted = start !== null && start > now;
  const target = notStarted ? start : end;

  const countdown =
    target === null ? "—"
    : target <= now ? "Terminé"
    : `${notStarted ? "Disponible dans" : "Se termine dans"} ${formatRemaining(target - now)}`;

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
