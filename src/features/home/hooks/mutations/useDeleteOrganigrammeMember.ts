import pb from "@/shared/lib/pocketbase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ClientResponseError } from "pocketbase";

export default function useDeleteOrganigrammeMember() {

  const queryClient = useQueryClient();

  return useMutation<boolean, ClientResponseError, string>({
    mutationFn: async (id: string) => {
      return await pb.collection("organigramme_member").delete(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organigrammeMembers"] })
    }
  })

}
