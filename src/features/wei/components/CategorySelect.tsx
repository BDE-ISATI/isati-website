import { useState } from "react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { darken } from "color2k";

import useCategories from "@/features/wei/hooks/queries/useCategories";
import CategoryForm from "@/features/wei/components/CategoryForm";
import { inputVariants } from "@/shared/components/ui/Input";
import { getFirstErrorMessage } from "@/shared/lib/pocketbase-errors";
import Error from "@/shared/components/ui/Error";
import cn from "@/shared/utils/cn";

import ChevronDown from "@/assets/icons/chevron-down.svg?react";
import Check from "@/assets/icons/check.svg?react";
import Pen from "@/assets/icons/pen.svg?react";
import Plus from "@/assets/icons/plus.svg?react";

const DEFAULT_COLOR = "#d82b2b";

interface CategorySelectProps {
  value: string[]
  onChange: (ids: string[]) => void
  className?: string
}

type Mode =
  | { kind: "list" }
  | { kind: "create" }
  | { kind: "edit", id: string }

export default function CategorySelect({ value, onChange, className }: CategorySelectProps) {

  const categories = useCategories();
  const [ mode, setMode ] = useState<Mode>({ kind: "list" });

  const selected = categories.data?.filter((category) => value.includes(category.id)) ?? [];
  const editing = mode.kind === "edit" ? categories.data?.find((category) => category.id === mode.id) : undefined;

  function toggle(id: string) {
    onChange(value.includes(id) ? value.filter((current) => current !== id) : [...value, id]);
  }

  return (
    <Popover className={cn("relative", className)}>
      <PopoverButton
        onClick={() => setMode({ kind: "list" })}
        className={cn(inputVariants(), "flex cursor-pointer flex-row items-center justify-between gap-2 text-left")}
      >
        <span className="flex min-w-0 flex-1 flex-row flex-wrap items-center gap-1">
          {selected.length === 0 ? (
            <span className="text-muted-foreground">---</span>
          ) : (
            selected.map((category) => {
              const color = category.color || DEFAULT_COLOR;
              return (
                <span
                  key={category.id}
                  style={{ backgroundColor: color, borderColor: darken(color, 0.09) }}
                  className="inline-flex items-center rounded-md border-2 px-2 py-0.5 text-xs font-medium text-white"
                >
                  {category.name}
                </span>
              );
            })
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
            <Error message={getFirstErrorMessage(categories.error)} className="px-3 py-2" />

            <div className="flex max-h-64 flex-col overflow-y-auto">
              {categories.data?.map((category) => (
                <div key={category.id} className="flex flex-row items-center rounded-md hover:bg-muted">
                  <button
                    type="button"
                    onClick={() => toggle(category.id)}
                    className="flex min-w-0 flex-1 cursor-pointer flex-row items-center gap-2 rounded-md px-3 py-2 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <span
                      aria-hidden="true"
                      style={{ backgroundColor: category.color || DEFAULT_COLOR }}
                      className="h-3 w-3 shrink-0 rounded-full"
                    />
                    <span className={cn("min-w-0 flex-1 truncate text-base", value.includes(category.id) && "font-medium")}>
                      {category.name}
                    </span>
                    {value.includes(category.id) && <Check aria-hidden="true" className="h-4 w-4 shrink-0 text-accent" />}
                  </button>

                  <button
                    type="button"
                    aria-label={`Modifier ${category.name}`}
                    onClick={() => setMode({ kind: "edit", id: category.id })}
                    className="mr-1 cursor-pointer rounded-sm p-1 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <Pen className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              aria-label="Créer une catégorie"
              onClick={() => setMode({ kind: "create" })}
              className="mt-1 flex cursor-pointer items-center justify-center rounded-md border border-dashed border-accent px-3 py-2 text-accent hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Plus className="h-4 w-4" />
            </button>
          </>
        ) : (
          <CategoryForm
            key={mode.kind === "edit" ? mode.id : "create"}
            category={editing}
            onDone={(id) => {
              if (mode.kind === "create" && !value.includes(id)) onChange([...value, id]);
              setMode({ kind: "list" });
            }}
            onDeleted={(id) => {
              onChange(value.filter((current) => current !== id));
              setMode({ kind: "list" });
            }}
            onCancel={() => setMode({ kind: "list" })}
          />
        )}
      </PopoverPanel>
    </Popover>
  );
}
