import { useEffect, useRef, useState } from "react";
import imageCompression, { type Options } from "browser-image-compression";

import Button from "@/shared/components/ui/Button";
import Error from "@/shared/components/ui/Error";
import PenIcon from "@/assets/icons/pen.svg?react";
import XIcon from "@/assets/icons/x.svg?react";

const COMPRESSION_OPTIONS: Options = {
  maxSizeMB: 1,
  maxWidthOrHeight: 1600,
  useWebWorker: true,
  fileType: "image/webp",
  initialQuality: 0.85,
};

export type ProofFileValue = File | null;

interface ProofImageFieldProps {
  value: ProofFileValue
  onChange: (value: ProofFileValue) => void
}

export default function ProofImageField({ value, onChange }: ProofImageFieldProps) {

  const fileSelectorRef = useRef<HTMLInputElement>(null);
  const [ isCompressing, setIsCompressing ] = useState<boolean>(false);
  const [ compressionError, setCompressionError ] = useState<string | null>(null);
  const [ preview, setPreview ] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!value) {
      setPreview(undefined);
      return;
    }
    const url = URL.createObjectURL(value);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [value]);

  async function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    setIsCompressing(true);
    setCompressionError(null);
    try {
      const compressed = await imageCompression(file, COMPRESSION_OPTIONS);
      onChange(new File([compressed], "preuve.webp", { type: "image/webp" }));
    } catch {
      setCompressionError("Impossible de traiter cette image.");
    } finally {
      setIsCompressing(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <input ref={fileSelectorRef} accept="image/*" type="file" className="hidden" onChange={handleFileSelect} />

      {preview ? (
        <img src={preview} alt="Aperçu de la preuve" className="aspect-video w-full rounded-md border border-border object-cover" />
      ) : (
        <div className="flex aspect-video w-full items-center justify-center rounded-md border border-dashed border-input bg-muted">
          <span className="text-sm text-muted-foreground">
            {isCompressing ? "Traitement de l'image…" : "Aucune image"}
          </span>
        </div>
      )}

      <div className="flex flex-row items-center justify-end gap-2">
        <Button
          type="button"
          onClick={() => fileSelectorRef.current?.click()}
          variant="secondary"
          size="small"
          disabled={isCompressing}
        >
          <PenIcon className="h-4 w-4" />
          {preview ? "Changer" : "Choisir une image"}
        </Button>
        {preview && (
          <Button type="button" onClick={() => onChange(null)} variant="destructiveGhost" size="icon" aria-label="Retirer l'image">
            <XIcon className="h-4 w-4" />
          </Button>
        )}
      </div>

      <Error message={compressionError ?? undefined} />
    </div>
  );
}
