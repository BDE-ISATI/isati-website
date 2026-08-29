import pb from "@/shared/lib/pocketbase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import type { ClientResponseError } from "pocketbase";
import type { FactionsResponse, Update } from "@/shared/types/pocketbase-types";

export type FactionUpdateData = Omit<Update<"factions">, "logo"> & { logo?: File | null }

type MutationProps = {
  id: string,
  data: FactionUpdateData
}

export default function useUpdateFaction() {

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<FactionsResponse, ClientResponseError, MutationProps>({
    mutationFn: async ({ id, data }: MutationProps) => {
      return await pb.collection("factions").update(id, data)
    },
    onSuccess: (record) => {
      queryClient.invalidateQueries({ queryKey: ["factions", record.wei] })
      queryClient.invalidateQueries({ queryKey: ["faction", record.id] })
      navigate(`/wei/panel/${record.wei}`)
    }
  })

}
