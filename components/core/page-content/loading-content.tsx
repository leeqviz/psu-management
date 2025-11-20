import { Message } from "#components/core/message";
import { LogoSvg } from "#components/core/svgs";
import { isNotNullable } from "#utils/validator";
import { DEFAULT_COLOR } from "@/constants/faculty";
import { CSSProperties, PropsWithChildren, ReactNode } from "react";

interface LoadingContentProps extends PropsWithChildren {
  title?: ReactNode;
  subTitle?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

function LoadingContent({
  title,
  subTitle,
  children,
  className = "",
  style,
}: LoadingContentProps) {
  return (
    <div
      style={style}
      className={`content-appearance flex flex-col grow justify-center items-center transition-opacity duration-700 ${className}`}
    >
      <LogoSvg
        className={`w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 fill-${DEFAULT_COLOR} bg-center bg-contain bg-no-repeat animate-spin shrink-0`}
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
