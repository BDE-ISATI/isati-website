import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import cn from "@/shared/utils/cn";

interface InputProps extends Omit<ComponentProps<"input">, "size">, VariantProps<typeof inputVariants> {}

export { inputVariants };
export default function Input({ className, variant, size, ...props }: InputProps) {
  return (
    <input className={cn(inputVariants({ variant, size, className }))} {...props} />
  );
}

const inputVariants = cva(
  "w-full rounded-md border bg-background text-foreground focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        normal: "border-input focus-visible:ring-ring",
        error: "border-status-critical focus-visible:ring-status-critical",
        success: "border-status-success focus-visible:ring-status-success",
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
