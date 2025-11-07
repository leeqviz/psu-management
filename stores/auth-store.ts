import { User } from "@/types/accessControl";
import { createStore } from "zustand";

type AuthState = {
  user: User | null;
};

type AuthActions = {
  // We'll use this to set the initial state from the server
  hydrate: (user: User | null) => void;
  // Our login/logout actions will call API routes
  logIn: (user: User) => Promise<void>;
  logOut: () => Promise<void>;
  // Sync user data
  me: () => Promise<void>;
};

export type AuthStore = AuthState & AuthActions;

const defaultState: AuthState = {
  user: null,
};

export const createAuthStore = (initState: AuthState = defaultState) => {
  return createStore<AuthStore>()((set) => ({
    ...initState,

    hydrate: (user) => {
      set({ user });
    },

    logIn: async (user: User) => {
      try {
        // Call our API route to set the secure cookie
        const response = await fetch("/api/auth/login", {
          method: "POST",
          body: JSON.stringify(user),
        });
        const data = await response.json();
        set({ user: data.user });
      } catch (error) {
        console.error("Login failed:", error);
      }
    },

    logOut: async () => {
      try {
        // Call our API route to clear the cookie
        await fetch("/api/auth/logout", { method: "POST" });
        set({ user: null });
      } catch (error) {
        console.error("Logout failed:", error);
      }
    },

    me: async () => {
      try {
        // Call our API route to update the cookie
        const response = await fetch("/api/auth/me", { method: "POST" });
        const data = await response.json();
        if (data && data.user) {
          set({ user: data.user });
        } else {
          set({ user: null });
        }
      } catch (error) {
        set({ user: null });
        console.error("Me failed:", error);
      }
    },
  }));
};
