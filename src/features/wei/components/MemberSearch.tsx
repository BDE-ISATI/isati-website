import { useState } from "react";

import useWeiParticipations from "@/features/wei/hooks/queries/useWeiParticipations";
import useAssignMember from "@/features/wei/hooks/mutations/useAssignMember";
import useDebounce from "@/features/profile/hooks/useDebounce";
import MemberIdentity from "@/features/wei/components/MemberIdentity";

import { getFirstErrorMessage } from "@/shared/lib/pocketbase-errors";
import Button from "@/shared/components/ui/Button";
import Input from "@/shared/components/ui/Input";
import Error from "@/shared/components/ui/Error";
import SearchIcon from "@/assets/icons/search.svg?react";

const MAX_RESULTS = 8;

interface MemberSearchProps {
  weiId: string
  teamId: string
}

export default function MemberSearch({ weiId, teamId }: MemberSearchProps) {

  const participations = useWeiParticipations(weiId);
  const assignMember = useAssignMember();
  const [ query, setQuery ] = useState<string>("");
  const search = useDebounce(query, 300).trim().toLowerCase();

  const available = participations.data?.filter((participation) => participation.state === "pending") ?? [];

  const results = available
    .filter((participation) => {
      if (!search) return true;
      const user = participation.expand?.user;
      if (!user) return false;
      return user.username.toLowerCase().includes(search) || user.email.toLowerCase().includes(search);
    })
    .slice(0, MAX_RESULTS);

  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        <SearchIcon aria-hidden="true" className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          id="memberSearch"
          className="pl-9"
          placeholder="Rechercher un inscrit (pseudo ou email)"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>

      <Error message={getFirstErrorMessage(participations.error)} />
      <Error message={getFirstErrorMessage(assignMember.error)} />

      {available.length === 0 ? (
        <p className="text-sm text-muted-foreground">Tous les inscrits sont affectés.</p>
      ) : results.length === 0 ? (
        <p className="text-sm text-muted-foreground">Aucun inscrit sans équipe ne correspond.</p>
      ) : (
        <ul className="flex flex-col divide-y divide-border">
          {results.map((participation) => (
            <li key={participation.id} className="flex flex-row items-center gap-2 py-2 first:pt-0 last:pb-0">
              <MemberIdentity user={participation.expand?.user} className="mr-auto" />
              <Button
                type="button"
                onClick={() => assignMember.mutate({ teamId: teamId, userId: participation.user })}
                variant="accent"
                size="small"
                disabled={assignMember.isPending}
              >
                Affecter
              </Button>
            </li>
          ))}
        </ul>
      )}

      {available.length > results.length && (
        <p className="text-xs text-muted-foreground">
          {available.length - results.length} autre(s) inscrit(s) sans équipe - affinez la recherche.
        </p>
      )}
    </div>
  );
}
