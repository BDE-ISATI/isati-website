import pb from "@/shared/lib/pocketbase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ClientResponseError } from "pocketbase";

export default function useDeleteNavLink() {

  const queryClient = useQueryClient();

  return useMutation<boolean, ClientResponseError, string>({
    mutationFn: async (navLinkId: string) => {
      return await pb.collection("nav_links").delete(navLinkId)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["navLinks"] })
    }
  })

}
