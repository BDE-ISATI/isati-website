import useWeis from "@/features/wei/hooks/queries/useWeis";
import useHasPermission from "@/features/roles/hooks/useHasPermission";
import WeiCard from "@/features/wei/components/WeiCard";
import AddWeiCard from "@/features/wei/components/AddWeiCard";
import ButtonLink from "@/shared/components/ui/ButtonLink";
import { getFirstErrorMessage } from "@/shared/lib/pocketbase-errors";
import Error from "@/shared/components/ui/Error";
import PenIcon from "@/assets/icons/pen.svg?react";

export default function WeiPanel() {

  const weis = useWeis()
  const canCreate = useHasPermission("create", "weis")
  const canUpdate = useHasPermission("update", "weis")

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-4 py-4 md:gap-6 md:py-6">
      <h1 className="text-xl font-semibold sm:text-2xl">Panel WEI</h1>

      <Error message={getFirstErrorMessage(weis.error)} />

      

      {weis.data?.length === 0 && (
        <p className="text-sm text-muted-foreground">Aucun WEI pour le moment.</p>
      )}

      {weis.data?.map((wei) => (
        <div key={wei.id} className="relative">
          <WeiCard wei={wei} />
          {canUpdate && (
            <ButtonLink
              to={`/wei/${wei.id}/edit`}
              aria-label={`Modifier le WEI ${wei.title || wei.year || ""}`.trim()}
              variant="secondary"
              size="icon"
              className="absolute top-2 right-2 shadow-sm"
            >
              <PenIcon className="h-4 w-4" />
            </ButtonLink>
          )}
        </div>
      ))}


      {canCreate && <AddWeiCard />}
    </div>
  );
}
