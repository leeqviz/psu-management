import { Providers } from "@/components/core/providers";
import { getDirection, i18nConfig } from "@/lib/i18n";
import { getTranslation } from "@/lib/i18n/server";
import { Metadata } from "next";
import { Geist } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "../globals.css";

const geist = Geist({
  subsets: ["latin"],
});

// This tells Next.js to only generate pages for your supported languages
export async function generateStaticParams(): Promise<{ lng: string }[]> {
  return i18nConfig.locales.map((lng) => ({ lng }));
}

interface MetadataParams {
  params: Promise<{ lng: string }>;
}
// This function runs on the server
export async function generateMetadata({
  params,
}: MetadataParams): Promise<Metadata> {
  const { lng } = await params;
  // 1. Get translations
  const { t } = await getTranslation(lng, "common", {
    keyPrefix: "metadata",
  });

  // 2. Return translated metadata
  return {
    title: {
      template: t("title.template"),
      default: t("title.default"),
    },
    description: t("description"),
  };
}

interface Props {
  children: React.ReactNode;
  params: Promise<{ lng: string }>;
}

export default async function RootLayout({
  children,
  params,
}: Readonly<Props>) {
  const { lng } = await params;
  return (
    <html lang={lng} dir={getDirection(lng)} className={geist.className}>
      <body>
        <NextTopLoader
          color={"#0369a1"}
          shadow={"0 0 10px #0369a1, 0 0 5px #0369a1"}
        />
        <Providers lng={lng}>{children}</Providers>
      </body>
    </html>
  );
}
