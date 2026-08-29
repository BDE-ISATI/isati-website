import { Navigate, Outlet, useParams } from "react-router";
import useChallenge from "@/features/wei/hooks/queries/useChallenge";
import useCurrentWei from "@/features/wei/hooks/queries/useCurrentWei";
import useMyParticipation from "@/features/wei/hooks/queries/useMyParticipation";
import challengeWindow from "@/features/wei/libs/challenge";

export default function RequireChallengeSubmittable() {

  const { challengeId } = useParams();
  const challenge = useChallenge(challengeId);
  const currentWei = useCurrentWei();
  const participation = useMyParticipation(currentWei.data?.id);

  if (challenge.isLoading || currentWei.isLoading || participation.isLoading) return null;

  const isOpen = challengeWindow(challenge.data, Date.now()).open;
  const isAssigned = participation.data?.state === "assigned" && !!participation.data.team;
  const isStudent = participation.data?.role === "student";
  const isCurrentWei = !!challenge.data?.wei && challenge.data.wei === currentWei.data?.id;

  return isOpen && isAssigned && isStudent && isCurrentWei
    ? <Outlet />
    : <Navigate to={`/wei/challenge/${challengeId}`} replace />;
}
