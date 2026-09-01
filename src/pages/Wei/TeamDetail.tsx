import { useEffect, useMemo } from "react";
import { useParams } from "react-router";

import useCurrentWei from "@/features/wei/hooks/queries/useCurrentWei";
import useTeamScore from "@/features/wei/hooks/queries/useTeamScore";
import useTeamScores from "@/features/wei/hooks/queries/useTeamScores";
import useWeiValidations from "@/features/wei/hooks/queries/useWeiValidations";
import TeamScoreChart from "@/features/wei/components/TeamScoreChart";
import TeamMembers from "@/features/wei/components/TeamMembers";
import TeamBanner from "@/features/wei/components/TeamBanner";
import { formatRank, rankOf } from "@/features/wei/libs/ranking";
import { getFirstErrorMessage } from "@/shared/lib/pocketbase-errors";
import { parsePbDate } from "@/shared/lib/dates";
import Error from "@/shared/components/ui/Error";
import IsatiAnimation from "@/shared/components/animations/IsatiAnimation";
import NotFound from "@/pages/NotFound";
import PageNav from "@/shared/components/layout/PageNav";

export default function TeamDetail() {

  const { teamId } = useParams();
  const team = useTeamScore(teamId);
  const currentWei = useCurrentWei();
  const teams = useTeamScores(currentWei.data?.id);
  const validations = useWeiValidations(currentWei.data?.id);

  useEffect(() => {
    document.title = `${team.data?.name || "Équipe"} | ISATI`;
  }, [team.data]);

  const range = useMemo(() => {
    const to = Date.now();
    return { from: parsePbDate(currentWei.data?.parcours_starts_at)?.getTime() ?? to - 7 * 24 * 60 * 60 * 1000, to };
  }, [currentWei.data?.parcours_starts_at]);

  if (team.isLoading) return (
    <div className="flex flex-1 items-center justify-center">
      <IsatiAnimation />
    </div>
  );

  if (!team.data) {
    return team.error && team.error.status !== 404 ? (
      <div className="mx-auto w-full max-w-3xl px-4 py-4 md:py-6">
        <Error message={getFirstErrorMessage(team.error)} />
      </div>
    ) : <NotFound />;
  }

  const current = team.data;
  const rank = rankOf(teams.data ?? [], current.id);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-4 py-4 md:gap-6 md:py-6">
      <PageNav />


      <TeamBanner name={current.name} color={current.color} description={current.description} />

      <section className="grid grid-cols-3 gap-4 rounded-md border border-border bg-card p-4 text-card-foreground shadow-sm sm:p-6">
        <Stat label="Points" value={String(current.score ?? 0)} />
        <Stat label="Classement" value={formatRank(rank, teams.data?.length ?? 0)} />
        <Stat label="Défis validés" value={String(current.validations_count ?? 0)} />
      </section>

      <section className="w-full rounded-md border border-border bg-card p-4 text-card-foreground shadow-sm sm:p-6">
        <h2 className="text-lg font-semibold">Progression</h2>
        <Error className="mt-2" message={getFirstErrorMessage(teams.error ?? validations.error)} />
        <TeamScoreChart
          teams={teams.data ?? []}
          validations={validations.data ?? []}
          range={range}
          highlightTeamId={current.id}
          className="mt-4"
        />
      </section>

      <TeamMembers team={current} />

    </div>
  );
}

function Stat({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex flex-col items-center gap-1 text-center">
      <span className="text-2xl leading-none font-bold sm:text-3xl">{value}</span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}
