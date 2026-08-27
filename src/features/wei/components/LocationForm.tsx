import { useState } from "react";
import { useForm } from "react-hook-form";

import useCreateLocation from "@/features/wei/hooks/mutations/useCreateLocation";
import useUpdateLocation from "@/features/wei/hooks/mutations/useUpdateLocation";
import useDeleteLocation from "@/features/wei/hooks/mutations/useDeleteLocation";
import type { LocationsResponse } from "@/shared/types/pocketbase-types";
import { getFieldError, getFirstErrorMessage } from "@/shared/lib/pocketbase-errors";
import Button from "@/shared/components/ui/Button";
import Input from "@/shared/components/ui/Input";
import Error from "@/shared/components/ui/Error";
import StyledSwitch from "@/shared/components/ui/StyledSwitch";
import TrashIcon from "@/assets/icons/trash-2.svg?react";

interface LocationFormProps {
  location?: LocationsResponse
  onDone: (id: string) => void
  onDeleted: (id: string) => void
  onCancel: () => void
}

type LocationFields = {
  label: string,
  hidden: boolean,
}

export default function LocationForm({ location, onDone, onDeleted, onCancel }: LocationFormProps) {

  const createLocation = useCreateLocation();
  const updateLocation = useUpdateLocation();
  const deleteLocation = useDeleteLocation();
  const [ isConfirmingDelete, setIsConfirmingDelete ] = useState<boolean>(false);

  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<LocationFields>({
    defaultValues: {
      label: location?.label ?? "",
      hidden: location?.hidden ?? false,
    }
  });

  const mutation = location ? updateLocation : createLocation;
  const labelServerError = getFieldError(mutation.error, "label");

  const hidden = watch("hidden");

  function onSubmit(fields: LocationFields) {
    if (location) {
      updateLocation.mutate({ id: location.id, ...fields }, { onSuccess: (record) => onDone(record.id) })
    } else {
      createLocation.mutate(fields, { onSuccess: (record) => onDone(record.id) })
    }
  }

  return (
    <div
      className="flex flex-col gap-3 p-3"
      onKeyDown={(event) => {
        if (event.key !== "Enter") return
        event.preventDefault()
        handleSubmit(onSubmit)()
      }}
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="locationLabel" className="text-sm font-medium">
          Nom
        </label>
        <Input
          id="locationLabel"
          size="small"
          autoFocus
          variant={errors.label || labelServerError ? "error" : "normal"}
          {...register("label", { required: "Ce champ est requis." })}
        />

        <Error message={errors.label?.message} />
        <Error message={labelServerError} />
      </div>

      <div className="flex flex-row items-center justify-between gap-3">
        <span className="text-sm font-medium">Masquer cette location</span>
        <StyledSwitch
          checked={hidden}
          onChange={(checked) => setValue("hidden", checked)}
          aria-label="Masquer cette location"
        />
      </div>

      {location && isConfirmingDelete ? (
        <div className="flex flex-col gap-2">
          <span className="text-sm text-muted-foreground">
            Supprimer « {location.label || "ce lieu"} » ?
          </span>
          <div className="flex flex-row justify-end gap-2">
            <Button type="button" onClick={() => setIsConfirmingDelete(false)} variant="ghost" size="small">
              Annuler
            </Button>
            <Button
              type="button"
              onClick={() => deleteLocation.mutate(location.id, { onSuccess: () => onDeleted(location.id) })}
              variant="destructive"
              size="small"
              disabled={deleteLocation.isPending}
            >
              {deleteLocation.isPending ? "Suppression…" : "Supprimer"}
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-row items-center justify-end gap-2">
          {location && (
            <Button
              type="button"
              onClick={() => setIsConfirmingDelete(true)}
              variant="destructiveGhost"
              size="icon"
              aria-label="Supprimer le lieu"
              className="mr-auto"
            >
              <TrashIcon className="h-4 w-4" />
            </Button>
          )}
          <Button type="button" onClick={onCancel} variant="ghost" size="small">
            Annuler
          </Button>
          <Button type="button" onClick={handleSubmit(onSubmit)} variant="accent" size="small" disabled={mutation.isPending}>
            {mutation.isPending ? "Enregistrement…" : location ? "Modifier" : "Créer"}
          </Button>
        </div>
      )}

      {!labelServerError && <Error message={getFirstErrorMessage(mutation.error)} />}
      <Error message={getFirstErrorMessage(deleteLocation.error)} />
    </div>
  );
}
