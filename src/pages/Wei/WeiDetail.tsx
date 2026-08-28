import { useParams } from "react-router";
import useWei from "@/features/wei/hooks/queries/useWei";
import { getFirstErrorMessage } from "@/shared/lib/pocketbase-errors";
import Error from "@/shared/components/ui/Error";
import IsatiAnimation from "@/shared/components/animations/IsatiAnimation";
import NotFound from "@/pages/NotFound";

export default function WeiDetail() {

  const { weiId } = useParams()
  const wei = useWei(weiId)

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
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-4 md:py-6">
      <p>test</p>
    </div>
  );
}
