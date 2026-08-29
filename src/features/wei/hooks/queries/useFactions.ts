import pb from "@/shared/lib/pocketbase";
import { useQuery } from "@tanstack/react-query";

export default function useFactions(weiId?: string) {

  return useQuery({
    queryKey: ["factions", weiId],
    queryFn: async () => {
      const filter = pb.filter('wei = {:weiId}', { weiId: weiId })
      return await pb.collection("factions").getFullList({ filter: filter, sort: "name" })
    },
    enabled: !!weiId
  })

}
