import pb from "@/shared/lib/pocketbase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import type { ClientResponseError } from "pocketbase";
import type { TeamsResponse, Update } from "@/shared/types/pocketbase-types";

type MutationProps = {
  id: string,
  data: Update<"teams">
}

export default function useUpdateTeam() {

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<TeamsResponse, ClientResponseError, MutationProps>({
    mutationFn: async ({ id, data }: MutationProps) => {
      return await pb.collection("teams").update(id, data)
    },
    onSuccess: (record) => {
      queryClient.invalidateQueries({ queryKey: ["teamScores", record.wei] })
      queryClient.invalidateQueries({ queryKey: ["teamScore", record.id] })
      queryClient.invalidateQueries({ queryKey: ["factions", record.wei] })
      navigate(`/wei/panel/${record.wei}`)
    }
  })

}
