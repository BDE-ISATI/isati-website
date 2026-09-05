import pb from "@/shared/lib/pocketbase";
import { useMutation } from "@tanstack/react-query";
import { ClientResponseError } from "pocketbase";
import { useNavigate } from "react-router";

type MutationProps = {
  password: string,
  id: string
}

export default function useDeleteAccount() {

  const navigate = useNavigate()

  return useMutation<{success: boolean}, ClientResponseError ,MutationProps>({
    mutationFn: async ({id, password} : MutationProps) => {
      return await pb.send('/api/isati/delete-user', {
        method: 'POST',
        body: { password, id },
      })
    },
    onSuccess: () => {
      pb.authStore.clear()
      navigate('/', {replace:true})
    }
  })

}