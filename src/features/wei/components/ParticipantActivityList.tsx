import { Link } from "react-router";
import type { ValidationWithRelations } from "@/shared/types/sharedTypes";
import challengeWindow, { SCOPE_LABELS } from "@/features/wei/libs/challenge";
import { VALIDATION_STATUS_CLASSES, VALIDATION_STATUS_LABELS, groupByChallenge, type ValidationGroup } from "@/features/wei/libs/validation";
import { parsePbDate } from "@/shared/lib/dates";
import ButtonLink from "@/shared/components/ui/ButtonLink";
import cn from "@/shared/utils/cn";

interface ParticipantActivityListProps {
  validations: ValidationWithRelations[]
  now: number
  canFix: boolean
  className?: string
}

const dateFormat = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });

export default function ParticipantActivityList({ validations, now, canFix, className }: ParticipantActivityListProps) {

  const groups = groupByChallenge(validations);

  if (groups.length === 0) {
    return <p className={cn("text-sm text-muted-foreground", className)}>Aucune validation pour l'instant.</p>;
  }

  return (
    <ul className={cn("flex flex-col divide-y divide-border rounded-md border border-border", className)}>
      {groups.map((group) => (
        <ActivityRow key={group.challengeId} group={group} now={now} canFix={canFix} />
      ))}
    </ul>
  );
}

function ActivityRow({ group, now, canFix }: { group: ValidationGroup, now: number, canFix: boolean }) {
  const { latest, previous } = group;
  const challenge = latest.expand?.challenge;
  const status = latest.status || "pending";
  const fixable = canFix && status === "refused" && !!challenge && challengeWindow(challenge, now).open;

  return (
    <li className="flex flex-col gap-2 p-3 text-sm">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 flex-col gap-1">
          <span className="flex min-w-0 flex-row items-center gap-2">
            {challenge ? (
              <Link to={`/wei/challenge/${challenge.id}`} className="truncate font-medium hover:underline">
                {challenge.title || "Défi"}
              </Link>
            ) : (
              <span className="truncate font-medium">Défi inconnu</span>
            )}
            <span className={cn("shrink-0 rounded-md border px-2 py-0.5 text-xs font-medium", VALIDATION_STATUS_CLASSES[status])}>
              {VALIDATION_STATUS_LABELS[status]}
            </span>

            {challenge?.scope === "team" && (
              <span className="shrink-0 rounded-md border border-border px-2 py-0.5 text-xs font-medium text-muted-foreground">
                {SCOPE_LABELS.team}
              </span>
            )}
          </span>

          <Attempt validation={latest} />
        </div>

        {fixable && challenge && (
          <ButtonLink to={`/wei/challenge/${challenge.id}/validate`} variant="secondary" size="small" className="shrink-0">
            Corriger
          </ButtonLink>
        )}
      </div>

      {previous.length > 0 && (
        <details className="flex flex-col gap-1">
          <summary className="w-fit cursor-pointer text-xs text-muted-foreground hover:underline">
            {previous.length > 1 ? `${previous.length} tentatives précédentes` : "1 tentative précédente"}
          </summary>

          <ul className="mt-2 flex flex-col gap-2 border-l-2 border-border pl-3">
            {previous.map((attempt) => (
              <li key={attempt.id} className="flex flex-col gap-1">
                <span className={cn(
                  "w-fit rounded-md border px-2 py-0.5 text-xs font-medium",
                  VALIDATION_STATUS_CLASSES[attempt.status || "pending"],
                )}>
                  {VALIDATION_STATUS_LABELS[attempt.status || "pending"]}
                </span>
                <Attempt validation={attempt} />
              </li>
            ))}
          </ul>
        </details>
      )}
    </li>
  );
}

function Attempt({ validation }: { validation: ValidationWithRelations }) {
  const status = validation.status || "pending";
  const date = parsePbDate(validation.submitted_at);
  const proofCount = Array.isArray(validation.proof_file) ? validation.proof_file.length : 0;

  return (
    <>
      <span className="text-xs text-muted-foreground">
        {date ? dateFormat.format(date) : "-"}
        {proofCount > 1 && ` · ${proofCount} preuves`}
        {status === "accepted" && ` · ${validation.points_awarded ?? 0} pts`}
      </span>

      {status === "refused" && validation.reason && (
        <p className="text-xs text-status-critical">{validation.reason}</p>
      )}
    </>
  );
}
