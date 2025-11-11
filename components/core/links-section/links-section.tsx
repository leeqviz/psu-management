import { AnchorsList } from "./anchors-list";
import { MainLink } from "./main-link";
import { ReferencesList } from "./references-list";

export function LinksSection() {
  return (
    <section
      className={`relative flex w-full bg-gray-50 shadow-lg rounded-xl overflow-hidden ring-1 ring-inset ring-gray-200`}
    >
      <MainLink />
      <div className="grow flex flex-col xxs:flex-row gap-4 sm:gap-5 lg:gap-6 p-4 sm:p-5 lg:p-6 text-sm sm:text-base lg:text-lg">
        <ReferencesList />
        <AnchorsList />
      </div>
    </section>
  );
}
