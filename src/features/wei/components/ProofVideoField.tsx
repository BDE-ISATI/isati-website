import { useEffect, useRef, useState } from "react";

import compressVideo, { CompressVideoError, type CompressVideoCode } from "@/shared/lib/compressVideo";
import useWakeLock from "@/shared/hooks/useWakeLock";
import Button from "@/shared/components/ui/Button";
import Error from "@/shared/components/ui/Error";
import ProgressBar from "@/shared/components/ui/ProgressBar";
import PenIcon from "@/assets/icons/pen.svg?react";
import XIcon from "@/assets/icons/x.svg?react";

const ERROR_MESSAGES: Record<CompressVideoCode, string> = {
  no_video_track: "Ce fichier ne contient aucune piste vidéo.",
  no_encoder: "Ton navigateur ne sait pas compresser de vidéo. Envoie une vidéo plus légère, ou réessaie depuis Chrome ou Safari.",
  undecodable: "Ce format de vidéo n'est pas lisible par ton navigateur.",
  too_long: "Cette vidéo est trop longue. Filme une séquence de 90 secondes maximum.",
  conversion_failed: "La compression a échoué.",
};

export type ProofVideoValue = File[];

interface ProofVideoFieldProps {
  value: ProofVideoValue
  onChange: (value: ProofVideoValue) => void
  max: number
}

function formatSize(bytes: number) {
  return `${(bytes / 1_000_000).toFixed(1)} Mo`;
}

export default function ProofVideoField({ value, onChange, max }: ProofVideoFieldProps) {

  const fileSelectorRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const [ status, setStatus ] = useState<"idle" | "reading" | "compressing">("idle");
  const [ step, setStep ] = useState<{ current: number, total: number }>({ current: 0, total: 0 });
  const [ progress, setProgress ] = useState<number>(0);
  const [ bytesWritten, setBytesWritten ] = useState<number>(0);
  const [ compressionError, setCompressionError ] = useState<string | null>(null);
  const [ previews, setPreviews ] = useState<string[]>([]);

  const isBusy = status !== "idle";
  const isFull = value.length >= max;
  useWakeLock(isBusy);

  useEffect(() => {
    const urls = value.map((file) => URL.createObjectURL(file));
    setPreviews(urls);
    return () => urls.forEach((url) => URL.revokeObjectURL(url));
  }, [value]);

  useEffect(() => () => abortRef.current?.abort(), []);

  async function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []).slice(0, max - value.length);
    event.target.value = "";
    if (files.length === 0 || isBusy) return;

    const controller = new AbortController();
    abortRef.current = controller;

    setCompressionError(null);
    setProgress(0);
    setBytesWritten(0);
    setStep({ current: 1, total: files.length });
    setStatus("reading");

    const compressed: File[] = [];

    try {
      for (const [ index, file ] of files.entries()) {
        setStep({ current: index + 1, total: files.length });
        setStatus("reading");
        setProgress(0);
        setBytesWritten(0);

        const result = await compressVideo(file, {
          signal: controller.signal,
          onProgress: (ratio, written) => {
            setStatus("compressing");
            setProgress(ratio);
            setBytesWritten(written);
          },
        });

        if (controller.signal.aborted) break;
        compressed.push(new File([result.file], `preuve-${value.length + index + 1}.mp4`, { type: result.file.type }));
      }

      if (!controller.signal.aborted && compressed.length > 0) onChange([...value, ...compressed]);
    } catch (err) {
      if (!controller.signal.aborted) {
        setCompressionError(
          err instanceof CompressVideoError
            ? ERROR_MESSAGES[err.code]
            : ERROR_MESSAGES.conversion_failed
        );
        if (compressed.length > 0) onChange([...value, ...compressed]);
      }
    } finally {
      abortRef.current = null;
      setStatus("idle");
    }
  }

  function handleRemove(index: number) {
    onChange(value.filter((_, position) => position !== index));
  }

  return (
    <div className="flex flex-col gap-2">
      <input
        ref={fileSelectorRef}
        accept="video/*"
        type="file"
        multiple={max > 1}
        className="hidden"
        onChange={handleFileSelect}
      />

      {isBusy ? (
        <div className="flex aspect-video w-full flex-col items-center justify-center gap-3 rounded-md border border-dashed border-input bg-muted px-6">
          <p className="text-center text-sm text-muted-foreground">
            {step.total > 1 && `Vidéo ${step.current} / ${step.total} · `}
            {status === "reading" ? "Lecture de la vidéo…" : `Compression… ${Math.round(progress * 100)} %`}
          </p>
          <ProgressBar value={progress} label="Progression de la compression" className="max-w-xs" />
          {bytesWritten > 0 && (
            <p className="text-xs text-muted-foreground">{formatSize(bytesWritten)}</p>
          )}
          <p className="text-center text-xs text-muted-foreground">
            Garde l'écran allumé et ne change pas d'application pendant le traitement.
          </p>
        </div>
      ) : previews.length > 0 ? (
        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {previews.map((preview, index) => (
            <li key={preview} className="relative">
              <video
                src={preview}
                controls
                playsInline
                preload="metadata"
                className="aspect-video w-full rounded-md border border-border bg-black object-contain"
              />
              <Button
                type="button"
                onClick={() => handleRemove(index)}
                variant="destructiveGhost"
                size="icon"
                aria-label={`Retirer la vidéo ${index + 1}`}
                className="absolute top-1 right-1 bg-card/90"
              >
                <XIcon className="h-4 w-4" />
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex aspect-video w-full items-center justify-center rounded-md border border-dashed border-input bg-muted">
          <span className="text-sm text-muted-foreground">Aucune vidéo</span>
        </div>
      )}

      <div className="flex flex-row items-center justify-between gap-2">
        <span className="text-xs text-muted-foreground">
          {value.length} / {max}
          {value.length > 0 && !isBusy && ` · ${formatSize(value.reduce((total, file) => total + file.size, 0))}`}
        </span>

        {isBusy ? (
          <Button type="button" onClick={() => abortRef.current?.abort()} variant="destructiveGhost" size="small">
            Annuler
          </Button>
        ) : (
          <Button
            type="button"
            onClick={() => fileSelectorRef.current?.click()}
            variant="secondary"
            size="small"
            disabled={isFull}
          >
            <PenIcon className="h-4 w-4" />
            {value.length > 0 ? "Ajouter" : "Choisir une vidéo"}
          </Button>
        )}
      </div>

      <Error message={compressionError ?? undefined} />
    </div>
  );
}
