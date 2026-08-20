import pb from "@/shared/lib/pocketbase";
import type { UsersResponse } from "@/shared/types/pocketbase-types";
import { useQuery } from "@tanstack/react-query";
import type { ClientResponseError } from "pocketbase";


export default function useGetProfileRecord(username: string | undefined) {

  const profileRecordQuery = useQuery<UsersResponse, ClientResponseError>({
    queryKey: ['profile', username],
    queryFn: () => pb.collection('users').getFirstListItem<UsersResponse>(`username = "${username}"`),
    enabled: !!username,
    retry: false
  })

  return { isLoading: profileRecordQuery.isLoading, user: profileRecordQuery.data, error: profileRecordQuery.error }

}








