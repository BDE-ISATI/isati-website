import type { PoliciesResponse, RolesResponse, UsersResponse } from "./pocketbase-types";

export type UserWithRoles = UsersResponse<{
  roles: RolesResponse<{ policies: PoliciesResponse[] }>[]
}>;