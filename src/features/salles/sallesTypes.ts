import type { RoomsResponse } from "@/shared/types/pocketbase-types";

export type Course = {
  day: string
  startHour: string
  endHour: string
}

export type Room = RoomsResponse<Course[]>

export type RoomAvailability = {
  available: boolean
  nextChange: string
}
