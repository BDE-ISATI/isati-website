import pb from "@/shared/lib/pocketbase";
import { useQuery } from "@tanstack/react-query";
import { ClientResponseError } from "pocketbase";
import type { ParticipationWithUserAndTeam } from "@/shared/types/sharedTypes";


export default function useUserParticipation(weiId?: string, userId?: string) {

  return useQuery({
    queryKey: ["participation", "user", weiId, userId],
    queryFn: async () => {
      const filter = pb.filter("wei = {:weiId} && user = {:userId}", { weiId: weiId, userId: userId })
      try {
        return await pb.collection("participations").getFirstListItem<ParticipationWithUserAndTeam>(filter, { expand: "user,team" })
      } catch (err) {
        if (err instanceof ClientResponseError && err.status === 404) return null
        throw err
      }
    },
    enabled: !!weiId && !!userId,
    retry: false
  })

}
