import pb from "@/shared/lib/pocketbase";
import { useQuery } from "@tanstack/react-query";
import type { Room } from "@/features/salles/sallesTypes";

export default function useRooms() {
  return useQuery({
    queryKey: ["rooms"],
    queryFn: async () => await pb.collection("rooms").getFullList<Room>({ sort: "name" })
  })
}
