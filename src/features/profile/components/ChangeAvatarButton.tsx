import Button from "@/shared/components/ui/Button";
import PenIcon from "@/assets/icons/pen.svg?react"
import { useRef } from "react";
import useUpdateProfilePicture from "../hooks/useUpdateProfilePicture";
import type { UsersRecord } from "@/shared/types/pocketbase-types";

interface ChangeAvatarButtonProps {
  user: NoInfer<UsersRecord>
}


export default function ChangeAvatarButton( { user } :  ChangeAvatarButtonProps) {
  
  const fileSelectorRef = useRef<HTMLInputElement>(null);
  const {update, isLoading, error} = useUpdateProfilePicture()
  
  function handleOnchangeInput(e: React.ChangeEvent<HTMLInputElement>) {
    const newAvatarFile = e.target.files?.[0]
    if (newAvatarFile) {
      update({userId: user.id, avatarFile: newAvatarFile })
    }
    
  }

  return (
    <>
      <input ref={fileSelectorRef} accept="image/*" type="file" className="hidden" onChange={handleOnchangeInput}/>
      <Button onClick={() => fileSelectorRef.current?.click()} variant="secondary" size="small" className="gap-1.5 shrink-0">
        <PenIcon className="w-4 h-4" />
        Changer
      </Button>
    </>
  )
}