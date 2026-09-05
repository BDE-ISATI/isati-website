import { useEffect } from "react";
import { useParams } from "react-router";
import useTeamScore from "@/features/wei/hooks/queries/useTeamScore";
import TeamForm from "@/features/wei/components/TeamForm";
import TeamMembersPanel from "@/features/wei/components/TeamMembersPanel";
import { getFirstErrorMessage } from "@/shared/lib/pocketbase-errors";
import Error from "@/shared/components/ui/Error";
import NotFound from "@/pages/NotFound";

export default function TeamEdit() {

  const { weiId, teamId } = useParams();
  const team = useTeamScore(teamId);

  useEffect(() => {
    document.title = "Modifier une équipe | ISATI";
  }, []);

  if (!weiId || !teamId || team.error?.status === 404) return <NotFound />;

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-4 md:py-6">
      <h1 className="text-xl font-semibold sm:text-2xl">Modifier l'équipe</h1>

      <Error message={getFirstErrorMessage(team.error)} />

      {team.data && <TeamForm weiId={weiId} team={team.data} />}

      <TeamMembersPanel weiId={weiId} teamId={teamId} />
    </div>
  );
}
