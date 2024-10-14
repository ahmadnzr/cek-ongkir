import { DefaultTheme } from "styled-components";

import { ColorType, Theme } from "../types";

export const useTheme = (theme: Theme = "light"): DefaultTheme => {
  const themeColor: Record<Theme, ColorType> = {
    light: {
      bg: "#fff",
      "neutral-10": "#4f4f4f",
    },
    dark: {
      bg: "#1c1c1c",
      "neutral-10": "#e0e0e0",
    },
  };

  return {
    themeColor: {
      bg: themeColor[theme].bg,
      "neutral-10": themeColor[theme]["neutral-10"],
    },
    fontWeight: {
      regular: 400,
      bold: 700,
    },
    fontSize: {
      xs: "12px",
      sm: "14px",
      md: "16px",
      lg: "18px",
      xl: "20px",
      xxl: "24px",
    },
  };
};
