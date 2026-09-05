import pb from "@/shared/lib/pocketbase";
import { useQuery } from "@tanstack/react-query";
import type { TeamScore } from "@/shared/types/sharedTypes";


export default function useTeamScore(teamId?: string) {

  return useQuery({
    queryKey: ["teamScore", teamId],
    queryFn: async () => await pb.collection("team_scores").getOne<TeamScore>(teamId!),
    enabled: !!teamId,
    retry: (failureCount, error) => error.status !== 404 && failureCount < 3
  })

}
