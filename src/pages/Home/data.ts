import { CourierType } from "../../helpers/types/responseApi";
import { Colors } from "../../helpers/utils";

import Tiki from "../../assets/logo/tiki.png";
import Jne from "../../assets/logo/jne.png";
import Pos from "../../assets/logo/pos.png";

export type Inputs = {
  fromProvince: string;
  fromCity: string;
  toProvince: string;
  toCity: string;
  weight: string;
  courier: CourierType;
};

export type CourierTypeButton = {
  label: string;
  value: CourierType;
  color: string;
  bg: string;
};

export const courierType: CourierTypeButton[] = [
  {
    label: "JNE",
    value: "jne",
    color: Colors.indicator.green.fg,
    bg: Colors.indicator.green.bg,
  },
  {
    label: "POS",
    value: "pos",
    color: Colors.indicator.purple.fg,
    bg: Colors.indicator.purple.bg,
  },
  {
    label: "Tiki",
    value: "tiki",
    color: Colors.indicator.orange.fg,
    bg: Colors.indicator.orange.bg,
  },
];

export const courierLogo: Record<CourierType, string> = {
  jne: Jne,
  pos: Pos,
  tiki: Tiki,
};
