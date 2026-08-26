import type { ChallengeCategoriesResponse, ChallengesResponse, LocationsResponse, PoliciesResponse, RolesResponse, UsersResponse, WeisResponse } from "./pocketbase-types";

export type UserWithRoles = UsersResponse<{
  roles: RolesResponse<{ policies: PoliciesResponse[] }>[]
}>;

export type MaskedLocation =
  Omit<LocationsResponse, "label" | "geo_point">
  & Partial<Pick<LocationsResponse, "label" | "geo_point">>;

export type WeiWithLocation = WeisResponse<{
  location?: MaskedLocation
}>;

export type ChallengeWithRelations = ChallengesResponse<{
  category?: ChallengeCategoriesResponse[]
  location?: MaskedLocation
}>;
