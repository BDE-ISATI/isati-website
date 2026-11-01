import pb from "@/shared/lib/pocketbase";
import { useQuery } from "@tanstack/react-query";
import type { ParticipationWithWei } from "@/shared/types/sharedTypes";


export default function useUserParticipations(userId?: string) {

  return useQuery({
    queryKey: ["participations", "user", userId],
    queryFn: async () => {
      const filter = pb.filter("user = {:userId}", { userId: userId })
      return await pb.collection("participations").getFullList<ParticipationWithWei>({
        filter: filter,
        expand: "wei",
        sort: "-created"
      })
    },
    enabled: !!userId
  })

}
