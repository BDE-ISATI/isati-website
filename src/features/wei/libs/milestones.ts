import type { WeisResponse } from "@/shared/types/pocketbase-types";
import type { StepProgressStep } from "@/shared/components/ui/StepProgress";
import { parsePbDate } from "@/shared/lib/dates";

function startOfLocalDay(iso: string): number | null {
  const d = parsePbDate(iso);
  if (!d) return null;
  return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
}

const fmt = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "short",
  year: "numeric"
});

type WeiMilestonesOptions = {
  now?: Date
  includeCreation?: boolean
};

export default function weiMilestones(wei: WeisResponse | null, options: WeiMilestonesOptions = {}): { steps: StepProgressStep[] ; value: number } | null {
  if (!wei) return null

  const { now = new Date(), includeCreation = true } = options;

  const milestones = [
    { id: "creation", label: "Création", value: wei.created },
    { id: "reg_open", label: "Ouverture des inscriptions", value: wei.registration_opens_at },
    { id: "reg_close", label: "Fermeture des inscriptions", value: wei.registration_closes_at },
    { id: "reveal", label: "Début du parcours", value: wei.parcours_starts_at },
    { id: "weekend_start", label: "Début du week-end", value: wei.weekend_starts_at },
    { id: "weekend_end", label: "Fin du week-end", value: wei.weekend_ends_at },
  ].filter((milestone) => includeCreation || milestone.id !== "creation");

  const days = milestones.map((m) => (m.value ? startOfLocalDay(m.value) : null));
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

  let last = -1;
  for (let i = 0; i < days.length; i++) {
    const d = days[i];
    if (d != null && d <= today) last = i;
  }

  const value =
    last === -1 ? 0
    : days[last] === today ? last
    : last === milestones.length - 1 ? last
    : last + 0.5;

  const steps: StepProgressStep[] = milestones.map((m) => {
    const date = parsePbDate(m.value);
    return {
      id: m.id,
      label: m.label,
      sublabel: date ? fmt.format(date) : "à définir",
      tone: date ? "default" : "warning",
    };
  });

  return { steps, value };
}