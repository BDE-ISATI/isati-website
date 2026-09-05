import pb from "@/shared/lib/pocketbase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import type { ClientResponseError } from "pocketbase";
import type { ChallengesResponse, Create } from "@/shared/types/pocketbase-types";


export type ChallengeCreateData = Omit<Create<"challenges">, "image"> & { image?: File | null }


export default function useCreateChallenge() {

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<ChallengesResponse, ClientResponseError, ChallengeCreateData>({
    mutationFn: async (data: ChallengeCreateData) => {
      return await pb.collection("challenges").create(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["challenges"] })
      navigate("/wei/challenge")
    }
  })

}
