import pb from "@/shared/lib/pocketbase";
import { useQuery } from "@tanstack/react-query";
import type { ValidationWithRelations } from "@/shared/types/sharedTypes";

export default function useUserValidations(weiId?: string, userId?: string) {
  return useQuery({
    queryKey: ["validations", "user", weiId, userId],
    queryFn: async () => {
      const filter = pb.filter("user = {:userId} && challenge.wei = {:weiId}", { userId: userId, weiId: weiId })
      return await pb.collection("validations").getFullList<ValidationWithRelations>({
        filter: filter,
        expand: "challenge",
        sort: "-submitted_at"
      })
    },
    enabled: !!weiId && !!userId
  })
}
