import pb from "@/shared/lib/pocketbase";
import { useQuery } from "@tanstack/react-query";

export default function useFaction(factionId?: string) {

  return useQuery({
    queryKey: ["faction", factionId],
    queryFn: async () => {
      return await pb.collection("factions").getOne(factionId!)
    },
    enabled: !!factionId,
    retry: (failureCount, error) => error.status !== 404 && failureCount < 3
  })

}
