import pb from "@/shared/lib/pocketbase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ClientResponseError } from "pocketbase";
import type { LocationsResponse } from "@/shared/types/pocketbase-types";


type MutationProps = {
  label: string,
  hidden: boolean,
}


export default function useCreateLocation() {

  const queryClient = useQueryClient();

  return useMutation<LocationsResponse, ClientResponseError, MutationProps>({
    mutationFn: async ({ label, hidden }: MutationProps) => {
      return await pb.collection("locations").create({
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
