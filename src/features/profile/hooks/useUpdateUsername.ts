import pb from "@/shared/lib/pocketbase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ClientResponseError, RecordModel } from "pocketbase";


type MutationProps = {
    userId: string,
    username: string,
}


export default function useUpdateUsername() {
    
    const queryClient = useQueryClient();

    const updateMutation = useMutation<RecordModel,ClientResponseError,MutationProps>({
        mutationFn: async ({ userId, username}: MutationProps) => {
            return await pb.collection('users').update(userId, {
                username: username,
            })
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['profile'] })

    })

    return { update: updateMutation.mutate , isLoading: updateMutation.isPending, error: updateMutation.error }

}