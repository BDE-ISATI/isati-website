import { useEffect } from "react";
import { useParams } from "react-router";
import useWei from "@/features/wei/hooks/queries/useWei";
import WeiForm from "@/features/wei/components/WeiForm";
import { getFirstErrorMessage } from "@/shared/lib/pocketbase-errors";
import Error from "@/shared/components/ui/Error";
import NotFound from "@/pages/NotFound";
import PageNav from "@/shared/components/layout/PageNav";

export default function WeiEdit() {

  const { weiId } = useParams();
  const wei = useWei(weiId);

  useEffect(() => {
    document.title = "Modifier un WEI | ISATI";
  }, []);

  if (wei.error?.status === 404) return <NotFound />;

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-4 py-4 md:gap-6 md:py-6">
      <PageNav />

      <h1 className="text-xl font-semibold sm:text-2xl">Modifier le WEI</h1>

      <Error message={getFirstErrorMessage(wei.error)} />

      {wei.data && <WeiForm wei={wei.data} />}
    </div>
  );
}
