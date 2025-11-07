"use client";
import { APP_MODULES } from "@/constants/modules";
import { useAuthStore } from "@/hooks/stateManagement/useAuthStore";
import { Message } from "./message";
import { ModuleCard } from "./module-card";

export function ModulesList() {
  const { user } = useAuthStore((state) => state);

  return user ? (
    <div
      className={
        "grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 justify-center gap-4 sm:gap-5 lg:gap-6 "
      }
    >
      {APP_MODULES.map((appModule, ind) => (
        <ModuleCard key={ind} appModule={appModule} />
      ))}
    </div>
  ) : (
    <Message title={"Вы не авторизованы"} />
  );
}
