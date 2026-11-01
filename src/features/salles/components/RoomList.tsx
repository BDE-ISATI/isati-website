import useRooms from "@/features/salles/hooks/useRooms";
import type { Course, RoomAvailability } from "@/features/salles/sallesTypes";
import useNow from "@/shared/hooks/useNow";
import cn from "@/shared/utils/cn";

const MERGE_GAP_MINUTES = 15;
const END_OF_DAY = "fin de journée";

function toMinutes(hour: string): number {
  const [h = 0, m = 0] = hour.split(":").map(Number);
  return h * 60 + m;
}

function mergeCourses(courses: Course[]): Course[] {
  const merged: Course[] = [];
  for (const course of courses) {
    const last = merged.at(-1);
    if (last && toMinutes(last.endHour) + MERGE_GAP_MINUTES >= toMinutes(course.startHour)) {
      last.endHour = course.endHour > last.endHour ? course.endHour : last.endHour;
    } else {
      merged.push({ ...course });
    }
  }
  return merged;
}

function roomAvailability(edt: Course[] | null, now: Date): RoomAvailability {
  const today = now.toLocaleDateString("fr-CA", { timeZone: "Europe/Paris" });
  const currentHour = now.toLocaleTimeString("fr-FR", { timeZone: "Europe/Paris", hour: "2-digit", minute: "2-digit" });

  const remaining = mergeCourses((edt ?? []).filter((course) => course.day === today))
    .filter((course) => course.endHour > currentHour);

  const next = remaining[0];
  if (!next) return { available: true, nextChange: END_OF_DAY };
  if (next.startHour <= currentHour) return { available: false, nextChange: next.endHour };
  return { available: true, nextChange: next.startHour };
}

export default function RoomList() {

  const now = useNow(60_000);
  const { data: rooms = [], isPending, error } = useRooms();

  if (isPending) return null;
  if (error) {
    return <p className="p-6 text-center text-muted-foreground">Impossible de charger les salles pour le moment.</p>;
  }

  return (
    <div className="grid w-full grid-cols-1 gap-6 bg-accent/30 p-4 pt-14 pb-64 sm:grid-cols-2 lg:grid-cols-4">
      {rooms.map((room) => {
        const { available, nextChange } = roomAvailability(room.edt, new Date(now));
        return (
          <div
            key={room.id}
            className={cn("flex flex-col", available ? "bg-status-success/70" : "bg-status-critical/60")}
          >
            <div className="border-b border-white/5 bg-black/30 p-4 backdrop-blur-md">
              <h3 className="truncate text-center text-2xl font-extrabold uppercase tracking-wider text-white">
                {room.name}
              </h3>
            </div>

            <div className="flex grow flex-col items-center justify-center p-6 text-center">
              <span className="mb-1 text-xs font-medium uppercase tracking-wider text-white/60">
                {available ? "Disponible jusqu'à" : "Se libère à"}
              </span>
              <span className="font-mono text-3xl font-light text-white">{nextChange}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
