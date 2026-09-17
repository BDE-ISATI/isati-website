import pb from "@/shared/lib/pocketbase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ClientResponseError } from "pocketbase";
import type { NavLinksResponse } from "@/shared/types/pocketbase-types";

type MutationProps = {
  label: string,
  url: string,
  enabled: boolean
}

export default function useCreateNavLink() {

  const queryClient = useQueryClient();

  return useMutation<NavLinksResponse, ClientResponseError, MutationProps>({
    mutationFn: async ({ label, url, enabled }: MutationProps) => {
      return await pb.collection("nav_links").create({ label: label, url: url, enabled: enabled })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["navLinks"] })
    }
  })

}
