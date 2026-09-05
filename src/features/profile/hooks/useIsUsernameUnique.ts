import pb from "@/shared/lib/pocketbase";
import { useQuery } from "@tanstack/react-query";
import type { ClientResponseError } from "pocketbase";





export default function useIsUsernameUnique(input: string | undefined) {

  return useQuery<boolean, ClientResponseError>({
    queryKey: ['user-search', input],
    queryFn: async () => { 
      const filter = pb.filter('username = {:username}', { username: input })
      const requestResult = await pb.collection('users').getList(1, 1, { filter: filter, fields: 'id',})
      if (!requestResult) throw Error("Error")
      return requestResult.totalItems === 0;
    },
    enabled: !!input && input.length >= 2,
  });

}