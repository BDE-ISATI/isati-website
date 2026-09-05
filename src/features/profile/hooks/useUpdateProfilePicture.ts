import pb from "@/shared/lib/pocketbase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ClientResponseError, RecordModel } from "pocketbase";


type MutationProps = {
    userId: string,
    avatarFile: File,
}


export default function useUpdateProfilePicture() {
    
    const queryClient = useQueryClient();

    return useMutation<RecordModel,ClientResponseError,MutationProps>({
        mutationFn: async ({ userId, avatarFile}: MutationProps) => {
            return await pb.collection('users').update(userId, {
                avatar: avatarFile,
            })
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['profile'] })

    })

}