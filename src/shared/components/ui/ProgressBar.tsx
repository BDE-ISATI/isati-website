import type { CSSProperties } from "react";
import cn from "@/shared/utils/cn";

interface ProgressBarProps {
  value: number
  label: string
  className?: string
}

export default function ProgressBar({ value, label, className }: ProgressBarProps) {
  const ratio = Math.min(Math.max(Number.isFinite(value) ? value : 0, 0), 1);

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(ratio * 100)}
      className={cn("h-2 w-full overflow-hidden rounded-full bg-muted", className)}
    >
      <div
        style={{ "--progress-fill": `${ratio * 100}%` } as CSSProperties}
        className="h-full w-(--progress-fill) rounded-full bg-accent transition-[width] duration-200 ease-out motion-reduce:transition-none"
      />
    </div>
  );
}
