import { type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import cn from "@/shared/utils/cn";
import { ListboxButton } from "@headlessui/react";
import { inputVariants } from "@/shared/components/ui/Input";

interface ListboxProps extends Omit<ComponentProps<typeof ListboxButton>, "size" | "className">, VariantProps<typeof inputVariants> {
  className?: string;
}

export default function StyledListboxButton({ className, variant, size, ...props }: ListboxProps) {
  return (
    <ListboxButton
      className={cn(
        inputVariants({ variant, size }),
        "flex cursor-pointer items-center justify-between gap-2 text-left",
        className
      )}
      {...props}
    />
  );
}
