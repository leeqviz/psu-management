import docx from "#assets/svg/docx-file.svg";
import pdf from "#assets/svg/pdf-file.svg";
import xlsx from "#assets/svg/xlsx-file.svg";

export const ReportFileFormatImage = {
  pdf,
  docx,
  xlsx,
} as const;

export const ReportFileFormat = {
  PDF: "pdf",
  DOCX: "docx",
  XLSX: "xlsx",
} as const;

export const ReportAction = {
  Download: "download",
  Preview: "preview",
} as const; //download a file or open in new window

export const ReportExtraParamType = {
  Text: "text",
  Date: "date",
  Select: "select",
  Checkbox: "checkbox",
  Autocomplete: "autocomplete",
  Textarea: "textarea",
  Number: "number",
} as const;
