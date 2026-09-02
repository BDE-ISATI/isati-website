import type { WeisResponse } from "@/shared/types/pocketbase-types";
import type { UserWithRoles } from "@/shared/types/sharedTypes";
import { UsersLevelOptions, UsersSchoolYearOptions } from "@/shared/types/pocketbase-types";
import { parsePbDate } from "@/shared/lib/dates";

export function isWeiEligible(user: UserWithRoles | null): boolean {
  return user?.school_year === UsersSchoolYearOptions.E1 && user?.level === UsersLevelOptions.ingenieur;
}

export function registrationOpen(wei: WeisResponse | null, now: Date = new Date()): boolean {
  if (!wei) return false;

  const opens = parsePbDate(wei.registration_opens_at);
  if (!opens || opens.getTime() > now.getTime()) return false;

  const weekend = parsePbDate(wei.weekend_starts_at);
  return !weekend || weekend.getTime() > now.getTime();
}
