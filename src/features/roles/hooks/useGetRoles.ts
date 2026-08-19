import pb from "@/shared/lib/pocketbase";
import type { PolicyResponse, RolesResponse } from "@/shared/types/pocketbase-types";
import { useQuery } from "@tanstack/react-query";


type RoleWithPolicies = RolesResponse<{ policies: PolicyResponse[] }>;

export default function useGetRoles(rolesId: string[] | undefined) {
  const rolesQuery = useQuery({
    queryKey: ['profileRoles', rolesId],
    queryFn: () => {
      const filter = rolesId?.map((id) => pb.filter('id = {:id}', { id })).join("||")
      return pb.collection("roles").getFullList<RoleWithPolicies>({
        filter: filter,
        expand: 'policies',
      })
    },
    enabled: !!rolesId && rolesId.length > 0
  })
  return { isLoading: rolesQuery.isPending, roles: rolesQuery.data, error: rolesQuery.error }
}