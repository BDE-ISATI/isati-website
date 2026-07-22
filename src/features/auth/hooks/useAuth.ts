import { useMutation } from '@tanstack/react-query';

import pb from "@/shared/lib/pocketbase";

import type { LoginFields } from "@/features/auth/authTypes";

export default function useAuth() {

  const logout = () => {
    pb.authStore.clear();
  }

  const loginMutation = useMutation({
    mutationFn: async ({email, password}: LoginFields) => {
      const minDuration = new Promise((resolve) => setTimeout(resolve, 1000));
      try {
        return await pb.collection("users").authWithPassword(email, password)
      } finally {
        await minDuration;
      }
    },
    
  })

  
  return { logout, login: loginMutation.mutate, isLoading: loginMutation.isPending, error: loginMutation.error}

}