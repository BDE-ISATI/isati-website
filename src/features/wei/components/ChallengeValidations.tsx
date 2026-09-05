import type { ChallengeWithRelations } from "@/shared/types/sharedTypes";
import useChallengeValidations from "@/features/wei/hooks/queries/useChallengeValidations";
import ValidationTile from "@/features/wei/components/ValidationTile";
import { getFirstErrorMessage } from "@/shared/lib/pocketbase-errors";
import Error from "@/shared/components/ui/Error";
import cn from "@/shared/utils/cn";

interface ChallengeValidationsProps {
  challenge: ChallengeWithRelations
  className?: string
}

export default function ChallengeValidations({ challenge, className }: ChallengeValidationsProps) {
  const validations = useChallengeValidations(challenge.id);

  return (
    <section
      className={cn(
        "w-full rounded-md border border-border bg-card p-4 text-card-foreground shadow-sm sm:p-6",
        className,
      )}
    >
      <h2 className="text-lg font-semibold">Derniers validés</h2>

      <Error className="mt-2" message={getFirstErrorMessage(validations.error)} />

      {validations.data?.length === 0 && (
        <p className="mt-2 text-sm text-muted-foreground">Personne n'a encore validé ce défi.</p>
      )}

      <ul className="mt-4 flex flex-row gap-3 overflow-x-auto pb-2">
        {validations.data?.map((validation) => (
          <li key={validation.id} className="w-40 shrink-0 sm:w-44">
            <ValidationTile validation={validation} />
          </li>
        ))}
      </ul>
    </section>
  );
}
