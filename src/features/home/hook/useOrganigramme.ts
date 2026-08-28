import pb from "@/shared/lib/pocketbase";
import type { OrganigrammeMemberResponse } from "@/shared/types/pocketbase-types";
import { useQuery } from "@tanstack/react-query";


export default function useOrganigramme() {
  return useQuery({
    queryKey: ['organigramme_member'],
    queryFn: () => {
      return pb.collection("organigramme_member").getFullList<OrganigrammeMemberResponse>()
    }
  })
}