import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import { useAuthStore } from "@/features/auth/store/useAuthStore";
import useCreateValidation from "@/features/wei/hooks/mutations/useCreateValidation";
import ProofImageField, { type ProofFileValue } from "@/features/wei/components/ProofImageField";
import ProofVideoField from "@/features/wei/components/ProofVideoField";
import { PROOF_TYPE_LABELS } from "@/features/wei/libs/challenge";

import type { ChallengesProofTypeOptions } from "@/shared/types/pocketbase-types";
import type { ChallengeWithRelations, ParticipationWithTeam } from "@/shared/types/sharedTypes";
import { getFieldError, getFirstErrorMessage } from "@/shared/lib/pocketbase-errors";
import Button from "@/shared/components/ui/Button";
import Input from "@/shared/components/ui/Input";
import Error from "@/shared/components/ui/Error";
import LoadingOverlay from "@/shared/components/ui/LoadingOverlay";
import StyledSwitch from "@/shared/components/ui/StyledSwitch";
import cn from "@/shared/utils/cn";

interface ValidationFormProps {
  challenge: ChallengeWithRelations
  participation?: ParticipationWithTeam | null
}

type ValidationFields = {
  proof_file: ProofFileValue,
  proof_text: string,
  public: boolean,
  archived: boolean,
};

export default function ValidationForm({ challenge, participation }: ValidationFormProps) {

  const navigate = useNavigate();
  const userId = useAuthStore((s) => s.user?.id);
  const createValidation = useCreateValidation();

  const proofTypes = challenge.proof_type ?? [];
  const [ proofType, setProofType ] = useState<ChallengesProofTypeOptions | undefined>(proofTypes[0]);

  const { control, register, handleSubmit, formState: { errors }, watch, setValue } = useForm<ValidationFields>({
    defaultValues: {
      proof_file: null,
      proof_text: "",
      public: false,
      archived: false,
    }
  });

  const proofFile = watch("proof_file");
  const proofText = watch("proof_text");
  const isPublic = watch("public");
  const isArchived = watch("archived");
  const isBusy = createValidation.isPending;
  const isSupported = !!proofType;
  const hasProof = proofType === "link" ? proofText.trim().length > 0 : !!proofFile;

  function onSubmit(fields: ValidationFields) {
    createValidation.mutate({
      challenge: challenge.id,
      user: userId,
      team: participation?.team,
      status: "pending",
      submitted_at: new Date().toISOString(),
      public: fields.public,
      archived: fields.archived,
      ...(proofType === "link"
        ? { proof_text: fields.proof_text.trim() }
        : { proof_file: fields.proof_file }),
    });
  }

  return (
    <div className="relative">
      <div
        inert={isBusy}
        className={cn("transition duration-200", isBusy && "blur-sm pointer-events-none select-none")}
      >
        <form noValidate onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">

          {proofTypes.length > 1 && (
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium">Type de preuve</span>
              <div className="flex flex-row flex-wrap gap-2">
                {proofTypes.map((type) => (
                  <Button
                    key={type}
                    type="button"
                    onClick={() => setProofType(type)}
                    variant={proofType === type ? "accent" : "secondary"}
                    size="small"
                  >
                    {PROOF_TYPE_LABELS[type]}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {proofTypes.length === 0 && (
            <p className="text-sm text-muted-foreground">
              Aucun type de preuve n'est configuré pour ce défi.
            </p>
          )}

          {(proofType === "image" || proofType === "video") && (
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium">Preuve</span>
              <Controller
                control={control}
                name="proof_file"
                render={({ field }) => (
                  proofType === "video"
                    ? <ProofVideoField value={field.value} onChange={field.onChange} />
                    : <ProofImageField value={field.value} onChange={field.onChange} />
                )}
              />

              <Error message={getFieldError(createValidation.error, "proof_file")} />
            </div>
          )}

          {proofType === "link" && (
            <div className="flex flex-col gap-1">
              <label htmlFor="proof_text" className="text-sm font-medium">
                Lien de la preuve
              </label>
              <Input
                id="proof_text"
                type="url"
                placeholder="https://…"
                variant={errors.proof_text || getFieldError(createValidation.error, "proof_text") ? "error" : "normal"}
                {...register("proof_text", {
                  validate: (value) => proofType !== "link" || value.trim().length > 0 || "Ce champ est requis.",
                })}
              />

              <Error message={errors.proof_text?.message} />
              <Error message={getFieldError(createValidation.error, "proof_text")} />
            </div>
          )}

          <div className="flex flex-row items-start justify-between gap-3">
            <span className="flex flex-col gap-0.5">
              <span className="text-sm font-medium">Rendre ma preuve publique</span>
              <span className="text-xs text-muted-foreground">
                Tout le monde pourra voir cette preuve sur la page d'accueil.
              </span>
            </span>
            <StyledSwitch
              checked={isPublic}
              onChange={(checked) => setValue("public", checked)}
              aria-label="Rendre ma preuve publique"
              className="mt-0.5"
            />
          </div>

          <div className="flex flex-row items-start justify-between gap-3">
            <span className="flex flex-col gap-0.5">
              <span className="text-sm font-medium">Conserver ma preuve après le WEI</span>
              <span className="text-xs text-muted-foreground">
                Sans cette option, le fichier est supprimé une semaine après le WEI.
              </span>
            </span>
            <StyledSwitch
              checked={isArchived}
              onChange={(checked) => setValue("archived", checked)}
              aria-label="Conserver ma preuve après le WEI"
              className="mt-0.5"
            />
          </div>

          <Error message={getFirstErrorMessage(createValidation.error)} />

          <div className="flex flex-row flex-wrap items-center justify-end gap-2">
            <Button type="button" onClick={() => navigate(`/wei/challenge/${challenge.id}`)} variant="ghost">
              Annuler
            </Button>
            <Button type="submit" variant="accent" disabled={isBusy || !isSupported || !hasProof}>
              Envoyer la preuve
            </Button>
          </div>

        </form>
      </div>
      {isBusy && <LoadingOverlay />}
    </div>
  );
}
