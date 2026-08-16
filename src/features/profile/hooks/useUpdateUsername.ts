import pb from "@/shared/lib/pocketbase";
import { useMutation, useQueryClient } from "@tanstack/react-query";


interface useUpdateUsernameProps {
    userId: string,
    username: string,
}


export default function useUpdateUsername() {
    
    const queryClient = useQueryClient();

    const updateMutation = useMutation({
        mutationFn: async ({ userId, username}: useUpdateUsernameProps) => {
            const lastUsernameUpdate = await pb.collection('users').getOne(userId, { fields: 'username_changed_at'})
            if (lastUsernameUpdate.username_changed_at)
            return await pb.collection('users').update(userId, {
                username: username,
            })
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['profile'] })

    })

    return { update: updateMutation.mutate , isLoading: updateMutation.isPending, error: updateMutation.error }

}