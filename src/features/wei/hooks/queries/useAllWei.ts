import pb from "@/shared/lib/pocketbase";
import { useQuery } from "@tanstack/react-query";


export default function useAllWei() {

  return  useQuery({
    queryKey: ["weis"],
    queryFn: async () => {
      return await pb.collection('weis').getFullList()
    }
  })

}