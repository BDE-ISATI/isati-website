import cn from "@/shared/utils/cn";

interface ChallengeDifficultyProps {
  level: number
  showLabel?: boolean
  className?: string
}

const levels = [
  { label: "Très Facile", fill: "bg-status-success" },
  { label: "Facile", fill: "bg-status-warning" },
  { label: "Moyen", fill: "bg-status-error" },
  { label: "Difficile", fill: "bg-status-critical" },
  { label: "Extrême", fill: "bg-foreground" },
];

export default function ChallengeDifficulty({ level, showLabel, className }: ChallengeDifficultyProps) {
  const filled = Math.min(Math.max(Math.round(level) || 0, 0), levels.length);
  const current = levels[filled - 1];

  return (
    <div
      role="img"
      aria-label={current ? `Difficulté : ${current.label} (${filled}/5)` : "Difficulté inconnue"}
      className={cn("flex flex-row items-center gap-1", className)}
    >
      {levels.map((_, i) => (
        <span
          key={i}
          aria-hidden="true"
          className={cn(
            "h-2.5 w-2.5 rounded-full",
            i < filled && current ? current.fill : "bg-status-disabled",
          )}
        />
      ))}

      {showLabel && current && (
        <span aria-hidden="true" className="ml-1 text-xs font-medium">
          {current.label}
        </span>
      )}
    </div>
  );
}
