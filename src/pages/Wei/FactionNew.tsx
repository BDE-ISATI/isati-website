import { useEffect } from "react";
import { useParams } from "react-router";
import FactionForm from "@/features/wei/components/FactionForm";
import NotFound from "@/pages/NotFound";

export default function FactionNew() {

  const { weiId } = useParams();

  useEffect(() => {
    document.title = "Nouvelle faction | ISATI";
  }, []);

  if (!weiId) return <NotFound />;

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-4 md:py-6">
      <h1 className="text-2xl font-semibold">Nouvelle faction</h1>

      <FactionForm weiId={weiId} />
    </div>
  );
}
