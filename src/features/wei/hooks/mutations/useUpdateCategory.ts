import pb from "@/shared/lib/pocketbase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ClientResponseError } from "pocketbase";
import type { ChallengeCategoriesResponse } from "@/shared/types/pocketbase-types";


type MutationProps = {
  id: string,
  name: string,
  color: string,
}


export default function useUpdateCategory() {

  const queryClient = useQueryClient();

  return useMutation<ChallengeCategoriesResponse, ClientResponseError, MutationProps>({
    mutationFn: async ({ id, name, color }: MutationProps) => {
      return await pb.collection("challenge_categories").update(id, {
        name: name,
        color: color,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["challenge_categories"] })
      queryClient.invalidateQueries({ queryKey: ["challenges"] })
    }
  })

}
