import React from "react";
import styled from "styled-components";

import { Text } from "../Text";
import { Colors } from "../../helpers/utils";

type Props = React.HTMLAttributes<HTMLButtonElement>;

export const Button = ({ children, ...others }: Props) => {
  return (
    <ButtonStyled {...others}>
      <Text size="lg" color="#fff">
        {children}
      </Text>
    </ButtonStyled>
  );
};

const ButtonStyled = styled.button`
  padding: 10px 16px;

  border: none;
  border-radius: 5px;

  background-color: ${Colors.primary.blue};
  transition: 0.2s ease;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
  &:active {
    opacity: 1;
  }
`;
