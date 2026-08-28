import type { WeiWithLocation } from "@/shared/types/sharedTypes";
import WeiTimeline from "@/features/wei/components/WeiTimeline";
import WeiCountdown from "@/features/wei/components/WeiCountdown";

type EtapeArchiveProps = {
  wei: WeiWithLocation
};

export default function EtapeArchive({ wei }: EtapeArchiveProps) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col items-center justify-center gap-10 py-10 text-center">
        <WeiCountdown wei={wei} />

        <div className="flex max-w-md flex-col items-center gap-2">
          <h2 className="text-lg font-semibold">Merci d'avoir participé</h2>
          <p className="text-sm text-muted-foreground">Bientôt disponible.</p>
        </div>
      </div>

      <WeiTimeline wei={wei} className="mb-10" />
    </div>
  );
}
