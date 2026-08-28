import { useEffect } from "react";
import { useParams } from "react-router";
import useChallenge from "@/features/wei/hooks/queries/useChallenge";
import ChallengeForm from "@/features/wei/components/ChallengeForm";
import { getFirstErrorMessage } from "@/shared/lib/pocketbase-errors";
import Error from "@/shared/components/ui/Error";
import NotFound from "@/pages/NotFound";

export default function ChallengeEdit() {

  const { challengeId } = useParams();
  const challenge = useChallenge(challengeId);

  useEffect(() => {
    document.title = "Modifier un défi | ISATI";
  }, []);

  if (challenge.error?.status === 404) return <NotFound />;

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-4 md:py-6">
      <h1 className="text-2xl font-semibold">Modifier le défi</h1>

      <Error message={getFirstErrorMessage(challenge.error)} />

      {challenge.data && <ChallengeForm challenge={challenge.data} />}
    </div>
  );
}
