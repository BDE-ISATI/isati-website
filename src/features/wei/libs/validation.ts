import type { ValidationsStatusOptions } from "@/shared/types/pocketbase-types";

export const VALIDATION_STATUS_LABELS: Record<ValidationsStatusOptions, string> = {
  pending: "En attente",
  accepted: "Acceptée",
  refused: "Refusée",
};

export const VALIDATION_STATUS_CLASSES: Record<ValidationsStatusOptions, string> = {
  pending: "border-border text-muted-foreground",
  accepted: "border-status-success text-status-success",
  refused: "border-status-critical text-status-critical",
};
