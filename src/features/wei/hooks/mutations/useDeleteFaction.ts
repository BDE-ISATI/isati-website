import pb from "@/shared/lib/pocketbase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import type { ClientResponseError } from "pocketbase";

type MutationProps = {
  id: string,
  weiId: string
}

export default function useDeleteFaction() {

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<boolean, ClientResponseError, MutationProps>({
    mutationFn: async ({ id }: MutationProps) => {
      return await pb.collection("factions").delete(id)
    },
    onSuccess: (_deleted, { id, weiId }) => {
      queryClient.invalidateQueries({ queryKey: ["factions", weiId] })
      queryClient.invalidateQueries({ queryKey: ["faction", id] })
      navigate(`/wei/panel/${weiId}`)
    }
  })

}
