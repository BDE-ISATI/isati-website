import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import cn from "@/shared/utils/cn";
import { ListboxButton } from "@headlessui/react";

interface ListboxProps extends Omit<ComponentProps<typeof ListboxButton>, "size">, VariantProps<typeof listboxVariant> {}


export default function StyledListboxButton({ className, variant, size, ...props }: ListboxProps) {
  return (
    <ListboxButton className={cn(listboxVariant({ variant, size, className }))} {...props} />
  );
}

const listboxVariant = cva(
  "flex relative items-center justify-between gap-2 text-left cursor-pointer w-full rounded-md border bg-background text-foreground focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50", 
  {
    variants: {
      variant: {
        normal: "border-input focus:ring-ring",
        error: "border-status-critical focus:ring-status-critical",
        success: "border-status-success focus:ring-status-success",
      },
      size: {
        small: "text-sm px-2 py-1",
        medium: "text-base px-3 py-2",
        large: "text-lg px-4 py-3",
      },
    },
    defaultVariants: {
      variant: "normal",
      size: "medium",
    },
  }
);
