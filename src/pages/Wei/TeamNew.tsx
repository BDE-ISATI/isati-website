import { useEffect } from "react";
import { useParams } from "react-router";
import TeamForm from "@/features/wei/components/TeamForm";
import NotFound from "@/pages/NotFound";

export default function TeamNew() {

  const { weiId } = useParams();

  useEffect(() => {
    document.title = "Nouvelle équipe | ISATI";
  }, []);

  if (!weiId) return <NotFound />;

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-4 py-4 md:gap-6 md:py-6">
      <h1 className="text-xl font-semibold sm:text-2xl">Nouvelle équipe</h1>

      <TeamForm weiId={weiId} />
    </div>
  );
}
