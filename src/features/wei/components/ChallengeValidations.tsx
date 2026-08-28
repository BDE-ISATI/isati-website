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
  const isTeamScope = challenge.scope === "team";

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

      <ul className="mt-4 flex flex-col divide-y divide-border">
        {validations.data?.map((validation) => (
          <li key={validation.id} className="flex flex-col gap-3 py-3 first:pt-0 last:pb-0">
            <div className="flex flex-row items-center gap-3">
              <Author validation={validation} isTeamScope={isTeamScope} />
              <span className="ml-auto shrink-0 text-xs text-muted-foreground">
                {formatDate(validation.reviewed_at || validation.submitted_at)}
              </span>
            </div>

            <Proof validation={validation} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function formatDate(iso?: string) {
  const date = parsePbDate(iso);
  return date ? dateFormat.format(date) : "—";
}

function Author({ validation, isTeamScope }: { validation: ValidationWithRelations, isTeamScope: boolean }) {
  const team = validation.expand?.team;
  const user = validation.expand?.user;

  if (isTeamScope) {
    if (!team) return <span className="text-sm text-muted-foreground">Équipe inconnue</span>;
    return (
      <span
        style={{
          backgroundColor: team.color,
          borderColor: team.color ? darken(team.color, 0.09) : undefined,
        }}
        className="inline-flex items-center rounded-md border-2 px-2 py-0.5 text-sm font-medium text-white"
      >
        {team.name}
      </span>
    );
  }

  if (!user) return <span className="text-sm text-muted-foreground">Participant inconnu</span>;

  const avatarURL = user.avatar ? pb.files.getURL(user, user.avatar, { thumb: "100x100" }) : undefined;

  return (
    <span className="flex min-w-0 flex-row items-center gap-2">
      <img
        src={avatarURL}
        alt=""
        className="h-8 w-8 shrink-0 rounded-full border border-border object-cover"
      />
      <span className="truncate text-sm font-medium">{user.username}</span>
    </span>
  );
}

function Proof({ validation }: { validation: ValidationWithRelations }) {
  if (validation.proof_file) {
    const fileURL = pb.files.getURL(validation, validation.proof_file);
    const thumbURL = pb.files.getURL(validation, validation.proof_file, { thumb: "300x300" });
    const isVideo = /\.(mp4|mov|webm|m4v)$/i.test(validation.proof_file);

    return (
      <a
        href={fileURL}
        target="_blank"
        rel="noreferrer"
        aria-label="Voir la preuve en grand"
        className="block w-fit overflow-hidden rounded-md border border-border"
      >
        {isVideo ? (
          <video src={fileURL} muted playsInline preload="metadata" className="h-32 w-auto object-cover" />
        ) : (
          <img src={thumbURL} alt="Preuve" className="h-32 w-auto object-cover" />
        )}
      </a>
    );
  }

  if (validation.proof_text) {
    return (
      <a
        href={validation.proof_text}
        target="_blank"
        rel="noreferrer"
        className="w-fit truncate text-sm text-link underline"
      >
        {validation.proof_text}
      </a>
    );
  }

  return <p className="text-sm text-muted-foreground">Preuve non publique.</p>;
}
