import { useState, type ComponentProps } from "react";
import Input from "@/shared/components/ui/Input";
import cn from "@/shared/utils/cn";
import eyeOff from "@/assets/icons/eye-closed.svg";
import eye from "@/assets/icons/eye-open.svg";

type PasswordInputProps = Omit<ComponentProps<typeof Input>, "type"> & {
  wrapperClassName?: string,
}

export default function PasswordInput({ className, wrapperClassName, ...inputProps }: PasswordInputProps) {

  const [ isVisible, setIsVisible ] = useState<boolean>(false);

  return (
    <div className={cn("flex relative", wrapperClassName)}>
      <Input
        type={isVisible ? "text" : "password"}
        className={cn("pr-9", className)}
        {...inputProps}
      />
      <button
        type="button"
        onClick={() => setIsVisible((c) => !c)}
        aria-label={isVisible ? "Masquer le mot de passe" : "Afficher le mot de passe"}
        className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <img className="w-4 h-4" src={isVisible ? eye : eyeOff} alt="" />
      </button>
    </div>
  );
}
