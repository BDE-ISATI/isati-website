import type { ChallengesScopeOptions } from "@/shared/types/pocketbase-types";
import { SCOPE_LABELS } from "@/features/wei/libs/challenge";
import UserRound from "@/assets/icons/user-round.svg?react";
import UsersRound from "@/assets/icons/users-round.svg?react";
import cn from "@/shared/utils/cn";

interface ChallengeScopeProps {
  scope?: ChallengesScopeOptions
  className?: string
}

export default function ChallengeScope({ scope, className }: ChallengeScopeProps) {
  if (!scope) return null;

  const Icon = scope === "team" ? UsersRound : UserRound;

  return (
    <div className={cn("flex flex-row items-center gap-1.5", className)}>
      <Icon aria-hidden="true" className="h-4 w-4 shrink-0" />
      <span className="text-xs font-medium">{SCOPE_LABELS[scope]}</span>
    </div>
  );
}
