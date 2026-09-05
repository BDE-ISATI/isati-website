import pb from "@/shared/lib/pocketbase";
import { useQuery } from "@tanstack/react-query";
import { ClientResponseError } from "pocketbase";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import type { ValidationWithRelations } from "@/shared/types/sharedTypes";


export default function useMyValidation(challengeId?: string) {

  const userId = useAuthStore((s) => s.user?.id)

  return useQuery({
    queryKey: ["validation", "me", challengeId],
    queryFn: async () => {
      const filter = pb.filter("challenge = {:challengeId} && user = {:userId}", { challengeId: challengeId, userId: userId })
      try {
        return await pb.collection("validations").getFirstListItem<ValidationWithRelations>(filter, { sort: "-created" })
      } catch (err) {
        if (err instanceof ClientResponseError && err.status === 404) return null
        throw err
      }
    },
    enabled: !!challengeId && !!userId,
    retry: false
  })

}
