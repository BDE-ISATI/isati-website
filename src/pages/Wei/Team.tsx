import { useEffect, useMemo } from "react";
import useCurrentWei from "@/features/wei/hooks/queries/useCurrentWei";
import useTeamScores from "@/features/wei/hooks/queries/useTeamScores";
import useWeiValidations from "@/features/wei/hooks/queries/useWeiValidations";
import TeamScoreChart from "@/features/wei/components/TeamScoreChart";
import TeamCard from "@/features/wei/components/TeamCard";
import { getFirstErrorMessage } from "@/shared/lib/pocketbase-errors";
import { parsePbDate } from "@/shared/lib/dates";
import Error from "@/shared/components/ui/Error";
import LoadingOverlay from "@/shared/components/ui/LoadingOverlay";
import PageNav from "@/shared/components/layout/PageNav";

export default function Team() {

  useEffect(() => {
    document.title = "Équipes | ISATI";
  }, []);

  const currentWei = useCurrentWei();
  const teams = useTeamScores(currentWei.data?.id);
  const validations = useWeiValidations(currentWei.data?.id);

  const range = useMemo(() => {
    const to = Date.now();
    return { from: parsePbDate(currentWei.data?.parcours_starts_at)?.getTime() ?? to - 7 * 24 * 60 * 60 * 1000, to };
  }, [currentWei.data?.parcours_starts_at]);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-4 md:py-6">
      <PageNav />

      <h1 className="text-2xl font-semibold">Équipes</h1>

      <Error message={getFirstErrorMessage(teams.error ?? validations.error)} />

      {teams.isPending && (
        <div className="relative min-h-64 flex-1">
          <LoadingOverlay />
        </div>
      )}

      {teams.data && teams.data.length === 0 && (
        <p className="text-sm text-muted-foreground">Aucune équipe pour le moment.</p>
      )}

      {teams.data && teams.data.length > 0 && (
        <>
          <section className="w-full rounded-md border border-border bg-card p-4 text-card-foreground shadow-sm sm:p-6">
            <h2 className="text-lg font-semibold">Progression depuis le début du parcours</h2>
            <TeamScoreChart
              teams={teams.data}
              validations={validations.data ?? []}
              range={range}
              className="mt-4"
            />
          </section>

          <div className="flex flex-col gap-3">
            {teams.data.map((team, index) => (
              <TeamCard key={team.id} team={team} rank={index + 1} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
