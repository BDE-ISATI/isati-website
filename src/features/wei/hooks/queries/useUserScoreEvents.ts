import pb from "@/shared/lib/pocketbase";
import { useQuery } from "@tanstack/react-query";
import type { UserScoreEvent } from "@/features/wei/weiTypes";


export default function useUserScoreEvents(weiId?: string, userId?: string) {

  return useQuery({
    queryKey: ["scoreEvents", "user", weiId, userId],
    queryFn: async () => {
      const filter = pb.filter("wei = {:weiId} && user = {:userId}", { weiId: weiId, userId: userId })
      return await pb.collection("wei_score_events").getFullList<UserScoreEvent>({
        filter: filter,
        fields: "id,challenge,scope,points_awarded,reviewed_at",
        sort: "-reviewed_at"
      })
    },
    enabled: !!weiId && !!userId
  })

}
