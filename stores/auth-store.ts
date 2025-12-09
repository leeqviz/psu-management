import {
  loginAction,
  logoutAction,
  meAction,
  registerAction,
} from "@/actions/auth";
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
  register: (
    user: User,
    currentPath?: string
  ) => Promise<{ success: boolean; user?: User; error?: string }>;
  // Our login/logout actions will call API routes
  logIn: (
    user: User,
    currentPath?: string
  ) => Promise<{ success: boolean; user?: User; error?: string }>;
  logOut: (currentPath?: string) => Promise<void>;
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

    register: async (user: User, currentPath?: string) => {
      set({ isLoading: true });
      const result = await registerAction(user, currentPath);
      if (!result.success) {
        set({ error: result.error, isLoading: false });
      }
      set({
        user: result.user,
        error: null,
        isLoading: false,
      });
      return result;
    },

    logIn: async (user: User, currentPath?: string) => {
      set({ isLoading: true });
      const result = await loginAction(user, currentPath);
      if (!result.success) {
        set({ error: result.error, isLoading: false });
      }
      set({
        user: result.user,
        error: null,
        isLoading: false,
      });
      return result;
    },

    logOut: async (currentPath?: string) => {
      set({ isLoading: true });
      await logoutAction(currentPath);
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
