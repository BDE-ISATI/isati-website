import pb from "@/shared/lib/pocketbase";
import { useQuery } from "@tanstack/react-query";
import type { WeiWithLocation } from "@/shared/types/sharedTypes";


export default function useAllWei() {

  return  useQuery({
    queryKey: ["weis"],
    queryFn: async () => {
      return await pb.collection('weis').getFullList<WeiWithLocation>({
        expand: "location"
      })
    }
  })

}