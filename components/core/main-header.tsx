"use client";

import {
  NOTIFICATIONS_ARE_ON_KEY,
  SOUNDS_ARE_ON_KEY,
} from "@/constants/localStorageKeys";
import { useFacultyAbbreviation } from "@/hooks/routing";
import { useAudio, useLocalStorage, useMount } from "@/hooks/window";
import { User } from "@/types/accessControl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoSvg } from "../svgs/logo-svg";
import { Button } from "../ui/button";
import { HelpIconButton } from "./icon-button";
import { SoundIconButton } from "./icon-button/sound-icon-button";

// TODO: get user data
const user: User = {
  id: "1",
  fio: "Полотский Е.В.",
  fioShort: "Полотский Е.В.",
  email: "1@1.1",
  position: "Профессор",
  department: "Факультет информационных технологий",
  isEmployee: true,
  roles: ["admin"],
  assignedId: 1,
  assignedAt: "2023-01-01",
  login: "admin",
  password: "admin",
};

function MainHeader() {
  const pathname = usePathname();
  const facultyAbb = useFacultyAbbreviation();

  //local storage observing
  const [notificationValue, setNotificationValue] = useLocalStorage<boolean>(
    NOTIFICATIONS_ARE_ON_KEY,
    false
  );
  const [soundValue, setSoundValue] = useLocalStorage<boolean>(
    SOUNDS_ARE_ON_KEY,
    false
  );

  console.log(soundValue);

  const isMounted = useMount();
  const tap2Audio = useAudio(
    isMounted && soundValue ? "/sounds/tap2.mp3" : undefined
  );

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
              process.env.REACT_APP_ENV === "test"
                ? "fill-red-500"
                : "fill-gray-700"
            } group-hover:fill-${facultyAbb} group-hover:scale-[1.1] group-active:scale-[0.9] duration-200 shrink-0`}
          />
          <div
            className={`flex flex-col ${
              process.env.REACT_APP_ENV === "test"
                ? "text-red-500"
                : "text-gray-700"
            } group-hover:text-${facultyAbb} duration-200 break-words-anywhere`}
          >
            <span className="text-sm sm:text-base lg:text-lg font-bold uppercase tracking-wide leading-4 sm:leading-5 lg:leading-6">
              {"Полоцкий Государственный Университет"}
            </span>
            <span className="text-xs sm:text-sm lg:text-base leading-4 sm:leading-5 lg:leading-6">
              {"имени Евфросинии Полоцкой" +
                (process.env.REACT_APP_ENV === "test"
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
          {user && (
            <div
              className={
                "flex flex-col text-gray-700 text-right break-words-anywhere"
              }
            >
              <span className="text-sm sm:text-base lg:text-lg tracking-wide leading-4 sm:leading-5 lg:leading-6">
                {user?.fio
                  ? user?.fio + (user?.email ? ` - ${user?.email}` : "")
                  : user?.email}
              </span>
              <span className="text-xs sm:text-sm lg:text-base font-light leading-4 sm:leading-5 lg:leading-6">
                {user?.department
                  ? user?.department +
                    (user?.position ? ` - ${user?.position}` : "")
                  : user?.position}
              </span>
            </div>
          )}
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
                onClick={() => alert("Загрузка документа в PDF")}
              />
            </div>
            <div
              className={`flex items-center justify-start gap-0.5 sm:gap-1 lg:gap-1.5`}
            >
              <Button
                onClick={() => {
                  setNotificationValue(!notificationValue);
                }}
              >
                Уведомления
              </Button>
              <Button>Войти</Button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export { MainHeader };
