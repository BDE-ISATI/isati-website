import pb from "@/shared/lib/pocketbase";
import { useQuery } from "@tanstack/react-query";
import type { WeiWithLocation } from "@/shared/types/sharedTypes";


export default function useWei(weiId?: string) {

  return useQuery({
    queryKey: ["wei", weiId],
    queryFn: async () => {
      return await pb.collection("weis").getOne<WeiWithLocation>(weiId!, {
        expand: "location"
      })
    },
    enabled: !!weiId,
    retry: (failureCount, error) => error.status !== 404 && failureCount < 3
  })

}
