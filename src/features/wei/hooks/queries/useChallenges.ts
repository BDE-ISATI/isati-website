import pb from "@/shared/lib/pocketbase";
import { useQuery } from "@tanstack/react-query";
import type { ChallengeWithRelations } from "@/shared/types/sharedTypes";


export default function useChallenges() {

  return useQuery({
    queryKey: ["challenges"],
    queryFn: async () => {
      return await pb.collection("challenges").getFullList<ChallengeWithRelations>({
        expand: "category,location",
        sort: "start_date"
      })
    }


  })



}