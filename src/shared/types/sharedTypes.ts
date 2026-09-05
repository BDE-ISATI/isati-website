import type { ChallengeCategoriesResponse, ChallengesResponse, LocationsResponse, ParticipationScoresResponse, ParticipationsResponse, PoliciesResponse, RolesResponse, TeamScoresResponse, TeamsResponse, UsersResponse, ValidationsResponse, WeisResponse } from "./pocketbase-types";

export type UserWithRoles = UsersResponse<{
  roles: RolesResponse<{ policies: PoliciesResponse[] }>[]
}>;

export type MaskedLocation =
  Omit<LocationsResponse, "label">
  & Partial<Pick<LocationsResponse, "label">>;

export type WeiWithLocation = WeisResponse<{
  location?: MaskedLocation
}>;

export type ChallengeWithRelations = ChallengesResponse<{
  category?: ChallengeCategoriesResponse[]
  location?: MaskedLocation
}>;

export type ValidationWithRelations = ValidationsResponse<{
  user?: UsersResponse
  team?: TeamsResponse
  challenge?: ChallengesResponse
  validator?: UsersResponse
}>;

export type ParticipationWithUser = ParticipationsResponse<{
  user?: UsersResponse
}>;

export type ParticipationWithTeam = ParticipationsResponse<{
  team?: TeamsResponse
}>;

export type TeamScore = TeamScoresResponse;

export type TeamMember = ParticipationScoresResponse< {
  user?: UsersResponse
}>;
