import type { WeiWithLocation } from "@/shared/types/sharedTypes";
import weiPhase from "@/features/wei/libs/phase";
import useNow from "@/shared/hooks/useNow";
import { formatRemaining } from "@/shared/lib/dates";
import cn from "@/shared/utils/cn";

type WeiCountdownProps = {
  wei: WeiWithLocation
  className?: string
};

export default function WeiCountdown({ wei, className }: WeiCountdownProps) {
  const now = useNow();
  const next = weiPhase(wei, new Date(now))?.next;

  if (!next) return null;

  return (
    <div className={cn("flex flex-col items-center gap-2 text-center", className)}>
      <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase sm:text-sm">
        {next.label}
      </p>
      <p className="text-5xl font-bold tabular-nums sm:text-7xl">
        {formatRemaining(next.date.getTime() - now)}
      </p>
    </div>
  );
}
