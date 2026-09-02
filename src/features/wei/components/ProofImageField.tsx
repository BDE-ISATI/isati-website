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

export type ProofFileValue = File[];

interface ProofImageFieldProps {
  value: ProofFileValue
  onChange: (value: ProofFileValue) => void
  max: number
}

export default function ProofImageField({ value, onChange, max }: ProofImageFieldProps) {

  const fileSelectorRef = useRef<HTMLInputElement>(null);
  const [ isCompressing, setIsCompressing ] = useState<boolean>(false);
  const [ compressionError, setCompressionError ] = useState<string | null>(null);
  const [ previews, setPreviews ] = useState<string[]>([]);

  const isFull = value.length >= max;

  useEffect(() => {
    const urls = value.map((file) => URL.createObjectURL(file));
    setPreviews(urls);
    return () => urls.forEach((url) => URL.revokeObjectURL(url));
  }, [value]);

  async function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []).slice(0, max - value.length);
    event.target.value = "";
    if (files.length === 0) return;

    setIsCompressing(true);
    setCompressionError(null);
    try {
      const compressed = await Promise.all(files.map(async (file, index) => {
        const result = await imageCompression(file, COMPRESSION_OPTIONS);
        return new File([result], `preuve-${value.length + index + 1}.webp`, { type: "image/webp" });
      }));
      onChange([...value, ...compressed]);
    } catch {
      setCompressionError("Impossible de traiter cette image.");
    } finally {
      setIsCompressing(false);
    }
  }

  function handleRemove(index: number) {
    onChange(value.filter((_, position) => position !== index));
  }

  return (
    <div className="flex flex-col gap-2">
      <input
        ref={fileSelectorRef}
        accept="image/*"
        type="file"
        multiple={max > 1}
        className="hidden"
        onChange={handleFileSelect}
      />

      {previews.length > 0 ? (
        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {previews.map((preview, index) => (
            <li key={preview} className="relative">
              <img
                src={preview}
                alt={`Aperçu de la preuve ${index + 1}`}
                className="aspect-square w-full rounded-md border border-border object-cover"
              />
              <Button
                type="button"
                onClick={() => handleRemove(index)}
                variant="destructiveGhost"
                size="icon"
                aria-label={`Retirer l'image ${index + 1}`}
                className="absolute top-1 right-1 bg-card/90"
              >
                <XIcon className="h-4 w-4" />
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex aspect-video w-full items-center justify-center rounded-md border border-dashed border-input bg-muted">
          <span className="text-sm text-muted-foreground">
            {isCompressing ? "Traitement des images…" : "Aucune image"}
          </span>
        </div>
      )}

      <div className="flex flex-row items-center justify-between gap-2">
        <span className="text-xs text-muted-foreground">
          {isCompressing ? "Traitement des images…" : `${value.length} / ${max}`}
        </span>

        <Button
          type="button"
          onClick={() => fileSelectorRef.current?.click()}
          variant="secondary"
          size="small"
          disabled={isCompressing || isFull}
        >
          <PenIcon className="h-4 w-4" />
          {value.length > 0 ? "Ajouter" : "Choisir une image"}
        </Button>
      </div>

      <Error message={compressionError ?? undefined} />
    </div>
  );
}
