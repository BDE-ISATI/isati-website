import type { ChallengesPhaseOptions, ChallengesProofTypeOptions, ChallengesScopeOptions } from "@/shared/types/pocketbase-types";
import type { ChallengeWithRelations } from "@/shared/types/sharedTypes";
import { formatRemaining, parsePbDate } from "@/shared/lib/dates";

export const PHASE_LABELS: Record<ChallengesPhaseOptions, string> = {
  parcours: "Parcours",
  olympiades: "Olympiades",
};

export const SCOPE_LABELS: Record<ChallengesScopeOptions, string> = {
  individual: "Individuel",
  team: "Équipe",
};

export const PROOF_TYPE_LABELS: Record<ChallengesProofTypeOptions, string> = {
  image: "Image",
  video: "Vidéo",
  link: "Lien",
};

export type ChallengeWindow = {
  notStarted: boolean
  ended: boolean
  open: boolean
  countdown: string
};

export default function challengeWindow(challenge: ChallengeWithRelations | undefined, now: number): ChallengeWindow {
  const start = parsePbDate(challenge?.start_date)?.getTime() ?? null;
  const end = parsePbDate(challenge?.end_date)?.getTime() ?? null;

  const notStarted = start !== null && start > now;
  const ended = end !== null && end <= now;
  const target = notStarted ? start : end;

  const countdown =
    target === null ? "-"
    : target <= now ? "Terminé"
    : `${notStarted ? "Disponible dans" : "Se termine dans"} ${formatRemaining(target - now)}`;

  return { notStarted, ended, open: !!challenge && !notStarted && !ended, countdown };
}
