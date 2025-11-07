"use client";
import { ComponentColor } from "#constants/component";
import { useAccessControl } from "#hooks/accessControl";
import { useFacultyAbbreviation } from "#hooks/routing";
import { ApplicationModule } from "#types/accessControl";
import { Card } from "./card";
import { Chip } from "./chip";
import { Picture } from "./picture";

interface ModuleCardProps {
  appModule: ApplicationModule;
}

export const ModuleCard = ({ appModule }: ModuleCardProps) => {
  const hasRoles = useAccessControl();
  const facultyAbb = useFacultyAbbreviation();

  return hasRoles(appModule.roles) ? (
    <>
      <Card
        to={appModule.link}
        target={appModule.isExternal ? "_blank" : "_self"}
      >
        <div className="flex gap-1 sm:gap-1.5 lg:gap-2 items-center">
          {appModule.svgIcon && (
            <Picture
              alt={appModule.name}
              src={appModule.svgIcon}
              className={`w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 shrink-0`}
            />
          )}
          <div className={"text-left"}>
            <span className="uppercase break-words-anywhere">
              {appModule.name}
            </span>
          </div>
        </div>
        {appModule.tags && appModule.tags.length !== 0 && (
          <div
            className={"flex flex-col rounded-lg grow py-1"}
            style={{
              boxShadow: `inset 0 0 0 1px color-mix(in srgb, var(--${facultyAbb}) 10%, transparent)`,
              background: `color-mix(in srgb, var(--${facultyAbb}) 5%, transparent)`,
            }}
          >
            {appModule.tags.map((tag, index) => (
              <Chip
                text={tag}
                key={index}
                isFilled={false}
                isOutlined={false}
                color={ComponentColor.Current}
                className="leading-4 sm:leading-5 lg:leading-6"
              />
            ))}
          </div>
        )}
      </Card>
    </>
  ) : null;
};
