import { useMutation } from '@tanstack/react-query';

import pb from "@/shared/lib/pocketbase";

import type { LoginFields } from "@/features/auth/authTypes";
import { type ClientResponseError, type RecordAuthResponse } from 'pocketbase';


export default function useAuth() {

  return useMutation<RecordAuthResponse, ClientResponseError, LoginFields>({
    mutationFn: async ({email, password}: LoginFields) => {
      return await pb.collection("users").authWithPassword(email, password, {
        expand: 'roles.policies'
      })
    },

  })

}