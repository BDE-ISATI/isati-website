import Button from "@/shared/components/ui/Button";
import PenIcon from "@/assets/icons/pen.svg?react"
import { useRef } from "react";

interface ChangeAvatarButtonProps {
  onFileSelect: (file: File) => void,
  disabled?: boolean,
}


export default function ChangeAvatarButton( { onFileSelect, disabled } :  ChangeAvatarButtonProps) {

  const fileSelectorRef = useRef<HTMLInputElement>(null);

  function handleOnchangeInput(e: React.ChangeEvent<HTMLInputElement>) {
    const newAvatarFile = e.target.files?.[0]
    if (newAvatarFile) {
      onFileSelect(newAvatarFile)
    }
    e.target.value = ""
  }

  return (
    <>
      <input ref={fileSelectorRef} accept="image/*" type="file" className="hidden" onChange={handleOnchangeInput}/>
      <Button onClick={() => fileSelectorRef.current?.click()} disabled={disabled} variant="secondary" size="small" className="shrink-0">
        <PenIcon className="w-4 h-4" />
        Changer
      </Button>
    </>
  )
}
