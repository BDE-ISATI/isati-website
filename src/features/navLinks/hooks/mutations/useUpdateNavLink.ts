import pb from "@/shared/lib/pocketbase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ClientResponseError } from "pocketbase";
import type { NavLinksResponse } from "@/shared/types/pocketbase-types";

type MutationProps = {
  id: string,
  label: string,
  url: string,
  enabled: boolean
}

export default function useUpdateNavLink() {

  const queryClient = useQueryClient();

  return useMutation<NavLinksResponse, ClientResponseError, MutationProps>({
    mutationFn: async ({ id, label, url, enabled }: MutationProps) => {
      return await pb.collection("nav_links").update(id, { label: label, url: url, enabled: enabled })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["navLinks"] })
    }
  })

}
