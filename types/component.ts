import {
  ComponentColor,
  ComponentContentType,
  ComponentDirection,
  ComponentFontWeight,
  ComponentOrientation,
  ComponentOverflowIndicator,
  ComponentPlacement,
  ComponentSize,
  ComponentTextOverflow,
  ComponentTextTransform,
} from "#constants/component";
import { ValuesAliasFrom } from "./utilityTypes";

export type ComponentContentTypeValuesAlias = ValuesAliasFrom<
  typeof ComponentContentType
>;
export type ComponentSizeValuesAlias = ValuesAliasFrom<typeof ComponentSize>;
export type ComponentColorValuesAlias = ValuesAliasFrom<typeof ComponentColor>;
export type ComponentPlacementValuesAlias = ValuesAliasFrom<
  typeof ComponentPlacement
>;
export type ComponentFontWeightValuesAlias = ValuesAliasFrom<
  typeof ComponentFontWeight
>;
export type ComponentTextTransformValuesAlias = ValuesAliasFrom<
  typeof ComponentTextTransform
>;
export type ComponentTextOverflowValuesAlias = ValuesAliasFrom<
  typeof ComponentTextOverflow
>;
export type ComponentDirectionValuesAlias = ValuesAliasFrom<
  typeof ComponentDirection
>;
export type ComponentOrientationValuesAlias = ValuesAliasFrom<
  typeof ComponentOrientation
>;
export type ComponentOverflowIndicatorValuesAlias = ValuesAliasFrom<
  typeof ComponentOverflowIndicator
>;
