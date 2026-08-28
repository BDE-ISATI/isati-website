import { Link } from "react-router";
import type { ChallengeWithRelations, ParticipationWithTeam, ValidationWithRelations } from "@/shared/types/sharedTypes";
import challengeWindow from "@/features/wei/libs/challenge";
import { parsePbDate } from "@/shared/lib/dates";
import ButtonLink from "@/shared/components/ui/ButtonLink";
import Plus from "@/assets/icons/plus.svg?react";
import Check from "@/assets/icons/check.svg?react";
import CircleAlert from "@/assets/icons/circle-alert.svg?react";
import useNow from "@/shared/hooks/useNow";
import cn from "@/shared/utils/cn";

interface ChallengeValidationCtaProps {
  challenge: ChallengeWithRelations
  validation?: ValidationWithRelations | null
  participation?: ParticipationWithTeam | null
  className?: string
}

const dateFormat = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" });

const CARD = "flex w-full flex-col items-center justify-center gap-2 rounded-md border-2 p-6 text-center shadow-sm";

export default function ChallengeValidationCta({ challenge, validation, participation, className }: ChallengeValidationCtaProps) {
  const now = useNow(30_000);
  const { notStarted, ended } = challengeWindow(challenge, now);

  if (validation && validation.select !== "refused") {
    const isAccepted = validation.select === "accepted";
    const date = parsePbDate(isAccepted ? validation.reviewed_at : validation.submitted_at);

    return (
      <section
        className={cn(
          CARD,
          isAccepted ? "border-status-success bg-card" : "border-border bg-card",
          className,
        )}
      >
        {isAccepted && <Check aria-hidden="true" className="h-8 w-8 text-status-success" />}
        <p className="font-medium">
          {isAccepted ? "Défi validé" : "Demande en attente de validation"}
        </p>
        {isAccepted && <p className="text-2xl font-bold">{validation.points_awarded} pts</p>}
        {date && (
          <p className="text-sm text-muted-foreground">
            {isAccepted ? "Validée le" : "Envoyée le"} {dateFormat.format(date)}
          </p>
        )}
      </section>
    );
  }

  const blocked =
    notStarted ? "Ce défi n'a pas encore commencé."
    : ended ? "Ce défi est terminé."
    : participation?.state !== "assigned" ? "Tu dois être inscrit au WEI pour envoyer une preuve."
    : !participation.team ? "Tu dois être affecté à une équipe pour envoyer une preuve."
    : null;

  if (validation?.select === "refused") {
    return (
      <section className={cn(CARD, "border-status-critical bg-card", className)}>
        <CircleAlert aria-hidden="true" className="h-8 w-8 text-status-critical" />
        <p className="font-medium">Preuve refusée</p>
        {validation.reason && <p className="text-sm text-muted-foreground">{validation.reason}</p>}
        {blocked ? (
          <p className="text-sm text-muted-foreground">{blocked}</p>
        ) : (
          <ButtonLink to={`/wei/challenge/${challenge.id}/validate`} variant="accent" className="mt-2">
            Renvoyer une preuve
          </ButtonLink>
        )}
      </section>
    );
  }

  if (blocked) {
    return (
      <section className={cn(CARD, "border-dashed border-border bg-card text-muted-foreground", className)}>
        <p className="text-sm">{blocked}</p>
      </section>
    );
  }

  return (
    <Link
      to={`/wei/challenge/${challenge.id}/validate`}
      className={cn(
        CARD,
        "border-dashed border-accent bg-card text-accent transition duration-200 hover:bg-accent/5 hover:shadow-lg motion-reduce:transition-none",
        className,
      )}
    >
      <Plus aria-hidden="true" className="h-10 w-10" />
      <span className="font-medium">Demander une validation</span>
    </Link>
  );
}
