import pb from "@/shared/lib/pocketbase";
import { useQuery } from "@tanstack/react-query";
import type { ValidationsStatusOptions } from "@/shared/types/pocketbase-types";
import type { ValidationWithRelations } from "@/shared/types/sharedTypes";


export type ReviewStatusFilter = ValidationsStatusOptions | "all"

export type ReviewFilters = {
  status?: ReviewStatusFilter
  teamId?: string
  order?: "asc" | "desc"
}


export default function useReviewValidations(weiId?: string, filters: ReviewFilters = {}) {

  const { status = "pending", teamId, order = "desc" } = filters;

  return useQuery({
    queryKey: ["validations", "review", weiId, status, teamId ?? null, order],
    queryFn: async () => {
      const parts = [pb.filter("challenge.wei = {:weiId}", { weiId: weiId })];
      if (status !== "all") parts.push(pb.filter("status = {:status}", { status: status }));
      if (teamId) parts.push(pb.filter("team = {:teamId}", { teamId: teamId }));

      return await pb.collection("validations").getFullList<ValidationWithRelations>({
        filter: parts.join(" && "),
        sort: order === "asc" ? "submitted_at" : "-submitted_at",
        expand: "user,team,challenge"
      })
    },
    enabled: !!weiId
  })

}
