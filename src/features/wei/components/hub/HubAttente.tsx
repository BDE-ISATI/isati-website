import type { WeiWithLocation } from "@/shared/types/sharedTypes";
import WeiTimeline from "@/features/wei/components/WeiTimeline";
import WeiCountdown from "@/features/wei/components/WeiCountdown";

type HubAttenteProps = {
  wei: WeiWithLocation
};

export default function HubAttente({ wei }: HubAttenteProps) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col items-center justify-center gap-10 py-10 text-center">
        <WeiCountdown wei={wei} />

        <div className="flex max-w-md flex-col items-center gap-2">
          <h2 className="text-lg font-semibold">Ton équipe arrive</h2>
          <p className="text-sm text-muted-foreground">
            Ton inscription est enregistrée. Dès que tu seras affecté à une équipe, ton tableau de bord apparaîtra ici.
          </p>
        </div>
      </div>

      <WeiTimeline wei={wei} className="mb-10" />
    </div>
  );
}
