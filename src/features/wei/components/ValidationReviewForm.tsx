import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import useReviewValidation from "@/features/wei/hooks/mutations/useReviewValidation";
import type { ValidationsStatusOptions } from "@/shared/types/pocketbase-types";
import type { ValidationWithRelations } from "@/shared/types/sharedTypes";
import { getFieldError, getFirstErrorMessage } from "@/shared/lib/pocketbase-errors";
import Button from "@/shared/components/ui/Button";
import { inputVariants } from "@/shared/components/ui/Input";
import Error from "@/shared/components/ui/Error";
import LoadingOverlay from "@/shared/components/ui/LoadingOverlay";
import cn from "@/shared/utils/cn";

interface ValidationReviewFormProps {
  validation: ValidationWithRelations
  className?: string
}

type ReviewFields = {
  delta: number
  reason: string
};

export default function ValidationReviewForm({ validation, className }: ValidationReviewFormProps) {

  const navigate = useNavigate();
  const review = useReviewValidation();

  const basePoints = validation.expand?.challenge?.points ?? 0;
  const reviewed = validation.status === "accepted" || validation.status === "refused";

  const [ status, setStatus ] = useState<ValidationsStatusOptions>(
    validation.status === "refused" ? "refused" : "accepted"
  );

  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<ReviewFields>({
    defaultValues: {
      delta: validation.status === "accepted" ? validation.points_awarded - basePoints : 0,
      reason: validation.reason || "",
    }
  });

  const delta = Number(watch("delta")) || 0;
  const total = Math.max(0, basePoints + delta);
  const isBusy = review.isPending;

  function onSubmit(fields: ReviewFields) {
    review.mutate({
      id: validation.id,
      data: {
        status: status,
        reason: fields.reason.trim(),
        points_awarded: status === "refused" ? 0 : Math.max(0, basePoints + (Number(fields.delta) || 0)),
      }
    });
  }

  return (
    <section
      className={cn(
        "relative w-full rounded-md border border-border bg-card p-4 text-card-foreground shadow-sm sm:p-6",
        className,
      )}
    >
      <div
        inert={isBusy}
        className={cn("transition duration-200", isBusy && "blur-sm pointer-events-none select-none")}
      >
        <h2 className="text-lg font-semibold">{reviewed ? "Revenir sur la décision" : "Traiter la demande"}</h2>

        <form noValidate onSubmit={handleSubmit(onSubmit)} className="mt-4 flex flex-col gap-6">

          <div className="flex flex-row flex-wrap gap-2">
            <Button
              type="button"
              onClick={() => setStatus("accepted")}
              variant={status === "accepted" ? "accent" : "secondary"}
            >
              Accepter
            </Button>
            <Button
              type="button"
              onClick={() => setStatus("refused")}
              variant={status === "refused" ? "destructive" : "secondary"}
            >
              Refuser
            </Button>
          </div>

          {status === "accepted" && (
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium">Points attribués</span>
              <p className="text-xs text-muted-foreground">
                Le défi vaut {basePoints} {basePoints > 1 ? "points" : "point"}. Ajuste le bonus ou le malus.
              </p>

              <div className="flex flex-row items-center gap-3">
                <Button
                  type="button"
                  onClick={() => setValue("delta", delta - 1)}
                  variant="secondary"
                  size="icon"
                  aria-label="Retirer un point"
                  className="h-9 w-9"
                >
                  −
                </Button>

                <input
                  type="number"
                  step={1}
                  aria-label="Bonus ou malus"
                  className={cn(inputVariants({ size: "small" }), "w-20 text-center")}
                  {...register("delta", { valueAsNumber: true })}
                />

                <Button
                  type="button"
                  onClick={() => setValue("delta", delta + 1)}
                  variant="secondary"
                  size="icon"
                  aria-label="Ajouter un point"
                  className="h-9 w-9"
                >
                  +
                </Button>

                <span className="ml-auto flex flex-col items-end">
                  <span className="text-2xl leading-none font-bold">{total}</span>
                  <span className="text-xs text-muted-foreground">total attribué</span>
                </span>
              </div>

              <Error message={getFieldError(review.error, "points_awarded")} />
            </div>
          )}

          <div className="flex flex-col gap-1">
            <label htmlFor="reason" className="text-sm font-medium">
              {status === "refused" ? "Motif du refus" : "Commentaire (facultatif)"}
            </label>
            <textarea
              id="reason"
              rows={3}
              placeholder={status === "refused" ? "Explique pourquoi la preuve est refusée…" : "Visible par le participant."}
              className={cn(
                inputVariants({ variant: errors.reason || getFieldError(review.error, "reason") ? "error" : "normal" }),
                "resize-y",
              )}
              {...register("reason", {
                validate: (value) => status !== "refused" || value.trim().length > 0 || "Un motif est requis pour refuser une preuve.",
              })}
            />

            <Error message={errors.reason?.message} />
            <Error message={getFieldError(review.error, "reason")} />
          </div>

          <Error message={getFirstErrorMessage(review.error)} />

          <div className="flex flex-row flex-wrap items-center justify-end gap-2">
            <Button type="button" onClick={() => navigate("/wei/validation")} variant="ghost">
              Annuler
            </Button>
            <Button type="submit" variant={status === "refused" ? "destructive" : "accent"} disabled={isBusy}>
              {status === "refused" ? "Refuser la preuve" : "Valider la preuve"}
            </Button>
          </div>

        </form>
      </div>
      {isBusy && <LoadingOverlay />}
    </section>
  );
}
