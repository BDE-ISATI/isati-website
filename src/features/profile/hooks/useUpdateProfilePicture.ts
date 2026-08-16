import pb from "@/shared/lib/pocketbase";
import { useMutation, useQueryClient } from "@tanstack/react-query";


interface useUpdateProfilePictureProps {
    userId: string,
    avatarFile: File,
}


export default function useUpdateProfilePicture() {
    
    const queryClient = useQueryClient();

    const updateMutation = useMutation({
        mutationFn: async ({ userId, avatarFile}: useUpdateProfilePictureProps) => {
            return await pb.collection('users').update(userId, {
                avatar: avatarFile,
            })
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['profile'] })

    })

    return { update: updateMutation.mutate , isLoading: updateMutation.isPending, error: updateMutation.error }

}