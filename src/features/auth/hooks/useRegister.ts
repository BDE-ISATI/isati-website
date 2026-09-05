import { useMutation } from '@tanstack/react-query';

import pb from "@/shared/lib/pocketbase";


import useVerification from '@/features/auth/hooks/useVerification';
import type { RegisterFields, RegisterResponse } from '@/features/auth/authTypes';
import type { ClientResponseError } from 'pocketbase';
import { useNavigate } from 'react-router';

export default function useRegister() {
  const navigate = useNavigate();
  const verification = useVerification()

  return useMutation<RegisterResponse, ClientResponseError, RegisterFields>({
    mutationFn: async (data: RegisterFields) => {

      return await pb.send<RegisterResponse>('/api/isati/register', {
        method: 'POST',
        body: data,
      })

    },
    onSuccess: async (_record, variables) =>  {
      verification.mutate(variables.email)
      navigate("/login", {state: variables.email})
    },
  })

}