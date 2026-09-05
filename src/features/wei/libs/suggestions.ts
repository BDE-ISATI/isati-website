import type { ChallengeWithRelations, ValidationWithRelations } from "@/shared/types/sharedTypes";
import challengeWindow from "@/features/wei/libs/challenge";
import { parsePbDate } from "@/shared/lib/dates";

export const URGENCY_WINDOW_MS = 48 * 60 * 60 * 1000;

export type ChallengeProgress = {
  done: Set<string>
  refused: Set<string>
  categoryCounts: Map<string, number>
};

export function challengeProgress(validations: ValidationWithRelations[]): ChallengeProgress {
  const done = new Set<string>();
  const refused = new Set<string>();
  const categoryCounts = new Map<string, number>();

  for (const validation of validations) {
    if (!validation.challenge) continue;
    if (validation.status === "refused") {
      refused.add(validation.challenge);
      continue;
    }
    done.add(validation.challenge);
    for (const category of validation.expand?.challenge?.category ?? []) {
      categoryCounts.set(category, (categoryCounts.get(category) ?? 0) + 1);
    }
  }

  for (const id of done) refused.delete(id);

  return { done, refused, categoryCounts };
}

function endsAt(challenge: ChallengeWithRelations): number | null {
  return parsePbDate(challenge.end_date)?.getTime() ?? null;
}

function openTodo(challenges: ChallengeWithRelations[], progress: ChallengeProgress, now: number) {
  return challenges.filter((challenge) => !progress.done.has(challenge.id) && challengeWindow(challenge, now).open);
}

function expiresSoon(challenge: ChallengeWithRelations, now: number) {
  const end = endsAt(challenge);
  return end !== null && end - now <= URGENCY_WINDOW_MS;
}

export function expiringChallenges(challenges: ChallengeWithRelations[], progress: ChallengeProgress, now: number) {
  return openTodo(challenges, progress, now)
    .filter((challenge) => expiresSoon(challenge, now))
    .sort((a, b) => (endsAt(a) ?? 0) - (endsAt(b) ?? 0));
}

export function suggestChallenges(challenges: ChallengeWithRelations[], progress: ChallengeProgress, now: number, limit = 4) {
  const exploration = (challenge: ChallengeWithRelations) =>
    Math.min(...(challenge.category.length ? challenge.category : [""]).map((id) => progress.categoryCounts.get(id) ?? 0));

  return openTodo(challenges, progress, now)
    .sort((a, b) => {
      const urgentA = expiresSoon(a, now);
      const urgentB = expiresSoon(b, now);
      if (urgentA !== urgentB) return urgentA ? -1 : 1;
      if (urgentA && urgentB) return (endsAt(a) ?? 0) - (endsAt(b) ?? 0);
      const explorationDiff = exploration(a) - exploration(b);
      if (explorationDiff !== 0) return explorationDiff;
      return (b.points ?? 0) - (a.points ?? 0);
    })
    .slice(0, limit);
}
