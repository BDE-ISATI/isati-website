import pb from "@/shared/lib/pocketbase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ClientResponseError } from "pocketbase";
import type { OrganigrammeMemberResponse } from "@/shared/types/pocketbase-types";
import type { OrganigrammeMemberUpdateData } from "@/features/home/homeTypes";

type MutationProps = {
  id: string,
  data: OrganigrammeMemberUpdateData
}

export default function useUpdateOrganigrammeMember() {

  const queryClient = useQueryClient();

  return useMutation<OrganigrammeMemberResponse, ClientResponseError, MutationProps>({
    mutationFn: async ({ id, data }: MutationProps) => {
      return await pb.collection("organigramme_member").update(id, data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organigrammeMembers"] })
    }
  })

}
