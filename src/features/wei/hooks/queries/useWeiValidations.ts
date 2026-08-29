import pb from "@/shared/lib/pocketbase";
import { useQuery } from "@tanstack/react-query";
import type { ScoreValidation } from "@/features/wei/libs/scoreCurve";


export default function useWeiValidations(weiId?: string) {

  return useQuery({
    queryKey: ["validations", "wei", weiId],
    queryFn: async () => {
      const filter = pb.filter('status = "accepted" && reviewed_at != "" && challenge.wei = {:weiId}', { weiId: weiId })
      return await pb.collection("validations").getFullList<ScoreValidation>({
        filter: filter,
        fields: "team,points_awarded,reviewed_at",
        sort: "reviewed_at"
      })
    },
    enabled: !!weiId
  })

}
