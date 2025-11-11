import { AnchorsList } from "./anchors-list";
import { MainLink } from "./main-link";

export function MainFooter() {
  return (
    <footer
      className={`mx-auto flex flex-col-reverse justify-between md:flex-row md:w-full md:items-center gap-4 sm:gap-5 lg:gap-6 py-4 sm:py-5 lg:py-6`}
    >
      <MainLink />
      <AnchorsList />
    </footer>
  );
}
