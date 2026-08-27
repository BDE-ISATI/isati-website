import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import useCreateWei from "@/features/wei/hooks/mutations/useCreateWei";
import useUpdateWei from "@/features/wei/hooks/mutations/useUpdateWei";
import useDeleteWei from "@/features/wei/hooks/mutations/useDeleteWei";
import LocationSelect from "@/features/wei/components/LocationSelect";

import type { WeiWithLocation } from "@/shared/types/sharedTypes";
import { fromDateTimeInput, toDateTimeInput } from "@/shared/lib/dates";
import { getFieldError, getFirstErrorMessage } from "@/shared/lib/pocketbase-errors";
import Button from "@/shared/components/ui/Button";
import Input, { inputVariants } from "@/shared/components/ui/Input";
import Error from "@/shared/components/ui/Error";
import LoadingOverlay from "@/shared/components/ui/LoadingOverlay";
import XIcon from "@/assets/icons/x.svg?react";
import cn from "@/shared/utils/cn";

interface WeiFormProps {
  wei?: WeiWithLocation
}

type WeiFields = {
  year: string,
  title: string,
  theme: string,
  description: string,
  location: string | null,
  registration_opens_at: string,
  registration_closes_at: string,
  parcours_starts_at: string,
  weekend_starts_at: string,
  weekend_ends_at: string,
}

export default function WeiForm({ wei }: WeiFormProps) {

  const navigate = useNavigate();
  const createWei = useCreateWei();
  const updateWei = useUpdateWei();
  const deleteWei = useDeleteWei();
  const [ isConfirmingDelete, setIsConfirmingDelete ] = useState<boolean>(false);
  const [ deleteConfirmation, setDeleteConfirmation ] = useState<string>("");

  const { register, control, handleSubmit, formState: { errors }, getValues } = useForm<WeiFields>({
    defaultValues: {
      year: wei?.year ?? "",
      title: wei?.title ?? "",
      theme: wei?.theme ?? "",
      description: wei?.description ?? "",
      location: wei?.expand?.location?.id ?? null,
      registration_opens_at: toDateTimeInput(wei?.registration_opens_at),
      registration_closes_at: toDateTimeInput(wei?.registration_closes_at),
      parcours_starts_at: toDateTimeInput(wei?.parcours_starts_at),
      weekend_starts_at: toDateTimeInput(wei?.weekend_starts_at),
      weekend_ends_at: toDateTimeInput(wei?.weekend_ends_at),
    }
  });

  const mutation = wei ? updateWei : createWei;
  const isBusy = createWei.isPending || updateWei.isPending || deleteWei.isPending;

  function onSubmit(fields: WeiFields) {
    const record = {
      year: fields.year,
      title: fields.title,
      theme: fields.theme,
      description: fields.description,
      location: fields.location ?? "",
      registration_opens_at: fromDateTimeInput(fields.registration_opens_at),
      registration_closes_at: fromDateTimeInput(fields.registration_closes_at),
      parcours_starts_at: fromDateTimeInput(fields.parcours_starts_at),
      weekend_starts_at: fromDateTimeInput(fields.weekend_starts_at),
      weekend_ends_at: fromDateTimeInput(fields.weekend_ends_at),
    };

    if (wei) {
      updateWei.mutate({ id: wei.id, data: record });
    } else {
      createWei.mutate(record);
    }
  }

  return (
    <div className="relative">
      <div
        inert={isBusy}
        className={cn("transition duration-200", isBusy && "blur-sm pointer-events-none select-none")}
      >
        <form noValidate onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4 md:grid-cols-2">

          <div className="flex flex-col gap-1">
            <label htmlFor="year" className="text-sm font-medium">
              Année
            </label>
            <Input
              id="year"
              autoFocus
              inputMode="numeric"
              variant={errors.year || getFieldError(mutation.error, "year") ? "error" : "normal"}
              {...register("year", { required: "Ce champ est requis." })}
            />

            <Error message={errors.year?.message} />
            <Error message={getFieldError(mutation.error, "year")} />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="title" className="text-sm font-medium">
              Titre
            </label>
            <Input
              id="title"
              variant={errors.title || getFieldError(mutation.error, "title") ? "error" : "normal"}
              {...register("title")}
            />

            <Error message={errors.title?.message} />
            <Error message={getFieldError(mutation.error, "title")} />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="theme" className="text-sm font-medium">
              Thème
            </label>
            <Input
              id="theme"
              variant={getFieldError(mutation.error, "theme") ? "error" : "normal"}
              {...register("theme")}
            />

            <Error message={getFieldError(mutation.error, "theme")} />
          </div>

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

          <div className="flex flex-col gap-1">
            <label htmlFor="registration_opens_at" className="text-sm font-medium">
              Ouverture des inscriptions
            </label>
            <Input
              id="registration_opens_at"
              type="datetime-local"
              variant={getFieldError(mutation.error, "registration_opens_at") ? "error" : "normal"}
              {...register("registration_opens_at")}
            />

            <Error message={getFieldError(mutation.error, "registration_opens_at")} />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="registration_closes_at" className="text-sm font-medium">
              Fermeture des inscriptions
            </label>
            <Input
              id="registration_closes_at"
              type="datetime-local"
              variant={errors.registration_closes_at || getFieldError(mutation.error, "registration_closes_at") ? "error" : "normal"}
              {...register("registration_closes_at", {
                validate: (value) => {
                  const opensAt = getValues("registration_opens_at");
                  if (!value || !opensAt) return true;
                  return value > opensAt || "La fermeture doit être après l'ouverture.";
                },
              })}
            />

            <Error message={errors.registration_closes_at?.message} />
            <Error message={getFieldError(mutation.error, "registration_closes_at")} />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="parcours_starts_at" className="text-sm font-medium">
              Début du parcours
            </label>
            <Input
              id="parcours_starts_at"
              type="datetime-local"
              variant={getFieldError(mutation.error, "parcours_starts_at") ? "error" : "normal"}
              {...register("parcours_starts_at")}
            />

            <Error message={getFieldError(mutation.error, "parcours_starts_at")} />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="weekend_starts_at" className="text-sm font-medium">
              Début du weekend
            </label>
            <Input
              id="weekend_starts_at"
              type="datetime-local"
              variant={getFieldError(mutation.error, "weekend_starts_at") ? "error" : "normal"}
              {...register("weekend_starts_at")}
            />

            <Error message={getFieldError(mutation.error, "weekend_starts_at")} />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="weekend_ends_at" className="text-sm font-medium">
              Fin du weekend
            </label>
            <Input
              id="weekend_ends_at"
              type="datetime-local"
              variant={errors.weekend_ends_at || getFieldError(mutation.error, "weekend_ends_at") ? "error" : "normal"}
              {...register("weekend_ends_at", {
                validate: (value) => {
                  const startsAt = getValues("weekend_starts_at");
                  if (!value || !startsAt) return true;
                  return value > startsAt || "La fin doit être après le début.";
                },
              })}
            />

            <Error message={errors.weekend_ends_at?.message} />
            <Error message={getFieldError(mutation.error, "weekend_ends_at")} />
          </div>

          <div className="flex flex-col gap-3 md:col-span-2">
            <Error message={getFirstErrorMessage(mutation.error)} />
            <Error message={getFirstErrorMessage(deleteWei.error)} />

            {wei && isConfirmingDelete && (
              <div className="flex flex-col gap-1">
                <label htmlFor="deleteConfirmation" className="text-sm text-muted-foreground">
                  Tapez l'année du WEI ({wei.year}) pour confirmer sa suppression définitive
                </label>
                <div className="flex flex-row items-center gap-2">
                  <Input
                    id="deleteConfirmation"
                    autoFocus
                    size="small"
                    value={deleteConfirmation}
                    onChange={(event) => setDeleteConfirmation(event.target.value)}
                    className="min-w-0 grow"
                  />
                  <Button
                    type="button"
                    onClick={() => deleteWei.mutate(wei.id)}
                    disabled={deleteConfirmation !== wei.year}
                    variant="destructive"
                    size="small"
                    className="shrink-0"
                  >
                    Confirmer
                  </Button>
                  <Button
                    type="button"
                    onClick={() => { setIsConfirmingDelete(false); setDeleteConfirmation(""); }}
                    variant="destructiveGhost"
                    size="icon"
                    aria-label="Annuler la suppression"
                    className="shrink-0"
                  >
                    <XIcon className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            <div className="flex flex-row flex-wrap items-center justify-end gap-2">
              {wei && !isConfirmingDelete && (
                <Button type="button" onClick={() => setIsConfirmingDelete(true)} variant="destructive" className="mr-auto">
                  Supprimer
                </Button>
              )}

              <Button type="button" onClick={() => navigate("/wei/panel")} variant="ghost">
                Annuler
              </Button>
              <Button type="submit" variant="accent" disabled={isBusy}>
                {wei ? "Enregistrer" : "Créer"}
              </Button>
            </div>
          </div>

        </form>
      </div>
      {isBusy && <LoadingOverlay />}
    </div>
  );
}
