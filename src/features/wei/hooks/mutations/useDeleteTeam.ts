import pb from "@/shared/lib/pocketbase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import type { ClientResponseError } from "pocketbase";

type MutationProps = {
  id: string,
  weiId: string
}

export default function useDeleteTeam() {

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<boolean, ClientResponseError, MutationProps>({
    mutationFn: async ({ id }: MutationProps) => {
      return await pb.collection("teams").delete(id)
    },
    onSuccess: (_deleted, { id, weiId }) => {
      queryClient.invalidateQueries({ queryKey: ["teamScores", weiId] })
      queryClient.invalidateQueries({ queryKey: ["teamScore", id] })
      queryClient.invalidateQueries({ queryKey: ["factions", weiId] })
      navigate(`/wei/panel/${weiId}`)
    }
  })

}
