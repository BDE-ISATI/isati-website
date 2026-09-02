import { useState } from "react";
import { Link } from "react-router";
import { darken } from "color2k";
import pb from "@/shared/lib/pocketbase";
import type { ValidationWithRelations } from "@/shared/types/sharedTypes";
import proofFiles, { proofThumbUrl } from "@/features/wei/libs/proof";
import ProofLightbox from "@/features/wei/components/ProofLightbox";
import { formatRelative, parsePbDate } from "@/shared/lib/dates";
import cn from "@/shared/utils/cn";

interface ValidationTileProps {
  validation: ValidationWithRelations
  showChallenge?: boolean
  authorLink?: boolean
  now?: number
  className?: string
}

const dateFormat = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });

export default function ValidationTile({ validation, showChallenge, authorLink, now, className }: ValidationTileProps) {
  const team = validation.expand?.team;
  const user = validation.expand?.user;
  const challenge = validation.expand?.challenge;
  const date = parsePbDate(validation.reviewed_at || validation.submitted_at);

  const proofs = proofFiles(validation);
  const avatarURL = user?.avatar ? pb.files.getURL(user, user.avatar, { thumb: "100x100" }) : undefined;
  const when = !date ? "-" : now === undefined ? dateFormat.format(date) : formatRelative(date, now);
  const [ isOpen, setIsOpen ] = useState<boolean>(false);

  const author = (
    <>
      <img
        src={avatarURL}
        alt=""
        className="h-6 w-6 shrink-0 rounded-full border border-white/40 object-cover"
      />
      <span className="flex min-w-0 flex-col leading-tight">
        <span className="truncate text-xs font-medium">{user?.username || "Participant inconnu"}</span>
        <span className="truncate text-[10px] opacity-80">{when}</span>
      </span>
    </>
  );

  return (
    <article className={cn("relative aspect-[9/16] overflow-hidden rounded-md border border-border bg-muted", className)}>
      {proofs.length > 0 ? (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label={proofs.length > 1 ? `Voir les ${proofs.length} preuves` : "Voir la preuve en grand"}
          className="absolute inset-0 cursor-pointer"
        >
          <Proof validation={validation} />
        </button>
      ) : (
        <Proof validation={validation} />
      )}

      {proofs.length > 1 && (
        <span className="pointer-events-none absolute top-2 right-2 z-10 rounded-md bg-black/70 px-1.5 py-0.5 text-xs font-medium text-white">
          +{proofs.length - 1}
        </span>
      )}

      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex flex-col items-start gap-1 p-2">
        {team && (
          <span
            style={{
              backgroundColor: team.color,
              borderColor: team.color ? darken(team.color, 0.09) : undefined,
            }}
            className="max-w-full truncate rounded-md border-2 px-1.5 py-0.5 text-xs font-medium text-white"
          >
            {team.name}
          </span>
        )}

        {showChallenge && challenge && (
          <Link
            to={`/wei/challenge/${challenge.id}`}
            className="pointer-events-auto max-w-full truncate rounded-md bg-black/60 px-1.5 py-0.5 text-xs font-medium text-white hover:underline"
          >
            {challenge.title || "Défi"}
          </Link>
        )}
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/85 to-transparent p-2 pt-6 text-white">
        {authorLink && user ? (
          <Link to={`/profile/${user.username}`} className="pointer-events-auto flex flex-row items-center gap-2 hover:underline">
            {author}
          </Link>
        ) : (
          <div className="flex flex-row items-center gap-2">{author}</div>
        )}
      </div>

      {proofs.length > 0 && (
        <ProofLightbox validation={validation} open={isOpen} onClose={() => setIsOpen(false)} />
      )}
    </article>
  );
}

function Proof({ validation }: { validation: ValidationWithRelations }) {
  const [ first ] = proofFiles(validation);

  if (first) {
    return first.isVideo ? (
      <video src={first.url} muted playsInline preload="metadata" className="absolute inset-0 h-full w-full object-cover" />
    ) : (
      <img
        src={proofThumbUrl(validation, first, "300x500")}
        alt="Preuve"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
    );
  }

  if (validation.proof_text) {
    return (
      <a
        href={validation.proof_text}
        target="_blank"
        rel="noreferrer"
        className="absolute inset-0 flex items-center justify-center p-3 text-center text-xs break-all text-link underline"
      >
        {validation.proof_text}
      </a>
    );
  }

  return (
    <p className="absolute inset-0 flex items-center justify-center p-3 text-center text-xs text-muted-foreground">
      Preuve non publique.
    </p>
  );
}
