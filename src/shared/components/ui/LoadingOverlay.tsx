import IsatiAnimation from "@/shared/components/animations/IsatiAnimation";
import { useEffect, useState } from "react";

const DELAY = 100;

export default function LoadingOverlay() {
  const [ isVisible, setIsVisible ] = useState<boolean>(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), DELAY);
    return () => clearTimeout(timeout);
  }, []);

  if (!isVisible) return null;

  return (
    <div role="status" aria-live="polite" className="absolute inset-0 z-10 grid place-items-center">
      <IsatiAnimation style={{ width: 320, height: 180 }} />
      <span className="sr-only">Chargement…</span>
    </div>
  );
}
