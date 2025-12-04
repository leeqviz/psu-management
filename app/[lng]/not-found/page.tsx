import { routingManifest } from "@/constants/routing";
import { getTranslation } from "@/lib/i18n/server";
import Link from "next/link";

// костыль, потому что дефолтный not found не находит параметры запроса
export default async function NotFound({
  params,
}: {
  params: Promise<{ lng: string }>;
}) {
  // Get translations
  const { lng } = await params;
  const { t } = await getTranslation(lng, "common");

  return (
    <div
      className="flex flex-col gap-2"
      style={{ textAlign: "center", marginTop: "50px" }}
    >
      <h1>{t("not_found_title")}</h1>
      <p>{t("not_found_message")}</p>
      <Link href={routingManifest.public.home} className="hover:underline">
        Home
      </Link>
    </div>
  );
}
