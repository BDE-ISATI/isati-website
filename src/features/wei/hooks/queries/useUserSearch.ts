import pb from "@/shared/lib/pocketbase";
import { useQuery } from "@tanstack/react-query";

export default function useUserSearch(query: string) {

  return useQuery({
    queryKey: ["users", "search", query],
    queryFn: async () => {
      const filter = pb.filter('account_type != "deleted" && (username ~ {:q} || email ~ {:q})', { q: query })
      const list = await pb.collection("users").getList(1, 10, { filter: filter, sort: "username" })
      return list.items
    },
    enabled: query.length >= 2
  })

}
