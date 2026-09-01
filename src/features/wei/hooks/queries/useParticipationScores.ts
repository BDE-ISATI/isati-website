import pb from "@/shared/lib/pocketbase";
import { useQuery } from "@tanstack/react-query";
import type { ParticipationScoresResponse } from "@/shared/types/pocketbase-types";

export default function useParticipationScores(weiId?: string) {
  return useQuery({
    queryKey: ["participationScores", weiId],
    queryFn: async () => {
      const filter = pb.filter('wei = {:weiId} && state = "assigned"', { weiId: weiId })
      return await pb.collection("participation_scores").getFullList<ParticipationScoresResponse>({
        filter: filter,
        sort: "-score"
      })
    },
    enabled: !!weiId
  })
}
