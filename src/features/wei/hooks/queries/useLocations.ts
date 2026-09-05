import pb from "@/shared/lib/pocketbase";
import { useQuery } from "@tanstack/react-query";


export default function useLocations() {

  return useQuery({
    queryKey: ["locations"],
    queryFn: async () => {
      return await pb.collection("locations").getFullList({
        sort: "label"
      })
    }
  })

}
