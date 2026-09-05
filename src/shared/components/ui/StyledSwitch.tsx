import type { ComponentProps } from "react";
import cn from "@/shared/utils/cn";
import { Switch } from "@headlessui/react";

interface SwitchProps extends Omit<ComponentProps<typeof Switch>, "className" | "children"> {
  className?: string;
}

export default function StyledSwitch({ className, ...props }: SwitchProps) {
  return (
    <Switch
      className={cn(
        "group relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent bg-input transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring data-checked:bg-accent",
        className
      )}
      {...props}
    >
      <span className="pointer-events-none inline-block h-5 w-5 rounded-full bg-background shadow transition-transform group-data-checked:translate-x-5" />
    </Switch>
  );
}
