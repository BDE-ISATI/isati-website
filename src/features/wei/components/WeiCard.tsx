import type { WeiWithLocation } from "@/shared/types/sharedTypes";
import weiMilestones from "@/features/wei/libs/milestones";
import StepProgress from "@/shared/components/ui/StepProgress";
import ButtonLink from "@/shared/components/ui/ButtonLink";
import ChevronRight from "@/assets/icons/chevron-right.svg?react";
import cn from "@/shared/utils/cn";

type WeiCardProps = {
  wei: WeiWithLocation;
  className?: string;
};

export default function WeiCard({ wei, className }: WeiCardProps) {
  const milestone = weiMilestones(wei);

  const locationText = !wei.location
    ? "À définir"
    : wei.expand?.location?.label || "Masqué";


  return (
    <article
      className={cn(
        "flex w-full flex-row items-center gap-4 rounded-md border border-border bg-card p-5 text-card-foreground shadow-sm sm:gap-8 sm:p-8",
        className,
      )}
    >
      <div className="flex min-w-0 flex-1 flex-col gap-6">
        <header className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          {wei.year && <span className="text-3xl font-bold leading-none sm:text-4xl">{wei.year}</span>}
          <h2 className="text-base font-medium text-muted-foreground sm:text-lg">
            {wei.title || "WEI sans titre"}
          </h2>
        </header>

        {wei.theme && (
          <p className="text-sm">
            <span className="text-muted-foreground">Thème : </span>
            {wei.theme}
          </p>
        )}

        {wei.description && <p className="text-sm whitespace-pre-line">{wei.description}</p>}

        <p className="text-sm">
          <span className="text-muted-foreground">Lieu : </span>
          {locationText}
        </p>

        {milestone && (
          <StepProgress
            steps={milestone.steps}
            value={milestone.value}
            label={`Progression du WEI ${wei.title || wei.year || ""}`.trim()}
          />
        )}
      </div>

      <ButtonLink
        to={`/wei/panel/${wei.id}`}
        variant="accent"
        size="icon"
        className="shrink-0"
        aria-label={`Gérer le WEI ${wei.title || wei.year || ""}`.trim()}
      >
        <ChevronRight className="h-7 w-7" />
      </ButtonLink>
    </article>
  );
}
