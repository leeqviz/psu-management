"use client";
import classroom from "#assets/svg/classroom-link.svg";
import logo from "#assets/svg/filled-logo.svg";
import mail from "#assets/svg/mail-link.svg";
import moodle from "#assets/svg/moodle-link.svg";
import { SOUNDS_ARE_ON_KEY } from "#constants/localStorageKeys";
import { useFacultyAbbreviation } from "#hooks/routing";
import { useAudio, useLocalStorage } from "#hooks/window";
import { Anchor } from "./anchor";
import { Divider } from "./divider";
import { Picture } from "./picture";
import { Reference } from "./reference";

export const LinksSection = () => {
  const facultyAbb = useFacultyAbbreviation();
  const [flag] = useLocalStorage<boolean>(SOUNDS_ARE_ON_KEY, false);
  const tap2Audio = useAudio(flag ? "/sounds/tap2.mp3" : undefined);

  return (
    <section
      className={`relative flex w-full bg-gray-50 shadow-lg rounded-xl overflow-hidden ring-1 ring-inset ring-gray-200`}
    >
      <a
        className={`hover:bg-${facultyAbb} ring-2 shadow ring-${facultyAbb} duration-200 bg-gray-700 flex items-center justify-center w-8 sm:w-10 lg:w-12`}
        href="https://www.psu.by/ru/"
        target="_blank"
        rel="noreferrer"
        onClick={() => {
          tap2Audio.reset();
          tap2Audio.play();
        }}
      >
        <div className="-rotate-90 flex flex-row items-center justify-center gap-1 sm:gap-1.5 lg:gap-2">
          <Picture src={logo} />
          <span className="text-sm sm:text-base lg:text-lg font-medium text-white">
            {"psu.by"}
          </span>
        </div>
      </a>
      <div className="grow flex flex-col gap-4 sm:gap-5 lg:gap-6 p-4 sm:p-5 lg:p-6 text-sm sm:text-base lg:text-lg">
        <div className="grow flex flex-col xxs:flex-row gap-4 sm:gap-5 lg:gap-6">
          <div className="grow flex flex-col gap-2 sm:gap-2.5 lg:gap-3">
            <Divider>{"Ресурсы ПГУ"}</Divider>

            <div className="grid grid-cols-1 lg:grid-cols-2 justify-between gap-1">
              <div className="flex flex-col gap-1">
                <Reference
                  href="https://lib.psu.by/"
                  target="_blank"
                  text={"Научная библиотека"}
                />
                <Reference
                  href="https://elib.psu.by/?ysclid=ldmvgwmhof471840611"
                  target="_blank"
                  text={"Репозиторий научной библиотеки"}
                />
                <Reference
                  href="http://elib.psu.by:8009/marcweb2/"
                  target="_blank"
                  text={"Каталог научной библиотеки"}
                />
              </div>
              <div className="flex flex-col gap-1">
                <Reference
                  href="https://cit.psu.by/"
                  target="_blank"
                  text={"Центр информационных технологий"}
                />
                <Reference
                  href="http://10.10.101.30/" //http://talent.psu.by/
                  target="_blank"
                  text={"Банк данных одаренной молодежи"}
                />
              </div>
            </div>
          </div>
          <div className="flex xxs:flex-col xxs:shrink-0 gap-2 sm:gap-2.5 lg:gap-3">
            <Anchor
              display="inline-block"
              tooltip="classroom"
              target="_blank"
              href="https://classroom.google.com"
              className="group p-1"
            >
              <Picture
                src={classroom}
                className="group-hover:scale-[1.1] group-active:scale-[0.9] duration-200"
              />
            </Anchor>
            <Anchor
              display="inline-block"
              tooltip="moodle"
              target="_blank"
              href="https://moodle.psu.by/"
              className="group p-1"
            >
              <Picture
                src={moodle}
                className="group-hover:scale-[1.1] group-active:scale-[0.9] duration-200"
              />
            </Anchor>
            <Anchor
              display="inline-block"
              tooltip="mail"
              target="_blank"
              href="https://mail.psu.by/"
              className="group p-1"
            >
              <Picture
                src={mail}
                className="group-hover:scale-[1.1] group-active:scale-[0.9] duration-200"
              />
            </Anchor>
          </div>
        </div>
      </div>
    </section>
  );
};
