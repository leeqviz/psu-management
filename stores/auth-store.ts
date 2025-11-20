import { getMeAction, loginAction, logoutAction } from "@/actions/auth";
import { User } from "@/types/access-control";
import { createStore } from "zustand";

type AuthState = {
  user: User | null;
  isLoading: boolean;
  isHydrated: boolean;
};

type AuthActions = {
  hydrate: (user: User | null) => void;
  // Our login/logout actions will call API routes
  logIn: (user: User) => Promise<string | void>;
  logOut: () => Promise<void>;
  // Sync and hydrate user data
  me: () => Promise<void>;
};

export type AuthStore = AuthState & AuthActions;

const defaultState: AuthState = {
  user: null,
  isLoading: false,
  isHydrated: false,
};

export const createAuthStore = (initState: AuthState = defaultState) => {
  return createStore<AuthStore>()((set) => ({
    ...initState,

    hydrate: (user: User | null) =>
      set({ user, isHydrated: true, isLoading: false }),

    logIn: async (user: User) => {
      set({ isHydrated: false, isLoading: true });
      const result = await loginAction(user);
      if (!result.success) {
        set({ isHydrated: true, isLoading: false });
        return result.error;
      }
      set({ user: result.user, isHydrated: true, isLoading: false });
    },

    logOut: async () => {
      set({ isHydrated: false, isLoading: true });
      await logoutAction();
      set({ user: null, isHydrated: true, isLoading: false });
    },

    me: async () => {
      set({ isHydrated: false, isLoading: true });
      // Call our API route to update the cookie
      const result = await getMeAction();
      if (!result.success) {
        set({ user: null, isHydrated: true, isLoading: false });
        return;
      }
      set({ user: result.user, isHydrated: true, isLoading: false });
    },
  }));
};
