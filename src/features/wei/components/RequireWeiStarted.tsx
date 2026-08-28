import { Navigate, Outlet } from "react-router";
import useCurrentWei from "@/features/wei/hooks/queries/useCurrentWei";
import weiPhase from "@/features/wei/libs/phase";

interface RequireWeiStartedProps {
  redirectTo?: string,
}

export default function RequireWeiStarted({ redirectTo = "/wei" }: RequireWeiStartedProps) {

  const currentWei = useCurrentWei();

  if (currentWei.isLoading) return null;

  const phase = weiPhase(currentWei.data ?? null)?.phase;
  const started = phase === "parcours" || phase === "weekend" || phase === "ended";

  return started ? <Outlet /> : <Navigate to={redirectTo} replace />;
}
