import pb from "@/shared/lib/pocketbase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import type { ClientResponseError } from "pocketbase";
import type { Create, WeisResponse } from "@/shared/types/pocketbase-types";



export default function useCreateWei() {

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<WeisResponse, ClientResponseError, Create<"weis">>({
    mutationFn: async (data: Create<"weis">) => {
      return await pb.collection("weis").create(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["weis"] })
      navigate("/wei/panel")
    }
  })

}
