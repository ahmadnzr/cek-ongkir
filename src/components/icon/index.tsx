import React from "react";

import {
  CheckIcon,
  EllipsisHorizontalIcon,
  XMarkIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/16/solid";

export const listIcon = {
  check: CheckIcon,
  ellipsis: EllipsisHorizontalIcon,
  xMark: XMarkIcon,
  sun: SunIcon,
  moon: MoonIcon,
};

interface Props extends React.SVGAttributes<SVGElement> {
  name: keyof typeof listIcon;
}

export const Icon = ({ name, ...other }: Props) => {
  const IconMap = listIcon[name];

  return <IconMap {...other} />;
};
