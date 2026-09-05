import pb from "@/shared/lib/pocketbase";
import { useQuery } from "@tanstack/react-query";
import type { ChallengeWithRelations } from "@/shared/types/sharedTypes";


export default function useChallenges(weiId?: string) {

  return useQuery({
    queryKey: ["challenges", weiId],
    queryFn: async () => {
      const filter = pb.filter('wei = {:weiId}', { weiId: weiId })
      return await pb.collection("challenges").getFullList<ChallengeWithRelations>({
        filter: filter,
        expand: "category,location",
        sort: "start_date"
      })
    },
    enabled: !!weiId
  })

}
