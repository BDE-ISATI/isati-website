import { useAuthStore } from "@/features/auth/store/useAuthStore";

export default function useHasPermission(action: string, resource: string): boolean {
  const permissions = useAuthStore((s) => s.permissions);
  return permissions.has("all:all") || permissions.has(`${action}:${resource}`);
}
