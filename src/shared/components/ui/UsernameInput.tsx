import type { ComponentProps, ReactNode } from "react";
import Input from "@/shared/components/ui/Input";
import CircleAlert from "@/assets/icons/circle-alert.svg?react"
import Check from "@/assets/icons/check.svg?react"
import Loader from "@/assets/icons/loader.svg?react"

interface UsernameInputProps extends ComponentProps<typeof Input> {
  showStatus: boolean,
  isChecking: boolean,
  isUnique?: boolean,
  validationError?: string,
  submitError?: string,
  actions?: ReactNode,
}


export default function UsernameInput({ showStatus, isChecking, isUnique, validationError, submitError, actions, ...inputProps }: UsernameInputProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-row items-center gap-2">
        <Input type="text"
          variant={validationError ? "erreur" : (!showStatus || isChecking ? "normal" : (isUnique ? "ok" : "erreur"))}
          {...inputProps}
        />
        {actions}
      </div>

      <div className="flex flex-row items-center gap-2">
        {validationError ? (
          <div className="flex flex-row items-center gap-1 text-status-critical">
            <CircleAlert className="w-3 h-3 shrink-0"/>
            <span className="text-xs">
              {validationError}
            </span>
          </div>
        ) : showStatus && (
          isChecking ? (
            <div className="flex flex-row items-center gap-1 text-muted-foreground">
              <Loader className="w-3 h-3 animate-spin shrink-0"/>
              <span className="text-xs">
                Vérification…
              </span>
            </div>
          ) : isUnique ? (
            <div className="flex flex-row items-center gap-1 text-status-success">
              <Check className="w-3 h-3 shrink-0"/>
              <span className="text-xs">
                Disponible
              </span>
            </div>
          ) : (
            <div className="flex flex-row items-center gap-1 text-status-critical">
              <CircleAlert className="w-3 h-3 shrink-0"/>
              <span className="text-xs">
                Déjà utilisé
              </span>
            </div>
          )
        )}

        {submitError && (
          <div className="flex flex-row items-center gap-1 ml-auto text-status-critical">
            <CircleAlert className="w-3 h-3 shrink-0"/>
            <span className="text-xs text-right">
              {submitError}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
