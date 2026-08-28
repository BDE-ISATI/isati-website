import pb from "@/shared/lib/pocketbase";
import { useQuery } from "@tanstack/react-query";
import type { ValidationWithRelations } from "@/shared/types/sharedTypes";


export default function useChallengeValidations(challengeId?: string) {

  return useQuery({
    queryKey: ["validations", "challenge", challengeId],
    queryFn: async () => {
      const filter = pb.filter('challenge = {:challengeId} && select = "accepted"', { challengeId: challengeId })
      const list = await pb.collection("validations").getList<ValidationWithRelations>(1, 12, {
        filter: filter,
        sort: "-reviewed_at",
        expand: "user,team"
      })
      return list.items
    },
    enabled: !!challengeId
  })

}
