import { LinksSection } from "#components/core/links-section";
import { ModulesSection } from "#components/core/modules-section/modules-section";
import { NewsSection } from "#components/core/news-section/news-section";

export default function HomePage() {
  return (
    <div className="grow flex flex-col gap-4 sm:gap-5 lg:gap-6">
      <LinksSection />
      <ModulesSection />
      <NewsSection />
    </div>
  );
}
