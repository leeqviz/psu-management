"use client";
import Image from "next/image";

const contentfulLoader = ({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ContentfulImage = (props: any) => {
  return <Image alt="" loader={contentfulLoader} {...props} />;
};
