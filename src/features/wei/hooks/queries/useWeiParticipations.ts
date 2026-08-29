import pb from "@/shared/lib/pocketbase";
import { useQuery } from "@tanstack/react-query";
import type { ParticipationWithUser } from "@/shared/types/sharedTypes";

export default function useWeiParticipations(weiId?: string) {

  return useQuery({
    queryKey: ["participations", "wei", weiId],
    queryFn: async () => {
      const filter = pb.filter('wei = {:weiId}', { weiId: weiId })
      return await pb.collection("participations").getFullList<ParticipationWithUser>({
        filter: filter,
        expand: "user",
        sort: "user.username"
      })
    },
    enabled: !!weiId
  })

}
