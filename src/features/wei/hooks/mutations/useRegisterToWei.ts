import pb from "@/shared/lib/pocketbase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ClientResponseError } from "pocketbase";
import type { ParticipationsRoleOptions, ParticipationsStateOptions } from "@/shared/types/pocketbase-types";


export type RegisterToWeiResponse = {
  id: string
  wei: string
  user: string
  state: ParticipationsStateOptions
  role: ParticipationsRoleOptions
  registered_at: string
}

type MutationProps = {
  userId: string,
}

export default function useRegisterToWei() {

  const queryClient = useQueryClient();

  return useMutation<RegisterToWeiResponse, ClientResponseError, MutationProps>({
    mutationFn: async ({ userId }: MutationProps) => {
      return await pb.send<RegisterToWeiResponse>(`/api/isati/wei/${userId}/register`, { method: "POST" })
    },
    onSuccess: (record) => {
      queryClient.invalidateQueries({ queryKey: ["participation", "me", record.wei] })
    }
  })

}
