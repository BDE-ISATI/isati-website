import type { WeisResponse } from "@/shared/types/pocketbase-types";
import { parsePbDate } from "@/shared/lib/dates";

export default function weiDateIssues(wei: WeisResponse | null): string[] {

  if (!wei) return [];

  const milestones = [
    { label: "Ouverture des inscriptions", date: parsePbDate(wei.registration_opens_at) },
    { label: "Fermeture des inscriptions", date: parsePbDate(wei.registration_closes_at) },
    { label: "Début du parcours", date: parsePbDate(wei.parcours_starts_at) },
    { label: "Début du week-end", date: parsePbDate(wei.weekend_starts_at) },
    { label: "Fin du week-end", date: parsePbDate(wei.weekend_ends_at) },
  ];

  const issues: string[] = [];

  const missing = milestones.filter((milestone) => !milestone.date);
  if (missing.length) {
    issues.push(`${missing.length} date(s) manquante(s) : ${missing.map((m) => m.label.toLowerCase()).join(", ")}.`);
  }

  for (let i = 1; i < milestones.length; i++) {
    const previous = milestones[i - 1];
    const current = milestones[i];
    if (!previous?.date || !current?.date) continue;
    if (current.date.getTime() < previous.date.getTime()) {
      issues.push(`« ${current.label} » est avant « ${previous.label} ».`);
    }
  }

  return issues;

}
