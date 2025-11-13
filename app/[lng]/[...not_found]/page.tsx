import { getTranslation } from "@/lib/i18n/server";
import Link from "next/link";

// This component automatically receives 'params'
export default async function LngNotFound({
  params,
}: {
  params: Promise<{ lng: string }>;
}) {
  // Get translations
  const { t } = await getTranslation((await params).lng, "common");

  return (
    <div
      className="flex flex-col gap-2"
      style={{ textAlign: "center", marginTop: "50px" }}
    >
      <h1>{t("not_found_title")}</h1>
      <p>{t("not_found_message")}</p>
      <span>TODO 404 page content</span>
      <Link href="/">Home</Link>
    </div>
  );
}
