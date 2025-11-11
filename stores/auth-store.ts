<<<<<<< HEAD
import { User } from "@/types/accessControl";
=======
import { User } from "@/types/access-control";
>>>>>>> dev
import { createStore } from "zustand";

type AuthState = {
  user: User | null;
<<<<<<< HEAD
};

type AuthActions = {
  // We'll use this to set the initial state from the server
=======
  isHydrated: boolean;
};

type AuthActions = {
>>>>>>> dev
  hydrate: (user: User | null) => void;
  // Our login/logout actions will call API routes
  logIn: (user: User) => Promise<void>;
  logOut: () => Promise<void>;
<<<<<<< HEAD
  // Sync user data
=======
  // Sync and hydrate user data
>>>>>>> dev
  me: () => Promise<void>;
};

export type AuthStore = AuthState & AuthActions;

const defaultState: AuthState = {
  user: null,
<<<<<<< HEAD
=======
  isHydrated: false,
>>>>>>> dev
};

export const createAuthStore = (initState: AuthState = defaultState) => {
  return createStore<AuthStore>()((set) => ({
    ...initState,

<<<<<<< HEAD
    hydrate: (user) => {
      set({ user });
    },

    logIn: async (user: User) => {
      try {
=======
    hydrate: (user: User | null) => set({ user, isHydrated: true }),

    logIn: async (user: User) => {
      try {
        set({ isHydrated: false });
>>>>>>> dev
        // Call our API route to set the secure cookie
        const response = await fetch("/api/auth/login", {
          method: "POST",
          body: JSON.stringify(user),
        });
        const data = await response.json();
<<<<<<< HEAD
        set({ user: data.user });
=======
        set({ user: data.user, isHydrated: true });
>>>>>>> dev
      } catch (error) {
        console.error("Login failed:", error);
      }
    },

    logOut: async () => {
      try {
<<<<<<< HEAD
        // Call our API route to clear the cookie
        await fetch("/api/auth/logout", { method: "POST" });
        set({ user: null });
=======
        set({ isHydrated: false });
        // Call our API route to clear the cookie
        await fetch("/api/auth/logout", { method: "POST" });
        set({ user: null, isHydrated: true });
>>>>>>> dev
      } catch (error) {
        console.error("Logout failed:", error);
      }
    },

    me: async () => {
      try {
<<<<<<< HEAD
=======
        set({ isHydrated: false });
>>>>>>> dev
        // Call our API route to update the cookie
        const response = await fetch("/api/auth/me", { method: "POST" });
        const data = await response.json();
        if (data && data.user) {
<<<<<<< HEAD
          set({ user: data.user });
        } else {
          set({ user: null });
        }
      } catch (error) {
        set({ user: null });
=======
          set({ user: data.user, isHydrated: true });
        } else {
          set({ user: null, isHydrated: true });
        }
      } catch (error) {
        set({ user: null, isHydrated: true });
>>>>>>> dev
        console.error("Me failed:", error);
      }
    },
  }));
};
