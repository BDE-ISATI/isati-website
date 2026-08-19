import pb from "@/shared/lib/pocketbase";
import { useMutation } from "@tanstack/react-query";
import type { ClientResponseError, RecordAuthResponse, RecordModel } from "pocketbase";


type MutationProps = {
  userId: string;
  email: string;
  oldPassword: string;
  password: string;
  passwordConfirm: string;
}

export default function useUpdatePassword() {
  const updatePasswordMutation = useMutation<RecordAuthResponse<RecordModel>, ClientResponseError,MutationProps>({
    mutationFn: async ({ userId, email, oldPassword, password, passwordConfirm }: MutationProps) => {
      await pb.collection('users').update(userId, {
        oldPassword,
        password,
        passwordConfirm,
      });
      return await pb.collection('users').authWithPassword(email, password);
    },
  });

  return {
    update: updatePasswordMutation.mutate,
    reset: updatePasswordMutation.reset,
    isLoading: updatePasswordMutation.isPending,
    isSuccess: updatePasswordMutation.isSuccess,
    error: updatePasswordMutation.error,
  };
}