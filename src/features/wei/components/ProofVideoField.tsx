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

export type ProofVideoValue = File | null;

interface ProofVideoFieldProps {
  value: ProofVideoValue
  onChange: (value: ProofVideoValue) => void
}

function formatSize(bytes: number) {
  return `${(bytes / 1_000_000).toFixed(1)} Mo`;
}

export default function ProofVideoField({ value, onChange }: ProofVideoFieldProps) {

  const fileSelectorRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const [ status, setStatus ] = useState<"idle" | "reading" | "compressing">("idle");
  const [ progress, setProgress ] = useState<number>(0);
  const [ bytesWritten, setBytesWritten ] = useState<number>(0);
  const [ compressionError, setCompressionError ] = useState<string | null>(null);
  const [ preview, setPreview ] = useState<string | undefined>(undefined);

  const isBusy = status !== "idle";
  useWakeLock(isBusy);

  useEffect(() => {
    if (!value) {
      setPreview(undefined);
      return;
    }
    const url = URL.createObjectURL(value);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [value]);

  useEffect(() => () => abortRef.current?.abort(), []);

  async function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file || isBusy) return;

    const controller = new AbortController();
    abortRef.current = controller;

    onChange(null);
    setCompressionError(null);
    setProgress(0);
    setBytesWritten(0);
    setStatus("reading");

    try {
      const result = await compressVideo(file, {
        signal: controller.signal,
        onProgress: (ratio, written) => {
          setStatus("compressing");
          setProgress(ratio);
          setBytesWritten(written);
        },
      });
      if (!controller.signal.aborted) onChange(result.file);
    } catch (err) {
      if (!controller.signal.aborted) {
        setCompressionError(
          err instanceof CompressVideoError
            ? ERROR_MESSAGES[err.code]
            : ERROR_MESSAGES.conversion_failed
        );
      }
    } finally {
      abortRef.current = null;
      setStatus("idle");
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <input ref={fileSelectorRef} accept="video/*" type="file" className="hidden" onChange={handleFileSelect} />

      {preview ? (
        <video
          src={preview}
          controls
          playsInline
          preload="metadata"
          className="aspect-video w-full rounded-md border border-border bg-black object-contain"
        />
      ) : (
        <div className="flex aspect-video w-full flex-col items-center justify-center gap-3 rounded-md border border-dashed border-input bg-muted px-6">
          {isBusy ? (
            <>
              <p className="text-sm text-muted-foreground">
                {status === "reading" ? "Lecture de la vidéo…" : `Compression… ${Math.round(progress * 100)} %`}
              </p>
              <ProgressBar value={progress} label="Progression de la compression" className="max-w-xs" />
              {bytesWritten > 0 && (
                <p className="text-xs text-muted-foreground">{formatSize(bytesWritten)}</p>
              )}
              <p className="text-center text-xs text-muted-foreground">
                Garde l'écran allumé et ne change pas d'application pendant le traitement.
              </p>
            </>
          ) : (
            <span className="text-sm text-muted-foreground">Aucune vidéo</span>
          )}
        </div>
      )}

      {value && !isBusy && (
        <p className="text-xs text-muted-foreground">Vidéo prête - {formatSize(value.size)}</p>
      )}

      <div className="flex flex-row items-center justify-end gap-2">
        {isBusy ? (
          <Button type="button" onClick={() => abortRef.current?.abort()} variant="destructiveGhost" size="small">
            Annuler
          </Button>
        ) : (
          <>
            <Button type="button" onClick={() => fileSelectorRef.current?.click()} variant="secondary" size="small">
              <PenIcon className="h-4 w-4" />
              {preview ? "Changer" : "Choisir une vidéo"}
            </Button>
            {preview && (
              <Button type="button" onClick={() => onChange(null)} variant="destructiveGhost" size="icon" aria-label="Retirer la vidéo">
                <XIcon className="h-4 w-4" />
              </Button>
            )}
          </>
        )}
      </div>

      <Error message={compressionError ?? undefined} />
    </div>
  );
}
