import type { UsersRecord } from "@/shared/types/pocketbase-types"
import { useOutletContext } from "react-router";

interface ClubsContext {
  isLoading: boolean,
  user: NoInfer<UsersRecord>,
  error: Error | null,
  isForeign: boolean
}


export default function Clubs() {
  const { isLoading, user, error } = useOutletContext<ClubsContext>();
  return (
    <>
      <p>Clubs</p>
    </>
  )
}