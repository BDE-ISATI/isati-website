import pb from "@/shared/lib/pocketbase";
import { useQuery } from "@tanstack/react-query";
import { ClientResponseError } from "pocketbase";
import type { ValidationWithRelations } from "@/shared/types/sharedTypes";


export default function useTeamValidation(challengeId?: string, teamId?: string) {

  return useQuery({
    queryKey: ["validation", "team", challengeId, teamId],
    queryFn: async () => {
      const filter = pb.filter("challenge = {:challengeId} && team = {:teamId}", { challengeId: challengeId, teamId: teamId })
      try {
        return await pb.collection("validations").getFirstListItem<ValidationWithRelations>(filter, { sort: "-created", expand: "user" })
      } catch (err) {
        if (err instanceof ClientResponseError && err.status === 404) return null
        throw err
      }
    },
    enabled: !!challengeId && !!teamId,
    retry: false
  })

}
