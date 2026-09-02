import type { ValidationsStatusOptions } from "@/shared/types/pocketbase-types";
import type { ValidationWithRelations } from "@/shared/types/sharedTypes";
import type { ReviewStatusFilter } from "@/features/wei/hooks/queries/useReviewValidations";

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

export type ReviewQueueFilters = {
  status: ReviewStatusFilter
  teamId: string
  order: "asc" | "desc"
};

const STATUS_VALUES: ReviewStatusFilter[] = ["pending", "accepted", "refused", "all"];

export function reviewFiltersFromParams(params: URLSearchParams): ReviewQueueFilters {
  const status = params.get("status");

  return {
    status: STATUS_VALUES.find((value) => value === status) ?? "pending",
    teamId: params.get("team") ?? "",
    order: params.get("order") === "asc" ? "asc" : "desc",
  };
}

export function reviewFiltersToParams(filters: ReviewQueueFilters): URLSearchParams {
  const params = new URLSearchParams();

  if (filters.status !== "pending") params.set("status", filters.status);
  if (filters.teamId) params.set("team", filters.teamId);
  if (filters.order !== "desc") params.set("order", filters.order);

  return params;
}

export type ValidationGroup = {
  challengeId: string
  latest: ValidationWithRelations
  previous: ValidationWithRelations[]
};

export function groupByChallenge(validations: ValidationWithRelations[]): ValidationGroup[] {
  const groups: ValidationGroup[] = [];
  const byChallenge = new Map<string, ValidationGroup>();

  for (const validation of validations) {
    const challengeId = validation.challenge || validation.id;
    const group = byChallenge.get(challengeId);

    if (group) {
      group.previous.push(validation);
      continue;
    }

    const created = { challengeId: challengeId, latest: validation, previous: [] };
    byChallenge.set(challengeId, created);
    groups.push(created);
  }

  return groups;
}
