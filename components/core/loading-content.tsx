"use client";
import { DELAY_TIME } from "#constants/time";
import { useDelayedToggle } from "#hooks/delay";
import { useFacultyAbbreviation } from "#hooks/routing";
import { isNotNullable } from "#utils/validator";
import { CSSProperties, PropsWithChildren, ReactNode } from "react";
import { LogoSvg } from "../svgs/logo-svg";
import { Message } from "./message";

interface LoadingContentProps extends PropsWithChildren {
  delay?: number;
  title?: ReactNode;
  subTitle?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

function LoadingContent({
  delay = DELAY_TIME,
  title,
  subTitle,
  children,
  className = "",
  style,
}: LoadingContentProps) {
  const facultyAbb = useFacultyAbbreviation();
  const isShownDelayed = useDelayedToggle(true, { enterDelay: delay });

  return (
    <div
      style={style}
      className={`flex flex-col grow justify-center items-center transition-opacity duration-700 ${
        isShownDelayed ? "opacity-100" : "opacity-0"
      } ${className}`}
    >
      <LogoSvg
        className={`w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 fill-${facultyAbb} bg-center bg-contain bg-no-repeat animate-spin shrink-0`}
        style={{ animationDuration: "2s" }}
      />
      {(isNotNullable(title) || isNotNullable(subTitle)) && (
        <Message title={title} subTitle={subTitle} />
      )}
      {children}
    </div>
  );
}

export { LoadingContent };
