import type { RolesRecord } from "@/shared/types/pocketbase-types";
import { darken } from 'color2k';

interface RoleBadgeProps {
  role: RolesRecord
}

export default function RoleBadge({ role }: RoleBadgeProps) {

  return (
    <span
      style={{
        backgroundColor: role.color,
        borderColor: darken(role.color, 0.09),
      }}
      className="inline-flex items-center rounded-md border-2 px-2 py-0.5 text-xs font-medium text-white"
    >
      {role.label}
    </span>
  );
}
