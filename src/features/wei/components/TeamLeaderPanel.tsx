import { useState } from "react";
import { Listbox } from "@headlessui/react";
import { darken } from "color2k";

import useTeamScores from "@/features/wei/hooks/queries/useTeamScores";
import useWeiParticipations from "@/features/wei/hooks/queries/useWeiParticipations";
import useUserSearch from "@/features/wei/hooks/queries/useUserSearch";
import useAssignMember from "@/features/wei/hooks/mutations/useAssignMember";
import useDebounce from "@/features/profile/hooks/useDebounce";
import MemberIdentity from "@/features/wei/components/MemberIdentity";
import MemberRow from "@/features/wei/components/MemberRow";

import StyledListboxButton from "@/shared/components/ui/StyledListboxButton";
import StyledListboxOptions from "@/shared/components/ui/StyledListboxOptions";
import StyledListboxOption from "@/shared/components/ui/StyledListboxOption";
import { getFirstErrorMessage } from "@/shared/lib/pocketbase-errors";
import Button from "@/shared/components/ui/Button";
import Input from "@/shared/components/ui/Input";
import Error from "@/shared/components/ui/Error";
import ChevronDown from "@/assets/icons/chevron-down.svg?react";
import SearchIcon from "@/assets/icons/search.svg?react";
import cn from "@/shared/utils/cn";

interface TeamLeaderPanelProps {
  weiId: string
  className?: string
}

export default function TeamLeaderPanel({ weiId, className }: TeamLeaderPanelProps) {

  const teams = useTeamScores(weiId);
  const participations = useWeiParticipations(weiId);
  const assignMember = useAssignMember();
  const [ query, setQuery ] = useState<string>("");
  const [ targetTeam, setTargetTeam ] = useState<string | null>(null);
  const search = useUserSearch(useDebounce(query, 300).trim());

  const selectedTeam = teams.data?.find((team) => team.id === targetTeam);

  return (
    <div className={cn("flex flex-col gap-8", className)}>

      <section className="flex w-full flex-col gap-3 rounded-md border border-border bg-card p-4 text-card-foreground shadow-sm sm:p-6">
        <h2 className="text-lg font-semibold">Désigner un chef d'équipe</h2>
        <p className="text-sm text-muted-foreground">
          La recherche porte sur tous les comptes du site : un chef n'est pas forcément inscrit au WEI,
          ni en première année.
        </p>

        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative min-w-0 grow">
            <SearchIcon aria-hidden="true" className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="leaderSearch"
              className="w-full pl-9"
              placeholder="Rechercher un compte (pseudo ou email)"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>

          <Listbox value={targetTeam} onChange={setTargetTeam}>
            <StyledListboxButton className="w-full shrink-0 sm:w-56">
              <span className={cn("min-w-0 truncate", !selectedTeam && "text-muted-foreground")}>
                {selectedTeam ? selectedTeam.name : "Équipe cible"}
              </span>
              <ChevronDown aria-hidden="true" className="h-4 w-4 shrink-0" />
            </StyledListboxButton>
            <StyledListboxOptions>
              {teams.data?.map((team) => (
                <StyledListboxOption key={team.id} value={team.id}>
                  {team.name}
                </StyledListboxOption>
              ))}
            </StyledListboxOptions>
          </Listbox>
        </div>

        <Error message={getFirstErrorMessage(search.error)} />
        <Error message={getFirstErrorMessage(assignMember.error)} />

        {search.data?.length === 0 && (
          <p className="text-sm text-muted-foreground">Aucun compte ne correspond.</p>
        )}

        <ul className="flex flex-col divide-y divide-border">
          {search.data?.map((user) => (
            <li key={user.id} className="flex flex-row items-center gap-2 py-2 first:pt-0 last:pb-0">
              <MemberIdentity user={user} className="mr-auto" />
              <Button
                type="button"
                onClick={() => targetTeam && assignMember.mutate({ teamId: targetTeam, userId: user.id, role: "team_leader" })}
                variant="accent"
                size="small"
                disabled={!targetTeam || assignMember.isPending}
              >
                Désigner
              </Button>
            </li>
          ))}
        </ul>

        {!targetTeam && (
          <p className="text-xs text-muted-foreground">Choisissez une équipe cible pour pouvoir désigner.</p>
        )}
      </section>

      <Error message={getFirstErrorMessage(teams.error)} />
      <Error message={getFirstErrorMessage(participations.error)} />

      {teams.data?.map((team) => {
        const leaders = participations.data?.filter(
          (participation) => participation.team === team.id && participation.role === "team_leader"
        ) ?? [];

        return (
          <section key={team.id} className="flex w-full flex-col gap-2">
            <h2 className="flex flex-row items-center gap-2 text-lg font-semibold">
              <span
                aria-hidden="true"
                style={{
                  backgroundColor: team.color,
                  borderColor: team.color ? darken(team.color, 0.09) : undefined,
                }}
                className="h-4 w-4 shrink-0 rounded-full border-2"
              />
              {team.name}
            </h2>

            {leaders.length === 0 ? (
              <p className="text-sm text-muted-foreground">Aucun chef désigné.</p>
            ) : (
              <ul className="flex flex-col divide-y divide-border rounded-md border border-border bg-card p-4 text-card-foreground shadow-sm">
                {leaders.map((leader) => (
                  <MemberRow key={leader.id} participation={leader} teamId={team.id} />
                ))}
              </ul>
            )}
          </section>
        );
      })}
    </div>
  );
}
