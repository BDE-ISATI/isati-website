import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Listbox } from "@headlessui/react";
import { useNavigate } from "react-router";

import useWeis from "@/features/wei/hooks/queries/useWeis";
import useCreateChallenge from "@/features/wei/hooks/mutations/useCreateChallenge";
import useUpdateChallenge from "@/features/wei/hooks/mutations/useUpdateChallenge";
import useDeleteChallenge from "@/features/wei/hooks/mutations/useDeleteChallenge";
import CategorySelect from "@/features/wei/components/CategorySelect";
import LocationSelect from "@/features/wei/components/LocationSelect";
import ChallengeDifficulty from "@/features/wei/components/ChallengeDifficulty";
import ChallengeImageField, { type ChallengeImageValue } from "@/features/wei/components/ChallengeImageField";

import type { ChallengeWithRelations } from "@/shared/types/sharedTypes";
import {
  ChallengesDifficultyOptions,
  ChallengesPhaseOptions,
  ChallengesProofTypeOptions,
  ChallengesScopeOptions,
} from "@/shared/types/pocketbase-types";
import pb from "@/shared/lib/pocketbase";
import { PHASE_LABELS, PROOF_TYPE_LABELS, SCOPE_LABELS } from "@/features/wei/libs/challenge";
import { fromDateTimeInput, toDateTimeInput } from "@/shared/lib/dates";
import { getFieldError, getFirstErrorMessage } from "@/shared/lib/pocketbase-errors";
import Button from "@/shared/components/ui/Button";
import Input, { inputVariants } from "@/shared/components/ui/Input";
import Error from "@/shared/components/ui/Error";
import LoadingOverlay from "@/shared/components/ui/LoadingOverlay";
import StyledListboxButton from "@/shared/components/ui/StyledListboxButton";
import StyledListboxOptions from "@/shared/components/ui/StyledListboxOptions";
import StyledListboxOption from "@/shared/components/ui/StyledListboxOption";
import ChevronDown from "@/assets/icons/chevron-down.svg?react";
import cn from "@/shared/utils/cn";

const DEFAULT_COLOR = "#d82b2b";
const HEX_PATTERN = /^#[0-9a-fA-F]{6}$/;

interface ChallengeFormProps {
  challenge?: ChallengeWithRelations
}

type ChallengeFields = {
  title: string,
  description: string,
  wei: string,
  phase: ChallengesPhaseOptions | "",
  scope: ChallengesScopeOptions | "",
  difficulty: ChallengesDifficultyOptions | "",
  points: number,
  proof_type: ChallengesProofTypeOptions[],
  category: string[],
  location: string | null,
  start_date: string,
  end_date: string,
  color: string,
  image: ChallengeImageValue,
}

export default function ChallengeForm({ challenge }: ChallengeFormProps) {

  const navigate = useNavigate();
  const weis = useWeis();
  const createChallenge = useCreateChallenge();
  const updateChallenge = useUpdateChallenge();
  const deleteChallenge = useDeleteChallenge();
  const [ isConfirmingDelete, setIsConfirmingDelete ] = useState<boolean>(false);

  const { register, control, handleSubmit, formState: { errors }, getValues, watch, setValue } = useForm<ChallengeFields>({
    defaultValues: {
      title: challenge?.title ?? "",
      description: challenge?.description ?? "",
      wei: challenge?.wei ?? "",
      phase: challenge?.phase ?? "",
      scope: challenge?.scope ?? "",
      difficulty: challenge?.difficulty ?? "",
      points: challenge?.points ?? 0,
      proof_type: challenge?.proof_type ?? [],
      category: challenge?.expand?.category?.map((category) => category.id) ?? [],
      location: challenge?.expand?.location?.id ?? null,
      start_date: toDateTimeInput(challenge?.start_date),
      end_date: toDateTimeInput(challenge?.end_date),
      color: challenge?.color || DEFAULT_COLOR,
      image: undefined,
    }
  });

  const mutation = challenge ? updateChallenge : createChallenge;
  const isBusy = createChallenge.isPending || updateChallenge.isPending || deleteChallenge.isPending;
  const color = watch("color");
  const currentImageUrl = challenge?.image ? pb.files.getURL(challenge, challenge.image) : undefined;

  function onSubmit(fields: ChallengeFields) {
    const record = {
      title: fields.title,
      description: fields.description,
      wei: fields.wei,
      phase: fields.phase || undefined,
      scope: fields.scope || undefined,
      difficulty: fields.difficulty || undefined,
      points: fields.points,
      proof_type: fields.proof_type,
      category: fields.category,
      location: fields.location ?? "",
      start_date: fromDateTimeInput(fields.start_date),
      end_date: fromDateTimeInput(fields.end_date),
      color: fields.color,
      ...(fields.image === undefined ? {} : { image: fields.image }),
    };

    if (challenge) {
      updateChallenge.mutate({ id: challenge.id, data: record });
    } else {
      createChallenge.mutate(record);
    }
  }

  return (
    <div className="relative">
      <div
        inert={isBusy}
        className={cn("transition duration-200", isBusy && "blur-sm pointer-events-none select-none")}
      >
        <form noValidate onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4 md:grid-cols-2">

          {/* Titre */}
          <div className="flex flex-col gap-1 md:col-span-2">
            <label htmlFor="title" className="text-sm font-medium">
              Titre
            </label>
            <Input
              id="title"
              autoFocus
              variant={errors.title || getFieldError(mutation.error, "title") ? "error" : "normal"}
              {...register("title", { required: "Ce champ est requis." })}
            />

            <Error message={errors.title?.message} />
            <Error message={getFieldError(mutation.error, "title")} />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1 md:col-span-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <textarea
              id="description"
              rows={4}
              className={inputVariants({ size: "medium" })}
              {...register("description")}
            />

            <Error message={getFieldError(mutation.error, "description")} />
          </div>

          {/* WEI */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">WEI</label>
            <Controller
              control={control}
              name="wei"
              rules={{ required: "Ce champ est requis." }}
              render={({ field }) => (
                <Listbox value={field.value} onChange={field.onChange}>
                  <StyledListboxButton>
                    <span className={cn(!field.value && "text-muted-foreground")}>
                      {weis.data?.find((wei) => wei.id === field.value)?.year ?? "---"}
                    </span>
                    <ChevronDown aria-hidden="true" className="h-4 w-4 shrink-0" />
                  </StyledListboxButton>
                  <StyledListboxOptions>
                    {weis.data?.map((wei) => (
                      <StyledListboxOption key={wei.id} value={wei.id}>
                        {wei.year} - {wei.title}
                      </StyledListboxOption>
                    ))}
                  </StyledListboxOptions>
                </Listbox>
              )}
            />

            <Error message={errors.wei?.message} />
            <Error message={getFirstErrorMessage(weis.error)} />
          </div>

          {/* Phase */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Phase</label>
            <Controller
              control={control}
              name="phase"
              rules={{ required: "Ce champ est requis." }}
              render={({ field }) => (
                <Listbox value={field.value} onChange={field.onChange}>
                  <StyledListboxButton>
                    <span className={cn(!field.value && "text-muted-foreground")}>
                      {field.value ? PHASE_LABELS[field.value] : "---"}
                    </span>
                    <ChevronDown aria-hidden="true" className="h-4 w-4 shrink-0" />
                  </StyledListboxButton>
                  <StyledListboxOptions>
                    {Object.values(ChallengesPhaseOptions).map((phase) => (
                      <StyledListboxOption key={phase} value={phase}>
                        {PHASE_LABELS[phase]}
                      </StyledListboxOption>
                    ))}
                  </StyledListboxOptions>
                </Listbox>
              )}
            />

            <Error message={errors.phase?.message} />
          </div>

          {/* Portée */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Portée</label>
            <Controller
              control={control}
              name="scope"
              rules={{ required: "Ce champ est requis." }}
              render={({ field }) => (
                <Listbox value={field.value} onChange={field.onChange}>
                  <StyledListboxButton>
                    <span className={cn(!field.value && "text-muted-foreground")}>
                      {field.value ? SCOPE_LABELS[field.value] : "---"}
                    </span>
                    <ChevronDown aria-hidden="true" className="h-4 w-4 shrink-0" />
                  </StyledListboxButton>
                  <StyledListboxOptions>
                    {Object.values(ChallengesScopeOptions).map((scope) => (
                      <StyledListboxOption key={scope} value={scope}>
                        {SCOPE_LABELS[scope]}
                      </StyledListboxOption>
                    ))}
                  </StyledListboxOptions>
                </Listbox>
              )}
            />

            <Error message={errors.scope?.message} />
          </div>

          {/* Difficulté */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Difficulté</label>
            <Controller
              control={control}
              name="difficulty"
              rules={{ required: "Ce champ est requis." }}
              render={({ field }) => (
                <Listbox value={field.value} onChange={field.onChange}>
                  <StyledListboxButton>
                    {field.value
                      ? <ChallengeDifficulty level={Number(field.value)} />
                      : <span className="text-muted-foreground">---</span>}
                    <ChevronDown aria-hidden="true" className="h-4 w-4 shrink-0" />
                  </StyledListboxButton>
                  <StyledListboxOptions>
                    {Object.values(ChallengesDifficultyOptions).map((difficulty) => (
                      <StyledListboxOption key={difficulty} value={difficulty}>
                        <ChallengeDifficulty level={Number(difficulty)} />
                      </StyledListboxOption>
                    ))}
                  </StyledListboxOptions>
                </Listbox>
              )}
            />

            <Error message={errors.difficulty?.message} />
          </div>

          {/* Points */}
          <div className="flex flex-col gap-1">
            <label htmlFor="points" className="text-sm font-medium">
              Points
            </label>
            <Input
              id="points"
              type="number"
              step="0.001"
              variant={errors.points || getFieldError(mutation.error, "points") ? "error" : "normal"}
              {...register("points", {
                required: "Ce champ est requis.",
                valueAsNumber: true,
                min: { value: 0, message: "Le score doit être positif." },
              })}
            />

            <Error message={errors.points?.message} />
            <Error message={getFieldError(mutation.error, "points")} />
          </div>

          {/* Types de preuve */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Types de preuve</label>
            <Controller
              control={control}
              name="proof_type"
              rules={{ validate: (value) => value.length > 0 || "Sélectionnez au moins un type." }}
              render={({ field }) => (
                <Listbox multiple value={field.value} onChange={field.onChange}>
                  <StyledListboxButton>
                    <span className={cn(field.value.length === 0 && "text-muted-foreground")}>
                      {field.value.length === 0
                        ? "---"
                        : field.value.map((proofType) => PROOF_TYPE_LABELS[proofType]).join(", ")}
                    </span>
                    <ChevronDown aria-hidden="true" className="h-4 w-4 shrink-0" />
                  </StyledListboxButton>
                  <StyledListboxOptions>
                    {Object.values(ChallengesProofTypeOptions).map((proofType) => (
                      <StyledListboxOption key={proofType} value={proofType}>
                        {PROOF_TYPE_LABELS[proofType]}
                      </StyledListboxOption>
                    ))}
                  </StyledListboxOptions>
                </Listbox>
              )}
            />

            <Error message={errors.proof_type?.message} />
          </div>

          {/* Catégories */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Catégories</label>
            <Controller
              control={control}
              name="category"
              render={({ field }) => (
                <CategorySelect value={field.value} onChange={field.onChange} />
              )}
            />

            <Error message={getFieldError(mutation.error, "category")} />
          </div>

          {/* Lieu */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Lieu</label>
            <Controller
              control={control}
              name="location"
              render={({ field }) => (
                <LocationSelect value={field.value} onChange={field.onChange} />
              )}
            />

            <Error message={getFieldError(mutation.error, "location")} />
          </div>

          {/* Début */}
          <div className="flex flex-col gap-1">
            <label htmlFor="start_date" className="text-sm font-medium">
              Début
            </label>
            <Input
              id="start_date"
              type="datetime-local"
              variant={errors.start_date || getFieldError(mutation.error, "start_date") ? "error" : "normal"}
              {...register("start_date", { required: "Ce champ est requis." })}
            />

            <Error message={errors.start_date?.message} />
            <Error message={getFieldError(mutation.error, "start_date")} />
          </div>

          {/* Fin */}
          <div className="flex flex-col gap-1">
            <label htmlFor="end_date" className="text-sm font-medium">
              Fin
            </label>
            <Input
              id="end_date"
              type="datetime-local"
              variant={errors.end_date || getFieldError(mutation.error, "end_date") ? "error" : "normal"}
              {...register("end_date", {
                required: "Ce champ est requis.",
                validate: (value) => value > getValues("start_date") || "La fin doit être après le début.",
              })}
            />

            <Error message={errors.end_date?.message} />
            <Error message={getFieldError(mutation.error, "end_date")} />
          </div>

          {/* Couleur */}
          <div className="flex flex-col gap-1">
            <label htmlFor="color" className="text-sm font-medium">
              Couleur
            </label>
            <div className="flex flex-row items-center gap-2">
              <input
                type="color"
                aria-label="Sélecteur de couleur"
                value={HEX_PATTERN.test(color) ? color : DEFAULT_COLOR}
                onChange={(event) => setValue("color", event.target.value, { shouldValidate: true })}
                className="h-10 w-10 shrink-0 cursor-pointer rounded-md border border-input bg-background p-0.5"
              />
              <Input
                id="color"
                variant={errors.color ? "error" : "normal"}
                {...register("color", {
                  required: "Ce champ est requis.",
                  pattern: { value: HEX_PATTERN, message: "Format attendu : #rrggbb." },
                })}
              />
            </div>

            <Error message={errors.color?.message} />
          </div>

          {/* Image */}
          <div className="flex flex-col gap-1 md:col-span-2">
            <label className="text-sm font-medium">Image</label>
            <Controller
              control={control}
              name="image"
              render={({ field }) => (
                <ChallengeImageField value={field.value} onChange={field.onChange} currentUrl={currentImageUrl} />
              )}
            />

            <Error message={getFieldError(mutation.error, "image")} />
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 md:col-span-2">
            <Error message={getFirstErrorMessage(mutation.error)} />
            <Error message={getFirstErrorMessage(deleteChallenge.error)} />

            <div className="flex flex-row flex-wrap items-center justify-end gap-2">
              {challenge && (
                isConfirmingDelete ? (
                  <div className="mr-auto flex flex-row items-center gap-2">
                    <span className="text-sm text-muted-foreground">Supprimer définitivement ce défi ?</span>
                    <Button type="button" onClick={() => deleteChallenge.mutate(challenge.id)} variant="destructive" size="small">
                      Confirmer
                    </Button>
                    <Button type="button" onClick={() => setIsConfirmingDelete(false)} variant="ghost" size="small">
                      Annuler
                    </Button>
                  </div>
                ) : (
                  <Button type="button" onClick={() => setIsConfirmingDelete(true)} variant="destructive" className="mr-auto">
                    Supprimer
                  </Button>
                )
              )}

              <Button type="button" onClick={() => navigate("/wei/challenge")} variant="ghost">
                Annuler
              </Button>
              <Button type="submit" variant="accent" disabled={isBusy}>
                {challenge ? "Enregistrer" : "Créer"}
              </Button>
            </div>
          </div>

        </form>
      </div>
      {isBusy && <LoadingOverlay />}
    </div>
  );
}
