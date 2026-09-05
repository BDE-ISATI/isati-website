import pb from "@/shared/lib/pocketbase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import type { ClientResponseError } from "pocketbase";
import type { Update, WeisResponse } from "@/shared/types/pocketbase-types";


export type WeiUpdateData = Update<"weis">


type MutationProps = {
  id: string,
  data: WeiUpdateData,
}


export default function useUpdateWei() {

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<WeisResponse, ClientResponseError, MutationProps>({
    mutationFn: async ({ id, data }: MutationProps) => {
      return await pb.collection("weis").update(id, data)
    },
    onSuccess: (record) => {
      queryClient.invalidateQueries({ queryKey: ["weis"] })
      queryClient.invalidateQueries({ queryKey: ["wei", record.id] })
      navigate("/wei/panel")
    }
  })

}
