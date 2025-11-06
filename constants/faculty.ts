import ASP from "#assets/img/faculty/ASP.png";
import FEF from "#assets/img/faculty/FEF.png";
import FIT from "#assets/img/faculty/FIT.png";
import GF from "#assets/img/faculty/GF.png";
import ISF from "#assets/img/faculty/ISF.png";
import MTF from "#assets/img/faculty/MTF.png";
import RTF from "#assets/img/faculty/RTF.png";
import UF from "#assets/img/faculty/UF.png";
import UND from "#assets/img/faculty/UND.png";

export const Faculty = {
  GF: "Гуманитарный факультет",
  ISF: "Инженерно-строительный факультет",
  MTF: "Механико-технологический факультет",
  RTF: "Факультет компьютерных наук и электроники",
  FIT: "Факультет информационных технологий",
  FEF: "Финансово-экономический факультет",
  UF: "Юридический факультет",
  ASP: "Аспирантура",
  UND: "По умолчанию", // default value
} as const;

export const FacultyAbbreviationEN = {
  [Faculty.GF]: "GF",
  [Faculty.ISF]: "ISF",
  [Faculty.MTF]: "MTF",
  [Faculty.RTF]: "RTF",
  [Faculty.FIT]: "FIT",
  [Faculty.FEF]: "FEF",
  [Faculty.UF]: "UF",
  [Faculty.ASP]: "ASP",
  [Faculty.UND]: "UND", // default value
} as const;

export const FacultyAbbreviationRU = {
  [Faculty.GF]: "ГФ",
  [Faculty.ISF]: "ИСФ",
  [Faculty.MTF]: "МТФ",
  [Faculty.RTF]: "ФКНЭ",
  [Faculty.FIT]: "ФИТ",
  [Faculty.FEF]: "ФЭФ",
  [Faculty.UF]: "ЮФ",
  [Faculty.ASP]: "АСП",
  [Faculty.UND]: "", // default value
} as const;

export const FacultyIconSrc = {
  GF: GF.src,
  ISF: ISF.src,
  MTF: MTF.src,
  RTF: RTF.src,
  FIT: FIT.src,
  FEF: FEF.src,
  UF: UF.src,
  ASP: ASP.src,
  UND: UND.src, // default value
} as const;

export const FacultyBackgroundOpacityClass = {
  GF: "bg-GF-opacity",
  ISF: "bg-ISF-opacity",
  MTF: "bg-MTF-opacity",
  RTF: "bg-RTF-opacity",
  FIT: "bg-FIT-opacity",
  FEF: "bg-FEF-opacity",
  UF: "bg-UF-opacity",
  ASP: "bg-ASP-opacity",
  UND: "bg-UND-opacity", // default value
} as const;
