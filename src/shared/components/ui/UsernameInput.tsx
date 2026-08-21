import { useEffect, useState, type ChangeEvent, type ComponentProps } from "react";
import Input from "@/shared/components/ui/Input";
import Error from "@/shared/components/ui/Error";
import useDebounce from "@/shared/hook/useDebounce";
import useIsUsernameUnique from "@/shared/hook/useIsUsernameUnique";
import Check from "@/assets/icons/check.svg?react"
import Loader from "@/assets/icons/loader.svg?react"
import { getFirstErrorMessage } from "@/shared/lib/pocketbase-errors";

interface UsernameInputProps extends ComponentProps<typeof Input> {
  validationError?: string,
  submitError?: string,
}






export default function UsernameInput({ validationError, submitError, onChange, ...inputProps }: UsernameInputProps) {

  const [ username, setUsername ] = useState<string>("");
  const debouncedUsername = useDebounce(username, 300);
  const { isLoading, isUnique , error} = useIsUsernameUnique(debouncedUsername);

  const showStatus = username.length >= 2;
  const isChecking = isLoading || username !== debouncedUsername;

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setUsername(event.target.value);
    onChange?.(event);
  }

  useEffect(() => {
    console.dir(error)
  },[error])

  return (
    <div className="flex w-full flex-col gap-1">
      <Input type="text"
        variant={validationError ? "error" : (!showStatus || isChecking ? "normal" : (isUnique ? "success" : "error"))}
        onChange={handleChange}
        {...inputProps}
      />

      <div className="flex flex-row items-center gap-2">
        {validationError ? (
          <Error message={validationError}/>
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
            <Error message={error ? getFirstErrorMessage(error) : "Déjà utilisé"}/>
          )
        )}

        <Error message={submitError} className="ml-auto text-right"/>
      </div>
    </div>
  );
}
