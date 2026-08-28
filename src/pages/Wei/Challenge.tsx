import useChallenges from "@/features/wei/hooks/queries/useChallenges";
import useHasPermission from "@/features/roles/hooks/useHasPermission";
import ChallengeCard from "@/features/wei/components/ChallengeCard";
import AddChallengeCard from "@/features/wei/components/AddChallengeCard";
import ButtonLink from "@/shared/components/ui/ButtonLink";
import { getFirstErrorMessage } from "@/shared/lib/pocketbase-errors";
import Error from "@/shared/components/ui/Error";
import PenIcon from "@/assets/icons/pen.svg?react";
import useCurrentWei from "@/features/wei/hooks/queries/useCurrentWei";

export default function Challenge() {

  const challenges = useChallenges()
  const canCreate = useHasPermission("create", "challenges")
  const canUpdate = useHasPermission("update", "challenges")


  const currentWei = useCurrentWei()


  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-4 md:py-6">
      <h1 className="text-2xl font-semibold">Défis</h1>

      <Error message={getFirstErrorMessage(challenges.error)} />

      {!canCreate && challenges.data?.length === 0 && (
        <p className="text-sm text-muted-foreground">Aucun défi pour le moment.</p>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {canCreate && <AddChallengeCard />}

        {challenges.data?.map((challenge) => (
          <div key={challenge.id} className="relative">
            <ChallengeCard challenge={challenge} />
            {canUpdate && (
              <ButtonLink
                to={`/wei/challenge/${challenge.id}/edit`}
                aria-label={`Modifier ${challenge.title || "ce défi"}`}
                variant="secondary"
                size="icon"
                className="absolute top-2 right-2 shadow-sm"
              >
                <PenIcon className="h-4 w-4" />
              </ButtonLink>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
