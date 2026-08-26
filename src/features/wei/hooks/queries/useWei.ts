import pb from "@/shared/lib/pocketbase";
import { useQuery } from "@tanstack/react-query";
import type { WeiWithLocation } from "@/shared/types/sharedTypes";


export default function useWei(weiId?: string) {

  return  useQuery({
    queryKey: ["wei", weiId],
    queryFn: async () => {
      const filter = pb.filter("id = {:weiId}", {weiId: weiId})
      return await pb.collection('weis').getFullList<WeiWithLocation>({
        filter: filter,
        expand: "location"
      })
    },
    enabled: !!weiId
  })

}