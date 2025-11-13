import { Providers } from "@/components/core/providers";
import { getTranslation } from "@/lib/i18n/server";
import { languages } from "@/lib/i18n/settings";
import { Metadata } from "next";

// This function runs on the server
export async function generateMetadata({
  params: { lng },
}: {
  params: { lng: string };
}): Promise<Metadata> {
  // 1. Get translations
  const { t } = await getTranslation(lng, "common", { keyPrefix: "metadata" });

  // 2. Return translated metadata
  return {
    title: {
      template: t("title.template"),
      default: t("title.default"),
    },
    description: t("description"),
  };
}

// This tells Next.js to only generate pages for your supported languages
export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export default async function LngLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lng: string }>;
}>) {
  return <Providers lng={(await params).lng}>{children}</Providers>;
}
