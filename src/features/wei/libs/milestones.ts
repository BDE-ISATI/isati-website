import type { WeisResponse } from "@/shared/types/pocketbase-types";
import type { StepProgressStep } from "@/shared/components/ui/StepProgress";

function startOfLocalDay(iso: string): number | null {
  const d = new Date(iso.replace(" ", "T"));
  if (Number.isNaN(d.getTime())) return null;
  return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
}

const fmt = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "short",
  year: "numeric"
});

export default function weiMilestones(wei: WeisResponse | null, now: Date = new Date()): { steps: StepProgressStep[] ; value: number } | null {
  if (!wei) return null

  const milestones = [
    { id: "creation", label: "Création", value: wei.created },
    { id: "reg_open", label: "Ouverture des inscriptions", value: wei.registration_opens_at },
    { id: "reg_close", label: "Fermeture des inscriptions", value: wei.registration_closes_at },
    { id: "reveal", label: "Reveal", value: wei.reveal_at },
    { id: "weekend_start", label: "Début du week-end", value: wei.weekend_starts_at },
    { id: "weekend_end", label: "Fin du week-end", value: wei.weekend_ends_at },
  ];

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

  const steps: StepProgressStep[] = milestones.map((m) => ({
    id: m.id,
    label: m.label,
    sublabel: m.value ? fmt.format(new Date(m.value.replace(" ", "T"))) : "à définir",
    tone: m.value ? "default" : "warning",
  }));

  return { steps, value };
}