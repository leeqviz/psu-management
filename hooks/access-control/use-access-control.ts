import { useAuthStore } from "@/hooks/state-management";
import { RoleName } from "@/types/access-control";
import { userHasRoles } from "@/utils/access-control";
import { useCallback } from "react";

export const useAccessControl = () => {
  const { user } = useAuthStore((state) => state);

  const hasRoles = useCallback(
    (roleNames?: RoleName[] | null) => {
      if (!user) return false;
      if (roleNames) return userHasRoles(user, roleNames);
      else return true; //grant access for all
    },
    [user]
  );

  return hasRoles;
};
