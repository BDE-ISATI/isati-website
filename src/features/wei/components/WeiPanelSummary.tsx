import useWeiParticipations from "@/features/wei/hooks/queries/useWeiParticipations";
import useHasPermission from "@/features/roles/hooks/useHasPermission";
import weiMilestones from "@/features/wei/libs/milestones";
import weiDateIssues from "@/features/wei/libs/weiIssues";

import type { WeiWithLocation } from "@/shared/types/sharedTypes";
import { parsePbDate } from "@/shared/lib/dates";
import { getFirstErrorMessage } from "@/shared/lib/pocketbase-errors";
import StepProgress from "@/shared/components/ui/StepProgress";
import ButtonLink from "@/shared/components/ui/ButtonLink";
import Error from "@/shared/components/ui/Error";
import CircleAlert from "@/assets/icons/circle-alert.svg?react";
import PenIcon from "@/assets/icons/pen.svg?react";
import cn from "@/shared/utils/cn";

const dateFormat = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" });

interface WeiPanelSummaryProps {
  wei: WeiWithLocation
  className?: string
}

export default function WeiPanelSummary({ wei, className }: WeiPanelSummaryProps) {

  const participations = useWeiParticipations(wei.id);
  const milestone = weiMilestones(wei);
  const issues = weiDateIssues(wei);
  const canUpdate = useHasPermission("update", "weis");

  const assigned = participations.data?.filter((participation) => participation.state === "assigned").length ?? 0;
  const total = participations.data?.length ?? 0;
  const parcoursStart = parsePbDate(wei.parcours_starts_at);

  return (
    <section
      className={cn(
        "relative flex w-full flex-col gap-6 rounded-md border border-border bg-card p-5 text-card-foreground shadow-sm sm:p-8",
        className,
      )}
    >
      <header className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        {wei.year && <span className="text-3xl font-bold leading-none sm:text-4xl">{wei.year}</span>}
        <h1 className="text-base font-medium text-muted-foreground sm:text-lg">
          {wei.title || "WEI sans titre"}
        </h1>
      </header>

      {wei.theme && (
        <p className="text-sm">
          <span className="text-muted-foreground">Thème : </span>
          {wei.theme}
        </p>
      )}

      <Error message={getFirstErrorMessage(participations.error)} />

      <dl className="grid grid-cols-3 gap-4">
        <div className="flex flex-col">
          <dt className="text-sm text-muted-foreground">Inscrits</dt>
          <dd className="text-2xl font-bold">{total}</dd>
        </div>
        <div className="flex flex-col">
          <dt className="text-sm text-muted-foreground">Affectés</dt>
          <dd className="text-2xl font-bold">{assigned}</dd>
        </div>
        <div className="flex flex-col">
          <dt className="text-sm text-muted-foreground">Sans équipe</dt>
          <dd className="text-2xl font-bold">{total - assigned}</dd>
        </div>
      </dl>

      {issues.length > 0 && (
        <ul className="flex flex-col gap-1">
          {issues.map((issue) => (
            <li key={issue} className="flex flex-row items-center gap-2 text-sm text-status-warning">
              <CircleAlert aria-hidden="true" className="h-4 w-4 shrink-0" />
              {issue}
            </li>
          ))}
        </ul>
      )}

      {milestone && (
        <StepProgress
          steps={milestone.steps}
          value={milestone.value}
          label={`Progression du WEI ${wei.title || wei.year || ""}`.trim()}
        />
      )}

      <p className="text-sm text-muted-foreground">
        {parcoursStart
          ? `Les équipes deviennent visibles des élèves le ${dateFormat.format(parcoursStart)}, au début du parcours.`
          : "Les équipes resteront masquées tant que la date de début du parcours n'est pas renseignée."}
      </p>

      {canUpdate && (
        <ButtonLink
          to={`/wei/${wei.id}/edit`}
          aria-label={`Modifier le WEI ${wei.title || wei.year || ""}`.trim()}
          variant="secondary"
          size="icon"
          className="absolute top-2 right-2 shadow-sm"
        >
          <PenIcon className="h-4 w-4" />
        </ButtonLink>
      )}
    </section>
  );
}
