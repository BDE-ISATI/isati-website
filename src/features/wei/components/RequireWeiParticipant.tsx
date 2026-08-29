import { Navigate, Outlet } from "react-router";
import useCurrentWei from "@/features/wei/hooks/queries/useCurrentWei";
import useMyParticipation from "@/features/wei/hooks/queries/useMyParticipation";
import weiPhase from "@/features/wei/libs/phase";

interface RequireWeiParticipantProps {
  redirectTo?: string,
}

export default function RequireWeiParticipant({ redirectTo = "/wei" }: RequireWeiParticipantProps) {

  const currentWei = useCurrentWei();
  const participation = useMyParticipation(currentWei.data?.id);

  if (currentWei.isLoading || participation.isLoading) return null;

  const phase = weiPhase(currentWei.data ?? null)?.phase;
  const started = phase === "parcours" || phase === "weekend" || phase === "ended";

  return started && participation.data ? <Outlet /> : <Navigate to={redirectTo} replace />;
}
