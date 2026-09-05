import { useEffect } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router";
import { darken } from "color2k";

import pb from "@/shared/lib/pocketbase";
import useValidation from "@/features/wei/hooks/queries/useValidation";
import useCurrentWei from "@/features/wei/hooks/queries/useCurrentWei";
import useReviewValidations from "@/features/wei/hooks/queries/useReviewValidations";
import useHasPermission from "@/features/roles/hooks/useHasPermission";
import ValidationReviewForm from "@/features/wei/components/ValidationReviewForm";
import ProofCarousel from "@/features/wei/components/ProofCarousel";
import { reviewFiltersFromParams, reviewFiltersToParams } from "@/features/wei/libs/validation";
import { getFirstErrorMessage } from "@/shared/lib/pocketbase-errors";
import Button from "@/shared/components/ui/Button";
import ChevronRight from "@/assets/icons/chevron-right.svg?react";
import { parsePbDate } from "@/shared/lib/dates";
import Error from "@/shared/components/ui/Error";
import IsatiAnimation from "@/shared/components/animations/IsatiAnimation";
import NotFound from "@/pages/NotFound";
import PageNav from "@/shared/components/layout/PageNav";

const dateFormat = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" });

const STATUS_LABELS = {
  pending: "En attente",
  accepted: "Acceptée",
  refused: "Refusée",
};

export default function ValidationDetail() {

  const { validationId } = useParams();
  const navigate = useNavigate();
  const [ searchParams ] = useSearchParams();
  const validation = useValidation(validationId);
  const canUpdate = useHasPermission("update", "validations");

  const filters = reviewFiltersFromParams(searchParams);
  const search = reviewFiltersToParams(filters).toString();
  const currentWei = useCurrentWei();
  const queue = useReviewValidations(currentWei.data?.id, filters);

  const position = queue.data?.findIndex((item) => item.id === validationId) ?? -1;
  const previous = position > 0 ? queue.data?.[position - 1] : undefined;
  const next = position >= 0 ? queue.data?.[position + 1] : undefined;

  useEffect(() => {
    document.title = `${validation.data?.expand?.challenge?.title || "Validation"} | ISATI`;
  }, [validation.data]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, [contenteditable]")) return;

      const targetId = event.key === "k" ? previous?.id : event.key === "j" ? next?.id : undefined;
      if (!targetId) return;

      event.preventDefault();
      navigate(`/wei/validation/${targetId}${search ? `?${search}` : ""}`);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [previous, next, search, navigate]);

  if (validation.isLoading) return (
    <div className="flex flex-1 items-center justify-center">
      <IsatiAnimation />
    </div>
  );

  if (!validation.data) {
    return validation.error && validation.error.status !== 404 ? (
      <div className="mx-auto w-full max-w-3xl px-4 py-4 md:py-6">
        <Error message={getFirstErrorMessage(validation.error)} />
      </div>
    ) : <NotFound />;
  }

  const current = validation.data;
  const team = current.expand?.team;
  const user = current.expand?.user;
  const challenge = current.expand?.challenge;
  const validator = current.expand?.validator;

  const color = team?.color || "var(--color-accent)";
  const submittedAt = parsePbDate(current.submitted_at);
  const reviewedAt = parsePbDate(current.reviewed_at);
  const avatarURL = user?.avatar ? pb.files.getURL(user, user.avatar, { thumb: "100x100" }) : undefined;

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-4 py-4 md:gap-6 md:py-6">
      <div className="flex flex-row flex-wrap items-center justify-between gap-2">
        <PageNav />

        {position >= 0 && queue.data && queue.data.length > 1 && (
          <div className="flex flex-row items-center gap-2">
            <span className="text-xs text-muted-foreground">
              {position + 1} / {queue.data.length}
            </span>
            <Button
              type="button"
              onClick={() => previous && navigate(`/wei/validation/${previous.id}${search ? `?${search}` : ""}`)}
              variant="secondary"
              size="small"
              disabled={!previous}
              aria-label="Soumission précédente (K)"
            >
              <ChevronRight aria-hidden="true" className="h-4 w-4 rotate-180" />
              Précédente
            </Button>
            <Button
              type="button"
              onClick={() => next && navigate(`/wei/validation/${next.id}${search ? `?${search}` : ""}`)}
              variant="secondary"
              size="small"
              disabled={!next}
              aria-label="Soumission suivante (J)"
            >
              Suivante
              <ChevronRight aria-hidden="true" className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>


      <header
        style={{
          backgroundColor: color,
          borderColor: team?.color ? darken(team.color, 0.09) : undefined,
        }}
        className="flex flex-col gap-2 rounded-md border-2 p-4 text-white shadow-sm sm:p-6"
      >
        <h1 className="text-xl font-semibold sm:text-2xl">{challenge?.title || "Défi inconnu"}</h1>
        <p className="text-sm opacity-90">{team?.name || "Équipe inconnue"}</p>
        {challenge && (
          <Link to={`/wei/challenge/${challenge.id}`} className="w-fit text-sm underline opacity-90 hover:opacity-100">
            Voir le défi
          </Link>
        )}
      </header>

      <section className="grid grid-cols-3 gap-4 rounded-md border border-border bg-card p-4 text-card-foreground shadow-sm sm:p-6">
        <Stat label="Points du défi" value={String(challenge?.points ?? 0)} />
        <Stat label="Statut" value={STATUS_LABELS[current.status || "pending"]} />
        <Stat label="Envoyée le" value={submittedAt ? dateFormat.format(submittedAt) : "-"} />
      </section>

      <section className="flex flex-col gap-4 rounded-md border border-border bg-card p-4 text-card-foreground shadow-sm sm:p-6">
        <div className="flex flex-row items-center gap-3">
          {avatarURL && (
            <img src={avatarURL} alt="" className="h-10 w-10 shrink-0 rounded-full border border-border object-cover" />
          )}
          <span className="truncate font-medium">{user?.username || "Participant inconnu"}</span>
        </div>

        <ProofCarousel validation={current} />
      </section>

      {(current.status === "accepted" || current.status === "refused") && (
        <section className="flex flex-col gap-2 rounded-md border border-border bg-card p-4 text-card-foreground shadow-sm sm:p-6">
          <h2 className="text-lg font-semibold">Décision actuelle</h2>
          <p className="text-sm">
            <span className="text-muted-foreground">Statut : </span>
            {STATUS_LABELS[current.status]}
            {current.status === "accepted" && ` - ${current.points_awarded} pts`}
          </p>
          {reviewedAt && (
            <p className="text-sm">
              <span className="text-muted-foreground">Traitée le : </span>
              {dateFormat.format(reviewedAt)}
              {validator?.username && ` par ${validator.username}`}
            </p>
          )}
          {current.reason && (
            <p className="text-sm whitespace-pre-line">
              <span className="text-muted-foreground">Motif : </span>
              {current.reason}
            </p>
          )}
        </section>
      )}

      {canUpdate && <ValidationReviewForm validation={current} />}

    </div>
  );
}

function Stat({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex flex-col items-center gap-1 text-center">
      <span className="text-lg leading-tight font-bold sm:text-xl">{value}</span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}
