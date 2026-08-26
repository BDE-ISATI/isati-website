import { create } from "zustand";
import pb from '@/shared/lib/pocketbase'
import { ClientResponseError } from "pocketbase";
import type { UserWithRoles } from "@/shared/types/sharedTypes";
import { logout } from "@/features/auth/lib/auth";


interface AuthState {
  user: UserWithRoles | null,
  permissions: Set<string>,
  init: () => Promise<void>,
}

function currentUser(): UserWithRoles | null {
  return pb.authStore.isValid ? pb.authStore.record as UserWithRoles | null : null;
}

function currentPermissions(): Set<string> {
  return new Set(
    currentUser()?.expand?.roles?.flatMap(
      (role) => role.expand?.policies?.map((policy) => `${policy.action}:${policy.resource}`) ?? []
    ) ?? []
  );
}

export const useAuthStore = create<AuthState>(() => ({
  user: currentUser(),
  permissions: currentPermissions(),
  init: async () => {
    try {
      if (pb.authStore.isValid) {
        await pb.collection('users').authRefresh({
          expand: 'roles.policies'
        });
      } else {
        logout();
      }
    } catch (err) {
      if (err instanceof ClientResponseError && err.isAbort) return;
      logout();
    }
  }
}))

pb.authStore.onChange(() => {
  useAuthStore.setState({ user: currentUser(), permissions: currentPermissions() })
})