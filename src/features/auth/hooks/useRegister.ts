import { useMutation } from '@tanstack/react-query';

import pb from "@/shared/lib/pocketbase";


import useVerification from '@/features/auth/hooks/useVerification';
import type { RegisterFields } from '@/features/auth/authTypes';
import type { ClientResponseError, RecordModel } from 'pocketbase';
import { useNavigate } from 'react-router'; 

export default function useRegister() {
  const navigate = useNavigate();
  const { sendVerification } = useVerification()

  const registerMutation = useMutation<RecordModel, ClientResponseError, RegisterFields>({
    mutationFn: async (data: RegisterFields) => {

      const registerData = {
        account_type: "eleve",
        ...data
      }
      return await pb.collection('users').create(registerData)

    },
    onSuccess: async (_record, variables) =>  {
      sendVerification(variables.email)
      navigate("/login", {state: variables.email})
    },
  })

  return { isLoading: registerMutation.isPending , register: registerMutation.mutate, error: registerMutation.error}

}