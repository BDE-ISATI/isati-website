import type { ParticipationsRoleOptions, ParticipationsStateOptions } from "@/shared/types/pocketbase-types";

export type TeamMemberResponse = {
  id: string
  wei: string
  user: string
  team: string
  role: ParticipationsRoleOptions
  state: ParticipationsStateOptions
}
