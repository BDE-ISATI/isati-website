import pb from "@/shared/lib/pocketbase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import type { ClientResponseError } from "pocketbase";
import type { ChallengesResponse, Update } from "@/shared/types/pocketbase-types";


export type ChallengeUpdateData = Omit<Update<"challenges">, "image"> & { image?: File | null }


type MutationProps = {
  id: string,
  data: ChallengeUpdateData,
}


export default function useUpdateChallenge() {

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<ChallengesResponse, ClientResponseError, MutationProps>({
    mutationFn: async ({ id, data }: MutationProps) => {
      return await pb.collection("challenges").update(id, data)
    },
    onSuccess: (record) => {
      queryClient.invalidateQueries({ queryKey: ["challenges"] })
      queryClient.invalidateQueries({ queryKey: ["challenge", record.id] })
      navigate("/wei/challenge")
    }
  })

}
