import { useEffect, useState } from "react";
import { Listbox } from "@headlessui/react";

import useCurrentWei from "@/features/wei/hooks/queries/useCurrentWei";
import useTeamScores from "@/features/wei/hooks/queries/useTeamScores";
import useReviewValidations, { type ReviewStatusFilter } from "@/features/wei/hooks/queries/useReviewValidations";
import ValidationCard from "@/features/wei/components/ValidationCard";
import { getFirstErrorMessage } from "@/shared/lib/pocketbase-errors";
import Button from "@/shared/components/ui/Button";
import Error from "@/shared/components/ui/Error";
import LoadingOverlay from "@/shared/components/ui/LoadingOverlay";
import StyledListboxButton from "@/shared/components/ui/StyledListboxButton";
import StyledListboxOptions from "@/shared/components/ui/StyledListboxOptions";
import StyledListboxOption from "@/shared/components/ui/StyledListboxOption";
import ChevronDown from "@/assets/icons/chevron-down.svg?react";
import ChevronUp from "@/assets/icons/chevron-up.svg?react";
import PageNav from "@/shared/components/layout/PageNav";

const STATUS_FILTERS: { value: ReviewStatusFilter, label: string }[] = [
  { value: "pending", label: "En attente" },
  { value: "accepted", label: "Acceptées" },
  { value: "refused", label: "Refusées" },
  { value: "all", label: "Toutes" },
];

export default function Validation() {

  useEffect(() => {
    document.title = "Validations | ISATI";
  }, []);

  const [ status, setStatus ] = useState<ReviewStatusFilter>("pending");
  const [ teamId, setTeamId ] = useState("");
  const [ order, setOrder ] = useState<"asc" | "desc">("desc");

  const currentWei = useCurrentWei();
  const teams = useTeamScores(currentWei.data?.id);
  const validations = useReviewValidations(currentWei.data?.id, { status, teamId, order });

  const statusLabel = STATUS_FILTERS.find((filter) => filter.value === status)?.label ?? "Toutes";
  const teamLabel = teams.data?.find((team) => team.id === teamId)?.name ?? "Toutes les équipes";

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-4 md:py-6">
      <PageNav />

      <h1 className="text-2xl font-semibold">Validations</h1>

      <div className="flex flex-row flex-wrap items-center gap-3">
        <Listbox value={status} onChange={setStatus}>
          <div className="relative">
            <StyledListboxButton size="small" className="w-44">
              <span>{statusLabel}</span>
              <ChevronDown aria-hidden="true" className="h-4 w-4 shrink-0" />
            </StyledListboxButton>
            <StyledListboxOptions anchor="bottom start">
              {STATUS_FILTERS.map((filter) => (
                <StyledListboxOption key={filter.value} value={filter.value}>
                  {filter.label}
                </StyledListboxOption>
              ))}
            </StyledListboxOptions>
          </div>
        </Listbox>

        <Listbox value={teamId} onChange={setTeamId}>
          <div className="relative">
            <StyledListboxButton size="small" className="w-56">
              <span className="truncate">{teamLabel}</span>
              <ChevronDown aria-hidden="true" className="h-4 w-4 shrink-0" />
            </StyledListboxButton>
            <StyledListboxOptions anchor="bottom start">
              <StyledListboxOption value="">Toutes les équipes</StyledListboxOption>
              {teams.data?.map((team) => (
                <StyledListboxOption key={team.id} value={team.id}>
                  {team.name || "Équipe sans nom"}
                </StyledListboxOption>
              ))}
            </StyledListboxOptions>
          </div>
        </Listbox>

        <Button
          type="button"
          onClick={() => setOrder(order === "desc" ? "asc" : "desc")}
          variant="secondary"
          size="small"
        >
          {order === "desc" ? "Plus récentes d'abord" : "Plus anciennes d'abord"}
          {order === "desc"
            ? <ChevronDown aria-hidden="true" className="h-4 w-4" />
            : <ChevronUp aria-hidden="true" className="h-4 w-4" />}
        </Button>
      </div>

      <Error message={getFirstErrorMessage(validations.error ?? teams.error)} />

      {validations.isPending && (
        <div className="relative min-h-64 flex-1">
          <LoadingOverlay />
        </div>
      )}

      {validations.data && validations.data.length === 0 && (
        <p className="text-sm text-muted-foreground">
          {status === "pending" ? "Aucune demande en attente." : "Aucune validation pour ces critères."}
        </p>
      )}

      {validations.data && validations.data.length > 0 && (
        <div className="flex flex-col gap-3">
          {validations.data.map((validation) => (
            <ValidationCard key={validation.id} validation={validation} />
          ))}
        </div>
      )}
    </div>
  );
}
