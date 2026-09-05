import pb from "@/shared/lib/pocketbase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ClientResponseError, RecordModel } from "pocketbase";


type MutationProps = {
    userId: string,
    username: string,
}


export default function useUpdateUsername() {
    
    const queryClient = useQueryClient();

    return useMutation<RecordModel,ClientResponseError,MutationProps>({
        mutationFn: async ({ userId, username}: MutationProps) => {
            return await pb.collection('users').update(userId, {
                username: username,
            })
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['profile'] })

    })

}