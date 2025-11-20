import { isNotNullable } from "#utils/validator";
import { DEFAULT_COLOR } from "@/constants/faculty";
import { SelectOption } from "@/types/select-option";
import { CSSProperties, ReactNode } from "react";
import {
  ClearIndicatorProps,
  components,
  DropdownIndicatorProps,
  default as ReactSelect,
} from "react-select";
import { ArrowLeftSvg, CancelSvg } from "./svgs";
import { Label } from "./typography";

interface SelectProps {
  id?: string | null;
  name?: string | null;
  value?: SelectOption | null;
  options?: SelectOption[] | null;
  label?: ReactNode;
  hint?: ReactNode;
  placeholder?: string | null;
  isDisabled?: boolean;
  isOptionDisabled?: (option: SelectOption | null) => boolean;
  isClearable?: boolean;
  isRequired?: boolean;
  isNotValid?: boolean;
  onChange?: (option: SelectOption | null, name: string) => void;
  className?: string;
  style?: CSSProperties;
}

const DropdownIndicator = (props: DropdownIndicatorProps<SelectOption>) => {
  return (
    <components.DropdownIndicator {...props}>
      <ArrowLeftSvg />
    </components.DropdownIndicator>
  );
};

const ClearIndicator = (props: ClearIndicatorProps<SelectOption>) => {
  return (
    <components.ClearIndicator {...props}>
      <CancelSvg />
    </components.ClearIndicator>
  );
};

export function Select({
  id,
  name,
  hint,
  label,
  value,
  options,
  onChange,
  className = "",
  placeholder = "",
  isClearable = true,
  isDisabled = false,
  isOptionDisabled,
  isRequired = false,
  isNotValid = false,
  style,
}: SelectProps) {
  return (
    <div className={`flex flex-col gap-0.5 ${className}`} style={style}>
      {isNotNullable(label) && (
        <Label
          forId={id}
          className="pl-3 md:pl-4"
          text={label}
          isRequired={isRequired}
          hint={hint}
        />
      )}
      <ReactSelect
        id={id ?? undefined}
        name={name ?? undefined}
        menuPosition="fixed"
        menuPlacement="bottom"
        value={value ?? null}
        components={{ DropdownIndicator, ClearIndicator }}
        placeholder={placeholder ?? ""}
        options={options ?? []}
        isMulti={false}
        onChange={(option) => onChange?.(option, name ?? "")}
        isDisabled={isDisabled}
        isOptionDisabled={isOptionDisabled}
        isClearable={isClearable}
        noOptionsMessage={() => "пусто"}
        styles={{
          control: (base, state) => ({
            ...base,
            fontSize: "14px",
            lineHeight: "20px",
            minHeight: "32px",
            height: "32px",
            backgroundColor: state.isDisabled
              ? "var(--gray-disabled)"
              : "white",
            transitionDuration: "200ms",
            borderRadius: "6px",
            borderStyle: "none",
            boxShadow: !state.isDisabled
              ? !isNotValid
                ? state.isFocused
                  ? `inset 0 0 0 2px var(--${DEFAULT_COLOR}), 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)`
                  : "inset 0 0 0 1px var(--gray-default), 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"
                : state.isFocused
                ? `inset 0 0 0 2px var(--red-normal), 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)`
                : "inset 0 0 0 1px var(--red-light), 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"
              : !isNotValid
              ? "inset 0 0 0 1px var(--gray-default), 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"
              : "inset 0 0 0 1px var(--red-light), 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
            ":hover": {
              boxShadow: !state.isDisabled
                ? !isNotValid
                  ? state.isFocused
                    ? `inset 0 0 0 2px var(--${DEFAULT_COLOR}), 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)`
                    : `inset 0 0 0 1px var(--${DEFAULT_COLOR}), 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)`
                  : state.isFocused
                  ? `inset 0 0 0 2px var(--red-normal), 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)`
                  : `inset 0 0 0 1px var(--red-normal), 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)`
                : "inset 0 0 0 1px var(--gray-default), 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
              background: !state.isDisabled
                ? `color-mix(in srgb, var(--${DEFAULT_COLOR}) 5%, transparent)`
                : "",
            },
            "@media (min-width: 640px)": {
              fontSize: "16px",
              lineHeight: "24px",
              minHeight: "36px",
              height: "36px",
            },
            "@media (min-width: 768px)": {
              minHeight: "40px",
              height: "40px",
            },
            "@media (min-width: 1024px)": {
              fontSize: "18px",
              lineHeight: "28px",
              minHeight: "44px",
              height: "44px",
            },
          }),
          singleValue: (base) => ({
            ...base,
            color: "var(--gray-medium)",
          }),
          menuPortal: (base) => ({
            ...base,
            zIndex: 9999,
          }),
          menu: (base) => ({
            ...base,
            borderRadius: "6px",
            borderStyle: "none",
            boxShadow: "none",
          }),
          menuList: (base) => ({
            ...base,
            maxHeight: 32 * 5 + "px",
            "@media (min-width: 640px)": {
              maxHeight: 36 * 6 + "px",
            },
            "@media (min-width: 768px)": {
              maxHeight: 40 * 7 + "px",
            },
            "@media (min-width: 1024px)": {
              maxHeight: 44 * 8 + "px",
            },
            borderRadius: "6px",
            borderStyle: "none",
            paddingTop: "0px",
            paddingBottom: "0px",
            transitionProperty: "box-shadow",
            transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
            transitionDuration: "200ms",
            boxShadow:
              "inset 0 0 0 1px var(--gray-default), 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
            ":hover": {
              boxShadow: `inset 0 0 0 1px var(--${DEFAULT_COLOR}), 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)`,
            },
            "::-webkit-scrollbar": {
              width: "4px",
              height: "4px",
            },
            "::-webkit-scrollbar-track": {
              backgroundColor: "transparent",
              borderRadius: "9999px",
            },
            "::-webkit-scrollbar-thumb": {
              backgroundColor: "var(--gray-light)",
              borderRadius: "9999px",
            },
            "::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "var(--gray-normal)",
            },
            "::-webkit-scrollbar-thumb:active": {
              backgroundColor: "var(--gray-medium)",
            },
          }),
          valueContainer: (base) => ({
            ...base,
            cursor: "pointer",
            padding: "4px 10px",
            "@media (min-width: 768px)": {
              padding: "6px 14px",
            },
          }),
          input: (base) => ({
            ...base,
            marginTop: "0px",
            marginBottom: "0px",
          }),
          indicatorsContainer: (base) => ({
            ...base,
            height: "32px",
            "@media (min-width: 640px)": {
              height: "36px",
            },
            "@media (min-width: 768px)": {
              height: "40px",
            },
            "@media (min-width: 1024px)": {
              height: "44px",
            },
          }),
          dropdownIndicator: (base, state) => ({
            ...base,
            cursor: !state.isDisabled ? "pointer" : "default",
            borderRadius: "8px",
            padding: "2px",
            margin: "6px",
            transitionProperty: "all",
            transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
            transitionDuration: "200ms",
            ":hover": {
              background: `color-mix(in srgb, var(--${DEFAULT_COLOR}) 10%, transparent)`,
            },
            svg: {
              transitionProperty: "all",
              transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
              transitionDuration: "200ms",
              stroke: !state.isDisabled
                ? `var(--${DEFAULT_COLOR})`
                : "var(--gray-light)",
              strokeWidth: 1,
              width: "20px",
              height: "20px",
              "@media (min-width: 640px)": {
                width: "24px",
                height: "24px",
              },
              "@media (min-width: 1024px)": {
                width: "28px",
                height: "28px",
              },
              transform: state.selectProps.menuIsOpen
                ? "rotate(90deg)"
                : "rotate(-90deg)",
              ":hover": {
                strokeWidth: 1.5,
                transform: state.selectProps.menuIsOpen
                  ? "rotate(90deg) scale(1.1)"
                  : "rotate(-90deg) scale(1.1)",
              },
              ":active": {
                transform: state.selectProps.menuIsOpen
                  ? "rotate(90deg) scale(0.9)"
                  : "rotate(-90deg) scale(0.9)",
              },
            },
          }),
          clearIndicator: (base) => ({
            ...base,
            cursor: "pointer",
            borderRadius: "8px",
            padding: "2px",
            margin: "6px",
            transitionProperty: "all",
            transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
            transitionDuration: "200ms",
            ":hover": {
              background: `color-mix(in srgb, var(--${DEFAULT_COLOR}) 10%, transparent)`,
            },
            svg: {
              transitionProperty: "all",
              transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
              transitionDuration: "200ms",
              stroke: `var(--${DEFAULT_COLOR})`,
              strokeWidth: 1,
              width: "20px",
              height: "20px",
              "@media (min-width: 640px)": {
                width: "24px",
                height: "24px",
              },
              "@media (min-width: 1024px)": {
                width: "28px",
                height: "28px",
              },
              ":hover": {
                strokeWidth: 1.5,
                transform: "scale(1.1)",
              },
              ":active": {
                transform: "scale(0.9)",
              },
            },
          }),
          indicatorSeparator: (base) => ({
            ...base,
            width: "1px",
            borderRadius: "9999px",
            borderWidth: "1px",
            borderColor: "var(--gray-light)",
            boxShadow:
              "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
            backgroundColor: "var(--gray-light)",
          }),
          option: (base, state) => ({
            ...base,
            cursor: "pointer",
            padding: "6px 12px",
            "@media (min-width: 768px)": {
              padding: "8px 16px",
            },
            backgroundColor: "inherit",
            background: state.isSelected ? `var(--${DEFAULT_COLOR})` : "",
            ":hover": {
              backgroundColor: "inherit",
              background: state.isSelected
                ? `var(--${DEFAULT_COLOR})`
                : `color-mix(in srgb, var(--${DEFAULT_COLOR}) 10%, transparent)`,
            },
            ":active": {
              backgroundColor: "inherit",
              background: state.isSelected
                ? `var(--${DEFAULT_COLOR})`
                : `color-mix(in srgb, var(--${DEFAULT_COLOR}) 10%, transparent)`,
            },
          }),
          placeholder: (base) => ({
            ...base,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            color: "var(--gray-medium)",
            fontWeight: 300,
          }),
        }}
      />
    </div>
  );
}
