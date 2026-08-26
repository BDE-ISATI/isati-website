import { useParams } from "react-router";
import useWei from "@/features/wei/hooks/queries/useWei";
import WeiCard from "@/features/wei/components/WeiCard";
import Error from "@/shared/components/ui/Error";

export default function WeiDetail() {

  const { weiId } = useParams()
  const wei = useWei(weiId)
  const record = wei.data?.[0]

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-4 md:py-6">
      {wei.error && <Error message="Impossible de charger ce WEI." />}

      {record ? (
        <p>test</p>
      ) : (
        !wei.isPending && <p className="text-sm text-muted-foreground">WEI introuvable.</p>
      )}
    </div>
  );
}
