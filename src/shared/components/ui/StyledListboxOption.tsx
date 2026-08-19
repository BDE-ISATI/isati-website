import type { ComponentProps } from "react";
import cn from "@/shared/utils/cn";
import { ListboxOption } from "@headlessui/react";

interface ListboxOptionProps extends Omit<ComponentProps<typeof ListboxOption>, "className"> {
  className?: string;
}

export default function StyledListboxOption({ className, ...props }: ListboxOptionProps) {
  return (
    <ListboxOption
      className={cn(
        "cursor-pointer rounded-md px-3 py-2 text-base text-foreground data-focus:bg-muted data-selected:font-medium",
        className
      )}
      {...props}
    />
  );
}
