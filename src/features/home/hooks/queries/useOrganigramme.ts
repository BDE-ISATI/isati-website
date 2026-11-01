import pb from "@/shared/lib/pocketbase";
import { useQuery } from "@tanstack/react-query";

export default function useOrganigramme() {
  return useQuery({
    queryKey: ["organigrammeMembers"],
    queryFn: async () => await pb.collection("organigramme_member").getFullList({ sort: "name" })
  })
}
