import { useEffect } from "react";
import { useParams } from "react-router";
import TeamLeaderPanel from "@/features/wei/components/TeamLeaderPanel";
import NotFound from "@/pages/NotFound";

export default function WeiLeaders() {

  const { weiId } = useParams();

  useEffect(() => {
    document.title = "Chefs d'équipe | ISATI";
  }, []);

  if (!weiId) return <NotFound />;

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-4 md:py-6">
      <h1 className="text-2xl font-semibold">Chefs d'équipe</h1>

      <TeamLeaderPanel weiId={weiId} />
    </div>
  );
}
