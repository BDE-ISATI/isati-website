import pb from "@/shared/lib/pocketbase";
import { useQuery } from "@tanstack/react-query";
import { ClientResponseError } from "pocketbase";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import type { ParticipationWithTeam } from "@/shared/types/sharedTypes";


export default function useMyParticipation(weiId?: string) {

  const userId = useAuthStore((s) => s.user?.id)

  return useQuery({
    queryKey: ["participation", "me", weiId],
    queryFn: async () => {
      const filter = pb.filter("wei = {:weiId} && user = {:userId}", { weiId: weiId, userId: userId })
      try {
        return await pb.collection("participations").getFirstListItem<ParticipationWithTeam>(filter, { expand: "team" })
      } catch (err) {
        if (err instanceof ClientResponseError && err.status === 404) return null
        throw err
      }
    },
    enabled: !!weiId && !!userId,
    retry: false
  })

}
