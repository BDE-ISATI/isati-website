import { useEffect } from "react";
import { useParams } from "react-router";

import useChallenge from "@/features/wei/hooks/queries/useChallenge";
import useCurrentWei from "@/features/wei/hooks/queries/useCurrentWei";
import useMyParticipation from "@/features/wei/hooks/queries/useMyParticipation";
import ValidationForm from "@/features/wei/components/ValidationForm";
import { getFirstErrorMessage } from "@/shared/lib/pocketbase-errors";
import Error from "@/shared/components/ui/Error";
import IsatiAnimation from "@/shared/components/animations/IsatiAnimation";
import NotFound from "@/pages/NotFound";

export default function ChallengeValidate() {

  const { challengeId } = useParams();
  const challenge = useChallenge(challengeId);
  const currentWei = useCurrentWei();
  const participation = useMyParticipation(currentWei.data?.id);

  useEffect(() => {
    document.title = "Demander une validation | ISATI";
  }, []);

  if (challenge.isLoading) return (
    <div className="flex flex-1 items-center justify-center">
      <IsatiAnimation />
    </div>
  );

  if (!challenge.data) {
    return challenge.error ? (
      <div className="mx-auto w-full max-w-3xl px-4 py-4 md:py-6">
        <Error message={getFirstErrorMessage(challenge.error)} />
      </div>
    ) : <NotFound />;
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-4 md:py-6">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold">Demander une validation</h1>
        <p className="text-sm text-muted-foreground">{challenge.data.title}</p>
      </header>

      <ValidationForm challenge={challenge.data} participation={participation.data} />
    </div>
  );
}
