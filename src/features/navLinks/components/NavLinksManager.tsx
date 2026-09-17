import { useState } from "react";
import { useForm } from "react-hook-form";

import useNavLinks from "@/features/navLinks/hooks/queries/useNavLinks";
import useCreateNavLink from "@/features/navLinks/hooks/mutations/useCreateNavLink";
import useUpdateNavLink from "@/features/navLinks/hooks/mutations/useUpdateNavLink";
import useDeleteNavLink from "@/features/navLinks/hooks/mutations/useDeleteNavLink";
import useHasPermission from "@/features/roles/hooks/useHasPermission";
import type { NavLinksResponse } from "@/shared/types/pocketbase-types";
import { getFieldError, getFirstErrorMessage } from "@/shared/lib/pocketbase-errors";
import Button from "@/shared/components/ui/Button";
import Input from "@/shared/components/ui/Input";
import Error from "@/shared/components/ui/Error";
import StyledSwitch from "@/shared/components/ui/StyledSwitch";
import LoadingOverlay from "@/shared/components/ui/LoadingOverlay";
import cn from "@/shared/utils/cn";

import PenIcon from "@/assets/icons/pen.svg?react";
import PlusIcon from "@/assets/icons/plus.svg?react";
import TrashIcon from "@/assets/icons/trash-2.svg?react";

type Mode =
  | { kind: "list" }
  | { kind: "create" }
  | { kind: "edit", id: string }

export default function NavLinksManager() {

  const navLinks = useNavLinks();
  const toggleNavLink = useUpdateNavLink();
  const [ mode, setMode ] = useState<Mode>({ kind: "list" });

  const canCreate = useHasPermission("create", "nav_links");
  const canUpdate = useHasPermission("update", "nav_links");

  const isBusy = navLinks.isPending || toggleNavLink.isPending;

  return (
    <div className="flex flex-col gap-2">

      <Error message={getFirstErrorMessage(navLinks.error)} />
      <Error message={getFirstErrorMessage(toggleNavLink.error)} />

      <div className="relative">
        <div inert={isBusy} className={cn(
          "flex flex-col divide-y divide-border rounded-md border border-border transition duration-200",
          isBusy && "pointer-events-none blur-sm select-none"
        )}>

          {navLinks.data?.length === 0 && mode.kind !== "create" && (
            <p className="p-3 text-sm text-muted-foreground">
              Aucun lien pour le moment.
            </p>
          )}

          {navLinks.data?.map((navLink) => (
            mode.kind === "edit" && mode.id === navLink.id ? (
              <NavLinkForm
                key={navLink.id}
                navLink={navLink}
                onDone={() => setMode({ kind: "list" })}
                onCancel={() => setMode({ kind: "list" })}
              />
            ) : (
              <div key={navLink.id} className="flex flex-row items-center justify-between gap-3 p-3 text-sm">
                <div className="flex min-w-0 flex-col">
                  <span className={cn("truncate font-medium", !navLink.enabled && "text-muted-foreground")}>
                    {navLink.label}
                  </span>
                  <span className="truncate text-muted-foreground">{navLink.url}</span>
                </div>

                {canUpdate && (
                  <div className="flex shrink-0 flex-row items-center gap-2">
                    <StyledSwitch
                      checked={navLink.enabled}
                      onChange={(checked) => toggleNavLink.mutate({
                        id: navLink.id,
                        label: navLink.label,
                        url: navLink.url,
                        enabled: checked
                      })}
                      aria-label={`Afficher ${navLink.label} dans la navigation`}
                    />
                    <Button
                      type="button"
                      onClick={() => setMode({ kind: "edit", id: navLink.id })}
                      variant="secondary"
                      size="icon"
                      aria-label={`Modifier ${navLink.label}`}
                    >
                      <PenIcon className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            )
          ))}

          {mode.kind === "create" && (
            <NavLinkForm
              onDone={() => setMode({ kind: "list" })}
              onCancel={() => setMode({ kind: "list" })}
            />
          )}

          {canCreate && mode.kind === "list" && (
            <button
              type="button"
              onClick={() => setMode({ kind: "create" })}
              className="flex cursor-pointer flex-row items-center justify-center gap-2 p-3 text-sm text-accent hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <PlusIcon className="h-4 w-4" />
              Ajouter un lien
            </button>
          )}

        </div>

        {isBusy && <LoadingOverlay />}
      </div>

    </div>
  );
}


interface NavLinkFormProps {
  navLink?: NavLinksResponse
  onDone: () => void
  onCancel: () => void
}

type NavLinkFields = {
  label: string,
  url: string,
  enabled: boolean,
}

function NavLinkForm({ navLink, onDone, onCancel }: NavLinkFormProps) {

  const createNavLink = useCreateNavLink();
  const updateNavLink = useUpdateNavLink();
  const deleteNavLink = useDeleteNavLink();
  const canDelete = useHasPermission("delete", "nav_links");
  const [ isConfirmingDelete, setIsConfirmingDelete ] = useState<boolean>(false);

  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<NavLinkFields>({
    defaultValues: {
      label: navLink?.label ?? "",
      url: navLink?.url ?? "",
      enabled: navLink?.enabled ?? true,
    }
  });

  const mutation = navLink ? updateNavLink : createNavLink;
  const labelServerError = getFieldError(mutation.error, "label");
  const urlServerError = getFieldError(mutation.error, "url");

  const enabled = watch("enabled");

  function onSubmit(fields: NavLinkFields) {
    if (navLink) {
      updateNavLink.mutate({ id: navLink.id, ...fields }, { onSuccess: () => onDone() })
    } else {
      createNavLink.mutate(fields, { onSuccess: () => onDone() })
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
        <label htmlFor="navLinkLabel" className="text-sm font-medium">
          Nom
        </label>
        <Input
          id="navLinkLabel"
          size="small"
          autoFocus
          variant={errors.label || labelServerError ? "error" : "normal"}
          {...register("label", { required: "Ce champ est requis." })}
        />

        <Error message={errors.label?.message} />
        <Error message={labelServerError} />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="navLinkUrl" className="text-sm font-medium">
          Adresse
        </label>
        <Input
          id="navLinkUrl"
          size="small"
          placeholder="https://"
          variant={errors.url || urlServerError ? "error" : "normal"}
          {...register("url", { required: "Ce champ est requis." })}
        />

        <Error message={errors.url?.message} />
        <Error message={urlServerError} />
      </div>

      <div className="flex flex-row items-center justify-between gap-3">
        <span className="text-sm font-medium">Afficher dans la navigation</span>
        <StyledSwitch
          checked={enabled}
          onChange={(checked) => setValue("enabled", checked)}
          aria-label="Afficher dans la navigation"
        />
      </div>

      {navLink && isConfirmingDelete ? (
        <div className="flex flex-col gap-2">
          <span className="text-sm text-muted-foreground">
            Supprimer « {navLink.label || "ce lien"} » ?
          </span>
          <div className="flex flex-row justify-end gap-2">
            <Button type="button" onClick={() => setIsConfirmingDelete(false)} variant="ghost" size="small">
              Annuler
            </Button>
            <Button
              type="button"
              onClick={() => deleteNavLink.mutate(navLink.id, { onSuccess: () => onDone() })}
              variant="destructive"
              size="small"
              disabled={deleteNavLink.isPending}
            >
              {deleteNavLink.isPending ? "Suppression…" : "Supprimer"}
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-row items-center justify-end gap-2">
          {navLink && canDelete && (
            <Button
              type="button"
              onClick={() => setIsConfirmingDelete(true)}
              variant="destructiveGhost"
              size="icon"
              aria-label="Supprimer le lien"
              className="mr-auto"
            >
              <TrashIcon className="h-4 w-4" />
            </Button>
          )}
          <Button type="button" onClick={onCancel} variant="ghost" size="small">
            Annuler
          </Button>
          <Button type="button" onClick={handleSubmit(onSubmit)} variant="accent" size="small" disabled={mutation.isPending}>
            {mutation.isPending ? "Enregistrement…" : navLink ? "Modifier" : "Créer"}
          </Button>
        </div>
      )}

      {!labelServerError && !urlServerError && <Error message={getFirstErrorMessage(mutation.error)} />}
      <Error message={getFirstErrorMessage(deleteNavLink.error)} />
    </div>
  );
}
