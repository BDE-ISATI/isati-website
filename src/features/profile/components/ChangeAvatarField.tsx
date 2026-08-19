import { useEffect, useState } from "react";
import imageCompression, { type Options } from "browser-image-compression";
import type { Area } from "react-easy-crop";
import type { UsersRecord } from "@/shared/types/pocketbase-types";
import pb from "@/shared/lib/pocketbase";
import cn from "@/shared/utils/cn";
import cropImage from "@/shared/lib/cropImage";
import Button from "@/shared/components/ui/Button";
import ImageCrop from "@/shared/components/ui/ImageCrop";
import ChangeAvatarButton from "./ChangeAvatarButton";
import XIcon from "@/assets/icons/x.svg?react"
import CircleAlert from "@/assets/icons/circle-alert.svg?react"

const AVATAR_SIZES = [
  { thumb: "200x200", className: "w-16 h-16 sm:w-28 sm:h-28" },
  { thumb: "100x100", className: "w-12 h-12 sm:w-20 sm:h-20" },
  { thumb: "50x50", className: "w-10 h-10" },
]

const COMPRESSION_OPTIONS: Options = {
  maxSizeMB: 0.3,         
  maxWidthOrHeight: 512, 
  useWebWorker: true,  
  fileType: 'image/webp',
  initialQuality: 0.85,
}

interface ChangeAvatarFieldProps {
  user: NoInfer<UsersRecord>,
  onConfirm: (avatarFile: File) => void,
  isLoading: boolean,
  error: Error | null,
}

export default function ChangeAvatarField({ user, onConfirm, isLoading, error }: ChangeAvatarFieldProps) {

  const [ imageSrc, setImageSrc ] = useState<string | null>(null);
  const [ croppedArea, setCroppedArea ] = useState<Area | null>(null);
  const [ isCompressing, setIsCompressing ] = useState<boolean>(false);
  const [ cropError, setCropError ] = useState<string | null>(null);

  useEffect(() => {
    if (!imageSrc) return;
    return () => URL.revokeObjectURL(imageSrc);
  }, [imageSrc]);

  function handleFileSelect(avatarFile: File) {
    setCropError(null);
    setCroppedArea(null);
    setImageSrc(URL.createObjectURL(avatarFile));
  }

  function handleCancel() {
    setImageSrc(null);
    setCroppedArea(null);
  }

  async function handleConfirm() {
    if (!imageSrc || !croppedArea) return;
    setIsCompressing(true);
    setCropError(null);
    try {
      const croppedBlob = await cropImage(imageSrc, croppedArea);
      const croppedFile = new File([croppedBlob], "avatar.webp", { type: "image/webp" });
      onConfirm(await imageCompression(croppedFile, COMPRESSION_OPTIONS));
      handleCancel();
    } catch {
      setCropError("Impossible de traiter cette image.");
    } finally {
      setIsCompressing(false);
    }
  }

  return (
    <div className="flex flex-col gap-2 p-3 text-sm">
      {imageSrc ? (
        <>
          <dt className="text-muted-foreground">Photo de profil</dt>
          <dd className="flex flex-col gap-2">
            <ImageCrop src={imageSrc} onAreaChange={setCroppedArea} />
            <div className="flex flex-row items-center justify-end gap-2">
              <Button onClick={handleConfirm} size="small" disabled={isCompressing || isLoading || !croppedArea} className="shrink-0">
                Confirmer
              </Button>
              <Button onClick={handleCancel} variant="destructiveGhost" size="small" aria-label="Annuler" className="shrink-0 p-1.5">
                <XIcon className="w-4 h-4" />
              </Button>
            </div>
          </dd>
        </>
      ) : (
        <div className="flex flex-row items-center justify-between gap-3">
          <div className="flex flex-col min-w-0">
            <dt className="text-muted-foreground">Photo de profil</dt>
            <dd className="flex flex-row items-end pt-1">
              {AVATAR_SIZES.map((size) => (
                <img
                  key={size.thumb}
                  src={user.avatar ? pb.files.getURL(user, user.avatar, { thumb: size.thumb }) : undefined}
                  alt={user.username}
                  className={cn("rounded-full border border-border object-cover shrink-0", size.className)}
                />
              ))}
            </dd>
          </div>
          <ChangeAvatarButton onFileSelect={handleFileSelect} disabled={isLoading} />
        </div>
      )}

      {(cropError || error) && (
        <div className="flex flex-row items-center gap-1 text-status-critical">
          <CircleAlert className="w-3 h-3 shrink-0"/>
          <span className="text-xs">
            {cropError ?? error?.message}
          </span>
        </div>
      )}
    </div>
  );
}
