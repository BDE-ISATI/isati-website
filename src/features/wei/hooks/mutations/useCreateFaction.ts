import pb from "@/shared/lib/pocketbase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import type { ClientResponseError } from "pocketbase";
import type { Create, FactionsResponse } from "@/shared/types/pocketbase-types";

export type FactionCreateData = Omit<Create<"factions">, "logo"> & { logo?: File | null }

export default function useCreateFaction() {

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<FactionsResponse, ClientResponseError, FactionCreateData>({
    mutationFn: async (data: FactionCreateData) => {
      return await pb.collection("factions").create(data)
    },
    onSuccess: (record) => {
      queryClient.invalidateQueries({ queryKey: ["factions", record.wei] })
      navigate(`/wei/panel/${record.wei}`)
    }
  })

}
