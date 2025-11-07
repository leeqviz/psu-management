"use client";

import {
  NOTIFICATIONS_ARE_ON_KEY,
  SOUNDS_ARE_ON_KEY,
} from "@/constants/localStorageKeys";
import { useFacultyAbbreviation } from "@/hooks/routing";
import { useAuthStore } from "@/hooks/stateManagement/useAuthStore";
import {
  useAudio,
  useLocalStorage,
  useMount,
  useWindowSize,
} from "@/hooks/window";
import { userDataMock } from "@/mocks/user";
import { User } from "@/types/accessControl";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";
import { LogoSvg } from "../svgs/logo-svg";
import {
  AuthIconButton,
  HelpIconButton,
  NotificationIconButton,
  SoundIconButton,
} from "./icon-button";

function MainHeader({ userInfo }: { userInfo: ReactNode }) {
  const pathname = usePathname();
  const windowSize = useWindowSize();
  const facultyAbb = useFacultyAbbreviation();
  const router = useRouter();

  const { user, logIn, logOut } = useAuthStore((state) => state);

  //local storage observing
  const [notificationValue, setNotificationValue] = useLocalStorage<boolean>(
    NOTIFICATIONS_ARE_ON_KEY,
    false
  );
  const [soundValue, setSoundValue] = useLocalStorage<boolean>(
    SOUNDS_ARE_ON_KEY,
    false
  );

  const isMounted = useMount();
  const tap2Audio = useAudio(
    isMounted && soundValue ? "/sounds/tap2.mp3" : undefined
  );

  const handleLogout = async () => {
    await logOut();
    // Refresh the server components to show the "logged out" state
    router.refresh();
  };

  const handleLogin = async (user: User) => {
    await logIn(user);
    // Refresh the server components to show the "logged out" state
    router.refresh();
  };

  console.log(user);

  return (
    <>
      <header
        className={`flex flex-col xs:flex-row justify-between gap-4 sm:gap-5 lg:gap-6 py-4 sm:py-5 lg:py-6`}
      >
        <Link
          href={"/"}
          onClick={() => {
            if (pathname !== "/") {
              tap2Audio.reset();
              tap2Audio.play();
              alert("Переход на главную");
            }
          }}
          onNavigate={(e) => {
            if (pathname === "/") {
              // prevent navigation if we're already on the home page
              e.preventDefault();
            }
          }}
          className={`flex flex-row items-center gap-1.5 md:gap-2 ${
            pathname !== "/" ? "group" : "cursor-default"
          }`}
        >
          <LogoSvg
            className={`hidden xxs:block w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 ${
              process.env.NEXT_PUBLIC_APP_ENV === "test"
                ? "fill-red-500"
                : "fill-gray-700"
            } group-hover:fill-${facultyAbb} group-hover:scale-[1.1] group-active:scale-[0.9] duration-200 shrink-0`}
          />
          <div
            className={`flex flex-col ${
              process.env.NEXT_PUBLIC_APP_ENV === "test"
                ? "text-red-500"
                : "text-gray-700"
            } group-hover:text-${facultyAbb} duration-200 break-words-anywhere`}
          >
            <span className="text-sm sm:text-base lg:text-lg font-bold uppercase tracking-wide leading-4 sm:leading-5 lg:leading-6">
              {"Полоцкий Государственный Университет"}
            </span>
            <span className="text-xs sm:text-sm lg:text-base leading-4 sm:leading-5 lg:leading-6">
              {"имени Евфросинии Полоцкой" +
                (process.env.NEXT_PUBLIC_APP_ENV === "test"
                  ? " (Тестовая система)"
                  : "")}
            </span>
          </div>
        </Link>
        <div
          className={
            "flex flex-col xs:flex-row items-end xs:items-center xs:justify-end gap-1.5 md:gap-2"
          }
        >
          {userInfo}
          <div
            className={`flex xs:flex-col-reverse gap-0.5 sm:gap-1 lg:gap-1.5`}
          >
            <div
              className={`flex items-center justify-start gap-0.5 sm:gap-1 lg:gap-1.5`}
            >
              <SoundIconButton
                soundsAreOn={isMounted && !!soundValue}
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
                notificationsAreOn={isMounted && !!notificationValue}
                onClick={() => {
                  setNotificationValue(!notificationValue);
                }}
              />
              <AuthIconButton
                tooltip={!!user ? "Выйти" : "Войти"}
                isAuthorized={!!user}
                onClick={() => {
                  if (user) {
                    handleLogout();
                  } else {
                    handleLogin(userDataMock);
                  }
                }}
              />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export { MainHeader };
