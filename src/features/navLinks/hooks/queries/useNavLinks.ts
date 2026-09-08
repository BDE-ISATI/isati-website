import pb from "@/shared/lib/pocketbase";
import { useQuery } from "@tanstack/react-query";


export default function useNavLinks() {

  return useQuery({
    queryKey: ["navLinks"],
    queryFn: async () => {
      return await pb.collection("nav_links").getFullList({
        sort: "label"
      })
    }
  })

}
