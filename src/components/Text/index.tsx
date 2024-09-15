import { HTMLAttributes } from "react";
import styled, { css } from "styled-components";

import { FontSize, FontWeight, IndicatorColor } from "../../helpers/types";
import { Colors } from "../../helpers/utils";

interface Props extends HTMLAttributes<HTMLParagraphElement> {
  size?: FontSize;
  weight?: FontWeight;
  color?: string;
  type?: "normal" | "tag";
  tagColor?: IndicatorColor;
}

export const Text = ({
  children,
  type = "normal",
  size = "md",
  weight = "regular",
  color = Colors.primary.grayDark,
  tagColor = "green",
  ...others
}: Props) => {
  return (
    <TextStyled
      $type={type}
      $size={size}
      $weight={weight}
      $color={color}
      $tagColor={tagColor}
      {...others}
    >
      {children}
    </TextStyled>
  );
};

const TextStyled = styled.p<{
  $size: FontSize;
  $weight: FontWeight;
  $color: string;
  $type: "normal" | "tag";
  $tagColor: IndicatorColor;
}>`
  ${(props) => css`
    font-size: ${props.theme.fontSize[props.$size]};
    font-weight: ${props.theme.fontWeight[props.$weight]};
    color: ${props.$color};
  `}
  line-height: 100%;
  ${(props) =>
    props.$type === "tag"
      ? css`
          width: fit-content;
          padding: 3px 6px;
          border-radius: 4px;
          background: ${Colors.indicator[props.$tagColor].bg};
          color: ${Colors.indicator[props.$tagColor].fg};
        `
      : ""}
`;
