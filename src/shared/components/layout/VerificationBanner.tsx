import { useAuthStore } from "@/features/auth/store/useAuthStore";
import useVerification from "@/features/auth/hooks/useVerification";
import Button from "@/shared/components/ui/Button";
import CircleAlert from "@/assets/icons/circle-alert.svg?react";


type VerificationBannerProps = {
  email: string
}

export default function VerificationBanner({ email }: VerificationBannerProps) {

  const { mutate: sendVerification, isPending, coolDown } = useVerification();


  return (

    <Button variant="ghost" size="small" className="shrink-0" onClick={() => sendVerification(email)} disabled={isPending || coolDown > 0}>
      {isPending ? "Envoi…" : coolDown > 0 ? `${coolDown}s` : "Renvoyer l'email"}
    </Button>

  );
}
