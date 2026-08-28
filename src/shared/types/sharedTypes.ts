import type { ChallengeCategoriesResponse, ChallengesResponse, LocationsResponse, ParticipationsResponse, PoliciesResponse, RolesResponse, TeamsResponse, UsersResponse, ValidationsResponse, WeisResponse } from "./pocketbase-types";

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
}>;

export type ParticipationWithTeam = ParticipationsResponse<{
  team?: TeamsResponse
}>;
