import { useState } from "react";
import { Listbox } from "@headlessui/react";

import useUpdateMemberRole from "@/features/wei/hooks/mutations/useUpdateMemberRole";
import useRemoveMember from "@/features/wei/hooks/mutations/useRemoveMember";
import MemberIdentity from "@/features/wei/components/MemberIdentity";

import { ParticipationsRoleOptions } from "@/shared/types/pocketbase-types";
import type { ParticipationWithUser } from "@/shared/types/sharedTypes";
import StyledListboxButton from "@/shared/components/ui/StyledListboxButton";
import StyledListboxOptions from "@/shared/components/ui/StyledListboxOptions";
import StyledListboxOption from "@/shared/components/ui/StyledListboxOption";
import { getFirstErrorMessage } from "@/shared/lib/pocketbase-errors";
import Button from "@/shared/components/ui/Button";
import Error from "@/shared/components/ui/Error";
import ChevronDown from "@/assets/icons/chevron-down.svg?react";
import TrashIcon from "@/assets/icons/trash-2.svg?react";
import XIcon from "@/assets/icons/x.svg?react";

export const ROLE_LABELS: Record<ParticipationsRoleOptions, string> = {
  student: "Élève",
  team_leader: "Chef d'équipe",
};

interface MemberRowProps {
  participation: ParticipationWithUser
  teamId: string
}

export default function MemberRow({ participation, teamId }: MemberRowProps) {

  const updateRole = useUpdateMemberRole();
  const removeMember = useRemoveMember();
  const [ isConfirmingRemove, setIsConfirmingRemove ] = useState<boolean>(false);

  const userId = participation.user;
  const isBusy = updateRole.isPending || removeMember.isPending;

  return (
    <li className="flex flex-col gap-1 py-3 first:pt-0 last:pb-0">
      <div className="flex flex-row flex-wrap items-center gap-2">
        <MemberIdentity user={participation.expand?.user} className="mr-auto" />

        <Listbox
          value={participation.role}
          onChange={(role) => updateRole.mutate({ teamId: teamId, userId: userId, role: role })}
          disabled={isBusy}
        >
          <StyledListboxButton size="small" className="w-40 shrink-0">
            <span className="min-w-0 truncate">{ROLE_LABELS[participation.role]}</span>
            <ChevronDown aria-hidden="true" className="h-4 w-4 shrink-0" />
          </StyledListboxButton>
          <StyledListboxOptions>
            {Object.values(ParticipationsRoleOptions).map((role) => (
              <StyledListboxOption key={role} value={role}>
                {ROLE_LABELS[role]}
              </StyledListboxOption>
            ))}
          </StyledListboxOptions>
        </Listbox>

        {isConfirmingRemove ? (
          <>
            <Button
              type="button"
              onClick={() => removeMember.mutate({ teamId: teamId, userId: userId })}
              variant="destructive"
              size="small"
              disabled={isBusy}
            >
              Retirer
            </Button>
            <Button
              type="button"
              onClick={() => setIsConfirmingRemove(false)}
              variant="destructiveGhost"
              size="icon"
              aria-label="Annuler le retrait"
            >
              <XIcon className="h-4 w-4" />
            </Button>
          </>
        ) : (
          <Button
            type="button"
            onClick={() => setIsConfirmingRemove(true)}
            variant="destructiveGhost"
            size="icon"
            aria-label={`Retirer ${participation.expand?.user?.username ?? "ce membre"} de l'équipe`}
          >
            <TrashIcon className="h-4 w-4" />
          </Button>
        )}
      </div>

      <Error message={getFirstErrorMessage(updateRole.error)} />
      <Error message={getFirstErrorMessage(removeMember.error)} />
    </li>
  );
}
