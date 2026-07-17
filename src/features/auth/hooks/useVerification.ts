import { useMutation } from '@tanstack/react-query';

import pb from "@/shared/lib/pocketbase";
import { useEffect, useState } from 'react';

export default function useVerification() {
  const COOLDOWN = 120
  const lastSentVerification = window.localStorage.getItem("lastSentVerification")
  const [ coolDown, setCoolDown ] = useState(lastSentVerification ? COOLDOWN - Math.ceil((Date.now() - parseInt(lastSentVerification))/1000): 0);

  const verificationMutation = useMutation({
    mutationFn: (email: string ) => { 
      if (!email) throw new Error('Aucun utilisateur connecté')
      if (coolDown > 0 ) throw new Error ('Please wait before sending new email')
      return pb.collection('users').requestVerification(email);
    },
    onSuccess: () => {
      window.localStorage.setItem("lastSentVerification", Date.now().toString())
      setCoolDown(COOLDOWN);
    },

  })

  useEffect(() => {
    if (coolDown <= 0) return;
    const intervalID = setInterval(() => {
      setCoolDown((c) => c-1)
    },1000)
    return () => {
      clearInterval(intervalID)
    }
  }, [coolDown > 0])

  return { sendVerification: verificationMutation.mutate, isLoading: verificationMutation.isPending, coolDown, error:verificationMutation.error}

}