import { HTMLAttributes } from "react";
import styled, { css } from "styled-components";

import { FontSize, FontWeight } from "../../helpers/types";
import { Colors } from "../../helpers/utils";

interface Props extends HTMLAttributes<HTMLParagraphElement> {
  size?: FontSize;
  weight?: FontWeight;
  color?: string;
}

export const Text = ({
  children,
  size = "md",
  weight = "regular",
  color = Colors.primary.grayDark,
  ...others
}: Props) => {
  return (
    <TextStyled $size={size} $weight={weight} $color={color} {...others}>
      {children}
    </TextStyled>
  );
};

const TextStyled = styled.p<{
  $size: FontSize;
  $weight: FontWeight;
  $color: string;
}>`
  ${(props) => css`
    font-size: ${props.theme.fontSize[props.$size]};
    font-weight: ${props.theme.fontWeight[props.$weight]};
    color: ${props.$color};
  `}
  line-height: 100%;
`;
