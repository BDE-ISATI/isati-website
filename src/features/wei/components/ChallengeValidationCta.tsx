import { Link } from "react-router";
import type { ChallengeWithRelations, ParticipationWithTeam, ValidationWithRelations } from "@/shared/types/sharedTypes";
import proofFiles, { proofThumbUrl } from "@/features/wei/libs/proof";
import challengeWindow from "@/features/wei/libs/challenge";
import { parsePbDate } from "@/shared/lib/dates";
import ButtonLink from "@/shared/components/ui/ButtonLink";
import Plus from "@/assets/icons/plus.svg?react";
import Check from "@/assets/icons/check.svg?react";
import CircleAlert from "@/assets/icons/circle-alert.svg?react";
import Loader from "@/assets/icons/loader.svg?react";
import useNow from "@/shared/hooks/useNow";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import cn from "@/shared/utils/cn";

interface ChallengeValidationCtaProps {
  challenge: ChallengeWithRelations
  validation?: ValidationWithRelations | null
  teamValidation?: ValidationWithRelations | null
  participation?: ParticipationWithTeam | null
  className?: string
}

const dateFormat = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" });

const CARD = "flex w-full flex-col items-center justify-center gap-2 rounded-md border-2 p-6 text-center shadow-sm";

export default function ChallengeValidationCta({ challenge, validation, teamValidation, participation, className }: ChallengeValidationCtaProps) {
  const now = useNow(30_000);
  const userId = useAuthStore((s) => s.user?.id);
  const { notStarted, ended } = challengeWindow(challenge, now);

  const isTeamScope = challenge.scope === "team";
  const current = isTeamScope ? teamValidation : validation;
  const author = isTeamScope && current?.user && current.user !== userId
    ? current.expand?.user?.username || "Participant inconnu"
    : null;

  if (current?.status === "accepted") {
    const date = parsePbDate(current.reviewed_at);

    return (
      <section className={cn(CARD, "border-status-success bg-card", className)}>
        <Check aria-hidden="true" className="h-8 w-8 text-status-success" />
        <p className="font-medium">Défi validé</p>
        <p className="text-2xl font-bold">{current.points_awarded} pts</p>
        {author && (
          <p className="text-sm text-muted-foreground">Envoyée par {author}</p>
        )}
        {date && (
          <p className="text-sm text-muted-foreground">Validée le {dateFormat.format(date)}</p>
        )}
      </section>
    );
  }

  if (current && current.status !== "refused") {
    const date = parsePbDate(current.submitted_at);
    const proofs = proofFiles(current);
    const [ first ] = proofs;

    return (
      <section
        className={cn(
          "flex w-full flex-row items-center gap-4 rounded-md border-2 border-border bg-card p-4 text-card-foreground shadow-sm",
          className,
        )}
      >
        {first ? (
          <span className="relative h-20 w-20 shrink-0">
            {first.isVideo ? (
              <video src={first.url} muted playsInline preload="metadata" className="h-20 w-20 rounded-md border border-border object-cover" />
            ) : (
              <img
                src={proofThumbUrl(current, first, "200x200")}
                alt="Preuve envoyée"
                loading="lazy"
                className="h-20 w-20 rounded-md border border-border object-cover"
              />
            )}

            {proofs.length > 1 && (
              <span className="absolute -right-1 -bottom-1 rounded-md border border-border bg-card px-1 text-xs font-medium text-card-foreground">
                {proofs.length}
              </span>
            )}
          </span>
        ) : (
          <span aria-hidden="true" className="h-20 w-20 shrink-0 rounded-md border border-border bg-muted" />
        )}

        <div className="flex min-w-0 flex-1 flex-col text-left">
          <p className="font-medium">Demande en attente de validation</p>
          {author && (
            <p className="text-sm text-muted-foreground">Envoyée par {author}</p>
          )}
          {date && (
            <p className="text-sm text-muted-foreground">Envoyée le {dateFormat.format(date)}</p>
          )}
          {current.proof_text && (
            <p className="truncate text-sm text-muted-foreground">{current.proof_text}</p>
          )}
        </div>

        <Loader aria-hidden="true" className="h-6 w-6 shrink-0 animate-spin text-muted-foreground" />
      </section>
    );
  }

  const blocked =
    notStarted ? "Ce défi n'a pas encore commencé."
    : ended ? "Ce défi est terminé."
    : participation?.role === "team_leader" ? "Les chefs d'équipe ne marquent pas de points."
    : participation?.state !== "assigned" ? "Tu dois être inscrit au WEI pour envoyer une preuve."
    : !participation.team ? "Tu dois être affecté à une équipe pour envoyer une preuve."
    : null;

  if (current?.status === "refused") {
    return (
      <section className={cn(CARD, "border-status-critical bg-card", className)}>
        <CircleAlert aria-hidden="true" className="h-8 w-8 text-status-critical" />
        <p className="font-medium">Preuve refusée</p>
        {author && <p className="text-sm text-muted-foreground">Envoyée par {author}</p>}
        {current.reason && <p className="text-sm text-muted-foreground">{current.reason}</p>}
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
