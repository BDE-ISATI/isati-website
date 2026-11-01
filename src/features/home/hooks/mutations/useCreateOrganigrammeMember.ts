import pb from "@/shared/lib/pocketbase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ClientResponseError } from "pocketbase";
import type { OrganigrammeMemberResponse } from "@/shared/types/pocketbase-types";
import type { OrganigrammeMemberCreateData } from "@/features/home/homeTypes";

export default function useCreateOrganigrammeMember() {

  const queryClient = useQueryClient();

  return useMutation<OrganigrammeMemberResponse, ClientResponseError, OrganigrammeMemberCreateData>({
    mutationFn: async (data: OrganigrammeMemberCreateData) => {
      return await pb.collection("organigramme_member").create(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organigrammeMembers"] })
    }
  })

}
