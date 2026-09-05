import pb from "@/shared/lib/pocketbase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import type { ClientResponseError } from "pocketbase";
import type { Create, TeamsResponse } from "@/shared/types/pocketbase-types";

export default function useCreateTeam() {

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<TeamsResponse, ClientResponseError, Create<"teams">>({
    mutationFn: async (data: Create<"teams">) => {
      return await pb.collection("teams").create(data)
    },
    onSuccess: (record) => {
      queryClient.invalidateQueries({ queryKey: ["teamScores", record.wei] })
      queryClient.invalidateQueries({ queryKey: ["factions", record.wei] })
      navigate(`/wei/panel/${record.wei}`)
    }
  })

}
