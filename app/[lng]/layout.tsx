import { Providers } from "@/components/core/providers";
import { getTranslation } from "@/lib/i18n/instance/server";
import { getDirection, i18nConfig } from "@/lib/i18n/utils";
import { Metadata } from "next";
import { Geist } from "next/font/google";
import "../globals.css";

const geist = Geist({
  subsets: ["latin"],
});

// This tells Next.js to only generate pages for your supported languages
export async function generateStaticParams() {
  return i18nConfig.locales.map((lng) => ({ lng }));
}

// This function runs on the server
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lng: string }>;
}): Promise<Metadata> {
  // 1. Get translations
  const { t } = await getTranslation((await params).lng, "common", {
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
        <Providers lng={lng}>{children}</Providers>
      </body>
    </html>
  );
}
