import { useEffect } from "react";
import RoomList from "@/features/salles/components/RoomList";

export default function PageSalles() {

  useEffect(() => {
    document.title = "Salles | ISATI";
  }, []);

  return <RoomList />;
}
