import pb from "@/shared/lib/pocketbase";
import { queryClient } from "@/shared/lib/queryClient.ts";


export function logout() {
  pb.authStore.clear();
  queryClient.clear();
}
