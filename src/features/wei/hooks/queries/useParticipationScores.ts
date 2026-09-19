import pb from "@/shared/lib/pocketbase";
import { useQuery } from "@tanstack/react-query";
import type { ParticipationScore } from "@/shared/types/sharedTypes";

export default function useParticipationScores(weiId?: string) {
  return useQuery({
    queryKey: ["participationScores", weiId],
    queryFn: async () => {
      const filter = pb.filter('wei = {:weiId} && state = "assigned"', { weiId: weiId })
      return await pb.collection("participation_scores").getFullList<ParticipationScore>({
        filter: filter,
        expand: "user",
        sort: "-score"
      })
    },
    enabled: !!weiId
  })
}
