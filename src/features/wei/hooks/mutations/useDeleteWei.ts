import pb from "@/shared/lib/pocketbase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import type { ClientResponseError } from "pocketbase";


export default function useDeleteWei() {

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<boolean, ClientResponseError, string>({
    mutationFn: async (weiId: string) => {
      return await pb.collection("weis").delete(weiId)
    },
    onSuccess: (_deleted, weiId) => {
      queryClient.invalidateQueries({ queryKey: ["weis"] })
      queryClient.invalidateQueries({ queryKey: ["wei", weiId] })
      navigate("/wei/panel")
    }
  })

}
