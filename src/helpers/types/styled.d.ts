import "styled-components";

import { FontSizeType, FontWeightType } from "./theme";

declare module "styled-components" {
  export interface DefaultTheme {
    fontWeight: FontWeightType;
    fontSize: FontSizeType;
    color: {
      primary: {
        blue: string;
        light: string;
      };
    };
  }
}
