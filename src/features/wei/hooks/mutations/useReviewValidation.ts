import pb from "@/shared/lib/pocketbase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router";
import type { ClientResponseError } from "pocketbase";
import type { ValidationsResponse, ValidationsStatusOptions } from "@/shared/types/pocketbase-types";


export type ValidationReviewData = {
  status: ValidationsStatusOptions
  reason: string
  points_awarded: number
}

type MutationProps = {
  id: string
  data: ValidationReviewData
}


export default function useReviewValidation() {

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();

  return useMutation<ValidationsResponse, ClientResponseError, MutationProps>({
    mutationFn: async ({ id, data }: MutationProps) => {
      return await pb.collection("validations").update(id, data)
    },
    onSuccess: (record) => {
      queryClient.invalidateQueries({ queryKey: ["validation", record.id] })
      queryClient.invalidateQueries({ queryKey: ["validations", "review"] })
      queryClient.invalidateQueries({ queryKey: ["validations", "wei"] })
      queryClient.invalidateQueries({ queryKey: ["validations", "challenge", record.challenge] })
      queryClient.invalidateQueries({ queryKey: ["validation", "me", record.challenge] })
      queryClient.invalidateQueries({ queryKey: ["validations", "user"] })
      queryClient.invalidateQueries({ queryKey: ["teamScores"] })
      queryClient.invalidateQueries({ queryKey: ["teamMembers"] })
      navigate(`/wei/validation${location.search}`)
    }
  })

}
