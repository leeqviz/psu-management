"use client";
import { Message } from "#components/core/message";
import { APP_MODULES } from "#constants/modules";
import { useAuthStore } from "@/hooks/state-management";
import { ModuleCard } from "./module-card";
import { ModuleCardSkeleton } from "./module-card-skeleton";

export function ModulesList() {
  const { user, isHydrated } = useAuthStore((state) => state);

  return (
    <div
      className={
        "grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 justify-center gap-4 sm:gap-5 lg:gap-6 "
      }
    >
      {isHydrated ? (
        user ? (
          APP_MODULES.map((appModule, ind) => (
            <ModuleCard key={ind} appModule={appModule} />
          ))
        ) : (
          <Message title={"Вы не авторизованы"} />
        )
      ) : (
        Array.from(Array(9)).map((_, ind) => (
          <ModuleCardSkeleton height={"160px"} key={ind} />
        ))
      )}
    </div>
  );
}
