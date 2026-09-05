import pb from "@/shared/lib/pocketbase";
import { useQuery } from "@tanstack/react-query";
import type { WeiWithLocation } from "@/shared/types/sharedTypes";


export default function useCurrentWei() {

  return useQuery({
    queryKey: ["wei", "current"],
    queryFn: async () => {
      const list = await pb.collection("weis").getList<WeiWithLocation>(1, 1, {
        expand: "location",
        sort: "-registration_opens_at",
        filter: 'registration_opens_at != "" && registration_opens_at <= @now'
      })
      return list.items[0] ?? null
    }
  })

}
