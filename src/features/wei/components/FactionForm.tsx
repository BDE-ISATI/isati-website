import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import useCreateFaction from "@/features/wei/hooks/mutations/useCreateFaction";
import useUpdateFaction from "@/features/wei/hooks/mutations/useUpdateFaction";
import useDeleteFaction from "@/features/wei/hooks/mutations/useDeleteFaction";
import FactionLogoField, { type FactionLogoValue } from "@/features/wei/components/FactionLogoField";

import pb from "@/shared/lib/pocketbase";
import type { FactionsResponse } from "@/shared/types/pocketbase-types";
import { getFieldError, getFirstErrorMessage } from "@/shared/lib/pocketbase-errors";
import Button from "@/shared/components/ui/Button";
import Input, { inputVariants } from "@/shared/components/ui/Input";
import Error from "@/shared/components/ui/Error";
import LoadingOverlay from "@/shared/components/ui/LoadingOverlay";
import XIcon from "@/assets/icons/x.svg?react";
import cn from "@/shared/utils/cn";

const DEFAULT_COLOR = "#d82b2b";
const HEX_PATTERN = /^#[0-9a-fA-F]{6}$/;

interface FactionFormProps {
  weiId: string
  faction?: FactionsResponse
}

type FactionFields = {
  name: string,
  description: string,
  color: string,
  logo: FactionLogoValue,
}

export default function FactionForm({ weiId, faction }: FactionFormProps) {

  const navigate = useNavigate();
  const createFaction = useCreateFaction();
  const updateFaction = useUpdateFaction();
  const deleteFaction = useDeleteFaction();
  const [ isConfirmingDelete, setIsConfirmingDelete ] = useState<boolean>(false);

  const { register, control, handleSubmit, watch, setValue, formState: { errors } } = useForm<FactionFields>({
    defaultValues: {
      name: faction?.name ?? "",
      description: faction?.description ?? "",
      color: faction?.color || DEFAULT_COLOR,
      logo: undefined,
    }
  });

  const mutation = faction ? updateFaction : createFaction;
  const isBusy = createFaction.isPending || updateFaction.isPending || deleteFaction.isPending;
  const color = watch("color");
  const logoUrl = faction?.logo ? pb.files.getURL(faction, faction.logo, { thumb: "300x300" }) : undefined;

  function onSubmit(fields: FactionFields) {
    const record = {
      wei: weiId,
      name: fields.name,
      description: fields.description,
      color: fields.color,
    };

    if (faction) {
      updateFaction.mutate({
        id: faction.id,
        data: { ...record, ...(fields.logo === undefined ? {} : { logo: fields.logo }) }
      });
    } else {
      createFaction.mutate({ ...record, logo: fields.logo ?? null });
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
            <label htmlFor="name" className="text-sm font-medium">
              Nom
            </label>
            <Input
              id="name"
              autoFocus
              variant={errors.name || getFieldError(mutation.error, "name") ? "error" : "normal"}
              {...register("name", { required: "Ce champ est requis." })}
            />

            <Error message={errors.name?.message} />
            <Error message={getFieldError(mutation.error, "name")} />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="color" className="text-sm font-medium">
              Couleur
            </label>
            <div className="flex flex-row items-center gap-2">
              <input
                type="color"
                aria-label="Choisir la couleur de la faction"
                value={HEX_PATTERN.test(color) ? color : DEFAULT_COLOR}
                onChange={(event) => setValue("color", event.target.value, { shouldValidate: true })}
                className="h-9 w-9 shrink-0 cursor-pointer rounded-md border border-input bg-background p-0.5"
              />
              <Input
                id="color"
                className="min-w-0 grow"
                variant={errors.color || getFieldError(mutation.error, "color") ? "error" : "normal"}
                {...register("color", {
                  required: "Ce champ est requis.",
                  pattern: { value: HEX_PATTERN, message: "Format attendu : #rrggbb." }
                })}
              />
            </div>

            <Error message={errors.color?.message} />
            <Error message={getFieldError(mutation.error, "color")} />
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

          <div className="flex flex-col gap-1 md:col-span-2">
            <label className="text-sm font-medium">Logo</label>
            <Controller
              control={control}
              name="logo"
              render={({ field }) => (
                <FactionLogoField value={field.value} onChange={field.onChange} currentUrl={logoUrl} />
              )}
            />

            <Error message={getFieldError(mutation.error, "logo")} />
          </div>

          <div className="flex flex-col gap-3 md:col-span-2">
            <Error message={getFirstErrorMessage(mutation.error)} />
            <Error message={getFirstErrorMessage(deleteFaction.error)} />

            {faction && isConfirmingDelete && (
              <div className="flex flex-row flex-wrap items-center gap-2">
                <p className="mr-auto text-sm text-muted-foreground">
                  Supprimer définitivement la faction « {faction.name} » ?
                </p>
                <Button
                  type="button"
                  onClick={() => deleteFaction.mutate({ id: faction.id, weiId: weiId })}
                  variant="destructive"
                  size="small"
                >
                  Confirmer
                </Button>
                <Button
                  type="button"
                  onClick={() => setIsConfirmingDelete(false)}
                  variant="destructiveGhost"
                  size="icon"
                  aria-label="Annuler la suppression"
                >
                  <XIcon className="h-4 w-4" />
                </Button>
              </div>
            )}

            <div className="flex flex-row flex-wrap items-center justify-end gap-2">
              {faction && !isConfirmingDelete && (
                <Button type="button" onClick={() => setIsConfirmingDelete(true)} variant="destructive" className="mr-auto">
                  Supprimer
                </Button>
              )}

              <Button type="button" onClick={() => navigate(`/wei/panel/${weiId}`)} variant="ghost">
                Annuler
              </Button>
              <Button type="submit" variant="accent" disabled={isBusy}>
                {faction ? "Enregistrer" : "Créer"}
              </Button>
            </div>
          </div>

        </form>
      </div>
      {isBusy && <LoadingOverlay />}
    </div>
  );
}
