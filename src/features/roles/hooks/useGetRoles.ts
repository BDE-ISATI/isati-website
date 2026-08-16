import pb from "@/shared/lib/pocketbase";
import type { RolesRecord } from "@/shared/types/pocketbase-types";
import { useQuery } from "@tanstack/react-query";



export default function useGetRoles(rolesId: string[] | undefined) {
  const rolesQuery = useQuery({
    queryKey: ['profileRoles', rolesId],
    queryFn: () => {
        const filter = rolesId?.map((id) => pb.filter('id = {:id}', { id })).join("||")
        return pb.collection("roles").getFullList<RolesRecord>({ filter: filter })
      },
    enabled: !!rolesId
    })
  return { isLoading: rolesQuery.isPending, roles: rolesQuery.data, error: rolesQuery.error }
}