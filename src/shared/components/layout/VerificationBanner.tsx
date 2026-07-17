import { useAuthStore } from "@/features/auth/store/useAuthStore";
import useVerification from "@/features/auth/hooks/useVerification";
import Button from "@/shared/components/ui/Button";

export default function VerificationBanner() {
  const user = useAuthStore((s) => s.user);
  const { sendVerification, isLoading, coolDown } = useVerification();

  if (!user || user.verified) return null;

  return (
    <div className="flex items-center justify-center gap-3 bg-warning px-4 py-3 text-center text-warning-foreground">
      <p className="text-sm">
        Votre compte n'est pas encore vérifié. Vérifiez votre boîte mail ou cliquez ci-dessous pour renvoyer le lien de vérification.
      </p>
      <Button variant="primary" size="small" className="shrink-0" onClick={() => sendVerification(user.email)} disabled={isLoading || coolDown > 0}>
        {isLoading ? "Envoi…" : coolDown > 0 ? `${coolDown}s` : "Renvoyer l'email"}
      </Button>
    </div>
  );
}
