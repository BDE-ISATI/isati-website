import type { WeiWithLocation } from "@/shared/types/sharedTypes";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import useMyParticipation from "@/features/wei/hooks/queries/useMyParticipation";
import useRegisterToWei from "@/features/wei/hooks/mutations/useRegisterToWei";
import { isWeiEligible, registrationOpen } from "@/features/wei/libs/registration";
import Button from "@/shared/components/ui/Button";
import ButtonLink from "@/shared/components/ui/ButtonLink";
import Error from "@/shared/components/ui/Error";
import { getFirstErrorMessage } from "@/shared/lib/pocketbase-errors";

type RegisterCtaProps = {
  wei: WeiWithLocation
  note?: string
};

export default function RegisterCta({ wei, note }: RegisterCtaProps) {
  const user = useAuthStore((s) => s.user);
  const participation = useMyParticipation(wei.id);
  const register = useRegisterToWei();

  const eligible = isWeiEligible(user);
  const open = registrationOpen(wei);

  return (
    <div className="flex flex-col items-center gap-3">
      {!user && (
        <>
          <p className="text-sm text-muted-foreground">
            Connecte-toi pour t'inscrire au WEI.
          </p>
          <ButtonLink to="/login" variant="accent">
            Se connecter
          </ButtonLink>
        </>
      )}

      {user && !eligible && (
        <p className="text-sm text-muted-foreground">
          Les inscriptions au WEI sont réservées aux 1<sup>re</sup> année ingénieur.
        </p>
      )}

      {user && eligible && !open && (
        <p className="text-sm text-muted-foreground">
          Les inscriptions sont closes.
        </p>
      )}

      {user && eligible && open && (
        <>
          <p className="text-sm text-muted-foreground">
            {note ?? "Les inscriptions pour le WEI sont ouvertes."}
          </p>
          <Button
            variant="accent"
            disabled={register.isPending || participation.isPending}
            onClick={() => register.mutate({ userId: user.id })}
          >
            S'inscrire
          </Button>
        </>
      )}

      <Error message={getFirstErrorMessage(participation.error)} />
      <Error message={getFirstErrorMessage(register.error)} />
    </div>
  );
}
