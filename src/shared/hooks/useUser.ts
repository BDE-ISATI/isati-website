import pb from "@/shared/lib/pocketbase";
import { useQuery } from "@tanstack/react-query";
import type { ClientResponseError } from "pocketbase";
import type { UserWithRoles } from "@/shared/types/sharedTypes";

type UseUserParams = {
  id?: string;
  username?: string;
}


export default function useUser({ id, username } : UseUserParams) {

  const identifier = id ?? username

  return useQuery<UserWithRoles, ClientResponseError>({
    queryKey: ['profile', identifier],
    queryFn: () => {
      const filter = id ? pb.filter("id = {:id}", {id: id}) : pb.filter("username = {:username}", {username: username})
      return pb.collection('users').getFirstListItem<UserWithRoles>(filter, {
        expand: "roles.policies"
      })
    },
    enabled: !!identifier,
    retry: false
  })

}
