import pb from "@/shared/lib/pocketbase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ClientResponseError } from "pocketbase";


export default function useDeleteCategory() {

  const queryClient = useQueryClient();

  return useMutation<boolean, ClientResponseError, string>({
    mutationFn: async (categoryId: string) => {
      return await pb.collection("challenge_categories").delete(categoryId)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["challenge_categories"] })
      queryClient.invalidateQueries({ queryKey: ["challenges"] })
    }
  })

}
