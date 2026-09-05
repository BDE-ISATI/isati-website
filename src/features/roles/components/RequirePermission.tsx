import { Navigate, Outlet } from "react-router";
import type { ReactNode } from "react";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import useHasPermission from "@/features/roles/hooks/useHasPermission";

interface RequirePermissionProps {
  action: string,
  resource: string,
  fallback?: ReactNode,
}

export default function RequirePermission({ action, resource, fallback = <Navigate to="/" replace /> }: RequirePermissionProps) {

  const user = useAuthStore((s) => s.user);
  const isAllowed = useHasPermission(action, resource);

  if (!user || !isAllowed) {
    return <>{fallback}</>;
  }

  return <Outlet />;
}
