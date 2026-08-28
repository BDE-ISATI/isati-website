import { useEffect } from "react";
import { useParams } from "react-router";

import useChallenge from "@/features/wei/hooks/queries/useChallenge";
import useCurrentWei from "@/features/wei/hooks/queries/useCurrentWei";
import useMyParticipation from "@/features/wei/hooks/queries/useMyParticipation";
import useMyValidation from "@/features/wei/hooks/queries/useMyValidation";
import useHasPermission from "@/features/roles/hooks/useHasPermission";
import ChallengeBanner from "@/features/wei/components/ChallengeBanner";
import ChallengeValidations from "@/features/wei/components/ChallengeValidations";
import ChallengeValidationCta from "@/features/wei/components/ChallengeValidationCta";
import { PHASE_LABELS } from "@/features/wei/libs/challenge";
import { getFirstErrorMessage } from "@/shared/lib/pocketbase-errors";
import ButtonLink from "@/shared/components/ui/ButtonLink";
import Error from "@/shared/components/ui/Error";
import IsatiAnimation from "@/shared/components/animations/IsatiAnimation";
import NotFound from "@/pages/NotFound";
import PenIcon from "@/assets/icons/pen.svg?react";

export default function ChallengeDetail() {

  const { challengeId } = useParams();
  const challenge = useChallenge(challengeId);
  const currentWei = useCurrentWei();
  const participation = useMyParticipation(currentWei.data?.id);
  const validation = useMyValidation(challengeId);
  const canUpdate = useHasPermission("update", "challenges");

  useEffect(() => {
    document.title = `${challenge.data?.title || "Défi"} | ISATI`;
  }, [challenge.data]);

  if (challenge.isLoading) return (
    <div className="flex flex-1 items-center justify-center">
      <IsatiAnimation />
    </div>
  );

  if (!challenge.data) {
    return challenge.error && challenge.error.status !== 404 ? (
      <div className="mx-auto w-full max-w-3xl px-4 py-4 md:py-6">
        <Error message={getFirstErrorMessage(challenge.error)} />
      </div>
    ) : <NotFound />;
  }

  const locationText = !challenge.data.location
    ? "À définir"
    : challenge.data.expand?.location?.label || "Masqué";

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-4 py-4 md:gap-6 md:py-6">

      <div className="relative">
        <ChallengeBanner challenge={challenge.data} />
        {canUpdate && (
          <ButtonLink
            to={`/wei/challenge/${challenge.data.id}/edit`}
            aria-label={`Modifier ${challenge.data.title || "ce défi"}`}
            variant="secondary"
            size="icon"
            className="absolute top-2 right-2 shadow-sm"
          >
            <PenIcon className="h-4 w-4" />
          </ButtonLink>
        )}
      </div>

      <section className="flex flex-col gap-4 rounded-md border border-border bg-card p-4 text-card-foreground shadow-sm sm:p-6">
        {challenge.data.description ? (
          <p className="text-sm whitespace-pre-line">{challenge.data.description}</p>
        ) : (
          <p className="text-sm text-muted-foreground">Aucune description.</p>
        )}

        <div className="flex flex-row flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-sm">
          <p>
            <span className="text-muted-foreground">Lieu : </span>
            {locationText}
          </p>
          {challenge.data.phase && (
            <p className="text-muted-foreground">{PHASE_LABELS[challenge.data.phase]}</p>
          )}
        </div>
      </section>

      <ChallengeValidations challenge={challenge.data} />

      <ChallengeValidationCta
        challenge={challenge.data}
        validation={validation.data}
        participation={participation.data}
      />

    </div>
  );
}
