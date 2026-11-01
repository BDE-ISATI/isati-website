import { useQuery } from "@tanstack/react-query";
import pb from "@/shared/lib/pocketbase";

export default function useFileToken() {
  const query = useQuery({
    queryKey: ["fileToken"],
    queryFn: () => pb.files.getToken(),
    staleTime: 110 * 1000,
    refetchInterval: 110 * 1000,
    refetchOnWindowFocus: false,
  });

  return query.data;
}
