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

  const mutation = useMutation<{success: boolean}, ClientResponseError ,MutationProps>({
    mutationFn: async ({id, password} : MutationProps) => {
      const url = `${pb.baseURL}/api/isati/delete-user`
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': pb.authStore.token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({password, id})
      })
      const json = await response.json().catch(() => ({}));
      if (!response.ok) throw new ClientResponseError({ url, status: response.status, response: json });
      return response.json()
    },
    onSuccess: () => {
      pb.authStore.clear()
      navigate('/', {replace:true})
    }


  })

  return { delete: mutation.mutate, isLoading: mutation.isPending, error: mutation.error }


}