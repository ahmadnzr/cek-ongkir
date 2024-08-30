export type FontSize = "sm" | "md" | "lg";
export type FontWeight = "regular" | "bold";

type FontSizeValue = string;
type FontWeightValue = number;

export type FontSizeType = {
  [key in FontSize]: FontSizeValue;
};

export type FontWeightType = {
  [key in FontWeight]: FontWeightValue;
};
