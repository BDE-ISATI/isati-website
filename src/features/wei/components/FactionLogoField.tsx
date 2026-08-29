import { useEffect, useRef, useState } from "react";
import imageCompression, { type Options } from "browser-image-compression";

import Button from "@/shared/components/ui/Button";
import Error from "@/shared/components/ui/Error";
import PenIcon from "@/assets/icons/pen.svg?react";
import XIcon from "@/assets/icons/x.svg?react";

const COMPRESSION_OPTIONS: Options = {
  maxSizeMB: 0.3,
  maxWidthOrHeight: 512,
  useWebWorker: true,
  fileType: "image/webp",
  initialQuality: 0.85,
};

export type FactionLogoValue = File | null | undefined;

interface FactionLogoFieldProps {
  value: FactionLogoValue
  onChange: (value: FactionLogoValue) => void
  currentUrl?: string
}

export default function FactionLogoField({ value, onChange, currentUrl }: FactionLogoFieldProps) {

  const fileSelectorRef = useRef<HTMLInputElement>(null);
  const [ isCompressing, setIsCompressing ] = useState<boolean>(false);
  const [ compressionError, setCompressionError ] = useState<string | null>(null);
  const [ preview, setPreview ] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!(value instanceof Blob)) {
      setPreview(value === null ? undefined : currentUrl);
      return;
    }
    const url = URL.createObjectURL(value);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [value, currentUrl]);

  async function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    setIsCompressing(true);
    setCompressionError(null);
    try {
      const compressed = await imageCompression(file, COMPRESSION_OPTIONS);
      onChange(new File([compressed], "faction.webp", { type: "image/webp" }));
    } catch {
      setCompressionError("Impossible de traiter cette image.");
    } finally {
      setIsCompressing(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <input ref={fileSelectorRef} accept="image/*" type="file" className="hidden" onChange={handleFileSelect} />

      <div className="flex flex-row items-center gap-3">
        {preview ? (
          <img src={preview} alt="Aperçu du logo" className="h-20 w-20 rounded-md border border-border object-cover" />
        ) : (
          <div className="flex h-20 w-20 items-center justify-center rounded-md border border-dashed border-input bg-muted text-center">
            <span className="text-xs text-muted-foreground">Aucun logo</span>
          </div>
        )}

        <div className="flex flex-row items-center gap-2">
          <Button
            type="button"
            onClick={() => fileSelectorRef.current?.click()}
            variant="secondary"
            size="small"
            disabled={isCompressing}
          >
            <PenIcon className="h-4 w-4" />
            {preview ? "Changer" : "Choisir un logo"}
          </Button>
          {preview && (
            <Button type="button" onClick={() => onChange(null)} variant="destructiveGhost" size="icon" aria-label="Retirer le logo">
              <XIcon className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      <Error message={compressionError ?? undefined} />
    </div>
  );
}
