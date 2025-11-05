import {
  ReportAction,
  ReportExtraParamType,
  ReportFileFormat,
} from "#constants/report";
import { ScreenBreakpoints } from "#types/screen";
import { SelectOption } from "#types/selectOption";
import { ValuesAliasFrom } from "./utilityTypes";

export type ReportFileFormatValuesAlias = ValuesAliasFrom<
  typeof ReportFileFormat
>;
export type ReportActionValuesAlias = ValuesAliasFrom<typeof ReportAction>;
export type ReportExtraParamTypeValuesAlias = ValuesAliasFrom<
  typeof ReportExtraParamType
>;

export interface DefaultReport<
  TDefaultValue = unknown,
  TOptionValue = unknown
> {
  url: string;
  name: string;
  action: ReportActionValuesAlias;
  format: ReportFileFormatValuesAlias;
  filename: string;
  template?: string;
  roles?: string[];
  modalBreakpoints?: ScreenBreakpoints;
  displayParams?: string;
  extraParams?: DefaultReportExtraParam<TDefaultValue, TOptionValue>[];
  groupName?: string; // Групировка отчетов по группам
  dataType?: string; // Для одного и того же шаблона документа могут быть получены разные данные
}

export interface DefaultReportExtraParam<
  TDefaultValue = unknown,
  TOptionValue = unknown
> {
  label: string;
  name: string;
  type: ReportExtraParamTypeValuesAlias;
  options?: SelectOption<TOptionValue>[] | null;
  optionsName?: string;
  defaultValue?: TDefaultValue;
  isRequired?: boolean;
}
