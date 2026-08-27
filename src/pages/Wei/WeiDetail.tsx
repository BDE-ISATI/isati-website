import { useParams } from "react-router";
import useWei from "@/features/wei/hooks/queries/useWei";
import WeiCard from "@/features/wei/components/WeiCard";
import { getFirstErrorMessage } from "@/shared/lib/pocketbase-errors";
import Error from "@/shared/components/ui/Error";

export default function WeiDetail() {

  const { weiId } = useParams()
  const wei = useWei(weiId)
  const record = wei.data

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-4 md:py-6">
      <Error message={getFirstErrorMessage(wei.error)} />

      {record ? (
        <p>test</p>
      ) : (
        !wei.isPending && <p className="text-sm text-muted-foreground">WEI introuvable.</p>
      )}
    </div>
  );
}
