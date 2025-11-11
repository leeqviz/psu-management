import { ControlPanel } from "./control-panel";
import { MainLink } from "./main-link";

export function MainHeader() {
  return (
    <header
      className={`flex flex-col xs:flex-row justify-between gap-4 sm:gap-5 lg:gap-6 py-4 sm:py-5 lg:py-6`}
    >
      <MainLink />
      <ControlPanel />
    </header>
  );
}
