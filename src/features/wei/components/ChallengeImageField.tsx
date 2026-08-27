import { useEffect, useRef, useState } from "react";
import imageCompression, { type Options } from "browser-image-compression";
import type { Area } from "react-easy-crop";

import cropImage from "@/shared/lib/cropImage";
import ImageCrop from "@/shared/components/ui/ImageCrop";
import Button from "@/shared/components/ui/Button";
import Error from "@/shared/components/ui/Error";
import PenIcon from "@/assets/icons/pen.svg?react";
import XIcon from "@/assets/icons/x.svg?react";

const COMPRESSION_OPTIONS: Options = {
  maxSizeMB: 0.5,
  maxWidthOrHeight: 1280,
  useWebWorker: true,
  fileType: "image/webp",
  initialQuality: 0.85,
};

export type ChallengeImageValue = File | null | undefined;

interface ChallengeImageFieldProps {
  value: ChallengeImageValue
  onChange: (value: ChallengeImageValue) => void
  currentUrl?: string
}

export default function ChallengeImageField({ value, onChange, currentUrl }: ChallengeImageFieldProps) {

  const fileSelectorRef = useRef<HTMLInputElement>(null);
  const [ imageSrc, setImageSrc ] = useState<string | null>(null);
  const [ croppedArea, setCroppedArea ] = useState<Area | null>(null);
  const [ isCompressing, setIsCompressing ] = useState<boolean>(false);
  const [ cropError, setCropError ] = useState<string | null>(null);
  const [ preview, setPreview ] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!imageSrc) return;
    return () => URL.revokeObjectURL(imageSrc);
  }, [imageSrc]);

  useEffect(() => {
    if (!(value instanceof Blob)) {
      setPreview(value === null ? undefined : currentUrl);
      return;
    }
    const url = URL.createObjectURL(value);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [value, currentUrl]);

  function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      setCropError(null);
      setCroppedArea(null);
      setImageSrc(URL.createObjectURL(file));
    }
    event.target.value = "";
  }

  function handleCancelCrop() {
    setImageSrc(null);
    setCroppedArea(null);
  }

  async function handleConfirmCrop() {
    if (!imageSrc || !croppedArea) return;
    setIsCompressing(true);
    setCropError(null);
    try {
      const croppedBlob = await cropImage(imageSrc, croppedArea);
      const croppedFile = new File([croppedBlob], "challenge.webp", { type: "image/webp" });
      const compressed = await imageCompression(croppedFile, COMPRESSION_OPTIONS);
      onChange(new File([compressed], "challenge.webp", { type: "image/webp" }));
      handleCancelCrop();
    } catch {
      setCropError("Impossible de traiter cette image.");
    } finally {
      setIsCompressing(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <input ref={fileSelectorRef} accept="image/*" type="file" className="hidden" onChange={handleFileSelect} />

      {imageSrc ? (
        <>
          <ImageCrop src={imageSrc} aspect={16 / 9} cropShape="rect" onAreaChange={setCroppedArea} />
          <div className="flex flex-row items-center justify-end gap-2">
            <Button type="button" onClick={handleConfirmCrop} size="small" disabled={isCompressing || !croppedArea}>
              Confirmer
            </Button>
            <Button type="button" onClick={handleCancelCrop} variant="destructiveGhost" size="icon" aria-label="Annuler le recadrage">
              <XIcon className="h-4 w-4" />
            </Button>
          </div>
        </>
      ) : (
        <>
          {preview ? (
            <img src={preview} alt="Aperçu du défi" className="aspect-video w-full rounded-md border border-border object-cover" />
          ) : (
            <div className="flex aspect-video w-full items-center justify-center rounded-md border border-dashed border-input bg-muted">
              <span className="text-sm text-muted-foreground">Aucune image</span>
            </div>
          )}

          <div className="flex flex-row items-center justify-end gap-2">
            <Button type="button" onClick={() => fileSelectorRef.current?.click()} variant="secondary" size="small">
              <PenIcon className="h-4 w-4" />
              {preview ? "Changer" : "Choisir une image"}
            </Button>
            {preview && (
              <Button type="button" onClick={() => onChange(null)} variant="destructiveGhost" size="icon" aria-label="Retirer l'image">
                <XIcon className="h-4 w-4" />
              </Button>
            )}
          </div>
        </>
      )}

      <Error message={cropError ?? undefined} />
    </div>
  );
}
