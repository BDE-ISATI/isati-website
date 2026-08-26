import useAllWei from "@/features/wei/hooks/queries/useAllWei";
import WeiCard from "@/features/wei/components/WeiCard";
import Error from "@/shared/components/ui/Error";

export default function WeiPanel() {

  const weis = useAllWei()

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-4 md:py-6">
      <h1 className="text-2xl font-semibold">Panel WEI</h1>

      {weis.error && <Error message="Impossible de charger les WEI." />}

      {weis.data?.length === 0 && (
        <p className="text-sm text-muted-foreground">Aucun WEI pour le moment.</p>
      )}

      {weis.data?.map((wei) => <WeiCard key={wei.id} wei={wei} />)}
    </div>
  );
}
