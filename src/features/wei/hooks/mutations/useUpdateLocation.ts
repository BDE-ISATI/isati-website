import pb from "@/shared/lib/pocketbase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ClientResponseError } from "pocketbase";
import type { LocationsResponse } from "@/shared/types/pocketbase-types";


type MutationProps = {
  id: string,
  label: string,
  hidden: boolean,
}


export default function useUpdateLocation() {

  const queryClient = useQueryClient();

  return useMutation<LocationsResponse, ClientResponseError, MutationProps>({
    mutationFn: async ({ id, label, hidden }: MutationProps) => {
      return await pb.collection("locations").update(id, {
        label: label,
        hidden: hidden,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["locations"] })
      queryClient.invalidateQueries({ queryKey: ["challenges"] })
      queryClient.invalidateQueries({ queryKey: ["weis"] })
    }
  })

}
