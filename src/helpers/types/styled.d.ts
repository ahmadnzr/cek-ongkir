import "styled-components";

import { FontSizeType, FontWeightType, ThemeColor } from "./theme";

declare module "styled-components" {
  export interface DefaultTheme {
    fontWeight: FontWeightType;
    fontSize: FontSizeType;
    themeColor: ThemeColor;
  }
}
