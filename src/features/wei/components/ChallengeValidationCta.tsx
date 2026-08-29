import { Link } from "react-router";
import pb from "@/shared/lib/pocketbase";
import type { ChallengeWithRelations, ParticipationWithTeam, ValidationWithRelations } from "@/shared/types/sharedTypes";
import challengeWindow from "@/features/wei/libs/challenge";
import { parsePbDate } from "@/shared/lib/dates";
import ButtonLink from "@/shared/components/ui/ButtonLink";
import Plus from "@/assets/icons/plus.svg?react";
import Check from "@/assets/icons/check.svg?react";
import CircleAlert from "@/assets/icons/circle-alert.svg?react";
import Loader from "@/assets/icons/loader.svg?react";
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

  if (validation?.status === "accepted") {
    const date = parsePbDate(validation.reviewed_at);

    return (
      <section className={cn(CARD, "border-status-success bg-card", className)}>
        <Check aria-hidden="true" className="h-8 w-8 text-status-success" />
        <p className="font-medium">Défi validé</p>
        <p className="text-2xl font-bold">{validation.points_awarded} pts</p>
        {date && (
          <p className="text-sm text-muted-foreground">Validée le {dateFormat.format(date)}</p>
        )}
      </section>
    );
  }

  if (validation && validation.status !== "refused") {
    const date = parsePbDate(validation.submitted_at);
    const fileURL = validation.proof_file ? pb.files.getURL(validation, validation.proof_file) : undefined;
    const thumbURL = validation.proof_file ? pb.files.getURL(validation, validation.proof_file, { thumb: "200x200" }) : undefined;
    const isVideo = !!validation.proof_file && /\.(mp4|mov|webm|m4v)$/i.test(validation.proof_file);

    return (
      <section
        className={cn(
          "flex w-full flex-row items-center gap-4 rounded-md border-2 border-border bg-card p-4 text-card-foreground shadow-sm",
          className,
        )}
      >
        {fileURL ? (
          isVideo ? (
            <video src={fileURL} muted playsInline preload="metadata" className="h-20 w-20 shrink-0 rounded-md border border-border object-cover" />
          ) : (
            <img src={thumbURL} alt="Preuve envoyée" className="h-20 w-20 shrink-0 rounded-md border border-border object-cover" />
          )
        ) : (
          <span aria-hidden="true" className="h-20 w-20 shrink-0 rounded-md border border-border bg-muted" />
        )}

        <div className="flex min-w-0 flex-1 flex-col text-left">
          <p className="font-medium">Demande en attente de validation</p>
          {date && (
            <p className="text-sm text-muted-foreground">Envoyée le {dateFormat.format(date)}</p>
          )}
          {validation.proof_text && (
            <p className="truncate text-sm text-muted-foreground">{validation.proof_text}</p>
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

  if (validation?.status === "refused") {
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
