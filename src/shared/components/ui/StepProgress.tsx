import type { CSSProperties } from "react";
import cn from "@/shared/utils/cn";

export type StepProgressStep = {
  id: string
  label: string
  sublabel?: string
  tone?: "default" | "warning" | "danger"
};

export type StepProgressProps = {
  steps: StepProgressStep[]
  value: number
  orientation?: "horizontal" | "vertical" | "responsive"
  label: string
  accent?: string
  className?: string
};

export default function StepProgress({steps, value, orientation = "responsive", label, accent, className }: StepProgressProps) {
  
  if (steps.length === 0) return null;
  const last = steps.length - 1;
  const safe = Number.isFinite(value) ? value : 0;
  const current = Math.min(Math.max(safe, 0), last);

  return (
    <ol
      aria-label={label}
      style={accent ? ({ "--sp-accent": accent } as CSSProperties) : undefined}
      className={cn(
        "flex w-full [--sp-accent:var(--color-accent)]",
        rootLayout[orientation],
        className,
      )}
    >
      {steps.map((step, i) => {
        const status = i < current ? "done" : i === current ? "current" : "upcoming";
        const position = i === 0 ? "first" : i === last ? "last" : "middle";
        const tone = step.tone ?? "default";
        const fill = Math.min(1, Math.max(0, current - i)) * 100;

        return (
          <li
            key={step.id}
            aria-current={status === "current" ? "step" : undefined}
            className={cn(item[orientation], i < last ? itemGrow[orientation] : itemEnd[orientation])}
          >
            <div className="relative flex flex-row items-center">
              <span
                aria-hidden="true"
                className={cn(nodeBase, nodeStatus[status], toneNode[tone])}
              />
              <div className={cn("flex flex-col", labelPos[orientation][position])}>
                <span className={cn("text-sm font-medium", labelColor[status], toneLabel[tone])}>
                  {step.label}
                </span>
                {step.sublabel && (
                  <span className="text-xs text-muted-foreground">{step.sublabel}</span>
                )}
                <span className="sr-only">{srStatus[status]}</span>
              </div>
            </div>
            {i < last && (
              <div aria-hidden="true" className={connectorTrack[orientation]}>
                <div
                  style={{ "--sp-fill": `${fill}%` } as CSSProperties}
                  className={cn(
                    "bg-(--sp-accent) transition-[width,height] duration-400 ease-out motion-reduce:transition-none",
                    connectorFill[orientation],
                  )}
                />
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
}

const srStatus = {
  done: "Terminé",
  current: "En cours",
  upcoming: "À venir",
};

const rootLayout = {
  horizontal: "flex-row items-center pb-20",
  vertical: "flex-col items-start",
  responsive: "flex-col items-start md:flex-row md:items-center md:pb-20",
};

const item = {
  horizontal: "relative flex flex-row items-center",
  vertical: "relative flex flex-col items-start",
  responsive: "relative flex flex-col items-start md:flex-row md:items-center",
};

const itemGrow = {
  horizontal: "flex-1",
  vertical: "",
  responsive: "md:flex-1",
};

const itemEnd = {
  horizontal: "flex-none",
  vertical: "",
  responsive: "md:flex-none",
};

const connectorTrack = {
  horizontal: "h-1 w-full rounded-full bg-border",
  vertical: "ml-2.5 h-8 w-1 rounded-full bg-border",
  responsive: "ml-2.5 h-8 w-1 rounded-full bg-border md:ml-0 md:h-1 md:w-full",
};

const connectorFill = {
  horizontal: "h-full w-[var(--sp-fill)] rounded-full",
  vertical: "w-full h-[var(--sp-fill)] rounded-full",
  responsive: "w-full h-[var(--sp-fill)] rounded-full md:h-full md:w-[var(--sp-fill)]",
};

const labelPos = {
  horizontal: {
    first: "absolute top-8 left-0 w-24 text-left",
    middle: "absolute top-8 left-1/2 w-24 -translate-x-1/2 text-center",
    last: "absolute top-8 right-0 w-24 text-right",
  },
  vertical: {
    first: "ml-3",
    middle: "ml-3",
    last: "ml-3",
  },
  responsive: {
    first: "ml-3 md:absolute md:top-8 md:left-0 md:ml-0 md:w-24 md:text-left",
    middle:
      "ml-3 md:absolute md:top-8 md:left-1/2 md:ml-0 md:w-24 md:-translate-x-1/2 md:text-center",
    last: "ml-3 md:absolute md:top-8 md:right-0 md:ml-0 md:w-24 md:text-right",
  },
};

const nodeBase =
  "h-6 w-6 shrink-0 rounded-full border-2 transition-colors duration-200 motion-reduce:transition-none";

const nodeStatus = {
  done: "bg-[var(--sp-accent)] border-[var(--sp-accent)]",
  current:
    "bg-background border-[var(--sp-accent)] ring-4 ring-[color-mix(in_oklab,var(--sp-accent)_20%,transparent)]",
  upcoming: "bg-background border-border",
};

const labelColor = {
  done: "text-foreground",
  current: "text-foreground",
  upcoming: "text-muted-foreground",
};

const toneNode = {
  default: "",
  warning: "border-warning",
  danger: "border-destructive",
};

const toneLabel = {
  default: "",
  warning: "text-amber-600",
  danger: "text-destructive",
};
