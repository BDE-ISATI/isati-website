import type { WeisResponse } from "@/shared/types/pocketbase-types";
import { parsePbDate } from "@/shared/lib/dates";

export type WeiPhase =
  | "upcoming"
  | "registration"
  | "waiting"
  | "parcours"
  | "weekend"
  | "ended"
  | "archived";

export type WeiPhaseInfo = {
  phase: WeiPhase
  next: { label: string; date: Date } | null
  isActive: boolean
};

const ARCHIVE_DELAY = 7 * 24 * 60 * 60 * 1000;

export default function weiPhase(wei: WeisResponse | null, now: Date = new Date()): WeiPhaseInfo | null {
  if (!wei) return null;

  const weekendEnd = parsePbDate(wei.weekend_ends_at);

  const milestones: { phase: WeiPhase; label: string; date: Date | null }[] = [
    { phase: "registration", label: "Ouverture des inscriptions", date: parsePbDate(wei.registration_opens_at) },
    { phase: "waiting", label: "Fermeture des inscriptions", date: parsePbDate(wei.registration_closes_at) },
    { phase: "parcours", label: "Début du parcours", date: parsePbDate(wei.parcours_starts_at) },
    { phase: "weekend", label: "Début du week-end", date: parsePbDate(wei.weekend_starts_at) },
    { phase: "ended", label: "Fin du week-end", date: weekendEnd },
  ];

  const time = now.getTime();

  let phase: WeiPhase = "upcoming";
  for (const milestone of milestones) {
    if (milestone.date && milestone.date.getTime() <= time) phase = milestone.phase;
  }

  if (phase === "ended" && weekendEnd && time >= weekendEnd.getTime() + ARCHIVE_DELAY) {
    phase = "archived";
  }

  const upcoming = milestones.find((milestone) => milestone.date && milestone.date.getTime() > time);

  return {
    phase,
    next: upcoming?.date ? { label: upcoming.label, date: upcoming.date } : null,
    isActive: phase !== "upcoming" && phase !== "archived",
  };
}
