import { useState } from "react";
import { useForm } from "react-hook-form";

import useCreateCategory from "@/features/wei/hooks/mutations/useCreateCategory";
import useUpdateCategory from "@/features/wei/hooks/mutations/useUpdateCategory";
import useDeleteCategory from "@/features/wei/hooks/mutations/useDeleteCategory";
import type { ChallengeCategoriesResponse } from "@/shared/types/pocketbase-types";
import { getFieldError, getFirstErrorMessage } from "@/shared/lib/pocketbase-errors";
import Button from "@/shared/components/ui/Button";
import Input from "@/shared/components/ui/Input";
import Error from "@/shared/components/ui/Error";
import TrashIcon from "@/assets/icons/trash-2.svg?react";

const DEFAULT_COLOR = "#d82b2b";
const HEX_PATTERN = /^#[0-9a-fA-F]{6}$/;

interface CategoryFormProps {
  category?: ChallengeCategoriesResponse
  onDone: (id: string) => void
  onDeleted: (id: string) => void
  onCancel: () => void
}

type CategoryFields = {
  name: string,
  color: string,
}

export default function CategoryForm({ category, onDone, onDeleted, onCancel }: CategoryFormProps) {

  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();
  const [ isConfirmingDelete, setIsConfirmingDelete ] = useState<boolean>(false);

  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<CategoryFields>({
    defaultValues: {
      name: category?.name ?? "",
      color: category?.color || DEFAULT_COLOR,
    }
  });

  const mutation = category ? updateCategory : createCategory;
  const nameServerError = getFieldError(mutation.error, "name");
  const colorServerError = getFieldError(mutation.error, "color");

  const color = watch("color");

  function onSubmit(fields: CategoryFields) {
    if (category) {
      updateCategory.mutate({ id: category.id, ...fields }, { onSuccess: (record) => onDone(record.id) })
    } else {
      createCategory.mutate(fields, { onSuccess: (record) => onDone(record.id) })
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
        <label htmlFor="categoryName" className="text-sm font-medium">
          Nom
        </label>
        <Input
          id="categoryName"
          size="small"
          autoFocus
          variant={errors.name || nameServerError ? "error" : "normal"}
          {...register("name", { required: "Ce champ est requis." })}
        />

        <Error message={errors.name?.message} />
        <Error message={nameServerError} />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="categoryColor" className="text-sm font-medium">
          Couleur
        </label>
        <div className="flex flex-row items-center gap-2">
          <input
            type="color"
            aria-label="Sélecteur de couleur"
            value={HEX_PATTERN.test(color) ? color : DEFAULT_COLOR}
            onChange={(event) => setValue("color", event.target.value, { shouldValidate: true })}
            className="h-8 w-8 shrink-0 cursor-pointer rounded-md border border-input bg-background p-0.5"
          />
          <Input
            id="categoryColor"
            size="small"
            variant={errors.color || colorServerError ? "error" : "normal"}
            {...register("color", {
              required: "Ce champ est requis.",
              pattern: { value: HEX_PATTERN, message: "Format attendu : #rrggbb." },
            })}
          />
        </div>

        <Error message={errors.color?.message} />
        <Error message={colorServerError} />
      </div>

      {category && isConfirmingDelete ? (
        <div className="flex flex-col gap-2">
          <span className="text-sm text-muted-foreground">
            Supprimer « {category.name} » ?
          </span>
          <div className="flex flex-row justify-end gap-2">
            <Button type="button" onClick={() => setIsConfirmingDelete(false)} variant="ghost" size="small">
              Annuler
            </Button>
            <Button
              type="button"
              onClick={() => deleteCategory.mutate(category.id, { onSuccess: () => onDeleted(category.id) })}
              variant="destructive"
              size="small"
              disabled={deleteCategory.isPending}
            >
              {deleteCategory.isPending ? "Suppression…" : "Supprimer"}
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-row items-center justify-end gap-2">
          {category && (
            <Button
              type="button"
              onClick={() => setIsConfirmingDelete(true)}
              variant="destructiveGhost"
              size="icon"
              aria-label="Supprimer la catégorie"
              className="mr-auto"
            >
              <TrashIcon className="h-4 w-4" />
            </Button>
          )}
          <Button type="button" onClick={onCancel} variant="ghost" size="small">
            Annuler
          </Button>
          <Button type="button" onClick={handleSubmit(onSubmit)} variant="accent" size="small" disabled={mutation.isPending}>
            {mutation.isPending ? "Enregistrement…" : category ? "Modifier" : "Créer"}
          </Button>
        </div>
      )}

      {!nameServerError && !colorServerError && <Error message={getFirstErrorMessage(mutation.error)} />}
      <Error message={getFirstErrorMessage(deleteCategory.error)} />
    </div>
  );
}
