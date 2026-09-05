import type { ReactNode } from "react";
import { darken } from "color2k";
import cn from "@/shared/utils/cn";

interface TeamBannerProps {
  name?: string
  color?: string
  description?: string
  faction?: { name: string, color: string }
  titleAs?: "h1" | "h2"
  children?: ReactNode
  className?: string
}

export default function TeamBanner({ name, color, description, faction, titleAs: Title = "h1", children, className }: TeamBannerProps) {
  return (
    <header
      style={{
        backgroundColor: color || "var(--color-accent)",
        borderColor: color ? darken(color, 0.09) : undefined,
      }}
      className={cn("flex flex-col gap-2 rounded-md border-2 p-4 text-white shadow-sm sm:p-6", className)}
    >
      <div className="flex flex-row items-start justify-between gap-3">
        <Title className="text-xl font-semibold sm:text-2xl">{name || "Équipe sans nom"}</Title>

        {faction && (
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-black/25 px-2 py-0.5 text-xs font-medium">
            <span
              aria-hidden="true"
              style={{ backgroundColor: faction.color }}
              className="h-2.5 w-2.5 shrink-0 rounded-full border border-white/60"
            />
            {faction.name}
          </span>
        )}
      </div>

      {description && (
        <p className="text-sm whitespace-pre-line opacity-90">{description}</p>
      )}

      {children}
    </header>
  );
}
