import pb from "@/shared/lib/pocketbase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ClientResponseError } from "pocketbase";


export default function useDeleteLocation() {

  const queryClient = useQueryClient();

  return useMutation<boolean, ClientResponseError, string>({
    mutationFn: async (locationId: string) => {
      return await pb.collection("locations").delete(locationId)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["locations"] })
      queryClient.invalidateQueries({ queryKey: ["challenges"] })
      queryClient.invalidateQueries({ queryKey: ["weis"] })
    }
  })

}
