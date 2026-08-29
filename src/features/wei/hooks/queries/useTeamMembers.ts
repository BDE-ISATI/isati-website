import pb from "@/shared/lib/pocketbase";
import { useQuery } from "@tanstack/react-query";
import type { TeamMember } from "@/shared/types/sharedTypes";


export default function useTeamMembers(teamId?: string) {

  return useQuery({
    queryKey: ["teamMembers", teamId],
    queryFn: async () => {
      const filter = pb.filter('team = {:teamId} && state = "assigned"', { teamId: teamId })
      return await pb.collection("participation_scores").getFullList<TeamMember>({
        filter: filter,
        expand: "user",
        sort: "-score"
      })
    },
    enabled: !!teamId
  })

}
