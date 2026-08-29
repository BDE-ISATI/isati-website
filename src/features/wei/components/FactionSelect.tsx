import { Listbox } from "@headlessui/react";
import { Link } from "react-router";

import useFactions from "@/features/wei/hooks/queries/useFactions";
import StyledListboxButton from "@/shared/components/ui/StyledListboxButton";
import StyledListboxOptions from "@/shared/components/ui/StyledListboxOptions";
import StyledListboxOption from "@/shared/components/ui/StyledListboxOption";
import { getFirstErrorMessage } from "@/shared/lib/pocketbase-errors";
import Error from "@/shared/components/ui/Error";
import ChevronDown from "@/assets/icons/chevron-down.svg?react";
import cn from "@/shared/utils/cn";

interface FactionSelectProps {
  weiId: string
  value: string | null
  onChange: (id: string | null) => void
  className?: string
}

export default function FactionSelect({ weiId, value, onChange, className }: FactionSelectProps) {

  const factions = useFactions(weiId);

  const selected = factions.data?.find((faction) => faction.id === value);

  return (
    <div className={className}>
      <Listbox value={value} onChange={onChange}>
        <StyledListboxButton>
          <span className="flex min-w-0 flex-row items-center gap-2">
            {selected && (
              <span
                aria-hidden="true"
                style={{ backgroundColor: selected.color }}
                className="h-3 w-3 shrink-0 rounded-full border border-border"
              />
            )}
            <span className={cn("min-w-0 truncate", !selected && "text-muted-foreground")}>
              {selected ? selected.name : "Aucune faction"}
            </span>
          </span>
          <ChevronDown aria-hidden="true" className="h-4 w-4 shrink-0" />
        </StyledListboxButton>
        <StyledListboxOptions>
          <StyledListboxOption value={null}>
            <span className="min-w-0 truncate text-muted-foreground">Aucune faction</span>
          </StyledListboxOption>

          {factions.data?.map((faction) => (
            <StyledListboxOption key={faction.id} value={faction.id}>
              <span className="flex min-w-0 flex-row items-center gap-2">
                <span
                  aria-hidden="true"
                  style={{ backgroundColor: faction.color }}
                  className="h-3 w-3 shrink-0 rounded-full border border-border"
                />
                <span className="min-w-0 truncate">{faction.name}</span>
              </span>
            </StyledListboxOption>
          ))}
        </StyledListboxOptions>
      </Listbox>

      {factions.data?.length === 0 && (
        <p className="mt-1 text-sm text-muted-foreground">
          Aucune faction pour ce WEI.{" "}
          <Link to={`/wei/panel/${weiId}/factions/new`} className="text-link underline">
            Créez-en une
          </Link>
          .
        </p>
      )}

      <Error className="mt-1" message={getFirstErrorMessage(factions.error)} />
    </div>
  );
}
