import pb from "@/shared/lib/pocketbase";
import { useQuery } from "@tanstack/react-query";
import type { TeamScore } from "@/shared/types/sharedTypes";


export default function useTeamScores(weiId?: string) {

  return useQuery({
    queryKey: ["teamScores", weiId],
    queryFn: async () => {
      const filter = pb.filter("wei = {:weiId}", { weiId: weiId })
      return await pb.collection("team_scores").getFullList<TeamScore>({
        filter: filter,
        sort: "-score"
      })
    },
    enabled: !!weiId
  })

}
