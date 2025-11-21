import { loginAction, logoutAction, meAction } from "@/actions/auth";
import { User } from "@/types/access-control";
import { createStore } from "zustand";

type AuthState = {
  user: User | null;
  error: string | null;
  isLoading: boolean;
  isHydrated: boolean;
};

type AuthActions = {
  hydrate: (user: User | null) => void;
  // Our login/logout actions will call API routes
  logIn: (user: User) => Promise<void>;
  logOut: () => Promise<void>;
  // Sync and hydrate user data
  me: () => Promise<void>;
};

export type AuthStore = AuthState & AuthActions;

const defaultState: AuthState = {
  user: null,
  error: null,
  isLoading: false,
  isHydrated: false,
};

export const createAuthStore = (initState: AuthState = defaultState) => {
  return createStore<AuthStore>()((set) => ({
    ...initState,

    hydrate: (user: User | null) => set({ user, isHydrated: true }),

    logIn: async (user: User) => {
      set({ isLoading: true });
      const result = await loginAction(user);
      if (!result.success) {
        set({ error: result.error, isLoading: false });
      }
      set({
        user: result.user,
        error: null,
        isLoading: false,
      });
    },

    logOut: async () => {
      set({ isLoading: true });
      await logoutAction();
      set({ user: null, error: null, isLoading: false });
    },

    me: async () => {
      set({ isLoading: true });
      // Call our API route to update the cookie
      const result = await meAction();
      if (!result.success) {
        set({
          user: null,
          error: result.error,
          isLoading: false,
        });
      }
      set({
        user: result.user,
        error: null,
        isLoading: false,
      });
    },
  }));
};
