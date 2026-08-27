import pb from "@/shared/lib/pocketbase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ClientResponseError } from "pocketbase";
import type { ChallengeCategoriesResponse } from "@/shared/types/pocketbase-types";


type MutationProps = {
  name: string,
  color: string,
}


export default function useCreateCategory() {

  const queryClient = useQueryClient();

  return useMutation<ChallengeCategoriesResponse, ClientResponseError, MutationProps>({
    mutationFn: async ({ name, color }: MutationProps) => {
      return await pb.collection("challenge_categories").create({
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
