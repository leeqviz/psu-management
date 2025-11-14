import { LinksSection } from "#components/core/links-section";
import { ModulesSection } from "#components/core/modules-section/modules-section";
import { NewsSection } from "#components/core/news-section/news-section";
import { LanguageSwitcher } from "@/components/core/language-switcher";
import { getTranslation } from "@/lib/i18n/instance/server";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lng: string }>;
}) {
  const { t } = await getTranslation((await params).lng, "common");
  return (
    <div className="grow flex flex-col gap-4 sm:gap-5 lg:gap-6">
      <h1>{t("welcome")}</h1>
      <LanguageSwitcher />
      <LinksSection />
      <ModulesSection />
      <NewsSection />
    </div>
  );
}
