import type { ChallengesScopeOptions, ParticipationsRoleOptions, ParticipationsStateOptions } from "@/shared/types/pocketbase-types";

export type TeamMemberResponse = {
  id: string
  wei: string
  user: string
  team: string
  role: ParticipationsRoleOptions
  state: ParticipationsStateOptions
}

export type FactionScore = {
  id: string
  name: string
  color: string
  score: number
  teamsCount: number
}

export type UserScoreEvent = {
  id: string
  challenge: string
  scope: ChallengesScopeOptions
  points_awarded: number
  reviewed_at: string
}
