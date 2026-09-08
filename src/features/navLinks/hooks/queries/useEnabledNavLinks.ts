import pb from "@/shared/lib/pocketbase";
import { useQuery } from "@tanstack/react-query";


export default function useEnabledNavLinks() {

  return useQuery({
    queryKey: ["navLinks", "enabled"],
    queryFn: async () => {
      return await pb.collection("nav_links").getFullList({
        filter: pb.filter("enabled = true"),
        sort: "label"
      })
    }
  })

}
