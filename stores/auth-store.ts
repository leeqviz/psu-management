import { localStorageService } from "@/services";
import { User } from "@/types/accessControl";
import { createStore } from "zustand";

export type UserState = {
  user: User | null;
  isAuth: boolean | null;
};

export type UserActions = {
  setUser: (user: User | null) => void;
  setIsAuth: (isAuth: boolean | null) => void;

  // add user data to local storage
  logIn: (user: User) => void;
  logOut: () => void;
  me: () => void;
};

export type UserStore = UserState & UserActions;

const defaultState: UserState = {
  user: null,
  isAuth: null,
};

export const createUserStore = (initState: UserState = defaultState) => {
  return createStore<UserStore>()((set) => ({
    ...initState,
    setUser: (user: User | null) => set({ user }),
    setIsAuth: (isAuth: boolean | null) => set({ isAuth }),

    logIn: (user: User) => {
      localStorageService.setUser(user);
      set({ user, isAuth: true });
    },

    logOut: () => {
      localStorageService.clearUserCredentials();
      set({ user: null, isAuth: false });
    },

    me: () => {
      const user = localStorageService.getUser();
      if (user) {
        set({ user, isAuth: true });
      } else {
        set({ user: null, isAuth: false });
      }
    },
  }));
};
