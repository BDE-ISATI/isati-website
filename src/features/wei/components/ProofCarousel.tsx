import { useState } from "react";
import type { ValidationWithRelations } from "@/shared/types/sharedTypes";
import proofFiles, { type ProofFile } from "@/features/wei/libs/proof";
import Button from "@/shared/components/ui/Button";
import ChevronRight from "@/assets/icons/chevron-right.svg?react";
import cn from "@/shared/utils/cn";
import { safeHref } from "@/shared/lib/validation";

interface ProofCarouselProps {
  validation: ValidationWithRelations
  className?: string
}

export default function ProofCarousel({ validation, className }: ProofCarouselProps) {

  const proofs = proofFiles(validation);
  const [ index, setIndex ] = useState<number>(0);

  const current = Math.min(index, Math.max(0, proofs.length - 1));
  const proofTextHref = safeHref(validation.proof_text);

  function go(step: number) {
    const next = current + step;
    if (next < 0) return setIndex(proofs.length - 1);
    if (next >= proofs.length) return setIndex(0);
    setIndex(next);
  }

  if (proofs.length === 0) {
    if (validation.proof_text) {
      if (!proofTextHref) {
        return <p className={cn("w-fit break-all text-sm text-muted-foreground", className)}>{validation.proof_text}</p>;
      }

      return (
        <a
          href={proofTextHref}
          target="_blank"
          rel="noreferrer"
          className={cn("w-fit break-all text-sm text-link underline", className)}
        >
          {validation.proof_text}
        </a>
      );
    }

    return <p className={cn("text-sm text-muted-foreground", className)}>Aucune preuve accessible.</p>;
  }

  return (
    <div
      tabIndex={0}
      role="group"
      aria-label={`Preuves de la soumission, ${proofs.length} au total`}
      onKeyDown={(event) => {
        if (proofs.length < 2) return;
        if (event.key === "ArrowLeft") { event.preventDefault(); go(-1); }
        if (event.key === "ArrowRight") { event.preventDefault(); go(1); }
      }}
      className={cn("flex flex-col gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", className)}
    >
      <div className="relative">
        {proofs.map((proof, position) => (
          Math.abs(position - current) <= 1 && (
            <ProofMedia
              key={proof.name}
              proof={proof}
              active={position === current}
              position={position}
              total={proofs.length}
            />
          )
        ))}

        {proofs.length > 1 && (
          <>
            <Button
              type="button"
              onClick={() => go(-1)}
              variant="secondary"
              size="icon"
              aria-label="Preuve précédente"
              className="absolute top-1/2 left-2 -translate-y-1/2 opacity-90"
            >
              <ChevronRight aria-hidden="true" className="h-5 w-5 rotate-180" />
            </Button>
            <Button
              type="button"
              onClick={() => go(1)}
              variant="secondary"
              size="icon"
              aria-label="Preuve suivante"
              className="absolute top-1/2 right-2 -translate-y-1/2 opacity-90"
            >
              <ChevronRight aria-hidden="true" className="h-5 w-5" />
            </Button>
          </>
        )}
      </div>

      {proofs.length > 1 && (
        <div className="flex flex-row items-center justify-center gap-3">
          <div className="flex flex-row items-center gap-1.5">
            {proofs.map((proof, position) => (
              <button
                key={proof.name}
                type="button"
                onClick={() => setIndex(position)}
                aria-label={`Voir la preuve ${position + 1}`}
                aria-current={position === current}
                className={cn(
                  "h-2 w-2 cursor-pointer rounded-full border border-border transition",
                  position === current ? "bg-foreground" : "bg-muted",
                )}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            {current + 1} / {proofs.length}
          </span>
        </div>
      )}

      {validation.proof_text && (
        proofTextHref ? (
          <a
            href={proofTextHref}
            target="_blank"
            rel="noreferrer"
            className="w-fit break-all text-sm text-link underline"
          >
            {validation.proof_text}
          </a>
        ) : (
          <p className="w-fit break-all text-sm text-muted-foreground">{validation.proof_text}</p>
        )
      )}
    </div>
  );
}

function ProofMedia({ proof, active, position, total }: { proof: ProofFile, active: boolean, position: number, total: number }) {

  const label = total > 1 ? `Preuve ${position + 1} sur ${total}` : "Preuve";

  return (
    <div hidden={!active}>
      {proof.isVideo ? (
        <video
          src={proof.url}
          controls
          playsInline
          preload="none"
          aria-label={label}
          className="max-h-[70vh] w-full rounded-md border border-border bg-black"
        />
      ) : (
        <a href={proof.url} target="_blank" rel="noreferrer" aria-label={`${label} - ouvrir dans un nouvel onglet`}>
          <img
            src={proof.url}
            alt={label}
            loading="lazy"
            className="max-h-[70vh] w-full rounded-md border border-border object-contain"
          />
        </a>
      )}
    </div>
  );
}
