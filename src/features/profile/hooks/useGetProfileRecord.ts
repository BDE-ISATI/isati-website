import pb from "@/shared/lib/pocketbase";
import type { UsersRecord } from "@/shared/types/pocketbase-types";
import { useQuery } from "@tanstack/react-query";





export default function useGetProfileRecord(username: string | undefined) {

  const profileRecordQuery = useQuery({
    queryKey: ['profile', username],
    queryFn: () => pb.collection('users').getFirstListItem<UsersRecord>(`username = "${username}"`),
    enabled: !!username,
    retry: false
  })

  return {isLoading: profileRecordQuery.isPending, user: profileRecordQuery.data, error: profileRecordQuery.error}

}