import pb from "@/shared/lib/pocketbase";
import { useQuery } from "@tanstack/react-query";

export default function useParticipationCount(weiId?: string) {

  return useQuery({
    queryKey: ["participations", "count", weiId],
    queryFn: async () => {
      const filter = pb.filter('wei = {:weiId}', { weiId: weiId })
      const list = await pb.collection("participations").getList(1, 1, { filter: filter, fields: "id" })
      return list.totalItems
    },
    enabled: !!weiId
  })

}
