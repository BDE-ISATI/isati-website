import { useState } from "react";
import { CloseButton, Popover, PopoverButton, PopoverPanel } from "@headlessui/react";

import useLocations from "@/features/wei/hooks/queries/useLocations";
import LocationForm from "@/features/wei/components/LocationForm";
import { inputVariants } from "@/shared/components/ui/Input";
import { getFirstErrorMessage } from "@/shared/lib/pocketbase-errors";
import Error from "@/shared/components/ui/Error";
import cn from "@/shared/utils/cn";

import ChevronDown from "@/assets/icons/chevron-down.svg?react";
import Check from "@/assets/icons/check.svg?react";
import Pen from "@/assets/icons/pen.svg?react";
import Plus from "@/assets/icons/plus.svg?react";
import EyeOff from "@/assets/icons/eye-off.svg?react";

interface LocationSelectProps {
  value: string | null
  onChange: (id: string | null) => void
  className?: string
}

type Mode =
  | { kind: "list" }
  | { kind: "create" }
  | { kind: "edit", id: string }

export default function LocationSelect({ value, onChange, className }: LocationSelectProps) {

  const locations = useLocations();
  const [ mode, setMode ] = useState<Mode>({ kind: "list" });

  const selected = locations.data?.find((location) => location.id === value);
  const editing = mode.kind === "edit" ? locations.data?.find((location) => location.id === mode.id) : undefined;

  return (
    <Popover className={cn("relative", className)}>
      <PopoverButton
        onClick={() => setMode({ kind: "list" })}
        className={cn(inputVariants(), "flex cursor-pointer flex-row items-center justify-between gap-2 text-left")}
      >
        <span className="flex min-w-0 flex-1 flex-row items-center gap-2">
          {selected ? (
            <>
              <span className="min-w-0 truncate">{selected.label || "Masqué"}</span>
              {selected.hidden && (
                <EyeOff role="img" aria-label="Lieu masqué" className="h-4 w-4 shrink-0 text-muted-foreground" />
              )}
            </>
          ) : (
            <span className="text-muted-foreground">---</span>
          )}
        </span>
        <ChevronDown aria-hidden="true" className="h-4 w-4 shrink-0" />
      </PopoverButton>

      <PopoverPanel
        anchor="bottom start"
        className="z-50 flex w-(--button-width) flex-col rounded-md border border-input bg-background p-1 shadow-md [--anchor-gap:0.25rem] focus:outline-none"
      >
        {mode.kind === "list" ? (
          <>
            <Error message={getFirstErrorMessage(locations.error)} className="px-3 py-2" />

            <div className="flex max-h-64 flex-col overflow-y-auto">
              {locations.data?.map((location) => (
                <div key={location.id} className="flex flex-row items-center rounded-md hover:bg-muted">
                  <CloseButton
                    as="button"
                    type="button"
                    onClick={() => onChange(value === location.id ? null : location.id)}
                    className="flex min-w-0 flex-1 cursor-pointer flex-row items-center gap-2 rounded-md px-3 py-2 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <span className={cn("min-w-0 flex-1 truncate text-base", value === location.id && "font-medium")}>
                      {location.label || "Masqué"}
                    </span>
                    {location.hidden && (
                      <EyeOff role="img" aria-label="Lieu masqué" className="h-4 w-4 shrink-0 text-muted-foreground" />
                    )}
                    {value === location.id && <Check aria-hidden="true" className="h-4 w-4 shrink-0 text-accent" />}
                  </CloseButton>

                  <button
                    type="button"
                    aria-label={`Modifier ${location.label || "ce lieu"}`}
                    onClick={() => setMode({ kind: "edit", id: location.id })}
                    className="mr-1 cursor-pointer rounded-sm p-1 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <Pen className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              aria-label="Créer un lieu"
              onClick={() => setMode({ kind: "create" })}
              className="mt-1 flex cursor-pointer items-center justify-center rounded-md border border-dashed border-accent px-3 py-2 text-accent hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Plus className="h-4 w-4" />
            </button>
          </>
        ) : (
          <LocationForm
            key={mode.kind === "edit" ? mode.id : "create"}
            location={editing}
            onDone={(id) => {
              if (mode.kind === "create") onChange(id);
              setMode({ kind: "list" });
            }}
            onDeleted={(id) => {
              if (value === id) onChange(null);
              setMode({ kind: "list" });
            }}
            onCancel={() => setMode({ kind: "list" })}
          />
        )}
      </PopoverPanel>
    </Popover>
  );
}
