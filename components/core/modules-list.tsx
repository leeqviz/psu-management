"use client";
import { APP_MODULES } from "@/constants/modules";
import { useAuthStore } from "@/hooks/stateManagement/useAuthStore";
import { CardSkeleton } from "./card-skeleton";
import { Message } from "./message";
import { ModuleCard } from "./module-card";

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
          <CardSkeleton height={"160px"} key={ind} />
        ))
      )}
    </div>
  );
}
