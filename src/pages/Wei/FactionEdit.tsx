import { useEffect } from "react";
import { useParams } from "react-router";
import useFaction from "@/features/wei/hooks/queries/useFaction";
import FactionForm from "@/features/wei/components/FactionForm";
import { getFirstErrorMessage } from "@/shared/lib/pocketbase-errors";
import Error from "@/shared/components/ui/Error";
import NotFound from "@/pages/NotFound";

export default function FactionEdit() {

  const { weiId, factionId } = useParams();
  const faction = useFaction(factionId);

  useEffect(() => {
    document.title = "Modifier une faction | ISATI";
  }, []);

  if (!weiId || faction.error?.status === 404) return <NotFound />;

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-4 md:py-6">
      <h1 className="text-2xl font-semibold">Modifier la faction</h1>

      <Error message={getFirstErrorMessage(faction.error)} />

      {faction.data && <FactionForm weiId={weiId} faction={faction.data} />}
    </div>
  );
}
