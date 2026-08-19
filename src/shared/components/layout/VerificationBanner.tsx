import { useAuthStore } from "@/features/auth/store/useAuthStore";
import useVerification from "@/features/auth/hooks/useVerification";
import Button from "@/shared/components/ui/Button";
import CircleAlert from "@/assets/icons/circle-alert.svg?react";


type VerificationBannerProps = {
  email: string
}

export default function VerificationBanner({ email }: VerificationBannerProps) {

  const { sendVerification, isLoading, coolDown } = useVerification();


  return (
 
    <Button variant="ghost" size="small" className="shrink-0" onClick={() => sendVerification(email)} disabled={isLoading || coolDown > 0}>
      {isLoading ? "Envoi…" : coolDown > 0 ? `${coolDown}s` : "Renvoyer l'email"}
    </Button>

  );
}
