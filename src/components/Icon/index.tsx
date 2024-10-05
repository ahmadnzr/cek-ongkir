import React from "react";

import {
  CheckIcon,
  EllipsisHorizontalIcon,
  XMarkIcon,
} from "@heroicons/react/16/solid";

export const listIcon = {
  check: CheckIcon,
  ellipsis: EllipsisHorizontalIcon,
  xMark: XMarkIcon,
};

interface Props extends React.SVGAttributes<SVGElement> {
  name: keyof typeof listIcon;
}

export const Icon = ({ name, ...other }: Props) => {
  const IconMap = listIcon[name];

  return <IconMap {...other} />;
};
