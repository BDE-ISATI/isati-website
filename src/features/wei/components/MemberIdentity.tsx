import pb from "@/shared/lib/pocketbase";
import type { UsersResponse } from "@/shared/types/pocketbase-types";
import cn from "@/shared/utils/cn";

interface MemberIdentityProps {
  user?: UsersResponse
  className?: string
}

export default function MemberIdentity({ user, className }: MemberIdentityProps) {

  if (!user) return <span className="text-sm text-muted-foreground">Participant inconnu</span>;

  const avatarURL = user.avatar ? pb.files.getURL(user, user.avatar, { thumb: "100x100" }) : undefined;

  return (
    <span className={cn("flex min-w-0 flex-row items-center gap-2", className)}>
      <img
        src={avatarURL}
        alt=""
        className="h-8 w-8 shrink-0 rounded-full border border-border bg-muted object-cover"
      />
      <span className="flex min-w-0 flex-col">
        <span className="truncate text-sm font-medium">{user.username}</span>
        <span className="truncate text-xs text-muted-foreground">{user.email || "email masqué"}</span>
      </span>
    </span>
  );
}
