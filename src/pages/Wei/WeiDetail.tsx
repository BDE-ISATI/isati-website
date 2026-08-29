import { useEffect } from "react";
import { useParams } from "react-router";

import useWei from "@/features/wei/hooks/queries/useWei";
import useHasPermission from "@/features/roles/hooks/useHasPermission";
import WeiPanelSummary from "@/features/wei/components/WeiPanelSummary";
import FactionList from "@/features/wei/components/FactionList";
import TeamList from "@/features/wei/components/TeamList";
import UnassignedPanel from "@/features/wei/components/UnassignedPanel";

import { getFirstErrorMessage } from "@/shared/lib/pocketbase-errors";
import ButtonLink from "@/shared/components/ui/ButtonLink";
import ChevronRight from "@/assets/icons/chevron-right.svg?react";
import Error from "@/shared/components/ui/Error";
import IsatiAnimation from "@/shared/components/animations/IsatiAnimation";
import NotFound from "@/pages/NotFound";
import PageNav from "@/shared/components/layout/PageNav";

export default function WeiDetail() {

  const { weiId } = useParams()
  const wei = useWei(weiId)
  const canWriteTeams = useHasPermission("create", "teams")
  const canAssign = useHasPermission("create", "participations")

  useEffect(() => {
    document.title = "Gestion du WEI | ISATI";
  }, []);

  if (wei.isLoading) return (
    <div className="flex flex-1 items-center justify-center">
      <IsatiAnimation />
    </div>
  );

  if (!wei.data) {
    return wei.error && wei.error.status !== 404 ? (
      <div className="mx-auto w-full max-w-5xl px-4 py-4 md:py-6">
        <Error message={getFirstErrorMessage(wei.error)} />
      </div>
    ) : <NotFound />;
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-4 md:py-6">
      <PageNav back="/wei/panel" backLabel="Liste des WEI" />

      <WeiPanelSummary wei={wei.data} />

      <nav className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <ButtonLink to="/wei/validation" variant="secondary" className="flex-1 justify-between">
          Validations
          <ChevronRight aria-hidden="true" className="h-4 w-4" />
        </ButtonLink>
        <ButtonLink to="/wei/team" variant="secondary" className="flex-1 justify-between">
          Classement
          <ChevronRight aria-hidden="true" className="h-4 w-4" />
        </ButtonLink>
        <ButtonLink to="/wei/challenge" variant="secondary" className="flex-1 justify-between">
          Défis
          <ChevronRight aria-hidden="true" className="h-4 w-4" />
        </ButtonLink>
      </nav>

      <FactionList weiId={wei.data.id} canWrite={canWriteTeams} />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-[2fr_1fr]">
        <TeamList weiId={wei.data.id} canWrite={canWriteTeams} />
        <UnassignedPanel weiId={wei.data.id} />
      </div>

      {canAssign && (
        <div className="flex flex-row justify-end">
          <ButtonLink to={`/wei/panel/${wei.data.id}/leaders`} variant="secondary">
            Désigner des chefs d'équipe
          </ButtonLink>
        </div>
      )}
    </div>
  );
}
