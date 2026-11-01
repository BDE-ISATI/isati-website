import pb from "@/shared/lib/pocketbase";
import { useQuery } from "@tanstack/react-query";

export default function useClubs() {
  return useQuery({
    queryKey: ["clubDetails"],
    queryFn: async () => await pb.collection("club_details").getFullList({ sort: "name" })
  })
}
