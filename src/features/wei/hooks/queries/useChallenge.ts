import pb from "@/shared/lib/pocketbase";
import { useQuery } from "@tanstack/react-query";
import type { ChallengeWithRelations } from "@/shared/types/sharedTypes";


export default function useChallenge(challengeId?: string) {

  return useQuery({
    queryKey: ["challenge", challengeId],
    queryFn: async () => {
      return await pb.collection("challenges").getOne<ChallengeWithRelations>(challengeId!, {
        expand: "category,location"
      })
    },
    enabled: !!challengeId,
    retry: (failureCount, error) => error.status !== 404 && failureCount < 3
  })

}
