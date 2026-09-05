import pb from "@/shared/lib/pocketbase";
import { useQuery } from "@tanstack/react-query";
import type { ValidationWithRelations } from "@/shared/types/sharedTypes";


export default function useValidation(validationId?: string) {

  return useQuery({
    queryKey: ["validation", validationId],
    queryFn: async () => {
      return await pb.collection("validations").getOne<ValidationWithRelations>(validationId!, {
        expand: "user,team,challenge,validator"
      })
    },
    enabled: !!validationId,
    retry: (failureCount, error) => error.status !== 404 && failureCount < 3
  })

}
