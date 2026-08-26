import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import useHasPermission from "@/features/roles/hooks/useHasPermission";

interface RequireRoleProps {
  action: string,
  resource: string,
  redirectTo?: string,
}

export default function RequirePermission({ action, resource, redirectTo = "/" }: RequireRoleProps) {

  const user = useAuthStore((s) => s.user);
  const isAllowed = useHasPermission(action, resource);

  if (!user || !isAllowed) {
    return <Navigate to={redirectTo} replace/>
  }

  return <Outlet />;
}
