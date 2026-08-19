import type { UsersRecord } from "@/shared/types/pocketbase-types"
import { useOutletContext } from "react-router";

interface ToolsProps {
  isLoading: boolean,
  user: NoInfer<UsersRecord>,
  error: Error | null,
  isForeign: boolean
}


export default function Tools() {
  const { isLoading, user, error } = useOutletContext<ToolsProps>();
  return (
    <>
      <p>Tools</p>
    </>
  )
}