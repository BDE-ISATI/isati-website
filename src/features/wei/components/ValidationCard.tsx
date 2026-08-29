import { Link } from "react-router";
import { darken } from "color2k";
import pb from "@/shared/lib/pocketbase";
import type { ValidationWithRelations } from "@/shared/types/sharedTypes";
import { parsePbDate } from "@/shared/lib/dates";
import ChevronRight from "@/assets/icons/chevron-right.svg?react";
import cn from "@/shared/utils/cn";

interface ValidationCardProps {
  validation: ValidationWithRelations
  className?: string
}

const dateFormat = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });

const STATUS_LABELS = {
  pending: "En attente",
  accepted: "Acceptée",
  refused: "Refusée",
};

const STATUS_CLASSES = {
  pending: "border-border text-muted-foreground",
  accepted: "border-status-success text-status-success",
  refused: "border-status-critical text-status-critical",
};

export default function ValidationCard({ validation, className }: ValidationCardProps) {

  const team = validation.expand?.team;
  const user = validation.expand?.user;
  const challenge = validation.expand?.challenge;

  const color = team?.color || "var(--color-border)";
  const date = parsePbDate(validation.submitted_at);
  const status = validation.status || "pending";
  const avatarURL = user?.avatar ? pb.files.getURL(user, user.avatar, { thumb: "100x100" }) : undefined;

  return (
    <Link
      to={`/wei/validation/${validation.id}`}
      aria-label={`Traiter la demande de ${user?.username || "un participant"}`}
      className={cn("block rounded-md", className)}
    >
      <article
        style={{ borderColor: team?.color ? darken(team.color, 0.09) : undefined }}
        className="flex flex-row items-center gap-4 rounded-md border-2 border-border bg-card p-4 text-card-foreground shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transition-none sm:p-5"
      >

        <Thumbnail validation={validation} color={color} />

        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <h2 className="truncate font-semibold">{challenge?.title || "Défi inconnu"}</h2>

          <span className="flex min-w-0 flex-row items-center gap-2">
            {avatarURL && (
              <img src={avatarURL} alt="" className="h-6 w-6 shrink-0 rounded-full border border-border object-cover" />
            )}
            <span className="truncate text-sm text-muted-foreground">
              {user?.username || "Participant inconnu"}
            </span>
            {team?.name && (
              <span
                style={{ backgroundColor: color, borderColor: team.color ? darken(team.color, 0.09) : undefined }}
                className="inline-flex shrink-0 items-center rounded-md border-2 px-2 py-0.5 text-xs font-medium text-white"
              >
                {team.name}
              </span>
            )}
          </span>

          <span className="text-xs text-muted-foreground">{date ? dateFormat.format(date) : "-"}</span>
        </div>

        <span className={cn("shrink-0 rounded-md border px-2 py-0.5 text-xs font-medium", STATUS_CLASSES[status])}>
          {STATUS_LABELS[status]}
        </span>

        <ChevronRight aria-hidden="true" className="h-6 w-6 shrink-0 text-muted-foreground" />
      </article>
    </Link>
  );
}

function Thumbnail({ validation, color }: { validation: ValidationWithRelations, color: string }) {

  if (validation.proof_file) {
    const isVideo = /\.(mp4|mov|webm|m4v)$/i.test(validation.proof_file);
    const src = isVideo
      ? pb.files.getURL(validation, validation.proof_file)
      : pb.files.getURL(validation, validation.proof_file, { thumb: "300x300" });

    return isVideo ? (
      <video
        src={src}
        muted
        playsInline
        preload="metadata"
        className="h-14 w-14 shrink-0 rounded-md border border-border object-cover"
      />
    ) : (
      <img src={src} alt="" className="h-14 w-14 shrink-0 rounded-md border border-border object-cover" />
    );
  }

  return (
    <span
      aria-hidden="true"
      style={{ backgroundColor: color }}
      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md text-xs font-medium text-white"
    >
      Lien
    </span>
  );
}
