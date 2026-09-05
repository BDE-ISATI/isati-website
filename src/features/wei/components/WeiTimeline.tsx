import type { WeiWithLocation } from "@/shared/types/sharedTypes";
import weiMilestones from "@/features/wei/libs/milestones";
import StepProgress from "@/shared/components/ui/StepProgress";
import cn from "@/shared/utils/cn";

type WeiTimelineProps = {
  wei: WeiWithLocation
  className?: string
};

export default function WeiTimeline({ wei, className }: WeiTimelineProps) {
  const milestone = weiMilestones(wei, { includeCreation: false });

  if (!milestone) return null;

  return (
    <div className={cn("mt-10 flex flex-col gap-5 px-4 sm:px-6", className)}>
      <h2 className="text-center text-sm font-semibold tracking-wide text-muted-foreground uppercase">
        Chronologie du WEI
      </h2>

      <StepProgress
        steps={milestone.steps}
        value={milestone.value}
        label={`Chronologie du WEI ${wei.year || ""}`.trim()}
      />
    </div>
  );
}
