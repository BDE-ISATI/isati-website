import useChallenges from "@/features/wei/hooks/queries/useChallenges";
import ChallengeCard from "@/features/wei/components/ChallengeCard";
import Error from "@/shared/components/ui/Error";

export default function Challenge() {

  const challenges = useChallenges()

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-4 md:py-6">
      <h1 className="text-2xl font-semibold">Défis</h1>

      {challenges.error && <Error message="Impossible de charger les défis." />}

      {challenges.data?.length === 0 && (
        <p className="text-sm text-muted-foreground">Aucun défi pour le moment.</p>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {challenges.data?.map((challenge) => (
          <ChallengeCard key={challenge.id} challenge={challenge} />
        ))}
      </div>
    </div>
  );
}
