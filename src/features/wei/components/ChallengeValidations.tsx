import pb from "@/shared/lib/pocketbase";
import { darken } from "color2k";
import type { ChallengeWithRelations, ValidationWithRelations } from "@/shared/types/sharedTypes";
import useChallengeValidations from "@/features/wei/hooks/queries/useChallengeValidations";
import { getFirstErrorMessage } from "@/shared/lib/pocketbase-errors";
import { parsePbDate } from "@/shared/lib/dates";
import Error from "@/shared/components/ui/Error";
import cn from "@/shared/utils/cn";

interface ChallengeValidationsProps {
  challenge: ChallengeWithRelations
  className?: string
}

const dateFormat = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });

export default function ChallengeValidations({ challenge, className }: ChallengeValidationsProps) {
  const validations = useChallengeValidations(challenge.id);

  return (
    <section
      className={cn(
        "w-full rounded-md border border-border bg-card p-4 text-card-foreground shadow-sm sm:p-6",
        className,
      )}
    >
      <h2 className="text-lg font-semibold">Derniers validés</h2>

      <Error className="mt-2" message={getFirstErrorMessage(validations.error)} />

      {validations.data?.length === 0 && (
        <p className="mt-2 text-sm text-muted-foreground">Personne n'a encore validé ce défi.</p>
      )}

      <ul className="mt-4 flex flex-row gap-3 overflow-x-auto pb-2">
        {validations.data?.map((validation) => (
          <li key={validation.id} className="w-40 shrink-0 sm:w-44">
            <ValidationTile validation={validation} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function ValidationTile({ validation }: { validation: ValidationWithRelations }) {
  const team = validation.expand?.team;
  const user = validation.expand?.user;
  const date = parsePbDate(validation.reviewed_at || validation.submitted_at);

  const fileURL = validation.proof_file ? pb.files.getURL(validation, validation.proof_file) : undefined;
  const avatarURL = user?.avatar ? pb.files.getURL(user, user.avatar, { thumb: "100x100" }) : undefined;

  const card = (
    <article className="relative aspect-[9/16] overflow-hidden rounded-md border border-border bg-muted">
      <Proof validation={validation} />

      {team && (
        <span
          style={{
            backgroundColor: team.color,
            borderColor: team.color ? darken(team.color, 0.09) : undefined,
          }}
          className="absolute top-2 left-2 max-w-[calc(100%-1rem)] truncate rounded-md border-2 px-1.5 py-0.5 text-xs font-medium text-white"
        >
          {team.name}
        </span>
      )}

      <div className="absolute inset-x-0 bottom-0 flex flex-row items-center gap-2 bg-gradient-to-t from-black/85 to-transparent p-2 pt-6 text-white">
        <img
          src={avatarURL}
          alt=""
          className="h-6 w-6 shrink-0 rounded-full border border-white/40 object-cover"
        />
        <span className="flex min-w-0 flex-col leading-tight">
          <span className="truncate text-xs font-medium">{user?.username || "Participant inconnu"}</span>
          <span className="truncate text-[10px] opacity-80">{date ? dateFormat.format(date) : "-"}</span>
        </span>
      </div>
    </article>
  );

  if (!fileURL) return card;

  return (
    <a href={fileURL} target="_blank" rel="noreferrer" aria-label="Voir la preuve en grand" className="block">
      {card}
    </a>
  );
}

function Proof({ validation }: { validation: ValidationWithRelations }) {
  if (validation.proof_file) {
    const fileURL = pb.files.getURL(validation, validation.proof_file);
    const thumbURL = pb.files.getURL(validation, validation.proof_file, { thumb: "300x500" });
    const isVideo = /\.(mp4|mov|webm|m4v)$/i.test(validation.proof_file);

    return isVideo ? (
      <video src={fileURL} muted playsInline preload="metadata" className="absolute inset-0 h-full w-full object-cover" />
    ) : (
      <img src={thumbURL} alt="Preuve" className="absolute inset-0 h-full w-full object-cover" />
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
