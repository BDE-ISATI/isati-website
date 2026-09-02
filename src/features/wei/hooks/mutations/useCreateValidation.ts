import pb from "@/shared/lib/pocketbase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import type { ClientResponseError } from "pocketbase";
import type { Create, ValidationsResponse } from "@/shared/types/pocketbase-types";


export type ValidationCreateData = Omit<Create<"validations">, "proof_file"> & { proof_file?: File[] }


export default function useCreateValidation() {

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<ValidationsResponse, ClientResponseError, ValidationCreateData>({
    mutationFn: async (data: ValidationCreateData) => {
      return await pb.collection("validations").create(data)
    },
    onSuccess: (record) => {
      queryClient.invalidateQueries({ queryKey: ["validation", "me", record.challenge] })
      queryClient.invalidateQueries({ queryKey: ["validations", "challenge", record.challenge] })
      queryClient.invalidateQueries({ queryKey: ["validations", "user"] })
      navigate(`/wei/challenge/${record.challenge}`)
    }
  })

}
