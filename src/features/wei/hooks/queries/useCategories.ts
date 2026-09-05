import pb from "@/shared/lib/pocketbase";
import { useQuery } from "@tanstack/react-query";


export default function useCategories() {

  return useQuery({
    queryKey: ["challenge_categories"],
    queryFn: async () => {
      return await pb.collection("challenge_categories").getFullList({
        sort: "name"
      })
    }
  })

}
