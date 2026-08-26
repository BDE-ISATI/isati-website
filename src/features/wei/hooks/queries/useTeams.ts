
import pb from "@/shared/lib/pocketbase";
import { useQuery } from "@tanstack/react-query";



export default function useTeams(weiId?: string) {

  return useQuery({
    queryKey: ["teams", weiId],
    queryFn: async () => {
      const filter = pb.filter('wei = {:weiId}', {weiId: weiId})
      return await pb.collection('teams').getFullList({
        filter: filter
      })
    },
    enabled: !!weiId,
  })

}

