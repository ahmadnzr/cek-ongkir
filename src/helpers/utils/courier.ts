import { CourierType, CourierTypeButton, IndicatorColor } from "../types";

import Tiki from "../../assets/logo/tiki.png";
import Jne from "../../assets/logo/jne.png";
import Pos from "../../assets/logo/pos.png";

export const getCourierColor = (courier?: CourierType): IndicatorColor => {
  const CourierColor: Record<CourierType, IndicatorColor> = {
    pos: "orange",
    jne: "green",
    tiki: "purple",
  };

  if (!courier) return "blue";

  return CourierColor[courier];
};

export const courierType: CourierTypeButton[] = [
  {
    label: "JNE",
    value: "jne",
  },
  {
    label: "POS",
    value: "pos",
  },
  {
    label: "Tiki",
    value: "tiki",
  },
];

export const courierLogo: Record<CourierType, string> = {
  jne: Jne,
  pos: Pos,
  tiki: Tiki,
};
