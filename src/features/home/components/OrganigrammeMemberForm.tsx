import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import imageCompression, { type Options } from "browser-image-compression";

import useCreateOrganigrammeMember from "@/features/home/hooks/mutations/useCreateOrganigrammeMember";
import useUpdateOrganigrammeMember from "@/features/home/hooks/mutations/useUpdateOrganigrammeMember";
import useDeleteOrganigrammeMember from "@/features/home/hooks/mutations/useDeleteOrganigrammeMember";

import pb from "@/shared/lib/pocketbase";
import type { OrganigrammeMemberPoleOptions, OrganigrammeMemberResponse } from "@/shared/types/pocketbase-types";
import { getFieldError, getFirstErrorMessage } from "@/shared/lib/pocketbase-errors";
import Button from "@/shared/components/ui/Button";
import Input from "@/shared/components/ui/Input";
import Error from "@/shared/components/ui/Error";
import PenIcon from "@/assets/icons/pen.svg?react";
import XIcon from "@/assets/icons/x.svg?react";

const COMPRESSION_OPTIONS: Options = {
  maxSizeMB: 0.2,
  maxWidthOrHeight: 400,
  useWebWorker: true,
  fileType: "image/webp",
  initialQuality: 0.85,
};

type AvatarValue = File | null | undefined;

type MemberFields = {
  name: string,
  role: string,
  instagram: string,
  avatar: AvatarValue,
}

interface OrganigrammeMemberFormProps {
  pole: OrganigrammeMemberPoleOptions
  member?: OrganigrammeMemberResponse
  onDone: () => void
}

function AvatarField({ value, onChange, currentUrl }: { value: AvatarValue, onChange: (value: AvatarValue) => void, currentUrl?: string }) {

  const fileSelectorRef = useRef<HTMLInputElement>(null);
  const [ isCompressing, setIsCompressing ] = useState<boolean>(false);
  const [ compressionError, setCompressionError ] = useState<string | null>(null);
  const [ preview, setPreview ] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!(value instanceof Blob)) {
      setPreview(value === null ? undefined : currentUrl);
      return;
    }
    const url = URL.createObjectURL(value);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [value, currentUrl]);

  async function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    setIsCompressing(true);
    setCompressionError(null);
    try {
      const compressed = await imageCompression(file, COMPRESSION_OPTIONS);
      onChange(new File([compressed], "avatar.webp", { type: "image/webp" }));
    } catch {
      setCompressionError("Impossible de traiter cette image.");
    } finally {
      setIsCompressing(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <input ref={fileSelectorRef} accept="image/*" type="file" className="hidden" onChange={handleFileSelect} />

      <div className="flex flex-row items-center gap-3">
        {preview ? (
          <img src={preview} alt="Aperçu de la photo" className="h-20 w-20 rounded-full border border-border object-cover" />
        ) : (
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-dashed border-input bg-muted text-center">
            <span className="text-xs text-muted-foreground">Aucune photo</span>
          </div>
        )}

        <Button
          type="button"
          onClick={() => fileSelectorRef.current?.click()}
          variant="secondary"
          size="small"
          disabled={isCompressing}
        >
          <PenIcon className="h-4 w-4" />
          {preview ? "Changer" : "Choisir une photo"}
        </Button>
        {preview && (
          <Button type="button" onClick={() => onChange(null)} variant="destructiveGhost" size="icon" aria-label="Retirer la photo">
            <XIcon className="h-4 w-4" />
          </Button>
        )}
      </div>

      <Error message={compressionError ?? undefined} />
    </div>
  );
}

export default function OrganigrammeMemberForm({ pole, member, onDone }: OrganigrammeMemberFormProps) {

  const createMember = useCreateOrganigrammeMember();
  const updateMember = useUpdateOrganigrammeMember();
  const deleteMember = useDeleteOrganigrammeMember();
  const [ isConfirmingDelete, setIsConfirmingDelete ] = useState<boolean>(false);

  const { register, control, handleSubmit, formState: { errors } } = useForm<MemberFields>({
    defaultValues: {
      name: member?.name ?? "",
      role: member?.role ?? "",
      instagram: member?.instagram ?? "",
      avatar: undefined,
    }
  });

  const mutation = member ? updateMember : createMember;
  const isBusy = createMember.isPending || updateMember.isPending || deleteMember.isPending;
  const avatarUrl = member?.avatar ? pb.files.getURL(member, member.avatar, { thumb: "300x300" }) : undefined;

  function onSubmit(fields: MemberFields) {
    const record = {
      pole,
      name: fields.name,
      role: fields.role,
      instagram: fields.instagram,
    };

    if (member) {
      updateMember.mutate(
        { id: member.id, data: { ...record, ...(fields.avatar === undefined ? {} : { avatar: fields.avatar }) } },
        { onSuccess: onDone }
      );
    } else {
      createMember.mutate({ ...record, avatar: fields.avatar ?? null }, { onSuccess: onDone });
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} inert={isBusy} className="flex flex-col gap-4">

      <div className="flex flex-col gap-1">
        <label htmlFor="member-name" className="text-sm font-medium">Nom</label>
        <Input
          id="member-name"
          autoFocus
          variant={errors.name || getFieldError(mutation.error, "name") ? "error" : "normal"}
          {...register("name", { required: "Ce champ est requis." })}
        />
        <Error message={errors.name?.message} />
        <Error message={getFieldError(mutation.error, "name")} />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="member-role" className="text-sm font-medium">Rôle</label>
        <Input
          id="member-role"
          variant={errors.role || getFieldError(mutation.error, "role") ? "error" : "normal"}
          {...register("role", { required: "Ce champ est requis." })}
        />
        <Error message={errors.role?.message} />
        <Error message={getFieldError(mutation.error, "role")} />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="member-instagram" className="text-sm font-medium">Instagram</label>
        <Input id="member-instagram" type="url" placeholder="https://www.instagram.com/…" {...register("instagram")} />
        <Error message={getFieldError(mutation.error, "instagram")} />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Photo</label>
        <Controller
          control={control}
          name="avatar"
          render={({ field }) => (
            <AvatarField value={field.value} onChange={field.onChange} currentUrl={avatarUrl} />
          )}
        />
        <Error message={getFieldError(mutation.error, "avatar")} />
      </div>

      <Error message={getFirstErrorMessage(mutation.error)} />
      <Error message={getFirstErrorMessage(deleteMember.error)} />

      {member && isConfirmingDelete && (
        <div className="flex flex-row flex-wrap items-center gap-2">
          <p className="mr-auto text-sm text-muted-foreground">Retirer « {member.name} » de l'organigramme ?</p>
          <Button type="button" onClick={() => deleteMember.mutate(member.id, { onSuccess: onDone })} variant="destructive" size="small">
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
        {member && !isConfirmingDelete && (
          <Button type="button" onClick={() => setIsConfirmingDelete(true)} variant="destructive" className="mr-auto">
            Supprimer
          </Button>
        )}
        <Button type="button" onClick={onDone} variant="ghost">Annuler</Button>
        <Button type="submit" variant="accent" disabled={isBusy}>
          {member ? "Enregistrer" : "Ajouter"}
        </Button>
      </div>

    </form>
  );
}
