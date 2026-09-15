import pb from "@/shared/lib/pocketbase";
import type { ClubDetailsResponse } from "@/shared/types/pocketbase-types";
import { useQuery } from "@tanstack/react-query";


export default function useClubs() {
  return useQuery({
    queryKey: ['clubs_details'],
    queryFn: () => {
      return pb.collection("club_details").getFullList<ClubDetailsResponse>();
    }
  })
}