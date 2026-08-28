import type { WeiWithLocation } from "@/shared/types/sharedTypes";
import weiMilestones from "@/features/wei/libs/milestones";
import StepProgress from "@/shared/components/ui/StepProgress";

type WeiTimelineProps = {
  wei: WeiWithLocation
  className?: string
};

export default function WeiTimeline({ wei, className }: WeiTimelineProps) {
  const milestone = weiMilestones(wei, { includeCreation: false });

  if (!milestone) return null;

  return (
    <StepProgress
      steps={milestone.steps}
      value={milestone.value}
      label={`Chronologie du WEI ${wei.year || ""}`.trim()}
      className={className}
    />
  );
}
