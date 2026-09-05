import pb from "@/shared/lib/pocketbase";
import { useQuery } from "@tanstack/react-query";
import type { ValidationWithRelations } from "@/shared/types/sharedTypes";

export default function usePublicValidations(weiId?: string) {
  return useQuery({
    queryKey: ["validations", "public", weiId],
    queryFn: async () => {
      const filter = pb.filter('status = "accepted" && public = true && archived = false && challenge.wei = {:weiId}', { weiId: weiId })
      const list = await pb.collection("validations").getList<ValidationWithRelations>(1, 20, {
        filter: filter,
        sort: "-reviewed_at",
        expand: "user,challenge,team"
      })
      return list.items
    },
    enabled: !!weiId
  })
}
