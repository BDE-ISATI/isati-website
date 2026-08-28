import type { WeiWithLocation } from "@/shared/types/sharedTypes";
import WeiTimeline from "@/features/wei/components/WeiTimeline";
import WeiCountdown from "@/features/wei/components/WeiCountdown";

type EtapeAttenteProps = {
  wei: WeiWithLocation
};

export default function EtapeAttente({ wei }: EtapeAttenteProps) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col items-center justify-center gap-10 py-10 text-center">
        <WeiCountdown wei={wei} />

        <div className="flex max-w-md flex-col items-center gap-2">
          <h2 className="text-lg font-semibold">Les jeux arrivent bientôt</h2>
        </div>
      </div>

      <WeiTimeline wei={wei} className="mb-10" />
    </div>
  );
}
