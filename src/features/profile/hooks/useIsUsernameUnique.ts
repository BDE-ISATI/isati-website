import pb from "@/shared/lib/pocketbase";
import { useQuery } from "@tanstack/react-query";
import type { ClientResponseError } from "pocketbase";





export default function useIsUsernameUnique(input: string | undefined) {

  const comboBoxQuery = useQuery<boolean, ClientResponseError>({
    queryKey: ['user-search', input],
    queryFn: async () => { 
      const requestResult = await pb.collection('users').getList(1, 1, { filter: `username = "${input}"`, fields: 'id',})
      if (!requestResult) throw Error("Error")
      return requestResult.totalItems === 0;
    },
    enabled: !!input && input.length >= 2,
  });


  return {isLoading: comboBoxQuery.isLoading, isUnique: comboBoxQuery.data, error: comboBoxQuery.error}

}