import { create } from "zustand";
import pb from '@/shared/lib/pocketbase'
import { ClientResponseError, type RecordModel } from "pocketbase";


interface AuthState {
  user: RecordModel | null,
  isLoggedIn: boolean,
  init: () => Promise<void>,
}

export const useAuthStore = create<AuthState>(() => ({
  user: pb.authStore.record,
  isLoggedIn: pb.authStore.isValid,
  init: async () => {
    try {
      if (pb.authStore.isValid) { 
        await pb.collection('users').authRefresh();
      }
    } catch(err) {
      if (err instanceof ClientResponseError && err.isAbort) return;
      pb.authStore.clear();
    }
  }
}))



pb.authStore.onChange(() => {
  useAuthStore.setState({
    user: pb.authStore.record,
    isLoggedIn: pb.authStore.isValid
  })
})
