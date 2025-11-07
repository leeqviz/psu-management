import { userHasRoles } from "#utils/accessControl";
import { useCallback } from "react";
import { useAuthStore } from "../stateManagement/useAuthStore";

export const useAccessControl = () => {
  const { user } = useAuthStore((state) => state);

  const hasRoles = useCallback(
    (roleNames?: string[] | null) => {
      if (!user) return false;
      if (roleNames) return userHasRoles(user, roleNames);
      else return true; //grant access for all
    },
    [user]
  );

  return hasRoles;
};
