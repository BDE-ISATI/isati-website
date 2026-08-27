import pb from "@/shared/lib/pocketbase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import type { ClientResponseError } from "pocketbase";


export default function useDeleteChallenge() {

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<boolean, ClientResponseError, string>({
    mutationFn: async (challengeId: string) => {
      return await pb.collection("challenges").delete(challengeId)
    },
    onSuccess: (_deleted, challengeId) => {
      queryClient.invalidateQueries({ queryKey: ["challenges"] })
      queryClient.invalidateQueries({ queryKey: ["challenge", challengeId] })
      navigate("/wei/challenge")
    }
  })

}
