import pb from "@/shared/lib/pocketbase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ClientResponseError } from "pocketbase";
import type { TeamMemberResponse } from "@/features/wei/weiTypes";

type MutationProps = {
  teamId: string,
  userId: string
}

export default function useRemoveMember() {

  const queryClient = useQueryClient();

  return useMutation<TeamMemberResponse, ClientResponseError, MutationProps>({
    mutationFn: async ({ teamId, userId }: MutationProps) => {
      return await pb.send<TeamMemberResponse>(`/api/isati/teams/${teamId}/members/${userId}`, {
        method: "DELETE"
      })
    },
    onSuccess: (record, { teamId }) => {
      queryClient.invalidateQueries({ queryKey: ["participations", "wei", record.wei] })
      queryClient.invalidateQueries({ queryKey: ["teamMembers", teamId] })
      queryClient.invalidateQueries({ queryKey: ["teamScores", record.wei] })
      queryClient.invalidateQueries({ queryKey: ["teamScore", teamId] })
      queryClient.invalidateQueries({ queryKey: ["participation", "me", record.wei] })
    }
  })

}
