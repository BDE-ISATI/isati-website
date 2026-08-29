import pb from "@/shared/lib/pocketbase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ClientResponseError } from "pocketbase";
import type { ParticipationsRoleOptions } from "@/shared/types/pocketbase-types";
import type { TeamMemberResponse } from "@/features/wei/weiTypes";

type MutationProps = {
  teamId: string,
  userId: string,
  role: ParticipationsRoleOptions
}

export default function useUpdateMemberRole() {

  const queryClient = useQueryClient();

  return useMutation<TeamMemberResponse, ClientResponseError, MutationProps>({
    mutationFn: async ({ teamId, userId, role }: MutationProps) => {
      return await pb.send<TeamMemberResponse>(`/api/isati/teams/${teamId}/members/${userId}`, {
        method: "PATCH",
        body: { role: role }
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
