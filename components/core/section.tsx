"use client";

import hexIcon from "#assets/svg/filled-hex.svg";
import { FacultyIconSrc } from "#constants/faculty";
import { useFacultyAbbreviation } from "#hooks/routing";
import { isNotNullable } from "#utils/validator";
import Image from "next/image";
import { CSSProperties, PropsWithChildren, ReactNode } from "react";
import { RefreshIndicator } from "./refresh-indicator";

interface SectionProps extends PropsWithChildren {
  hasLogo?: boolean;
  title?: ReactNode;
  subTitle?: ReactNode;
  isSticky?: boolean;
  trigger?: unknown | null;
  className?: string;
  style?: CSSProperties;
}

function Section({
  hasLogo = true,
  title,
  subTitle,
  isSticky = false,
  children,
  trigger = null,
  className = "",
  style,
}: SectionProps) {
  const facultyAbb = useFacultyAbbreviation();

  return (
    <section
      className={`relative w-full block bg-gray-50 shadow-lg rounded-xl overflow-hidden ring-1 ring-inset ring-gray-200 ${className}`}
      style={
        isSticky
          ? { position: "sticky", top: "0px", zIndex: 20, ...style }
          : style
      }
    >
      {isNotNullable(trigger) && (
        <div className="absolute top-[3px] left-[3px]">
          <RefreshIndicator trigger={trigger} />
        </div>
      )}
      {(!!title || !!subTitle) && (
        <div
          className={`flex items-center gap-1.5 sm:gap-2 bg-gray-700 ring-2 shadow ring-${facultyAbb} ${
            hasLogo
              ? "py-1 px-4 xs:pl-2 xs:py-0 sm:pr-5 lg:pr-6"
              : "py-1 px-4 sm:py-3 sm:px-5 lg:py-5 lg:px-6"
          }`}
        >
          {hasLogo && (
            <div className="hidden xs:block relative shrink-0">
              <Image
                src={hexIcon}
                alt={"faculty logo placeholder"}
                className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"
              />
              <div
                className={
                  "absolute bg-center bg-contain bg-no-repeat top-1 left-1 md:top-2 md:left-2 w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20"
                }
                style={{
                  backgroundImage: `url('${
                    FacultyIconSrc[facultyAbb as keyof typeof FacultyIconSrc]
                  }')`,
                }}
              ></div>
            </div>
          )}
          <div className="grow break-words-anywhere text-white text-sm sm:text-md lg:text-lg">
            {isNotNullable(title) && <div>{title}</div>}
            {isNotNullable(subTitle) && <div>{subTitle}</div>}
          </div>
        </div>
      )}
      <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6 p-4 sm:p-5 lg:p-6 text-sm sm:text-base lg:text-lg text-gray-700">
        {children}
      </div>
    </section>
  );
}

export { Section };
