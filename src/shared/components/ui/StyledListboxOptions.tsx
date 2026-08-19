import type { ComponentProps } from "react";
import cn from "@/shared/utils/cn";
import { ListboxOptions } from "@headlessui/react";

interface ListboxOptionsProps extends Omit<ComponentProps<typeof ListboxOptions>, "className"> {
  className?: string;
}

export default function StyledListboxOptions({ className, anchor = "bottom", ...props }: ListboxOptionsProps) {
  return (
    <ListboxOptions
      anchor={anchor}
      className={cn(
        "w-(--button-width) rounded-md border border-input bg-background p-1 shadow-md focus:outline-none [--anchor-gap:0.25rem]",
        className
      )}
      {...props}
    />
  );
}
