"use client";
import {
  AuthIconButton,
  HelpIconButton,
  NotificationIconButton,
  SoundIconButton,
} from "#components/core/icon-button";
import { useLocalStorage } from "#hooks/window";
import {
  NOTIFICATIONS_ARE_ON_KEY,
  SOUNDS_ARE_ON_KEY,
} from "@/constants/local-storage";
import { routingManifest } from "@/constants/routing";
import { useAuthStore } from "@/hooks/state-management";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";

export function ControlButtons() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const { user, logOut } = useAuthStore((state) => state);

  //local storage observing
  const [notificationValue, setNotificationValue] = useLocalStorage<boolean>(
    NOTIFICATIONS_ARE_ON_KEY,
    false
  );
  const [soundValue, setSoundValue] = useLocalStorage<boolean>(
    SOUNDS_ARE_ON_KEY,
    false
  );

  const handleLogout = () => {
    startTransition(async () => {
      await logOut(pathname);
    });
  };

  const handleLogin = () => {
    router.push(routingManifest.public.login);
  };

  return (
    <div className={`flex xs:flex-col-reverse gap-0.5 sm:gap-1 lg:gap-1.5`}>
      <div
        className={`flex items-center justify-start gap-0.5 sm:gap-1 lg:gap-1.5`}
      >
        <SoundIconButton
          soundsAreOn={!!soundValue}
          onClick={() => setSoundValue(!soundValue)}
        />
        <HelpIconButton
          tooltip={"Руководство"}
          onClick={() => alert("Загрузка документа в PDF")}
        />
      </div>
      <div
        className={`flex items-center justify-start gap-0.5 sm:gap-1 lg:gap-1.5`}
      >
        <NotificationIconButton
          notificationsAreOn={!!notificationValue}
          onClick={() => {
            setNotificationValue(!notificationValue);
          }}
        />
        <AuthIconButton
          tooltip={!!user ? "Выйти" : "Войти"}
          isAuthorized={!!user}
          isDisabled={isPending}
          onClick={() => {
            if (user) {
              handleLogout();
            } else {
              handleLogin();
            }
          }}
        />
      </div>
    </div>
  );
}
