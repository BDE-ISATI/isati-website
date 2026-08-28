import type { WeiWithLocation } from "@/shared/types/sharedTypes";
import weiPhase from "@/features/wei/libs/phase";
import EtapeInscription from "@/features/wei/components/etape/EtapeInscription";
import EtapeAttente from "@/features/wei/components/etape/EtapeAttente";
import EtapeParcours from "@/features/wei/components/etape/EtapeParcours";
import EtapeWeekend from "@/features/wei/components/etape/EtapeWeekend";
import EtapeArchive from "@/features/wei/components/etape/EtapeArchive";

type WeiEtapeProps = {
  wei: WeiWithLocation
};

export default function WeiEtape({ wei }: WeiEtapeProps) {
  const phase = weiPhase(wei)?.phase;

  switch (phase) {
    case "registration":
      return <EtapeInscription wei={wei} />;
    case "waiting":
      return <EtapeAttente wei={wei} />;
    case "parcours":
      return <EtapeParcours wei={wei} />;
    case "weekend":
      return <EtapeWeekend wei={wei} />;
    case "ended":
    case "archived":
      return <EtapeArchive wei={wei} />;
    default:
      return null;
  }
}
