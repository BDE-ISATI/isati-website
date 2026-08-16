import type { UsersRecord } from "@/shared/types/pocketbase-types"
import { useOutletContext } from "react-router";

interface ActivityContext {
  isLoading: boolean,
  user: NoInfer<UsersRecord>,
  error: Error | null,
}

export default function Activities() {
  const { isLoading, user, error } = useOutletContext<ActivityContext>();
  return (
    <>
      <p>Activities</p>
    </>
  )
}