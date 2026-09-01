import { Link, useOutletContext } from "react-router";
import type { ProfileOutletContext } from "@/features/profile/profileTypes";
import type { ValidationWithRelations } from "@/shared/types/sharedTypes";
import useCurrentWei from "@/features/wei/hooks/queries/useCurrentWei";
import useUserValidations from "@/features/wei/hooks/queries/useUserValidations";
import challengeWindow from "@/features/wei/libs/challenge";
import { VALIDATION_STATUS_CLASSES, VALIDATION_STATUS_LABELS } from "@/features/wei/libs/validation";
import { parsePbDate } from "@/shared/lib/dates";
import { getFirstErrorMessage } from "@/shared/lib/pocketbase-errors";
import useNow from "@/shared/hooks/useNow";
import ButtonLink from "@/shared/components/ui/ButtonLink";
import Error from "@/shared/components/ui/Error";
import LoadingOverlay from "@/shared/components/ui/LoadingOverlay";
import cn from "@/shared/utils/cn";

const dateFormat = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });

export default function Activities() {

  const { user, isForeign } = useOutletContext<ProfileOutletContext>();
  const currentWei = useCurrentWei();
  const validations = useUserValidations(currentWei.data?.id, user.id);
  const now = useNow(60_000);

  const isBusy = currentWei.isPending || (!!currentWei.data && validations.isPending);

  return (
    <section className="flex flex-col gap-4">
      <header className="flex flex-col gap-0.5">
        <h1 className="text-lg sm:text-xl font-semibold leading-tight">
          {isForeign ? `Activités de ${user.username}` : "Mes activités"}
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Les défis du WEI soumis et leur statut
        </p>
      </header>

      <Error message={getFirstErrorMessage(currentWei.error ?? validations.error)} />

      <div className="relative">
        <div inert={isBusy} className={cn(
          "flex flex-col gap-2 transition duration-200",
          isBusy && "blur-sm pointer-events-none select-none"
        )}>
          <h2 className="font-semibold">{`WEI ${currentWei.data?.year ?? ""}`.trim()}</h2>

          {!currentWei.isPending && !currentWei.data && (
            <p className="text-sm text-muted-foreground">Aucun WEI en cours.</p>
          )}

          {validations.data?.length === 0 && (
            <div className="flex flex-col items-start gap-2 text-sm">
              <p className="text-muted-foreground">Aucune validation pour l'instant.</p>
              {!isForeign && (
                <ButtonLink to="/wei/challenge" variant="secondary" size="small">Voir les défis</ButtonLink>
              )}
            </div>
          )}

          {!!validations.data?.length && (
            <ul className="flex flex-col divide-y divide-border rounded-md border border-border">
              {validations.data.map((validation) => (
                <ActivityRow key={validation.id} validation={validation} now={now} canFix={!isForeign} />
              ))}
            </ul>
          )}
        </div>

        {isBusy && <LoadingOverlay />}
      </div>
    </section>
  )
}

function ActivityRow({ validation, now, canFix }: { validation: ValidationWithRelations, now: number, canFix: boolean }) {
  const challenge = validation.expand?.challenge;
  const status = validation.status || "pending";
  const date = parsePbDate(validation.submitted_at);
  const fixable = canFix && status === "refused" && !!challenge && challengeWindow(challenge, now).open;

  return (
    <li className="flex flex-col gap-2 p-3 text-sm sm:flex-row sm:items-center sm:justify-between">
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
        </span>

        <span className="text-xs text-muted-foreground">
          {date ? dateFormat.format(date) : "-"}
          {status === "accepted" && ` · ${validation.points_awarded ?? 0} pts`}
        </span>

        {status === "refused" && validation.reason && (
          <p className="text-xs text-status-critical">{validation.reason}</p>
        )}
      </div>

      {fixable && challenge && (
        <ButtonLink to={`/wei/challenge/${challenge.id}/validate`} variant="secondary" size="small" className="shrink-0">
          Corriger
        </ButtonLink>
      )}
    </li>
  );
}
