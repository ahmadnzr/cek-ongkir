import { Colors } from "../utils";

export type FontSize = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
export type FontWeight = "regular" | "bold";

type FontSizeValue = string;
type FontWeightValue = number;

export type FontSizeType = {
  [key in FontSize]: FontSizeValue;
};

export type FontWeightType = {
  [key in FontWeight]: FontWeightValue;
};

export type IndicatorColor = keyof typeof Colors.indicator;

export type ColorType = {
  bg: string;
  ["neutral-10"]: string;
};

export type Theme = "light" | "dark";

export type ThemeColor = ColorType;
