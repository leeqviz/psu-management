import { RoutePathPart } from "@/constants/routing";
import { addLocaleToPath, getCanonicalPath } from "@/lib/i18n";
import { getTranslation } from "@/lib/i18n/server";
import { Metadata } from "next";
import Link from "next/link";

interface MetadataParams {
  params: Promise<{ lng: string }>;
}

export async function generateMetadata({
  params,
}: MetadataParams): Promise<Metadata> {
  const { lng } = await params;
  const path = `/${RoutePathPart.Forbidden}`;
  const canonicalUrl = getCanonicalPath(path, lng);
  const enUrl = getCanonicalPath(path, "en");
  const ruUrl = getCanonicalPath(path, "ru");
  const arUrl = getCanonicalPath(path, "ar");

  return {
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "en-US": enUrl,
        "ru-RU": ruUrl,
        "ar-AR": arUrl,
      },
    },
  };
}

interface ForbiddenProps {
  params: Promise<{ lng: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Forbidden({
  params,
  searchParams,
}: ForbiddenProps) {
  const { lng } = await params;
  const { t } = await getTranslation(lng, "common", {
    keyPrefix: "forbidden_page",
  });
  const { callbackUrl } = await searchParams;
  const loginHref = addLocaleToPath(
    `/${RoutePathPart.Login}${
      callbackUrl && typeof callbackUrl === "string"
        ? `?callbackUrl=${encodeURIComponent(callbackUrl)}`
        : ""
    }`,
    lng
  );

  return (
    <div
      className="flex flex-col gap-2"
      style={{ textAlign: "center", marginTop: "50px" }}
    >
      <h1>{t("title")}</h1>
      <p>{t("message")}</p>
      <Link href={loginHref} className="hover:underline">
        {t("login_button")}
      </Link>
    </div>
  );
}
