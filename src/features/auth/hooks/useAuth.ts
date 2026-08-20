import { useMutation } from '@tanstack/react-query';

import pb from "@/shared/lib/pocketbase";

import type { LoginFields } from "@/features/auth/authTypes";
import { type ClientResponseError, type RecordAuthResponse } from 'pocketbase';

export default function useAuth() {

  const logout = () => {
    pb.authStore.clear();
  }

  const loginMutation = useMutation<RecordAuthResponse, ClientResponseError, LoginFields>({
    mutationFn: async ({email, password}: LoginFields) => {
      return await pb.collection("users").authWithPassword(email, password)
    },

  })

  return { logout, login: loginMutation.mutate, isLoading: loginMutation.isPending, error: loginMutation.error}

}