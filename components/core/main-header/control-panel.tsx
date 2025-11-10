import { ControlButtons } from "./control-buttons";
import { UserInfo } from "./user-info";

export function ControlPanel() {
  return (
    <div
      className={
        "flex flex-col xs:flex-row items-end xs:items-center xs:justify-end gap-1.5 md:gap-2"
      }
    >
      <UserInfo />
      <ControlButtons />
    </div>
  );
}
