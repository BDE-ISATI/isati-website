import pb from "@/shared/lib/pocketbase";
import type { RoomsResponse } from "@/shared/types/pocketbase-types";
import { useQuery } from "@tanstack/react-query";

export interface Course {
  day: string;    
  startHour: string;
  endHour: string; 
}

export type Room = Omit<RoomsResponse, "edt"> & {
  edt: Course[];
};

export default function useSalles() {
  return useQuery({
    queryKey: ['rooms'],
    queryFn: () => {
      return pb.collection("rooms").getFullList<Room>();
    }
  })
}