import type { UseQueryResult } from "@tanstack/react-query";
import type { ValidationWithRelations } from "@/shared/types/sharedTypes";
import ValidationTile from "@/features/wei/components/ValidationTile";
import ButtonLink from "@/shared/components/ui/ButtonLink";
import Error from "@/shared/components/ui/Error";
import { getFirstErrorMessage } from "@/shared/lib/pocketbase-errors";
import ChevronRight from "@/assets/icons/chevron-right.svg?react";

interface HubProofCarouselProps {
  validations: UseQueryResult<ValidationWithRelations[]>
  now: number
}

export default function HubProofCarousel({ validations, now }: HubProofCarouselProps) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-lg font-semibold">Dernières preuves</h2>

      <Error message={getFirstErrorMessage(validations.error)} />

      {validations.data?.length === 0 && (
        <div className="flex flex-col items-start gap-2 rounded-md border border-border bg-muted p-4 text-sm">
          <p>Sois le premier à valider un défi.</p>
          <ButtonLink to="/wei/challenge" variant="secondary" size="small">
            Voir les défis
            <ChevronRight className="h-4 w-4" />
          </ButtonLink>
        </div>
      )}

      {!!validations.data?.length && (
        <ul className="flex flex-row gap-3 overflow-x-auto pb-2 snap-x">
          {validations.data.map((validation) => (
            <li key={validation.id} className="w-40 shrink-0 snap-start sm:w-44">
              <ValidationTile validation={validation} showChallenge authorLink now={now} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
